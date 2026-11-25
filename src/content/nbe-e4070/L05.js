import { scaleLinear, line } from 'd3';
import { preparation, scaling, penalty, evaluation, temporalCV } from './exercise4Cards.js';
// Original schematic points and supplied line, no measured source observations.
const x = scaleLinear().domain([0, 3]).range([65, 415]);
const y = scaleLinear().domain([0, 8]).range([250, 35]);
const points = [[0,1],[1,4],[2,6],[3,6]];
const residual = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" style="width:100%;height:auto" aria-hidden="true"><g font-family="system-ui,sans-serif" font-size="15" fill="currentColor">
<path d="M65 35V250H430" fill="none" stroke="currentColor"/>
<text x="240" y="305" text-anchor="middle">Input (arbitrary units)</text>
<text transform="translate(20,145) rotate(-90)" text-anchor="middle">Output (arbitrary units)</text>
${x.ticks(3).map(v=>`<text x="${x(v)}" y="275" text-anchor="middle">${v}</text>`).join('')}
${y.ticks(4).map(v=>`<text x="55" y="${y(v)+5}" text-anchor="end">${v}</text>`).join('')}
<path d="${line().x(d=>x(d[0])).y(d=>y(d[1]))([[0,1],[3,7]])}" stroke="var(--c-accent)" stroke-width="2" fill="none"/>
${points.map(([a,b])=>`<path d="M${x(a)} ${y(2*a+1)}V${y(b)}" stroke="currentColor" stroke-dasharray="4 3"/><circle cx="${x(a)}" cy="${y(b)}" r="4"/>`).join('')}
<text x="${x(2)+10}" y="${y(5.5)+4}">Residual = 1</text><text x="${x(.15)}" y="${y(1)-12}">Intercept = 1</text>
</g></svg>`;
const sx=scaleLinear().domain([-4,4]).range([65,415]);
const sy=scaleLinear().domain([0,1]).range([250,35]);
const sigmoid=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 320" style="width:100%;height:auto" aria-hidden="true"><g font-family="system-ui,sans-serif" font-size="15" fill="currentColor"><path d="M65 35V250H430" stroke="currentColor" fill="none"/>
<text x="240" y="305" text-anchor="middle">Linear score (log-odds)</text><text transform="translate(20,145) rotate(-90)" text-anchor="middle">Probability of outcome 1</text>
${sx.ticks(4).map(v=>`<text x="${sx(v)}" y="275" text-anchor="middle">${v}</text>`).join('')}
${sy.ticks(2).map(v=>`<text x="55" y="${sy(v)+5}" text-anchor="end">${v}</text>`).join('')}
<path d="M65 ${sy(.5)}H${sx(0)}V250" stroke="currentColor" stroke-dasharray="4 3" fill="none"/>
<path d="${line().x(v=>sx(v)).y(v=>sy(1/(1+Math.exp(-v))))(Array.from({length:81},(_,i)=>-4+i/10))}" fill="none" stroke="var(--c-accent)" stroke-width="2"/><circle cx="${sx(0)}" cy="${sy(.5)}" r="4"/><text x="${sx(0)+10}" y="${sy(.5)-12}">Zero score, p = 0.5</text></g></svg>`;

export default {
  compactPractice: true,
  "meta": {
    "id": "L05",
    "number": 5,
    "title": "Linear and logistic regression"
  },
  "learningMode": "topic-study",
  "intro": [
    "Read concise theory, then easy MCQs in each unit; labelled sample-code reading follows the relevant checks. Four oral-style free-text prompts finish the lecture.",
    "Exercise 4 follows a reach-direction decoder from raw firing rates to held-out accuracy. The examples use illustrative data. Rehearse the code in the L08 reach-direction case."
  ],
  "sections": [
    {
      "id": "linear-fit",
      "title": "1. Predict a continuous output",
      "sources": [
        {
          "source": "regression",
          "pages": "6–9"
        }
      ],
      "priority": "Red: prediction and squared-error fitting. Orange: solution example. Blue: state-level cancer example.",
      "blocks": [
        {
          "type": "definition",
          "term": "Linear regression",
          "body": "Predict a continuous outcome from an input using a straight line. The slope controls change in the prediction per input unit; the intercept is the prediction at zero input. Observed points need not lie on the line."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "\\hat y_i=\\theta x_i+\\beta,\\qquad r_i=y_i-\\hat y_i",
              "label": "For sample $i$, $x_i$ is input, $y_i$ observed output, $\\hat y_i$ prediction, $\\theta$ slope, $\\beta$ intercept and $r_i$ residual. Residuals are vertical observed-minus-predicted differences."
            }
          ]
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "L_{\\theta,\\beta}=\\frac{1}{N}\\sum_{i=1}^{N}(y_i-\\hat y_i)^2",
              "label": "Fit slope and intercept to minimize mean squared error over $N$ training samples. Squaring prevents positive and negative residuals cancelling; larger errors contribute more."
            }
          ]
        },
        {
          "type": "example",
          "title": "Hypothetical line, not fitted source data",
          "body": "Let the slope be 2 and intercept 1 in arbitrary units. At input 2 the prediction is 5. An observed output of 6 gives residual 1 and squared residual 1. This explains the loss, not an analysis result."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": residual,
            "caption": "Original hypothetical example. Dashed vertical segments are residuals from observations to a specified line, not a fitted biomedical dataset.",
            "fallbackAlt": "Input horizontally, observed or predicted output vertically. The line has slope 2 and intercept 1. At input 2, observed output 6 lies one unit above prediction 5."
          }
        },
        {
          "type": "detail",
          "title": "What the solution slide assumes",
          "body": "Page 9 sets the intercept to zero, differentiates squared error and sets the derivative to zero. Its slope formula applies to that restricted model. With a free intercept, fit both parameters; do not use the zero-intercept ratio blindly. Page 7 correctly labels slope and intercept in the rendered slide."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-slope",
          "prompt": "What does the slope describe?",
          "options": [
            {
              "text": "The predicted output at zero input.",
              "feedback": "That is the intercept."
            },
            {
              "text": "The output change per input unit.",
              "feedback": "Correct. Slope describes the change along the fitted line."
            },
            {
              "text": "The average squared prediction error.",
              "feedback": "That is the MSE loss."
            },
            {
              "text": "The observed output for each sample.",
              "feedback": "Observations can differ from predictions."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "regression",
              "pages": "7"
            }
          ]
        },
        {
          "id": "L05-residual",
          "prompt": "What is a residual in this lecture?",
          "options": [
            {
              "text": "The input minus its sample mean.",
              "feedback": "Centering an input is different from a prediction error."
            },
            {
              "text": "The fitted slope minus intercept.",
              "feedback": "These parameters do not define a residual."
            },
            {
              "text": "The prediction minus input value.",
              "feedback": "Input and output can have different units."
            },
            {
              "text": "The observation minus prediction.",
              "feedback": "Correct. It is the vertical gap, with observed-minus-predicted sign."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "regression",
              "pages": "7–8"
            }
          ]
        },
        {
          "id": "L05-mse",
          "prompt": "Which criterion fits the taught linear model?",
          "options": [
            {
              "text": "Minimize the mean squared residual.",
              "feedback": "Correct. Squared residuals penalize errors in either direction."
            },
            {
              "text": "Minimize the signed mean residual.",
              "feedback": "Signed errors can cancel while predictions remain poor."
            },
            {
              "text": "Minimize the mean absolute residual.",
              "feedback": "Absolute error is a different possible objective; this lecture specifies squared error."
            },
            {
              "text": "Minimize the mean squared input.",
              "feedback": "The loss compares predictions with outputs, not input magnitudes."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "regression",
              "pages": "8"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L05-code-residual",
          "kind": "code",
          "title": "Trace prediction and loss",
          "prompt": "For this labelled sample, explain each vector and the residual sign. Give the shapes and compute the predictions and MSE. Would a small training MSE alone establish generalization?",
          "sources": [
            {
              "source": "regression",
              "pages": "7–8,20–21"
            }
          ],
          "rubric": [
            {
              "id": "L05-code-residual-c1",
              "text": "Identifies input axes.",
              "accept": "Three sample entries in each one-dimensional input/target vector."
            },
            {
              "id": "L05-code-residual-c2",
              "text": "Traces predictions.",
              "accept": "Predictions [1, 3, 5], residuals [0, 1, -1]."
            },
            {
              "id": "L05-code-residual-c3",
              "text": "Explains squared loss.",
              "accept": "Squared residuals [0, 1, 1], mean 2/3 in squared output units."
            },
            {
              "id": "L05-code-residual-c4",
              "text": "Limits the conclusion.",
              "accept": "Parameters are supplied, not fitted here; training loss alone does not show performance on unseen data."
            }
          ],
          "modelAnswer": [
            "The elementwise line calculation returns three predictions [1, 3, 5]. Subtraction returns residuals [0, 1, -1], whose squared mean is $2/3$. The supplied parameters were not optimized by this snippet. Validation on unseen samples is needed to assess overfitting."
          ],
          "pitfalls": [
            "Calling this snippet a completed student notebook.",
            "Averaging signed errors instead of squared errors."
          ],
          "code": "import numpy as np\nx = np.array([0., 1., 2.])\ny = np.array([1., 4., 4.])\npred = 2. * x + 1.\nresidual = y - pred\nmse = np.mean(residual ** 2)",
          "codeContext": "Sample practice only, original NumPy example with three hypothetical samples in arbitrary units. This is a teaching example."
        }
      ]
    },
    {
      "id": "multiple-inputs",
      "title": "2. Multiple inputs and matrix axes",
      "sources": [
        {
          "source": "regression",
          "pages": "10–11"
        }
      ],
      "priority": "Red: multiple linear regression. Orange: matrix representation.",
      "blocks": [
        {
          "type": "definition",
          "term": "Multiple linear regression",
          "body": "Each sample has several input features and one target. A weighted sum plus intercept predicts that target. The model is linear in the input features; adding features does not itself make the relation causal."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "\\hat y_i=\\theta^{\\mathsf T}x_i+\\beta,\\qquad\\hat y=\\theta^{\\mathsf T}X+\\beta",
              "label": "Slide convention: $X$ has $F$ feature rows and $N$ sample columns; $\theta$ has $F$ weights. The output contains $N$ predictions. The scalar intercept is added to every prediction."
            }
          ]
        },
        {
          "type": "example",
          "title": "Keep API orientation explicit",
          "body": "For a samples-by-features Python array, multiply the matrix by the weight vector on its right. For the slide’s features-by-samples array, multiply by the weight row on the left. Preserve sample order so every prediction matches its observed target."
        },
        {
          "type": "detail",
          "title": "Units and assumptions",
          "body": "The taught mean response is a linear combination of the chosen inputs. Each weight has output units divided by its feature units; intercept and residual share target units. A plane can miss a curved relation. A fitted coefficient describes the model with its other included features, not an isolated causal effect."
        }
      ],
      codeVisualCards: [{
        id: 'L05-reach-time-mean',
        title: 'Turn firing rates into trial features',
        snippet: {
          language: 'python',
          text: 'X = np.mean(firingRate, axis=1).T',
          provenance: 'Verbatim line',
          sources: [{ source: 'exercise4', cell: 8 }, { source: 'exercise4', cell: 4 }],
          context: 'Cell 4 imports NumPy as np and loads firingRate with axes neuron × time bin × trial.',
        },
        visual: {
          kind: 'mean-time',
          caption: 'Simulated firing rates',
          alt: 'Each input table shows one neuron. Change how many initial time bins are included in the input. For each trial, the output table shows the average across those bins for each neuron.',
          unit: 'arbitrary rate units',
          data: [
            [[2, 6, 10], [4, 2, 8], [6, 4, 12], [12, 8, 2]],
            [[12, 2, 4], [8, 6, 8], [10, 10, 6], [2, 12, 14]],
          ],
          controls: [{
            id: 'bins', label: 'Time bins in the input', initial: 2,
            options: [2, 3, 4].map((value) => ({ value, label: String(value) })),
          }],
        },
        mcq: {
          id: 'L05-reach-time-mean-mcq',
          difficulty: 'easy',
          prompt: 'What does one row of the output X represent?',
          options: [
            { text: 'One time bin, with a feature per trial.', feedback: 'The mean collapses the time-bin axis.' },
            { text: 'One trial, with a feature per neuron.', feedback: 'The mean preserves trials and neurons. The transpose makes trials the rows.' },
            { text: 'One neuron, with a feature per trial.', feedback: 'This is the layout after averaging and before the transpose.' },
          ],
          correct: 1,
        },
        blank: {
          id: 'L05-reach-time-mean-blank',
          prompt: 'Fill in the NumPy axis that averages time bins. The input axes are neuron, time bin, trial, in that order.',
          template: 'X = np.mean(firingRate, axis={axis}).T',
          fields: [{
            id: 'axis', label: 'Time-bin axis', accepted: ['1', '-2'],
            explanation: 'Axis 1 counts from zero. Axis -2 also selects the second-to-last axis of a three-dimensional array.',
            commonErrors: 'Axis 0 averages neurons. Axis 2 averages trials.',
          }],
          expectedOutput: 'X has one row per trial and one column per neuron. This example produces a 3 × 2 feature matrix.',
        },
      }, ...preparation, scaling],
      "conceptQuiz": [
        {
          "id": "L05-multiple",
          "prompt": "What makes regression multiple rather than simple?",
          "options": [
            {
              "text": "Several outputs for a single input.",
              "feedback": "Multiple here refers to inputs, not targets."
            },
            {
              "text": "Several fits to the same one input.",
              "feedback": "Repeated fitting does not add input variables."
            },
            {
              "text": "Several input features for a target.",
              "feedback": "Correct. Each sample is described by a feature vector."
            },
            {
              "text": "Several residuals for a single fit.",
              "feedback": "Simple regression also has multiple residuals."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "regression",
              "pages": "10"
            }
          ]
        },
        {
          "id": "L05-axes",
          "prompt": "In page 11, what do columns of the input matrix represent?",
          "options": [
            {
              "text": "Separate observed samples.",
              "feedback": "Correct. Features run down rows, samples across columns."
            },
            {
              "text": "Separate fitted weights.",
              "feedback": "Weights belong to the learned projection vector."
            },
            {
              "text": "Separate input features.",
              "feedback": "Features are rows in this slide."
            },
            {
              "text": "Separate squared errors.",
              "feedback": "Errors compare targets with predictions after the matrix calculation."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "regression",
              "pages": "11"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L05-code-shapes",
          "kind": "code",
          "title": "Explain the matrix product",
          "prompt": "Explain the input axes, weight alignment and output shape. Compute both predictions. Would transposing only the input preserve the intended operation?",
          "sources": [
            {
              "source": "regression",
              "pages": "10–11"
            }
          ],
          "rubric": [
            {
              "id": "L05-code-shapes-c1",
              "text": "Defines input axes.",
              "accept": "Two sample rows, three feature columns."
            },
            {
              "id": "L05-code-shapes-c2",
              "text": "Aligns the coefficients.",
              "accept": "Three weights, in the same order as feature columns."
            },
            {
              "id": "L05-code-shapes-c3",
              "text": "Traces output.",
              "accept": "Matrix-vector product gives two predictions [3, 6] after adding intercept 1."
            },
            {
              "id": "L05-code-shapes-c4",
              "text": "Explains orientation.",
              "accept": "Input alone transposed is 3 by 2 and cannot multiply a length-three vector; slide orientation instead uses a weight row on the left."
            }
          ],
          "modelAnswer": [
            "The 2 by 3 matrix has one row per sample. Its three columns align with the three weights. The two dot products are 2 and 5, then the intercept gives [3, 6]. Transposing only the matrix breaks this multiplication. Page 11 uses the other orientation consistently."
          ],
          "pitfalls": [
            "Calling features the observations.",
            "Treating the intercept as another sample."
          ],
          "code": "import numpy as np\nX = np.array([[1., 2., 0.],\n              [3., 2., 2.]])\ntheta = np.array([1., 0.5, 0.5])\nbeta = 1.\npred = X @ theta + beta",
          "codeContext": "Sample practice only. Two hypothetical sample rows and three feature columns in arbitrary units, transposed relative to page 11. Supplied weights illustrate prediction, not a fitted notebook result."
        }
      ]
    },
    {
      "id": "logistic",
      "title": "3. Predict binary outcomes with probabilities",
      "sources": [
        {
          "source": "regression",
          "pages": "12–17"
        }
      ],
      "priority": "Red: log-odds model and likelihood. Blue: logit, pass/fail and heart-disease examples.",
      "blocks": [
        {
          "type": "definition",
          "term": "Binary logistic regression",
          "body": "For outcomes encoded zero or one, model the probability of outcome one. A linear score becomes log-odds rather than a continuous outcome. The sigmoid maps that score to a probability between zero and one."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "\\log\\!\\left(\\frac{p_i}{1-p_i}\\right)=\\theta^{\\mathsf T}x_i+\\beta=z_i,\\qquad p_i=\\frac{1}{1+e^{-z_i}}",
              "label": "Here $p_i=P(y_i=1\\mid x_i)$. Odds are probability divided by one minus probability. A zero score means probability one half. A positive score means probability above one half; it does not mean certainty."
            }
          ]
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "L=-\\sum_{i=1}^{N}\\left[y_i\\log p_i+(1-y_i)\\log(1-p_i)\\right]",
              "label": "Minimize binary negative log-likelihood. For a positive outcome the contribution is $-\\log p_i$; for a negative outcome it is $-\\log(1-p_i)$. Confidently predicting the wrong outcome is costly."
            }
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": sigmoid,
            "caption": "Original sigmoid schematic. The horizontal axis is the linear score, not probability. The vertical axis is probability of outcome one.",
            "fallbackAlt": "An increasing sigmoid over linear score from minus 4 to 4, crossing probability 0.5 at score zero and approaching zero and one toward the extremes."
          }
        },
        {
          "type": "example",
          "title": "Two teaching examples",
          "body": "Page 14 links study time to pass/fail and predicted passing probability. Pages 15–17 use several heart-disease risk features and a binary outcome. Scatterplots and coefficient tables illustrate a predictive model, not a causal experiment or validated clinical tool."
        },
        {
          "type": "detail",
          "title": "Fitting and interpretation",
          "body": "Unlike the linear squared-error example, logistic fitting optimizes likelihood numerically; the supplementary page 34 outlines iterative optimization. The coefficient is a change in log-odds per input unit with other inputs held fixed. Page 13 mentions categorical outcomes, but supplies the binary equation only; a multiclass solver is outside this module."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-logit",
          "prompt": "What is linear in the taught logistic model?",
          "options": [
            {
              "text": "The binary observation itself.",
              "feedback": "The observation remains zero or one, not a continuous line."
            },
            {
              "text": "The raw event probability.",
              "feedback": "The probability follows a sigmoid of the linear score."
            },
            {
              "text": "The squared probability error.",
              "feedback": "The taught objective is negative log-likelihood."
            },
            {
              "text": "The event probability log-odds.",
              "feedback": "Correct. Log-odds is the weighted sum plus intercept."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "regression",
              "pages": "13"
            }
          ]
        },
        {
          "id": "L05-likelihood",
          "prompt": "Which objective is taught for binary logistic fitting?",
          "options": [
            {
              "text": "Mean absolute input magnitude.",
              "feedback": "Input magnitude alone does not measure outcome prediction."
            },
            {
              "text": "Negative observed-data log-likelihood.",
              "feedback": "Correct. Minimize the negative log-likelihood of the observed outcomes."
            },
            {
              "text": "Mean squared input correlation.",
              "feedback": "Input correlation is not the taught fitting loss."
            },
            {
              "text": "Positive observed-data log-likelihood.",
              "feedback": "Positive log-likelihood is maximized rather than minimized."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "regression",
              "pages": "13"
            }
          ]
        },
        {
          "id": "L05-sigmoid",
          "prompt": "What does a logistic score of zero predict?",
          "options": [
            {
              "text": "An event probability of one half.",
              "feedback": "Correct. The sigmoid of zero is one half."
            },
            {
              "text": "An event probability of zero.",
              "feedback": "Zero is the score, not the resulting probability."
            },
            {
              "text": "An event probability of one.",
              "feedback": "Certainty is not the output at the midpoint."
            },
            {
              "text": "An event probability equal to odds.",
              "feedback": "At the midpoint odds are one while probability is one half."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "regression",
              "pages": "12–14"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L05-code-logistic",
          "kind": "code",
          "title": "Separate score, probability and decision",
          "prompt": "Trace the three arrays and their shapes. Explain the threshold’s role and why the last line does not fit parameters. What quantity would the likelihood objective use?",
          "sources": [
            {
              "source": "regression",
              "pages": "12–14"
            }
          ],
          "rubric": [
            {
              "id": "L05-code-logistic-c1",
              "text": "Distinguishes score and probability.",
              "accept": "Scores [-2, 0, 2] become about [0.119, 0.5, 0.881]."
            },
            {
              "id": "L05-code-logistic-c2",
              "text": "Reads the decision rule.",
              "accept": "At threshold 0.5, labels are [False, True, True]; equality is included by >=."
            },
            {
              "id": "L05-code-logistic-c3",
              "text": "States axes and fitting status.",
              "accept": "Each array has three sample entries; scores are supplied, no fit occurs."
            },
            {
              "id": "L05-code-logistic-c4",
              "text": "Explains likelihood.",
              "accept": "Use the probabilities with observed zero/one targets, not thresholded labels; threshold is a separate decision choice."
            }
          ],
          "modelAnswer": [
            "The length-three score array is transformed elementwise to probabilities approximately [0.119, 0.500, 0.881]. Thresholding gives [False, True, True]. This is a specified decision rule, not parameter fitting or certainty about outcomes. Likelihood uses probabilities and observed outcomes before thresholding."
          ],
          "pitfalls": [
            "Calling the score a probability.",
            "Optimizing likelihood after replacing probabilities by class labels."
          ],
          "code": "import numpy as np\nscore = np.array([-2., 0., 2.])\nprob = 1. / (1. + np.exp(-score))\nlabel = prob >= 0.5",
          "codeContext": "Sample practice only. Three hypothetical supplied linear scores, one entry per sample. The threshold is an illustrative decision rule, not an official lecture-prescribed cutoff or executed notebook solution."
        }
      ]
    },
    {
      "id": "interpretation",
      "title": "4. Predictive association and causal claims",
      "sources": [
        {
          "source": "regression",
          "pages": "18–19"
        }
      ],
      "priority": "Blue: prediction/causation illustration on p18. Orange: three interpretation warnings on p19.",
      "blocks": [
        {
          "type": "definition",
          "term": "Prediction is not causation",
          "body": "A feature can predict an outcome because both depend on other factors. A positive fitted weight describes association in the model, not evidence that changing that feature will change the outcome."
        },
        {
          "type": "compare",
          "title": "Three tempting claims",
          "columns": [
            "Temptation",
            "Supported interpretation"
          ],
          "rows": [
            {
              "label": "Positive weight",
              "cells": [
                "The feature causes the outcome.",
                "The fitted prediction increases with this feature while other included inputs are held fixed."
              ]
            },
            {
              "label": "Small weight",
              "cells": [
                "The feature cannot be a cause.",
                "Other correlated inputs can reduce its fitted contribution."
              ]
            },
            {
              "label": "Statistical significance",
              "cells": [
                "The model predicts accurately.",
                "Significance and predictive strength are different questions."
              ]
            }
          ]
        },
        {
          "type": "example",
          "title": "Connection to Exercise1",
          "body": "Exercise1 cells 17–19 ask whether age or weight may confound smoker/non-smoker blood-pressure differences. Testing group differences does not isolate causality. Comparing the sizes of p-values cannot tell how much of a predictive relationship a confounder explains.",
          "sources": [
            {
              "source": "exercise1",
              "cell": 17
            },
            {
              "source": "exercise1",
              "cell": 19
            }
          ]
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-causation",
          "prompt": "What does a positive fitted coefficient establish by itself?",
          "options": [
            {
              "text": "A causal effect from changing that feature.",
              "feedback": "A predictive association alone does not identify a causal intervention."
            },
            {
              "text": "A model association given included inputs.",
              "feedback": "Correct. It describes the fitted relation conditional on the model inputs."
            },
            {
              "text": "A guarantee of useful out-of-sample accuracy.",
              "feedback": "Generalization needs evaluation on unseen samples."
            },
            {
              "text": "A guarantee that confounding was removed.",
              "feedback": "A fitted model does not guarantee all relevant factors were included."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "regression",
              "pages": "18–19"
            }
          ]
        },
        {
          "id": "L05-small-weight",
          "prompt": "What is the lecture’s warning about a small coefficient?",
          "options": [
            {
              "text": "It proves the input is causally irrelevant.",
              "feedback": "Other included correlated predictors can absorb its contribution."
            },
            {
              "text": "It proves the input is measured without error.",
              "feedback": "Coefficient size does not certify measurement quality."
            },
            {
              "text": "It can coexist with a causal relationship.",
              "feedback": "Correct. A small fitted contribution cannot exclude causality."
            },
            {
              "text": "It proves the input has strong prediction.",
              "feedback": "Small coefficient and predictive strength are not interchangeable."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "regression",
              "pages": "19"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "generalization",
      codeVisualCards: [evaluation, temporalCV],
      "title": "5. Training, validation and final testing",
      "sources": [
        {
          "source": "regression",
          "pages": "20–22"
        }
      ],
      "priority": "Orange: overfitting, held-out roles, k-fold and leave-one-out validation.",
      "blocks": [
        {
          "type": "definition",
          "term": "Overfitting",
          "body": "A model predicts training samples well but performs poorly on unseen data. Too few samples or too many features can make this more likely. Compare training and held-out performance; a gap is a warning, not an explanation of every source of prediction error."
        },
        {
          "type": "steps",
          "title": "Keep the three roles separate",
          "steps": [
            "Fit model parameters on training data.",
            "Use validation performance to choose hyperparameters or compare regularization methods.",
            "Evaluate the selected final model on the test set, without using it to tune choices."
          ]
        },
        {
          "type": "definition",
          "term": "Cross-validation",
          "body": "With limited data, divide the development samples into roughly equal folds. Fit on all but one fold, evaluate the held-out fold, then rotate. Combine held-out performance to guide choices. Leave-one-out uses one held-out sample per fit, requiring as many fits as samples."
        },
        {
          "type": "detail",
          "title": "Validation is not a tuning-free final test",
          "body": "Page 22 calls one held-out fold “testing” while describing validation. We retain the explicit page 21 roles. Reusing the final test to pick a penalty would turn it into validation. Fit any learned preprocessing on training data within each split too; held-out information must not guide the fitted representation."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-validation",
          "prompt": "Which data role chooses a regularization strength?",
          "options": [
            {
              "text": "Training data used to fit weights.",
              "feedback": "Training fits weights; its loss alone favors overfitting."
            },
            {
              "text": "Final test data used after selection.",
              "feedback": "Tuning on the test removes its final independent role."
            },
            {
              "text": "Validation data used during tuning.",
              "feedback": "Correct. Compare hyperparameters on held-out validation performance."
            },
            {
              "text": "Deployment data used after release.",
              "feedback": "The lecture’s tuning role is validation, not deployment."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "regression",
              "pages": "21,25"
            }
          ]
        },
        {
          "id": "L05-loo",
          "prompt": "What does leave-one-out validation do?",
          "options": [
            {
              "text": "Fit once using all available samples.",
              "feedback": "Each sample must be held out in turn."
            },
            {
              "text": "Fit once using no available samples.",
              "feedback": "Each fit uses all samples except the held-out one."
            },
            {
              "text": "Fit repeatedly holding one feature out.",
              "feedback": "Features are not folds in this taught strategy."
            },
            {
              "text": "Fit repeatedly holding one sample out.",
              "feedback": "Correct. Each sample receives a prediction from a fit that excluded it."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "regression",
              "pages": "22"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "regularization",
      codeVisualCards: [penalty],
      "title": "6. Ridge, LASSO and principal-component regression",
      "sources": [
        {
          "source": "regression",
          "pages": "23–30"
        }
      ],
      "priority": "Red: penalty definitions and workflow. Orange: tuning, geometry, preferences and PCA regression.",
      "blocks": [
        {
          "type": "definition",
          "term": "Regularization",
          "body": "Add constraints or a penalty reflecting a preference for simpler weights. Balance fitting error against that preference using a trade-off parameter. A larger penalty can worsen training fit yet improve held-out prediction; this must be checked, not assumed."
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "L_{\\mathrm{ridge}}=\\mathrm{MSE}+\\lambda\\sum_{j=1}^{F}\\theta_j^2",
              "label": "Ridge adds the squared-weight penalty ($L_2$). The displayed slide objective does not penalize the intercept. $\\lambda$ balances loss and penalty; select it by validation."
            }
          ]
        },
        {
          "type": "math",
          "items": [
            {
              "tex": "L_{\\mathrm{LASSO}}=\\mathrm{MSE}+\\lambda\\sum_{j=1}^{F}|\\theta_j|",
              "label": "LASSO adds the absolute-weight penalty ($L_1$). Its geometry favors some exactly zero weights, useful when some features can be ignored. Ridge tends to shrink weights without selecting a sparse subset."
            }
          ]
        },
        {
          "type": "example",
          "title": "Read the penalty geometry",
          "body": "In a two-weight plot, equal absolute-weight sums form diamonds; equal squared-weight sums form circles. The diamond’s corners lie on zero-weight axes, explaining LASSO’s preference for sparse solutions. Ridge shrinks smoothly. This is a preference, not a promise of recovering true causes."
        },
        {
          "type": "steps",
          "title": "Principal-component regression",
          "steps": [
            "Fit PCA to training features after training-mean centering.",
            "Keep scores for the leading variance directions. Choose the retained count using validation.",
            "Fit regression on those scores. Apply the same training centering and directions to held-out samples."
          ]
        },
        {
          "type": "definition",
          "term": "Choose a preference and check it",
          "body": "Page 28 favors LASSO when some original features are unhelpful. Ridge and principal-component regression are options when low-variance directions are believed noisy or uninformative. Low variance alone does not prove irrelevance to the target. Compare choices on validation data."
        },
        {
          "type": "detail",
          "title": "Workflow and optional depth",
          "body": "Split data, fit parameters, compare held-out error and try regularization if overfitting appears (p30). Keep final testing separate. Page 33 derives an ordinary least-squares normal equation under a full-rank condition; page 34 outlines numerical logistic fitting. These supplements are optional reference, not mandatory matrix-inverse or optimizer drills. L06 continues with PCA/SVD/Fourier."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L05-ridge",
          "prompt": "What does the taught ridge penalty add to MSE?",
          "options": [
            {
              "text": "A weighted sum of squared coefficients.",
              "feedback": "Correct. Ridge uses squared weights."
            },
            {
              "text": "A weighted sum of absolute coefficients.",
              "feedback": "Absolute weights define LASSO instead."
            },
            {
              "text": "A weighted sum of observed outcomes.",
              "feedback": "Outcome sums do not regularize model weights."
            },
            {
              "text": "A weighted sum of signed residuals.",
              "feedback": "Signed residuals can cancel and are not the penalty."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "regression",
              "pages": "24–26"
            }
          ]
        },
        {
          "id": "L05-pcr",
          "prompt": "What is the order in principal-component regression?",
          "options": [
            {
              "text": "Cluster inputs, then regress on labels.",
              "feedback": "Cluster labels are not principal-component scores."
            },
            {
              "text": "Fit PCA, then regress on retained scores.",
              "feedback": "Correct. Leading PC scores become regression inputs."
            },
            {
              "text": "Fit PCA, then treat weights as outcomes.",
              "feedback": "PC weights are directions; scores describe observations."
            },
            {
              "text": "Select features, then fit raw inputs.",
              "feedback": "PCR fits retained scores, which combine features, rather than selecting raw features."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "regression",
              "pages": "29"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L05-code-penalty",
          "kind": "code",
          "title": "Read a penalty without mistaking it for fitting",
          "prompt": "Compute both penalty terms and total objectives for the given weights. Explain whether comparing these two numbers selects a method or finds fitted parameters. What must be varied and validated?",
          "sources": [
            {
              "source": "regression",
              "pages": "24–28"
            }
          ],
          "rubric": [
            {
              "id": "L05-code-penalty-c1",
              "text": "Computes ridge term.",
              "accept": "Squared weights sum to 5; scaled penalty is 2.5."
            },
            {
              "id": "L05-code-penalty-c2",
              "text": "Computes LASSO term.",
              "accept": "Absolute weights sum to 3; scaled penalty is 1.5."
            },
            {
              "id": "L05-code-penalty-c3",
              "text": "Computes objectives.",
              "accept": "With MSE 1, ridge objective 3.5, LASSO objective 2.5; intercept is excluded."
            },
            {
              "id": "L05-code-penalty-c4",
              "text": "Limits comparison.",
              "accept": "No minimization occurs. Fit weights separately for candidate penalties/strengths and compare validation predictions, not unlike objective values at one fixed vector."
            }
          ],
          "modelAnswer": [
            "The squared sum is 5 and the absolute sum is 3. Multiplication by 0.5 gives penalties 2.5 and 1.5, hence totals 3.5 and 2.5. Neither is optimized here. A smaller total across different objective definitions at fixed weights does not establish a better method; fit each candidate on training data and compare validation performance."
          ],
          "pitfalls": [
            "Choosing LASSO solely because this total is smaller.",
            "Calling the strength a fitted slope or penalizing an unstated intercept."
          ],
          "code": "import numpy as np\ntheta = np.array([2., -1., 0.])\nstrength = 0.5\nmse = 1.\nridge_loss = mse + strength * np.sum(theta ** 2)\nlasso_loss = mse + strength * np.sum(np.abs(theta))",
          "codeContext": "Sample practice only. Three hypothetical dimensionless weights, MSE 1 and penalty strength 0.5; these are stipulated arithmetic inputs, not measured data or an executed regression notebook."
        }
      ]
    }
  ],
  "finalWritten": [
    {
      "id": "L05-written-linear",
      "kind": "written",
      "title": "Explain and sketch linear prediction",
      "prompt": "Give a five-minute explanation to a newcomer: define simple and multiple linear regression; choose a hypothetical continuous biomedical target and specify input/output axes; sketch observed output against input with a line, intercept and a residual (or describe it); explain fitting, useful prediction and limitations. Equations are optional. This adapts the L07 p2 format as practice, not an official regression question.",
      "sources": [
        {
          "source": "regression",
          "pages": "6–11,18–22"
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ],
      "rubric": [
        {
          "id": "L05-written-linear-c1",
          "text": "Defines the predictive relation.",
          "accept": "Continuous output from a weighted sum plus intercept; multiple means several inputs."
        },
        {
          "id": "L05-written-linear-c2",
          "text": "Specifies example axes.",
          "accept": "For example, sample rows with measured features and one continuous target/prediction per sample; no invented measurements needed."
        },
        {
          "id": "L05-written-linear-c3",
          "text": "Labels the sketch.",
          "accept": "Input horizontal, output vertical, observed points, intercept, prediction line and vertical observed-minus-predicted residual."
        },
        {
          "id": "L05-written-linear-c4",
          "text": "Explains fitting and evaluation.",
          "accept": "Minimize training MSE; validate choices and test the final model on unseen samples."
        },
        {
          "id": "L05-written-linear-c5",
          "text": "States a limitation.",
          "accept": "Linear relation can miss curvature; overfitting and confounding limit claims; prediction is not causation."
        }
      ],
      "modelAnswer": [
        "Linear regression predicts a continuous outcome as a weighted sum of inputs plus an intercept. In a hypothetical cohort, sample rows could contain age and weight, with one continuous blood-pressure target and one prediction per row. A simple one-input sketch labels input horizontally and output vertically, marks the line’s intercept, and draws a residual vertically from line to observation. Fit by minimizing mean squared training error, compare choices on validation data and evaluate the final selection separately. A line may miss structure and may overfit; a predictive association does not establish causality."
      ],
      "pitfalls": [
        "Using a horizontal distance for the taught residual.",
        "Describing the supplied sample weights as fitted personal code."
      ]
    },
    {
      "id": "L05-written-logistic",
      "kind": "written",
      "title": "Choose and explain a binary model",
      "prompt": "Hypothetical practice: predict whether a recorded outcome is zero or one from several measured features. Defend logistic versus linear regression, give matrix/vector axes, explain score, log-odds, probability, likelihood and a separate decision rule. Sketch probability versus score or describe it. Explain why a good prediction does not establish a causal risk factor.",
      "sources": [
        {
          "source": "regression",
          "pages": "12–22"
        }
      ],
      "rubric": [
        {
          "id": "L05-written-logistic-c1",
          "text": "Chooses binary logistic model.",
          "accept": "Binary response calls for probability modelling; linear continuous predictions are not bounded probabilities."
        },
        {
          "id": "L05-written-logistic-c2",
          "text": "Defines formats.",
          "accept": "Sample-feature input matrix, one binary target and one probability per sample."
        },
        {
          "id": "L05-written-logistic-c3",
          "text": "Separates representations.",
          "accept": "Linear score equals log-odds; sigmoid produces probabilities; threshold gives a decision."
        },
        {
          "id": "L05-written-logistic-c4",
          "text": "Explains objective and sketch.",
          "accept": "Negative binary log-likelihood uses outcomes and probabilities; curve crosses 0.5 at score zero, with axes labelled."
        },
        {
          "id": "L05-written-logistic-c5",
          "text": "Limits interpretation.",
          "accept": "Feature coefficient affects fitted log-odds conditional on other inputs; no causality or clinical validity follows."
        }
      ],
      "modelAnswer": [
        "Use logistic regression for a binary outcome. Input rows are samples and columns measured features; target and predicted probability vectors each have one entry per sample. The weighted sum plus intercept is the log-odds; applying the sigmoid gives probability. Sketch score horizontally and probability vertically, crossing one half at zero. Fit using negative log-likelihood, which penalizes confidently wrong probabilities. A threshold converts probabilities to decisions separately. Predictive weights do not establish that intervening on a feature changes the outcome, and held-out evaluation is still required."
      ],
      "pitfalls": [
        "Calling the raw score a probability.",
        "Treating a thresholded label as the quantity used by the likelihood."
      ]
    },
    {
      "id": "L05-written-validation",
      "kind": "written",
      "title": "Defend a model-selection plan",
      "prompt": "Hypothetical practice: a many-feature dataset yields excellent training predictions and poor held-out predictions. Explain the warning, assign training/validation/test roles, propose k-fold or leave-one-out when data are scarce, and compare ridge, LASSO and principal-component regression. Include the risk of discarding a weak-variance predictive direction.",
      "sources": [
        {
          "source": "regression",
          "pages": "20–30"
        }
      ],
      "rubric": [
        {
          "id": "L05-written-validation-c1",
          "text": "Diagnoses the warning.",
          "accept": "Training-held-out gap suggests overfitting; limited samples and many features increase risk."
        },
        {
          "id": "L05-written-validation-c2",
          "text": "Separates split roles.",
          "accept": "Training fits parameters; validation chooses methods/strength/components; test is reserved for final evaluation."
        },
        {
          "id": "L05-written-validation-c3",
          "text": "Explains resampling.",
          "accept": "Rotate held-out folds; leave-one-out uses one sample each time; no tuning on final test."
        },
        {
          "id": "L05-written-validation-c4",
          "text": "Contrasts preferences.",
          "accept": "Ridge squared shrinkage, LASSO absolute penalty with sparse weights, PCR regression on retained PC scores."
        },
        {
          "id": "L05-written-validation-c5",
          "text": "Avoids representation leakage and overclaim.",
          "accept": "Learn centering/PCA on training folds only, apply to held-out samples; high input variance does not guarantee target relevance, validate component count."
        }
      ],
      "modelAnswer": [
        "The gap warns of overfitting, especially with many features and few samples. Fit weights on training data, select a method and its strength or retained PC count using held-out validation, and reserve the test for the chosen final model. K-fold rotates a held-out fraction; leave-one-out rotates single samples. Ridge shrinks squared coefficients, LASSO favors sparse coefficients, and PCR regresses on selected PC scores. Fit centering and PCA only in the training portion of each split. Compare held-out predictions: a small-variance direction may carry important target information, so truncating it can hurt."
      ],
      "pitfalls": [
        "Selecting strength by lowest training loss.",
        "Choosing component count only by input variance or fitting PCA on the full dataset before validation."
      ]
    },
    {
      "id": "L05-written-code",
      "kind": "written",
      "title": "Defend the sample code and bound the causal claim",
      "prompt": "Explain the sample prediction, logistic and penalty snippets above in your own words, including their array axes and what they do not fit. Then connect the lecture’s causal warnings to Exercise1’s confounding task: why can neither regression coefficients nor comparisons of group-test p-values settle whether smoking or weight caused a blood-pressure difference? For this prompt, use the sample regression snippets. The separate reach-decoder examples identify their Exercise 4 cells.",
      "sources": [
        {
          "source": "regression",
          "pages": "7–30"
        },
        {
          "source": "exercise1",
          "cell": 1
        },
        {
          "source": "exercise1",
          "cell": 17
        },
        {
          "source": "exercise1",
          "cell": 19
        }
      ],
      "rubric": [
        {
          "id": "L05-written-code-c1",
          "text": "Traces continuous prediction.",
          "accept": "Sample-feature matrix times feature weights yields sample predictions; intercept broadcasts, residuals compare matched targets."
        },
        {
          "id": "L05-written-code-c2",
          "text": "Traces binary prediction.",
          "accept": "Score becomes probability and then threshold decision; none of these lines estimates the parameters."
        },
        {
          "id": "L05-written-code-c3",
          "text": "Traces regularization.",
          "accept": "Squared or absolute coefficient sum changes the training objective; compare fitted candidates by validation, not different raw objective totals."
        },
        {
          "id": "L05-written-code-c4",
          "text": "Explains confounding.",
          "accept": "Other variables and correlated inputs can explain associations; positive/small coefficients do not prove/exclude causation; p-value magnitudes do not measure causal contribution."
        },
        {
          "id": "L05-written-code-c5",
          "text": "States evidence limits.",
          "accept": "Exercise 1 uses artificial data. The sample regression snippets illustrate array and model behavior. Exercise 4 uses a separate reach-task dataset."
        }
      ],
      "modelAnswer": [
        "The matrix product aligns feature columns with weights and returns one prediction per sample; the intercept is shared and the residual uses the matching observed target. The sigmoid maps supplied scores to probabilities; thresholding makes decisions but does not train the model. Penalty snippets evaluate stated weights without optimizing them. Training and validation are needed to compare methods. Exercise1 asks about possible age/weight confounding in artificial data; neither group p-value comparisons nor fitted weight sizes identify a causal effect. The dataset is unavailable locally, so the discussion concerns the methods and sample snippets."
      ],
      "pitfalls": [
        "Asserting causation because a coefficient is positive or a p-value is smaller.",
        "Claiming hypothetical snippets came from a supplied regression notebook."
      ]
    }
  ],
  "lectureQuiz": []
};
