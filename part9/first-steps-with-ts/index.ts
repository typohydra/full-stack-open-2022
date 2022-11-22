import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import {
  calculateExercises,
} from "./exerciseCalculator";
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (
    Number(height) < 0 ||
    Number(weight) < 0 ||
    isNaN(Number(height)) ||
    isNaN(Number(weight))
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  }

  res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises: hours, target } = req.body;

  if(!Array.isArray(hours)) {
    res.status(400).send({ error: "malformatted parameters: daily exercises must be an array of numbers" });
  }

  const hoursToNum = hours.map((h: number) => Number(h));

  if (target === undefined || hours === undefined) {
    res.status(400).send({ error: "parameters missing" });
  } else if (
    isNaN(Number(target)) || Number(target) < 0
  ) {
    res.status(400).send({ error: "malformatted parameters: target must be a positive number" });
  } else if (
    !hours.length ||
    hoursToNum.some(isNaN) ||
    hoursToNum.some((h: number) => h < 0)
  ) {
    res.status(400).send({ error: "malformatted parameters: daily exercises array should contain positive numbers" });
  }

  res.send(calculateExercises(hoursToNum, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
