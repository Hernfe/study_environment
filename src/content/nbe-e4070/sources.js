// Private files are never imported or linked for download. Study targets are public site routes.
export const sources = {
  statistics: { studyLecture: 'L01', file: 'L01_statistics.pdf', kind: 'pdf', status: 'supplied' },
  spectral: { studyLecture: 'L02', file: 'L02_spectral_methods.pdf', kind: 'pdf', status: 'supplied' },
  pca1: { studyLecture: 'L03', file: 'L03_PCA_I.pdf', kind: 'pdf', status: 'supplied' },
  clustering: { studyLecture: 'L04', file: 'L04_clustering.pdf', kind: 'pdf', status: 'supplied' },
  regression: { studyLecture: 'L05', file: 'L05_regression.pdf', kind: 'pdf', status: 'supplied' },
  pca2: { studyLecture: 'L06', studySection: 'svd', file: 'L06_PCA_II.pdf', kind: 'pdf', status: 'supplied' },
  advanced: { studyLecture: 'L07', file: 'L07_advanced_methods.pdf', kind: 'pdf', status: 'supplied' },
  exercise1: { studyLecture: 'L01', file: 'Exercise1_Statistics.ipynb', kind: 'notebook', status: 'supplied' },
  exercise2: { studyLecture: 'L02', file: 'Exercise2_Fourier_PCA_Clustering.ipynb', kind: 'notebook', status: 'supplied' },
  exercise3: { studyLecture: 'L06', studySection: 'neural-notebook', file: 'Exercise3_High_Dimensional_PCA.ipynb', kind: 'notebook', status: 'supplied' },
  exercise4: { studyLecture: 'L05', file: 'Exercise4_LogisticRegression.ipynb', kind: 'notebook', status: 'supplied' },
  oral: { studyLecture: 'L08', file: 'L08_recap.pdf', kind: 'pdf', status: 'supplied' },
};
export function sourceLabel(ref) {
  const source = sources[ref.source];
  if (!source) throw new Error(`Unknown source: ${ref.source}`);
  return `${source.file}${ref.pages ? `, PDF pp. ${ref.pages}` : ''}${Number.isInteger(ref.cell) ? `, cell ${ref.cell} (zero-based)` : ''}${source.status === 'pending' ? ' (pending)' : ''}`;
}
