// Lateral view of the left hemisphere, anterior to the left, as on the
// lecture slides. One drawing serves three layers (lobes and landmarks,
// functional areas, Brodmann numbers), the static fallback of the
// cortical-map widget, and the label question.
//
// brainLateral({ layer, labels, uid })
//   layer:  'plain' | 'lobes' | 'functional' | 'brodmann'
//   labels: draw text labels (default true)
//   uid:    suffix for clipPath ids so several copies can share a page
//
// Every region element carries data-region="<key>" so a widget can
// attach hover and click behaviour. The keys are listed in REGIONS.

const W = 480;
const H = 360;

// Cerebrum outline. Also used as the clip for lobe fills.
const CEREBRUM =
  'M55,140 C55,85 110,40 200,38 C290,36 370,48 415,95 C440,125 442,175 420,210 ' +
  'C405,232 375,238 345,232 C320,238 300,245 280,246 C230,250 175,252 130,238 ' +
  'C100,228 85,205 92,190 C70,182 55,165 55,140 Z';

// Sulci and fissures drawn as strokes.
const CENTRAL = 'M245,42 C240,90 232,140 222,182';
const LATERAL = 'M92,186 C150,178 220,172 300,150';
const OCCIPITAL_LINE = 'M372,58 L395,222';

// Lobe fills (clipped to the cerebrum). Boundaries follow the sulci.
const LOBE_PATHS = {
  frontal: 'M0,0 L245,0 L245,42 C240,90 232,140 222,182 C180,174 130,180 92,186 L0,186 Z',
  parietal: 'M245,0 L372,0 L372,58 L395,222 L330,155 L300,150 C260,166 240,175 222,182 C232,140 240,90 245,42 Z',
  occipital: 'M372,0 L480,0 L480,300 L395,300 L395,222 L372,58 Z',
  temporal: 'M0,186 L92,186 C150,178 220,172 300,150 L330,155 L395,222 L395,300 L0,300 Z',
};

// Gyrus bands: strips on either side of a sulcus, clipped to the cerebrum.
const PRECENTRAL = 'M222,42 C217,90 209,140 199,182 L222,182 C232,140 240,90 245,42 Z';
const POSTCENTRAL = 'M245,42 C240,90 232,140 222,182 L246,178 C256,138 264,90 268,42 Z';
const SUPERIOR_TEMPORAL = 'M96,190 C150,182 222,176 300,152 L305,170 C230,192 160,200 100,206 Z';

// Functional areas (clipped to the cerebrum).
const FUNCTIONAL_PATHS = {
  motor: PRECENTRAL,
  premotor: 'M180,42 C176,90 170,140 160,182 L199,182 C209,140 217,90 222,42 Z',
  sma: 'M180,42 L222,42 L221,60 L179,60 Z',
  somatosensory: POSTCENTRAL,
  'posterior-parietal': 'M268,42 C264,90 256,138 246,178 L300,150 L330,155 L395,222 L372,58 L372,0 L268,0 Z',
  visual: LOBE_PATHS.occipital,
  auditory: 'M225,158 C245,150 275,146 296,150 L292,168 C270,170 245,175 228,176 Z',
  gustatory: 'M182,166 L206,164 L206,180 L182,182 Z',
  inferotemporal: 'M110,215 C170,215 250,205 340,195 L395,222 L395,300 L0,300 L0,232 Z',
  prefrontal: 'M0,0 L180,0 L180,42 C176,90 170,140 160,182 C130,180 110,182 92,186 L0,186 Z',
};

// Region catalogue. Labels are the slide wording. Text is short; the
// explanations come from the content file through the widget props.
export const REGIONS = {
  lobes: [
    { key: 'frontal', label: 'Frontal lobe', at: [130, 95] },
    { key: 'parietal', label: 'Parietal lobe', at: [305, 85] },
    { key: 'occipital', label: 'Occipital lobe', at: [405, 160] },
    { key: 'temporal', label: 'Temporal lobe', at: [190, 225] },
    { key: 'insula', label: 'Insula', at: [215, 150] },
    { key: 'central-sulcus', label: 'Central sulcus', at: [245, 28] },
    { key: 'lateral-fissure', label: 'Lateral (Sylvian) fissure', at: [70, 205] },
    { key: 'precentral', label: 'Precentral gyrus', at: [150, 20] },
    { key: 'postcentral', label: 'Postcentral gyrus', at: [330, 20] },
    { key: 'superior-temporal', label: 'Superior temporal gyrus', at: [330, 235] },
    { key: 'cerebellum', label: 'Cerebellum', at: [430, 300] },
    { key: 'brainstem', label: 'Brain stem', at: [235, 330] },
    { key: 'olfactory-bulb', label: 'Olfactory bulb', at: [50, 240] },
  ],
  functional: [
    { key: 'motor', label: 'Primary motor cortex (area 4)', short: 'Motor (4)', at: [214, 24] },
    { key: 'premotor', label: 'Premotor area (area 6)', short: 'Premotor (6)', at: [128, 24] },
    { key: 'sma', label: 'Supplementary motor area (area 6)', short: 'SMA (6)', at: [200, 74] },
    { key: 'somatosensory', label: 'Somatosensory cortex (areas 3, 1, 2)', short: 'Somatosensory (3, 1, 2)', at: [335, 24] },
    { key: 'posterior-parietal', label: 'Posterior parietal cortex (areas 5, 7)', short: 'Posterior parietal (5, 7)', at: [320, 100] },
    { key: 'visual', label: 'Visual cortex (areas 17, 18, 19)', short: 'Visual (17, 18, 19)', at: [402, 150] },
    { key: 'auditory', label: 'Auditory cortex (areas 41, 42)', short: 'Auditory (41, 42)', at: [300, 192] },
    { key: 'gustatory', label: 'Gustatory cortex (area 43)', short: 'Gustatory (43)', at: [140, 176] },
    { key: 'inferotemporal', label: 'Inferotemporal cortex (areas 20, 21, 37)', short: 'Inferotemporal (20, 21, 37)', at: [200, 262] },
    { key: 'prefrontal', label: 'Prefrontal cortex', short: 'Prefrontal', at: [95, 110] },
  ],
  brodmann: [
    { key: 'b4', label: '4', at: [214, 116] },
    { key: 'b6', label: '6', at: [176, 100] },
    { key: 'b8', label: '8', at: [150, 70] },
    { key: 'b9', label: '9', at: [120, 100] },
    { key: 'b10', label: '10', at: [80, 140] },
    { key: 'b46', label: '46', at: [130, 140] },
    { key: 'b45', label: '45', at: [130, 168] },
    { key: 'b11', label: '11', at: [90, 178] },
    { key: 'b312', label: '3, 1, 2', at: [258, 100] },
    { key: 'b5', label: '5', at: [290, 70] },
    { key: 'b7', label: '7', at: [330, 100] },
    { key: 'b17', label: '17', at: [428, 190] },
    { key: 'b18', label: '18', at: [412, 160] },
    { key: 'b19', label: '19', at: [385, 130] },
    { key: 'b41', label: '41, 42', at: [270, 158] },
    { key: 'b22', label: '22', at: [300, 190] },
    { key: 'b21', label: '21', at: [230, 212] },
    { key: 'b20', label: '20', at: [200, 240] },
    { key: 'b37', label: '37', at: [345, 215] },
    { key: 'b38', label: '38', at: [120, 215] },
    { key: 'b43', label: '43', at: [194, 174] },
  ],
};

// Fill hues for lobes and functional groups, drawn at low opacity so
// they blend with both the light and the dark theme. The accent colour
// still marks the hovered or selected region.
const LOBE_TINT = {
  frontal: '#4f7ad9',
  parietal: '#3fa65b',
  occipital: '#d9534f',
  temporal: '#e0a030',
};
const FUNCTIONAL_TINT = {
  motor: '#d9534f',
  premotor: '#d9534f',
  sma: '#b03a36',
  somatosensory: '#3fa65b',
  visual: '#3fa65b',
  auditory: '#3fa65b',
  gustatory: '#3fa65b',
  'posterior-parietal': '#8e6bd6',
  inferotemporal: '#8e6bd6',
  prefrontal: '#8e6bd6',
};
const TINT_OPACITY = '0.32';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function text(x, y, content, opts = {}) {
  const size = opts.size || 12;
  const anchor = opts.anchor || 'middle';
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" fill="currentColor" paint-order="stroke" stroke="var(--c-surface)" stroke-width="3" stroke-linejoin="round">${esc(content)}</text>`;
}

function region(key, d, fill, extra = '', opacity = TINT_OPACITY) {
  return `<path data-region="${key}" class="map-region" d="${d}" fill="${fill}" fill-opacity="${opacity}" stroke="none" ${extra}/>`;
}

export function brainLateral(props = {}) {
  const layer = props.layer || 'plain';
  const labels = props.labels !== false;
  const uid = props.uid || 'a';
  const clip = `clip-path="url(#cerebrum-${uid})"`;

  const parts = [];

  // Brain stem and cerebellum sit behind the cerebrum.
  parts.push(
    `<path data-region="brainstem" class="map-region" d="M272,225 C278,260 282,300 290,345 L322,345 C318,300 316,262 318,228 Z" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />`
  );
  parts.push(
    `<path data-region="cerebellum" class="map-region" d="M312,262 C330,240 395,238 415,262 C428,280 420,305 395,312 C365,322 330,315 315,298 C306,288 305,272 312,262 Z" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />`
  );
  for (let i = 0; i < 5; i += 1) {
    const y = 262 + i * 10;
    parts.push(`<path d="M${318 + i * 2},${y} C350,${y - 8} 385,${y - 8} ${412 - i * 2},${y + 2}" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5" pointer-events="none" />`);
  }
  // Olfactory bulb on the ventral frontal surface.
  parts.push(
    `<path data-region="olfactory-bulb" class="map-region" d="M62,196 C75,190 100,192 118,200 C100,208 76,210 62,204 Z" fill="var(--c-surface)" stroke="currentColor" stroke-width="2" />`
  );

  // Cerebrum base fill.
  parts.push(`<path d="${CEREBRUM}" fill="var(--c-surface)" stroke="none" />`);

  // Layer fills, clipped to the cerebrum.
  if (layer === 'lobes') {
    for (const key of Object.keys(LOBE_PATHS)) parts.push(region(key, LOBE_PATHS[key], LOBE_TINT[key], clip));
    parts.push(region('precentral', PRECENTRAL, 'var(--c-accent)', clip, '0.4'));
    parts.push(region('postcentral', POSTCENTRAL, 'var(--c-accent)', clip, '0.4'));
    parts.push(region('superior-temporal', SUPERIOR_TEMPORAL, 'var(--c-accent)', clip, '0.4'));
  } else if (layer === 'functional' || layer === 'brodmann') {
    for (const key of Object.keys(FUNCTIONAL_PATHS)) parts.push(region(key, FUNCTIONAL_PATHS[key], FUNCTIONAL_TINT[key], clip));
  } else {
    for (const key of Object.keys(LOBE_PATHS)) parts.push(region(key, LOBE_PATHS[key], 'transparent', clip, '0'));
  }

  // Outline and sulci on top of the fills.
  parts.push(`<path d="${CEREBRUM}" fill="none" stroke="currentColor" stroke-width="2.5" pointer-events="none" />`);
  parts.push(`<path data-region="central-sulcus" class="map-region map-line" d="${CENTRAL}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(`<path data-region="lateral-fissure" class="map-region map-line" d="${LATERAL}" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />`);
  parts.push(`<path d="${OCCIPITAL_LINE}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.6" pointer-events="none" />`);
  // Insula, buried in the lateral fissure.
  parts.push(
    `<ellipse data-region="insula" class="map-region" cx="215" cy="166" rx="42" ry="12" fill="var(--c-surface)" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" />`
  );

  // Brodmann numbers as hit targets.
  if (layer === 'brodmann') {
    for (const r of REGIONS.brodmann) {
      const radius = r.label.length > 2 ? 20 : 13;
      parts.push(
        `<g data-region="${r.key}" class="map-region map-dot"><circle cx="${r.at[0]}" cy="${r.at[1]}" r="${radius}" fill="var(--c-surface)" stroke="currentColor" stroke-width="1.5" />` +
          `<text x="${r.at[0]}" y="${r.at[1] + 4}" text-anchor="middle" font-size="11" fill="currentColor" pointer-events="none">${esc(r.label)}</text></g>`
      );
    }
  }

  // Text labels.
  if (labels) {
    if (layer === 'lobes' || layer === 'plain') {
      const list = layer === 'plain' ? [] : REGIONS.lobes;
      for (const r of list) parts.push(text(r.at[0], r.at[1], r.label));
    } else if (layer === 'functional') {
      for (const r of REGIONS.functional) parts.push(text(r.at[0], r.at[1], r.short || r.label, { size: 11 }));
    }
    parts.push(text(60, 345, 'Anterior', { anchor: 'start', size: 11 }));
    parts.push(text(440, 345, 'Posterior', { anchor: 'end', size: 11 }));
    parts.push(`<line x1="120" y1="341" x2="380" y2="341" stroke="var(--c-text-muted)" stroke-width="1" marker-end="url(#arrow-${uid})" marker-start="url(#arrow-${uid})" />`);
  }

  return `
<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" font-family="inherit">
  <defs>
    <clipPath id="cerebrum-${uid}"><path d="${CEREBRUM}" /></clipPath>
    <marker id="arrow-${uid}" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-text-muted)" /></marker>
  </defs>
  ${parts.join('\n  ')}
</svg>`;
}
