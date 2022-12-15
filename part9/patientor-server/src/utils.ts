import { NewPatient } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReqToNewPatient = (obj: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(obj.name), 
        dateOfBirth: parseDoB(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseString(obj.dateOfBirth), 
        occupation: parseString(obj.occupation)
    };
    return newPatient;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text));
};

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing value');
      }
    return value;
};

const parseDoB = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date of birth');
      }
    return dob;
};

/*const parseGender = (gender: unknown): string => {
    if (!gender || !isString(gender)) {
        throw new Error('Incorrect or missing comment');
      }
    return gender;
};*/



