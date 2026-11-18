// Source-grounded lecture text; no private source imports or dataset observations.
export default {
  "meta": {
    "id": "L07",
    "number": 7,
    "title": "Advanced methods"
  },
  "learningMode": "topic-study",
  "intro": [
    "Theory and easy MCQs come first in every unit; code reading follows the relevant checks. Four substantial oral-style free-text prompts finish the lecture, including separate PCA and Fourier explanations from page 2.",
    "Exact source: L07 advanced methods, 30 PDF pages. No advanced-method notebook is supplied. New snippets are labelled sample practice; real Exercise2 excerpts support cumulative code defense. Datasets, Exercise4 and the lecture 8 deck remain unavailable."
  ],
  "sections": [
    {
      "id": "ica",
      "title": "1. Beyond PCA: separate independent sources",
      "sources": [
        {
          "source": "advanced",
          "pages": "6–13"
        }
      ],
      "priority": "Red: PCA limitations and independent components. Blue: cocktail-party illustration and demixing geometry.",
      "blocks": [
        {
          "type": "definition",
          "term": "Independent component analysis (ICA)",
          "body": "ICA seeks coordinates aligned with statistically independent source signals. PCA removes cross-covariance using orthogonal variance directions; those directions need not reveal non-Gaussian source structure. Uncorrelated does not mean independent."
        },
        {
          "type": "example",
          "title": "Cocktail-party input and output",
          "body": "In the taught square example, each microphone records a linear mixture of simultaneous voices. Input rows are microphones and columns are time samples. Output rows are estimated sources with the same time columns. ICA is source separation, not a class-label predictor."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "X=AS,\\qquad \\hat S=WX",
              "label": "Here $A$ mixes source rows $S$ into microphone rows $X$; $W$ demixes them. The ideal square example needs invertible mixing. The lecture assumes independent non-Gaussian sources."
            }
          ]
        },
        {
          "type": "steps",
          "title": "Why whitening is only the first step",
          "steps": [
            "Center the observed mixtures and use PCA to remove covariance. Rescale nonzero-variance coordinates to unit variance.",
            "Whitened coordinates can still mix independent sources. Search a further rotation for non-Gaussian projections, for example using kurtosis as the lecture suggests.",
            "Interpret estimated components against the source model; a decomposition alone is not proof of separate biological causes."
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 480 310\" style=\"width:100%;height:auto\" aria-hidden=\"true\"><g fill=\"none\" stroke=\"currentColor\"><rect x=\"50\" y=\"15\" width=\"380\" height=\"55\" rx=\"5\"/><path d=\"M240 70V100m-5-8 5 8 5-8\"/><rect x=\"50\" y=\"100\" width=\"380\" height=\"55\" rx=\"5\"/><path d=\"M240 155V185m-5-8 5 8 5-8\"/><rect x=\"50\" y=\"185\" width=\"380\" height=\"55\" rx=\"5\"/></g><g fill=\"currentColor\" font-family=\"system-ui,sans-serif\" font-size=\"16\" text-anchor=\"middle\"><text x=\"240\" y=\"39\">Microphone mixtures</text><text x=\"240\" y=\"60\">Rows: microphones; columns: time</text><text x=\"240\" y=\"124\">Center and whiten</text><text x=\"240\" y=\"145\">Uncorrelated, unit-variance coordinates</text><text x=\"240\" y=\"209\">Rotate for non-Gaussianity</text><text x=\"240\" y=\"230\">Rows: estimated sources; columns: time</text><text x=\"240\" y=\"280\">Whitening alone does not separate voices</text></g></svg>",
            "caption": "Original symbolic ICA workflow for the taught square linear mixture. No recorded signals or source artwork.",
            "fallbackAlt": "Microphone-by-time mixtures are centered and whitened, then rotated using non-Gaussianity to give source-by-time estimates. Whitening alone does not recover voices."
          }
        },
        {
          "type": "detail",
          "title": "SVD and whitening notation",
          "body": "Pages 12–13 describe undoing rotations and scaling using SVD. Singular values of the mixing matrix are not covariance eigenvalues. Whitening divides PCA coordinates by the square root of their covariance eigenvalues, using a consistent covariance normalization. Do not divide by the eigenvalues themselves."
        },
        {
          "type": "detail",
          "title": "Scope of the non-Gaussianity intuition",
          "body": "The lecture invokes the central-limit intuition that mixing independent non-Gaussian sources tends to look more Gaussian. This motivates a search, not a guarantee for every mixture. The title calls this a nonlinear-methods lecture, but the displayed ICA mixing model is linear."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-ica-goal",
          "difficulty": "easy",
          "prompt": "What is ICA trying to recover?",
          "options": [
            {
              "text": "Maximum-variance coordinates.",
              "feedback": "That is the variance-based PCA objective."
            },
            {
              "text": "Independent source coordinates.",
              "feedback": "Correct. ICA targets independent sources."
            },
            {
              "text": "Frequency-indexed coefficients.",
              "feedback": "Those describe Fourier coordinates."
            },
            {
              "text": "Supervised class predictions.",
              "feedback": "Classification needs labels; ICA demixes sources."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "advanced",
              "pages": "6–10"
            }
          ]
        },
        {
          "id": "L07-ica-model",
          "difficulty": "easy",
          "prompt": "Which mixture assumption is taught here?",
          "options": [
            {
              "text": "Sources are averaged after labelling.",
              "feedback": "ICA does not require supervised labels."
            },
            {
              "text": "Sources are assigned to centroids.",
              "feedback": "Centroid assignment describes clustering."
            },
            {
              "text": "Sources are sorted by peak frequency.",
              "feedback": "Sorting frequencies does not describe this model."
            },
            {
              "text": "Sources are linearly mixed together.",
              "feedback": "Correct. Each microphone contains a weighted linear combination."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "advanced",
              "pages": "8–9"
            }
          ]
        },
        {
          "id": "L07-whiten",
          "difficulty": "easy",
          "prompt": "What does whitening establish?",
          "options": [
            {
              "text": "The coordinates have unit covariance.",
              "feedback": "Correct. Identity covariance means unit variance and zero cross-covariance, not independence."
            },
            {
              "text": "The signals have fixed frequency bins.",
              "feedback": "Whitening is not Fourier transformation."
            },
            {
              "text": "The signals have known source labels.",
              "feedback": "Whitening does not identify voices."
            },
            {
              "text": "The coordinates have maximal variance.",
              "feedback": "PCA ranks variance; whitening rescales it."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "advanced",
              "pages": "12–13"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L07-code-demix",
          "kind": "code",
          "title": "Read a demixing matrix, not a fitted ICA solution",
          "prompt": "Explain both matrix axes and the multiplication. What condition on the mixing matrix is needed here? Why does this code not demonstrate that ICA learned independent sources?",
          "sources": [
            {
              "source": "advanced",
              "pages": "8–13"
            }
          ],
          "rubric": [
            {
              "id": "L07-code-demix-c1",
              "text": "Names the data axes.",
              "accept": "S is sources by time samples; A is microphones by sources, so X is microphones by time."
            },
            {
              "id": "L07-code-demix-c2",
              "text": "Explains the inverse.",
              "accept": "For this square example A must be invertible; W is sources by microphones."
            },
            {
              "id": "L07-code-demix-c3",
              "text": "Tracks output shape.",
              "accept": "The estimated-source matrix has the same source-by-time shape as S under this ideal mixing model."
            },
            {
              "id": "L07-code-demix-c4",
              "text": "Distinguishes known and learned mixing.",
              "accept": "A is supplied here; fitting ICA would infer a demixing transform from observed mixtures."
            },
            {
              "id": "L07-code-demix-c5",
              "text": "States the assumptions.",
              "accept": "Independent non-Gaussian sources and linear mixing are the taught model; inversion alone does not establish them."
            }
          ],
          "modelAnswer": [
            "Multiplying A by S makes each microphone row a weighted mixture over sources at each time. An invertible square A permits W to undo this known mixing, giving source-by-time estimates.",
            "This sample supplies A, so it is an algebra check, not a learned ICA result. ICA instead uses independence/non-Gaussianity to infer a separating basis from mixtures."
          ],
          "pitfalls": [
            "Treating time samples as microphones.",
            "Calling inversion of known A a fitted ICA analysis."
          ],
          "code": "import numpy as np\n# S: sources by time; A: microphones by sources\nX = A @ S\nW = np.linalg.inv(A)\nS_hat = W @ X",
          "codeContext": "Original symbolic sample practice, not a supplied notebook or executed recording. Assumes as many microphones as sources and an invertible mixing matrix. No data values or recovered voices are claimed."
        }
      ]
    },
    {
      "id": "tsne",
      "title": "2. t-SNE: a map for exploration",
      "sources": [
        {
          "source": "advanced",
          "pages": "14–15"
        }
      ],
      "priority": "Red: map definition. Orange: overinterpretation risks.",
      "blocks": [
        {
          "type": "definition",
          "term": "t-distributed stochastic neighbor embedding (t-SNE)",
          "body": "A nonlinear visualization method assigns each high-dimensional sample a location in two or three dimensions. For a sample-row feature table, the output has the same sample rows and two or three coordinate columns. Map axes are not measured features or principal components."
        },
        {
          "type": "compare",
          "columns": [
            "What to read",
            "What to avoid"
          ],
          "rows": [
            {
              "label": "Neighborhoods",
              "cells": [
                "Nearby mapped samples may suggest locally similar profiles.",
                "Assuming every original neighbor is perfectly preserved."
              ]
            },
            {
              "label": "Global layout",
              "cells": [
                "Use the map as an exploratory view.",
                "Reading island spacing or map area as original global geometry."
              ]
            },
            {
              "label": "Stochastic result",
              "cells": [
                "Inspect sensitivity to initialization and analysis choices.",
                "Treating a single attractive map as proof of natural clusters."
              ]
            }
          ]
        },
        {
          "type": "misconception",
          "wrong": "A stochastic algorithm cannot reproduce a map under any conditions.",
          "right": "Page 15 warns about run-to-run changes. Fixed randomness and the same setup can permit reproducibility; a repeatable map can still distort structure. Reproducibility alone does not establish a correct biological interpretation."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-tsne-output",
          "difficulty": "easy",
          "prompt": "What is a t-SNE output in this lecture?",
          "options": [
            {
              "text": "A diagnostic probability per feature.",
              "feedback": "It is a visualization, not a supervised diagnostic model."
            },
            {
              "text": "A low-dimensional location per sample.",
              "feedback": "Correct. It provides two- or three-coordinate map locations."
            },
            {
              "text": "An independent source per microphone.",
              "feedback": "That describes the ICA aim."
            },
            {
              "text": "A Fourier frequency per time sample.",
              "feedback": "A map coordinate is not a Fourier frequency."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "advanced",
              "pages": "14"
            }
          ]
        },
        {
          "id": "L07-tsne-local",
          "difficulty": "easy",
          "prompt": "Which structure does t-SNE emphasize?",
          "options": [
            {
              "text": "The ranking of original variances.",
              "feedback": "Variance ranking is associated with PCA."
            },
            {
              "text": "The separation of labelled classes.",
              "feedback": "Labels are not needed to make this visualization."
            },
            {
              "text": "The similarity of local neighbors.",
              "feedback": "Correct. Local neighborhoods are emphasized over global geometry."
            },
            {
              "text": "The order of temporal frequencies.",
              "feedback": "t-SNE is not a spectral transform."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "15"
            }
          ]
        },
        {
          "id": "L07-tsne-island",
          "difficulty": "easy",
          "prompt": "What does a separated t-SNE island justify first?",
          "options": [
            {
              "text": "A confirmed biological cell class.",
              "feedback": "Separation alone does not validate a natural class."
            },
            {
              "text": "An original-space distance estimate.",
              "feedback": "Global map distances need not preserve original distances."
            },
            {
              "text": "A calibrated diagnostic threshold.",
              "feedback": "This requires a separate prediction/validation task."
            },
            {
              "text": "An exploratory group to investigate.",
              "feedback": "Correct. Check original features and analysis sensitivity."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "advanced",
              "pages": "15"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L07-code-map",
          "kind": "code",
          "title": "Defend the notebook plot before proposing t-SNE",
          "prompt": "Read the real Exercise2 projection. Name features, samples and both output axes. Explain why replacing this PCA display with t-SNE would change the meaning of distances and would not certify the number of cells.",
          "sources": [
            {
              "source": "advanced",
              "pages": "14–15"
            },
            {
              "source": "exercise2",
              "cell": 4
            },
            {
              "source": "exercise2",
              "cell": 15
            },
            {
              "source": "exercise2",
              "cell": 19
            },
            {
              "source": "exercise2",
              "cell": 25
            }
          ],
          "rubric": [
            {
              "id": "L07-code-map-c1",
              "text": "Identifies input axes.",
              "accept": "waveforms has 51 time-bin features by detected-spike columns, assuming valid complete windows."
            },
            {
              "id": "L07-code-map-c2",
              "text": "Explains centering.",
              "accept": "axis=1 averages across spikes per time bin; keepdims preserves a feature column for broadcast."
            },
            {
              "id": "L07-code-map-c3",
              "text": "Tracks projection.",
              "accept": "The first two sorted eigenvector columns transpose to 2 by 51; proj is 2 by number of spikes."
            },
            {
              "id": "L07-code-map-c4",
              "text": "Explains plot axes.",
              "accept": "Each point is one waveform; coordinates are PC1 and PC2 scores. For t-SNE sample-row input would be waveforms.T and output sample rows by 2 coordinates."
            },
            {
              "id": "L07-code-map-c5",
              "text": "Bounds the inference.",
              "accept": "PCA scores are linear variance coordinates; t-SNE emphasizes neighborhoods, not reliable global distance or proven cell identities."
            }
          ],
          "modelAnswer": [
            "The code subtracts the mean waveform and projects each spike column onto two sorted PC directions. The plot uses two score rows, one point per spike.",
            "A t-SNE map would give nonlinear visualization coordinates. Compare original waveform structure before inferring groups; neither display alone determines how many cells produced the spikes."
          ],
          "pitfalls": [
            "Saying the 51 bins are 51 neurons.",
            "Treating a map island as a verified cell class."
          ],
          "code": "centred = waveforms - waveforms.mean(axis=1, keepdims=True) # Subtract the mean waveform from every column\nproj = eigvecs[:, :2].T @ centred\nplt.scatter(proj[0], proj[1], s=2)\nplt.xlabel('PC1', fontsize=18)\nplt.ylabel('PC2', fontsize=18)",
          "codeContext": "Real Exercise2 cell19 excerpt; imports NumPy as np and Matplotlib as plt in cell4. waveforms from cell15, eigvecs sorted earlier in cell19. Missing electrode_recording.mat prevents a fresh analysis. No t-SNE notebook is supplied."
        }
      ]
    },
    {
      "id": "trees",
      "title": "3. Decision trees and random forests",
      "sources": [
        {
          "source": "advanced",
          "pages": "16–17"
        }
      ],
      "priority": "Red: feature splits, overfitting and ensemble voting.",
      "blocks": [
        {
          "type": "definition",
          "term": "Decision tree",
          "body": "A classifier routes a sample through feature-threshold questions to a predicted class at a leaf. Training recursively splits labelled samples to separate their classes. Input is a feature vector; output is a label. A whole table has sample rows and feature columns plus a training-label vector."
        },
        {
          "type": "steps",
          "title": "Read a tree",
          "steps": [
            "Start at the root and evaluate the named feature threshold.",
            "Follow the yes/no branch and repeat for the next feature.",
            "At a leaf, read its class prediction. The path explains the rule used, not why the disease occurs."
          ]
        },
        {
          "type": "definition",
          "term": "Random forest",
          "body": "A collection of decision trees votes on a class. Individual trees can overfit training details; combining their predictions can improve generalization. A forest is an ensemble, not a guarantee of better performance on every dataset."
        },
        {
          "type": "detail",
          "title": "Stopping and split criteria",
          "body": "Page 16 illustrates splitting until leaves share a class. Practical stopping limits can leave mixed leaves; purity is not a requirement for every fitted tree. Supplement p27 introduces entropy/information gain and Gini impurity as measures of class mixing used to choose splits. Detailed calculations are optional here."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-tree-split",
          "difficulty": "easy",
          "prompt": "What does a branch in the taught decision tree test?",
          "options": [
            {
              "text": "A single feature against a threshold.",
              "feedback": "Correct. Samples follow feature-threshold branches."
            },
            {
              "text": "A single source against a microphone.",
              "feedback": "That confuses tree classification with source separation."
            },
            {
              "text": "A single frequency against a phase.",
              "feedback": "That describes spectral quantities, not the taught branching rule."
            },
            {
              "text": "A single component against a variance.",
              "feedback": "PCA quantities do not define the general tree split."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "advanced",
              "pages": "16"
            }
          ]
        },
        {
          "id": "L07-forest",
          "difficulty": "easy",
          "prompt": "How does the lecture’s classification forest combine trees?",
          "options": [
            {
              "text": "By taking the deepest tree’s label.",
              "feedback": "Depth does not give a tree priority."
            },
            {
              "text": "By taking the largest PC’s score.",
              "feedback": "A PC score is not an ensemble class."
            },
            {
              "text": "By taking the first feature’s mean.",
              "feedback": "Feature means are not tree votes."
            },
            {
              "text": "By taking the class with most votes.",
              "feedback": "Correct. The taught ensemble uses a class vote."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "advanced",
              "pages": "17"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L07-code-vote",
          "kind": "code",
          "title": "Trace a threshold and a forest vote",
          "prompt": "Explain this supplied symbolic sample. Which branch contains equality? Name the array axes, and contrast a vote with an explanation of the biology. A hypothetical forest gives labels [1, 0, 1] for one sample: what is the vote?",
          "sources": [
            {
              "source": "advanced",
              "pages": "16–17"
            }
          ],
          "rubric": [
            {
              "id": "L07-code-vote-c1",
              "text": "Traces the threshold.",
              "accept": "A greater than 0.6 gives class 1, otherwise class 0; equality takes the else branch."
            },
            {
              "id": "L07-code-vote-c2",
              "text": "Names axes.",
              "accept": "X is samples by features; X[:,0] is feature A for each sample; tree_label has one label per sample."
            },
            {
              "id": "L07-code-vote-c3",
              "text": "Names vote axes.",
              "accept": "votes is trees by samples and contains binary labels for this sample-only example."
            },
            {
              "id": "L07-code-vote-c4",
              "text": "Explains majority.",
              "accept": "The mean of binary votes above 0.5 means majority class 1; [1,0,1] votes for 1."
            },
            {
              "id": "L07-code-vote-c5",
              "text": "Separates prediction and evidence.",
              "accept": "The toy threshold is supplied, not trained; voting is prediction, not causal explanation or proof of performance."
            }
          ],
          "modelAnswer": [
            "The threshold partitions rows by their first feature; equality takes class 0. The votes array instead collects each tree’s prediction for each sample.",
            "For three binary tree votes [1,0,1], class 1 wins. Agreement among trees does not verify a biological mechanism or guarantee unseen-data accuracy."
          ],
          "pitfalls": [
            "Using the feature axis for the tree vote.",
            "Calling the hand-written threshold a learned forest."
          ],
          "code": "import numpy as np\n# X: samples by features; feature A is column 0\ntree_label = np.where(X[:, 0] > 0.6, 1, 0)\n# votes: odd number of trees by samples; labels 0 or 1\nforest_label = (votes.mean(axis=0) > 0.5).astype(int)",
          "codeContext": "Original hypothetical code practice, not an uploaded notebook. One supplied threshold illustrates branching; the forest expression assumes binary labels and an odd number of voting trees. It does not implement training."
        }
      ]
    },
    {
      "id": "networks",
      "title": "4. Deep networks: prediction and learning",
      "sources": [
        {
          "source": "advanced",
          "pages": "18–19"
        }
      ],
      "priority": "Red: layered prediction and ReLU. Orange: loss and gradient update.",
      "blocks": [
        {
          "type": "definition",
          "term": "Deep neural network",
          "body": "Multiple layers transform an input sample into a predicted label representation. Each neuron combines previous-layer activations with weights and applies a nonlinearity. ReLU keeps positive inputs and sets negative inputs to zero. Multiple layers can represent nonlinear relationships."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "\\hat y=\\operatorname{net}(x),\\quad a_i^{(l)}=\\operatorname{ReLU}\\!\\left(\\sum_j w_{ij}a_j^{(l-1)}\\right)",
              "label": "The displayed layer is bias-free as on the slide; $j$ indexes previous units and $i$ the next unit. Input features and output label representation have different roles."
            },
            {
              "tex": "L=\\lVert\\hat y-y\\rVert_2,\\quad w_{ij}^{t+1}=w_{ij}^{t}-\\epsilon\\frac{\\partial L}{\\partial w_{ij}^{t}}",
              "label": "The rendered slide shows the Euclidean norm of prediction error against true label $y$. Backpropagation computes derivatives; a positive learning rate $\\epsilon$ scales a gradient-descent update. The subscript 2 denotes the norm, not a square. This is a teaching loss, not a universal classification-loss prescription."
            }
          ]
        },
        {
          "type": "steps",
          "title": "Prediction is not training",
          "steps": [
            "Forward pass: compute layer activations and the prediction.",
            "Compare prediction and known target using a loss.",
            "Backpropagate derivatives and update weights to reduce the training objective. Evaluate generalization on data not used for fitting."
          ]
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-relu",
          "difficulty": "easy",
          "prompt": "What does ReLU do to a weighted input?",
          "options": [
            {
              "text": "It converts every value to a label.",
              "feedback": "The final prediction is separate from this activation."
            },
            {
              "text": "It squares the prediction residual.",
              "feedback": "That describes squared-error loss."
            },
            {
              "text": "It replaces negative values by zero.",
              "feedback": "Correct. Positive values pass through; negative ones become zero."
            },
            {
              "text": "It rescales each variance to unity.",
              "feedback": "That is a whitening operation."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "18"
            }
          ]
        },
        {
          "id": "L07-loss",
          "difficulty": "easy",
          "prompt": "What does the illustrated training loss compare?",
          "options": [
            {
              "text": "PC directions with Fourier bases.",
              "feedback": "This is not the illustrated supervised loss."
            },
            {
              "text": "Microphone mixtures with sources.",
              "feedback": "That is a demixing comparison, not this network objective."
            },
            {
              "text": "Predicted labels with true labels.",
              "feedback": "Correct. The shown loss measures prediction error."
            },
            {
              "text": "Map distances with feature scales.",
              "feedback": "This is not the network loss on p19."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "19"
            }
          ]
        },
        {
          "id": "L07-gradient",
          "difficulty": "easy",
          "prompt": "What is the role of backpropagation here?",
          "options": [
            {
              "text": "It supplies the held-out diagnosis.",
              "feedback": "A test diagnosis is a prediction, not a gradient."
            },
            {
              "text": "It assigns each sample a map point.",
              "feedback": "That describes visualization."
            },
            {
              "text": "It computes derivatives for updates.",
              "feedback": "Correct. Derivatives connect prediction error to weights."
            },
            {
              "text": "It normalizes every input variance.",
              "feedback": "Input scaling is a separate preprocessing decision."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "19"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L07-code-network",
          "kind": "code",
          "title": "Read a layer and a training update",
          "prompt": "Explain the input/output dimensions and ReLU. Distinguish the prediction line from the update line, including the sign of a small gradient step. What is not implemented by this snippet?",
          "sources": [
            {
              "source": "advanced",
              "pages": "18–19"
            }
          ],
          "rubric": [
            {
              "id": "L07-code-network-c1",
              "text": "Tracks weights.",
              "accept": "For a sample input with F features and H units, W is H by F and x length F; W@x length H."
            },
            {
              "id": "L07-code-network-c2",
              "text": "Explains activation.",
              "accept": "Maximum with zero implements ReLU elementwise, keeping positive weighted sums and zeroing negative ones."
            },
            {
              "id": "L07-code-network-c3",
              "text": "Explains gradient.",
              "accept": "grad_W is the derivative of the chosen loss with respect to W, with the same H-by-F shape."
            },
            {
              "id": "L07-code-network-c4",
              "text": "Explains update.",
              "accept": "Subtract learning_rate times gradient, a descent direction for a sufficiently small positive step, not a guaranteed decrease for arbitrary steps."
            },
            {
              "id": "L07-code-network-c5",
              "text": "Bounds the snippet.",
              "accept": "It is one bias-free layer and a supplied gradient; it does not compute backpropagation, fit a complete model or validate clinical predictions."
            }
          ],
          "modelAnswer": [
            "W maps one feature vector to H weighted sums, and ReLU clips negative sums to zero. Repeating such layers builds the lecture’s network, with a final prediction compared to the true label.",
            "The second line updates weights using a supplied derivative. This sample omits gradient calculation and a full training loop; successful forward computation alone says nothing about generalization."
          ],
          "pitfalls": [
            "Calling ReLU the loss function.",
            "Adding the gradient for minimization or assuming every step reduces loss."
          ],
          "code": "import numpy as np\n# x: F features; W and grad_W: H units by F features\na = np.maximum(0, W @ x)\nW_next = W - learning_rate * grad_W",
          "codeContext": "Original symbolic sample of the bias-free layer and gradient rule on L07 pp18–19. Not a supplied notebook, not executed training. learning_rate is positive; grad_W is supplied, not computed here."
        }
      ]
    },
    {
      "id": "applications",
      "title": "5. Choose a method and question its result",
      "sources": [
        {
          "source": "advanced",
          "pages": "20–23"
        }
      ],
      "priority": "Blue: image-recognition, song-development and skin-image examples. Orange: medical generalization and shortcuts.",
      "blocks": [
        {
          "type": "compare",
          "title": "Start with the question and output",
          "columns": [
            "Question / input",
            "Output and main caution"
          ],
          "rows": [
            {
              "label": "ICA",
              "cells": [
                "Which independent signals mix into microphone traces?",
                "Estimated source traces; check the linear independent-source model."
              ]
            },
            {
              "label": "t-SNE",
              "cells": [
                "Which high-dimensional profiles look locally similar?",
                "Map coordinates; islands are not verified classes."
              ]
            },
            {
              "label": "Tree / forest",
              "cells": [
                "Which labelled class fits this feature vector?",
                "A class prediction; overfitting and data shift can defeat accuracy."
              ]
            },
            {
              "label": "Deep network",
              "cells": [
                "Can labelled examples train a layered predictor?",
                "Label representation; shortcuts and clinical context can be missed."
              ]
            }
          ]
        },
        {
          "type": "example",
          "title": "Song syllables versus medical images",
          "body": "Page 22 uses spectrograms and t-SNE to visualize zebra-finch syllables through development. Page 23 shows skin-image classification. A song map is exploratory organization; a skin label is supervised prediction. Neither example licenses a new measured accuracy claim here."
        },
        {
          "type": "steps",
          "title": "Before trusting a medical network",
          "steps": [
            "Ask whether enough representative training examples exist.",
            "Check performance when acquisition changes, such as a different scanner or lighting. A model can exploit an unrelated ruler instead of disease features.",
            "Ask what contextual information the clinician uses that the image omits. A prediction does not itself explain the decision or establish a cause."
          ]
        },
        {
          "type": "misconception",
          "wrong": "A classifier that works on familiar images is ready for every clinic.",
          "right": "Page 21 warns that even small acquisition changes and unrelated visual cues can break generalization. Separate evaluation in the intended setting from success on the training task."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-shift",
          "difficulty": "easy",
          "prompt": "Which is an example of the lecture’s generalization risk?",
          "options": [
            {
              "text": "A spectrum contains a frequency axis.",
              "feedback": "A frequency axis is expected, not this generalization problem."
            },
            {
              "text": "A waveform contains several time bins.",
              "feedback": "That is a normal representation, not the cited shift risk."
            },
            {
              "text": "A prediction varies with scanner style.",
              "feedback": "Correct. Acquisition differences can change predictions unexpectedly."
            },
            {
              "text": "A feature table contains sample rows.",
              "feedback": "A sample-row layout does not itself imply shift."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "21"
            }
          ]
        },
        {
          "id": "L07-song",
          "difficulty": "easy",
          "prompt": "What role does t-SNE play in the song example?",
          "options": [
            {
              "text": "It establishes a causal song circuit.",
              "feedback": "The map alone cannot establish causality."
            },
            {
              "text": "It predicts a clinical diagnosis label.",
              "feedback": "This is the bird-song case, not diagnostic classification."
            },
            {
              "text": "It visualizes developing syllable structure.",
              "feedback": "Correct. The example visualizes syllables through development."
            },
            {
              "text": "It isolates independent microphone voices.",
              "feedback": "That is the cocktail-party ICA example."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "22"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "supplement",
      "title": "6. Supplement: nearest-neighbor recognition",
      "sources": [
        {
          "source": "advanced",
          "pages": "24–30"
        }
      ],
      "priority": "Supplementary: split criteria, misleading-map warning and references. Page 30 has a red marker despite being after the supplement divider.",
      "blocks": [
        {
          "type": "definition",
          "term": "K-nearest neighbor classification",
          "body": "Assign a new sample the class most common among its nearby labelled examples in feature space. Input is a feature vector plus labelled reference data; output is a class. This uses neighbor labels, unlike K-means, whose cluster numbers are not supplied class labels."
        },
        {
          "type": "detail",
          "title": "What to prioritize",
          "body": "The red marker on p30 conflicts with its supplementary location. Learn the definition and distinguish it from K-means and t-SNE; no detailed neighbor-search derivation is required here. Pages 26–29 add warnings, split criteria and reading links, not a supplied advanced-method notebook."
        },
        {
          "type": "text",
          "body": "Exercise4 notebook remains PENDING; available clustering code is Exercise2. Lecture 8 promises oral preparation but its deck is pending. The final prompts below are source-grounded practice, not official oral exam questions."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L07-knn",
          "difficulty": "easy",
          "prompt": "How does K-nearest neighbor classification assign a class?",
          "options": [
            {
              "text": "By the nearest unlabelled centroid.",
              "feedback": "That resembles K-means assignment; KNN uses labelled neighbors."
            },
            {
              "text": "By the largest covariance eigenvalue.",
              "feedback": "That is a PCA variance quantity."
            },
            {
              "text": "By the vote of nearby labelled samples.",
              "feedback": "Correct. The neighbors vote for a class."
            },
            {
              "text": "By the most non-Gaussian source axis.",
              "feedback": "That belongs to the ICA objective."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "advanced",
              "pages": "30"
            }
          ]
        },
        {
          "id": "L07-knn-k",
          "difficulty": "easy",
          "prompt": "What does the K in K-nearest neighbor classification count?",
          "options": [
            {
              "text": "The number of predicted class names.",
              "feedback": "The class set is distinct from the neighborhood size."
            },
            {
              "text": "The number of learned source signals.",
              "feedback": "This is classification, not source separation."
            },
            {
              "text": "The number of retained feature axes.",
              "feedback": "This is not a retained-component count."
            },
            {
              "text": "The number of nearby voting samples.",
              "feedback": "Correct. K specifies how many nearest labelled examples vote."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "advanced",
              "pages": "30"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    }
  ],
  "finalWritten": [
    {
      "id": "L07-written-pca",
      "kind": "written",
      "title": "Explain PCA to a newcomer: all four parts",
      "prompt": "In about five minutes: (1) define PCA in one or two sentences; (2) use the Exercise2 waveform matrix to specify input/output format and every axis; (3) sketch the original feature cloud and PC score axes with labels, or describe the drawing in text; (4) explain uses, limitations and overinterpretation. Equations are optional. Follow the actual L07 p2 exercise.",
      "sources": [
        {
          "source": "advanced",
          "pages": "2,6–7"
        },
        {
          "source": "pca1",
          "pages": "18–32"
        },
        {
          "source": "exercise2",
          "cell": 18
        },
        {
          "source": "exercise2",
          "cell": 19
        }
      ],
      "rubric": [
        {
          "id": "L07-written-pca-c1",
          "text": "Defines PCA.",
          "accept": "An orthogonal change of coordinates aligns centered data with variance directions; component scores are uncorrelated."
        },
        {
          "id": "L07-written-pca-c2",
          "text": "Specifies input and output axes.",
          "accept": "Input 51 time-bin feature rows by spike samples; output retained-PC rows by the same spike samples, or clearly declared transposes."
        },
        {
          "id": "L07-written-pca-c3",
          "text": "Labels a useful sketch.",
          "accept": "Original axes are two measured waveform-bin amplitudes; draw an elongated cloud and PC1 direction, then PC1/PC2 score axes. Text equivalent accepted."
        },
        {
          "id": "L07-written-pca-c4",
          "text": "Gives a suitable use.",
          "accept": "Visualization, compression or exploratory structure of waveforms; scores are weighted feature combinations, not cell labels."
        },
        {
          "id": "L07-written-pca-c5",
          "text": "Bounds interpretation.",
          "accept": "Reduced dimensions can discard important small signals; variance and zero covariance do not prove independent sources, classes or causal mechanisms."
        }
      ],
      "modelAnswer": [
        "PCA re-expresses centered data along orthogonal variance directions so scores have zero cross-covariance. Each Exercise2 spike is a sample with 51 time-bin features; two retained components give a two-by-spikes score matrix.",
        "Sketch amplitude at bin A against amplitude at bin B, a cloud with a long direction, and labelled PC1/PC2 axes after rotation. This can aid waveform visualization and compression.",
        "Weak but important variation can be lost. A separated score plot is not proof of a cell identity, and uncorrelated scores need not be independent."
      ],
      "pitfalls": [
        "Giving eigenvalues as the sample coordinates.",
        "Omitting sketch axes or claiming that PCA always reveals independent causes."
      ]
    },
    {
      "id": "L07-written-fourier",
      "kind": "written",
      "title": "Explain Fourier to a newcomer: all four parts",
      "prompt": "Give a separate five-minute explanation: (1) define the Fourier transform in one or two sentences; (2) give a hypothetical uniformly sampled electrode trace and specify input/output format, axes and sampling information; (3) sketch labelled time-trace and frequency-spectrum axes, or describe the drawing; (4) give uses, limitations and risks of overinterpretation. Equations are optional. Follow the actual L07 p2 exercise.",
      "sources": [
        {
          "source": "advanced",
          "pages": "2"
        },
        {
          "source": "spectral",
          "pages": "7–10,13–19,23–25,37"
        }
      ],
      "rubric": [
        {
          "id": "L07-written-fourier-c1",
          "text": "Defines the transform.",
          "accept": "Re-express a signal using fixed sine/cosine frequency components; complex coefficients carry amplitude and phase."
        },
        {
          "id": "L07-written-fourier-c2",
          "text": "Specifies formats and axes.",
          "accept": "A length-N time vector becomes a length-N complex frequency-coefficient vector for full DFT; sampling rate and record length determine physical frequency labels."
        },
        {
          "id": "L07-written-fourier-c3",
          "text": "Labels a useful sketch.",
          "accept": "Input time versus signal amplitude; output frequency versus power or coefficient magnitude, explicitly naming which. Text description accepted."
        },
        {
          "id": "L07-written-fourier-c4",
          "text": "Gives uses.",
          "accept": "Frequency analysis and filtering; power spectrum is squared coefficient magnitude, not the entire complex transform."
        },
        {
          "id": "L07-written-fourier-c5",
          "text": "Explains limitations.",
          "accept": "Whole-record spectrum hides when events occur; sampling can alias and sharp filtering can ring. Peaks alone do not identify biological causes."
        }
      ],
      "modelAnswer": [
        "Fourier transformation describes a signal with fixed sine and cosine frequency components. A hypothetical uniformly sampled electrode trace is a time-indexed vector; the full DFT is a same-length complex vector indexed by frequency, carrying amplitude and phase.",
        "State sampling rate and record length to turn frequency indices into physical frequency. Sketch time against amplitude, then frequency against squared coefficient magnitude (power), with a hypothetical peak clearly labelled.",
        "It supports frequency analysis and filtering, but a whole-record power spectrum hides timing and phase. Sampling can alias and abrupt filtering can create ringing; a peak alone is not a biological explanation."
      ],
      "pitfalls": [
        "Calling power the complete complex Fourier output.",
        "Using frequency on the input time axis or treating every peak as a separate source."
      ]
    },
    {
      "id": "L07-written-methods",
      "kind": "written",
      "title": "Defend ICA versus a t-SNE map",
      "prompt": "Hypothetical practice: one group records simultaneous voices with as many microphones as sources; another has a high-dimensional gene-expression profile per cell. Choose a method for demixing voices and a method for exploratory cell visualization. Explain input/output axes, whitening versus independence, a labelled sketch or text equivalent, and what each result cannot establish.",
      "sources": [
        {
          "source": "advanced",
          "pages": "6–15"
        }
      ],
      "rubric": [
        {
          "id": "L07-written-methods-c1",
          "text": "Chooses by the question.",
          "accept": "ICA for source demixing; t-SNE for exploratory neighborhood visualization, not as interchangeable reductions."
        },
        {
          "id": "L07-written-methods-c2",
          "text": "Defines the axes.",
          "accept": "ICA microphone-by-time to source-by-time; t-SNE cell-by-gene to cell-by-2 or cell-by-3 coordinates."
        },
        {
          "id": "L07-written-methods-c3",
          "text": "Explains ICA mechanism and assumptions.",
          "accept": "Independent non-Gaussian linearly mixed sources; whitening removes covariance/scales variance then a non-Gaussian rotation is sought."
        },
        {
          "id": "L07-written-methods-c4",
          "text": "Describes a labelled sketch.",
          "accept": "Microphone mixture traces into source traces with time/amplitude labels; a cell map has embedding coordinate axes, not gene expression or time. Text equivalent accepted."
        },
        {
          "id": "L07-written-methods-c5",
          "text": "Bounds both conclusions.",
          "accept": "Whitening alone is not independence; t-SNE islands/global spacing are not confirmed cell types or causal separation."
        }
      ],
      "modelAnswer": [
        "The voice question asks for sources, so use ICA under the square independent non-Gaussian linear-mixing model. The cell question asks for a local-similarity view, so a t-SNE map can help exploration.",
        "ICA uses microphone/time input axes and estimated-source/time output axes. Whitening removes covariance but leaves a rotation to infer from non-Gaussianity. Draw time/amplitude mixtures and recovered traces.",
        "t-SNE maps cell-by-gene rows to two or three coordinates per cell. Label its axes as embedding coordinates. Investigate map islands in original features before naming cell types, and do not read map spacing as global biological distance."
      ],
      "pitfalls": [
        "Equating whitening with independence.",
        "Claiming t-SNE performs supervised cell classification."
      ]
    },
    {
      "id": "L07-written-classifier",
      "kind": "written",
      "title": "Defend a classifier, its code and its clinical limits",
      "prompt": "Hypothetical practice: propose a tree/forest and a deep network for labelled medical images or extracted image features. Explain the output, tree votes versus layers, loss/gradient update, and scanner/ruler shortcuts. Contrast the real Exercise2 K-means line below: what do its axes, K and labels mean, and why is it not a trained diagnostic classifier?",
      "sources": [
        {
          "source": "advanced",
          "pages": "16–23"
        },
        {
          "source": "exercise2",
          "cell": 23
        },
        {
          "source": "exercise2",
          "cell": 25
        }
      ],
      "rubric": [
        {
          "id": "L07-written-classifier-c1",
          "text": "States supervised input/output.",
          "accept": "Samples have image features or pixel representations plus training diagnoses; classifier predicts a class/label representation for unseen samples."
        },
        {
          "id": "L07-written-classifier-c2",
          "text": "Contrasts model mechanisms.",
          "accept": "Trees branch on features and forests vote; networks combine weighted layers with nonlinearities."
        },
        {
          "id": "L07-written-classifier-c3",
          "text": "Explains learning and limits.",
          "accept": "Loss compares prediction with target, backprop supplies gradients and descent updates weights; training fit is not held-out validation."
        },
        {
          "id": "L07-written-classifier-c4",
          "text": "Defends real notebook line.",
          "accept": "waveforms.T makes spike rows by 51 time-bin features; K sets a requested cluster count; one cluster number per spike. The initialization count repeats initializations and random_state fixes randomness, not correctness."
        },
        {
          "id": "L07-written-classifier-c5",
          "text": "Plans a meaningful check.",
          "accept": "Evaluate on representative unseen acquisition conditions; inspect shortcuts/context. K-means labels or map islands are not diagnoses or verified cell identities."
        }
      ],
      "modelAnswer": [
        "A tree or forest predicts a label from feature thresholds and votes; a network learns nonlinear weighted layers by minimizing a prediction loss with gradient updates. Neither architecture guarantees reliable clinical performance.",
        "Exercise2 instead clusters unlabelled spike waveforms: transpose makes one sample row per spike, K requests the number of clusters, and labels has one cluster number per spike. Multiple initializations and fixed randomness improve search/reproducibility, not biological validity.",
        "Test on representative unseen images, including scanner changes, and investigate reliance on a ruler or missing clinical context. Do not turn the notebook cluster numbers into diagnoses."
      ],
      "pitfalls": [
        "Interpreting cluster numbers as provided disease labels.",
        "Calling a repeatable result valid without checking shift and shortcuts."
      ],
      "code": "labels = KMeans(n_clusters=K, n_init=10, random_state=0).fit_predict(waveforms.T)",
      "codeContext": "Real Exercise2 cell23 line; imports KMeans from sklearn.cluster in the same cell, NumPy/Matplotlib in cell4. K loops over 2 and 3. Missing electrode_recording.mat; no advanced-method or Exercise4 notebook is supplied."
    }
  ],
  "lectureQuiz": []
};
