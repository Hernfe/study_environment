// Word banks: a closed list of terms shown with a question, as on the
// mini-exam ("Word bank: Thalamus • Cerebellum • ..."). Used by
// fillBlank, label (both forms) and classify. Each entry is usable once
// unless it is marked reusable; a once-only entry picked in one select
// is disabled in the others and struck through in the bank.

import { el } from './dom.js';
import { stripMath } from './math.js';

// Accepts string[] or { text, reusable }[] (mixed is fine).
// `reusable` sets the default for string entries.
export function normaliseBank(entries, { reusable = false } = {}) {
  return (entries || []).map((entry) =>
    typeof entry === 'string'
      ? { text: entry, reusable }
      : { text: entry.text, reusable: entry.reusable ?? reusable }
  );
}

// The visible bank: a kicker, one chip per entry, and a line saying
// how often entries may be used.
export function renderBank(bank, { title = 'Word bank' } = {}) {
  const chips = bank.map((entry) =>
    el('li', { class: 'bank-chip', 'data-text': entry.text }, [
      entry.text,
      entry.reusable && bank.some((e) => !e.reusable)
        ? el('span', { class: 'muted' }, ' (reusable)')
        : null,
    ])
  );
  const allReusable = bank.every((e) => e.reusable);
  const noneReusable = bank.every((e) => !e.reusable);
  const rule = allReusable
    ? 'Each may be used more than once.'
    : noneReusable
      ? 'Each is used at most once.'
      : 'Each is used at most once unless marked reusable.';
  return el('div', { class: 'word-bank' }, [
    el('p', { class: 'block-kicker' }, title),
    el('ul', { class: 'bank-chips' }, chips),
    el('p', { class: 'bank-rule muted' }, rule),
  ]);
}

// A select holding the bank entries, in bank order.
export function bankSelect(bank, attrs = {}, placeholder = 'Choose') {
  return el('select', attrs, [
    el('option', { value: '' }, placeholder),
    ...bank.map((entry) => el('option', { value: entry.text }, stripMath(entry.text))),
  ]);
}

// Keeps once-only entries to one select at a time. Call after the
// selects exist; returns an update function (also run on every change).
export function linkPickers(selects, bank, bankNode) {
  const once = new Set(bank.filter((e) => !e.reusable).map((e) => e.text));
  function update() {
    const used = new Map();
    selects.forEach((s) => { if (s.value) used.set(s.value, s); });
    selects.forEach((s) => {
      [...s.options].forEach((option) => {
        if (!option.value) return;
        const holder = used.get(option.value);
        option.disabled = once.has(option.value) && holder !== undefined && holder !== s;
      });
    });
    bankNode?.querySelectorAll('.bank-chip').forEach((chip) => {
      chip.classList.toggle('is-used', once.has(chip.dataset.text) && used.has(chip.dataset.text));
    });
  }
  selects.forEach((s) => s.addEventListener('change', update));
  update();
  return update;
}
