import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json()); //allows to receive req.body as json

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi(height, weight);

    const data = { height, weight, bmi };

    res.json(data);
});

app.post('/exercise', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const hours = req.body.hours;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target = req.body.target;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if(Array.isArray(hours)){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const checkHours = hours.every((e: unknown) => {
            return !isNaN(Number(e));
        });
        if(!checkHours) return res.status(400).send({ error: 'malformatted parameters' });
    } else {
        return res.status(400).send({ error: 'malformatted parameters' });
    }
    
    if (!hours || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    } else if (isNaN(Number(target))) {
        return res.status(400).send({ error: 'malformatted parameters' });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const exerciseData = calculateExercises(hours, target);

    return res.json(exerciseData);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});