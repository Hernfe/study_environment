import assert from 'node:assert/strict';
import { checkQuantity, parseQuantity } from '../src/js/numeric.js';
const answer = { value: 6, tolerance: 0.01, unit: 'mV' };
for (const text of ['6', '6 mV', '0.006 V', '6000 uV', '6000 µV', '6,0 mV', '6e-3 V']) assert.equal(checkQuantity(text, answer).correct, true, text);
for (const text of ['-6 mV', '6 V', '0 mV']) assert.equal(checkQuantity(text, answer).correct, false, text);
for (const text of ['', 'Infinity', '6 nA', '6 unknown', '6 mV extra']) assert.ok(checkQuantity(text, answer).error, text);
assert.equal(parseQuantity('3 MΩ', 'ohm').value, 3e6);
assert.equal(parseQuantity('2 µm²', 'm2').value, 2e-12);
console.log('Numeric input checks: equivalent units, dimensions, signs, prefixes and invalid input PASS.');
