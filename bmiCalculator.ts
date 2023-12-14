interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BodyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (h: number, w: number) => {
  if (h === 0 || w === 0) throw new Error("Height and/or weight can't be 0!");
  const heightInMeters = h / 100;
  const bmi = w / (heightInMeters * heightInMeters);

  if (bmi < 15) {
    return "Very severly underweight";
  } else if (bmi >= 15.0 && bmi < 16.0) {
    return "Severly underweight";
  } else if (bmi >= 16.0 && bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Very severely obsese";
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
