const calculateBmi = (heightCM: number, weightKG: number): string => {
  if (heightCM < 0 || weightKG < 0) {
    throw new Error("height and weight can't be negative");
  }

  const bmi = weightKG / (heightCM / 100) ** 2;
  if (bmi < 18.5) return "Underweight (unhealthy weight)";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight (unhealthy weight)";
  else return "Obese (unhealthy weight)";
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
