import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/api/patients', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/api/patients', (req, res) => {
  try{
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  } catch (error: unknown) {
    if(error instanceof Error){
      res.status(400).send(error.message);
    }
  }
});

export default router;