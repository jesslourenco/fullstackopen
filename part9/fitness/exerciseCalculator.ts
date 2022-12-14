interface Arguments {
    target: number;
    hours: number[]
}

const parseArguments = (input: string[]): Arguments => {
    const args = input.slice(2,input.length);

    const checkArgs = args.every(e => {
        return !isNaN(Number(e));
    });

    if(!checkArgs) throw new Error('Please provide numbers only!');

    let target = 0;
    const hours = [];

    for(let i = 0; i < args.length; i++){
        if( i === 0){
            target = Number(args[i]);
        } else {
            hours.push(Number(args[i]));
        }
    }

    return { hours, target };
};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string | undefined,
    target: number,
    average: number
}

const calculateScore = (average: number, target: number): number => {
    const rate = average / target;
    if(rate < 0.3){
        return 1;
    } else if(rate >= 0.3 && rate < 0.6){
        return 2;
    } else {
        return 3;
    }
};

const getDescription = (rating: number): string | undefined => {
    switch(rating){
        case 1:
            return 'you were far from achieving your target';
        case 2:
            return 'not bad but could be better';
        case 3:
            return 'good job! You either achieved your target or are very close!';
        default:
            return undefined;
    }
};

const calculateExercises = (hours: number[], target: number): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.reduce((days, h) => (h > 0) ? days + 1 : days, 0);
    const sum = hours.reduce((sum, h) => sum + h, 0);
    const average = (sum / periodLength);
    const success = average >= target ? true : false;
    const rating = calculateScore(average, target);
    const ratingDescription = getDescription(rating);

    return ({
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    });
};

try{
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown){
    if (error instanceof Error){
        console.log('Error: ', error.message);
    }
}


