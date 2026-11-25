// Source-grounded L01. IDs and authored answer indices preserve saved progress.
import { scaleLinear } from 'd3';

// Original toy diagram: no slide artwork, observations or notebook output.
const measurement = scaleLinear().domain([-4, 4]).range([75, 315]);
const spreadFigure = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 240" style="width:100%;max-width:450px;height:auto" aria-hidden="true">
  <g fill="currentColor" font-family="system-ui, sans-serif" font-size="14">
    <text x="5" y="65">Group A</text><text x="5" y="132">Group B</text>
    <text x="175" y="24" text-anchor="middle">Same mean, different spread</text>
    <text x="175" y="228" text-anchor="middle">Measurement (arbitrary units)</text>
  </g>
  <path d="M75 177H315" fill="none" stroke="currentColor" stroke-width="1.5"/>
  ${[-4, 0, 4].map(v => `<path d="M${measurement(v)} 177v5" stroke="currentColor"/><text x="${measurement(v)}" y="200" fill="currentColor" font-family="system-ui, sans-serif" font-size="14" text-anchor="middle">${v}</text>`).join('')}
  <path d="M${measurement(0)} 38V155" stroke="var(--c-text-muted)" stroke-dasharray="3 4"/>
  ${[[-2,-1,0,1,2],[-4,-2,0,2,4]].map((values,i) => values.map(v => `<circle cx="${measurement(v)}" cy="${60+i*67}" r="4" fill="${i ? 'var(--c-accent)' : 'var(--c-text-muted)'}"/>`).join('')).join('')}
</svg>`;

export default {
  "learningMode": "topic-study",
  "compactPractice": true,
  "meta": {
    "id": "L01",
    "number": 1,
    "title": "Statistics and uncertainty"
  },
  "intro": [
    "Read the short theory and use the interactive code cards in context. Open the optional code explanations and final written practice when you want to rehearse for the oral.",
    "Practice uses source-grounded explanations and selected notebook lines. It does not run the notebook or reproduce its saved numeric results."
  ],
  "sections": [
    {
      "id": "read-claims",
      "title": "1. Read a claim critically",
      "priority": "Blue examples, PDF pp. 11–16. Practise checking claims rather than memorizing the example study.",
      "sources": [
        {
          "source": "statistics",
          "pages": "11–16"
        },
        {
          "source": "statistics",
          "pages": "41–42"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "A claim is a starting point",
          "body": "A headline compresses a study. Read the abstract and results to identify the measured outcome, the comparison and the uncertainty. Agreement between the headline and the abstract does not establish that the study is sound."
        },
        {
          "type": "steps",
          "title": "Check the evidence",
          "steps": [
            "Identify what was measured, in whom, and against which comparison.",
            "Read the result table and identify what the error bars describe.",
            "Distinguish what the measurements show from the explanation claimed for them."
          ]
        },
        {
          "type": "detail",
          "title": "What happened to the opening example?",
          "body": "Page 41 shows a retraction notice for the cold-exposure study. Page 42 separates an invalid study from a disproved claim: this study cannot support the headline, but its failure alone does not establish the opposite health claim."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-claim-abstract",
          "prompt": "What does agreement between a headline and an abstract establish?",
          "options": [
            {
              "text": "The design establishes a causal effect.",
              "feedback": "Causality requires evidence from the study design, not matching wording."
            },
            {
              "text": "The headline reflects the stated claim.",
              "feedback": "Correct. It establishes consistency of reporting, not validity of the design."
            },
            {
              "text": "The sample represents the population.",
              "feedback": "Representativeness depends on sampling."
            },
            {
              "text": "The result excludes other explanations.",
              "feedback": "Other explanations require examination of design and data."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "statistics",
              "pages": "11–16"
            }
          ]
        },
        {
          "id": "L01-claim-table",
          "prompt": "Which part of a paper most directly reports the measured comparisons?",
          "options": [
            {
              "text": "The introduction motivating the hypothesis.",
              "feedback": "The introduction explains why the comparison matters; it does not report what was measured."
            },
            {
              "text": "The discussion proposing an explanation.",
              "feedback": "The discussion interprets results; inspect the measurements before accepting its explanation."
            },
            {
              "text": "The methods describing the planned analysis.",
              "feedback": "Methods explain how measurements were collected and compared; results report the observed comparisons."
            },
            {
              "text": "The results table reporting the comparisons.",
              "feedback": "Correct. Read the measured outcomes, comparison groups and uncertainty together."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "statistics",
              "pages": "11–16"
            }
          ]
        }
      ]
    },
    {
      "id": "mean-and-spread",
      "title": "2. Mean, variance and standard deviation",
      "priority": "Red: definitions pp. 17, 19. Orange: comparing spread p. 18.",
      "sources": [
        {
          "source": "statistics",
          "pages": "17–19"
        },
        {
          "source": "exercise1",
          "cell": 4
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Mean",
          "body": "For one measured feature, the mean is the sum of measurements divided by their number. Input: a vector of observations. Output: one scalar with the original measurement unit."
        },
        {
          "type": "definition",
          "term": "Variance and standard deviation",
          "body": "Variance averages squared deviations from the mean. Standard deviation (SD) is its square root and describes the spread of individual measurements. Two groups can have the same mean and different SDs."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": spreadFigure,
            "caption": "Original hypothetical observations, not Exercise1 data. Both groups have mean zero; group B has twice the SD of group A. Horizontal position is the measurement; vertical position identifies the group.",
            "fallbackAlt": "Two rows of five hypothetical observations on a shared measurement axis from minus four to four arbitrary units. Group A: minus two, minus one, zero, one, two. Group B: minus four, minus two, zero, two, four. Both center on zero; B has twice the spread."
          }
        },
        {
          "type": "math",
          "title": "Describing a finite dataset",
          "items": [
            {
              "tex": "\\bar{x}=\\frac{1}{N}\\sum_{i=1}^{N}x_i",
              "label": "Mean of one feature."
            },
            {
              "tex": "\\sigma_N^2=\\frac{1}{N}\\sum_{i=1}^{N}(x_i-\\bar{x})^2",
              "label": "Pages 17 and 19 use divisor $N$."
            },
            {
              "tex": "\\sigma_N=\\sqrt{\\sigma_N^2}",
              "label": "SD returns to the original measurement unit."
            }
          ]
        },
        {
          "type": "detail",
          "title": "Descriptive SD versus estimated population SD",
          "body": "For an estimate of population variance, page 26 uses divisor $N-1$. Exercise1 cell 4 uses np.std with its default divisor $N$. Name the convention before using an SD in an uncertainty estimate."
        },
        {
          "type": "definition",
          "term": "Reading the notebook matrix",
          "body": "Exercise1 describes X as subjects × four features, in order: age, weight, systolic pressure, diastolic pressure. y labels subjects: zero for non-smokers, one for smokers. Boolean row selection keeps all four feature columns. No observations or saved outputs are included here."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-mean-summary",
          "prompt": "What does the mean summarize for a single measured feature?",
          "options": [
            {
              "text": "The squared spread of the observations.",
              "feedback": "That describes variance."
            },
            {
              "text": "The typical location of the observations.",
              "feedback": "Correct. It locates the center by averaging measurements."
            },
            {
              "text": "The sampling spread of estimated means.",
              "feedback": "That is related to SEM, not the mean itself."
            },
            {
              "text": "The tail probability under a null model.",
              "feedback": "That describes a p-value, not a mean."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "statistics",
              "pages": "17–19"
            }
          ]
        },
        {
          "id": "L01-sd-summary",
          "prompt": "What does standard deviation describe?",
          "options": [
            {
              "text": "The spread of possible sample means.",
              "feedback": "The sampling variability of means is described by SEM."
            },
            {
              "text": "The probability of the null hypothesis.",
              "feedback": "A p-value is not the probability of the null either."
            },
            {
              "text": "The uncertainty in a chosen test type.",
              "feedback": "SD is a property of the measurements, not a choice of test."
            },
            {
              "text": "The spread of individual measurements.",
              "feedback": "Correct. SD describes individual spread around the mean."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "statistics",
              "pages": "17–23"
            }
          ]
        },
        {
          "id": "L01-variance-unit",
          "prompt": "Which statement about variance and SD is correct?",
          "options": [
            {
              "text": "Variance and SD both retain the original unit.",
              "feedback": "Squaring deviations changes the variance unit."
            },
            {
              "text": "Variance retains the unit; SD squares the unit.",
              "feedback": "The square root reverses this relationship."
            },
            {
              "text": "Variance squares the unit; SD retains the unit.",
              "feedback": "Correct. Variance is squared; the square root restores the measurement unit."
            },
            {
              "text": "Variance and SD both remove the original unit.",
              "feedback": "Neither standard operation makes the values dimensionless."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "statistics",
              "pages": "17–19"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L01-code-index",
          "title": "Explain row selection and the averaging axis",
          "prompt": "Explain every line and the shape of m0. Which entry refers to systolic pressure? State what would change if axis=1 were used.",
          "kind": "code",
          "rubric": [
            {
              "id": "L01-code-index-c1",
              "text": "Identifies the boolean mask as selecting non-smoker rows.",
              "accept": "Rows where y equals zero; all four columns remain."
            },
            {
              "id": "L01-code-index-c2",
              "text": "Explains that axis=0 averages across subjects separately per feature.",
              "accept": "Reduce the row dimension, retaining one mean per column."
            },
            {
              "id": "L01-code-index-c3",
              "text": "States that m0 has four entries and m0[2] is systolic pressure.",
              "accept": "A length-four vector, third feature uses zero-based index two."
            },
            {
              "id": "L01-code-index-c4",
              "text": "Explains that axis=1 instead averages features within each subject.",
              "accept": "One value per selected person, mixing quantities with different units."
            }
          ],
          "modelAnswer": [
            "X0 keeps subjects labelled zero and retains all four features. Averaging axis zero removes the subject dimension, leaving four feature means. m0[2] is the systolic mean. Axis one would mix age, weight and pressures within each subject, which is not a meaningful blood-pressure mean."
          ],
          "pitfalls": [
            "Confusing a boolean row mask with a feature selector.",
            "Claiming a computed pressure value without loading the missing data."
          ],
          "sources": [
            {
              "source": "exercise1",
              "cell": 1
            },
            {
              "source": "exercise1",
              "cell": 2
            },
            {
              "source": "exercise1",
              "cell": 4
            }
          ],
          "code": "X0 = X[y==0]\nm0 = np.mean(X0, axis=0)",
          "codeContext": "Exact lines from Exercise1 cell 4. NumPy is imported as np in cell 2. X and y are defined in cell 1; the data file is missing."
        }
      ]
    },
    {
      "id": "sem-and-interval",
      "codeVisualCards": [
        {
          "id": "L01-code-visual-uncertainty",
          "title": "What changes when the sample is larger?",
          "snippet": {
            "language": "python",
            "text": "mean = np.mean(x)\nsd = np.std(x, ddof=0)\nsem = sd / np.sqrt(x.size)",
            "provenance": "New teaching example",
            "sources": [
              {
                "source": "exercise1",
                "cell": 4
              },
              {
                "source": "exercise1",
                "cell": 9
              },
              {
                "source": "statistics",
                "pages": "19–23"
              }
            ],
            "context": "NumPy is imported as np. x is a vector of illustrative pressures. This uses the notebook’s divisor N. Repeating the vector here holds its empirical spread fixed."
          },
          "visual": {
            "kind": "uncertainty",
            "data": [
              112,
              118,
              126,
              132
            ],
            "controls": [
              {
                "id": "n",
                "label": "Sample size",
                "initial": 4,
                "options": [
                  {
                    "value": 4,
                    "label": "4"
                  },
                  {
                    "value": 16,
                    "label": "16"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · Individual readings and two error bars",
            "alt": "Dots on the left are individual observations. The center dots on the right are the same mean, with one SD and one SEM on either side."
          },
          "mcq": {
            "id": "L01-code-visual-uncertainty-check",
            "difficulty": "easy",
            "prompt": "At four times the sample size with the same spread, how do the bars change?",
            "correct": 1,
            "options": [
              {
                "text": "Both bars shrink by half.",
                "feedback": "The SD bar stays fixed because the set of values has the same spread."
              },
              {
                "text": "The SD stays fixed and the SEM halves.",
                "feedback": "Four times the sample size doubles its square root. The spread in the input stays fixed."
              },
              {
                "text": "The SD stays fixed and the SEM quarters.",
                "feedback": "The SEM divides by the square root of sample size."
              }
            ]
          },
          "blank": {
            "id": "L01-code-visual-uncertainty-blank",
            "prompt": "Complete the denominator so increasing the sample size from 4 to 16 halves the SEM.",
            "template": "sem = sd / np.{token}(x.size)",
            "fields": [
              {
                "id": "token",
                "label": "NumPy function",
                "accepted": [
                  "sqrt"
                ],
                "explanation": "The denominator is the square root of the sample count.",
                "commonErrors": "Using square would divide by the squared count."
              }
            ],
            "expectedOutput": "For 16 observations, the result is one-quarter of the SD."
          }
        }
      ],
      "title": "3. SEM and confidence intervals",
      "priority": "Red: SEM pp. 20, 23 and CI pp. 24, 26. Orange: t critical values p. 25.",
      "sources": [
        {
          "source": "statistics",
          "pages": "20–26"
        },
        {
          "source": "exercise1",
          "cell": 9
        },
        {
          "source": "exercise1",
          "cell": 6
        },
        {
          "source": "exercise1",
          "cell": 10
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Standard error of the mean",
          "body": "SEM describes how variable a sample mean would be across repeated independent samples from the population. It is an uncertainty estimate for the mean, rather than the spread of the individual observations."
        },
        {
          "type": "math",
          "title": "From sample spread to uncertainty",
          "items": [
            {
              "tex": "s^2=\\frac{\\sum_i(x_i-\\bar{x})^2}{N-1}",
              "label": "Here $s$ estimates the population SD."
            },
            {
              "tex": "\\mathrm{SEM}=\\frac{s}{\\sqrt{N}}",
              "label": "Independent observations are assumed."
            },
            {
              "tex": "\\mathrm{CI}_{95\\%}=\\bar{x}\\pm t_{N-1,0.975}\\,\\mathrm{SEM}",
              "label": "A two-sided interval for a mean under the t-model. The critical value depends on degrees of freedom and confidence level."
            }
          ]
        },
        {
          "type": "definition",
          "term": "What 95% means",
          "body": "Under the model assumptions, the interval procedure covers the fixed population mean in 95% of repeated samples. The observed interval is an estimate of plausible mean values. It does not contain 95% of individuals, nor assign 95% probability to the fixed mean after observing the data."
        },
        {
          "type": "compare",
          "title": "Label error bars explicitly",
          "columns": [
            "Describes",
            "Depends on"
          ],
          "rows": [
            {
              "label": "SD",
              "cells": [
                "Spread of individual observations",
                "Variation among measurements"
              ]
            },
            {
              "label": "SEM",
              "cells": [
                "Sampling uncertainty of a mean",
                "SD and number of independent observations"
              ]
            },
            {
              "label": "CI",
              "cells": [
                "Interval estimate of a population mean",
                "SEM and a critical value"
              ]
            }
          ]
        },
        {
          "type": "definition",
          "term": "Reading the Exercise1 plots",
          "body": "With SD bars, whiskers show individual spread. With CI bars, whiskers show uncertainty about each mean. Describe systolic and diastolic comparisons separately. CI overlap alone does not determine the p-value of the relevant group comparison; use the test suited to the study design."
        },
        {
          "type": "detail",
          "title": "Approximation used in the submitted notebook",
          "body": "Exercise1 cell 9 multiplies SEM by two. This follows the slide approximation, not an exact critical value for every sample size. Cell 4 uses the default np.std divisor; for a sample SD estimate the Bessel correction must be considered. An overlap judgment is not a substitute for the design-appropriate test."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-sem-definition",
          "prompt": "What is SEM intended to estimate?",
          "options": [
            {
              "text": "The spread of the measured individuals.",
              "feedback": "That is the role of SD."
            },
            {
              "text": "The probability that an effect is causal.",
              "feedback": "SEM alone cannot establish a causal explanation."
            },
            {
              "text": "The size of a difference between groups.",
              "feedback": "An effect magnitude is distinct from uncertainty in its estimate."
            },
            {
              "text": "The sampling variability of the mean.",
              "feedback": "Correct. Imagine repeatedly taking samples and computing their means."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "statistics",
              "pages": "20–23"
            }
          ]
        },
        {
          "id": "L01-ci-meaning",
          "prompt": "What does the 95% confidence level refer to?",
          "options": [
            {
              "text": "The fraction of individuals inside the interval.",
              "feedback": "A mean CI is not an interval describing most individual observations."
            },
            {
              "text": "The long-run coverage of the interval method.",
              "feedback": "Correct. Under assumptions, 95% of intervals from repeated samples cover the population mean."
            },
            {
              "text": "The chance that the causal claim is correct.",
              "feedback": "Confidence intervals do not validate causal claims."
            },
            {
              "text": "The chance that the null hypothesis is true.",
              "feedback": "The confidence level is not a posterior probability for the null."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "statistics",
              "pages": "24–26"
            }
          ]
        },
        {
          "id": "L01-ci-critical",
          "prompt": "Which quantity sets the t critical value for a mean interval?",
          "options": [
            {
              "text": "The sample mean and the sample deviation.",
              "feedback": "These locate and scale the interval, but do not set its t quantile."
            },
            {
              "text": "The standard error and measurement unit.",
              "feedback": "SEM scales the half-width; units do not determine the critical multiplier."
            },
            {
              "text": "The observed difference and the test p-value.",
              "feedback": "The interval multiplier is set by the desired coverage and degrees of freedom, not a favorable test result."
            },
            {
              "text": "The degrees of freedom and confidence level.",
              "feedback": "Correct. For this mean interval the degrees of freedom are $N-1$."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "statistics",
              "pages": "24–25"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L01-code-ci",
          "title": "Explain the notebook uncertainty calculation",
          "prompt": "Explain what each variable represents. Is ciSYS0 an interval or a half-width? Name the two approximation/convention issues visible in this snippet and its upstream SD. Explain the bar height and yerr argument. What labels must the completed plot provide?",
          "kind": "code",
          "rubric": [
            {
              "id": "L01-code-ci-c1",
              "text": "Explains division by square root of the selected number of subjects.",
              "accept": "len(X0) counts subjects, not features."
            },
            {
              "id": "L01-code-ci-c2",
              "text": "Identifies ciSYS0 as a half-width around m0[2].",
              "accept": "Endpoints are mean minus half-width and mean plus half-width."
            },
            {
              "id": "L01-code-ci-c3",
              "text": "Notes the approximate critical multiplier of two.",
              "accept": "An exact critical value depends on sample size and coverage."
            },
            {
              "id": "L01-code-ci-c4",
              "text": "Notes that upstream np.std uses divisor N by default.",
              "accept": "Cell 4 does not use ddof=1; distinguish descriptive and estimated SD."
            },
            {
              "id": "L01-code-ci-c5",
              "text": "Explains the mean bar and CI half-width, with labelled axes.",
              "accept": "m0[2] sets height; yerr supplies symmetric uncertainty whiskers. Label the cohort axis and blood-pressure measurement axis, and identify 95% CI bars."
            }
          ],
          "modelAnswer": [
            "sd0[2] is the descriptive systolic SD from cell 4. Dividing by the square root of the selected subject count gives the notebook SEM estimate. ciSYS0 is a half-width, not the two interval endpoints. Multiplication by two is approximate. For a t interval based on an estimated sample SD, account for the sample-variance divisor and the appropriate critical value.",
            "The bar height is the non-smoker systolic mean; yerr draws that height plus or minus ciSYS0. The completed plot needs group labels, a pressure axis with units, a title and an explicit CI error-bar definition."
          ],
          "pitfalls": [
            "Calling ciSYS0 the upper endpoint.",
            "Treating the factor two as exact at all sample sizes."
          ],
          "sources": [
            {
              "source": "exercise1",
              "cell": 4
            },
            {
              "source": "exercise1",
              "cell": 9
            },
            {
              "source": "statistics",
              "pages": "24–26"
            }
          ],
          "code": "seSYS0 = sd0[2] / np.sqrt(len(X0))\nciSYS0 = seSYS0 * 2\nax.bar(0, m0[2], yerr=ciSYS0, align='center', alpha=0.5, ecolor='black', capsize=10)",
          "codeContext": "Exact lines from Exercise1 cell 9, excerpted with plotting setup omitted. NumPy is np and Matplotlib pyplot is plt (cell 2); fig, ax = plt.subplots() precedes the plotting line. X0, m0 and sd0 come from cell 4. Submitted code is shown for critique, not executed results."
        }
      ]
    },
    {
      "id": "tests-and-p",
      "codeVisualCards": [
        {
          "id": "L01-code-visual-t",
          "title": "Read the sign and size of a t statistic",
          "snippet": {
            "language": "python",
            "text": "tSYS, pSYS = stats.ttest_ind(X0[:, 2], X1[:, 2])",
            "provenance": "Verbatim line",
            "sources": [
              {
                "source": "exercise1",
                "cell": 13
              },
              {
                "source": "exercise1",
                "cell": 4
              },
              {
                "source": "statistics",
                "pages": "27–32"
              }
            ],
            "context": "stats is scipy.stats. Rows are subjects and column 2 is systolic pressure. The default is a two-sided pooled-variance test. Here the two illustrative groups each have four values and the same spread."
          },
          "visual": {
            "kind": "two-sample-t",
            "data": [
              108,
              116,
              124,
              132
            ],
            "controls": [
              {
                "id": "shift",
                "label": "Group B shift (mm Hg)",
                "initial": 8,
                "options": [
                  {
                    "value": 0,
                    "label": "0"
                  },
                  {
                    "value": 8,
                    "label": "8"
                  },
                  {
                    "value": 16,
                    "label": "16"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · Two groups at a fixed within-group spread",
            "alt": "Each dot is one subject. Keep A fixed and shift every B measurement together."
          },
          "mcq": {
            "id": "L01-code-visual-t-check",
            "difficulty": "medium",
            "prompt": "When B moves farther above A, what happens to the two outputs?",
            "correct": 0,
            "options": [
              {
                "text": "t becomes more negative and p decreases.",
                "feedback": "The test subtracts B from A, so the signed difference falls and its magnitude rises."
              },
              {
                "text": "t becomes more positive and p decreases.",
                "feedback": "The order of the groups gives a negative t when B has the larger mean."
              },
              {
                "text": "t becomes more negative and p increases.",
                "feedback": "With fixed spread and sample size, a larger absolute t has a smaller null tail area."
              }
            ]
          }
        }
      ],
      "title": "4. t-tests, p-values and assumptions",
      "priority": "Red: null and p-value pp. 27–28. Orange: designs, tails and assumptions pp. 29–34.",
      "sources": [
        {
          "source": "statistics",
          "pages": "27–34"
        },
        {
          "source": "exercise1",
          "cell": 13
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Null hypothesis and p-value",
          "body": "For an independent comparison of two means, the null states that the population means are equal. A p-value is the probability, under that null model and its assumptions, of a test statistic at least as extreme as observed. The L08 recap (PDF p. 36) gives a misleading interpretation: a p-value of 0.05 is a 5% tail probability under the null model."
        },
        {
          "type": "math",
          "title": "What the test statistic measures",
          "items": [
            {
              "tex": "T=\\frac{\\bar{x}_0-\\bar{x}_1}{\\mathrm{SE}_{\\mathrm{difference}}}",
              "label": "A mean difference measured relative to its sampling uncertainty. The denominator is the standard error of the difference, not either group’s SD. Paired and independent designs use different uncertainty calculations."
            }
          ]
        },
        {
          "type": "definition",
          "term": "Making a significance decision",
          "body": "Choose the significance threshold before testing and compare the p-value with it. A smaller p-value leads to rejection of the null under the model. Failure to reject does not prove equal means. Report the estimated difference and uncertainty alongside this decision."
        },
        {
          "type": "compare",
          "title": "Choose from the design",
          "columns": [
            "Input and comparison",
            "Null question"
          ],
          "rows": [
            {
              "label": "One-sample",
              "cells": [
                "One vector and a reference value",
                "Does its population mean equal the reference?"
              ]
            },
            {
              "label": "Independent two-sample",
              "cells": [
                "Vectors from distinct participants",
                "Are the two population means equal?"
              ]
            },
            {
              "label": "Paired",
              "cells": [
                "Matched measurements of the same individuals",
                "Is the mean within-person difference zero?"
              ]
            }
          ]
        },
        {
          "type": "definition",
          "term": "One or two tails",
          "body": "Use a two-sided question when a difference in either direction matters. A one-sided alternative specifies a direction in advance. Do not choose a tail after seeing the sign of the result."
        },
        {
          "type": "definition",
          "term": "Inspect before testing",
          "body": "Histograms can reveal outliers, corrupted entries and implausible distributions. Consider independence, paired structure and distributional assumptions. There is no universal sample-count cutoff that makes every dataset suitable for a t-test."
        },
        {
          "type": "definition",
          "term": "Equal variances",
          "body": "The pooled Student independent test assumes equal population variances. The Welch alternative relaxes that assumption. Exercise1 cell 13 uses stats.ttest_ind without equal_var=False; it does not explicitly select Welch."
        },
        {
          "type": "definition",
          "term": "Reading test output",
          "body": "The notebook assigns a test statistic and a p-value to separate scalar variables for each pressure feature. A p-value does not report the magnitude of a pressure difference or establish a causal mechanism."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-p-condition",
          "prompt": "Which condition is part of the definition of a p-value?",
          "options": [
            {
              "text": "Assuming the null model and its assumptions.",
              "feedback": "Correct. The tail probability is calculated under that model."
            },
            {
              "text": "Assuming the observed causal claim is true.",
              "feedback": "A p-value conditions on a statistical null, not a causal claim."
            },
            {
              "text": "Assuming the population effect is important.",
              "feedback": "Practical importance is a separate question."
            },
            {
              "text": "Assuming the next sample matches this one.",
              "feedback": "The definition concerns outcomes under the null model, not identical future data."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "statistics",
              "pages": "27–28"
            }
          ]
        },
        {
          "id": "L01-test-paired",
          "prompt": "Which test explicitly uses within-person pairing?",
          "options": [
            {
              "text": "An independent test of the two conditions.",
              "feedback": "This treats conditions as unrelated groups and loses the within-person matching."
            },
            {
              "text": "A paired test of the matched conditions.",
              "feedback": "Correct. Analyze each participant’s difference between conditions."
            },
            {
              "text": "A one-sample test of pooled measurements.",
              "feedback": "Pooling measurements does not test the mean of within-person differences."
            },
            {
              "text": "A separate test of each condition mean.",
              "feedback": "Testing each mean against a reference does not directly test the within-person change."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "statistics",
              "pages": "29, 48"
            }
          ]
        },
        {
          "id": "L01-test-welch",
          "prompt": "What does the Welch independent t-test relax?",
          "options": [
            {
              "text": "The need to compare population means.",
              "feedback": "Welch still compares means."
            },
            {
              "text": "The need to inspect measurement quality.",
              "feedback": "Measurement inspection remains useful."
            },
            {
              "text": "The assumption of equal population variances.",
              "feedback": "Correct. It accommodates unequal population variances."
            },
            {
              "text": "The need for independent observations.",
              "feedback": "Welch does not repair dependence between subjects."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "statistics",
              "pages": "32–34"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L01-code-test",
          "title": "Defend the test call",
          "prompt": "Describe the two inputs and two outputs. Why is an independent test appropriate to this exercise design? What assumptions and parameter choices would you check before trusting its result?",
          "kind": "code",
          "rubric": [
            {
              "id": "L01-code-test-c1",
              "text": "Identifies the selected systolic feature in both groups.",
              "accept": "Column two is systolic, and the two vectors contain distinct people."
            },
            {
              "id": "L01-code-test-c2",
              "text": "Distinguishes the statistic from its p-value.",
              "accept": "tSYS is a test statistic; pSYS is the null-conditional tail probability."
            },
            {
              "id": "L01-code-test-c3",
              "text": "Justifies independent rather than paired testing.",
              "accept": "The same person is not measured in both smoking cohorts."
            },
            {
              "id": "L01-code-test-c4",
              "text": "Checks tails, equal-variance choice and data quality.",
              "accept": "Two-sided alternative; pooled default unless Welch is requested; inspect outliers and assumptions."
            }
          ],
          "modelAnswer": [
            "X0[:, 2] and X1[:, 2] select systolic pressure for the two distinct cohorts. stats.ttest_ind returns the statistic and p-value, assigned here to tSYS and pSYS. The exercise design calls for an independent comparison. The submitted call does not explicitly request unequal variances. Inspect data and justify the variance assumption and alternative before interpreting the p-value."
          ],
          "pitfalls": [
            "Describing tSYS as the difference in mean blood pressures.",
            "Claiming the call proves smoking caused a difference."
          ],
          "sources": [
            {
              "source": "exercise1",
              "cell": 1
            },
            {
              "source": "exercise1",
              "cell": 2
            },
            {
              "source": "exercise1",
              "cell": 13
            },
            {
              "source": "statistics",
              "pages": "27–34"
            }
          ],
          "code": "tSYS, pSYS = stats.ttest_ind(X0[:, 2], X1[:, 2])",
          "codeContext": "Exact line from Exercise1 cell 13. stats is imported from scipy in cell 2; X0/X1 are selected in cell 4. The code is not executed here."
        }
      ]
    },
    {
      "id": "effect-and-comparisons",
      "title": "5. Effect magnitude and multiple comparisons",
      "priority": "Blue: effect versus significance pp. 35–38. Orange: correction pp. 39–40.",
      "sources": [
        {
          "source": "statistics",
          "pages": "35–40"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Magnitude is separate from significance",
          "body": "The difference between means describes an effect magnitude in measurement units. Compare it with the variability and the purpose of the measurement. Statistical significance alone does not establish that an effect is large or useful."
        },
        {
          "type": "definition",
          "term": "Multiple comparisons",
          "body": "Testing many hypotheses gives more opportunities for false positives. Define the family of comparisons and its error criterion, rather than highlighting the smallest p-value after looking at all the tests."
        },
        {
          "type": "math",
          "title": "Bonferroni threshold",
          "items": [
            {
              "tex": "\\alpha_{\\mathrm{per\\ test}}=\\frac{\\alpha_{\\mathrm{family}}}{m}",
              "label": "For $m$ comparisons in the chosen family, Bonferroni uses this per-test threshold. It can be conservative."
            }
          ]
        },
        {
          "type": "detail",
          "title": "Other corrections",
          "body": "Page 40 names false discovery rate as a less stringent alternative. The supplied deck does not teach its algorithm, so this unit does not invent one."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-effect-significance",
          "prompt": "Which quantity most directly describes the magnitude of a mean difference?",
          "options": [
            {
              "text": "The p-value from a significance test.",
              "feedback": "A p-value depends on uncertainty and assumptions as well as the difference."
            },
            {
              "text": "The number of tests that were reported.",
              "feedback": "The count matters for multiplicity, not the difference itself."
            },
            {
              "text": "The difference expressed in measurement units.",
              "feedback": "Correct. Interpret that magnitude in context, alongside variability and uncertainty."
            },
            {
              "text": "The confidence level chosen in advance.",
              "feedback": "Confidence level is a property of the interval procedure."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "statistics",
              "pages": "35–38"
            }
          ]
        },
        {
          "id": "L01-bonferroni",
          "prompt": "How does Bonferroni set a per-test significance threshold?",
          "options": [
            {
              "text": "Multiply the family threshold by the test count.",
              "feedback": "Multiplying would make each test less stringent."
            },
            {
              "text": "Divide the observed effect by the test count.",
              "feedback": "The correction concerns the error threshold, not effect units."
            },
            {
              "text": "Divide the family threshold by the test count.",
              "feedback": "Correct. This controls family-wise false-positive risk conservatively."
            },
            {
              "text": "Multiply the observed p-value by the effect size.",
              "feedback": "Effect size is not the multiplier in this rule."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "statistics",
              "pages": "39–40"
            }
          ]
        }
      ]
    },
    {
      "id": "confounding",
      "title": "6. Conclusions and possible confounding",
      "priority": "Blue: cautious conclusions pp. 41–42. Exercise1 adds confounding in cells 17–20.",
      "sources": [
        {
          "source": "statistics",
          "pages": "41–42"
        },
        {
          "source": "exercise1",
          "cell": 17
        },
        {
          "source": "exercise1",
          "cell": 18
        },
        {
          "source": "exercise1",
          "cell": 19
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Confounding",
          "body": "Another difference between the groups could help explain a blood-pressure association. Exercise1 asks you to inspect age and weight. A significant difference in weight identifies a possible concern, not proof that weight caused the pressure difference."
        },
        {
          "type": "definition",
          "term": "A non-significant result is not a clearance certificate",
          "body": "Failure to find an age difference is not evidence that age has no role. Comparing p-values for pressure and weight cannot measure how much confounding weight explains. Different causal stories may fit the same group comparisons."
        },
        {
          "type": "steps",
          "title": "Report a defensible conclusion",
          "steps": [
            "Describe the observed group difference with its uncertainty and magnitude.",
            "Name the test and its assumptions, and account for multiple comparisons.",
            "Discuss possible confounding and limits of the study design.",
            "Separate an association from a causal or clinical claim."
          ]
        },
        {
          "type": "detail",
          "title": "What has not been reproduced",
          "body": "HospitalData.pickle and the notebook image folder are absent. Submitted numeric outputs and written conclusions have not been recomputed. This page teaches the code and the interpretation boundaries; it does not classify individuals or certify clinical conclusions."
        },
        {
          "type": "detail",
          "title": "Revision checklist before the oral prompts",
          "blocks": [
            {
              "type": "steps",
              "steps": [
                "Mean locates the data; SD describes individuals; SEM describes mean uncertainty; CI gives interval bounds.",
                "Choose one-sample, independent or paired testing from the design, and justify the alternative and variance assumption.",
                "Read p-values under the null model; discuss effect magnitude and multiple testing separately.",
                "Trace subject masks and feature indices; explain assumptions and possible confounding without certifying missing-data results."
              ]
            }
          ]
        }
      ],
      "conceptQuiz": [
        {
          "id": "L01-confounding-definition",
          "prompt": "What is a possible confounding factor in this exercise?",
          "options": [
            {
              "text": "The variation of pressure within each cohort.",
              "feedback": "Within-cohort spread is variability; confounding concerns another explanation for the between-group association."
            },
            {
              "text": "The sampling uncertainty of each pressure mean.",
              "feedback": "Uncertainty describes estimation precision; a possible confounder is another relevant group difference."
            },
            {
              "text": "Another group difference that could explain pressure.",
              "feedback": "Correct. Age or weight could offer another explanation for the association with smoking status."
            },
            {
              "text": "The magnitude of the pressure gap between cohorts.",
              "feedback": "That is the observed association to explain, rather than an alternative explanation for it."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "exercise1",
              "cell": 17
            }
          ]
        },
        {
          "id": "L01-confounding-nonsignificant",
          "prompt": "What does a non-significant comparison of age establish?",
          "options": [
            {
              "text": "It proves that age has no role in the association.",
              "feedback": "Failure to reject does not rule out a role for age."
            },
            {
              "text": "It confirms equivalent age distributions in both groups.",
              "feedback": "A non-significant mean comparison is not evidence of equivalent distributions."
            },
            {
              "text": "It fails to reject equal age means under the model.",
              "feedback": "Correct. It does not prove equality or eliminate possible confounding."
            },
            {
              "text": "It validates the causal interpretation of the pressure test.",
              "feedback": "Causal interpretation depends on the design and other explanations."
            }
          ],
          "correct": 2,
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
      "codeUnderstanding": [
        {
          "id": "L01-code-confounding",
          "title": "Explain the additional comparisons",
          "prompt": "Which features are compared? Explain what either a small or a large p-value can and cannot tell you about confounding. Do not assert a result value.",
          "kind": "code",
          "rubric": [
            {
              "id": "L01-code-confounding-c1",
              "text": "Maps feature zero to age and feature one to weight.",
              "accept": "First and second columns, with distinct smoking cohorts."
            },
            {
              "id": "L01-code-confounding-c2",
              "text": "Interprets a small p-value as evidence of a mean difference under the chosen model.",
              "accept": "Evidence against equal group means, not proof of a confounding mechanism."
            },
            {
              "id": "L01-code-confounding-c3",
              "text": "Does not use a large p-value to rule out confounding.",
              "accept": "Failure to reject is not proof that the groups are equivalent."
            },
            {
              "id": "L01-code-confounding-c4",
              "text": "Rejects p-value ranking as an explanation of causality.",
              "accept": "Pressure and weight p-values do not quantify how much the latter explains the former."
            }
          ],
          "modelAnswer": [
            "The first line compares age across cohorts; the second compares weight. Each call tests a difference in group means under its assumptions. A small result can flag a possible imbalance worth investigating, but does not prove that imbalance explains pressure. A large p-value cannot rule out confounding. Comparing the sizes of these p-values with the pressure p-value is not a causal analysis."
          ],
          "pitfalls": [
            "Using pAGE as a proof that age has no influence.",
            "Repeating the submitted claim that weight is unlikely to explain pressure because its p-value is larger."
          ],
          "sources": [
            {
              "source": "exercise1",
              "cell": 17
            },
            {
              "source": "exercise1",
              "cell": 18
            },
            {
              "source": "exercise1",
              "cell": 19
            },
            {
              "source": "exercise1",
              "cell": 20
            }
          ],
          "code": "tAGE, pAGE = stats.ttest_ind(X0[:, 0], X1[:, 0])\ntWGT, pWGT = stats.ttest_ind(X0[:, 1], X1[:, 1])",
          "codeContext": "Exact lines from Exercise1 cell 18. Import: from scipy import stats (cell 2). Upstream X0/X1 are subject × feature matrices. No saved p-values are reproduced."
        }
      ]
    }
  ],
  "finalWritten": [
    {
      "id": "L01-written-uncertainty",
      "title": "Explain SD, SEM and a confidence interval",
      "prompt": "A newcomer sees two means with error bars. Explain SD, SEM and a 95% CI. Specify the input observations and the output of each summary. Sketch two groups with the same mean and different SD, label the axes, and explain why error bars need a definition. You may describe the sketch in text.",
      "kind": "written",
      "rubric": [
        {
          "id": "L01-written-uncertainty-c1",
          "text": "Defines SD as spread of individuals.",
          "accept": "Variation of measurements around their mean, with the measurement unit."
        },
        {
          "id": "L01-written-uncertainty-c2",
          "text": "Defines SEM as sampling uncertainty of the mean.",
          "accept": "Variability of the mean over repeated independent samples."
        },
        {
          "id": "L01-written-uncertainty-c3",
          "text": "States the repeated-sampling interpretation of CI coverage.",
          "accept": "95% of intervals from the procedure cover the fixed population mean under assumptions."
        },
        {
          "id": "L01-written-uncertainty-c4",
          "text": "Explains input and scalar or interval output.",
          "accept": "An observation vector produces a mean/SD/SEM scalar or lower and upper bounds."
        },
        {
          "id": "L01-written-uncertainty-c5",
          "text": "Describes a labelled sketch of equal means with different spreads.",
          "accept": "Horizontal measurement axis and vertical group labels, with one wider spread; or equivalent labelled distributions."
        },
        {
          "id": "L01-written-uncertainty-c6",
          "text": "States a relevant assumption or limitation.",
          "accept": "Independent sampling; distributional t-model; CI is not individual spread."
        }
      ],
      "modelAnswer": [
        "Take one vector of measurements per group. SD describes individual spread, whereas SEM estimates how the mean varies across repeated samples. The CI adds a critical multiplier to form lower and upper bounds. A 95% interval procedure covers the fixed population mean in 95% of repeated samples under the assumptions. Sketch measurements on the horizontal axis and group identity vertically: place both centers at the same value but spread one group wider. Label whether any whiskers are SD, SEM or CI; they answer different questions."
      ],
      "pitfalls": [
        "Assigning 95% probability to the fixed mean after seeing the data.",
        "Drawing CI whiskers and calling them the spread of 95% of individuals."
      ],
      "sources": [
        {
          "source": "statistics",
          "pages": "17–26"
        },
        {
          "source": "exercise1",
          "cell": 3
        },
        {
          "source": "exercise1",
          "cell": 8
        }
      ]
    },
    {
      "id": "L01-written-design",
      "title": "Choose and defend a test",
      "prompt": "Sample practice: one study measures the same participants before and after a condition; another compares two distinct cohorts. Explain the appropriate t-test for each, its input/output and null hypothesis. Defend the tail choice before looking at results. Explain what a small p-value would leave unresolved.",
      "kind": "written",
      "rubric": [
        {
          "id": "L01-written-design-c1",
          "text": "Chooses paired testing for repeated measurements.",
          "accept": "Uses within-person differences, null mean difference zero."
        },
        {
          "id": "L01-written-design-c2",
          "text": "Chooses independent testing for distinct cohorts.",
          "accept": "Two vectors of different participants, null equal population means."
        },
        {
          "id": "L01-written-design-c3",
          "text": "Explains the statistic and p-value outputs.",
          "accept": "Statistic standardizes a difference; p-value is a tail probability under the null model."
        },
        {
          "id": "L01-written-design-c4",
          "text": "Justifies the alternative before observing results.",
          "accept": "Two-sided if either direction matters; directional alternative specified in advance."
        },
        {
          "id": "L01-written-design-c5",
          "text": "Names checks appropriate to the design.",
          "accept": "Independence, matching, outliers, distributions and variance assumption or Welch."
        },
        {
          "id": "L01-written-design-c6",
          "text": "Separates significance from magnitude and causality.",
          "accept": "Report the difference and uncertainty; consider design and other explanations."
        }
      ],
      "modelAnswer": [
        "Use a paired test for the same participants, analyzing the within-person difference against zero. Use an independent test for distinct cohorts, comparing two vectors of measurements against equal population means. Both yield a test statistic and a null-conditional p-value. Choose a two-sided alternative if either direction matters, or justify a directional alternative in advance. Inspect the measurements and assumptions, and choose pooled or Welch appropriately for independent groups. A small p-value does not establish a large effect, a causal explanation or freedom from confounding."
      ],
      "pitfalls": [
        "Selecting the test or tail that gives the smallest p-value.",
        "Treating the two conditions as independent when matching is available."
      ],
      "sources": [
        {
          "source": "statistics",
          "pages": "27–34, 48"
        },
        {
          "source": "exercise1",
          "cell": 12
        },
        {
          "source": "exercise1",
          "cell": 13
        }
      ]
    },
    {
      "id": "L01-written-defense",
      "title": "Defend the Exercise1 analysis to an examiner",
      "prompt": "Explain the path from the Exercise1 subject × feature matrix to a cautious conclusion. Include the selected pressure columns, mean/uncertainty summaries, independent test, age/weight checks and multiple-comparison issue. Critique the claim that a larger weight p-value means weight cannot explain the pressure association. Describe what you can defend without the missing data file.",
      "kind": "written",
      "rubric": [
        {
          "id": "L01-written-defense-c1",
          "text": "Traces masks and pressure columns correctly.",
          "accept": "y defines cohort rows; columns two and three are systolic and diastolic."
        },
        {
          "id": "L01-written-defense-c2",
          "text": "Distinguishes descriptive spread and uncertainty.",
          "accept": "SD versus SEM/CI, with an explicit divisor and critical-value convention."
        },
        {
          "id": "L01-written-defense-c3",
          "text": "Justifies the independent comparison and its assumptions.",
          "accept": "Distinct cohorts, stated alternative and equal-variance choice."
        },
        {
          "id": "L01-written-defense-c4",
          "text": "Recognizes multiplicity in several comparisons.",
          "accept": "Identify a test family and an error-control plan such as Bonferroni."
        },
        {
          "id": "L01-written-defense-c5",
          "text": "Rejects causal interpretation based on p-value ranking.",
          "accept": "Weight p-value size does not quantify how much pressure difference it explains."
        },
        {
          "id": "L01-written-defense-c6",
          "text": "States the verification boundary honestly.",
          "accept": "Can explain code semantics, cannot certify outputs without HospitalData.pickle."
        }
      ],
      "modelAnswer": [
        "The row masks split subjects by y, and columns two and three select the pressure features. Summarize their means and clearly identify SD or uncertainty bars; check the variance divisor and the approximate critical multiplier in the notebook. An independent test fits the separate cohorts, subject to its assumptions. The age and weight comparisons flag possible imbalances, and several tests raise a multiple-comparison issue. A larger weight p-value cannot establish that weight is an unimportant confounder: p-values do not measure causal contribution. Without the data file, I can defend indexing and the analysis plan but cannot certify a pressure mean, p-value or causal conclusion."
      ],
      "pitfalls": [
        "Calling every cell completed because some solution code exists.",
        "Treating student-written conclusions or saved outputs as an official verified key."
      ],
      "sources": [
        {
          "source": "exercise1",
          "cell": 1
        },
        {
          "source": "exercise1",
          "cell": 4
        },
        {
          "source": "exercise1",
          "cell": 9
        },
        {
          "source": "exercise1",
          "cell": 13
        },
        {
          "source": "exercise1",
          "cell": 17
        },
        {
          "source": "exercise1",
          "cell": 18
        },
        {
          "source": "exercise1",
          "cell": 20
        },
        {
          "source": "statistics",
          "pages": "35–42"
        }
      ]
    }
  ],
  "lectureQuiz": []
};
