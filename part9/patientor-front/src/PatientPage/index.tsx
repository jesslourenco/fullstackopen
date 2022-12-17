import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { setPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";

const parseString = (value: unknown): string => {
    const isString = (text: unknown): text is string => {
        return typeof text === 'string' || text instanceof String;
    };

    if (!value || !isString(value)) {
        throw new Error('Incorrect or missing id');
    }
    return value;
};

const PatientPage = () => {
    const id = parseString(useParams().id);
    const [{ patients }, dispatch] = useStateValue();

    const patientPage = (): JSX.Element => {
        console.log(patients);
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
                            ? patient.entries.map((e: Entry) => {
                                return (<div key={e.id}>
                                    <h4>Diagnosis:</h4>
                                    {e.date} : {e.description} 
                                    <p>{e.diagnosisCodes?.map(c => <li key={c}> {c} </li>)}</p>
                                </div>);
                            }
                            )
                            : ''}
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