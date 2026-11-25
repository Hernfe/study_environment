const pdf = (source, pages) => ({ source, pages });
const option = (label, value) => ({ label, value });
const select = (id, label, options) => ({ id, label, initial: options[0].value, options });

function card(lecture, slug, title, text, sources, context, visual, prompt, options, correct, blank) {
  const id = `${lecture}-code-visual-${slug}`;
  return {
    id, title,
    snippet: { language: 'python', provenance: 'New teaching example', text, sources, context },
    visual: { caption: 'Illustrative example', ...visual },
    mcq: { id: `${id}-mcq`, difficulty: 'easy', prompt, correct,
      options: options.map(([text, feedback]) => ({ text, feedback })) },
    ...(blank && { blank: { id: `${id}-blank`, ...blank } }),
  };
}

export const svd = card('L06', 'svd', 'Keep scores and reconstruct features',
  'U, s, Vt = np.linalg.svd(X, full_matrices=False)\nscores = s[:k, None] * Vt[:k]\nX_k = U[:, :k] @ scores',
  [pdf('pca2', '20–22,28')], 'NumPy is imported as np. X is already centred, with features in rows and samples in columns as in the slides. The singular values scale rows of Vt. This display shows one valid choice of component signs.',
  { kind: 'svd-reconstruction', alt: 'Inspect feature rows, component score rows and reconstructed feature rows for the same four samples. Values are in arbitrary units.',
    controls: [select('k', 'Retained components (k)', [option('1', 1), option('2', 2)])] },
  'With k = 1, what does the one row of scores contain?', [
    ['One coefficient for each feature.', 'The feature coefficients lie in the first column of U.'],
    ['One coordinate for each sample.', 'Each sample has a coordinate along the first feature-space direction.'],
    ['One variance for each original feature.', 'The squared singular values give component variance after division by the covariance normalization factor.'],
  ], 1, {
    prompt: 'Fill in the matrix whose first k columns map scores back into the feature axes.',
    template: 'X_k = {basis}[:, :k] @ scores',
    fields: [{ id: 'basis', label: 'Feature basis', accepted: ['U'], explanation: 'U holds the left singular vectors in feature space.',
      commonErrors: 'Vt instead has one column per sample.' }],
    expectedOutput: 'The reconstruction is 2 × 4 at either setting. One component drops the second row of this example. Two recover the input.',
  });

export const correlation = card('L06', 'pearson', 'Check the shape of an association',
  'r = np.corrcoef(x, y)[0, 1]', [pdf('pca2', '23–25')],
  'NumPy is imported as np. x and y are paired feature vectors. The off-diagonal entry is their Pearson correlation.',
  { kind: 'pearson-shapes', alt: 'Four paired samples are drawn on the original feature axes. Change the pattern to compare linear and symmetric curved relationships.',
    controls: [select('pattern', 'Paired values', [option('Increasing line', 'line'), option('Symmetric curve', 'curve')])] },
  'The curved shape has r = 0. Which statement fits the data?', [
    ['The features are independent.', 'Here y is determined by x, so the features are dependent.'],
    ['The features have equal variance.', 'Pearson correlation standardizes spreads internally and does not compare them.'],
    ['Their linear correlation is zero.', 'The opposite slopes on the two sides cancel in the covariance.'],
  ], 2);

export const ica = card('L07', 'demix', 'Read the output of a demixing matrix',
  'sources = recordings @ W.T', [pdf('advanced', '5–13')],
  'Rows of recordings are times and columns are sensors. W has one row of weights per component. The display applies a known inverse of the toy mixing matrix to isolate the projection step of ICA.',
  { kind: 'linear-demixing', alt: 'The sensors are two different weighted combinations of constructed signals. The displayed weights either invert that mixing or pass through the sensor values.',
    controls: [select('demix', 'Demixing weights', [option('Inverse of toy mixing', true), option('Identity (pass through)', false)])] },
  'What determines the first output column?', [
    ['The first row of W applied to both sensors.', 'The first row of W becomes the first column of W.T. Each sensor pair is multiplied by those two weights.'],
    ['The first time row applied to every sensor.', 'Each time row is transformed independently using the same W.'],
    ['The largest-variance sensor at each time.', 'The multiplication uses fixed weights and does not rank variance.'],
  ], 0, {
    prompt: 'Use the transpose attribute so each row of W specifies an output component.',
    template: 'sources = recordings @ W.{transpose}',
    fields: [{ id: 'transpose', label: 'Transpose attribute', accepted: ['T'], explanation: 'W.T puts each component’s sensor weights into a column.',
      commonErrors: 'With W directly, the columns would be treated as weight vectors.' }],
    expectedOutput: 'Six time rows remain. The two sensor columns become two component columns.',
  });

export const tsne = card('L07', 'tsne', 'Read near neighbours in an embedding',
  'embedding = TSNE(n_components=2, perplexity=5, random_state=0).fit_transform(X)',
  [pdf('advanced', '14–15'), pdf('oral', '50')], 'TSNE is imported from sklearn.manifold. X has one row per sample. This line is for more than five samples. The six-point sketches below illustrate how to read a map.',
  { kind: 'embedding-layout', alt: 'Two hand-constructed layouts, with two nearby points per group. These drawings are geometric examples, without an optimizer or fitted embedding.',
    controls: [select('layout', 'Illustrative layout', [option('A nearer B', 0), option('A nearer C', 1)])] },
  'The nearest other group to A changes between maps. What should you check?', [
    ['Whether the axis units changed by a constant factor.', 'Embedding coordinates lack the original feature units. Isotropic rescaling preserves the distance ordering.'],
    ['Whether the group spacing agrees in feature space.', 'Inter-group spacing in t-SNE is unreliable. Compare distances or neighbourhoods in the original features.'],
    ['Whether the two axes explain different variances.', 't-SNE axes are not principal components with explained-variance ranks.'],
  ], 1);

export const forest = card('L07', 'forest', 'Aggregate tree votes for one sample',
  'labels, counts = np.unique(tree_votes, return_counts=True)\nprediction = labels[counts.argmax()]',
  [pdf('advanced', '16–17')], 'NumPy is imported as np. This implements the lecture’s hard-vote example without ties. Some libraries, including scikit-learn’s RandomForestClassifier, instead average tree class probabilities before choosing a class.',
  { kind: 'tree-vote', alt: 'One input sample produces five hard class labels. Change the fifth vote and compare the class counts.',
    controls: [select('lastVote', 'Tree 5 vote', [option('Class A', 'A'), option('Class B', 'B')])] },
  'What does prediction represent in this example?', [
    ['The class of the final tree.', 'Every tree contributes one vote. The last tree has equal weight.'],
    ['The fraction of trees predicting class A.', 'That would require dividing the count for A by the total votes.'],
    ['The class with the highest vote count.', 'argmax locates the largest count and labels maps that index back to a class.'],
  ], 2);

export const network = card('L07', 'network', 'Check a classifier when the camera changes',
  'hidden = np.maximum(0, X @ W + b)\nlogit = hidden @ v + c\npredicted = (logit >= 0).astype(int)',
  [pdf('advanced', '18–23'), pdf('oral', '51')],
  'NumPy is imported as np. This forward pass isolates a shortcut with fixed weights. The two inputs are shape and camera cues (0 or 1). W is the 2 × 2 identity, b is zero, v = [1, 2] and c = −1.5. There is no training step.',
  { kind: 'camera-shift', alt: 'Four constructed examples keep their shape and truth labels. Logits are unitless. Switching camera conditions reverses which camera cue accompanies each shape.',
    controls: [select('shifted', 'Camera condition', [option('Cues agree', false), option('Cues disagree', true)])] },
  'Why do predictions flip when only the camera cue changes?', [
    ['Its weight is large enough to cross the threshold.', 'The camera changes the logit by two. This outweighs the shape contribution.'],
    ['The network updates weights for the new samples.', 'The forward pass keeps all weights and biases fixed.'],
    ['The shape cue is removed by the activation.', 'ReLU passes both nonnegative shape values through unchanged.'],
  ], 0);
