import assert from 'node:assert/strict';
import { checkQuantity, parseQuantity } from '../src/js/numeric.js';
const answer = { value: 6, tolerance: 0.01, unit: 'mV' };
for (const text of ['6', '6 mV', '0.006 V', '6000 uV', '6000 µV', '6,0 mV', '6e-3 V']) assert.equal(checkQuantity(text, answer).correct, true, text);
for (const text of ['-6 mV', '6 V', '0 mV']) assert.equal(checkQuantity(text, answer).correct, false, text);
for (const text of ['', 'Infinity', '6 nA', '6 unknown', '6 mV extra']) assert.ok(checkQuantity(text, answer).error, text);
assert.equal(parseQuantity('3 MΩ', 'ohm').value, 3e6);
assert.equal(parseQuantity('2 µm²', 'm2').value, 2e-12);
console.log('Numeric input checks: equivalent units, dimensions, signs, prefixes and invalid input PASS.');
assert.equal(checkQuantity('1 uF/cm2', {value:.01,unit:'F/m2',tolerance:1e-8}).correct,true);
assert.equal(checkQuantity('5 nm', {value:5e-9,unit:'m',tolerance:1e-12}).correct,true);
assert.ok(checkQuantity('5 m2', {value:5e-9,unit:'m',tolerance:1e-12}).error);
assert.equal(checkQuantity('-0.096485 A/m2', {value:-.096485,unit:'A/m2',tolerance:1e-8}).correct,true);
console.log('L01 numeric dimensions: membrane area density, nanometres, current density and incompatible dimensions PASS.');

// Charge-scale regression: a fixed machine epsilon must not swallow a wrong femtocoulomb answer.
assert.equal(checkQuantity('0', { value: 2e-16, unit: 'C', tolerance: 1e-19 }).correct, false);
assert.equal(checkQuantity('0.2 fC', { value: 2e-16, unit: 'C', tolerance: 1e-19 }).correct, true);
console.log('Sub-femtocoulomb tolerance regression PASS.');
