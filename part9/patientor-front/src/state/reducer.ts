import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
    patientId: string;
  };


  export const setPatientList = (patientListFromApi: Patient[]): Action => {
    return {type: "SET_PATIENT_LIST", payload: patientListFromApi}; 
  };

  export const addPatient = (patient: Patient): Action => {
    return {type: "ADD_PATIENT", payload: patient}; 
  };

  export const addEntry = (patientId: string, entry: Entry): Action => {
    return {type: "ADD_ENTRY", payload: entry, patientId}; 
  };

  export const setPatient = (patient: Patient): Action => {
    return {type: "SET_PATIENT", payload: patient}; 
  };

  export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
    return { type: "SET_DIAGNOSIS_LIST", payload: diagnoses };
  };


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.patientId]: {
            ...state.patients[action.patientId],
            entries: [
              ...state.patients[action.patientId].entries,
              action.payload
            ]
          }
        }
      };
    case "SET_PATIENT":
      return {
        patients: {
          [action.payload.id]: action.payload,
        },
        diagnoses: {...state.diagnoses}
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses,
          },
        };
    default:
      return state;
  }
};
