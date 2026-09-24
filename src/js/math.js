// KaTeX rendering for every formula, symbol and unit expression.
// Display maths comes from `math` blocks, recap `tex` fields and calc
// step `tex` fields (renderTex). Inline maths is written in content text
// between single dollar signs, $E_{\text{K}}$, and typeset in place by
// typesetInline. A literal dollar sign is written \$. See
// docs/CONTENT_SCHEMA.md, "Maths".

import katex from 'katex';
import 'katex/dist/katex.min.css';

const SKIP = 'script, style, code, pre, textarea, input, select, option, svg, .katex, .no-math';

// Returns an element holding the rendered expression. On a TeX error the
// source is shown in monospace so the page still says something.
export function renderTex(tex, { display = false } = {}) {
  const node = document.createElement(display ? 'div' : 'span');
  node.className = display ? 'math-display' : 'math-inline';
  try {
    katex.render(tex, node, { displayMode: display, throwOnError: true, output: 'htmlAndMathml', strict: 'ignore' });
  } catch (error) {
    console.error(`KaTeX could not render "${tex}".`, error);
    node.className += ' math-error';
    node.textContent = tex;
  }
  return node;
}

// Splits a string into text and $...$ maths parts. \$ is a literal dollar.
export function splitMath(text) {
  const parts = [];
  let buffer = '';
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\\' && text[i + 1] === '$') {
      buffer += '$';
      i += 2;
      continue;
    }
    if (ch === '$') {
      const end = findClosing(text, i + 1);
      if (end > i + 1) {
        if (buffer) parts.push({ text: buffer });
        buffer = '';
        parts.push({ tex: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    buffer += ch;
    i += 1;
  }
  if (buffer) parts.push({ text: buffer });
  return parts;
}

function findClosing(text, from) {
  for (let j = from; j < text.length; j += 1) {
    if (text[j] === '\\') { j += 1; continue; }
    if (text[j] === '$') return j;
  }
  return -1;
}

function hasMath(text) {
  return text.includes('$');
}

// Replaces $...$ in every text node under root with typeset maths.
// Idempotent: typeset maths lives in .katex and is skipped.
export function typesetInline(root) {
  if (!root) return root;
  const nodes = [];
  if (root.nodeType === Node.TEXT_NODE) {
    nodes.push(root);
  } else {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => (hasMath(node.nodeValue) && !node.parentElement?.closest(SKIP) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
    });
    for (let node = walker.nextNode(); node; node = walker.nextNode()) nodes.push(node);
  }
  for (const node of nodes) {
    if (!node.parentNode || node.parentElement?.closest(SKIP)) continue;
    const parts = splitMath(node.nodeValue);
    if (parts.length === 1 && parts[0].text !== undefined) {
      if (parts[0].text !== node.nodeValue) node.nodeValue = parts[0].text;
      continue;
    }
    const frag = document.createDocumentFragment();
    for (const part of parts) {
      frag.appendChild(part.tex !== undefined ? renderTex(part.tex) : document.createTextNode(part.text));
    }
    node.replaceWith(frag);
  }
  return root;
}

// Keeps typesetting text added after the first render: option feedback,
// check results, hotspot panels, review cards.
export function watchMath(root) {
  if (!root || !('MutationObserver' in window)) return;
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      if (record.type === 'characterData') {
        if (hasMath(record.target.nodeValue)) typesetInline(record.target);
        continue;
      }
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE ? hasMath(node.nodeValue) : node.nodeType === Node.ELEMENT_NODE && hasMath(node.textContent)) {
          typesetInline(node);
        }
      });
    }
  });
  observer.observe(root, { childList: true, subtree: true, characterData: true });
}

// Plain-text version for places that cannot hold markup (select
// options, aria-labels): drops the delimiters and TeX commands.
export function stripMath(text) {
  return splitMath(String(text)).map((p) => (p.text !== undefined ? p.text : texToPlain(p.tex))).join('');
}

function texToPlain(tex) {
  return tex
    .replace(/\\(?:text|mathrm|mathit|operatorname)\{([^}]*)\}/g, '$1')
    .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '($1)/($2)')
    .replace(/\\(?:,|;|:|!|quad|qquad)/g, ' ')
    .replace(/\\mu/g, 'µ').replace(/\\Delta/g, 'Δ').replace(/\\alpha/g, 'α').replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ').replace(/\\tau/g, 'τ').replace(/\\Omega/g, 'Ω').replace(/\\approx/g, '≈')
    .replace(/\\times/g, '×').replace(/\\cdot/g, '·').replace(/\\to|\\rightarrow/g, '→').replace(/\\pm/g, '±')
    .replace(/\\log/g, 'log').replace(/\\ln/g, 'ln')
    .replace(/[{}]/g, '')
    .replace(/\^/g, '')
    .replace(/_/g, '')
    .replace(/\\/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
