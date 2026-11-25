import { scaleLinear, line } from 'd3';

// Original hypothetical plots, not source images or recorded observations.
const sx = scaleLinear().domain([0, 1]).range([55, 325]);
const sy = scaleLinear().domain([-1.5, 1.5]).range([130, 35]);
const trace = line().x(d => sx(d[0])).y(d => sy(d[1]))(
  Array.from({length: 201}, (_,n) => {const t=n/200;return [t,Math.sin(2*Math.PI*3*t)+0.5*Math.sin(2*Math.PI*7*t)];}));
const fx=scaleLinear().domain([0,10]).range([55,325]);
const fy=scaleLinear().domain([0,1]).range([290,190]);
const spectrumFigure=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 345" style="width:100%;max-width:500px;height:auto" aria-hidden="true">
<g fill="currentColor" font-family="system-ui,sans-serif" font-size="14">
<text x="55" y="20">Signal (arbitrary units)</text><text x="190" y="170" text-anchor="middle">Time (s)</text>
<text x="55" y="190">Relative power</text><text x="190" y="337" text-anchor="middle">Frequency (Hz)</text>
<text x="55" y="151" text-anchor="middle">0</text><text x="325" y="151" text-anchor="middle">1</text>
<text x="55" y="314" text-anchor="middle">0</text><text x="325" y="314" text-anchor="middle">10</text>
<text x="${fx(3)}" y="208" text-anchor="middle">3 Hz</text><text x="${fx(7)}" y="251" text-anchor="middle">7 Hz</text>
</g><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M55 35V135H325M55 195V290H325"/><path d="${trace}"/></g>
<path d="M${fx(3)} 290V${fy(0.7)} M${fx(7)} 290V${fy(0.175)}" stroke="var(--c-accent)" stroke-width="3"/>
</svg>`;
const filterFigure=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 220" style="width:100%;max-width:500px;height:auto" aria-hidden="true">
<g font-family="system-ui,sans-serif" font-size="14" fill="currentColor"><text x="30" y="20">Filter gain</text><text x="180" y="207" text-anchor="middle">Frequency (schematic)</text><text x="32" y="180">0</text><text x="32" y="60">1</text><text x="74" y="43">Retain</text><text x="220" y="157">Attenuate</text><text x="185" y="85">Smooth</text><text x="166" y="117">Sharp</text></g>
<path d="M55 40V175H325M55 55H155V174H325" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M55 55H100C150 55 155 174 225 174H325" fill="none" stroke="var(--c-accent)" stroke-width="2"/>
</svg>`;

export default {
  "learningMode": "topic-study",
  "compactPractice": true,
  "meta": {
    "id": "L02",
    "number": 2,
    "title": "Spectral methods"
  },
  "intro": [
    "Read the short theory and use the interactive code cards in context. Open the optional code explanations and final written practice when you want to rehearse for the oral.",
    "This is Lecture 2 spectral methods, verified from its title page. Source colors distinguish core definitions, understanding and examples. Exercise2 recording data and image folders are unavailable; saved notebook outputs are not verified here."
  ],
  "sections": [
    {
      "id": "fourier",
      "title": "1. Fourier transform: a change of basis",
      "priority": "Red: DFT definition p. 7. Orange: amplitude, phase and matrix view pp. 8–9. Blue: visualization p. 6.",
      "sources": [
        {
          "source": "spectral",
          "pages": "5–9"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Discrete Fourier transform (DFT)",
          "body": "The DFT re-expresses a sampled signal as sine and cosine components. Time-domain coordinates say when a value was measured. Frequency-domain coordinates say how strongly each oscillatory component contributes."
        },
        {
          "type": "definition",
          "term": "Input and output",
          "body": "Input: a length-$N$ vector of equally spaced measurements. Output: a length-$N$ vector of complex Fourier coefficients. Each coefficient encodes amplitude and phase, not a separate neuron or event time."
        },
        {
          "type": "math",
          "title": "Read the slide equation",
          "items": [
            {
              "tex": "\\widehat{x}_k=\\sum_{n=0}^{N-1}x_n[\\cos(2\\pi kn/N)-i\\sin(2\\pi kn/N)]",
              "label": "Here $n$ indexes samples, $k$ indexes frequencies, $N$ is the sample count and $i^2=-1$. This forward convention has no normalization factor."
            }
          ]
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": spectrumFigure,
            "caption": "Original hypothetical signal: a 3 Hz sinusoid plus a half-amplitude 7 Hz sinusoid. The nonnegative-frequency spectrum sketch shows relative power, with a four-to-one peak ratio. Negative frequencies are omitted for clarity; this is not a notebook result.",
            "fallbackAlt": "Top: oscillating signal in arbitrary units versus time from zero to one second. Bottom: relative power versus zero to ten hertz, with a taller peak at three hertz and a quarter-height peak at seven hertz."
          }
        },
        {
          "type": "definition",
          "term": "Amplitude and phase",
          "body": "Amplitude describes the size of a frequency component. Phase describes its alignment within the signal. Retaining the complex coefficients allows reconstruction; keeping only their magnitudes loses phase."
        },
        {
          "type": "detail",
          "title": "Matrix view, not a learned basis",
          "body": "The DFT is a fixed square change-of-basis matrix multiplying the sample vector. Its sine/cosine entries depend on sample and frequency indices. Unlike the later PCA basis, it is not fitted to covariance in this dataset."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-basis",
          "prompt": "What basis does the DFT use?",
          "options": [
            {
              "text": "Sine and cosine components.",
              "feedback": "Correct. The basis functions are oscillatory."
            },
            {
              "text": "Covariance-ranked directions.",
              "feedback": "That is the later PCA construction, not the fixed Fourier basis."
            },
            {
              "text": "Successive temporal averages.",
              "feedback": "Averages summarize values rather than change to an oscillatory basis."
            },
            {
              "text": "Threshold-selected waveforms.",
              "feedback": "Threshold selection detects events rather than Fourier components."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "spectral",
              "pages": "6–9"
            }
          ]
        },
        {
          "id": "L02-complex",
          "prompt": "What does one complex Fourier coefficient encode?",
          "options": [
            {
              "text": "Event count and event duration.",
              "feedback": "Those summarize detected events, not a Fourier coefficient."
            },
            {
              "text": "Sample mean and sample spread.",
              "feedback": "Those are statistical summaries of the samples."
            },
            {
              "text": "Component amplitude and phase.",
              "feedback": "Correct. Magnitude and angle encode amplitude and phase information."
            },
            {
              "text": "Filter cutoff and filter order.",
              "feedback": "Those describe a filter design, not the transformed signal."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "spectral",
              "pages": "8"
            }
          ]
        },
        {
          "id": "L02-shape",
          "prompt": "For a full DFT of a length-$N$ vector, what is the output?",
          "options": [
            {
              "text": "A square matrix of sample covariances.",
              "feedback": "A covariance matrix belongs to a different analysis."
            },
            {
              "text": "A vector of $N$ complex coefficients.",
              "feedback": "Correct. It changes coordinates without reducing vector length."
            },
            {
              "text": "A scalar describing total signal power.",
              "feedback": "Total power is a summary, not the full transform."
            },
            {
              "text": "A vector of threshold-crossing times.",
              "feedback": "Crossing times are event detections, not frequency coordinates."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "spectral",
              "pages": "7–9"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "spectrum",
      "codeVisualCards": [
        {
          "id": "L02-code-visual-fft",
          "title": "Move a tone and locate its Fourier peak",
          "snippet": {
            "language": "python",
            "text": "f = np.fft.rfftfreq(x.size, d=1 / fs)\nmagnitude = np.abs(np.fft.rfft(x))",
            "provenance": "New teaching example",
            "sources": [
              {
                "source": "spectral",
                "pages": "7–12, 37–40"
              }
            ],
            "context": "NumPy is imported as np. x is one second of real-valued samples. The sample rate is $64\\,\\text{Hz}$. The plot uses unnormalized magnitudes of the nonnegative DFT bins."
          },
          "visual": {
            "kind": "fourier-signal",
            "data": {
              "fs": 64,
              "low": 3,
              "high": 12
            },
            "controls": [
              {
                "id": "frequency",
                "label": "Second tone (Hz)",
                "initial": 12,
                "options": [
                  {
                    "value": 8,
                    "label": "8"
                  },
                  {
                    "value": 12,
                    "label": "12"
                  },
                  {
                    "value": 16,
                    "label": "16"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · One waveform and its magnitude spectrum",
            "alt": "The 3 Hz tone has fixed amplitude. The adjustable tone always has half that amplitude."
          },
          "mcq": {
            "id": "L02-code-visual-fft-check",
            "difficulty": "easy",
            "prompt": "When the second tone moves from $12\\,\\text{Hz}$ to $16\\,\\text{Hz}$, what changes in the spectrum?",
            "correct": 2,
            "options": [
              {
                "text": "The $3\\,\\text{Hz}$ peak moves to $7\\,\\text{Hz}$.",
                "feedback": "Its frequency stays fixed because its part of the signal is unchanged."
              },
              {
                "text": "The higher-frequency peak gains height.",
                "feedback": "The second tone keeps the same amplitude and lands on a DFT bin in both settings."
              },
              {
                "text": "The smaller peak moves from 12 to $16\\,\\text{Hz}$.",
                "feedback": "Its frequency changes while its amplitude stays fixed."
              }
            ]
          },
          "blank": {
            "id": "L02-code-visual-fft-blank",
            "prompt": "Complete the bin-frequency calculation with the sample spacing in seconds.",
            "template": "f = np.fft.rfftfreq(x.size, d={token})",
            "fields": [
              {
                "id": "token",
                "label": "Sample spacing",
                "accepted": [
                  "1 / fs",
                  "1/fs"
                ],
                "explanation": "A sample arrives every 1/fs seconds.",
                "commonErrors": "fs itself is a rate in samples per second."
              }
            ],
            "expectedOutput": "The 64-sample record has 33 nonnegative bins with $1\\,\\text{Hz}$ spacing."
          }
        }
      ],
      "title": "2. Power spectra and fast computation",
      "priority": "Red: spectrum and FFT pp. 10–11. Blue: FFT demonstration p. 12.",
      "sources": [
        {
          "source": "spectral",
          "pages": "10–12"
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Power spectrum",
          "body": "The power spectrum reports how signal power is distributed across frequency. The slide defines it as the squared magnitude of each Fourier coefficient. It summarizes the whole analyzed interval, without saying when each oscillation occurred."
        },
        {
          "type": "math",
          "title": "Coefficient versus power",
          "items": [
            {
              "tex": "S(k)=|\\widehat{x}_k|^2",
              "label": "Power is nonnegative and discards coefficient phase. This is the slide convention, not a separately normalized power spectral density."
            }
          ]
        },
        {
          "type": "definition",
          "term": "Fast Fourier transform (FFT)",
          "body": "FFT is an efficient algorithm for computing the DFT, using repeated intermediate results. It computes the same transform; it is not a different frequency representation or an approximate wavelet method."
        },
        {
          "type": "math",
          "title": "Why FFT is useful",
          "items": [
            {
              "tex": "O(N^2)\\quad\\longrightarrow\\quad O(N\\log N)",
              "label": "Direct DFT summation versus FFT computational complexity. No algorithm proof is required here."
            }
          ]
        },
        {
          "type": "detail",
          "title": "Reading the EEG example",
          "body": "Pages 20–22 pair a voltage trace with a power spectrum and band-pass traces. Time belongs on the trace axis; frequency belongs on the spectrum axis. A spectral peak indicates a strong component, not its biological cause or a diagnosis."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-power",
          "prompt": "How is the slide power spectrum obtained from Fourier coefficients?",
          "options": [
            {
              "text": "Take the real part of each coefficient.",
              "feedback": "The real part loses the imaginary contribution and can be negative."
            },
            {
              "text": "Take the phase angle of each coefficient.",
              "feedback": "Phase describes alignment, not power."
            },
            {
              "text": "Take the signed sum of the coefficients.",
              "feedback": "Summing loses the frequency distribution."
            },
            {
              "text": "Take the squared magnitude of each coefficient.",
              "feedback": "Correct. Squared magnitude combines real and imaginary contributions."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "spectral",
              "pages": "10"
            }
          ]
        },
        {
          "id": "L02-fft",
          "prompt": "How does FFT relate to DFT?",
          "options": [
            {
              "text": "It computes the same DFT more efficiently.",
              "feedback": "Correct. FFT changes the algorithm, not the intended transform."
            },
            {
              "text": "It estimates event times from a threshold.",
              "feedback": "That describes event detection."
            },
            {
              "text": "It fits a different basis to the signal.",
              "feedback": "The Fourier basis remains fixed."
            },
            {
              "text": "It replaces coefficients with local averages.",
              "feedback": "FFT retains Fourier coefficients, not local temporal averages."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "spectral",
              "pages": "11–12"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "filters",
      "codeVisualCards": [
        {
          "id": "L02-code-visual-lowpass",
          "title": "Remove a component before reconstructing",
          "snippet": {
            "language": "python",
            "text": "X = np.fft.rfft(x)\nX[f > cutoff] = 0\nfiltered = np.fft.irfft(X, n=x.size)",
            "provenance": "New teaching example",
            "sources": [
              {
                "source": "spectral",
                "pages": "13–19"
              }
            ],
            "context": "Use the same NumPy frequency axis and sampling rate as above, with tones fixed at $3$ and $12\\,\\text{Hz}$. This is a hard frequency mask on a periodic one-second example."
          },
          "visual": {
            "kind": "fourier-signal",
            "data": {
              "fs": 64,
              "low": 3,
              "high": 12
            },
            "controls": [
              {
                "id": "cutoff",
                "label": "Low-pass cutoff (Hz)",
                "initial": 6,
                "options": [
                  {
                    "value": 6,
                    "label": "6"
                  },
                  {
                    "value": 14,
                    "label": "14"
                  }
                ]
              }
            ],
            "caption": "Illustrative data · Time trace before and after masking",
            "alt": "Compare the two signals on identical amplitude and time axes."
          },
          "mcq": {
            "id": "L02-code-visual-lowpass-check",
            "difficulty": "easy",
            "prompt": "What accounts for the smoother output at the $6\\,\\text{Hz}$ cutoff?",
            "correct": 1,
            "options": [
              {
                "text": "Both tones are reduced by the same amount.",
                "feedback": "The rule keeps the complete $3\\,\\text{Hz}$ coefficient and zeros the $12\\,\\text{Hz}$ coefficient."
              },
              {
                "text": "The $12\\,\\text{Hz}$ tone is removed from the sum.",
                "feedback": "Only frequencies at or below $6\\,\\text{Hz}$ survive the mask."
              },
              {
                "text": "The $12\\,\\text{Hz}$ tone is moved into a lower bin.",
                "feedback": "Masking sets coefficients to zero without shifting their frequencies."
              }
            ]
          }
        }
      ],
      "title": "3. Filtering and ringing artifacts",
      "priority": "Red: filter definitions p. 13. Orange: reconstruction, ringing and smoother windows pp. 14–19.",
      "sources": [
        {
          "source": "spectral",
          "pages": "13–22"
        },
        {
          "source": "exercise2",
          "cell": 8
        },
        {
          "source": "exercise2",
          "cell": 9
        },
        {
          "source": "exercise2",
          "cell": 10
        }
      ],
      "blocks": [
        {
          "type": "compare",
          "title": "Which frequencies remain?",
          "columns": [
            "Retains mainly",
            "Attenuates mainly"
          ],
          "rows": [
            {
              "label": "Low-pass",
              "cells": [
                "Below the cutoff",
                "Above the cutoff"
              ]
            },
            {
              "label": "High-pass",
              "cells": [
                "Above the cutoff",
                "Below the cutoff"
              ]
            },
            {
              "label": "Band-pass",
              "cells": [
                "Between two cutoffs",
                "Below and above the band"
              ]
            }
          ]
        },
        {
          "type": "steps",
          "title": "Frequency-domain filtering",
          "steps": [
            "Transform the signal into Fourier coefficients.",
            "Attenuate unwanted frequency components using a frequency-domain window.",
            "Apply the inverse transform to reconstruct a time-domain trace. Keep the inverse normalization consistent with the forward convention."
          ]
        },
        {
          "type": "definition",
          "term": "Ringing",
          "body": "An abrupt rectangular cutoff in frequency has an oscillatory, sinc-shaped temporal response. Filtering can therefore introduce oscillations near abrupt signal changes. A new oscillation after filtering need not be a new biological rhythm."
        },
        {
          "type": "figure",
          "visual": {
            "type": "svg",
            "markup": filterFigure,
            "caption": "Original schematic low-pass gain curves: abrupt versus gradual attenuation. A smoother transition reduces abrupt truncation but broadens frequency selection. No empirical filter response is claimed.",
            "fallbackAlt": "Filter gain versus increasing frequency. One curve drops abruptly from one to zero; another falls gradually across a wider frequency interval. Both retain low frequencies and attenuate high frequencies."
          }
        },
        {
          "type": "definition",
          "term": "Smoother attenuation",
          "body": "A gradual frequency transition can reduce ringing, but makes frequency selection less sharp. A filter changes the signal: compare raw and filtered traces on the same time axis and inspect events you want to preserve."
        },
        {
          "type": "definition",
          "term": "Exercise 2 purpose",
          "body": "High-pass filtering attenuates slow fluctuations before detecting brief negative extracellular spikes. The supplied student cell chooses a cutoff; it does not establish a universally safe value or prove that waveform shapes are unchanged."
        },
        {
          "type": "detail",
          "title": "Cutoff conventions require a stated filter design",
          "body": "Cells 9 and 10 disagree: the submitted cell uses cutoff/sampling_frequency * 2*np.pi; the help template uses cutoff/sampling_frequency. The former is angular frequency in radians per sample; the latter is cycles per sample. Neither alone certifies the actual half-power cutoff of these coefficients. lfilter applies supplied coefficients, rather than designing a filter from a cutoff."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-highpass",
          "prompt": "Which frequencies does a high-pass filter mainly attenuate?",
          "options": [
            {
              "text": "Components far above the chosen cutoff.",
              "feedback": "That is the low-pass direction."
            },
            {
              "text": "Components well below the chosen cutoff.",
              "feedback": "Correct. High-pass retains faster variations while attenuating slower ones."
            },
            {
              "text": "Components only at the Nyquist boundary.",
              "feedback": "High-pass is not restricted to the Nyquist boundary."
            },
            {
              "text": "Components only at the largest spectral peak.",
              "feedback": "Selection is by frequency band, not just the largest peak."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "spectral",
              "pages": "13"
            }
          ]
        },
        {
          "id": "L02-bandpass",
          "prompt": "What does a band-pass filter mainly retain?",
          "options": [
            {
              "text": "Frequencies below a single upper cutoff.",
              "feedback": "That describes low-pass."
            },
            {
              "text": "Frequencies above a single lower cutoff.",
              "feedback": "That describes high-pass."
            },
            {
              "text": "Frequencies between a lower and upper cutoff.",
              "feedback": "Correct. A band-pass retains an intermediate range."
            },
            {
              "text": "Frequencies outside a lower and upper cutoff.",
              "feedback": "That describes band rejection, the opposite selection."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "spectral",
              "pages": "13"
            }
          ]
        },
        {
          "id": "L02-ringing",
          "prompt": "What can produce ringing in a reconstructed time trace?",
          "options": [
            {
              "text": "A sharp frequency-domain cutoff window.",
              "feedback": "Correct. Abrupt frequency truncation creates an oscillatory temporal response."
            },
            {
              "text": "A change from DFT to the FFT algorithm.",
              "feedback": "FFT computes the same DFT; switching algorithm does not explain ringing."
            },
            {
              "text": "A relabelling of the horizontal time axis.",
              "feedback": "Relabelling does not change the reconstructed samples."
            },
            {
              "text": "A display of phase beside magnitude values.",
              "feedback": "Displaying phase does not apply a cutoff."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "spectral",
              "pages": "17–19"
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L02-code-filter",
          "title": "Audit the submitted filter, not just its name",
          "prompt": "Explain what lfilter receives and why multiplying wc by two pi changes the filter. Compare the help template. What would you check before defending the requested cutoff and the waveform interpretation?",
          "kind": "code",
          "rubric": [
            {
              "id": "L02-code-filter-c1",
              "text": "Identifies numerator, denominator and input trace.",
              "accept": "lfilter receives b, a and the full electrode_activity vector."
            },
            {
              "id": "L02-code-filter-c2",
              "text": "Distinguishes the two cutoff conventions.",
              "accept": "Cell 9 uses radians per sample; cell 10 shows cycles per sample."
            },
            {
              "id": "L02-code-filter-c3",
              "text": "Declines to certify the exact cutoff from the variable name.",
              "accept": "Evaluate the response of the supplied coefficients before interpreting the requested cutoff."
            },
            {
              "id": "L02-code-filter-c4",
              "text": "Proposes a signal-preservation check.",
              "accept": "Compare raw/filtered traces, slow fluctuations, spike shape and edge transients."
            }
          ],
          "modelAnswer": [
            "The first coefficient array is the numerator and the second is the denominator. lfilter applies this recursive filter to the full trace; it does not interpret cutoff as a design specification. The submitted wc is angular frequency in radians per sample, whereas the help template omits two pi. This changes the coefficients and the response. Check that response and compare raw and filtered traces, including onset transients and spike morphology, before defending a cutoff. Neither version is certified here as an exact standard design."
          ],
          "pitfalls": [
            "Treating lfilter as if it accepts a cutoff in hertz.",
            "Copying the help template as an independently verified solution."
          ],
          "sources": [
            {
              "source": "exercise2",
              "cell": 4
            },
            {
              "source": "exercise2",
              "cell": 8
            },
            {
              "source": "exercise2",
              "cell": 9
            },
            {
              "source": "exercise2",
              "cell": 10
            }
          ],
          "code": "from scipy.signal import lfilter\ncutoff = 100\nwc = cutoff/sampling_frequency * 2*np.pi\nelectrode_activity_filtered = lfilter(np.array([1-wc, wc-1]), np.array([1, wc-1]), electrode_activity)",
          "codeContext": "Exact executable lines from Exercise2 cell 9, discussed critically. NumPy is np in cell 4; sampling_frequency is 20000. This is submitted code, not a recommended filter recipe. Data are unavailable."
        }
      ]
    },
    {
      "id": "time-frequency",
      "title": "4. Wavelets and time-frequency representations",
      "priority": "Orange: changing spectra p. 23. Red: wavelets pp. 24–25. Supplementary comparison pp. 41–43.",
      "sources": [
        {
          "source": "spectral",
          "pages": "23–25"
        },
        {
          "source": "spectral",
          "pages": "41–43"
        },
        {
          "source": "exercise2",
          "cell": 6
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Why a whole-record spectrum can be insufficient",
          "body": "Two signals can contain similar frequency content at different times. A whole-record power spectrum pools the interval. Use a time-frequency representation when the question asks when a component appears or disappears."
        },
        {
          "type": "definition",
          "term": "Wavelet transform",
          "body": "A wavelet is a localized oscillation that grows and returns toward zero. A wavelet transform projects a signal onto shifted, scaled wavelets. It describes local similarity at different times and scales rather than one coefficient per whole-record frequency."
        },
        {
          "type": "compare",
          "title": "Name the construction and the displayed quantity",
          "columns": [
            "Construction",
            "Output axes"
          ],
          "rows": [
            {
              "label": "Fourier spectrum",
              "cells": [
                "Transform the full interval; square magnitudes",
                "Frequency → power"
              ]
            },
            {
              "label": "Short-time Fourier spectrogram",
              "cells": [
                "Transform successive time windows",
                "Window time × frequency"
              ]
            },
            {
              "label": "Wavelet scalogram",
              "cells": [
                "Project onto localized wavelets at multiple scales",
                "Time × scale, or converted frequency"
              ]
            }
          ]
        },
        {
          "type": "definition",
          "term": "Resolution and interpretation",
          "body": "Localizing an oscillation requires a finite window or wavelet. Time and frequency detail trade off; a localized patch is not an exact event boundary. State the window or wavelet and what color encodes before interpreting the image."
        },
        {
          "type": "definition",
          "term": "Notebook color is not automatically power",
          "body": "Exercise2 uses the Mexican-hat CWT, 101 widths and a two-dimensional coefficient matrix. Rows are widths/scales and columns are samples. Its diverging color range includes negative coefficients, so this displayed array is not squared-magnitude power."
        },
        {
          "type": "detail",
          "title": "Scale-to-frequency labels",
          "body": "The notebook passes the sample period to pywt.cwt, which supplies frequency labels for the selected wavelet and scales. Do not read a row number or a scale itself as hertz. imshow sets display extent, while flipud reverses row order; neither computes new frequencies."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-wavelet",
          "prompt": "What distinguishes a wavelet from a whole-record sinusoid?",
          "options": [
            {
              "text": "Its coefficient is constrained to be positive.",
              "feedback": "Wavelet coefficients may be signed."
            },
            {
              "text": "Its frequency index is also an event count.",
              "feedback": "Frequency indices do not count events."
            },
            {
              "text": "Its oscillation is localized in time.",
              "feedback": "Correct. Localization supports time-resolved analysis."
            },
            {
              "text": "Its basis is fitted from covariance.",
              "feedback": "That describes the PCA construction, not the wavelet definition."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "spectral",
              "pages": "24–25"
            }
          ]
        },
        {
          "id": "L02-spectrogram",
          "prompt": "What are the main axes of a time-frequency representation?",
          "options": [
            {
              "text": "Frequency and Fourier phase.",
              "feedback": "That omits when each frequency appears."
            },
            {
              "text": "Sample count and total power.",
              "feedback": "That is not a time-frequency map."
            },
            {
              "text": "Component rank and variance.",
              "feedback": "That is closer to a PCA summary."
            },
            {
              "text": "Time and frequency or scale.",
              "feedback": "Correct. Color then represents the specified coefficient or power quantity."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "spectral",
              "pages": "25"
            },
            {
              "source": "spectral",
              "pages": "30"
            },
            {
              "source": "spectral",
              "pages": "41–43"
            }
          ]
        },
        {
          "id": "L02-cwt-color",
          "prompt": "The notebook plots signed CWT coefficients. What does a negative color value mean?",
          "options": [
            {
              "text": "Negative similarity to that wavelet.",
              "feedback": "Correct. Signed projection coefficients differ from nonnegative power."
            },
            {
              "text": "Negative squared-magnitude power.",
              "feedback": "Squared magnitude cannot be negative."
            },
            {
              "text": "Negative sampling frequency values.",
              "feedback": "The color value is not the sampling frequency."
            },
            {
              "text": "Negative counts of detected spikes.",
              "feedback": "The displayed matrix is not an event-count matrix."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "exercise2",
              "cell": 6
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L02-code-cwt",
          "title": "Explain the CWT array and plot",
          "prompt": "Identify the input, the two axes of cwtmatr and the role of sampling_period. What does flipud change, and why should the diverging image not be called a power map?",
          "kind": "code",
          "rubric": [
            {
              "id": "L02-code-cwt-c1",
              "text": "Names the one-second signal segment.",
              "accept": "The first Nbins voltage samples from one electrode."
            },
            {
              "id": "L02-code-cwt-c2",
              "text": "States rows and columns correctly.",
              "accept": "101 scale rows by Nbins time samples; freqs supplies row-related frequency labels."
            },
            {
              "id": "L02-code-cwt-c3",
              "text": "Explains the sampling period.",
              "accept": "The reciprocal of sample rate converts sample timing to seconds for frequency labels."
            },
            {
              "id": "L02-code-cwt-c4",
              "text": "Distinguishes display reversal from analysis.",
              "accept": "flipud reverses rows; it neither filters nor computes new coefficients."
            },
            {
              "id": "L02-code-cwt-c5",
              "text": "Recognizes signed coefficients.",
              "accept": "Mexican-hat coefficients can be negative; these are not squared magnitudes."
            }
          ],
          "modelAnswer": [
            "The input is the first Nbins samples, with 101 wavelet scales set by widths. cwtmatr has 101 rows and Nbins columns: scale by time sample. sampling_period specifies seconds per sample so returned freqs has a physical frequency interpretation. flipud reverses the rows for display. The symmetric positive/negative color limits visualize signed coefficients, not power; the wavelet and scale choices control what the map resolves."
          ],
          "pitfalls": [
            "Calling a width an event count.",
            "Reading imshow extent as a calculation of physical frequencies."
          ],
          "sources": [
            {
              "source": "exercise2",
              "cell": 4
            },
            {
              "source": "exercise2",
              "cell": 6
            }
          ],
          "code": "widths = 1/np.linspace(1/301,1/10,101)\ncwtmatr, freqs = pywt.cwt(\n    electrode_activity[0:Nbins],\n    widths,\n    'mexh',\n    sampling_period=1/sampling_frequency\n)\naxs[1].imshow(np.flipud(cwtmatr[:,0:Nbins]),extent=[0, time[-1], freqs[0], freqs[-1]], cmap='PRGn', aspect='auto',\n           vmax=abs(cwtmatr).max(), vmin=-abs(cwtmatr).max())",
          "codeContext": "Exact statements from Exercise2 cell 6. NumPy, matplotlib.pyplot and pywt are imported in cell 4. axs and time are set earlier in cell 6. No source plot or output is reproduced."
        }
      ]
    },
    {
      "id": "applications",
      "title": "5. Read examples without overinterpreting them",
      "priority": "Blue: songbird, EEG artifacts and ECG–BP examples pp. 26–32.",
      "sources": [
        {
          "source": "spectral",
          "pages": "26–32"
        }
      ],
      "blocks": [
        {
          "type": "steps",
          "title": "Read a time-frequency plot",
          "steps": [
            "Identify the signal, the time axis, the frequency/scale axis and the color quantity.",
            "Describe localized frequency patterns before naming their biological meaning.",
            "Compare related traces and check whether a visible pattern could be artifact or processing."
          ]
        },
        {
          "type": "definition",
          "term": "Songbird syllables",
          "body": "Repeated time-frequency patterns make song syllables visible even when a whole-record spectrum pools them together. A repeated spectral pattern supports comparison of sound structure, not a claim about its cause."
        },
        {
          "type": "definition",
          "term": "EEG denoising",
          "body": "Muscle, movement, cardiac and ocular activity can contaminate EEG. The slide example removes large wavelet coefficients and reconstructs a cleaner-looking signal. Large coefficients are not automatically artifacts; discarding them can remove neural activity too."
        },
        {
          "type": "definition",
          "term": "ECG and blood pressure",
          "body": "The paired scalograms illustrate corresponding events with a visible delay. Describe the ordering on their common time axis. Similarity or a delay does not by itself establish causality, and no exact delay is digitized here."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-artifact",
          "prompt": "In the lecture EEG example, what is an artifact?",
          "options": [
            {
              "text": "A weak component below the display range.",
              "feedback": "Weakness alone does not define artifact."
            },
            {
              "text": "A contribution arising outside the brain.",
              "feedback": "Correct. The source distinguishes non-brain contributions from the intended EEG activity."
            },
            {
              "text": "A component removed by any band-pass filter.",
              "feedback": "Filtering does not define biological origin."
            },
            {
              "text": "A coefficient with a negative wavelet value.",
              "feedback": "Sign alone does not distinguish artifact from signal."
            }
          ],
          "correct": 1,
          "sources": [
            {
              "source": "spectral",
              "pages": "29–31"
            }
          ]
        },
        {
          "id": "L02-delay",
          "prompt": "What does a visible ECG–BP scalogram delay directly describe?",
          "options": [
            {
              "text": "The causal effect size between the signals.",
              "feedback": "Delay is not a causal effect-size estimate."
            },
            {
              "text": "The exact biological source of each signal.",
              "feedback": "The map alone cannot establish biological origin."
            },
            {
              "text": "The ordering of corresponding signal events.",
              "feedback": "Correct. It shows a temporal relationship, which requires further evidence for causal interpretation."
            },
            {
              "text": "The probability that either signal is noise.",
              "feedback": "No such probability is supplied by the scalogram."
            }
          ],
          "correct": 2,
          "sources": [
            {
              "source": "spectral",
              "pages": "32"
            }
          ]
        }
      ],
      "codeUnderstanding": []
    },
    {
      "id": "sampling-spikes",
      "title": "6. Sampling and the Exercise 2 spike pipeline",
      "priority": "Sampling support: supplementary pp. 37–40. Exercise2 tasks 1–5, cells 2–17. PCA and clustering continue in L03–L04.",
      "sources": [
        {
          "source": "spectral",
          "pages": "37–40"
        },
        {
          "source": "exercise2",
          "cell": 2
        },
        {
          "source": "exercise2",
          "cell": 6
        },
        {
          "source": "exercise2",
          "cell": 11
        },
        {
          "source": "exercise2",
          "cell": 14
        }
      ],
      "blocks": [
        {
          "type": "definition",
          "term": "Sampling and frequency labels",
          "body": "Uniform samples need a sample rate to become seconds or hertz. Frequency index $k$ counts cycles across the analyzed record. For nonnegative frequencies below Nyquist, $f_k=k f_s/N$ and the bin spacing is $f_s/N$. Upper DFT bins also represent negative frequencies."
        },
        {
          "type": "definition",
          "term": "Aliasing",
          "body": "Sampling too slowly makes distinct continuous frequencies indistinguishable. To represent a band-limited signal, sample faster than twice its highest retained frequency and suppress higher frequencies before sampling. Filtering an already aliased recording cannot identify the original frequencies."
        },
        {
          "type": "definition",
          "term": "Notebook time base",
          "body": "The source describes one electrode, one minute and $f_s=20000\\,\\mathrm{Hz}$. Cell 6 selects one second, giving 20000 samples. np.arange starts at zero and stops before Nbins, so the final displayed sample precedes one second."
        },
        {
          "type": "steps",
          "title": "From trace to waveform columns",
          "steps": [
            "Inspect the trace and time-frequency view, then justify the high-pass choice.",
            "Choose a negative threshold from the filtered trace; detect a downward crossing rather than every sample below it.",
            "Extract equal-length windows around valid detections; check recording boundaries and the index convention.",
            "Overlay waveforms. Variation can motivate PCA and clustering, but does not prove one cell per visible group."
          ]
        },
        {
          "type": "definition",
          "term": "Crossing index and boundaries",
          "body": "The comparison of [1:] and [:-1] finds adjacent pairs that cross downward. Its index refers to the earlier sample in each pair; add one to align to the later sample if that is the intended crossing time. A 51-bin slice must stay inside the recording."
        },
        {
          "type": "detail",
          "title": "Revision checklist",
          "body": "Can you distinguish complex coefficients from power, name each filter, explain ringing, choose whole-record versus time-frequency analysis, label axes and color, and trace a sample index into seconds and waveform columns? Explain the code without inventing missing recording values."
        }
      ],
      "conceptQuiz": [
        {
          "id": "L02-sample-rate",
          "prompt": "What does sampling frequency measure?",
          "options": [
            {
              "text": "The number of retained spectral peaks.",
              "feedback": "Spectral peaks depend on signal content, not the definition of sample rate."
            },
            {
              "text": "The number of detected spikes per second.",
              "feedback": "Spike rate is different from acquisition rate."
            },
            {
              "text": "The number of wavelet widths in a plot.",
              "feedback": "Widths are an analysis choice, not the recording rate."
            },
            {
              "text": "The number of recorded samples per second.",
              "feedback": "Correct. Sample rate converts sample intervals into time intervals."
            }
          ],
          "correct": 3,
          "sources": [
            {
              "source": "spectral",
              "pages": "37"
            },
            {
              "source": "exercise2",
              "cell": 2
            },
            {
              "source": "exercise2",
              "cell": 6
            }
          ]
        },
        {
          "id": "L02-crossing",
          "prompt": "What does the notebook downward-threshold test detect?",
          "options": [
            {
              "text": "A transition from above to below threshold.",
              "feedback": "Correct. It compares two adjacent values on opposite sides."
            },
            {
              "text": "Every sample that lies below the threshold.",
              "feedback": "That would use only one inequality on the whole trace."
            },
            {
              "text": "The deepest sample within each waveform.",
              "feedback": "A crossing is not necessarily a local minimum."
            },
            {
              "text": "A transition from below to above threshold.",
              "feedback": "That reverses the two inequalities."
            }
          ],
          "correct": 0,
          "sources": [
            {
              "source": "exercise2",
              "cell": 11
            },
            {
              "source": "exercise2",
              "cell": 12
            },
            {
              "source": "exercise2",
              "cell": 13
            }
          ]
        }
      ],
      "codeUnderstanding": [
        {
          "id": "L02-code-time",
          "title": "Convert sample indices to seconds",
          "prompt": "Explain Nbins and time, including their length and the last time value. Why is squeeze used when loading the signal, and what must be checked before treating the result as one vector?",
          "kind": "code",
          "rubric": [
            {
              "id": "L02-code-time-c1",
              "text": "Explains selection length.",
              "accept": "One second times 20000 samples per second gives 20000 samples."
            },
            {
              "id": "L02-code-time-c2",
              "text": "Converts index to time.",
              "accept": "np.arange creates 0 through 19999, divided by 20000 seconds."
            },
            {
              "id": "L02-code-time-c3",
              "text": "States the final time.",
              "accept": "0.99995 seconds, rather than exactly one second."
            },
            {
              "id": "L02-code-time-c4",
              "text": "Explains squeeze conservatively.",
              "accept": "It removes singleton axes; verify the loaded array is truly one-dimensional, not multi-channel."
            }
          ],
          "modelAnswer": [
            "Nbins is 20000. time is a length-20000 vector from zero to 19999/20000 seconds, or 0.99995 seconds. Dividing indices by the sample rate gives seconds. squeeze removes size-one dimensions, not an arbitrary channel dimension; inspect the shape before treating the result as one electrode vector. The missing MAT file prevents checking its actual dimensions or values."
          ],
          "pitfalls": [
            "Putting sample indices on an axis labelled seconds.",
            "Assuming the final sample is at exactly one second."
          ],
          "sources": [
            {
              "source": "exercise2",
              "cell": 2
            },
            {
              "source": "exercise2",
              "cell": 4
            },
            {
              "source": "exercise2",
              "cell": 6
            }
          ],
          "code": "Nbins = 1 * sampling_frequency\ntime = np.arange(Nbins)/sampling_frequency\naxs[0].plot(time, electrode_activity[0:Nbins],'k',linewidth=0.5)",
          "codeContext": "Exact cell 6 statements. Cell 4 imports NumPy as np and matplotlib.pyplot as plt, sets sampling_frequency=20000 and loads/squeezes the signal. No missing-data cell is executed."
        },
        {
          "id": "L02-code-crossing",
          "title": "Explain the threshold index offset",
          "prompt": "Explain the two sliced arrays and spks. Does spks identify the below-threshold sample? What would change if the trace remained below threshold for several samples?",
          "kind": "code",
          "rubric": [
            {
              "id": "L02-code-crossing-c1",
              "text": "Explains equal-length adjacent slices.",
              "accept": "For a length-L trace both slices have L−1 entries, comparing x[j+1] with x[j]."
            },
            {
              "id": "L02-code-crossing-c2",
              "text": "Identifies downward crossings.",
              "accept": "Earlier value greater than thr and later value less than thr."
            },
            {
              "id": "L02-code-crossing-c3",
              "text": "Explains tuple unpacking and index offset.",
              "accept": "np.where returns a tuple; spks stores j, the earlier-sample index; later sample is j+1."
            },
            {
              "id": "L02-code-crossing-c4",
              "text": "Distinguishes event onset from duration.",
              "accept": "A sustained below-threshold run has one entering crossing, not one event per sample; equality is excluded."
            }
          ],
          "modelAnswer": [
            "The two length-L−1 slices compare successive values. Multiplication combines the boolean inequalities. np.where returns the positions where both are true and the comma unpacks its one-array tuple. A returned j corresponds to filtered[j] above and filtered[j+1] below threshold, so the later sample is j+1. Several below-threshold samples do not each produce a new crossing. The strict comparisons also exclude exact equality. A crossing is not the waveform minimum or proof of a distinct neuron."
          ],
          "pitfalls": [
            "Calling every negative sample a separate spike.",
            "Silently centering on the later sample while retaining the earlier index."
          ],
          "sources": [
            {
              "source": "exercise2",
              "cell": 11
            },
            {
              "source": "exercise2",
              "cell": 12
            },
            {
              "source": "exercise2",
              "cell": 13
            }
          ],
          "code": "spks, = np.where((electrode_activity_filtered[1:]<thr)*(electrode_activity_filtered[:-1]>thr))",
          "codeContext": "Exact line from Exercise2 cell 12. NumPy is np in cell 4; the filtered vector is defined in cell 9. thr is a source-selected negative threshold, not a universal recommendation."
        },
        {
          "id": "L02-code-waveforms",
          "title": "Explain the 51-bin waveform matrix",
          "prompt": "Explain both slice endpoints, the transpose and the time axis. State the matrix shape using an unspecified number of valid spikes. What must be checked near recording boundaries and relative to the crossing index?",
          "kind": "code",
          "rubric": [
            {
              "id": "L02-code-waveforms-c1",
              "text": "Counts the slice correctly.",
              "accept": "s−25 through s+25 inclusive, because stop s+26 is excluded: 51 samples."
            },
            {
              "id": "L02-code-waveforms-c2",
              "text": "Explains the transpose.",
              "accept": "The list has spikes as rows, then .T produces 51 time-bin rows by valid-spike columns."
            },
            {
              "id": "L02-code-waveforms-c3",
              "text": "Converts offsets to milliseconds.",
              "accept": "At 20000 samples/second, offsets are from $-1.25$ to $+1.25\\,\\mathrm{ms}$ in $0.05\\,\\mathrm{ms}$ steps."
            },
            {
              "id": "L02-code-waveforms-c4",
              "text": "Checks validity and alignment.",
              "accept": "Require s≥25 and s+26≤record length; choose whether to shift the earlier crossing index by one."
            }
          ],
          "modelAnswer": [
            "Each slice contains 51 samples if it lies within the trace. Before transpose the stacked list has one row per spike; afterward waveforms has 51 rows and one column per valid spike. The time vector has 51 entries from −1.25 to +1.25 milliseconds, in 0.05 millisecond steps. Reject or separately handle boundary events, rather than allowing negative-index wrapping or short slices. Cell 12 returns the earlier crossing index; the written code centers on that index, not automatically on the next sample or trough."
          ],
          "pitfalls": [
            "Using an invented number of spikes as the matrix column count.",
            "Ignoring truncated slices or claiming waveform groups establish cell identity."
          ],
          "sources": [
            {
              "source": "exercise2",
              "cell": 12
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
              "cell": 16
            }
          ],
          "code": "waveforms = np.array([electrode_activity_filtered[s-25:s+26] for s in spks]).T\ntime_ms = np.arange(-25, 26)/sampling_frequency*1000",
          "codeContext": "Exact executable lines from Exercise2 cell 15. np is NumPy; sampling_frequency=20000. The shape claim is conditional on valid equal-length slices, not a verified notebook output."
        }
      ]
    }
  ],
  "finalWritten": [
    {
      "id": "L02-written-fourier",
      "title": "Explain Fourier transform to a newcomer",
      "prompt": "In about five minutes: (1) define Fourier transform in 1–2 sentences; (2) connect it to one electrode recording and specify input/output formats and axes; (3) sketch a time trace and its spectrum with labelled axes, or describe that sketch in text; (4) explain uses, limitations and risks of overinterpretation. Equations are optional, following L07 page 2. The earlier L02 page 5 equation is available in the theory.",
      "kind": "written",
      "rubric": [
        {
          "id": "L02-written-fourier-c1",
          "text": "Defines an oscillatory change of basis.",
          "accept": "Re-express sampled values using sine/cosine components."
        },
        {
          "id": "L02-written-fourier-c2",
          "text": "Specifies the input and output.",
          "accept": "Length-N uniformly sampled voltage vector to length-N complex coefficient vector; frequency index requires sample rate for hertz."
        },
        {
          "id": "L02-written-fourier-c3",
          "text": "Describes a labelled time trace.",
          "accept": "Horizontal time in seconds; vertical voltage, with its measurement unit."
        },
        {
          "id": "L02-written-fourier-c4",
          "text": "Describes a labelled spectrum.",
          "accept": "Horizontal frequency in hertz; vertical squared coefficient magnitude under the stated convention."
        },
        {
          "id": "L02-written-fourier-c5",
          "text": "Gives a useful application.",
          "accept": "Identify strong frequencies or select components for filtering."
        },
        {
          "id": "L02-written-fourier-c6",
          "text": "Explains limitations and overinterpretation.",
          "accept": "Power loses phase and event timing; sampling and artifacts constrain interpretation; peaks are not diagnoses."
        }
      ],
      "modelAnswer": [
        "Fourier transform expresses a sampled signal as contributions from sine and cosine components. For an electrode, the input is a vector of voltage samples at equally spaced times, and the output is a same-length complex coefficient vector indexed by frequency. Coefficient magnitude and phase encode size and alignment; squared magnitude gives the slide power spectrum.",
        "Sketch reference, described in words: draw voltage against seconds with oscillations, then draw squared coefficient magnitude against frequency in hertz, with peaks at the oscillation frequencies. The original hypothetical diagram in the theory is a labelled example. This helps inspect rhythms and choose filters. A whole-record power plot loses phase and local timing, sampling can alias frequencies, and peaks can reflect artifacts. Neither a peak nor a filtered trace alone establishes a biological cause."
      ],
      "pitfalls": [
        "Giving only an equation without formats or axes.",
        "Calling the coefficient vector a power vector or identifying a spectral peak as a specific cell."
      ],
      "sources": [
        {
          "source": "spectral",
          "pages": "5–11"
        },
        {
          "source": "spectral",
          "pages": "13"
        },
        {
          "source": "spectral",
          "pages": "23"
        },
        {
          "source": "spectral",
          "pages": "37"
        },
        {
          "source": "advanced",
          "pages": "2"
        }
      ]
    },
    {
      "id": "L02-written-filter",
      "title": "Defend filtering when an oscillation appears",
      "prompt": "Hypothetical practice: a sharp low-pass filter removes fast fluctuations but creates ripples near an abrupt event. Explain a plausible processing mechanism, sketch or describe its frequency window and temporal effect with labelled axes, propose a less abrupt alternative, and describe how you would test whether biological information was lost.",
      "kind": "written",
      "rubric": [
        {
          "id": "L02-written-filter-c1",
          "text": "Links ripples to sharp truncation.",
          "accept": "Rectangular frequency window has an oscillatory temporal response."
        },
        {
          "id": "L02-written-filter-c2",
          "text": "Labels both sketches.",
          "accept": "Filter gain against frequency; reconstructed voltage against time near the event."
        },
        {
          "id": "L02-written-filter-c3",
          "text": "Proposes gradual attenuation with a trade-off.",
          "accept": "A smooth transition can reduce ringing while blurring the cutoff."
        },
        {
          "id": "L02-written-filter-c4",
          "text": "Compares before and after responsibly.",
          "accept": "Check preserved event morphology and spectral content on comparable axes; no new biological rhythm claim."
        }
      ],
      "modelAnswer": [
        "A sharp rectangular low-pass window has a sinc-shaped temporal response, so it can add ripples around an abrupt event. Sketch gain against frequency as a sharp step, then voltage against time with oscillations near the event. Replace the abrupt transition with smoother attenuation and state that frequency selection becomes less sharp. Compare raw and reconstructed traces and spectra, especially event shape and timing. Cleaner appearance does not prove that the removed signal was noise or that new ripples are biological."
      ],
      "pitfalls": [
        "Calling every new ripple a genuine rhythm.",
        "Promising that a smooth window preserves all desired information."
      ],
      "sources": [
        {
          "source": "spectral",
          "pages": "13–19"
        },
        {
          "source": "spectral",
          "pages": "20–22"
        }
      ]
    },
    {
      "id": "L02-written-time-frequency",
      "title": "Choose a representation for a changing signal",
      "prompt": "Hypothetical practice: two recordings have similar whole-record power spectra but contain short bursts at different times. Choose a time-resolved analysis and explain its input/output axes, a labelled sketch or text equivalent, what color represents, and a limitation. Use the songbird and EEG examples to distinguish a useful pattern from proof of biological origin.",
      "kind": "written",
      "rubric": [
        {
          "id": "L02-written-time-frequency-c1",
          "text": "Explains the insufficiency of pooled power.",
          "accept": "Whole-record power does not localize bursts in time."
        },
        {
          "id": "L02-written-time-frequency-c2",
          "text": "Names a valid construction.",
          "accept": "Successive-window Fourier spectrogram or shifted/scaled wavelet analysis."
        },
        {
          "id": "L02-written-time-frequency-c3",
          "text": "Labels a sketch and the color quantity.",
          "accept": "Time horizontally, frequency or scale vertically, with coefficient or power defined."
        },
        {
          "id": "L02-written-time-frequency-c4",
          "text": "States a resolution limitation.",
          "accept": "Window/wavelet choices trade time localization and frequency detail."
        },
        {
          "id": "L02-written-time-frequency-c5",
          "text": "Avoids biological overinterpretation.",
          "accept": "Repeated syllable patterns can be compared, but large EEG coefficients may be artifacts or neural signal."
        }
      ],
      "modelAnswer": [
        "A whole-record power spectrum can pool similar amounts of frequency content while missing when it appeared. Use a successive-window Fourier spectrogram or a wavelet map. Sketch time horizontally and frequency or scale vertically, with a localized patch at each burst. Label color as power if plotting squared magnitudes, or as signed coefficients for the Exercise2 display. Window or wavelet choice limits localization and frequency detail. Song patterns aid syllable comparison; EEG patches still need artifact checks and do not establish their origin from appearance alone."
      ],
      "pitfalls": [
        "Using a frequency axis as if it were an event-time axis.",
        "Calling the notebook signed CWT image nonnegative power."
      ],
      "sources": [
        {
          "source": "spectral",
          "pages": "23–32"
        },
        {
          "source": "spectral",
          "pages": "41–43"
        },
        {
          "source": "exercise2",
          "cell": 6
        }
      ]
    },
    {
      "id": "L02-written-pipeline",
      "title": "Defend your own spike preprocessing code",
      "prompt": "Explain Exercise2 from the electrode vector to waveform columns. Defend sample/time units, filter purpose and the conflicting cutoff expressions, threshold-crossing alignment and 51-bin slicing. Name what must be checked before interpreting waveform groups, and what you cannot verify without the MAT file. You may refer to the code excerpts above.",
      "kind": "written",
      "rubric": [
        {
          "id": "L02-written-pipeline-c1",
          "text": "Traces data and timing.",
          "accept": "One electrode vector; sample index divided by sample rate gives seconds."
        },
        {
          "id": "L02-written-pipeline-c2",
          "text": "Qualifies the filter implementation.",
          "accept": "High-pass attenuates slow changes; wc conventions conflict and actual response must be checked."
        },
        {
          "id": "L02-written-pipeline-c3",
          "text": "Explains the crossing convention.",
          "accept": "The source returns earlier indices; decide deliberately whether to add one."
        },
        {
          "id": "L02-written-pipeline-c4",
          "text": "Explains waveform axes and boundaries.",
          "accept": "51 time-bin rows by valid-spike columns, with equal-length in-bounds windows."
        },
        {
          "id": "L02-written-pipeline-c5",
          "text": "States the interpretation boundary.",
          "accept": "Cannot verify counts, threshold quality, shape preservation or cell count without data; clustering remains later work."
        }
      ],
      "modelAnswer": [
        "Start with the described one-electrode vector and convert sample indices to seconds using the sample rate. Inspect the trace and CWT before choosing a high-pass setting. The submitted and help cutoff expressions use different conventions; examine the actual filter response and compare raw/filtered waveforms. The threshold test detects a downward adjacent-sample crossing and returns the earlier index, so define alignment explicitly. Extract only valid 51-bin windows and transpose into time-bin rows and spike columns. Overlay shapes to motivate later PCA and clustering, without identifying one cell per apparent group. The missing MAT file prevents verifying counts, selected thresholds, or saved conclusions."
      ],
      "pitfalls": [
        "Presenting submitted notebook comments as newly verified measurements.",
        "Claiming a universal cutoff/threshold or a verified number of cells."
      ],
      "sources": [
        {
          "source": "exercise2",
          "cell": 2
        },
        {
          "source": "exercise2",
          "cell": 4
        },
        {
          "source": "exercise2",
          "cell": 6
        },
        {
          "source": "exercise2",
          "cell": 8
        },
        {
          "source": "exercise2",
          "cell": 9
        },
        {
          "source": "exercise2",
          "cell": 10
        },
        {
          "source": "exercise2",
          "cell": 11
        },
        {
          "source": "exercise2",
          "cell": 12
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
          "cell": 16
        },
        {
          "source": "exercise2",
          "cell": 17
        }
      ]
    }
  ],
  "lectureQuiz": []
};
