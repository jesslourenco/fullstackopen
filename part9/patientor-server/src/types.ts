export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    female = 'female',
    male = 'male'
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;