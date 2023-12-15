import express = require("express");
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

const PORT = 3003;

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight) && height && weight) {
    const result = calculateBmi(height, weight);
    res.send({ height: height, weight: weight, bmi: result });
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
