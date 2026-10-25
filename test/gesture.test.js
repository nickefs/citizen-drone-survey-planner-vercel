const test = require('node:test');
const assert = require('node:assert/strict');
const { isStationaryTap } = require('../public/gesture');

const start = { id: 1, x: 120, y: 200, scrollY: 0 };

test('a short stationary tap places a corner', () => {
  assert.equal(isStationaryTap(start, { pointerId: 1, clientX: 123, clientY: 203 }, 180, 0), true);
});

test('dragging, scrolling, holding, or another pointer cannot place a corner', () => {
  assert.equal(isStationaryTap(start, { pointerId: 1, clientX: 145, clientY: 210 }, 180, 0), false);
  assert.equal(isStationaryTap({ ...start, moved: true }, { pointerId: 1, clientX: 120, clientY: 200 }, 180, 0), false);
  assert.equal(isStationaryTap(start, { pointerId: 1, clientX: 120, clientY: 200 }, 180, 30), false);
  assert.equal(isStationaryTap(start, { pointerId: 1, clientX: 120, clientY: 200 }, 700, 0), false);
  assert.equal(isStationaryTap(start, { pointerId: 2, clientX: 120, clientY: 200 }, 180, 0), false);
});
