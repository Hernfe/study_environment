const cell = (index) => ({ source: 'exercise4', cell: index });

function card(id, title, text, provenance, sources, context, visual, prompt, options, correct, blank) {
  const key = `L05-reach-${id}`;
  return {
    id: key, title,
    snippet: { language: 'python', text, provenance, sources: sources.map(cell), context },
    visual,
    mcq: {
      id: `${key}-mcq`, difficulty: 'easy', prompt, correct,
      options: options.map(([text, feedback]) => ({ text, feedback })),
    },
    ...(blank && { blank: { ...blank, id: `${key}-blank` } }),
  };
}

const trials = [
  ['A', 2, 8, 1], ['B', 4, 4, 1], ['C', 6, 10, 3],
  ['D', 8, 12, 5], ['E', 10, 14, 7],
];
const order = [2, 0, 1, 4, 3];
const table = (label, rowAxis, columns, rows) => ({ label, rowAxis, columns, rows });
const trialTable = (label, rows) => table(label, 'Trial', ['Neuron 1', 'Neuron 2', 'Direction'], rows);
const illustrative = (kind, alt, props) => ({
  kind, caption: 'Illustrative example', alt, ...props,
});
const fixed = (alt, summary, tables) => illustrative('schematic', alt, { data: { summary, tables } });

export const preparation = [
  card('shuffle', 'Shuffle features and labels together',
    'permutation = np.random.permutation(numTrials)\nX, y = X[permutation], y[permutation]',
    'Verbatim excerpt', [8], 'X has trial rows and neuron columns. y holds one direction code per trial.',
    illustrative('trial-permutation', 'Neuron columns show average rates in arbitrary units. Direction codes are unitless.', {
      trials, controls: [{
        id: 'order', label: 'Permutation', initial: order,
        options: [{ label: '[2, 0, 1, 4, 3]', value: order }, { label: '[4, 3, 2, 1, 0]', value: [4, 3, 2, 1, 0] }],
      }],
    }),
    'Why does the same permutation index both arrays?', [
      ['It keeps each trial with its direction.', 'Both outputs take the same original trial at each position.'],
      ['It guarantees balanced classes in both splits.', 'Random shuffling by itself does not guarantee balance.'],
      ['It reorders neurons by preferred direction.', 'Indexing X this way reorders trial rows.'],
    ], 0),
  card('split', 'Hold out complete trials',
    'half = numTrials//2\nX_train, X_val = X[:half], X[half:]\ny_train, y_val = y[:half], y[half:]',
    'Verbatim excerpt', [8], 'The notebook slices both arrays after shuffling. Use validation for model selection and reserve separate test data for final evaluation if tuning.',
    fixed('Each row is a trial. Neuron columns show illustrative rates in arbitrary units.',
      'With 5 trials, half is 2. X_train is 2 × 2 and X_val is 3 × 2. The label vectors have 2 and 3 entries.',
      [trialTable('Training', order.slice(0, 2).map((i) => trials[i])),
        trialTable('Validation', order.slice(2).map((i) => trials[i]))]),
    'What goes into validation when there are five trials?', [
      ['The last two trials and their labels.', 'The midpoint is rounded down for the training slice.'],
      ['The last three trials and their labels.', 'The validation slice starts at index 2 and takes all remaining trials.'],
      ['The last three neuron columns.', 'The split is along the trial axis. All neuron columns are kept.'],
    ], 1, {
      prompt: 'Complete the uniform-guess accuracy as a Python fraction for eight equally represented directions.',
      template: 'chance_accuracy = {fraction}',
      fields: [{ id: 'fraction', label: 'Chance accuracy fraction', accepted: ['1/8', '1 / 8', '0.125'],
        explanation: 'A uniform guess has one chance in eight of matching the direction.',
        commonErrors: '12.5 is the percentage before dividing by 100.' }],
      expectedOutput: 'The expected accuracy is 0.125, or 12.5%. Check a class-frequency baseline when evaluating imbalanced data.',
    }),
];

export const scaling = card('scale', 'Learn scaling from training data',
  'mean, std = X_train.mean(axis=0), X_train.std(axis=0)\nX_train = (X_train - mean)/(std + 1e-10)\nX_val = (X_val - mean)/(std + 1e-10)',
  'Verbatim excerpt without inline comment', [8],
  'Axis 0 reduces across trials and gives one mean and standard deviation per neuron. The small constant avoids division by zero.',
  illustrative('trial-scaling', 'This one-neuron example shows rates in arbitrary units and scaled values without units. Toggle pooled scaling to see how using validation rows changes the training transformation.', {
    train: [2, 4], validation: [8, 10],
    controls: [{ id: 'pooled', label: 'Rows used to fit scaling', initial: false, options: [
      { label: 'Training only', value: false }, { label: 'Training and validation (leakage)', value: true },
    ] }],
  }),
  'Which statistics should scale the validation rows?', [
    ['Means and SDs from validation rows.', 'That uses held-out values to fit preprocessing.'],
    ['Means and SDs from all trial rows.', 'Pooling also leaks held-out information into training.'],
    ['Means and SDs from training rows.', 'Fit preprocessing on training, then reuse that transformation.'],
  ], 2, {
    prompt: 'Use the training-derived variables defined above to scale a validation row.',
    template: 'X_val = (X_val - {center})/({spread} + 1e-10)',
    fields: [
      { id: 'center', label: 'Training center', accepted: ['mean'], explanation: 'Subtract each neuron’s training mean.' },
      { id: 'spread', label: 'Training spread', accepted: ['std'], explanation: 'Divide by each neuron’s training standard deviation plus the small constant.' },
    ],
    expectedOutput: 'Validation keeps its trial × neuron shape and uses the training reference, so its columns need not have mean zero.',
  });

export const penalty = card('penalty', 'Choose whether to penalize weights',
  "unpenalized = sk.LogisticRegression(penalty=None, solver='lbfgs')\ndefault = sk.LogisticRegression()",
  'Teaching example', [10, 11, 12],
  "Cell 11 imports sklearn.linear_model as sk and submits sk.LogisticRegression(C=np.inf). Cell 12’s older hint uses penalty='none'. The example uses Python None in the scikit-learn 1.7 API, verified with scikit-learn 1.7.2. Check your installed version.",
  fixed('The table isolates how the two objectives treat example weights. Both models still require fit.',
    'Both take trial × neuron features and one direction label per trial. The default uses L2 with finite C.',
    [table('Effect on the objective', 'Setting', ['Added cost for weights (schematic)'], [
      ['No penalty', 'Zero for any weights'], ['Default L2', 'Proportional to the sum of squared weights'],
    ])]),
  'What does the default constructor change relative to the explicit unpenalized fit?', [
    ['It applies an L2 penalty to discourage large weights.', 'The default objective includes a squared-weight penalty.'],
    ['It converts direction into a continuous target.', 'Both estimators classify the direction labels.'],
    ['It normalizes each neuron before fitting.', 'Feature scaling is a separate preprocessing step.'],
  ], 0, {
    prompt: 'Request an unpenalized fit with the scikit-learn 1.7 API.',
    template: "model = sk.LogisticRegression(penalty={penalty}, solver='lbfgs')",
    fields: [{ id: 'penalty', label: 'No penalty setting', accepted: ['None'],
      explanation: 'Use the Python value None.', commonErrors: "The string 'none' belongs to an older API. L2 adds a penalty." }],
    expectedOutput: 'An unfitted logistic classifier. Call fit with the training features and class labels.',
  });

export const evaluation = card('evaluate', 'Fit, predict and score',
  'model.fit(X_train, y_train)\npred = model.predict(X_val)\ntrain_acc = model.score(X_train, y_train)\nval_acc = model.score(X_val, y_val)',
  'Teaching excerpt adapted from submitted code', [11, 13, 14],
  'Cell 11 passes predict output directly to a plot and prints both scores. Cell 14 describes the student’s own run. The scores below are illustrative and independent of that run.',
  illustrative('classification-scores', 'Compare a wider and a narrower gap using example labels and predictions. The predictions are supplied for interpretation practice.', {
    truth: [1, 3, 5, 7],
    controls: [{ id: 'predictions', label: 'Example prediction set', initial: 'wide', options: [
      { label: 'Wider gap', value: 'wide' }, { label: 'Narrower gap', value: 'narrow' },
    ] }],
    predictions: {
      wide: { train: [1, 3, 5, 7], validation: [1, 8, 5, 2] },
      narrow: { train: [1, 3, 5, 2], validation: [1, 3, 5, 2] },
    },
  }),
  'What does a large training–validation accuracy gap suggest?', [
    ['The model is ready because its training accuracy is high.', 'Training accuracy alone cannot establish generalization.'],
    ['The model may be fitting training details that do not generalize.', 'Try L2 or fewer features using training folds, and check split quality and data shift.'],
    ['The validation labels should be used to refit this model before scoring.', 'That would turn the validation score into a training score.'],
  ], 1, {
    prompt: 'Return one predicted class label per validation trial.',
    template: 'pred = model.{method}(X_val)',
    fields: [{ id: 'method', label: 'Prediction method', accepted: ['predict'],
      explanation: 'predict returns the class labels from the fitted classifier.',
      commonErrors: 'fit estimates model parameters. score takes true labels too and returns accuracy.' }],
    expectedOutput: 'A one-dimensional array of direction codes, with one entry per validation trial.',
  });

export const temporalCV = {
  ...card('cv', 'Optional temporal decoding with fold-local scaling',
    "import sklearn.linear_model as sk\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.model_selection import cross_val_score\n\nmodel = make_pipeline(StandardScaler(), sk.LogisticRegression(penalty=None))\nscores = cross_val_score(model, X_bin, direction, cv=10)",
    'Teaching correction', [15, 16, 18],
    'Use the raw trial × neuron feature matrix for one time bin and region. Cell 16 scales all rows before cross-validation. The pipeline learns the scaler anew on each training fold and returns ten held-out scores. Cell 18 interprets bands, whose overlap alone cannot test a difference. Fold scores share training data, and scanning multiple time bins also affects inference.',
    fixed('Three example folds illustrate the rotation. The notebook uses ten folds.',
      'Each fold fits both scaling and the classifier on its training rows. Held-out rows use those fitted objects to get one accuracy.',
      [table('Illustrative fold roles', 'Fold', ['Fit scaler and model', 'Score'],
        [['1', 'B and C', 'A'], ['2', 'A and C', 'B'], ['3', 'A and B', 'C']])]),
    'When should a scaler learn the mean for one cross-validation fold?', [
      ['Once from the whole matrix before splitting.', 'Each validation fold would influence its own training transformation.'],
      ['Separately from each training fold.', 'The held-out fold is transformed using those training statistics.'],
      ['From its held-out fold alone.', 'The held-out fold should only be transformed and scored.'],
    ], 1),
  optional: true,
};
