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
  assert.ok(result.waypoints[0].lat > 39.1005 && result.waypoints[0].lat < 39.102);
  assert.equal(result.waypoints[0].alt_m, 10);
});

test("home selects a survey start near takeoff without exporting a home waypoint", async () => {
  const southwestHome = { lat: 39.1, lon: 26.439 };
  const southeastHome = { lat: 39.1, lon: 26.442 };
  const [southwest, southeast] = await Promise.all([
    runSurvey({ polygon, altitude_m: 30, home: southwestHome }),
    runSurvey({ polygon, altitude_m: 30, home: southeastHome }),
  ]);
  assert.ok(southwest.waypoints[0].lon < 26.44, "southwest Home should start on the nearby side");
  assert.ok(southeast.waypoints[0].lon > 26.44, "southeast Home should start on the nearby side");
  assert.ok(southwest.waypoints.every(point => point.type !== "Home"));
  assert.ok(southeast.waypoints.every(point => point.type !== "Home"));
});

test("rejects malformed polygon coordinates", () => {
  assert.throws(() => runSurvey({ polygon: [{ lat: 91, lon: 0 }, ...polygon] }), { status: 400 });
});

test("requires valid Home coordinates before generating a survey", () => {
  assert.throws(() => runSurvey({ polygon, altitude_m: 10 }), { status: 400, message: "Home point is required" });
  assert.throws(() => runSurvey({ polygon, home: { lat: "39.1012", lon: 26.4398 } }), { status: 400, message: "Invalid home coordinates" });
  assert.throws(() => runSurvey({ polygon, home: { lat: 91, lon: 26.4398 } }), { status: 400, message: "Invalid home coordinates" });
});
