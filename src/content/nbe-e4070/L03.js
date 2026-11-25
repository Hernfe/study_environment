// PCA I, exact local sources; stable question and rubric IDs.
import { scaleLinear } from 'd3';
const xs = scaleLinear().domain([-3,3]).range([55,315]);
const ys = scaleLinear().domain([-3,3]).range([235,45]);
const toy = [-2,-1,1,2].flatMap(u => [-0.45,0.45].map(v => ({u,v,x:(u-v)/Math.sqrt(2),y:(u+v)/Math.sqrt(2)})));
function panel(scores) {
 const offset=scores?295:0;
 return `<g transform="translate(0,${offset})" fill="currentColor" font-family="system-ui,sans-serif" font-size="12">
 <text x="185" y="20" text-anchor="middle">${scores?'PC coordinates':'Centered feature coordinates'}</text>
 <path d="M55 140H315M185 235V45" fill="none" stroke="var(--c-text-muted)" stroke-width="1"/>
 ${[-3,3].map(v=>`<path d="M${xs(v)} 140v4M185 ${ys(v)}h4" stroke="currentColor"/><text x="${xs(v)}" y="160" text-anchor="middle">${v}</text><text x="177" y="${ys(v)+4}" text-anchor="end">${v}</text>`).join('')}
 <text x="185" y="275" text-anchor="middle">${scores?'PC1 score':'Feature 1 (centered)'}</text>
 <text transform="translate(15,140) rotate(-90)" text-anchor="middle">${scores?'PC2 score':'Feature 2 (centered)'}</text>
 ${!scores?`<path d="M${xs(-2.3)} ${ys(-2.3)}L${xs(2.3)} ${ys(2.3)}M${xs(-1.1)} ${ys(1.1)}L${xs(1.1)} ${ys(-1.1)}" fill="none" stroke="var(--c-accent)" stroke-width="1.5"/><text x="${xs(2.3)}" y="${ys(2.3)-8}">PC1</text><text x="${xs(-1.1)-18}" y="${ys(1.1)-8}">PC2</text>`:''}
 ${toy.map(p=>`<circle cx="${xs(scores?p.u:p.x)}" cy="${ys(scores?p.v:p.y)}" r="4" fill="var(--c-text-muted)"/>`).join('')}
 </g>`;
}
const geometry = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 355 590" style="width:100%;max-width:420px;height:auto" aria-hidden="true">${panel(false)}${panel(true)}</svg>`;

export default {
  "learningMode": "topic-study",
  "compactPractice": true,
  "meta": {
    "id": "L03",
    "number": 3,
    "title": "Principal Component Analysis I"
  },
  "intro": [
    "Read the short theory and use the interactive code cards in context. Open the optional code explanations and final written practice when you want to rehearse for the oral.",
    "Use features in rows and observations in columns throughout. Private sources and saved notebook outputs are not bundled; the missing recording means no actual analysis result is claimed."
  ],
  "sections": [
    {
      "id": "data-geometry",
      "title": "1. From regional activity to a point cloud",
      "priority": "Context case study, then orange geometry. Understand what each axis and point represents.",
      "sources": [
        {
          "source": "pca1",
          "pages": "7–17"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "One observation is one vector",
          "body": "At one time sample, collect activity from every region into a vector. Plot two regions as two axes: a dot is a time sample, not a neuron. Regions that rise and fall together produce an elongated cloud."
        },
        {
          "type": "steps",
          "title": "Prepare the fly example",
          "steps": [
            "Subtract each voxel’s mean across time to study fluctuations rather than baseline activity.",
            "Average activity within regions, then arrange regional vectors as columns.",
            "Look for joint variation across regions; PCA finds weighted combinations, not a partition of regions."
          ]
        },
        {
          "type": "example",
          "title": "Two matrix conventions, one principle",
          "body": "In the fly slides, rows are regions and columns are time samples. In Exercise2, rows are waveform time bins and columns are spikes. In both cases, rows are features and columns are observations."
        },
        {
          "type": "detail",
          "title": "Opening recap and source boundaries",
          "body": "PDF pp. 2–5 revisit Fourier as a change of basis; PCA learns its basis from covariance instead of using fixed oscillations. The fly example is contextual, not new data to analyze here. No supplied raw fly recording or animation is needed."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-point",
          "prompt": "In the two-region activity plot, what does one dot represent?",
          "options": [
            {
              "text": "One neuron measured across all time samples.",
              "feedback": "The coordinates are regional activities, not neuron identifiers."
            },
            {
              "text": "One time sample measured in both regions.",
              "feedback": "Correct. Both coordinates come from the same time sample."
            },
            {
              "text": "One region averaged across all time samples.",
              "feedback": "A regional mean is not one paired observation."
            },
            {
              "text": "One component measured in both hemispheres.",
              "feedback": "Components are new axes, not the original dots."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca1",
              "pages": "7–17"
            }
          ]
        },
        {
          "id": "L03-axes",
          "prompt": "How is the fly activity matrix arranged in the slides?",
          "options": [
            {
              "text": "Rows are time samples; columns are regions.",
              "feedback": "That is the transpose of this lecture’s convention."
            },
            {
              "text": "Rows are components; columns are regions.",
              "feedback": "Components arise after changing basis."
            },
            {
              "text": "Rows are regions; columns are time samples.",
              "feedback": "Correct. A column contains simultaneous regional measurements."
            },
            {
              "text": "Rows are regions; columns are eigenvalues.",
              "feedback": "Eigenvalues summarize variance, not observations."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca1",
              "pages": "7–17"
            }
          ]
        },
        {
          "id": "L03-learned",
          "prompt": "What distinguishes the PCA basis from the Fourier basis?",
          "options": [
            {
              "text": "PCA directions are learned from covariance.",
              "feedback": "Correct. The directions depend on the dataset."
            },
            {
              "text": "PCA directions are fixed sinusoidal functions.",
              "feedback": "Fixed oscillatory functions describe Fourier, not PCA."
            },
            {
              "text": "PCA directions are the original time samples.",
              "feedback": "Samples are projected onto directions."
            },
            {
              "text": "PCA directions are assigned cluster labels.",
              "feedback": "Clustering is a separate method in L04."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca1",
              "pages": "7–17"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "center-covariance",
      "codeVisualCards": [
        {
          "id": "L03-code-visual-center",
          "title": "Center each feature across waveforms",
          "snippet": {
            "language": "python",
            "text": "centred = waveforms - waveforms.mean(axis=1, keepdims=True)",
            "provenance": "Shortened line (comment omitted)",
            "sources": [
              {
                "source": "exercise2",
                "cell": 19
              },
              {
                "source": "pca1",
                "pages": "19–24"
              }
            ],
            "context": "Rows of waveforms are features (here, two voltage bins); columns are individual waveforms. keepdims=True keeps the means as a 2 × 1 column."
          },
          "visual": {
            "kind": "pca-geometry",
            "data": [
              [
                -3,
                -2
              ],
              [
                -2,
                -3
              ],
              [
                -1,
                0
              ],
              [
                1,
                0
              ],
              [
                2,
                3
              ],
              [
                3,
                2
              ]
            ],
            "controls": [
              {
                "id": "offset",
                "label": "Feature 2 offset (µV)",
                "initial": 4,
                "options": [
                  {
                    "value": 0,
                    "label": "0"
                  },
                  {
                    "value": 4,
                    "label": "4"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · The same waveforms before and after centering",
            "alt": "Each dot is one waveform. The two plots share the same axes and scales."
          },
          "mcq": {
            "id": "L03-code-visual-center-check",
            "difficulty": "easy",
            "prompt": "Add $4\\,\\text{µV}$ to feature 2 for every waveform. Where does that offset appear?",
            "correct": 0,
            "options": [
              {
                "text": "In the input cloud only.",
                "feedback": "The feature 2 mean rises by exactly the same offset and subtracting it cancels the shift."
              },
              {
                "text": "In the input and centered clouds.",
                "feedback": "Centering removes the common feature offset from every observation."
              },
              {
                "text": "In the centered cloud only.",
                "feedback": "The raw feature values shift directly when you add an offset."
              }
            ]
          },
          "blank": {
            "id": "L03-code-visual-center-blank",
            "prompt": "Reduce the waveform axis so the result contains one mean per feature.",
            "template": "means = waveforms.mean(axis={token}, keepdims=True)",
            "fields": [
              {
                "id": "token",
                "label": "Waveform axis",
                "accepted": [
                  "1",
                  "-1"
                ],
                "explanation": "Axis 1 is the column axis of this two-dimensional array.",
                "commonErrors": "Axis 0 averages the features within each waveform."
              }
            ],
            "expectedOutput": "The output has shape 2 × 1 and broadcasts across the waveform columns."
          }
        }
      ],
      "title": "2. Center features and measure covariance",
      "priority": "Red covariance definition; orange matrix representation and centering.",
      "sources": [
        {
          "source": "pca1",
          "pages": "18–22"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Covariance",
          "body": "Pair observations from two features and multiply their deviations from their own means. Positive covariance means they tend to deviate together; negative means opposite deviations. Zero covariance rules out linear cofluctuation, not every possible relationship."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "C_{ij}=\\frac{1}{S}\\sum_{s=1}^{S}(X_{is}-\\bar X_i)(X_{js}-\\bar X_j)",
              "label": "PDF p. 18 convention. Features index rows; observations index columns."
            },
            {
              "tex": "X_c=X-\\bar x,\\qquad X_c\\in\\mathbb R^{F\\times S},\\quad C\\in\\mathbb R^{F\\times F}",
              "label": "Subtract one mean per feature, broadcast across all observations."
            }
          ]
        },
        {
          "type": "compare",
          "title": "Read the covariance image",
          "columns": [
            "Meaning"
          ],
          "rows": [
            {
              "label": "Diagonal",
              "cells": [
                "Variance of each feature with itself."
              ]
            },
            {
              "label": "Off diagonal",
              "cells": [
                "Pairwise covariance between two features."
              ]
            },
            {
              "label": "Waveform image axes",
              "cells": [
                "Time bin against time bin, not spike against spike."
              ]
            }
          ]
        },
        {
          "type": "detail",
          "title": "Normalization matters",
          "body": "PDF p. 18 divides by the observation count. Page 31 writes the unnormalized scatter product. np.cov(waveforms) instead divides by one fewer observation by default. A common positive scaling changes eigenvalues, but preserves directions and explained-variance fractions. Use consistent normalization when comparing score variance and eigenvalues."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-centering",
          "prompt": "What does feature-wise centering subtract?",
          "options": [
            {
              "text": "Each feature’s mean across observations.",
              "feedback": "Correct. Each row is centered across its sample columns."
            },
            {
              "text": "Each observation’s mean across features.",
              "feedback": "This centers columns and answers a different question."
            },
            {
              "text": "Each feature’s largest observed value.",
              "feedback": "Subtracting a maximum does not center a feature."
            },
            {
              "text": "Each observation’s first feature value.",
              "feedback": "A reference feature is not a feature’s own mean."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca1",
              "pages": "18–22"
            }
          ]
        },
        {
          "id": "L03-diagonal",
          "prompt": "What is on the diagonal of a covariance matrix?",
          "options": [
            {
              "text": "The means of the measured features.",
              "feedback": "Covariance is calculated after accounting for means."
            },
            {
              "text": "The labels of the paired observations.",
              "feedback": "Labels do not appear as covariance entries."
            },
            {
              "text": "The scores of the leading components.",
              "feedback": "Scores are projected coordinates, not diagonal entries."
            },
            {
              "text": "The variances of the measured features.",
              "feedback": "Correct. A feature’s covariance with itself is its variance."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca1",
              "pages": "18–22"
            }
          ]
        },
        {
          "id": "L03-negative",
          "prompt": "What does negative covariance describe?",
          "options": [
            {
              "text": "The features tend to deviate together.",
              "feedback": "Together in sign gives positive covariance."
            },
            {
              "text": "The features tend to deviate oppositely.",
              "feedback": "Correct. Above-mean values of one tend to pair with below-mean values of the other."
            },
            {
              "text": "The features have equal average values.",
              "feedback": "Means alone do not determine covariance."
            },
            {
              "text": "The features have equal variance values.",
              "feedback": "Equal variances do not determine the covariance sign."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca1",
              "pages": "18–22"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L03-code-cov",
          "title": "Read the waveform covariance",
          "prompt": "Explain the matrix axes, the output shape and what the diagonal/off-diagonal entries mean. State the normalization difference from PDF page 18. Why would transposing waveforms change the question?",
          "kind": "code",
          "rubric": [
            {
              "id": "L03-code-cov-c1",
              "text": "Identifies input axes.",
              "accept": "51 features are time bins; S observations are spikes."
            },
            {
              "id": "L03-code-cov-c2",
              "text": "Identifies covariance axes and shape.",
              "accept": "51 by 51, time bin versus time bin."
            },
            {
              "id": "L03-code-cov-c3",
              "text": "Interprets entries.",
              "accept": "Diagonal variance; off-diagonal cofluctuation of paired bin values across spikes."
            },
            {
              "id": "L03-code-cov-c4",
              "text": "Distinguishes the divisor and transpose.",
              "accept": "np.cov defaults to S−1; slide p18 uses S. Transposing gives spike covariance rather than bin covariance."
            }
          ],
          "modelAnswer": [
            "np.cov treats rows as variables, so this produces a 51 by 51 covariance matrix across spikes. Each diagonal entry is the variance at one time bin; off-diagonal entries compare two bins across the same spikes. Its default sample divisor is one fewer than the spike count, whereas p18 uses the count. waveforms.T changes variables to spikes and no longer supplies the intended time-bin covariance."
          ],
          "pitfalls": [
            "Confusing observations with features.",
            "Equating the page 31 scatter matrix numerically with sample covariance."
          ],
          "sources": [
            {
              "source": "pca1",
              "pages": "18–22"
            },
            {
              "source": "exercise2",
              "cell": 4
            },
            {
              "source": "exercise2",
              "cell": 14
            },
            {
              "source": "exercise2",
              "cell": 15
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
          "code": "C = np.cov(waveforms)",
          "codeContext": "Exact lines from Exercise2 cells 15/19 as cited. np is NumPy, plt is Matplotlib (imports in cell 4). waveforms has 51 time-bin rows and S valid-spike columns. Snippets are read, not executed; the recording MAT file is absent. No saved result is certified."
        }
      ]
    },
    {
      "id": "basis-scores",
      "title": "3. Rotate to principal directions and scores",
      "priority": "Red formal PCA, eigenvectors, eigenvalues and scores; orange projection geometry.",
      "sources": [
        {
          "source": "pca1",
          "pages": "23–26"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Principal directions and scores",
          "body": "Eigenvector columns are unit-length directions in feature space. Different columns are perpendicular. A score is an observation’s coordinate along one of these directions. Changing basis decorrelates the coordinates; it does not make them statistically independent."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": geometry,
            "caption": "Original hypothetical paired features, arbitrary units. The same eight observations appear before and after a rotation; no observations are removed. PC1 follows the longer spread.",
            "fallbackAlt": "Top: a centered diagonal feature cloud with perpendicular PC1 and PC2 directions. Below: the same eight points with wide horizontal PC1 scores and narrow vertical PC2 scores."
          }
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "C=EDE^{\\mathsf T},\\qquad E^{\\mathsf T}E=I",
              "label": "E stores eigenvectors in columns; D stores their eigenvalues on its diagonal."
            },
            {
              "tex": "Z=E^{\\mathsf T}X_c,\\qquad \\operatorname{Cov}(Z)=D",
              "label": "Full scores retain F rows and S columns, using the same covariance normalization."
            },
            {
              "tex": "Z_k=E_k^{\\mathsf T}X_c\\in\\mathbb R^{k\\times S}",
              "label": "Retain k directions to reduce dimensions. All observations remain."
            }
          ]
        },
        {
          "type": "compare",
          "title": "Keep three objects distinct",
          "columns": [
            "Axes / interpretation"
          ],
          "rows": [
            {
              "label": "Eigenvector",
              "cells": [
                "Feature index to weight, a direction across features."
              ]
            },
            {
              "label": "Eigenvalue",
              "cells": [
                "One variance per direction under the declared normalization."
              ]
            },
            {
              "label": "Score",
              "cells": [
                "Component by observation; fly scores can be plotted against time."
              ]
            }
          ]
        },
        {
          "type": "misconception",
          "wrong": "PCA removes observations to make fewer dimensions.",
          "right": "It combines features into new coordinates. Keeping only leading directions removes coordinates and may lose information."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-direction",
          "prompt": "What is a covariance eigenvector in PCA?",
          "options": [
            {
              "text": "A list of scores for all observations.",
              "feedback": "Scores vary over observations; an eigenvector defines their projection direction."
            },
            {
              "text": "A list of labels for all observations.",
              "feedback": "PCA does not assign cluster labels."
            },
            {
              "text": "A direction with weights across features.",
              "feedback": "Correct. Its entries weight the original features."
            },
            {
              "text": "A direction with means across features.",
              "feedback": "Feature means define centering, not principal directions."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca1",
              "pages": "23–26"
            }
          ]
        },
        {
          "id": "L03-scores",
          "prompt": "What are the columns of the score matrix under this convention?",
          "options": [
            {
              "text": "The new coordinates of each observation.",
              "feedback": "Correct. Projection keeps one column per observation."
            },
            {
              "text": "The feature weights of each direction.",
              "feedback": "Feature weights are eigenvector columns."
            },
            {
              "text": "The ordered variances of each direction.",
              "feedback": "Variances are eigenvalues, not score columns."
            },
            {
              "text": "The original averages of each feature.",
              "feedback": "Centering uses means before projection."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca1",
              "pages": "23–26"
            }
          ]
        },
        {
          "id": "L03-decorrelation",
          "prompt": "What property does the full PCA score covariance have?",
          "options": [
            {
              "text": "Its diagonal entries are all equal.",
              "feedback": "PCA generally retains unequal variances along different directions."
            },
            {
              "text": "Its off-diagonal entries are zero.",
              "feedback": "Correct. The orthonormal eigenbasis diagonalizes covariance."
            },
            {
              "text": "Its columns contain all feature means.",
              "feedback": "Means are subtracted, not stored as covariance columns."
            },
            {
              "text": "Its entries encode observation labels.",
              "feedback": "Covariance has no observation-label interpretation."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "pca1",
              "pages": "23–26"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L03-code-center",
          "title": "Explain the centering axis",
          "prompt": "Explain axis=1 and keepdims=True for this line. Give shapes of the mean and centred arrays. Contrast with subtracting a per-spike mean.",
          "kind": "code",
          "rubric": [
            {
              "id": "L03-code-center-c1",
              "text": "Names axis being averaged.",
              "accept": "Columns/spikes are averaged separately at each time bin."
            },
            {
              "id": "L03-code-center-c2",
              "text": "Gives retained mean shape.",
              "accept": "51 by 1, because keepdims keeps the sample axis."
            },
            {
              "id": "L03-code-center-c3",
              "text": "Explains broadcast subtraction.",
              "accept": "Subtract the mean waveform from every 51-bin column; result is 51 by S."
            },
            {
              "id": "L03-code-center-c4",
              "text": "Distinguishes column centering.",
              "accept": "axis=0 would remove each spike’s mean over bins instead."
            }
          ],
          "modelAnswer": [
            "axis=1 averages over spikes, producing one mean at each waveform bin. keepdims=True keeps this as 51 by 1 so broadcasting subtracts the mean waveform from every spike column. centred stays 51 by S. Averaging axis=0 would subtract one baseline per spike, which is different preprocessing."
          ],
          "pitfalls": [
            "Saying the line subtracts one scalar from all entries.",
            "Replacing axis=1 with axis=0 without checking feature orientation."
          ],
          "sources": [
            {
              "source": "pca1",
              "pages": "21–23"
            },
            {
              "source": "exercise2",
              "cell": 19
            }
          ],
          "code": "centred = waveforms - waveforms.mean(axis=1, keepdims=True) # Subtract the mean waveform from every column",
          "codeContext": "Exact lines from Exercise2 cells 15/19 as cited. np is NumPy, plt is Matplotlib (imports in cell 4). waveforms has 51 time-bin rows and S valid-spike columns. Snippets are read, not executed; the recording MAT file is absent. No saved result is certified."
        }
      ]
    },
    {
      "id": "variance-reduction",
      "codeVisualCards": [
        {
          "id": "L03-code-visual-project",
          "title": "Keep one or two score coordinates",
          "snippet": {
            "language": "python",
            "text": "proj = eigvecs[:, :k].T @ centred",
            "provenance": "Adapted line",
            "sources": [
              {
                "source": "exercise2",
                "cell": 19
              },
              {
                "source": "pca1",
                "pages": "23–31"
              }
            ],
            "context": "eigvecs holds the covariance eigenvectors as columns, ordered by decreasing eigenvalue. k replaces the notebook’s fixed 2. PC signs can flip with an equally valid eigenvector convention."
          },
          "visual": {
            "kind": "pca-geometry",
            "data": [
              [
                -3,
                -2
              ],
              [
                -2,
                -3
              ],
              [
                -1,
                0
              ],
              [
                1,
                0
              ],
              [
                2,
                3
              ],
              [
                3,
                2
              ]
            ],
            "controls": [
              {
                "id": "components",
                "label": "Components retained",
                "initial": 1,
                "options": [
                  {
                    "value": 1,
                    "label": "1"
                  },
                  {
                    "value": 2,
                    "label": "2"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · Feature-space directions and component scores",
            "alt": "Solid line is PC1. The dashed line adds PC2. With one component the score plot is a number line."
          },
          "mcq": {
            "id": "L03-code-visual-project-check",
            "difficulty": "medium",
            "prompt": "What happens to two waveforms with equal PC1 scores and different PC2 scores when you keep one component?",
            "correct": 2,
            "options": [
              {
                "text": "They retain their separation along PC2.",
                "feedback": "That coordinate is absent from a one-component representation."
              },
              {
                "text": "Their PC1 scores change to preserve distance.",
                "feedback": "Keeping fewer components does not rotate or rescale the retained direction."
              },
              {
                "text": "They occupy the same position on the score axis.",
                "feedback": "The projection keeps only the coordinate they share."
              }
            ]
          }
        }
      ],
      "title": "4. Rank variance and interpret components",
      "priority": "Red variance meaning; orange fly results, applications and interpretation.",
      "sources": [
        {
          "source": "pca1",
          "pages": "27–30"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Explained variance",
          "body": "An eigenvalue is the variance along its corresponding unit eigenvector. Sort eigenvalues from largest to smallest and reorder eigenvectors to match. Leading components preserve the greatest variance; they need not preserve the most relevant biological signal."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "\\mathrm{EVR}_i=\\frac{\\lambda_i}{\\sum_j\\lambda_j},\\qquad \\mathrm{retained}(k)=\\frac{\\sum_{i=1}^{k}\\lambda_i}{\\sum_j\\lambda_j}",
              "label": "For nonzero total variance, fractions summarize retained variance, not accuracy or cell count."
            }
          ]
        },
        {
          "type": "example",
          "title": "Read the fly panels",
          "body": "PDF p. 28 pairs spatial eigenvector patterns with score time courses and ranked eigenvalues. Page 29 reports dominant whole-brain variation and hemisphere-associated events. Treat these as the lecturer’s example observations, not independently replicated results."
        },
        {
          "type": "steps",
          "title": "Use PCA as an exploratory first step",
          "steps": [
            "Inspect the eigenvalue spectrum to judge how concentrated variance is.",
            "Inspect feature weights and score patterns together to explain a component.",
            "Choose retained dimensions for the purpose, then check what was discarded. Reduction for visualization or denoising trades detail for compactness."
          ]
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-eigenvalue",
          "prompt": "What does an eigenvalue measure in this lecture?",
          "options": [
            {
              "text": "The mean along its associated direction.",
              "feedback": "Means were removed before finding variance directions."
            },
            {
              "text": "The count of its associated observations.",
              "feedback": "Every direction can score the same observations."
            },
            {
              "text": "The variance along its associated direction.",
              "feedback": "Correct. Use the same covariance divisor when comparing with score variance."
            },
            {
              "text": "The label of its associated population.",
              "feedback": "A component does not identify a population."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca1",
              "pages": "27–30"
            }
          ]
        },
        {
          "id": "L03-fraction",
          "prompt": "What is the explained-variance fraction of a component?",
          "options": [
            {
              "text": "Its eigenvalue divided by total eigenvalues.",
              "feedback": "Correct. The denominator is the sum of all eigenvalues."
            },
            {
              "text": "Its eigenvalue divided by feature means.",
              "feedback": "Feature means do not normalize variance."
            },
            {
              "text": "Its score mean divided by total scores.",
              "feedback": "Centered score means do not quantify explained variance."
            },
            {
              "text": "Its feature count divided by sample count.",
              "feedback": "Matrix dimensions do not determine the fraction."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca1",
              "pages": "27–30"
            }
          ]
        },
        {
          "id": "L03-fly-score",
          "prompt": "Which plot shows how one fly component changes over time?",
          "options": [
            {
              "text": "Eigenvector weight against region index.",
              "feedback": "Weights specify spatial participation, not temporal activity."
            },
            {
              "text": "Covariance value against region pair.",
              "feedback": "Covariance summarizes relationships over samples."
            },
            {
              "text": "Eigenvalue size against component rank.",
              "feedback": "The spectrum summarizes component variances."
            },
            {
              "text": "Component score against sample time.",
              "feedback": "Correct. Scores give that component’s coordinate for successive time samples."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "pca1",
              "pages": "27–30"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L03-code-sort",
          "title": "Keep eigenpairs aligned",
          "prompt": "Explain each line and the indexing difference between eigvals and eigvecs. What breaks if only eigenvalues are sorted?",
          "kind": "code",
          "rubric": [
            {
              "id": "L03-code-sort-c1",
              "text": "Identifies decomposition output.",
              "accept": "Eigenvalues and eigenvector columns correspond before sorting."
            },
            {
              "id": "L03-code-sort-c2",
              "text": "Explains descending indices.",
              "accept": "argsort ascends; reversing gives descending order."
            },
            {
              "id": "L03-code-sort-c3",
              "text": "Explains column selection.",
              "accept": "eigvecs[:, order] keeps features as rows and reorders eigenvector columns."
            },
            {
              "id": "L03-code-sort-c4",
              "text": "Explains the mismatch failure.",
              "accept": "Sorting only values makes variance rank disagree with the projected directions."
            }
          ],
          "modelAnswer": [
            "The decomposition returns corresponding eigenvalues and eigenvector columns. argsort gives ascending indices and [::-1] reverses them. The same order selects entries of eigvals and columns of eigvecs. Sorting values alone could label an unrelated direction as PC1 and project onto the wrong ranked component."
          ],
          "pitfalls": [
            "Sorting eigenvector rows instead of columns.",
            "Assuming eig returns descending eigenvalues."
          ],
          "sources": [
            {
              "source": "pca1",
              "pages": "26–31"
            },
            {
              "source": "exercise2",
              "cell": 19
            }
          ],
          "code": "eigvals, eigvecs = np.linalg.eig(C)\norder = np.argsort(eigvals)[::-1] # [::-1] reverses the order of the array to descending order\neigvals = eigvals[order]\neigvecs = eigvecs[:, order] # eigenvectors are columns so index the second axis",
          "codeContext": "Exact lines from Exercise2 cells 15/19 as cited. np is NumPy, plt is Matplotlib (imports in cell 4). waveforms has 51 time-bin rows and S valid-spike columns. Snippets are read, not executed; the recording MAT file is absent. No saved result is certified."
        }
      ]
    },
    {
      "id": "computer-limits",
      "title": "5. Apply the pipeline and defend its limits",
      "priority": "Red computer steps; orange limits. Pages 34–36 are explicitly optional supplementary material.",
      "sources": [
        {
          "source": "pca1",
          "pages": "31–36"
        }
      ],
      "blocks": [
        {
          "type": "steps",
          "title": "Computer PCA checklist",
          "steps": [
            "Center features across observations. Compute feature covariance with a declared divisor.",
            "Decompose covariance into eigenvectors and eigenvalues; sort paired outputs.",
            "Plot ranked variances and eigenvectors. Project centered observations onto selected directions.",
            "Interpret scores in relation to the original features and inspect information lost in reduction."
          ]
        },
        {
          "type": "example",
          "title": "Exercise2 plot semantics",
          "body": "Waveforms have 51 rows of time bins. Projecting onto two eigenvectors gives two score rows and one column per valid spike. The scatter axes are PC1 and PC2, and each dot is one waveform. A weight-versus-time-bin plot is a different plot."
        },
        {
          "type": "misconception",
          "wrong": "A PCA decomposition proves meaningful groups or independent sources.",
          "right": "Random data also decomposes. PCA can miss nonlinear structure and low-variance signals. Apparent separation motivates further checks rather than proving a cell count."
        },
        {
          "type": "detail",
          "title": "Optional material and missing data",
          "body": "The derivation and iterative algorithm on pp. 34–36 are optional, not prerequisite drills. Clustering is L04. The missing electrode_recording.mat prevents checking actual scatter groups, spike counts or notebook conclusions."
        },
        {
          "type": "detail",
          "title": "Quick oral recap",
          "body": "Center each feature across observations. Covariance describes paired deviations. Eigenvectors are orthonormal feature-weight directions; eigenvalues quantify their variances. Scores are observation coordinates in that basis. Rank eigenpairs together, declare normalization and justify retained dimensions. Reduction can lose important signals."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L03-limits",
          "prompt": "Which signal is particularly at risk when retaining only leading PCs?",
          "options": [
            {
              "text": "A signal with a low variance contribution.",
              "feedback": "Correct. Small but important signals can lie in discarded directions."
            },
            {
              "text": "A signal with the largest variance share.",
              "feedback": "Leading PCs preferentially retain high variance."
            },
            {
              "text": "A signal present in all retained scores.",
              "feedback": "Retained coordinates are available for analysis."
            },
            {
              "text": "A signal aligned with the first direction.",
              "feedback": "The first direction is retained in leading-PC reduction."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "pca1",
              "pages": "31–36"
            }
          ]
        },
        {
          "id": "L03-random",
          "prompt": "What does obtaining a PCA decomposition establish by itself?",
          "options": [
            {
              "text": "The scores correspond to distinct cell types.",
              "feedback": "Cell identity requires evidence beyond a decomposition."
            },
            {
              "text": "The low-variance directions contain only noise.",
              "feedback": "Low variance can carry important signals."
            },
            {
              "text": "The features were expressed in covariance axes.",
              "feedback": "Correct. Even random data has such a basis; interpretation is separate."
            },
            {
              "text": "The scores correspond to independent sources.",
              "feedback": "Decorrelation does not establish independence."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "pca1",
              "pages": "31–36"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L03-code-project",
          "title": "Trace projection and scatter shapes",
          "prompt": "Give the shape after each projection operation, identify what a scatter dot represents, and distinguish this plot from an eigenvector plot. Leave the unknown spike count symbolic.",
          "kind": "code",
          "rubric": [
            {
              "id": "L03-code-project-c1",
              "text": "Tracks selected weights.",
              "accept": "eigvecs[:, :2] is 51 by 2; transpose is 2 by 51."
            },
            {
              "id": "L03-code-project-c2",
              "text": "Checks multiplication.",
              "accept": "centred is 51 by S, so proj is 2 by S."
            },
            {
              "id": "L03-code-project-c3",
              "text": "Reads scatter axes.",
              "accept": "proj[0] and proj[1] each have S values, one paired point per spike."
            },
            {
              "id": "L03-code-project-c4",
              "text": "Distinguishes weight and score plots.",
              "accept": "Eigenvector weights have 51 bin entries; scores have S spike entries. Cannot infer actual groups without data."
            }
          ],
          "modelAnswer": [
            "The selected eigenvector columns form a 51 by 2 matrix; transposing gives 2 by 51. Multiplication by the 51 by S centered waveforms produces 2 by S scores. The scatter pairs each spike’s PC1 and PC2 scores. Eigenvectors instead plot 51 weights against time bin or the corresponding time offset. No actual spike count or cell separation can be verified without the recording."
          ],
          "pitfalls": [
            "Claiming that each dot is a time bin.",
            "Giving a fixed spike count from an unavailable dataset."
          ],
          "sources": [
            {
              "source": "pca1",
              "pages": "23–32"
            },
            {
              "source": "exercise2",
              "cell": 18
            },
            {
              "source": "exercise2",
              "cell": 19
            },
            {
              "source": "exercise2",
              "cell": 20
            }
          ],
          "code": "proj = eigvecs[:, :2].T @ centred\nplt.scatter(proj[0], proj[1], s=2)",
          "codeContext": "Exact lines from Exercise2 cells 15/19 as cited. np is NumPy, plt is Matplotlib (imports in cell 4). waveforms has 51 time-bin rows and S valid-spike columns. Snippets are read, not executed; the recording MAT file is absent. No saved result is certified."
        }
      ]
    }
  ],
  "finalWritten": [
    {
      "id": "L03-written-pca",
      "title": "Explain PCA to a newcomer",
      "prompt": "In about five minutes, following L07 PDF page 2: (1) define PCA in 1–2 sentences; (2) use the waveform example and state input/output formats and matrix axes; (3) sketch a labelled feature cloud with principal directions and a PC-score plot, or describe the sketch in text; (4) explain uses, limitations and overinterpretation. Equations are optional.",
      "kind": "written",
      "rubric": [
        {
          "id": "L03-written-pca-c1",
          "text": "Defines PCA as a change of basis.",
          "accept": "Orthogonal directions aligned with covariance, ordered by variance."
        },
        {
          "id": "L03-written-pca-c2",
          "text": "Specifies input format and axes.",
          "accept": "51 time-bin features by S spike observations, centered across spikes."
        },
        {
          "id": "L03-written-pca-c3",
          "text": "Specifies output format and axes.",
          "accept": "Feature weights 51 by 2, two variances, scores 2 by S; output scores are not labels."
        },
        {
          "id": "L03-written-pca-c4",
          "text": "Supplies a labelled sketch or text equivalent.",
          "accept": "Feature 1 and feature 2 axes with a centered elongated cloud and perpendicular PC directions; PC1/PC2 score axes, one point per observation."
        },
        {
          "id": "L03-written-pca-c5",
          "text": "Explains uses.",
          "accept": "Exploration, compact representation, visualization or possible denoising."
        },
        {
          "id": "L03-written-pca-c6",
          "text": "Explains limitations and overinterpretation.",
          "accept": "Variance need not be biological importance; nonlinear structure or weak signals can be lost; decorrelation is not independence and dots do not prove cell identities."
        }
      ],
      "modelAnswer": [
        "PCA re-expresses centered data along perpendicular directions learned from covariance, ordered by their variance. In Exercise2, the input is a 51 by S waveform matrix: bins are features and spikes are observations. Keeping two directions produces 51 by 2 feature weights, their two eigenvalues, and 2 by S scores.",
        "Sketch reference: label the horizontal axis feature 1 and vertical axis feature 2; draw a centered elongated cloud, a long PC1 arrow along its spread and a perpendicular PC2 arrow. In a second panel label axes PC1 score and PC2 score, with one dot per spike. This supports exploration, visualization and reduction. Low variance can matter, nonlinear structure can be missed, and even random data decomposes. Separation is a hypothesis about waveform structure, not proof of how many cells generated it."
      ],
      "pitfalls": [
        "Giving just an equation and omitting axes or the sketch.",
        "Treating weights, eigenvalues and scores as interchangeable."
      ],
      "sources": [
        {
          "source": "pca1",
          "pages": "15–32"
        },
        {
          "source": "exercise2",
          "cell": 14
        },
        {
          "source": "exercise2",
          "cell": 18
        },
        {
          "source": "exercise2",
          "cell": 19
        },
        {
          "source": "exercise2",
          "cell": 20
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ]
    },
    {
      "id": "L03-written-code",
      "title": "Defend your own PCA implementation",
      "prompt": "Walk from waveform columns to the PC scatter using the code excerpts. Explain feature centering, covariance normalization, eigenpair sorting and projection shapes. Describe two checks you would perform before trusting a run, and state what cannot be checked without the data.",
      "kind": "written",
      "rubric": [
        {
          "id": "L03-written-code-c1",
          "text": "Explains the starting representation.",
          "accept": "51 bins by S valid spikes; equal-length in-bounds slices are required."
        },
        {
          "id": "L03-written-code-c2",
          "text": "Explains centering and covariance.",
          "accept": "Mean across spikes per bin; covariance is 51 by 51 with consistent divisor."
        },
        {
          "id": "L03-written-code-c3",
          "text": "Keeps eigenpairs aligned.",
          "accept": "Descending indices reorder eigenvector columns as well as eigenvalues."
        },
        {
          "id": "L03-written-code-c4",
          "text": "Traces projection dimensions.",
          "accept": "2 by 51 times 51 by S gives 2 by S, one point per spike."
        },
        {
          "id": "L03-written-code-c5",
          "text": "Offers checks and an honest limit.",
          "accept": "Check row means near zero and score covariance approximately diagonal with matching variances; missing data prevents certifying source output or cell counts."
        }
      ],
      "modelAnswer": [
        "Check that all extracted windows have 51 bins and use consistent alignment. Center each bin across spikes and compute the 51 by 51 covariance. Declare the sample divisor and keep it consistent when checking score variance. Sort eigenvalues and their eigenvector columns together. Project with the first two transposed columns to obtain 2 by S scores. Check centered row means and the full score covariance against the diagonal eigenvalues within numerical tolerance. Without the MAT recording, this explains the algorithm but does not validate saved plots or infer cell identities."
      ],
      "pitfalls": [
        "Treating placeholder comments or execution counts as a fresh reproducible run.",
        "Mixing scatter eigenvalues with sample-covariance score variances."
      ],
      "sources": [
        {
          "source": "pca1",
          "pages": "21–32"
        },
        {
          "source": "exercise2",
          "cell": 14
        },
        {
          "source": "exercise2",
          "cell": 15
        },
        {
          "source": "exercise2",
          "cell": 18
        },
        {
          "source": "exercise2",
          "cell": 19
        },
        {
          "source": "exercise2",
          "cell": 20
        }
      ]
    },
    {
      "id": "L03-written-choose",
      "title": "Choose dimensions without discarding the question",
      "prompt": "Hypothetical practice: regional activity has one dominant whole-brain fluctuation, while the scientific question concerns a small local event. Explain what plots you would inspect, how you would choose retained directions, and why high explained variance alone may be insufficient. Include a labelled sketch or text description.",
      "kind": "written",
      "rubric": [
        {
          "id": "L03-written-choose-c1",
          "text": "Connects the dominant pattern to PCA.",
          "accept": "Large shared fluctuation can dominate the first eigenvector and scores."
        },
        {
          "id": "L03-written-choose-c2",
          "text": "Inspects three complementary views.",
          "accept": "Ranked eigenvalues, region weights and score time courses."
        },
        {
          "id": "L03-written-choose-c3",
          "text": "Explains a labelled sketch.",
          "accept": "Variance versus rank and score versus time, with an important weak event potentially in a later direction."
        },
        {
          "id": "L03-written-choose-c4",
          "text": "Defends retention for the question.",
          "accept": "Inspect later directions and compare with original regional traces rather than applying an arbitrary universal cutoff."
        },
        {
          "id": "L03-written-choose-c5",
          "text": "States limits.",
          "accept": "Low variance does not imply noise; PCA is exploratory and does not establish mechanism."
        }
      ],
      "modelAnswer": [
        "The leading direction may reflect the global fluctuation rather than the local event. Inspect eigenvalues against rank, weights against region and scores against time. Sketch the spectrum as a large leading value and smaller later values, and a later score trace containing the event. Compare reconstructed or retained patterns with the original regional traces before choosing dimensions. Keep enough directions to address the event question, and report the trade-off. A large retained variance fraction is a descriptive summary, not proof that relevant biology was preserved."
      ],
      "pitfalls": [
        "Equating a high retained fraction with high scientific accuracy.",
        "Calling every later direction noise."
      ],
      "sources": [
        {
          "source": "pca1",
          "pages": "27–32"
        }
      ]
    },
    {
      "id": "L03-written-interpret",
      "title": "Interpret apparent waveform groups cautiously",
      "prompt": "Hypothetical practice: a two-PC waveform scatter seems separated into groups. Explain what the points, axes and eigenvector weights represent. Propose how to compare this view with original waveforms and discarded variation. Defend what the plot suggests and what it cannot establish.",
      "kind": "written",
      "rubric": [
        {
          "id": "L03-written-interpret-c1",
          "text": "Identifies points and axes.",
          "accept": "One spike waveform per point; PC1 and PC2 scores are coordinates."
        },
        {
          "id": "L03-written-interpret-c2",
          "text": "Explains weights.",
          "accept": "Directions combine 51 bin features; weights are not cell identities."
        },
        {
          "id": "L03-written-interpret-c3",
          "text": "Checks original representation.",
          "accept": "Compare waveform shapes for candidate groups rather than relying on the scatter alone."
        },
        {
          "id": "L03-written-interpret-c4",
          "text": "Checks reduction loss.",
          "accept": "Inspect retained fraction and later scores for omitted structure."
        },
        {
          "id": "L03-written-interpret-c5",
          "text": "Bounds the claim.",
          "accept": "Apparent groups motivate clustering or validation in L04, not a verified number of cells; no actual source result asserted."
        }
      ],
      "modelAnswer": [
        "Each point is a waveform’s two projected coordinates, not a neuron or bin. Eigenvectors give the time-bin weights used to compute these scores. Compare candidate groups in waveform space and inspect later components and retained variance to see what the two-dimensional view omits. Apparent groups suggest structure worth checking with clustering and other evidence. They do not establish independent sources or a particular cell count. Exercise2 asks this interpretation question, but the missing recording prevents validating its saved answer here."
      ],
      "pitfalls": [
        "Counting apparent groups as confirmed cells.",
        "Assuming two uncorrelated scores capture every meaningful distinction."
      ],
      "sources": [
        {
          "source": "pca1",
          "pages": "26–32"
        },
        {
          "source": "exercise2",
          "cell": 16
        },
        {
          "source": "exercise2",
          "cell": 18
        },
        {
          "source": "exercise2",
          "cell": 19
        },
        {
          "source": "exercise2",
          "cell": 20
        },
        {
          "source": "exercise2",
          "cell": 21
        }
      ]
    }
  ],
  "lectureQuiz": []
};
