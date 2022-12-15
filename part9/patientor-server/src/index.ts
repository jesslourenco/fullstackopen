import express from 'express';
import cors from 'cors';
import diagnoseRouters from './routes/diagnoseRouters';

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3001;


app.use('/', diagnoseRouters);

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});