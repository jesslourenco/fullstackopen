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
    entries?: Entry[];
}

export type NewPatient = Omit<Patient, 'id' | "entries">;

export interface Discharge{
    date: string;
    criteria: string;
}

export interface SickLeave{
    startDate: string;
    endDate: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }

export interface OccupationalHealthcare extends BaseEntry {
    type: "OccupationalHealthcare"
    employerName: string;
    sickLeave?: SickLeave;

}
export interface Hospital extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}
export interface HealthCheck extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry =  OccupationalHealthcare | Hospital | HealthCheck;

export const entry = ["OccupationalHealthcare", "Hospital", "HealthCheck"];

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;