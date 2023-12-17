import express = require("express");
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, hours } from "./exerciseCalculator";

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

app.use(express.json());

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  const daily_exercises_array: number[] = (daily_exercises as hours)
    .map(hour => Number(hour))
    .filter(parsedHour => !isNaN(parsedHour));

  if (
    daily_exercises_array.length !== (daily_exercises as hours).length ||
    isNaN(Number(target))
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(Number(target), daily_exercises_array);
  return res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
