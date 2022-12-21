import { useParams } from 'react-router-dom';
import axios from "axios";
import React from 'react';
import { addEntry, setPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis, NewEntry } from "../types";
import EntryDetails from './EntryDetails';
import { Button } from "@material-ui/core";
import AddEntryModal from '../AddEntryModal';


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
    const [{ patients}, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const patientPage = (): JSX.Element => {
      
        const onSubmit = async(values: NewEntry) => {
            console.log(values);  
            try{
              const {data: newEntry} = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
              );
              dispatch(addEntry(id, newEntry));
              closeModal();
            }catch (e: unknown) {
              if (axios.isAxiosError(e)) {
                  console.error(e?.response?.data || "Unrecognized axios error");
              } else {
                  console.error("Unknown error", e);
              }
          }
        };
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
                                return <EntryDetails entry={e} key={e.id} />;
                            }
                            )
                            : null}
                    </div>))}

                <AddEntryModal
                    modalOpen={modalOpen}
                    error={error}
                    onSubmit={onSubmit}
                    onClose={closeModal}
                />

                <Button variant="contained" onClick={() => openModal()}>
                    Add New Entry
                </Button>
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