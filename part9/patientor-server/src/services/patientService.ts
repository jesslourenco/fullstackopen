import patientData from '../../data/patients.json';
import { Patient } from '../types';

const patients: Array<Patient> = patientData;

const getNonSensitivePatients= (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default {getNonSensitivePatients,};