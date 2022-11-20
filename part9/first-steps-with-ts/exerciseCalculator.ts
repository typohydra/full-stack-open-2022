interface Report {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Number;
  ratingDescription: string;
  target: Number;
  average: number;
}

const ratingCalculator = (average: number, target: number): {value: number, description: string}  => {
  if(average <= target * 0.9) {
    return {
      value: 3,
      description: 'not good'
    }
  }
  else if(average < target)  {
    return {
      value: 2,
      description: 'not too bad but could be better'
    }
  }
  return {
    value: 1,
    description: 'very good'
  }
}

const calculateExercises = (hours: Array<number>, target: number): Report => {
  const periodLength: number = hours.length;
  const sum: number = hours.reduce((acc, curr) => acc += curr , 0);
  const average: number = sum / periodLength;
  const trainingDays: number = hours.filter(h => h !== 0).length;
  const ratingInfo = ratingCalculator(average, target);
  
  return {
    periodLength,
    trainingDays,
    success: average >= target * 0.9,
    rating: ratingInfo.value,
    ratingDescription: ratingInfo.description,
    target,
    average,
  }  
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
