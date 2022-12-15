import express from 'express';
import cors from 'cors';
import diagnoseRouters from './routes/diagnoseRouters';
import patientRouters from './routes/patientRouters';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/', diagnoseRouters);
app.use('/', patientRouters);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});