const express = require("express");
const path = require("path");
const { runSurvey } = require("./lib/run-survey");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "64kb" }));
app.get("/ping", (_req, res) => res.send("pong"));
app.post("/api/survey", async (req, res) => {
  try {
    res.json(await runSurvey(req.body));
  } catch (error) {
    if (error.status === 400) return res.status(400).json({ error: error.message });
    console.error("Survey failed:", error);
    res.status(500).json({ error: "Survey calculation failed" });
  }
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}

module.exports = app;
