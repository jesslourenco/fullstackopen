import React from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";

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
        return (
            <>
                {Object.values(patients).map((patient: Patient) => (
                    <div key={patient.name}>
                        <h2> {patient.name} {patient.ssn}</h2>
                        {patient.dateOfBirth}<br></br>
                        {patient.gender}<br></br>
                        {patient.occupation}

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
            dispatch({ type: "SET_PATIENT", payload: patient });
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