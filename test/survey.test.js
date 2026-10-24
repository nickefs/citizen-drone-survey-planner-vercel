const test = require("node:test");
const assert = require("node:assert/strict");
const { runSurvey } = require("../lib/run-survey");

const polygon = [
  { lat: 39.1010, lon: 26.4395 },
  { lat: 39.1015, lon: 26.4405 },
  { lat: 39.1008, lon: 26.4410 },
];

test("generates survey waypoints with the original C++ engine", async () => {
  const result = await runSurvey({ polygon, altitude_m: 10, home: { lat: 39.1012, lon: 26.4398 } });
  assert.ok(result.waypoints.length > 0);
  assert.equal(result.waypoints[0].type, "Turnaround");
  assert.ok(Math.abs(result.waypoints[0].lat - 39.10104017) < 0.000001);
});

test("rejects malformed polygon coordinates", () => {
  assert.throws(() => runSurvey({ polygon: [{ lat: 91, lon: 0 }, ...polygon] }), { status: 400 });
});
