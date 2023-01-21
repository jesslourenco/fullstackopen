import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/api/diagnoses', (_req, res) => {
  const data = diagnoseService.getDiagnoses();
  res.send(data);
});

export default router;