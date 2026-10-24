const { runSurvey } = require("../lib/run-survey");

module.exports = async (request, response) => {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    response.json(await runSurvey(body));
  } catch (error) {
    if (error.status === 400 || error instanceof SyntaxError) {
      return response.status(400).json({ error: error.message });
    }
    console.error("Survey failed:", error);
    response.status(500).json({ error: "Survey calculation failed" });
  }
};
