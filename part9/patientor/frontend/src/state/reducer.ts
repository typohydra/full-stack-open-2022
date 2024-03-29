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
      type: "GET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_PATIENT_ENTRY";
      payload: { entry: Entry; PatientID: string };
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
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "GET_PATIENT":
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES_LIST": {
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
    }
    case "SET_PATIENT_ENTRY": {
      const updatedPatientDetails =
        state.patientDetails[action.payload.PatientID];
      updatedPatientDetails.entries.push(action.payload.entry);

      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.PatientID]: updatedPatientDetails,
        },
      };
    }
    default:
      return state;
  }
};

export const getPatient = (patient: Patient): Action => ({
  type: "GET_PATIENT",
  payload: patient,
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient,
});

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients,
});

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSES_LIST",
  payload: diagnoses,
});

export const setPatientEntry = (obj: {
  entry: Entry;
  PatientID: string;
}): Action => ({
  type: "SET_PATIENT_ENTRY",
  payload: obj,
});
