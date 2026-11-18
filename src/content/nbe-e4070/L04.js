import { scaleLinear } from 'd3';
// Original schematic: invented merge levels, no measured observations.
const y = scaleLinear().domain([0, 5]).range([235, 40]);
const tree = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 310" style="width:100%;height:auto" aria-hidden="true">
<g font-family="system-ui,sans-serif" font-size="14" fill="currentColor">
<path d="M65 40V235H420" fill="none" stroke="currentColor"/>
<text transform="translate(21,140) rotate(-90)" text-anchor="middle">Merge dissimilarity</text>
<text x="250" y="295" text-anchor="middle">Observations (leaf order)</text>
${[0,5].map(v=>`<text x="56" y="${y(v)+5}" text-anchor="end">${v}</text>`).join('')}
<path d="M115 ${y(0)}V${y(1)}H185V${y(0)}M150 ${y(1)}V${y(4)}H335V${y(1.5)}M300 ${y(0)}V${y(1.5)}H370V${y(0)}" fill="none" stroke="var(--c-text-muted)" stroke-width="1.5"/>
${[[115,'A'],[185,'B'],[300,'C'],[370,'D']].map(([x,t])=>`<text x="${x}" y="260" text-anchor="middle">${t}</text>`).join('')}
<path d="M85 ${y(2.5)}H415" stroke="var(--c-accent)" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="250" y="${y(2.5)-9}" text-anchor="middle">Cut: {A, B} and {C, D}</text>
</g></svg>`;

export default {
  "meta": {
    "id": "L04",
    "number": 4,
    "title": "Clustering methods"
  },
  "learningMode": "topic-study",
  "intro": [
    "Learn the exact Lecture 4 sequence: grouping and centroids, K-means, hierarchy, computer workflow, tumor expression and retinal responses. Read each short unit, answer easy MCQs, then explain the code. Four substantial written prompts finish the lecture.",
    "Exercise2 clustering is available. Exercise4 notebook is PENDING and has no invented solution. The recording is missing; examples here explain methods and shapes, not newly verified notebook results."
  ],
  "sections": [
    {
      "id": "clusters-representation",
      "title": "1. Clusters, centroids and assignments",
      "sources": [
        {
          "source": "clustering",
          "pages": "5–6"
        }
      ],
      "priority": "Red: definition. Orange: algebraic representation. Opening pp. 2–3 recap PCA, which gives coordinates rather than cluster labels.",
      "blocks": [
        {
          "type": "definition",
          "term": "Clustering",
          "body": "Group observations so that points within a group are more similar than points assigned to different groups. A centroid represents a group by a point in the same feature space. The features and distance determine what similarity means."
        },
        {
          "type": "example",
          "title": "Input and output",
          "body": "For spike sorting, one observation is a 51-bin waveform, not one time bin. Features describe each waveform; K-means returns assignments and centers. Hierarchical clustering instead returns nested groups and a tree. Cluster IDs are not measured cell identities."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "X\\approx CA,\\quad X\\in\\mathbb R^{F\\times S}",
              "label": "Slide algebra: F feature rows, S observation columns."
            },
            {
              "tex": "C\\in\\mathbb R^{F\\times K},\\quad A\\in\\{0,1\\}^{K\\times S}",
              "label": "K centroid columns; each assignment column has one 1 and otherwise zeros."
            }
          ]
        },
        {
          "type": "text",
          "body": "Multiplying by an assignment column selects one centroid. The approximation replaces each observation with its assigned representative; the difference is the reconstruction error. Unlike PCA directions, centroids need not be perpendicular."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-definition",
          "prompt": "What is the main output of clustering?",
          "options": [
            {
              "text": "A coordinate for each Fourier frequency.",
              "feedback": "Fourier analysis changes the basis of a signal."
            },
            {
              "text": "A component ranked by explained variance.",
              "feedback": "PCA ranks variation directions rather than grouping observations."
            },
            {
              "text": "A group assignment for each observation.",
              "feedback": "Correct. Clustering partitions observations by similarity."
            },
            {
              "text": "A prediction from known outcome labels.",
              "feedback": "Supervised prediction uses known targets; this grouping does not."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "clustering",
              "pages": "5–6"
            }
          ]
        },
        {
          "id": "L04-centroid",
          "prompt": "What does a K-means centroid represent?",
          "options": [
            {
              "text": "The mean feature vector of its group.",
              "feedback": "Correct. Coordinate-wise averages give a center in feature space."
            },
            {
              "text": "The first observed vector of its group.",
              "feedback": "A centroid need not coincide with any observed point."
            },
            {
              "text": "The largest variance axis of its group.",
              "feedback": "A variance axis is a direction, not the mean location."
            },
            {
              "text": "The sorted observation IDs of its group.",
              "feedback": "Identifiers are not feature-space coordinates."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "clustering",
              "pages": "5–6"
            }
          ]
        },
        {
          "id": "L04-assignment",
          "prompt": "What does a column of the slide assignment matrix encode?",
          "options": [
            {
              "text": "One feature’s values across all samples.",
              "feedback": "Features form rows of X, not assignment columns."
            },
            {
              "text": "One centroid’s weights across features.",
              "feedback": "Centroid vectors form columns of C."
            },
            {
              "text": "One component’s scores across samples.",
              "feedback": "PCA scores are not one-hot assignments."
            },
            {
              "text": "One sample’s membership in a cluster.",
              "feedback": "Correct. A single 1 selects that sample’s centroid."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "clustering",
              "pages": "5–6"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "kmeans",
      "title": "2. Alternate assignments and center updates",
      "sources": [
        {
          "source": "clustering",
          "pages": "7–10"
        }
      ],
      "priority": "Orange: feasible search. Red: K-means steps and choosing K. Blue p. 9 is an illustrative demonstration, not required media.",
      "blocks": [
        {
          "type": "steps",
          "title": "K-means",
          "steps": [
            "Choose K and initial guesses for the K centers.",
            "Assign every observation to its nearest center in Euclidean distance.",
            "Replace each center with the coordinate-wise mean of its assigned observations.",
            "Repeat assignment and mean update until convergence. This searches a small part of the possible partitions, not every grouping."
          ]
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "L=\\sum_{s=1}^{S}\\lVert x_s-c_{a_s}\\rVert^2",
              "label": "Total squared distance from each observation to its assigned center. Alternate assignments and means to reduce this loss; a good local solution need not be the global best."
            }
          ]
        },
        {
          "type": "misconception",
          "wrong": "Convergence guarantees the globally best partition.",
          "right": "The starting configuration can affect the result. Repeated starts reduce dependence on one initialization but do not prove a global optimum or natural groups."
        },
        {
          "type": "definition",
          "term": "Choosing K",
          "body": "Sometimes the task imposes a fixed number of groups. Otherwise compare partitions visually: do they merge distinct groups or subdivide a continuous cloud? A useful partition can exist without one natural number of clusters."
        },
        {
          "type": "detail",
          "title": "Distance is part of the method",
          "body": "Euclidean closeness in chosen features favors groups represented by a mean center. Some data structures do not fit this model (p. 18). Changing the representation changes the distances and can change assignments. No silhouette, gap statistic or universal cutoff is taught here."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-assign",
          "prompt": "How does the K-means assignment step choose a group?",
          "options": [
            {
              "text": "Choose the nearest center in Euclidean distance.",
              "feedback": "Correct. Assignment compares distances to current centers."
            },
            {
              "text": "Choose the center with the largest group size.",
              "feedback": "Group size is not the assignment rule."
            },
            {
              "text": "Choose the center with the highest variance.",
              "feedback": "Variance ranking describes PCA, not nearest-center assignment."
            },
            {
              "text": "Choose the first center in the stored order.",
              "feedback": "Stored index order does not measure similarity."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "clustering",
              "pages": "7–10"
            }
          ]
        },
        {
          "id": "L04-update",
          "prompt": "After assignment, how is each center updated?",
          "options": [
            {
              "text": "Move to the group’s most distant point.",
              "feedback": "That selects an extreme rather than a center of mass."
            },
            {
              "text": "Keep the group’s original starting point.",
              "feedback": "Keeping the start would omit the mean update."
            },
            {
              "text": "Take the group’s coordinate-wise mean.",
              "feedback": "Correct. Average each feature over the assigned points."
            },
            {
              "text": "Take the group’s leading PCA direction.",
              "feedback": "A direction describes spread rather than center location."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "clustering",
              "pages": "7–10"
            }
          ]
        },
        {
          "id": "L04-choose-k",
          "prompt": "Which reason for choosing K is explicitly taught?",
          "options": [
            {
              "text": "Use the number of available features.",
              "feedback": "Feature dimension does not specify the number of groups."
            },
            {
              "text": "Use the problem’s grouping constraint.",
              "feedback": "Correct. For example, the application may require a given number of streams."
            },
            {
              "text": "Use the number of retained PCA axes.",
              "feedback": "Visualization dimensions and cluster count are different choices."
            },
            {
              "text": "Use the count of initial random seeds.",
              "feedback": "Starts explore solutions for a chosen K; they do not define K."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "clustering",
              "pages": "7–10"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L04-code-settings",
          "title": "Explain the K-means call",
          "prompt": "Explain the cluster-count setting, the initialization-count setting and the random-seed setting. Which data are clustered? What does fixing the seed establish, and what does it leave unresolved?",
          "kind": "code",
          "sources": [
            {
              "source": "clustering",
              "pages": "7–10,17–18"
            },
            {
              "source": "exercise2",
              "cell": 22
            },
            {
              "source": "exercise2",
              "cell": 23
            }
          ],
          "rubric": [
            {
              "id": "L04-code-settings-c1",
              "text": "Identifies input data.",
              "accept": "waveforms.T supplies full 51-bin waveforms as spike rows, not proj."
            },
            {
              "id": "L04-code-settings-c2",
              "text": "Explains K.",
              "accept": "the cluster-count setting requests K groups; the assignment tries K=2 and K=3."
            },
            {
              "id": "L04-code-settings-c3",
              "text": "Explains repeated starts.",
              "accept": "the initialization-count setting=10 tries ten initializations for a given K."
            },
            {
              "id": "L04-code-settings-c4",
              "text": "Bounds reproducibility.",
              "accept": "the random-seed setting=0 fixes random choices for reproducibility in the same setup; it neither chooses the biological cell count nor guarantees a global optimum."
            }
          ],
          "modelAnswer": [
            "The call clusters the full waveform features. the cluster-count setting sets the requested partition size; the initialization-count setting=10 uses ten starting configurations. the random-seed setting fixes random choices so comparisons can be repeated in the same computational setup. This does not validate the partition or discover the number of generating cells. The enclosing notebook loop compares two and three groups, as requested in cell 22."
          ],
          "pitfalls": [
            "Saying ten initializations means ten clusters.",
            "Claiming the PCA scatter coordinates were the fit input."
          ],
          "code": "from sklearn.cluster import KMeans\nlabels = KMeans(n_clusters=K, n_init=10, random_state=0).fit_predict(waveforms.T)",
          "codeContext": "Exact executable lines from Exercise2 cell 23 (indentation retained or dedented for excerpt). KMeans is imported there; np and plt are NumPy and Matplotlib from cell 4. waveforms is 51 bins by S valid spikes (cells 14–15); proj is 2 by S centered PCA scores (cells 18–19). the time-offset vector has 51 offsets in milliseconds. Read only: electrode_recording.mat is absent and no saved outputs are certified."
        }
      ]
    },
    {
      "id": "hierarchy",
      "title": "3. Build, read and cut a hierarchy",
      "sources": [
        {
          "source": "clustering",
          "pages": "11–16"
        }
      ],
      "priority": "Red: agglomeration, linkage and dendrogram. Orange: cut and comparison. Blue p. 15 is a demonstration.",
      "blocks": [
        {
          "type": "steps",
          "title": "Agglomerative hierarchical clustering",
          "steps": [
            "Begin with individual observations as groups.",
            "Compare intergroup dissimilarities using a declared linkage rule.",
            "Merge the least dissimilar pair, leaving one fewer group.",
            "Repeat to form a nested tree. Choose a horizontal cut later to obtain a flat partition."
          ]
        },
        {
          "type": "compare",
          "title": "The linkage rule defines group dissimilarity",
          "columns": [
            "Distance between two groups"
          ],
          "rows": [
            {
              "label": "Single linkage",
              "cells": [
                "Smallest pairwise distance, one member from each group."
              ]
            },
            {
              "label": "Complete linkage",
              "cells": [
                "Largest pairwise distance, one member from each group."
              ]
            },
            {
              "label": "Group average",
              "cells": [
                "Average of the cross-group pairwise distances."
              ]
            }
          ]
        },
        {
          "type": "definition",
          "term": "Dendrogram",
          "body": "Leaves are observations; branches record successive merges. Merge height is proportional to intergroup dissimilarity under the linkage rule. Horizontal leaf spacing is an arrangement, not a time axis or a measured feature."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": tree,
            "caption": "Original hypothetical tree, arbitrary dissimilarity units. The cut crosses two branches, giving two groups. A cut below both first merges gives four singletons; a cut above the final merge gives one group.",
            "fallbackAlt": "A and B merge at height 1, C and D at 1.5, and both pairs at 4. A horizontal cut at 2.5 leaves the pairs separate. Vertical axis is merge dissimilarity; leaves are observations A to D."
          }
        },
        {
          "type": "text",
          "body": "A horizontal cut gives one group per vertical branch it crosses. A higher cut joins more groups; a lower cut keeps finer groups. Large jumps between internal merges and later merges can suggest natural groups at several nested levels."
        },
        {
          "type": "compare",
          "title": "What must be chosen?",
          "columns": [
            "K-means",
            "Hierarchy"
          ],
          "rows": [
            {
              "label": "Before grouping",
              "cells": [
                "K and initial center configuration.",
                "Distance and linkage; no K or centroid initialization required for the full tree."
              ]
            },
            {
              "label": "Flat partition",
              "cells": [
                "One assignment per point for the chosen K.",
                "A chosen cut through the tree; its level still needs justification."
              ]
            }
          ]
        },
        {
          "type": "misconception",
          "wrong": "A hierarchy reveals the true biological tree automatically.",
          "right": "The method imposes nested structure even when the data lack a natural hierarchy. Linkage and cut affect interpretation."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-linkage",
          "prompt": "Which linkage uses the most distant cross-group pair?",
          "options": [
            {
              "text": "Single linkage between the groups.",
              "feedback": "Single linkage uses the closest cross-group pair."
            },
            {
              "text": "Complete linkage between the groups.",
              "feedback": "Correct. Complete linkage uses the maximum cross-group dissimilarity."
            },
            {
              "text": "Group average between the groups.",
              "feedback": "Average linkage uses all cross-group pair distances."
            },
            {
              "text": "Nearest centroid between the groups.",
              "feedback": "Centroid distance is distinct from complete linkage."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "clustering",
              "pages": "11–16"
            }
          ]
        },
        {
          "id": "L04-height",
          "prompt": "What does a dendrogram merge height encode?",
          "options": [
            {
              "text": "Elapsed time since the recording began.",
              "feedback": "Height is not a recording-time coordinate."
            },
            {
              "text": "Variance explained by the leading PC.",
              "feedback": "A dendrogram is not an eigenvalue spectrum."
            },
            {
              "text": "Mean feature value of the joined group.",
              "feedback": "Group means do not define dendrogram heights."
            },
            {
              "text": "Dissimilarity of the two joined groups.",
              "feedback": "Correct. Read height according to the chosen distance and linkage."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "clustering",
              "pages": "11–16"
            }
          ]
        },
        {
          "id": "L04-cut",
          "prompt": "What does moving a dendrogram cut higher generally produce?",
          "options": [
            {
              "text": "Fewer, larger groups from later merges.",
              "feedback": "Correct. Later joins combine groups that were separate below."
            },
            {
              "text": "More, smaller groups from earlier merges.",
              "feedback": "A lower cut gives the finer partition."
            },
            {
              "text": "More feature columns for every sample.",
              "feedback": "Cutting changes membership, not feature dimension."
            },
            {
              "text": "Fewer sample rows in every group.",
              "feedback": "A higher cut combines samples into larger groups."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "clustering",
              "pages": "11–16"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "computer-workflow",
      "title": "4. Trace the waveform clustering workflow",
      "sources": [
        {
          "source": "clustering",
          "pages": "17–18"
        }
      ],
      "priority": "Red: samples-by-features computer input. Orange: risks and limits. Exercise2 Questions 8–9 provide the actual code and interpretation tasks.",
      "blocks": [
        {
          "type": "steps",
          "title": "Compute, inspect, revise",
          "steps": [
            "Prepare one sample per row and one feature per column for the clustering API.",
            "Fit K-means or hierarchical clustering. Keep labels aligned with the observation order.",
            "Visualize groups in the original feature representation and a suitable summary view.",
            "Adjust K or the dendrogram cut according to the purpose and visible structure; explain the limits."
          ]
        },
        {
          "type": "example",
          "title": "Reconcile the transpose",
          "body": "Exercise2 stores 51 bins by S spikes, matching the slide algebra. KMeans receives its transpose: S spikes by 51 bins. It returns S labels. A two-PC scatter displays those labels on projected coordinates; it does not change what was fitted."
        },
        {
          "type": "misconception",
          "wrong": "A third color proves a third generating cell.",
          "right": "K-means partitions a continuous cloud when asked for more groups. Compare original waveform shapes and PCA views; the number of groups is not automatically the number of cells."
        },
        {
          "type": "detail",
          "title": "Exercise 4 notebook: PENDING",
          "body": "Exercise4 has not been supplied. This is its reserved slot, with no invented notebook or solution. Use only the available Exercise2 clustering tasks and exact code excerpts below. The recording and notebook image files are also absent; saved plots and cell-count claims are not independently verified."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-api-shape",
          "prompt": "Which input shape does the clustering API expect?",
          "options": [
            {
              "text": "Features as rows, spikes as columns.",
              "feedback": "That is the notebook storage orientation before transpose."
            },
            {
              "text": "Components as rows, features as columns.",
              "feedback": "Components are not sample rows for this fit."
            },
            {
              "text": "Spikes as rows, features as columns.",
              "feedback": "Correct. Each row must describe one observation to be grouped."
            },
            {
              "text": "Cluster IDs as rows, spikes as columns.",
              "feedback": "Cluster IDs are outputs, not input observations."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "clustering",
              "pages": "17–18"
            }
          ]
        },
        {
          "id": "L04-forced",
          "prompt": "Why can K-means give a misleading impression of groups?",
          "options": [
            {
              "text": "It can partition a cloud with no natural split.",
              "feedback": "Correct. Requested groups need not correspond to natural boundaries."
            },
            {
              "text": "It can replace feature values with PCA scores.",
              "feedback": "This call uses raw waveform features rather than PCA scores."
            },
            {
              "text": "It can infer labels from a dendrogram height.",
              "feedback": "K-means does not use a dendrogram."
            },
            {
              "text": "It can choose K from the count of time bins.",
              "feedback": "The requested K is supplied, not inferred from bin count."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "clustering",
              "pages": "17–18"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L04-code-shapes",
          "title": "Track samples and features",
          "prompt": "Give input and output shapes if waveforms has 51 rows and S valid spike columns. What would the code group if .T were omitted? Keep S symbolic.",
          "kind": "code",
          "sources": [
            {
              "source": "clustering",
              "pages": "6,17"
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
              "cell": 23
            }
          ],
          "rubric": [
            {
              "id": "L04-code-shapes-c1",
              "text": "Names original axes.",
              "accept": "waveforms is 51 bins by S spikes."
            },
            {
              "id": "L04-code-shapes-c2",
              "text": "Tracks transpose.",
              "accept": "waveforms.T is S by 51, one spike per row."
            },
            {
              "id": "L04-code-shapes-c3",
              "text": "Tracks labels.",
              "accept": "labels is a one-dimensional length-S array, one ID per spike."
            },
            {
              "id": "L04-code-shapes-c4",
              "text": "Diagnoses omitted transpose.",
              "accept": "The API would treat 51 bin rows as observations with S features and return 51 labels; it would group bins rather than spikes."
            }
          ],
          "modelAnswer": [
            "Transpose converts 51 by S into S by 51. the fit-and-label call assigns one cluster ID per input row, so labels has length S. Without .T the rows would be time bins and the output would have 51 entries, answering a different question. A plausible-looking output is not enough: check row semantics as well as shape."
          ],
          "pitfalls": [
            "Assuming libraries infer which axis contains samples.",
            "Giving an actual spike count from a missing recording."
          ],
          "code": "labels = KMeans(n_clusters=K, n_init=10, random_state=0).fit_predict(waveforms.T)",
          "codeContext": "Exact executable lines from Exercise2 cell 23 (indentation retained or dedented for excerpt). KMeans is imported there; np and plt are NumPy and Matplotlib from cell 4. waveforms is 51 bins by S valid spikes (cells 14–15); proj is 2 by S centered PCA scores (cells 18–19). the time-offset vector has 51 offsets in milliseconds. Read only: electrode_recording.mat is absent and no saved outputs are certified."
        },
        {
          "id": "L04-code-waveforms",
          "title": "Read the waveform mask and overlay",
          "prompt": "Explain labels==k, which axis it selects, and the plotted shapes. State the horizontal and vertical axes and one validity check before trusting the overlay.",
          "kind": "code",
          "sources": [
            {
              "source": "clustering",
              "pages": "17–18"
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
              "cell": 22
            },
            {
              "source": "exercise2",
              "cell": 23
            }
          ],
          "rubric": [
            {
              "id": "L04-code-waveforms-c1",
              "text": "Explains mask.",
              "accept": "A length-S boolean vector is true for spikes assigned to k."
            },
            {
              "id": "L04-code-waveforms-c2",
              "text": "Tracks selection.",
              "accept": "waveforms[:, labels==k] keeps all 51 rows and $S_k$ selected spike columns."
            },
            {
              "id": "L04-code-waveforms-c3",
              "text": "Reads plot axes.",
              "accept": "the time-offset vector has 51 offsets; each selected column is voltage versus time offset in milliseconds."
            },
            {
              "id": "L04-code-waveforms-c4",
              "text": "Checks validity.",
              "accept": "Labels must align with spike columns; all windows need 51 valid bins and consistent alignment. No output can be verified without the recording."
            }
          ],
          "modelAnswer": [
            "The mask selects spike columns whose assigned ID equals k. The selected matrix has 51 rows and one column per selected spike; the time-offset vector supplies the 51 horizontal offsets. Each line overlays a selected voltage waveform, with potential on the vertical axis. Check label length/order and equal-length, in-bounds waveform windows. The code reads a group’s shapes; it does not prove they came from one cell."
          ],
          "pitfalls": [
            "Masking the bin axis rather than the spike axis.",
            "Treating every plotted line as a separate neuron."
          ],
          "code": "for k in range(K):\n    plt.plot(time_ms, waveforms[:, labels==k], color=f'C{k}', linewidth=0.3, alpha=0.1)",
          "codeContext": "Exact executable lines from Exercise2 cell 23 (indentation retained or dedented for excerpt). KMeans is imported there; np and plt are NumPy and Matplotlib from cell 4. waveforms is 51 bins by S valid spikes (cells 14–15); proj is 2 by S centered PCA scores (cells 18–19). the time-offset vector has 51 offsets in milliseconds. Read only: electrode_recording.mat is absent and no saved outputs are certified."
        },
        {
          "id": "L04-code-scatter",
          "title": "Explain colors in PCA space",
          "prompt": "Which rows and columns does this line select? What is each dot, and in which space were these labels learned? Explain why a clean two-dimensional picture is not sufficient validation.",
          "kind": "code",
          "sources": [
            {
              "source": "clustering",
              "pages": "17–18"
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
              "cell": 22
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
              "id": "L04-code-scatter-c1",
              "text": "Reads score axes.",
              "accept": "proj is 2 by S; row 0 is PC1 and row 1 PC2."
            },
            {
              "id": "L04-code-scatter-c2",
              "text": "Explains matched selection.",
              "accept": "The same length-S mask selects the same spikes in both rows."
            },
            {
              "id": "L04-code-scatter-c3",
              "text": "Identifies point and fit.",
              "accept": "One dot per selected spike; labels were fit on full 51-dimensional waveforms, not two scores."
            },
            {
              "id": "L04-code-scatter-c4",
              "text": "States view limit.",
              "accept": "Projection can hide variation, and requested K can impose boundaries. Compare waveform overlays and acknowledge missing data."
            }
          ],
          "modelAnswer": [
            "Both score rows use the same spike mask, so the scatter pairs PC1 and PC2 coordinates for each selected waveform. The color is the label fitted in 51-dimensional waveform space. A two-dimensional view can hide distinctions or create an overly simple impression. Compare the original overlays, the candidate values of K, and the interpretation purpose. Without the recording, no actual separation is certified."
          ],
          "pitfalls": [
            "Saying K-means fitted proj because the result is plotted there.",
            "Calling colors verified biological classes."
          ],
          "code": "for k in range(K):\n    plt.scatter(proj[0, labels==k], proj[1, labels==k], s=2, label=f'Cluster {k}')",
          "codeContext": "Exact executable lines from Exercise2 cell 23 (indentation retained or dedented for excerpt). KMeans is imported there; np and plt are NumPy and Matplotlib from cell 4. waveforms is 51 bins by S valid spikes (cells 14–15); proj is 2 by S centered PCA scores (cells 18–19). the time-offset vector has 51 offsets in milliseconds. Read only: electrode_recording.mat is absent and no saved outputs are certified."
        }
      ]
    },
    {
      "id": "tumor-expression",
      "title": "5. Interpret the tumor-expression example",
      "sources": [
        {
          "source": "clustering",
          "pages": "19–22"
        }
      ],
      "priority": "Case-study application. Qualitative axes and nested groups, no patient-level values or clinical classifier claims.",
      "blocks": [
        {
          "type": "example",
          "title": "What is clustered?",
          "body": "The example expression matrix has gene rows and tumor-sample columns. Grouping samples compares expression profiles across genes. Grouping genes compares profiles across samples. These are different analyses, even when both orderings appear in one heatmap."
        },
        {
          "type": "steps",
          "title": "Read the panels",
          "steps": [
            "Plot total within-cluster squared loss against K. A bend can suggest a useful K, but the tumor example has no clear bend; its illustrated choice is not a uniquely established subtype count.",
            "The sample dendrogram supports nested partitions at different heights. K-means partitions at different K need not be nested; increasing K can rearrange membership.",
            "Hierarchical orderings of both genes and samples rearrange the heatmap to expose patterns; reordering does not create new measurements."
          ]
        },
        {
          "type": "misconception",
          "wrong": "Agreement with some cancer labels validates a diagnostic test.",
          "right": "The slides illustrate exploratory grouping. A partition or heatmap alone does not establish diagnostic accuracy, mechanism or generalization to new patients."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-expression",
          "prompt": "When clustering tumor samples, what are the observations?",
          "options": [
            {
              "text": "The individual genes across all patients.",
              "feedback": "Those would be observations for clustering genes instead."
            },
            {
              "text": "The tumor samples described by genes.",
              "feedback": "Correct. Each tumor sample has an expression feature profile."
            },
            {
              "text": "The color levels used in the heatmap.",
              "feedback": "Color encodes expression, not a sample identity."
            },
            {
              "text": "The linkage heights shown in the tree.",
              "feedback": "Heights summarize merges rather than input observations."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "clustering",
              "pages": "19–22"
            }
          ]
        },
        {
          "id": "L04-heatmap",
          "prompt": "What does ordering a heatmap by a hierarchy do?",
          "options": [
            {
              "text": "Replace measurements with cluster means.",
              "feedback": "Ordering retains measurements rather than replacing them."
            },
            {
              "text": "Convert measurements to diagnostic labels.",
              "feedback": "An ordering does not produce verified diagnostic labels."
            },
            {
              "text": "Rearrange measurements to expose patterns.",
              "feedback": "Correct. The values stay the same while related rows or columns become neighbors."
            },
            {
              "text": "Convert measurements to recording times.",
              "feedback": "Expression values are not converted to time by ordering."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "clustering",
              "pages": "19–22"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "retinal-responses",
      "title": "6. Group retinal responses without overclaiming",
      "sources": [
        {
          "source": "clustering",
          "pages": "23–28"
        }
      ],
      "priority": "Case-study application. Response patterns across cells and repetitions, not an extra anatomy syllabus.",
      "blocks": [
        {
          "type": "example",
          "title": "One cell versus many cells",
          "body": "The slides align repeated responses with a luminance stimulus over time. Repetitions show variation within one cell’s response. Comparing response patterns across cells can reveal functional similarities. A repeated-trial row and a cell are different observational units."
        },
        {
          "type": "definition",
          "term": "Functional grouping",
          "body": "Choose a response representation for each cell, with features at matched times or stimulus conditions. Clustering asks which response profiles are similar. The lecture shows functional diversity and a hierarchy; a group is evidence about response similarity, not automatic proof of anatomical identity."
        },
        {
          "type": "compare",
          "title": "Two retinal questions",
          "columns": [
            "Observation",
            "Features"
          ],
          "rows": [
            {
              "label": "Lecture response grouping",
              "cells": [
                "One cell.",
                "Response profile across matched stimulus times/conditions."
              ]
            },
            {
              "label": "Exercise2 spike sorting",
              "cells": [
                "One detected spike.",
                "51 voltage bins around its detected event."
              ]
            }
          ]
        },
        {
          "type": "detail",
          "title": "Quick oral recap",
          "body": "State observations and features first. K-means alternates nearest-center assignment and mean updates; K and initialization matter. Hierarchy merges the least dissimilar groups using linkage; cut height controls a flat partition. Neither algorithm proves natural groups. Explain both original-space plots and summary views, and defend the claim’s limits. L05 covers regression next."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L04-repetitions",
          "prompt": "What do repeated stimulus trials for one cell primarily show?",
          "options": [
            {
              "text": "Variability in that cell’s stimulus response.",
              "feedback": "Correct. Repeats describe variation and reproducibility within a cell."
            },
            {
              "text": "Separate cell types for each trial response.",
              "feedback": "Repeating one cell does not generate new cell identities."
            },
            {
              "text": "Cluster centers for each stimulus time bin.",
              "feedback": "Trials are observations, not automatically centroids."
            },
            {
              "text": "Principal directions for each trial response.",
              "feedback": "Principal directions require a separate PCA analysis."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "clustering",
              "pages": "23–28"
            }
          ]
        },
        {
          "id": "L04-retina-units",
          "prompt": "How do lecture response grouping and Exercise2 sorting differ?",
          "options": [
            {
              "text": "Both use time bins as the grouped observations.",
              "feedback": "Time bins supply features here, not the grouped units."
            },
            {
              "text": "Both use cell identities as the grouped observations.",
              "feedback": "Exercise2 labels individual detected waveforms."
            },
            {
              "text": "Lecture groups spikes; the exercise groups cells.",
              "feedback": "This reverses the observation units of the two tasks."
            },
            {
              "text": "Lecture groups cells; the exercise groups spikes.",
              "feedback": "Correct. Cell response profiles and individual spike waveforms answer different questions."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "clustering",
              "pages": "23–28"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    }
  ],
  "finalWritten": [
    {
      "id": "L04-written-explain",
      "title": "Explain K-means to a newcomer",
      "prompt": "Give a five-minute explanation: define K-means in 1–2 sentences; use the waveform example to state input/output formats and axes; sketch feature 1 versus feature 2 with observations, centers and assignments (or describe it in text); explain uses, initialization, choosing K and overinterpretation. This adapts the L07 p. 2 explanation format, not an official clustering exam question.",
      "kind": "written",
      "sources": [
        {
          "source": "clustering",
          "pages": "5–10,17–18"
        },
        {
          "source": "exercise2",
          "cell": 14
        },
        {
          "source": "exercise2",
          "cell": 22
        },
        {
          "source": "exercise2",
          "cell": 23
        },
        {
          "source": "exercise2",
          "cell": 25
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ],
      "rubric": [
        {
          "id": "L04-written-explain-c1",
          "text": "Defines the method and steps.",
          "accept": "Groups observations by alternating nearest Euclidean center assignment and coordinate-wise means."
        },
        {
          "id": "L04-written-explain-c2",
          "text": "Specifies input and output.",
          "accept": "S spikes by 51 features for the API; S labels and K centers each with 51 features."
        },
        {
          "id": "L04-written-explain-c3",
          "text": "Supplies labelled sketch or text.",
          "accept": "Feature axes, observation dots, centroid marks, and an indicated nearest-center assignment."
        },
        {
          "id": "L04-written-explain-c4",
          "text": "Justifies choices and use.",
          "accept": "Use for exploratory waveform grouping; compare K=2/3 and explain task constraints, visual splits and initialization."
        },
        {
          "id": "L04-written-explain-c5",
          "text": "Bounds the interpretation.",
          "accept": "Convergence/repeated starts do not guarantee a global optimum or true cell count; missing recording prevents validation."
        }
      ],
      "modelAnswer": [
        "K-means partitions observations around K mean centers. Start with center guesses, assign points to the nearest Euclidean center, recompute group means and repeat. In Exercise2 the API receives S spike rows and 51 bin-feature columns, returning S group IDs and K centers with 51 features each.",
        "Sketch reference: label axes feature 1 and feature 2, draw observation dots and distinct center marks, and connect a point to its nearest center. This supports exploratory grouping. Compare two and three groups in waveform and PCA views; initialization and K influence the partition. A converged or reproducible result does not establish a true biological cell count. No actual result is verified without the recording."
      ],
      "pitfalls": [
        "Omitting axes or output format.",
        "Equating a requested number of clusters with a verified number of neurons."
      ]
    },
    {
      "id": "L04-written-hierarchy",
      "title": "Defend a hierarchy and its cut",
      "prompt": "Hypothetical practice: you want nested groups of tumor samples based on gene-expression profiles. Explain the input orientation, how single/complete/average linkage define merges, how to label and cut a dendrogram, and which claims the result supports. Sketch or describe two cut heights and their different partitions.",
      "kind": "written",
      "sources": [
        {
          "source": "clustering",
          "pages": "11–22"
        }
      ],
      "rubric": [
        {
          "id": "L04-written-hierarchy-c1",
          "text": "Defines observations and features.",
          "accept": "Tumor samples as observations, genes as features; transpose a genes-by-samples matrix for a samples-by-features API."
        },
        {
          "id": "L04-written-hierarchy-c2",
          "text": "Explains linkage.",
          "accept": "Minimum, maximum or mean cross-group dissimilarity respectively."
        },
        {
          "id": "L04-written-hierarchy-c3",
          "text": "Reads a labelled tree.",
          "accept": "Leaves are samples; vertical height is merge dissimilarity, horizontal leaf order is not a feature/time coordinate."
        },
        {
          "id": "L04-written-hierarchy-c4",
          "text": "Explains two cuts.",
          "accept": "Higher cut combines groups; lower cut preserves finer groups, nested within coarser ones."
        },
        {
          "id": "L04-written-hierarchy-c5",
          "text": "Defends limits.",
          "accept": "Choose distance/linkage/cut for the question; a tree imposes hierarchy and does not establish diagnosis or natural subtypes."
        }
      ],
      "modelAnswer": [
        "Arrange samples as rows and genes as columns for the API. Repeatedly merge the least dissimilar groups, defining their dissimilarity by the closest pair, furthest pair or cross-group average. Draw sample leaves horizontally and merge dissimilarity vertically. A lower horizontal cut crosses more branches and yields finer groups; a higher cut joins them into coarser nested groups. Large merge-height gaps can motivate a cut, but the hierarchy is imposed. The heatmap and groups describe expression patterns, not a validated diagnostic test."
      ],
      "pitfalls": [
        "Reading height as elapsed time.",
        "Claiming a hierarchy needs no analysis choices because K was not supplied."
      ]
    },
    {
      "id": "L04-written-code",
      "title": "Defend the Exercise2 clustering and plotting code",
      "prompt": "Walk through the real KMeans call and the two plotting masks shown above. Explain the transpose, initialization settings, label alignment and dimensions in waveform/PCA views. Describe how you would compare K=2 and K=3, including uncertainty about cell count and what cannot be checked here.",
      "kind": "written",
      "sources": [
        {
          "source": "clustering",
          "pages": "8–10,17–18"
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
        },
        {
          "source": "exercise2",
          "cell": 22
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
          "id": "L04-written-code-c1",
          "text": "Traces the fit input/output.",
          "accept": "51 by S becomes S by 51; output S labels. Fit is on waveforms, not proj."
        },
        {
          "id": "L04-written-code-c2",
          "text": "Explains settings.",
          "accept": "K is requested groups; ten starts; fixed random seed for reproducibility, not biological validation."
        },
        {
          "id": "L04-written-code-c3",
          "text": "Explains waveform overlay.",
          "accept": "Length-S mask selects spike columns, 51 by $S_k$ plotted against 51 time offsets."
        },
        {
          "id": "L04-written-code-c4",
          "text": "Explains scatter.",
          "accept": "Same spikes selected in PC1/PC2 rows; one dot per spike, same colors as overlays."
        },
        {
          "id": "L04-written-code-c5",
          "text": "Compares honestly.",
          "accept": "Check natural gaps and within-group waveform similarity across two/three groups; a split in a continuum can be imposed. No recording or Exercise4 means no execution/cell-count certification."
        }
      ],
      "modelAnswer": [
        "KMeans sees the transpose so each row is one 51-bin waveform. It returns a length-S label array. The call requests K groups with ten starting configurations and a fixed seed. The same label mask selects spike columns in the waveform matrix and both rows of the 2 by S score matrix, keeping colors aligned across the overlay and scatter. Compare whether a new group separates distinct waveform shapes or merely subdivides a continuous cloud. Neither a clean scatter nor fixed seed proves cell identity. The missing recording prevents checking counts and separation; Exercise4 remains pending."
      ],
      "pitfalls": [
        "Confusing the initialization-count setting with K.",
        "Using a separately reordered label array without reordering observations."
      ]
    },
    {
      "id": "L04-written-method-choice",
      "title": "Choose a representation and limit the biological claim",
      "prompt": "Hypothetical practice: you have repeated responses of many retinal cells to the same luminance stimulus, and want to group cells with similar temporal responses. Contrast this with Exercise2 spike sorting. Choose the observations/features, defend K-means versus a hierarchy for your purpose, describe plots with labelled axes, and explain what a grouping would and would not establish.",
      "kind": "written",
      "sources": [
        {
          "source": "clustering",
          "pages": "5–18,23–28"
        },
        {
          "source": "exercise2",
          "cell": 2
        },
        {
          "source": "exercise2",
          "cell": 14
        },
        {
          "source": "exercise2",
          "cell": 22
        },
        {
          "source": "exercise2",
          "cell": 25
        }
      ],
      "rubric": [
        {
          "id": "L04-written-method-choice-c1",
          "text": "Separates observation units.",
          "accept": "Cell for response-profile grouping; individual spike for waveform sorting."
        },
        {
          "id": "L04-written-method-choice-c2",
          "text": "Defines response representation.",
          "accept": "One row per cell, matched time/condition features; summarize repeats consistently rather than treating repeats as different cells."
        },
        {
          "id": "L04-written-method-choice-c3",
          "text": "Defends method choice.",
          "accept": "K-means for a chosen flat partition or hierarchy for nested comparisons; state K/initialization or linkage/cut choices."
        },
        {
          "id": "L04-written-method-choice-c4",
          "text": "Specifies plots.",
          "accept": "Response against stimulus time with cell/group identity, or dendrogram height as dissimilarity; compare original profiles and summary groups."
        },
        {
          "id": "L04-written-method-choice-c5",
          "text": "Limits the claim.",
          "accept": "Response similarity under this stimulus is not proof of anatomy, cell identity or a unique natural grouping; both methods can impose groups."
        }
      ],
      "modelAnswer": [
        "For functional grouping, observations are cells described by responses at matched stimulus times or conditions. Use repeats consistently to summarize each cell and inspect response variability. In Exercise2, observations are instead single detected spikes with 51 voltage-bin features. Choose K-means for a justified flat partition or a hierarchy to examine nested response similarities. Plot response against stimulus time for candidate groups and, for a hierarchy, sample leaves against merge dissimilarity. Grouping describes similarity for the chosen representation and stimulus. It does not by itself establish anatomical types, a unique cluster count or independently validated cell identities."
      ],
      "pitfalls": [
        "Treating repeated trials as new cells.",
        "Transferring a cell-type count from the example directly to a new recording."
      ]
    }
  ],
  "lectureQuiz": []
};
