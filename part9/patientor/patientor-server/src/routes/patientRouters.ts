import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/api/patients', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/api/patients', (req, res) => {
  try {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.get('/api/patients/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  res.send(patient);
});

router.post('/api/patients/:id/entries', (req, res) => {
  try {
    const entry = patientService.addEntry(req.params.id, req.body);
    res.json(entry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});


export default router;