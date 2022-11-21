interface BmiValues {
  heightCM: number;
  weightKG: number;
}

const parseBmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 3) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const [, , height, weight] = args;

  if (Number(height) < 0 || Number(weight) < 0) {
    throw new Error("height and weight can't be negative");
  } else if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      heightCM: Number(args[2]),
      weightKG: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (heightCM: number, weightKG: number): string => {
  const bmi = weightKG / (heightCM / 100) ** 2;
  if (bmi < 18.5) return "Underweight (unhealthy weight)";
  else if (bmi < 25) return "Normal (healthy weight)";
  else if (bmi < 30) return "Overweight (unhealthy weight)";
  else return "Obese (unhealthy weight)";
};

try {
  const { heightCM, weightKG } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightCM, weightKG));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
