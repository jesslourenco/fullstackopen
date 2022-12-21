import { NewPatient, Gender, Entry, entry, Patient, NewEntry, Discharge, HealthCheckRating, SickLeave,  } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseReqToNewPatient = (obj: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseString(obj.occupation),
    };
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parsePatient = (obj: any): Patient => {
    const patient: Patient = {
        id: parseString(obj.id),
        name: parseString(obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseString(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseString(obj.occupation),
        entries: parseEntries(obj.entries),
    };
    return patient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseEntry = (obj: any): NewEntry | null => {
    
    if(!obj.type) throw new Error('missing type'); 
    if(!(entry.includes(String(obj.type)))) throw new Error('incorrect type');

    const base = {
        description: parseString(obj.description),
        date: parseDate(obj.date),
        specialist: parseString(obj.specialist)};

    switch(obj.type){
        case "Hospital":
            const entryH: NewEntry = {
                type: "Hospital",
                discharge: parseDischarge(obj.dischargeDate, obj.dischargeCriteria),
                ...base
            };
            return entryH;
        case "OccupationalHealthcare":
            let entryO: NewEntry = {
                type: "OccupationalHealthcare",
                employerName: parseString(obj.employerName),
                sickLeave: parseLeave(obj.sickLeaveStart, obj.sickLeaveEnd),
                ...base
            };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            if(obj.sickLeave){ entryO = {sickLeave: obj.sickLeave, ...entryO};}
            return entryO;
        case "HealthCheck":
            const entryC: NewEntry = {
                type: "HealthCheck",
                healthCheckRating: parseRating(obj.healthCheckRating),
                ...base
            };
            return entryC;
        default:
            (entry: never): never => {
                throw new Error(
                    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
                );
            };
         }  
         return null;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (value: any): value is HealthCheckRating => { // "value is Gender" returns value in type Gender
    return Object.values(HealthCheckRating).includes(Number(value));
};

const parseRating = (value: unknown): HealthCheckRating => {
    if (value === null || value === undefined || !isRating(value)) {
        throw new Error('Incorrect or missing rating');
    }
    return Number(value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const parseDischarge = (date: unknown, criteria: unknown): Discharge => {
    if(!date || !criteria || !isString(date) || !isString(criteria) || !isDate(date)) throw new Error
    ('Incorrect or missing discharge data');
    const discharge = {date: date, criteria: criteria};
    if (!isDischarge(discharge)) throw new Error('Something is wrong with discharge data');
    return discharge;

};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (value: unknown): value is Discharge => {
    if (!(typeof value === 'object')) return false;
    return true;
};

const parseLeave = (start: unknown, end: unknown): SickLeave | undefined=> {
    if(!start || !end) return undefined;
    if(!isString(start) || !isString(end)) throw new Error('malformatted dates');
    const sickLeave = {startDate: start, endDate: end};
    return sickLeave; 
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (text: string): boolean => {
    return Boolean(Date.parse(text));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (value: any): value is Gender => { // "value is Gender" returns value in type Gender
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(value);
};

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing value');
    }
    return value;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryArray = (list: Entry[]): list is Entry[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
    const res = list.map((e:any) => entry.includes(e.type));
    if(res.includes(false))return false;
    return true;
};

const isTypedArray = (list: unknown): list is Entry[] => {
    return Array.isArray(list);
};


const parseEntries = (list?: unknown): Entry[]  => {
    if(!isTypedArray(list) || !isEntryArray(list)) { throw new Error('Incorrect entry'); } else {
        return list; 
    }  
};
