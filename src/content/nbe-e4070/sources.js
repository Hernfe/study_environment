// Metadata only. Private files are never imported or linked for download.
export const sources = {
  statistics: { file: 'L01_statistics.pdf', kind: 'pdf', status: 'supplied' },
  spectral: { file: 'L02_spectral_methods.pdf', kind: 'pdf', status: 'supplied' },
  pca1: { file: 'L03_PCA_I.pdf', kind: 'pdf', status: 'supplied' },
  clustering: { file: 'L04_clustering.pdf', kind: 'pdf', status: 'supplied' },
  regression: { file: 'L05_regression.pdf', kind: 'pdf', status: 'supplied' },
  pca2: { file: 'L06_PCA_II.pdf', kind: 'pdf', status: 'supplied' },
  advanced: { file: 'L07_advanced_methods.pdf', kind: 'pdf', status: 'supplied' },
  exercise1: { file: 'Exercise1_Statistics.ipynb', kind: 'notebook', status: 'supplied' },
  exercise2: { file: 'Exercise2_Fourier_PCA_Clustering.ipynb', kind: 'notebook', status: 'supplied' },
  exercise3: { file: 'Exercise3_High_Dimensional_PCA.ipynb', kind: 'notebook', status: 'supplied' },
  exercise4: { file: 'Exercise4 notebook', kind: 'notebook', status: 'pending' },
  oral: { file: 'L08 lecture deck', kind: 'pdf', status: 'pending' },
};
export function sourceLabel(ref) {
  const source = sources[ref.source];
  if (!source) throw new Error(`Unknown source: ${ref.source}`);
  return `${source.file}${ref.pages ? `, PDF pp. ${ref.pages}` : ''}${Number.isInteger(ref.cell) ? `, cell ${ref.cell} (zero-based)` : ''}${source.status === 'pending' ? ' (pending)' : ''}`;
}
