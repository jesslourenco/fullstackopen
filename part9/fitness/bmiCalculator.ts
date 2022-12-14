const calculateBmi = (height: number, weight: number): string => {
    const result = (weight / ( height * height)) * 10000;

    if(result < 16.0){
        return 'Severely Underweight';
    } 
    else if (result >= 16.0 && result <= 16.9){
        return 'Moderately Underweight';
    }
    else if (result >= 17 && result <= 18.4){
        return 'Mildly Underweight';
    }
    else if (result >= 18.5 && result <= 24.9){
        return 'Normal range (healthy weight)';
    } 
    else if (result >= 25 && result <= 29.99){
        return 'Overweight (pre-obese)';
    }
    else if (result >= 30 && result <= 34.9){
        return 'Obese Class I';
    }
    else if (result >= 35 && result <= 39.9){
        return 'Obese Class II';
    }
    else{
        return 'Obese Class III'
    }
}

console.log(calculateBmi(180, 74));
console.log(calculateBmi(163, 73));