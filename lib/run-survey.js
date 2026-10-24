const { spawn } = require("child_process");
const path = require("path");

function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

function numberInRange(value, fallback, min, max) {
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max ? n : fallback;
}

function runSurvey(body) {
  if (!body || typeof body !== "object") throw badRequest("Invalid request");
  const polygon = body.polygon;
  if (!Array.isArray(polygon) || polygon.length < 3 || polygon.length > 200) {
    throw badRequest("Polygon must have 3 to 200 vertices");
  }
  for (const point of polygon) {
    if (!point || !Number.isFinite(Number(point.lat)) || !Number.isFinite(Number(point.lon)) ||
        Math.abs(Number(point.lat)) > 90 || Math.abs(Number(point.lon)) > 180) {
      throw badRequest("Invalid polygon coordinates");
    }
  }
  const camera = body.camera && typeof body.camera === "object" ? body.camera : {};
  const altitude = numberInRange(body.altitude_m, 10, 1, 500);
  const args = [
    String(altitude),
    "--sensor-width", String(numberInRange(camera.sensor_width_mm, 3.68, 0.1, 100)),
    "--sensor-height", String(numberInRange(camera.sensor_height_mm, 2.76, 0.1, 100)),
    "--focal-length", String(numberInRange(camera.focal_length_mm, 3.04, 0.1, 200)),
    "--image-width", String(Math.round(numberInRange(camera.image_width_px, 3280, 1, 20000))),
    "--image-height", String(Math.round(numberInRange(camera.image_height_px, 2474, 1, 20000))),
    "--front-overlap", String(numberInRange(camera.front_overlap_pct, 25, 0, 95)),
    "--side-overlap", String(numberInRange(camera.side_overlap_pct, 25, 0, 95)),
    "--turnaround", String(numberInRange(body.turnaround_m, 3, 0, 100)),
  ];
  if (body.home && typeof body.home === "object") {
    const lat = Number(body.home.lat);
    const lon = Number(body.home.lon);
    if (Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180) {
      args.push("--home", String(lat), String(lon));
    }
  }
  const binName = process.platform === "win32" ? "survey_cli.exe" : "survey_cli";
  const binPath = path.join(__dirname, "..", binName);
  return new Promise((resolve, reject) => {
    const child = spawn(binPath, args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const fail = (error) => { if (!settled) { settled = true; reject(error); } };
    const timer = setTimeout(() => child.kill(), 20000);
    child.stdout.on("data", chunk => {
      stdout += chunk;
      if (stdout.length > 8 * 1024 * 1024) child.kill();
    });
    child.stderr.on("data", chunk => { stderr += chunk; });
    child.on("error", fail);
    child.on("close", code => {
      clearTimeout(timer);
      if (settled) return;
      if (code !== 0) return fail(new Error(`Survey engine exited with ${code}: ${stderr.slice(0, 500)}`));
      try {
        const result = JSON.parse(stdout);
        if (!Array.isArray(result.waypoints)) throw new Error("Missing waypoints");
        settled = true;
        resolve(result);
      } catch (error) { fail(error); }
    });
    child.stdin.on("error", fail);
    child.stdin.end(polygon.map(p => `${Number(p.lat)} ${Number(p.lon)}\n`).join(""));
  });
}

module.exports = { runSurvey };
