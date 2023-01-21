import patientData from '../../data/patients';
import { Patient, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import { parseReqToNewPatient, parsePatient, parseEntry } from '../utils';

const patients: Array<Patient> = patientData.map(p => { 
    // the map is needed since data for Gender comes in json as string
    const obj = parsePatient(p);
    return obj;
});

const getNonSensitivePatients= (): Omit<Patient, 'ssn' | 'entries'>[] => {
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

const getPatient = (id: string): Patient => {
    return patients.filter(p => p.id === id)[0];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEntry = (id:string, req: any): Entry => {
    const index = patients.findIndex(p => p.id === id);
    if(index === -1) throw new Error('patient does not exist');
    
    const patient = getPatient(id);

    let newEntry = parseEntry(req);
    if (!newEntry) throw new Error('something went wrong');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if(req.diagnosisCodes) newEntry = {diagnosisCodes: req.diagnosisCodes, ...newEntry};

    const entry: Entry = {
        id: uuid(),
        ...newEntry
    };

    if(patient.entries){
        patients[index].entries?.push(entry);
    }else {
        patients[index].entries = [entry];
    }

    return entry;    
};

export default {getNonSensitivePatients, addPatient, getPatient, addEntry};