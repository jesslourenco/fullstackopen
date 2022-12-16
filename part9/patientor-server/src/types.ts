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
    entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}