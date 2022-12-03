import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  PatientEntry,
} from "../types";

const patients: Array<NonSensitivePatientEntry> = patientsData;

const getEntries = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
