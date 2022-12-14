interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
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
}

const getDescription = (rating: number): string => {
    switch(rating){
        case 1:
            return 'you were far from achieving your target';
        case 2:
            return 'not bad but could be better';
        case 3:
            return 'good job! You either achieved your target or are very close!';

    }
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));