interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExercisesValues {
  hours: Array<number>;
  target: number;
}

const parseExercisesArguments = (args: Array<string>): ExercisesValues => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const [, , target, ...hours] = args;

  const hoursToNum = hours.map((h) => Number(h));

  if (Number(target) < 0 || isNaN((Number(target)))) {
    throw new Error("Target must be a positive number");
  } else if (!hours.length) {
    throw new Error("Exercise hours array can't be empty");
  } else if (!hoursToNum.some(isNaN) && !hoursToNum.some((h) => h < 0)) {
    return {
      target: Number(target),
      hours: hoursToNum,
    };
  } else {
    throw new Error("Provided values must be a positive numbers!");
  }
};

const ratingCalculator = (
  average: number,
  target: number
): { value: number; description: string } => {
  if (average <= target * 0.9) {
    return {
      value: 3,
      description: "not good",
    };
  } else if (average < target) {
    return {
      value: 2,
      description: "not too bad but could be better",
    };
  }
  return {
    value: 1,
    description: "very good",
  };
};

const calculateExercises = (hours: Array<number>, target: number): Report => {
  const periodLength: number = hours.length;
  const sum: number = hours.reduce((acc, curr) => (acc += curr), 0);
  const average: number = sum / periodLength;
  const trainingDays: number = hours.filter((h) => h !== 0).length;
  const ratingInfo = ratingCalculator(average, target);

  return {
    periodLength,
    trainingDays,
    success: average >= target * 0.9,
    rating: ratingInfo.value,
    ratingDescription: ratingInfo.description,
    target,
    average,
  };
};

try {
  const { hours, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
