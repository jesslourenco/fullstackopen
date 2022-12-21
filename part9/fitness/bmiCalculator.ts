const calculateBmi = (height: number, weight: number): string => {
    const result = (weight / (height * height)) * 10000;

    if (result < 16.0) {
        return 'Severely Underweight';
    }
    else if (result >= 16.0 && result <= 16.9) {
        return 'Moderately Underweight';
    }
    else if (result >= 17 && result <= 18.4) {
        return 'Mildly Underweight';
    }
    else if (result >= 18.5 && result <= 24.9) {
        return 'Normal range (healthy weight)';
    }
    else if (result >= 25 && result <= 29.99) {
        return 'Overweight (pre-obese)';
    }
    else if (result >= 30 && result <= 34.9) {
        return 'Obese Class I';
    }
    else if (result >= 35 && result <= 39.9) {
        return 'Obese Class II';
    }
    else {
        return 'Obese Class III';
    }
};

export default calculateBmi;

/* code for command line

interface Args {
    height: number;
    weight: number
};

const parseArgs = (input: string[]): Args => {
    if (input.length < 4) throw new Error('Not enough arguments');
    if (input.length > 4) throw new Error('Too many arguments');
    if (isNaN(Number(input[2])) || isNaN(Number(input[3]))) 
        throw new Error('Please provide numbers only!');

    const height = Number(input[2]);
    const weight = Number(input[3]);

    return { height, weight };
}


try{
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight))
} catch (error: unknown){
    if (error instanceof Error){
        console.log('Error: ', error.message);
    }
} */