import patientData from '../../data/patients.json';
import { Patient } from '../types';
import { v1 as uuid } from 'uuid';
import { parseReqToNewPatient } from '../utils';

const patients: Array<Patient> = patientData.map(p => { // the map is needed since data for Gender comes in json as string
    const obj = parseReqToNewPatient(p) as Patient;
    obj.id = p.id;
    return obj;
});

const getNonSensitivePatients= (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (req: unknown): Patient => {
    const newPatient = parseReqToNewPatient(req);
    const patient = {
        id: uuid(),
        ...newPatient
    };
    patients.push(patient);
    return patient;
};

export default {getNonSensitivePatients, addPatient};