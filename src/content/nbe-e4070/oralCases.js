const pdf = (source, pages) => ({ source, pages });
const cell = (source, cell) => ({ source, cell });

export const questionLabels = [
  'Code question', 'Select an analysis', 'Explain the analysis',
  'Respond to an unsatisfactory result', 'Interpret the output',
];

const rubricFocus = {
  cohorts: ['Identify systolic pressure in both slices and name both outputs.', 'Match independent cohorts and a mean-difference goal to a suitable comparison.', 'Include the equal-means null and identify the interval or error bars on the sketch.', 'Address unequal spread or explain why adjustment for weight changes the question.', 'Read the difference and interval in mmHg and qualify importance or causality.'],
  rhythm: ['Convert indices to seconds and keep one time per amplitude.', 'Choose a representation that locates the rhythm in time as well as frequency.', 'Label time, frequency and power on the sketch.', 'Explain how a change in window length trades frequency resolution against timing.', 'Identify the middle-window peak and name a sampling or artefact check.'],
  trajectories: ['Trace centring, projection and reshape, including the direction index order.', 'Justify a common coordinate system for comparing direction trajectories.', 'Show how a time-by-direction sequence becomes a trajectory on score axes.', 'Try additional components or another common view and explain how to check what it retains.', 'Read the early, middle and late pattern on the shown axes and qualify it using discarded variation.'],
  'posture-landmarks': ['Name the averaged axis and the retained 100 × 180 shape.', 'Justify a shared linear representation for comparing posture.', 'Distinguish participant scores from coordinate directions on a labelled sketch.', 'Check association with height and justify a size adjustment or a sensitivity analysis.', 'Compare spread on a shared axis, then use the three loading coefficients per landmark and qualify the interpretation.'],
  'reach-decoder': ['Trace time averaging, the transpose and the aligned trial permutation.', 'Match categorical reach directions and held-out evaluation to a supervised classifier.', 'Show how trial rows and labels lead to one predicted class per trial and a labelled confusion matrix.', 'Address the gap with a training-only intervention and a sound held-out evaluation.', 'Compare training, validation and chance while distinguishing prediction from causal evidence.'],
  'spike-waveforms': ['Turn spike columns into rows and identify one cluster index per spike.', 'Justify an exploratory clustering method suited to waveform shape.', 'Distinguish voltage-sample features and spike rows, and label a sketch for the chosen method.', 'Propose a stability check, such as varying initialization, cut, distance or recording segment.', 'Explain why splitting the broad pattern does not establish an extra cell.'],
  'mixed-recordings': ['Identify the retained time axis and the two estimated component columns.', 'Connect source separation to linear mixing and plausible independence.', 'Label a trace sketch and state at least one separation ambiguity or assumption.', 'Tie shared transients to a plausible assumption failure or artefact and suggest a check.', 'Describe the two observed patterns and say what would validate a source identity.'],
  'skin-image-shift': ['Distinguish prediction on external feature rows from fitting.', 'Choose supervised classification with patient separation and external validation.', 'Describe the chosen classifier, its input and output, and label false negatives on the sketch.', 'Suggest a check for site or acquisition differences and explain how to validate a change.', 'Explain the external sensitivity drop in terms of missed malignant cases and qualify any clinical conclusion.'],
};

const analysisPrompt = 'What analysis would you perform, and why does it fit the dataset and goal?';
const explanationPrompt = 'Explain your analysis to a newcomer. Give a short definition, input and output shapes with axes, a labelled sketch, and one limitation.';

function practiceCase({ codePrompt, remedyPrompt, interpretationPrompt, ...data }) {
  return {
    ...data,
    rubricFocus: rubricFocus[data.id],
    prompts: [codePrompt, analysisPrompt, explanationPrompt, remedyPrompt, interpretationPrompt],
  };
}

export function buildOralCases(legacy) {
  const [cohorts, rhythm, trajectories] = legacy;
  return [
    practiceCase({
      id: cohorts.id, title: cohorts.title, scenario: cohorts.scenario,
      code: cohorts.questions[3].code, codeSource: cell('exercise1', 13),
      codeContext: 'Participant rows. The code uses SciPy stats.',
      sources: [pdf('statistics', '24,27–42'), pdf('regression', '10–11,18–19'), pdf('oral', '35–36')],
      codePrompt: 'What measurements do the slices select, and what does the call return?',
      remedyPrompt: 'The groups have very different spreads and weights. How would you check or revise the analysis?',
      interpretationPrompt: 'What does the output say about the difference? What remains uncertain about its importance and cause?',
      output: { columns: ['Comparison', 'Mean difference (mmHg)', '95% CI (mmHg)', 'Two-sided p'], rows: [['Cohort A − cohort B', '2.0', '0.2 to 3.8', '0.03']] },
      answers: [
        'Each slice takes all participant rows and column 2 (systolic pressure). The outputs are the t-statistic and p-value. The call uses the equal-variance default.',
        'Use a two-sided independent-samples comparison because the participants are distinct and either direction matters. Welch’s t-test is suitable if equal variances are doubtful.',
        'A t-test evaluates a mean difference relative to its estimated uncertainty. Input consists of two participant vectors. Output consists of a statistic and p-value. Sketch cohort horizontally and systolic pressure in mmHg vertically, marking means and labelled confidence intervals. Outliers and confounding can affect interpretation.',
        'Inspect each group and use Welch’s test for unequal variances. A regression including weight can estimate a cohort difference at a common weight, under the model assumptions.',
        'The estimated difference is 2 mmHg with a positive interval. Under the equal-means null and test assumptions, the p-value is the probability of a test statistic at least as extreme as observed. The effect could be practically small and cohort membership alone does not establish cause. This corrects the simplification on recap p36.',
      ],
    }),
    practiceCase({
      id: rhythm.id, title: rhythm.title, scenario: rhythm.scenario,
      code: rhythm.questions[3].code, codeSource: cell('exercise2', 6),
      codeContext: 'Excerpt for plotting a sampled segment. Nbins is the number of samples shown.',
      sources: [pdf('spectral', '13–19,23–30,37,40')],
      codePrompt: 'Why divide by sampling frequency? How is the time vector kept aligned with the signal?',
      remedyPrompt: 'The two nearby frequencies are indistinguishable. What could you change, and what would you lose?',
      interpretationPrompt: 'Describe the timing and frequency pattern. What would you check before assigning a biological origin?',
      output: { columns: ['Window centre (s)', 'Power near 20 hertz (relative units)'], rows: [['0.2', '1'], ['0.5', '8'], ['0.8', '1']] },
      answers: [
        'The indices run from zero through Nbins − 1. Dividing by samples per second gives seconds. The slice has the same length, so each sample gets one time.',
        'Use a spectrogram or wavelet time-frequency map. A whole-record spectrum loses the timing of brief activity.',
        'Estimate spectral energy in local regions of a sampled trace. Input is a sample vector and sampling rate. Output is frequency by time. Sketch time in seconds and frequency in Hz, with colour labelled as power. Time and frequency resolution trade off.',
        'Use a longer window to resolve nearby frequencies, at the cost of onset precision. If isolating the band, test filter cutoffs and check for ringing.',
        'Power near 20 hertz is highest in the middle window. Check sampling and aliasing, the raw trace and artefact controls before naming a generator.',
      ],
    }),
    practiceCase({
      id: trajectories.id, title: trajectories.title, scenario: trajectories.scenario,
      code: trajectories.questions[3].code, codeSource: cell('exercise3', 29),
      codeContext: 'Excerpt. frt has neurons in rows and combined time-direction observations in columns.',
      sources: [cell('exercise3', 14), pdf('pca1', '18–32'), pdf('pca2', '20–22'), pdf('advanced', '14–15')],
      codePrompt: 'Explain the centring, projection and reshape. Which index changes fastest when observations are flattened?',
      remedyPrompt: 'The first two axes retain little variance. How would you revise the display?',
      interpretationPrompt: 'What does the changing gap show, and what could the display conceal?',
      output: { columns: ['Time bin', 'Distance between two direction means in PC1–PC2 (score units)'], rows: [['Early', '0.2'], ['Middle', '2.4'], ['Late', '0.3']] },
      answers: [
        'Transpose to time-direction rows by neuron columns and subtract each neuron’s mean. Project each row onto three eigenvectors. Reshape to time by direction by component, with direction changing fastest among observations.',
        'Use a shared PCA basis to compare lower-dimensional patterns across times and directions.',
        'PCA projects centred data onto orthogonal directions ordered by variance. Rows go from one firing-rate feature per neuron to one score per retained component. Sketch PC1 against PC2 and join each direction’s bins in time order. A direction effect can lie in a low-variance axis.',
        'Inspect explained variance and additional scores. Compare a three-axis display or other informative views using a common basis.',
        'The displayed means separate most in the middle. Other PCs may still separate the late points. Trial averaging also hides individual-trial variability.',
      ],
    }),
    practiceCase({
      id: 'posture-landmarks', title: 'Standing posture across participants',
      scenario: 'You have 100 controls, each represented by the three coordinates of 60 anatomical landmarks recorded while standing upright. You want a low-dimensional linear view of variation in posture for comparison with participants with cerebral palsy.',
      code: 'centered = landmarks - landmarks.mean(axis=0)', codeSource: pdf('pca1', '21–22'),
      codeContext: 'Teaching example. landmarks has one row per participant and one column per landmark coordinate.',
      sources: [pdf('oral', '25–26,38'), pdf('pca2', '20–22')],
      codePrompt: 'What does axis=0 average, and what shape does centered retain?',
      remedyPrompt: 'The highest-variance axis tracks height. Height is outside your posture question. How would you address this?',
      interpretationPrompt: 'After adding 30 participants with cerebral palsy, their poses vary more along one shared axis. How would you identify the landmarks contributing to that variation and qualify your claim?',
      output: { columns: ['Group', 'Score SD along the shared axis (illustrative coordinate units)'], rows: [['Controls (100)', '0.6'], ['Cerebral palsy (30)', '1.4']] },
      answers: [
        'The mean is taken across people separately for every coordinate. Subtracting that 180-element vector leaves the controls’ matrix at 100 × 180.',
        'Use PCA on centred coordinates, for example via SVD. A common coordinate system lets you compare people in a few linear dimensions.',
        'PCA ranks orthogonal directions by variance. Start with 100 people by 180 coordinate features and obtain 100 people by k component scores plus a 180 by k direction matrix. Sketch PC1 versus PC2 with one point per person. Large variance can reflect body size.',
        'Check PC scores against height first. Keep a shared set of loadings and a common centring reference across groups. If size is a nuisance, consider suitable size normalization or regressing each coordinate on height and repeating PCA on residuals. Check whether posture information was lost and use the same preprocessing for both groups.',
        'The cerebral palsy group has greater score spread along the shared axis. Inspect that component’s three loading coefficients per landmark, grouping them by magnitude and visualizing displacement along the axis. Loadings describe coordinated variation and cannot establish which landmark causes it.',
      ],
    }),
    practiceCase({
      id: 'reach-decoder', title: 'Predicting reach direction',
      scenario: 'Exercise 4 records firing rates from PMd and MI in a monkey reaching in one of eight labelled directions. The array is neurons × 30 time bins × trials. You want to predict the direction on held-out trials.',
      code: 'X = np.mean(firingRate, axis=1).T\nX, y = X[permutation], y[permutation]',
      codeSource: cell('exercise4', 8),
      codeContext: 'Two lines from the same cell. y contains the direction labels and permutation contains trial indices.',
      sources: [cell('exercise4', 3), cell('exercise4', 8), cell('exercise4', 11), cell('exercise4', 12), cell('exercise4', 16), cell('exercise4', 18), pdf('regression', '12–13,18–24')],
      codePrompt: 'What happens to each axis, and why reuse the permutation for X and y?',
      remedyPrompt: 'Training accuracy greatly exceeds validation accuracy. How would you revise training and validation?',
      interpretationPrompt: 'Compare the two scores with the baseline. What does held-out accuracy establish about the neurons?',
      output: { columns: ['Set or baseline', 'Accuracy (%)'], rows: [['Train', '96'], ['Validation', '44'], ['Uniform guess (8 classes)', '12.5']] },
      answers: [
        'Mean over axis 1 removes the 30 time bins, leaving neurons by trials; transpose to trials by neurons. Applying the same trial permutation to the features and labels preserves their alignment.',
        'Use a multiclass classifier such as logistic regression because the target is a categorical direction. Ordinary linear regression produces continuous numbers.',
        'Logistic regression learns class scores from labelled trials. The feature matrix is trials by neurons, with one label per training trial. predict produces one label per validation trial and score reports the accuracy. Sketch true direction versus predicted direction in a confusion matrix. Averaging across time can hide temporal information.',
        'Keep each trial entirely in one split and fit feature scaling on training trials only. Cell 11 submits C=np.inf, while cell 12 uses the historical string syntax for the penalty. For the tested scikit-learn 1.7 API, penalty=None explicitly disables the penalty and the default applies L2. Tune regularization in training folds and reserve a separate final test set. Put scaling inside each cross-validation fold to correct the leakage in cell 16.',
        'Validation beats uniform guessing in the illustration, but it trails training by 52 percentage points. Check the class-frequency baseline, uncertainty and leakage controls. For temporal decoding, overlap of the bands discussed in cell 18 cannot establish significance. Held-out prediction shows association with direction and does not establish causal control.',
      ],
    }),
    practiceCase({
      id: 'spike-waveforms', title: 'Grouping electrode waveforms',
      scenario: 'An electrode recording yields many detected spikes, each represented by 51 consecutive voltage samples. There are no cell labels. You want to explore whether waveform shapes form reproducible groups.',
      code: 'labels = KMeans(n_clusters=K, n_init=10, random_state=0).fit_predict(waveforms.T)',
      codeSource: cell('exercise2', 23),
      codeContext: 'Verbatim notebook line. waveforms has sample offsets in rows and spikes in columns.',
      sources: [pdf('clustering', '5–18'), cell('exercise2', 15)],
      codePrompt: 'Why transpose waveforms? What does each value in labels represent?',
      remedyPrompt: 'Assignments change substantially with the clustering settings. How would you investigate stability?',
      interpretationPrompt: 'Does this output establish the number of cells? Explain what further evidence you would want.',
      output: { columns: ['Requested groups', 'Group sizes (spikes)', 'Visible waveform pattern'], rows: [['2', '80, 20', 'Broad group and narrow group'], ['3', '40, 40, 20', 'Broad group split into near duplicates']] },
      answers: [
        'The transpose puts spikes in rows and 51 sample offsets in columns. The call returns one cluster index per spike.',
        'Use a distance-based clustering method for an exploratory partition. K-means can summarize compact groups. Hierarchical clustering can inspect nested structure before choosing a cut.',
        'K-means alternates assignments to nearby centroids with centroid updates. Input is spikes by offsets, output is labels and centroids. Sketch time offset in ms versus voltage in µV for each centroid. K and the distance metric affect membership.',
        'Compare multiple initializations, choices of K and distances. Inspect waveforms across recording segments and check sensitivity to detection artefacts and preprocessing.',
        'The third centroid appears to subdivide the broad group. The algorithm was asked to find three groups. Check waveform stability, timing and recording artefacts before assigning groups to cells.',
      ],
    }),
    practiceCase({
      id: 'mixed-recordings', title: 'Separating mixed recordings',
      scenario: 'Two sensors record simultaneous mixtures of two underlying signals. The mixing is assumed approximately linear, and the underlying signals may be independent. You want to recover useful source traces.',
      code: 'sources = FastICA(n_components=2).fit_transform(recordings)',
      codeSource: pdf('advanced', '5–13'),
      codeContext: 'Teaching example using scikit-learn. recordings has time samples in rows and sensors in columns.',
      sources: [pdf('oral', '47'), pdf('advanced', '5–13')],
      codePrompt: 'What are the input and output axes? What does the component-count argument specify?',
      remedyPrompt: 'Both components still contain the same transients. What assumptions or data problems would you check?',
      interpretationPrompt: 'What does the example suggest, and why can’t you label each recovered trace as a confirmed source?',
      output: { columns: ['Recovered component', 'Dominant pattern'], rows: [['1', 'Regular oscillation'], ['2', 'Sparse spikes']] },
      answers: [
        'The input is time samples by two sensors. The call fits a separation and returns time samples by two estimated components.',
        'Choose ICA if independent, suitably non-Gaussian sources are plausible under linear mixing. PCA optimizes variance and yields uncorrelated scores.',
        'ICA estimates projections that separate independent source signals. Input and output share the time axis, with sensor columns becoming component columns. Sketch time horizontally and component amplitude in arbitrary units vertically. Component order, sign and scale are ambiguous.',
        'Check for shared artefacts, dependent sources, nonlinear mixing or too few sensors. Test reproducibility on other segments and compare with reference signals.',
        'The extracted patterns differ, consistent with some separation. Similarity to a known pattern is weak evidence by itself. Validate the interpretation with independent recordings or context.',
      ],
    }),
    practiceCase({
      id: 'skin-image-shift', title: 'Classifying images across clinics',
      scenario: 'You have labelled skin lesion images from one clinic and want to distinguish malignant from benign lesions at a second clinic, where cameras and patient populations differ.',
      code: 'predicted = forest.predict(X_external)',
      codeSource: pdf('advanced', '16–17,21,23'),
      codeContext: 'Teaching example. The forest is fitted and the input contains one feature vector per external image.',
      sources: [pdf('oral', '48–49,51'), pdf('advanced', '16–23')],
      codePrompt: 'What is passed into predict, what comes back, and does this fit the model?',
      remedyPrompt: 'Performance drops at the second clinic. How would you investigate and improve it?',
      interpretationPrompt: 'Explain the drop in sensitivity and the clinical risk. What evidence would you need before using the classifier?',
      output: { columns: ['Evaluation site', 'Sensitivity (%)', 'Specificity (%)'], rows: [['Development clinic, held out', '90', '85'], ['External clinic', '58', '83']] },
      answers: [
        'predict uses a fitted forest on external image feature rows and returns one predicted class per image. It does not update the model.',
        'Use supervised classification with patient-level separation and an external test. A forest on validated image features or a suitably trained image network is defensible.',
        'A forest combines decisions from multiple trees. Train on images represented as feature rows plus diagnosis labels, and output one class or score per image. Sketch true diagnosis versus predicted diagnosis and label false negatives. A forest can learn camera or site artefacts. For a network answer, describe image arrays passing through learned layers to a class score, with the same confusion-matrix axes and shortcut risk.',
        'Inspect acquisition and patient differences and rule out repeated-patient leakage. Evaluate by site and subgroup. If adapting the model, use new held-out external data to test changes.',
        'The external classifier misses about 42% of malignant cases in this example. Sensitivity alone does not identify the cause of the drop. Check uncertainty, representative external validation and clinical consequences before deployment.',
      ],
    }),
  ];
}
