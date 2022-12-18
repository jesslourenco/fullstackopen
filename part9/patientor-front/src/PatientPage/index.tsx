import { useParams } from 'react-router-dom';
import axios from "axios";
import { setPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import EntryDetails from './EntryDetails';


const parseString = (value: unknown): string => {
    const isString = (text: unknown): text is string => {
        return typeof text === 'string' || text instanceof String;
    };

    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing id');
    }
    return value;
};

const hasDiagnoseCodes = (entries: Entry[]): boolean => {
    if (entries.length === 0) return false;
    for (const e of entries) {
        if ('diagnosisCodes' in e) return true;
    }
    return false;
};



const PatientPage = () => {
    const id = parseString(useParams().id);
    const [{ patients }, dispatch] = useStateValue();

    const patientPage = (): JSX.Element => {
        return (
            <>
                {Object.values(patients).map((patient: Patient) => (
                    <div key={patient.name}>
                        <h2> {patient.name} {patient.ssn}</h2>
                        {patient.dateOfBirth}<br></br>
                        {patient.gender}<br></br>
                        {patient.occupation}
                        <br></br>

                        {patient.entries
                            ? patient.entries.map(e => {
                                return <EntryDetails entry={e} key={e.id}/>;
                            }
                            )
                            : null}
                    </div>))}
            </>
        );
    };

    if (id && Object.keys(patients).length === 1 && Object.keys(patients)[0] === id) {
        return patientPage();
    }

    (async () => {
        try {
            const { data: patient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`);
            if (patient.entries && hasDiagnoseCodes(patient.entries)) {
                const { data: diagnosis } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
                const newCodes: string[] = [];

                patient.entries.forEach(e => {
                    return e.diagnosisCodes?.map((code) => {
                        const info = diagnosis.find(diag => diag.code === code);
                        info
                            ? newCodes.push(`${info.code}: ${info.name}`)
                            : () => { throw new Error(`Diagnose code ${code} does not exist in database!`); };
                    });
                });

                patient.entries.forEach(e => 'diagnosisCodes' in e ? e.diagnosisCodes = newCodes : e);
            }

            dispatch(setPatient(patient));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
            }
        }
    })().catch(e => console.log(e));

    return (patientPage());
};

export default PatientPage;