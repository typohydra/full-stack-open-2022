import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { NewPatient, Patient, PublicPatient, NewEntry, Entry } from "../types";

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
    entries: [],
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addEntryToPatient = (entry: NewEntry, patientID: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patients.map((patient) => {
    if (patient.id === patientID) {
      patient.entries.push(newEntry);
    }
    return patient;
  });

  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getPatient,
  addEntryToPatient,
};
