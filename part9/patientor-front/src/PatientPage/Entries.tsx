import { OccupationalHealthcare, HealthCheck, Hospital } from "../types";

const card = { borderStyle: "solid", borderColor: "black", borderRadius: "8px" };


interface PropsOccupational {
    entry: OccupationalHealthcare
}

export const OccupationalHealthEntry = ({ entry }: PropsOccupational) => {
    return <div>
        <p style={card}>
        <b>Type: {entry.type}</b><br></br>
        Employer: {entry.employerName} <br></br>
        Visit on {entry.date}<br></br> 
        {entry.description} <br></br>
        Leave: 
        <li>Start on {entry.sickLeave?.startDate}</li> 
        <li>End on {entry.sickLeave?.endDate}</li>
        <br></br>
        Seen by {entry.specialist}
        </p>
    </div>;
};

interface PropsCheck {
    entry: HealthCheck
}

export const HealthCheckEntry = ({ entry }: PropsCheck) => {
    return <div>
        <p style={card}>
    <b>Type: {entry.type}</b><br></br>
    Visit on {entry.date}<br></br>
     {entry.description}<br></br>
    Status: {entry.healthCheckRating}<br></br>
    Seen by {entry.specialist}
    </p>
</div>;
};

interface PropsHospital {
    entry: Hospital
}

export const HospitalEntry = ({ entry }: PropsHospital) => {
    return (
        <div>
    <p style={card}>
        <b>Type: {entry.type}</b> <br></br>
        Visit on {entry.date}<br></br> 
        {entry.description} <br></br>
        Discharged: {entry.discharge.date}, {' '} {entry.discharge.criteria} <br></br>
        Seen by {entry.specialist}
    </p>
    </div>
    );
};

