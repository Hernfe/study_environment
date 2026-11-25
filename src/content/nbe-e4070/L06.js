import { svd, correlation } from './advancedCards.js';

export default {
  "meta": {
    "id": "L06",
    "number": 6,
    "title": "PCA II, SVD and Fourier"
  },
  "learningMode": "topic-study",
  "compactPractice": true,
  "intro": [
    "Read the theory, answer the short checks and use the interactive code cards in context. Open the optional code explanations or written prompts to rehearse for the oral.",
    "Exact source: Lecture6 PCA II, 46 PDF pages, plus Exercise3 high-dimensional PCA. The dataset and p40 video are absent; no saved notebook output is certified as a fresh result."
  ],
  "sections": [
    {
      "id": "causal-evidence",
      "title": "1. Association and causal evidence",
      "sources": [
        {
          "source": "pca2",
          "pages": "2–10"
        }
      ],
      "priority": "Opening regression quiz: recall from L05. Blue: causal examples; p8 discussion exercise.",
      "blocks": [
        {
          "type": "text",
          "body": "The opening regression quiz recalls binary logistic outcomes, LASSO’s absolute-weight penalty, overfitting with many inputs/few training samples, and PCA before regression. Revisit L05 if these distinctions are unclear."
        },
        {
          "type": "definition",
          "term": "Association versus intervention",
          "body": "A correlation describes how variables vary together. It does not show what would happen if one were changed deliberately. Other factors can affect both, so a predictive regression coefficient is not a causal effect."
        },
        {
          "type": "compare",
          "title": "Two evidence problems from p8",
          "columns": [
            "Drug benefit",
            "Potentially harmful exposure"
          ],
          "rows": [
            {
              "label": "Comparison",
              "cells": [
                "Randomized drug versus placebo trial.",
                "Control other factors in observational studies; the slides also discuss animal experiments."
              ]
            },
            {
              "label": "Reasoning",
              "cells": [
                "Randomization aims to balance alternative explanations.",
                "Seek converging evidence and a plausible mechanism; association alone is insufficient."
              ]
            }
          ]
        },
        {
          "type": "detail",
          "title": "Mechanism and limits",
          "body": "The smoking example links carcinogenic metabolites, DNA changes and tumor-suppressor disruption. A plausible mechanism supports a causal account, but does not turn an uncontrolled association into a randomized result. The slides’ examples are reasoning practice, not treatment advice."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-causal",
          "difficulty": "easy",
          "prompt": "What does a correlation establish by itself?",
          "options": [
            {
              "text": "The variables vary together in the observed data.",
              "feedback": "Correct. Association is an observed relationship."
            },
            {
              "text": "Changing one variable produces the other outcome.",
              "feedback": "An intervention claim needs causal evidence."
            },
            {
              "text": "The fitted coefficient isolates an intervention.",
              "feedback": "A predictive coefficient does not isolate a causal effect."
            },
            {
              "text": "The fitted direction rules out other causes.",
              "feedback": "Other factors can generate the same association."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca2",
              "pages": "6–10"
            }
          ]
        },
        {
          "id": "L06-trial",
          "difficulty": "easy",
          "prompt": "Which comparison does the lecture propose for evaluating a drug?",
          "options": [
            {
              "text": "Regress symptoms against self-selected dosage.",
              "feedback": "Self-selection can confound the comparison."
            },
            {
              "text": "Randomize drug versus placebo allocation.",
              "feedback": "Correct. Random allocation addresses alternative group differences."
            },
            {
              "text": "Compare p-values across unrelated studies.",
              "feedback": "Different p-values are not a randomized treatment comparison."
            },
            {
              "text": "Correlate sales against recovery frequency.",
              "feedback": "Sales and recovery can share other causes."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca2",
              "pages": "8–10"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "change-of-basis",
      "title": "2. PCA and Fourier as changes of basis",
      "sources": [
        {
          "source": "pca2",
          "pages": "12–19"
        }
      ],
      "priority": "Red: PCA algebra and Fourier basis (pp13–14). Orange: geometry, stationarity and the conditional connection.",
      "blocks": [
        {
          "type": "definition",
          "term": "PCA coordinates",
          "body": "Center each feature over samples. PCA learns orthonormal feature directions from covariance; scores are each sample’s coordinates along those directions. Different score coordinates have zero covariance, which does not imply independent sources."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "X_c=X-\\mu,\\quad C=\\frac{X_cX_c^T}{N-1}=EDE^T,\\quad Z=E^TX_c",
              "label": "Convention throughout: $X_c$ has $F$ feature rows and $N$ sample columns. $E$ has eigenvectors as columns; $D$ contains their variances. Here covariance uses sample divisor $N-1$; p13 gives the decomposition."
            }
          ]
        },
        {
          "type": "compare",
          "columns": [
            "PCA",
            "Fourier"
          ],
          "rows": [
            {
              "label": "Basis",
              "cells": [
                "Directions learned from the dataset covariance.",
                "Fixed sine/cosine functions indexed by frequency."
              ]
            },
            {
              "label": "Coordinates",
              "cells": [
                "Scores along PC directions, ranked by variance.",
                "Complex coefficients encoding amplitude and phase."
              ]
            },
            {
              "label": "Axes",
              "cells": [
                "Feature coordinates become PC coordinates.",
                "Time sample index becomes frequency index; sampling interval sets physical frequency."
              ]
            }
          ]
        },
        {
          "type": "definition",
          "term": "Stationary process",
          "body": "The joint probability distribution stays the same when all times are shifted together. This does not mean a trace is constant. The slides contrast idle EEG/ECG excerpts with growing tumors or heartbeat-aligned ECG excerpts; stationarity must be an appropriate model for the chosen data."
        },
        {
          "type": "steps",
          "title": "When the bases connect",
          "steps": [
            "For the periodic stationary model on p18, covariance depends on circular time lag: rows are cyclic shifts, a circulant matrix.",
            "A Fourier basis diagonalizes this covariance, so it is a valid PCA eigenbasis.",
            "For general data PCA and Fourier need not agree. Finite estimated covariance is not guaranteed circulant; degenerate eigenvalues also allow alternative eigenvector bases."
          ]
        },
        {
          "type": "detail",
          "title": "Read the slide shorthand carefully",
          "body": "Page19’s broad stationary conclusion is read with p18’s periodic/circulant premise. In a complex Fourier representation, the inverse of a unitary basis uses conjugate transpose. Fourier frequency order is not automatically the PCA variance ranking."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-pca-basis",
          "difficulty": "easy",
          "prompt": "Which object contains feature directions in the PCA convention above?",
          "options": [
            {
              "text": "Rows of the centered observation matrix.",
              "feedback": "Rows contain centered feature measurements, not the learned directions."
            },
            {
              "text": "Columns of the covariance eigenvector matrix.",
              "feedback": "Correct. Each eigenvector column is a feature-space direction."
            },
            {
              "text": "Rows of the cumulative variance vector.",
              "feedback": "Cumulative variance is a summary, not a direction."
            },
            {
              "text": "Columns of the sample score matrix.",
              "feedback": "Each score column describes one sample in PC coordinates."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca2",
              "pages": "12–13"
            }
          ]
        },
        {
          "id": "L06-fourier-basis",
          "difficulty": "easy",
          "prompt": "How is the Fourier basis selected?",
          "options": [
            {
              "text": "It is fitted to diagnostic class labels.",
              "feedback": "Class labels do not define the Fourier basis."
            },
            {
              "text": "It is fitted to covariance eigenvalues.",
              "feedback": "PCA learns from covariance; Fourier has a known basis."
            },
            {
              "text": "It is fixed by sinusoidal frequencies.",
              "feedback": "Correct. It re-expresses the sequence in known sinusoidal coordinates."
            },
            {
              "text": "It is fixed by a retained variance goal.",
              "feedback": "A variance goal selects PCs, not the Fourier basis."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca2",
              "pages": "14–15"
            }
          ]
        },
        {
          "id": "L06-circulant",
          "difficulty": "easy",
          "prompt": "Which covariance structure supports the taught exact Fourier/PCA connection?",
          "options": [
            {
              "text": "A diagonal matrix with arbitrary unequal entries.",
              "feedback": "A general diagonal covariance need not have a Fourier eigenbasis."
            },
            {
              "text": "A covariance matrix estimated from any trace.",
              "feedback": "Finite recordings do not automatically have circulant covariance."
            },
            {
              "text": "A matrix describing a heartbeat-aligned trend.",
              "feedback": "Alignment can create time-dependent distributions."
            },
            {
              "text": "A circulant matrix under the periodic model.",
              "feedback": "Correct. Circular lag structure permits a Fourier eigenbasis."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca2",
              "pages": "16–19"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "svd",
      "codeVisualCards": [svd],
      "title": "3. SVD, PCA and low-rank reconstruction",
      "sources": [
        {
          "source": "pca2",
          "pages": "20–22"
        }
      ],
      "priority": "Orange: understand the decomposition, its axes and the ranked outer-product view.",
      "blocks": [
        {
          "type": "definition",
          "term": "Singular Value Decomposition",
          "body": "SVD factorizes the centered data matrix directly. It separates feature patterns, their nonnegative strengths and sample patterns. PCA instead describes covariance eigenvectors and their explained variances; the same directions connect both views."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "X_c=USV^T,\\quad Z=U^TX_c=SV^T,\\quad \\lambda_j=\\frac{s_j^2}{N-1}",
              "label": "For the feature-row convention, left singular vectors in $U$ are PC directions. A compact SVD with $r=\\min(F,N)$ has $U:F\\times r$, $S:r\\times r$, $V^T:r\\times N$. Zero singular values may remain; rank can be smaller than $r$."
            }
          ]
        },
        {
          "type": "steps",
          "title": "Read a component",
          "steps": [
            "A column of U gives one feature pattern, not one observation.",
            "The corresponding row of the score matrix supplies that pattern’s coefficient for every sample.",
            "Multiply the feature column by its score row to get one rank-one feature-by-sample matrix. Add components to reconstruct centered data."
          ]
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "X_c=\\sum_j s_j u_jv_j^T,\\qquad \\hat X=\\mu+U_KZ_K",
              "label": "Keeping $K$ leading terms gives an approximation; restore feature means to return to original coordinates. The discarded terms contain all omitted variation, not necessarily just noise."
            }
          ]
        },
        {
          "type": "detail",
          "title": "Normalization and orientation",
          "body": "Page20 reverses E’s orientation relative to pp13/21; use the consistent feature-column eigenvectors on those pages. Page21’s square-root eigenvalue shorthand is for an unnormalized product. Normalized covariance eigenvalues are squared singular values divided by the declared divisor, not singular values themselves."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-svd-scores",
          "difficulty": "easy",
          "prompt": "In the feature-row convention, which SVD quantity gives PCA scores?",
          "options": [
            {
              "text": "The left directions $U$ alone.",
              "feedback": "U gives directions shared by all samples."
            },
            {
              "text": "The scaled sample patterns $SV^T$.",
              "feedback": "Correct. Multiplying the centered data by U transpose gives these scores."
            },
            {
              "text": "The diagonal strengths $S$ alone.",
              "feedback": "S has strengths but not a coordinate for every sample."
            },
            {
              "text": "The feature covariance $US^2U^T$.",
              "feedback": "This is the unnormalized feature covariance product, not scores."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca2",
              "pages": "20–21"
            }
          ]
        },
        {
          "id": "L06-rank-one",
          "difficulty": "easy",
          "prompt": "What is each term in the outer-product view?",
          "options": [
            {
              "text": "One covariance entry for a feature pair.",
              "feedback": "The term reconstructs the whole data matrix, not just covariance."
            },
            {
              "text": "One mean estimate for each observation.",
              "feedback": "Means are handled separately by centering."
            },
            {
              "text": "One feature pattern times a score row.",
              "feedback": "Correct. The outer product has feature-by-sample shape and rank at most one."
            },
            {
              "text": "One class label times a feature index.",
              "feedback": "SVD does not require class labels."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca2",
              "pages": "22"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "correlation",
      "codeVisualCards": [correlation],
      "title": "4. Covariance, correlation and feature scaling",
      "sources": [
        {
          "source": "pca2",
          "pages": "23–25"
        }
      ],
      "priority": "Red: Pearson correlation definition. Orange: examples and standardized PCA.",
      "blocks": [
        {
          "type": "definition",
          "term": "Pearson correlation",
          "body": "Pearson correlation is covariance divided by the product of the two standard deviations. It measures linear association, lies between minus one and one, and is dimensionless. Both standard deviations must be nonzero. Zero correlation does not rule out nonlinear dependence."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "R_{ij}=\\frac{C_{ij}}{\\sigma_i\\sigma_j},\\qquad \\tilde X_i=\\frac{X_i-\\mu_i}{\\sigma_i}",
              "label": "Use consistent covariance/SD divisors. Each row of $\\tilde X$ is a standardized feature, centered with unit variance. With sample SD, its sample covariance is the original correlation matrix."
            }
          ]
        },
        {
          "type": "compare",
          "columns": [
            "Covariance PCA",
            "Correlation PCA"
          ],
          "rows": [
            {
              "label": "Scale",
              "cells": [
                "Retains meaningful differences in feature variation and units.",
                "Standardizes feature scales before finding directions."
              ]
            },
            {
              "label": "Consequence",
              "cells": [
                "Large numerical feature variance can dominate.",
                "Each nonconstant feature starts with unit variance."
              ]
            },
            {
              "label": "Choice",
              "cells": [
                "Useful when absolute variation is meaningful.",
                "Useful when scales are incomparable; may amplify a noisy weak-variance feature."
              ]
            }
          ]
        },
        {
          "type": "detail",
          "title": "What a scatter plot can hide",
          "body": "Positive and negative signs describe the direction of linear association; magnitude describes its strength. A curved pattern can have weak Pearson correlation. Changing units alters covariance PCA, while consistent positive rescaling is removed by z-scoring. Constant features require handling before division."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-pearson",
          "difficulty": "easy",
          "prompt": "What does Pearson normalization remove from covariance?",
          "options": [
            {
              "text": "Dependence on the variables’ measurement scales.",
              "feedback": "Correct. Dividing by SDs makes the coefficient dimensionless."
            },
            {
              "text": "Dependence between all pairs of observations.",
              "feedback": "Normalization does not make observations independent."
            },
            {
              "text": "Evidence of any nonlinear relationship present.",
              "feedback": "It measures linear association and can miss nonlinear patterns."
            },
            {
              "text": "Variation remaining within each measured feature.",
              "feedback": "Unit variance after standardization is not zero variance."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca2",
              "pages": "23–25"
            }
          ]
        },
        {
          "id": "L06-standardize",
          "difficulty": "easy",
          "prompt": "What is correlation-matrix PCA equivalent to here?",
          "options": [
            {
              "text": "PCA after centering the sample labels.",
              "feedback": "Labels are not used to standardize features."
            },
            {
              "text": "PCA after sorting observations by size.",
              "feedback": "Sorting samples does not standardize feature scales."
            },
            {
              "text": "PCA after dividing scores by variance.",
              "feedback": "Changing scores after fitting does not fit correlation PCA."
            },
            {
              "text": "PCA after z-scoring each input feature.",
              "feedback": "Correct. Standardize nonconstant feature rows with consistent divisors."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca2",
              "pages": "25"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "case-studies",
      "title": "5. Visualize data and reconstruct ECG beats",
      "sources": [
        {
          "source": "pca2",
          "pages": "27–39"
        }
      ],
      "priority": "Blue: three case studies are applications/food for thought, not numerical results to memorize.",
      "blocks": [
        {
          "type": "definition",
          "term": "Visualizing a many-feature dataset",
          "body": "The breast-cancer example describes 30 image-derived features for 569 samples with diagnostic labels. Center/scale, find directions, rank variance and project samples. Plot PC1 horizontally and PC2 vertically; each point is a sample. The labels color the interpretation, not the unsupervised PCA objective."
        },
        {
          "type": "misconception",
          "wrong": "A separated-looking two-PC plot is a validated diagnostic classifier.",
          "right": "It is an exploratory view. It omits other dimensions and does not establish held-out diagnostic performance or causal features."
        },
        {
          "type": "steps",
          "title": "ECG denoising by reconstruction",
          "steps": [
            "Segment and align comparable beats; represent each beat as a sample with relative-time bins as features.",
            "Center, compute PCs and keep a chosen number of components. Project beats into that reduced space.",
            "Reconstruct beats with retained directions, add the mean and restitch intervals into a temporal trace.",
            "Inspect preserved morphology and removed variation. A low-variance change may be important; high-variance artifacts can also survive."
          ]
        },
        {
          "type": "detail",
          "title": "ECG context and reading the examples",
          "body": "P wave: atrial depolarization; PR segment: delay before ventricular activation; QRS: ventricular depolarization; ST: interval before ventricular repolarization; T wave: ventricular repolarization (p35). Breathing, muscle movement and external interference can contaminate recordings (p36). PCA scores are not those named ECG waves."
        },
        {
          "type": "detail",
          "title": "Source results are demonstrations",
          "body": "Page30 describes about 90% variance in six components for that example. Page38 compares reconstructions with different retained counts. These are reported illustrations, not newly reproduced analyses or universal recommended counts. Holter recording does not imply defibrillation capability; that device claim is not taught here."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-sample-point",
          "difficulty": "easy",
          "prompt": "In the breast-cancer PC1/PC2 plot, what is one point?",
          "options": [
            {
              "text": "One sample expressed by two component scores.",
              "feedback": "Correct. Projection assigns score coordinates to each sample."
            },
            {
              "text": "One feature expressed by two diagnostic labels.",
              "feedback": "Features define directions; diagnosis does not define the axes."
            },
            {
              "text": "One component expressed by two sample labels.",
              "feedback": "Each point is a sample, not a PC."
            },
            {
              "text": "One covariance expressed by two original units.",
              "feedback": "Axes are scores, not covariance entries."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca2",
              "pages": "28–33"
            }
          ]
        },
        {
          "id": "L06-ecg-restore",
          "difficulty": "easy",
          "prompt": "After reconstructing centered ECG beats, what restores their baseline representation?",
          "options": [
            {
              "text": "Divide every beat by its discarded eigenvalues.",
              "feedback": "Discarded values are not a baseline offset."
            },
            {
              "text": "Add back the feature means used for centering.",
              "feedback": "Correct. The projection reconstructed deviations around the mean beat."
            },
            {
              "text": "Replace time-bin order with eigenvalue rank.",
              "feedback": "Time bins remain in their original relative order."
            },
            {
              "text": "Sort each reconstructed beat by signal size.",
              "feedback": "Sorting destroys waveform shape."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca2",
              "pages": "34–39"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "eigenworms",
      "title": "6. From body shapes to trajectories",
      "sources": [
        {
          "source": "pca2",
          "pages": "40–45"
        }
      ],
      "priority": "Blue: qualitative C. elegans application. The p40 video is unavailable.",
      "blocks": [
        {
          "type": "definition",
          "term": "Eigenworms",
          "body": "Represent body shape by tangent-angle features along the centerline, removing overall orientation as illustrated on p41. PCA gives shape modes, called eigenworms. At each time, mode scores describe how much each shape pattern contributes."
        },
        {
          "type": "definition",
          "term": "A trajectory in score space",
          "body": "Plot one mode score against another and connect successive times. Axes are mode amplitudes, not physical position or time. Oscillatory score patterns can form a loop; later examples relate modes to locomotion and steering without making every PC a separate biological cause."
        },
        {
          "type": "example",
          "title": "Read the application sequence",
          "body": "Page42 compares mode variances and shapes across worms. Page43 links paired mode amplitudes to an oscillation; p44 relates another mode to turning. Page45 illustrates a phase-conditioned thermal stimulus and changed trajectories. These are qualitative examples, not a reproduced stimulation experiment."
        },
        {
          "type": "detail",
          "title": "Unavailable media and limits",
          "body": "The black rectangle on p40 is a video placeholder. No clip/PPTX is supplied, and no question requires it. A few high-variance modes describe the measured shapes; they do not prove complete behavioral state, independence, or a causal neural mechanism."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-worm-mode",
          "difficulty": "easy",
          "prompt": "What does an eigenworm direction describe?",
          "options": [
            {
              "text": "A physical path of the worm across the arena.",
              "feedback": "That is a spatial trajectory, not a shape basis vector."
            },
            {
              "text": "A time vector listing every stimulus delivery.",
              "feedback": "Stimulus times are not shape eigenvectors."
            },
            {
              "text": "A coordinated pattern across body-shape features.",
              "feedback": "Correct. Scores describe contributions of this pattern at each time."
            },
            {
              "text": "A behavioral label assigned to every movie frame.",
              "feedback": "PCA learns variation directions rather than class labels."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca2",
              "pages": "41–42"
            }
          ]
        },
        {
          "id": "L06-trajectory-axis",
          "difficulty": "easy",
          "prompt": "In a mode-score trajectory plot, what do the axes represent?",
          "options": [
            {
              "text": "Two body positions measured across the arena.",
              "feedback": "Position and shape-score coordinates differ."
            },
            {
              "text": "Two time indices measured from stimulus onset.",
              "feedback": "Time orders points along the trajectory, not both axes."
            },
            {
              "text": "Two covariance entries measured along the body.",
              "feedback": "A trajectory plots scores, not covariance entries."
            },
            {
              "text": "Two component amplitudes evaluated at each time.",
              "feedback": "Correct. Connecting successive score pairs makes time implicit along the path."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca2",
              "pages": "43–45"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "neural-notebook",
      "title": "7. Exercise 3: defend the high-dimensional PCA pipeline",
      "sources": [
        {
          "source": "exercise3",
          "cell": 3
        }
      ],
      "priority": "Notebook assignment: explain your own processing and axes. Dataset absent; saved outputs are not a fresh run.",
      "blocks": [
        {
          "type": "text",
          "body": "Exercise3 studies motor/premotor population activity during eight reach directions. The notebook extends the lecture’s low-dimensional trajectory idea to neurons. Its actual code is present alongside unfinished help templates; a solution-marker comment alone does not mean a cell is empty."
        },
        {
          "type": "steps",
          "title": "Data layout before code",
          "steps": [
            "Raw firingRate: neuron by time bin by trial. Direction is one label per trial.",
            "Cell6 selects a region/direction, averages neurons first, then averages trials; its SEM uses trial-to-trial variation of the neuron average.",
            "Cells11/14 average trials separately per direction, preserving each neuron, then reshape to neuron by time/direction condition.",
            "Cells19/22/24 compute covariance, sort eigenpairs and summarize retained variance.",
            "Cell29 centers/project samples, reshapes scores to time by direction by PC; cell31 connects score triples over time."
          ]
        },
        {
          "type": "detail",
          "title": "What each choice loses",
          "body": "A population mean can hide patterns in which neurons change differently. Trial averaging can reduce inconsistent variation but removes trial variability. Three PCs are a visualization choice, not all retained information. A 95% variance target does not identify all biological signals. Hardcoded plot ticks and saved prose are not evidence of shape or performance."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 300\" style=\"width:100%;height:auto\" aria-hidden=\"true\"><g fill=\"currentColor\" font-family=\"system-ui,sans-serif\" font-size=\"16\"><text x=\"20\" y=\"30\">Trial-averaged input: neuron × time × 8</text><text x=\"240\" y=\"68\" text-anchor=\"middle\">↓ reshape, C order</text><rect x=\"20\" y=\"85\" width=\"440\" height=\"64\" rx=\"4\" fill=\"none\" stroke=\"currentColor\"/><text x=\"240\" y=\"110\" text-anchor=\"middle\">Neuron × (time · 8) conditions</text><text x=\"240\" y=\"135\" text-anchor=\"middle\">column t · 8 + d → time t, direction d</text><text x=\"240\" y=\"182\" text-anchor=\"middle\">↓ center, project, transpose scores</text><text x=\"240\" y=\"222\" text-anchor=\"middle\">(time · 8) × 3 PC scores</text><text x=\"240\" y=\"260\" text-anchor=\"middle\">↓ reshape → time × 8 directions × 3 PCs</text></g></svg>",
            "caption": "Original symbolic axis map of the actual Exercise3 reshape. Direction varies fastest in the flattened sample axis; no source data are shown.",
            "fallbackAlt": "Neuron by time by eight directions reshapes to neuron by time-times-eight conditions. Column t times eight plus d maps to time t and direction d; projected rows reshape to time by eight by three PCs."
          }
        }
      ],
      "conceptQuiz": [
        {
          "id": "L06-neural-feature",
          "difficulty": "easy",
          "prompt": "In Exercise3’s covariance matrix, what is a feature?",
          "options": [
            {
              "text": "One trial averaged across all recorded neurons.",
              "feedback": "Trial averaging is done per neuron and condition."
            },
            {
              "text": "One direction averaged across all recorded times.",
              "feedback": "Direction is part of the sample conditions, not the feature rows."
            },
            {
              "text": "One time bin averaged across every reach trial.",
              "feedback": "Time is also part of the sample conditions."
            },
            {
              "text": "One neuron measured across time/direction conditions.",
              "feedback": "Correct. np.cov compares neuron rows of frt."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca2",
              "pages": "12–13"
            },
            {
              "source": "exercise3",
              "cell": 18
            },
            {
              "source": "exercise3",
              "cell": 19
            }
          ]
        },
        {
          "id": "L06-neural-count",
          "difficulty": "easy",
          "prompt": "What does a cumulative explained-variance percentage summarize?",
          "options": [
            {
              "text": "The share of processed variation retained by leading PCs.",
              "feedback": "Correct. It describes the chosen representation and preprocessing."
            },
            {
              "text": "The share of trials assigned the correct movement label.",
              "feedback": "PCA variance is not supervised classification accuracy."
            },
            {
              "text": "The share of neurons that causally control the movement.",
              "feedback": "Variance does not establish a causal neuron count."
            },
            {
              "text": "The share of samples discarded before fitting the basis.",
              "feedback": "PC truncation removes directions rather than selecting sample rows."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca2",
              "pages": "21–22"
            },
            {
              "source": "exercise3",
              "cell": 23
            },
            {
              "source": "exercise3",
              "cell": 24
            },
            {
              "source": "exercise3",
              "cell": 26
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L06-code-layout",
          "kind": "code",
          "title": "Trace averaging and reshape",
          "prompt": "Explain which axis is averaged, each output shape, and how a column of the 2D array maps back to time and direction. Does reshape average anything? Use zero-based time t and direction d.",
          "sources": [
            {
              "source": "exercise3",
              "cell": 11
            },
            {
              "source": "exercise3",
              "cell": 14
            }
          ],
          "rubric": [
            {
              "id": "L06-code-layout-c1",
              "text": "Identifies original axes.",
              "accept": "firingRate is neurons by time bins by trials; direction selects trials for each reach direction."
            },
            {
              "id": "L06-code-layout-c2",
              "text": "Explains trial averaging.",
              "accept": "axis=2 averages selected trials, keeping neurons and time; fr has neurons by time bins by 8."
            },
            {
              "id": "L06-code-layout-c3",
              "text": "Explains flattened axes.",
              "accept": "frt has neurons by (time bins times 8); each column is a time/direction condition, not a trial."
            },
            {
              "id": "L06-code-layout-c4",
              "text": "Traces C-order indexing.",
              "accept": "column t*8+d corresponds to fr[:,t,d]; direction varies fastest, not entire direction blocks."
            },
            {
              "id": "L06-code-layout-c5",
              "text": "Bounds what is retained.",
              "accept": "Averaging can emphasize consistent patterns but loses trial variability; reshape only rearranges indices."
            }
          ],
          "modelAnswer": [
            "For each of eight directions, select matching trials and average along the trial axis. The result fr retains one time course per neuron/direction. Reshape preserves all these averages in a feature-row matrix. With default C order, direction varies fastest: column t*8+d stores fr[:,t,d]. No additional average happens.",
            "Trial-level variation is already lost; neither exact neuron counts nor variance results follow without the data."
          ],
          "pitfalls": [
            "Calling each flattened column a trial.",
            "Reading direction as contiguous blocks of all times."
          ],
          "code": "fr = np.zeros((numNeurons, numTimebins, 8))\n\nfor d in range(1, 9):\n    fr[:, :, d-1] = np.mean(firingRate[:, :, direction == d], axis=2)\nfrt = np.reshape(fr, (numNeurons, numTimebins * 8))",
          "codeContext": "Real Exercise3 excerpt. NumPy (np) and Matplotlib (plt) imports are in cell4. The missing HatsopoulosReachTask.mat prevents a fresh run; read symbolic axes, not saved results. Cells11/14: trial averaging and reshape."
        },
        {
          "id": "L06-code-eigen",
          "kind": "code",
          "title": "Match eigenvectors to explained variance",
          "prompt": "Explain the default covariance orientation/divisor, why the same sorting indices act on eigenvector columns, and what the cumulative ratio means. Why is adding one needed for the component count? State a limitation of a 95% threshold.",
          "sources": [
            {
              "source": "exercise3",
              "cell": 19
            },
            {
              "source": "exercise3",
              "cell": 22
            },
            {
              "source": "exercise3",
              "cell": 24
            }
          ],
          "rubric": [
            {
              "id": "L06-code-eigen-c1",
              "text": "Explains covariance.",
              "accept": "np.cov uses feature rows and centers them; cov is neurons by neurons, default sample divisor (time bins times 8 minus 1)."
            },
            {
              "id": "L06-code-eigen-c2",
              "text": "Keeps eigenpairs together.",
              "accept": "Descending indices reorder eigenvalues and corresponding eigenvector columns, not rows."
            },
            {
              "id": "L06-code-eigen-c3",
              "text": "Explains ratio.",
              "accept": "Cumulative eigenvalue sum divided by total is percentage of retained variance, assuming nonzero total."
            },
            {
              "id": "L06-code-eigen-c4",
              "text": "Explains count.",
              "accept": "searchsorted returns a zero-based position; plus one converts first threshold-reaching index to a component count."
            },
            {
              "id": "L06-code-eigen-c5",
              "text": "Avoids dimensionality overclaim.",
              "accept": "95% summarizes this representation and scaling; remaining variance can matter and the count is not complete biological dimensionality."
            }
          ],
          "modelAnswer": [
            "Rows of frt are neurons, so cov compares neurons across all time/direction conditions with sample normalization. Each eigenvector column must stay paired with its eigenvalue when sorting descending. The cumulative fraction measures variance kept, not classification accuracy.",
            "The search gives the first position reaching 95; add one to count components. No numeric answer is verified here. A threshold is descriptive of the processed data, not proof of a fixed number of biological degrees of freedom."
          ],
          "pitfalls": [
            "Sorting eigenvector rows.",
            "Reading hardcoded plotting ticks or saved responses as verified dataset dimensions."
          ],
          "code": "cov = np.cov(frt)\neigenvalues, eigenvectors = np.linalg.eig(cov)\nidx = np.argsort(eigenvalues)[::-1]\neigenvalues = eigenvalues[idx]\neigenvectors = eigenvectors[:, idx]\nexplained_variance = np.cumsum(eigenvalues) / np.sum(eigenvalues) * 100\nn = np.searchsorted(explained_variance, 95) + 1",
          "codeContext": "Real Exercise3 excerpt. NumPy (np) and Matplotlib (plt) imports are in cell4. The missing HatsopoulosReachTask.mat prevents a fresh run; read symbolic axes, not saved results. Cells19/22/24: selected exact covariance, sorting and ratio lines."
        },
        {
          "id": "L06-code-project",
          "kind": "code",
          "title": "Defend the projection and restored axes",
          "prompt": "Trace the subtraction, dot product and reshape. State every axis and the broadcast mean’s length. Why is np.real not a general way to repair a faulty eigendecomposition?",
          "sources": [
            {
              "source": "exercise3",
              "cell": 29
            }
          ],
          "rubric": [
            {
              "id": "L06-code-project-c1",
              "text": "Explains centering/broadcast.",
              "accept": "frt.T is (time bins times 8) by neurons; mean(axis=1) on frt has one entry per neuron and broadcasts across rows."
            },
            {
              "id": "L06-code-project-c2",
              "text": "Identifies retained directions.",
              "accept": "eigenvectors[:, :3] has neurons by 3; sorted columns are the three leading directions."
            },
            {
              "id": "L06-code-project-c3",
              "text": "Gives score shape.",
              "accept": "Dot product returns (time bins times 8) by 3; it is sample-row scores, transpose of the lecture score convention."
            },
            {
              "id": "L06-code-project-c4",
              "text": "Restores ordering.",
              "accept": "trajectories is time bins by 8 directions by 3 PCs, consistent with direction-fast flattening."
            },
            {
              "id": "L06-code-project-c5",
              "text": "Qualifies real extraction.",
              "accept": "For real symmetric covariance real eigenpairs are expected; inspect non-negligible imaginary parts/numerical issues rather than blindly discarding them."
            }
          ],
          "modelAnswer": [
            "Subtract the neuron-mean vector from each row of the transposed matrix. Multiply by three retained feature-direction columns to get one three-score row for each time/direction condition. Reshape restores time, direction and PC axes in the same C order used earlier.",
            "The np.real call drops imaginary parts; it does not validate the covariance or eigenpairs. Check unexpected imaginary components and matrix symmetry rather than using it to conceal an error."
          ],
          "pitfalls": [
            "Subtracting each sample’s mean across neurons.",
            "Treating np.real as an algorithm for finding correct eigenvectors."
          ],
          "code": "frt_centered = frt.T - np.mean(frt, axis=1)\nprojected = np.real(np.dot(frt_centered, eigenvectors[:, :3]))\n\ntrajectories = np.reshape(projected, (numTimebins, 8, 3))",
          "codeContext": "Real Exercise3 excerpt. NumPy (np) and Matplotlib (plt) imports are in cell4. The missing HatsopoulosReachTask.mat prevents a fresh run; read symbolic axes, not saved results. Cell29, after cell22 sorting. Assumes at least three feature directions."
        },
        {
          "id": "L06-code-plot",
          "kind": "code",
          "title": "Read trajectory axes and the separation statistic",
          "prompt": "For one direction i, explain what each plotted coordinate contains and how successive points are ordered. Explain the axes removed by var and sum, and why an argmax time is not a causal or statistical-significance result. Connect this to the earlier mean/CI plot.",
          "sources": [
            {
              "source": "exercise3",
              "cell": 6
            },
            {
              "source": "exercise3",
              "cell": 31
            }
          ],
          "rubric": [
            {
              "id": "L06-code-plot-c1",
              "text": "Explains plot coordinates.",
              "accept": "For fixed direction i, each slice spans time for a particular PC; PC1/2/3 are score axes, not physical hand position."
            },
            {
              "id": "L06-code-plot-c2",
              "text": "Explains spread.",
              "accept": "Variance across axis1 compares 8 directions at each time/PC; sum(axis=1) then sums the 3 PC variances, leaving a time vector."
            },
            {
              "id": "L06-code-plot-c3",
              "text": "Explains time lookup.",
              "accept": "argmax indexes maximum spread in retained score space; time is np.arange(numTimebins)*dt from cell6."
            },
            {
              "id": "L06-code-plot-c4",
              "text": "Contrasts population mean.",
              "accept": "Cell6 averages neurons before trial means/SEM; PCA retains weighted population patterns, and its trajectory spread is not that trial SEM."
            },
            {
              "id": "L06-code-plot-c5",
              "text": "Limits interpretation.",
              "accept": "Truncation/averaging affect separation; no significance test or causal mechanism is established, and no maximum time is certified without data."
            }
          ],
          "modelAnswer": [
            "Each coordinate is a component-score time series for direction i; connecting time-ordered triples gives its neural trajectory. Variance over the direction axis yields a time-by-PC array, then summing PCs gives one retained-space spread per time. argmax locates the largest value, and time converts that index using dt.",
            "Cell6 instead averages neurons and computes uncertainty across trials. Differences in retained trajectories can be hidden by a simple population mean, but this spread statistic is not a test or proof of a causal motor code."
          ],
          "pitfalls": [
            "Calling a PC axis seconds or hand position.",
            "Reporting the saved maximum-separation time as newly reproduced."
          ],
          "code": "ax.plot(trajectories[:, i, 0],\n            trajectories[:, i, 1],\n            trajectories[:, i, 2],\n            color=color, label=angle_str[i])\nax.set_xlabel('First PC')\nax.set_ylabel('Second PC')\nax.set_zlabel('Third PC')\nspread = np.sum(np.var(trajectories, axis=1), axis=1)\nmax_time = np.argmax(spread)",
          "codeContext": "Real Exercise3 excerpt. NumPy (np) and Matplotlib (plt) imports are in cell4. The missing HatsopoulosReachTask.mat prevents a fresh run; read symbolic axes, not saved results. Cell31 excerpts: ax is a 3D axis; i indexes direction, color/angle_str label it. The omitted loop plots each direction."
        }
      ]
    }
  ],
  "finalWritten": [
    {
      "id": "L06-written-pca",
      "kind": "written",
      "title": "Explain PCA to a newcomer: the four-part task",
      "prompt": "In about five minutes: (1) define PCA in one or two sentences; (2) use Exercise3 as your example and specify the input/output type and every matrix axis; (3) sketch two measured-feature axes with a dominant PC direction, then PC1/PC2 score axes, or describe the drawing; (4) explain uses, limitations and overinterpretation. Include how SVD finds the same directions. Equations are optional. This follows the actual L07 p2 explanation exercise.",
      "sources": [
        {
          "source": "pca2",
          "pages": "12–13,20–22"
        },
        {
          "source": "exercise3",
          "cell": 10
        },
        {
          "source": "exercise3",
          "cell": 13
        },
        {
          "source": "exercise3",
          "cell": 18
        },
        {
          "source": "exercise3",
          "cell": 28
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ],
      "rubric": [
        {
          "id": "L06-written-pca-c1",
          "text": "Defines the method clearly.",
          "accept": "Orthogonal directions summarize variance; scores re-express centered observations with uncorrelated coordinates."
        },
        {
          "id": "L06-written-pca-c2",
          "text": "Specifies example input and output.",
          "accept": "Neuron-feature rows by time/direction sample columns; retained-PC rows by the same samples, or the explicitly transposed sample-row convention."
        },
        {
          "id": "L06-written-pca-c3",
          "text": "Labels a meaningful sketch.",
          "accept": "Measured feature1/feature2 axes with a long cloud and dominant direction; transformed axes PC1/PC2, with largest spread along PC1. Text description accepted."
        },
        {
          "id": "L06-written-pca-c4",
          "text": "Connects SVD and a use.",
          "accept": "Left singular vectors of centered feature-row data give directions; scaled right patterns give scores. Visualization, compression or denoising is a use."
        },
        {
          "id": "L06-written-pca-c5",
          "text": "Explains limitations.",
          "accept": "Scaling/averaging/truncation change interpretation; low variance can matter, zero covariance is not independence, and variance does not prove biological causation."
        }
      ],
      "modelAnswer": [
        "PCA finds orthogonal directions along which centered data vary most and expresses observations as scores. For Exercise3, neurons are features and time/direction conditions are samples; keeping three directions gives three scores per condition.",
        "Sketch a feature1-versus-feature2 cloud elongated along PC1, then the rotated PC1/PC2 axes with zero cross-covariance. In feature-row SVD, U holds these directions and S times V transpose holds scores. This makes population patterns easier to visualize and permits reduced reconstruction.",
        "It can omit meaningful weak variation and depends on scaling and preprocessing; uncorrelated scores are not automatically independent or causal mechanisms."
      ],
      "pitfalls": [
        "Describing scores as neuron labels.",
        "Leaving sketch axes unspecified or treating three visualization axes as complete biological dimensionality."
      ]
    },
    {
      "id": "L06-written-fourier",
      "kind": "written",
      "title": "Explain Fourier, then bound the PCA connection",
      "prompt": "Give the separate five-minute L07 p2 Fourier explanation: (1) a one- or two-sentence definition; (2) a hypothetical uniformly sampled ECG excerpt with input/output types, axes and sampling information; (3) a labelled time-trace and frequency-spectrum sketch, or its text description; (4) uses, limitations and overinterpretation. Then explain when the lecture connects its basis to PCA and why this does not hold for all recordings. Equations are optional.",
      "sources": [
        {
          "source": "pca2",
          "pages": "14–19"
        },
        {
          "source": "spectral",
          "pages": "7–10,23–25,37"
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ],
      "rubric": [
        {
          "id": "L06-written-fourier-c1",
          "text": "Defines the method.",
          "accept": "Re-express a sequence in fixed sine/cosine frequency coordinates, complex coefficients encode amplitude and phase."
        },
        {
          "id": "L06-written-fourier-c2",
          "text": "Defines input/output.",
          "accept": "Input length-N time vector with uniform interval; output length-N complex coefficient vector indexed by frequency; sampling rate and length set frequency interpretation."
        },
        {
          "id": "L06-written-fourier-c3",
          "text": "Labels sketch axes.",
          "accept": "Trace: time versus signal amplitude; spectrum: frequency versus squared coefficient magnitude/power. A hypothetical tone peak suffices without measured values."
        },
        {
          "id": "L06-written-fourier-c4",
          "text": "States use and limits.",
          "accept": "Analyze spectral content/filter; full-record power omits timing and phase, sampling can alias, time-varying content may need spectrogram/wavelets."
        },
        {
          "id": "L06-written-fourier-c5",
          "text": "Qualifies the PCA link.",
          "accept": "Circulant covariance under a periodic stationary model has a Fourier eigenbasis; arbitrary finite empirical covariances and variance rankings need not match."
        }
      ],
      "modelAnswer": [
        "Fourier transform expresses a sampled signal using known sine and cosine frequencies, with coefficients carrying amplitude and phase. For an invented ECG excerpt sampled uniformly, the input is a time-indexed vector and the output a frequency-indexed complex vector of the same full length.",
        "State sample interval and record length to label physical frequencies. Sketch time versus amplitude and frequency versus power, distinguishing the spectrum from the complex transform. Frequency analysis and filtering are useful, but a whole-record spectrum hides when events occur, and inadequate sampling can alias.",
        "A Fourier basis is a valid PCA basis when covariance is circulant, as in the periodic stationary idealization; that is a conditional link, not an equivalence for every ECG."
      ],
      "pitfalls": [
        "Giving only power as the full Fourier output.",
        "Calling an aligned heartbeat ensemble stationary just because beats repeat."
      ]
    },
    {
      "id": "L06-written-reconstruct",
      "kind": "written",
      "title": "Defend scaling and a reduced reconstruction",
      "prompt": "Hypothetical practice: you receive ECG beat segments measured on the same amplitude scale and an image-feature table with incomparable feature units. Defend covariance versus standardized PCA for each; explain SVD factors, normalized eigenvalues and how to reconstruct from K components. Propose what you would inspect before calling the result denoised or diagnostically useful. Include an important low-variance change.",
      "sources": [
        {
          "source": "pca2",
          "pages": "20–25,28–39"
        }
      ],
      "rubric": [
        {
          "id": "L06-written-reconstruct-c1",
          "text": "Makes a reasoned scaling choice.",
          "accept": "Preserve meaningful ECG amplitude variation if appropriate; standardize incomparable image features if scales lack meaning, but inspect noisy/constant features."
        },
        {
          "id": "L06-written-reconstruct-c2",
          "text": "Explains factor roles and shapes.",
          "accept": "Declare feature-row input; U feature directions, S strengths, V transpose sample patterns; scores S times V transpose."
        },
        {
          "id": "L06-written-reconstruct-c3",
          "text": "Uses normalized variances.",
          "accept": "Sample covariance eigenvalues squared singular values divided by N−1, population convention by N; ratios consistent."
        },
        {
          "id": "L06-written-reconstruct-c4",
          "text": "Reconstructs in original coordinates.",
          "accept": "Retain direction columns and score rows, multiply and add feature mean; undo feature standardization when returning to original units."
        },
        {
          "id": "L06-written-reconstruct-c5",
          "text": "Checks limits against the task.",
          "accept": "Inspect waveform morphology, lost weak variation and surviving artifacts; a two-PC colored plot is exploratory, not held-out diagnostic validation."
        }
      ],
      "modelAnswer": [
        "Scale choices express which variation matters. For comparable ECG bins, absolute amplitude may be meaningful; for unlike image-feature units, standardization can prevent numerical units dominating. Feature-row SVD yields U directions and S times V transpose scores.",
        "Squared singular values divided by the chosen covariance divisor give variances. Keep K directions/scores, multiply, add means and, if standardized, restore feature scales. Inspect reconstructed morphology, small but important waveform changes and retained artifacts before claiming denoising.",
        "A visually separated image-feature plot alone is not a validated diagnosis."
      ],
      "pitfalls": [
        "Calling every discarded direction noise.",
        "Reconstructing with normalized eigenvalues in place of scores or omitting means/scales."
      ]
    },
    {
      "id": "L06-written-code",
      "kind": "written",
      "title": "Defend your Exercise3 pipeline and its limits",
      "prompt": "Explain the supplied Exercise3 steps from trial tensor to eight three-PC neural trajectories. Contrast the neuron-average/CI calculation with trial averaging for PCA. Trace the exact reshape order, sorted columns, centering and dot product, then explain what the spread maximum measures. If asked when directions separate most, state what can and cannot be concluded without the missing data. This is code explanation, not a claim that the analysis was rerun.",
      "sources": [
        {
          "source": "exercise3",
          "cell": 6
        },
        {
          "source": "exercise3",
          "cell": 14
        },
        {
          "source": "exercise3",
          "cell": 29
        },
        {
          "source": "exercise3",
          "cell": 31
        }
      ],
      "rubric": [
        {
          "id": "L06-written-code-c1",
          "text": "Separates the two averages.",
          "accept": "Cell6 averages neurons then trials with trial SEM; cell11 averages trials per direction retaining neurons."
        },
        {
          "id": "L06-written-code-c2",
          "text": "Maps the condition axis.",
          "accept": "fr shape neurons by time by 8, frt neurons by (time times 8); column t*8+d, direction-fast."
        },
        {
          "id": "L06-written-code-c3",
          "text": "Traces fitting and centering.",
          "accept": "Covariance over neuron rows, descending eigenpairs by columns; frt transpose subtracts per-neuron mean across samples."
        },
        {
          "id": "L06-written-code-c4",
          "text": "Traces output and plotting.",
          "accept": "Sample-row projection (time times 8) by 3 reshapes to time by 8 by 3; lines are time-ordered score triples, not physical hand positions."
        },
        {
          "id": "L06-written-code-c5",
          "text": "Bounds the interpretation.",
          "accept": "Sum of three across-direction PC variances per time gives retained-space spread; argmax is descriptive, no verified timing/significance/causality without data."
        }
      ],
      "modelAnswer": [
        "The mean/CI plot first collapses neurons and uses trial variation for its error bars. PCA instead averages trials separately for each neuron/direction, preserving population patterns. Reshape makes time/direction conditions into columns with direction fastest.",
        "Covariance compares neuron rows; reorder eigenvector columns with their eigenvalues. The centered transpose times three direction columns gives sample-row scores, which reshape consistently to time by direction by PC. Plot one time-ordered triple sequence per direction.",
        "The sum of direction variances across these three PCs is descriptive spread, not a significance or causal test. Missing data prevent independently certifying the maximum time or component count; saved notebook text is not a fresh result."
      ],
      "pitfalls": [
        "Equating spread across directions with uncertainty across trials.",
        "Claiming the notebook’s saved neuron count, threshold count or separation time was reproduced."
      ]
    }
  ],
  "lectureQuiz": []
};
