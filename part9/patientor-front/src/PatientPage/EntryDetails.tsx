import { OccupationalHealthEntry, HealthCheckEntry, HospitalEntry } from "./Entries";
import { Entry } from "../types";

interface PropsEntry {
    entry: Entry,
}

/* const assertNever = (entry: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
    );
}; */

const EntryDetails = ({ entry }: PropsEntry) => {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthEntry entry={entry} />;
        default:
            return null;
    }
};

export default EntryDetails;