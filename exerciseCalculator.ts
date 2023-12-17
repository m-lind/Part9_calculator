interface IResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ITargetAndHours {
  hours: number[];
  target: number;
}

export type hours = string[];

const parseExerciseArguments = (args: string[]): ITargetAndHours => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hourArgs = args.slice(3);

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error("Target value is not a number!");
  }

  const hours = hourArgs.map(hour => {
    const parsedHour = Number(hour);

    if (isNaN(parsedHour)) {
      throw new Error("Provided hour value is not a number!");
    }
    return parsedHour;
  });

  return {
    target,
    hours,
  };
};

export const calculateExercises = (
  target: number,
  hours: number[]
): IResult => {
  const trainingDaysArray = hours.filter(hoursPerDay => hoursPerDay !== 0);
  const sumOfHours = hours.reduce((sum, dailyHours) => sum + dailyHours, 0);
  const averageHours = sumOfHours / hours.length;
  const success = averageHours >= target;

  const calculateRating = () => {
    const ratingNumber = Math.round(averageHours);
    if (ratingNumber > target) {
      return 3;
    } else if (ratingNumber === target) {
      return 2;
    } else {
      return 1;
    }
  };

  const describeRating = () => {
    const ratingFigure = calculateRating();
    if (ratingFigure === 3) {
      return "Great job, keep up the good work!";
    } else if (ratingFigure === 2 && success) {
      return "You've reached your goal, nice!";
    } else if (ratingFigure === 2 && !success) {
      return "Almost there!";
    } else {
      return "You'll get there, don't worry!";
    }
  };

  return {
    periodLength: hours.length,
    trainingDays: trainingDaysArray.length,
    success: success,
    rating: calculateRating(),
    ratingDescription: describeRating(),
    target: target,
    average: averageHours,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, hours));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
