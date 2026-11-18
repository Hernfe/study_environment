const pdf = (source, pages) => ({ source, pages });
const cell = (source, cell) => ({ source, cell });

function response(id, title, prompt, sources, criteria, modelAnswer, pitfalls, snippet) {
  return {
    id: `L08-${id}`,
    kind: snippet ? 'code' : 'written',
    title, prompt, sources, modelAnswer: [modelAnswer], pitfalls: [pitfalls],
    rubric: criteria.map(([key, text, accept]) => ({ id: `L08-${id}-${key}`, text, accept })),
    ...snippet,
  };
}

const cohorts = {
  id: 'cohorts',
  title: 'Comparing two cohorts',
  scenario: 'You have one systolic blood pressure measurement per person from two independent observational cohorts. You want to know whether their population means differ.',
  questions: [
    response('cohorts-choice', 'Choose a test', 'Choose a test and justify whether it should be paired or independent, one-sided or two-sided, and what to do if the group variances differ.',
      [pdf('statistics', '27–34')], [
        ['design', 'Matches test to design.', 'Two independent samples, because no person is measured twice or matched.'],
        ['sides', 'Justifies the sidedness.', 'Two-sided because the question has no prespecified direction.'],
        ['variances', 'Handles unequal variances.', 'Welch’s two-sample test avoids assuming equal population variances.'],
      ], 'Use a two-sided independent-samples t-test. If equal population variances are doubtful, use Welch’s version. Check distributions and unusual observations before interpreting the result.',
      'Treating separate cohorts as before-and-after measures or choosing a direction after seeing the result.'),
    response('cohorts-method', 'Explain the result format', 'Explain what goes into the test, its null hypothesis and what a small p-value means. Sketch or describe how you would show the difference and its uncertainty.',
      [pdf('statistics', '24,27–28')], [
        ['input', 'Specifies input and output.', 'Two vectors of participant measurements give a test statistic and a p-value.'],
        ['null', 'Interprets the p-value under the null.', 'With equal population means and the model assumptions, it is the probability of a test statistic at least as extreme.'],
        ['plot', 'Labels a useful plot.', 'Cohort on the horizontal axis and blood pressure on the vertical axis, with clearly named uncertainty intervals.'],
      ], 'Each input vector holds one systolic reading per participant. Under the equal-means null, the two-sided p-value is the probability of a statistic at least as extreme in either direction. Show cohort on the horizontal axis and systolic pressure on the vertical axis, with each mean and a labelled confidence interval.',
      'Reading the p-value as the probability that the means are equal.'),
    response('cohorts-limits', 'Interpret a small difference', 'Suppose the p-value is small, the estimated difference is small and the cohorts differ in weight. What would you report? Explain what a linear regression including weight could add and what causal question would remain open.',
      [pdf('statistics', '35–42'), pdf('regression', '10–11,18–19'), cell('exercise1', 17), cell('exercise1', 19)], [
        ['effect', 'Reports practical magnitude and uncertainty.', 'Give the estimated difference and an interval alongside the test result.'],
        ['caution', 'Identifies possible confounding.', 'Weight could contribute to the observed association. The comparison alone cannot identify a causal effect.'],
        ['adjustment', 'Explains what the adjusted comparison estimates.', 'With cohort and weight as inputs, the cohort coefficient estimates a difference at the same weight under the fitted model.'],
      ], 'Report the mean difference in pressure units, its uncertainty and the p-value. Fit a model predicting pressure from cohort and weight. In an additive model the cohort coefficient compares predicted pressure at the same weight. Other factors may still explain the association.',
      'Treating statistical significance as evidence of practical importance or interpreting an adjusted association as causal.'),
    response('cohorts-code', 'Defend the notebook’s test line', 'Explain both slices and both returned values. If you wanted to avoid the equal-variance assumption, what would you change in your own code and why?',
      [cell('exercise1', 2), cell('exercise1', 4), cell('exercise1', 13), pdf('statistics', '34')], [
        ['slices', 'Explains both slices.', 'Use all rows in each group and select the systolic pressure column at zero-based index 2.'],
        ['returns', 'Explains both outputs.', 'The first result is the t-statistic and the second is the p-value.'],
        ['welch', 'Explains how to use Welch’s test.', 'Set the equal-variance argument to false to avoid pooling the variance estimates.'],
      ], 'The slices select one systolic pressure value per participant in each cohort. The call returns the t-statistic and p-value. With the equal-variance argument set to false, the function uses Welch’s test.',
      'Interpreting column index 2 as participant index 2.',
      { code: 'tSYS, pSYS = stats.ttest_ind(X0[:, 2], X1[:, 2])', codeContext: 'Exercise1 cell 13. Cell 2 imports stats from SciPy. The two matrices contain participant rows.' }),
  ],
};

const rhythm = {
  id: 'rhythm',
  title: 'Tracking a brief rhythm',
  scenario: 'An electrode trace is uniformly sampled. You suspect a narrowband rhythm appears for only part of the recording and want to estimate when it appears.',
  questions: [
    response('rhythm-choice', 'Choose a time-frequency method', 'Choose a method to estimate when the rhythm appears. Explain why a whole-record spectrum is insufficient and give one consequence of shortening the analysis window.',
      [pdf('spectral', '7–10,23–25,30,40')], [
        ['method', 'Chooses a time-local method.', 'A spectrogram estimates frequency content across successive windows.'],
        ['tradeoff', 'Explains the window trade-off.', 'Shorter windows improve time localization but broaden frequency resolution.'],
      ], 'Compute a spectrogram. The whole-record power spectrum summarizes frequency content across the recording. Shorter windows localize the onset better but distinguish nearby frequencies less well.',
      'Reading the timing of the rhythm directly from a whole-record power spectrum.'),
    response('rhythm-method', 'Explain the input and map', 'Specify input and output formats, then describe a labelled sketch of the spectrogram and where you would look for the rhythm.',
      [pdf('spectral', '23–25,30')], [
        ['input', 'Describes the input.', 'A time-ordered vector of amplitudes with a known sampling rate.'],
        ['output', 'Labels both map axes and the colour scale.', 'Window time by frequency, coloured by power. A short bright band at one frequency marks a candidate rhythm.'],
      ], 'Start with amplitude samples and their sampling rate. Plot window-centre time horizontally and frequency vertically, with colour showing power. A brief horizontal band at the rhythm frequency shows when its power is elevated.',
      'Labelling colour as raw voltage or treating frequency bins as time samples.'),
    response('rhythm-limits', 'Explain what a peak establishes', 'A short bright band appears in the map. Explain a sampling limitation and why a band alone cannot identify a biological source.',
      [pdf('spectral', '7–10,23–25,29–30,37,40'), pdf('advanced', '2')], [
        ['sampling', 'Explains a sampling limitation.', 'Frequency components above the Nyquist limit can appear at lower frequencies through aliasing.'],
        ['source', 'Limits the biological interpretation.', 'A band indicates energy in the recorded signal. Recording artefact or a biological signal can both contribute.'],
      ], 'Check the sampling rate and possible aliasing. A bright band shows concentrated power in the recording, but an artefact or a biological rhythm could produce it. Check against the trace and recording context before assigning a source.',
      'Naming a biological generator based on frequency alone.'),
    response('rhythm-code', 'Defend the time axis in the notebook', 'Explain which samples are plotted, what dividing by the sampling rate does, and how to keep the time and amplitude arrays aligned if you shorten the segment.',
      [cell('exercise2', 4), cell('exercise2', 6)], [
        ['units', 'Explains the conversion to time.', 'Divide sample indices by samples per second to obtain seconds.'],
        ['slice', 'Matches indices to amplitudes.', 'The plot uses the first Nbins values and a time vector with one entry per value.'],
        ['edit', 'Keeps both shapes consistent.', 'Use the same shortened length for the time indices and the signal slice.'],
      ], 'NumPy makes consecutive indices beginning at zero. Dividing by the sampling rate yields seconds. The plot pairs those times with the first Nbins measurements. If you shorten the segment, shorten the index range and the slice together.',
      'Changing the length of the signal slice alone.',
      { code: "time = np.arange(Nbins)/sampling_frequency # x-axis range of values\naxs[0].plot(time, electrode_activity[0:Nbins],'k',linewidth=0.5)", codeContext: 'Exercise2 cell 6 plots the first second of the recording. Cell 4 imports NumPy as np and sets the sampling rate. The cell’s second panel uses wavelet coefficients. The method prompt above asks for a windowed Fourier power map.' }),
  ],
};

const trajectories = {
  id: 'trajectories',
  title: 'Comparing neural trajectories',
  scenario: 'You have mean firing rates over time for many neurons and eight reach directions. You want a compact view of how the population activity evolves.',
  questions: [
    response('trajectories-choice', 'Choose a representation', 'Choose a method for displaying the trajectories in a few dimensions. Explain how the method selects axes and how you would decide how many to show.',
      [pdf('pca1', '18–32'), cell('exercise3', 28)], [
        ['method', 'Connects PCA to the goal.', 'Project centred firing rates onto a shared basis of directions ordered by explained variance.'],
        ['dimensions', 'Justifies a display dimension.', 'Two or three axes are easy to display. Check cumulative explained variance and consider what projection discards.'],
      ], 'Use PCA to obtain a shared coordinate system across directions and times. Show two or three component scores per time point and report how much variance those components retain.',
      'Fitting a separate basis per direction and comparing the resulting axes directly.'),
    response('trajectories-method', 'Explain the matrix and sketch', 'Define PCA for a newcomer. Name the input matrix axes and score axes, and sketch how the scores form a trajectory. How could you obtain the component directions using SVD?',
      [pdf('pca1', '18–32'), pdf('pca2', '20–22'), pdf('advanced', '2'), cell('exercise3', 11), cell('exercise3', 14), cell('exercise3', 28)], [
        ['input', 'Specifies the input axes.', 'Neuron features by combined time and direction observations.'],
        ['output', 'Specifies the output and time order.', 'One score vector per time-direction observation. Join points in time order within each direction.'],
        ['plot', 'Labels score axes.', 'Plot PC1, PC2 and optionally PC3 scores, using separate lines for directions.'],
        ['svd', 'Connects PCA to SVD.', 'Apply SVD to the centred matrix and take the leading singular vectors on the neuron feature axis.'],
      ], 'PCA projects centred data onto orthogonal directions ranked by variance. Each time-direction observation has one feature per neuron and receives one vector of scores. SVD of the centred data yields component directions on the feature side. Plot the scores on labelled PC axes and connect successive time bins within each direction.',
      'Connecting points from different reach directions into a single line.'),
    response('trajectories-limits', 'Bound the interpretation', 'Suppose two trajectories separate and later overlap in the PCA plot. What does the overlap leave unresolved? A colleague sees islands in a t-SNE map of the same observations and proposes using K-means to confirm that there are distinct groups. Evaluate that conclusion.',
      [pdf('pca1', '18–32'), pdf('clustering', '17–18'), pdf('advanced', '14–15')], [
        ['projection', 'Explains separation in displayed coordinates.', 'They differ in the retained scores at some times. Overlap can hide differences in discarded components.'],
        ['meaning', 'Avoids causal overinterpretation.', 'Principal components summarize variance and do not identify independent mechanisms by themselves.'],
        ['map', 'Limits the interpretation of the map.', 't-SNE emphasizes local neighborhoods. Apparent islands can exaggerate separation.'],
        ['clustering', 'Explains why a partition is insufficient evidence.', 'K-means returns the requested number of groups even for data without natural clusters.'],
      ], 'At the overlap the displayed scores are similar. Discarded components may still differ, and PCA alone cannot establish a mechanism. t-SNE can make a continuous pattern look separated, and K-means divides observations into the requested number of groups. Examine the underlying firing-rate features before treating the groups as distinct.',
      'Counting islands or K-means labels as evidence of a particular number of neural states.'),
    response('trajectories-code', 'Defend the projection and reshape', 'Explain the centring, the shape after projection and why the reshape relies on the time-direction order. Use symbolic axis names.',
      [cell('exercise3', 4), cell('exercise3', 11), cell('exercise3', 14), cell('exercise3', 19), cell('exercise3', 22), cell('exercise3', 29)], [
        ['center', 'Explains how features are centred.', 'Subtract each neuron’s mean over the combined observations from that neuron’s column in the transposed matrix.'],
        ['projection', 'Explains projection shape.', 'The result has one row per time-direction observation and three component columns.'],
        ['reshape', 'Relates reshape to original order.', 'The final axes are time, direction and component. Direction changes fastest in the original flattened observation order.'],
      ], 'After transposition, each column represents one neuron. Subtract its mean across all observations. Matrix multiplication turns each row into three scores. The reshape restores the time and direction axes using the same ordering as the earlier flattening step.',
      'Reshaping after permuting observations without restoring their original order.',
      { code: 'frt_centered = frt.T - np.mean(frt, axis=1)\nprojected = np.real(np.dot(frt_centered, eigenvectors[:, :3]))\ntrajectories = np.reshape(projected, (numTimebins, 8, 3))', codeContext: 'Exercise3 cell 29. NumPy is np. Cell 11 averages trial firing rates, cell 14 reshapes them and cell 22 sorts the covariance eigenvectors.' }),
  ],
};

export default {
  learningMode: 'oral-practice',
  meta: { id: 'L08', number: 8, title: 'Oral exam preparation' },
  sessions: [cohorts, rhythm, trajectories],
  lectureQuiz: [],
};
