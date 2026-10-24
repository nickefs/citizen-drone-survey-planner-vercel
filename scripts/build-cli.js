const { spawnSync } = require("node:child_process");
const path = require("node:path");

const output = path.join(__dirname, "..", process.platform === "win32" ? "survey_cli.exe" : "survey_cli");
const result = spawnSync("g++", [
  "-O2", "-std=c++17",
  path.join(__dirname, "..", "cpp", "nqt_survey.cpp"),
  path.join(__dirname, "..", "cpp", "survey_cli.cpp"),
  "-I" + path.join(__dirname, "..", "cpp"),
  "-o", output,
], { stdio: "inherit" });

if (result.error) {
  console.error("C++ compiler is required to build the survey planner:", result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
