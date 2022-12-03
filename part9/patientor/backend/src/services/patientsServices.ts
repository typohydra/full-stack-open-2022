import patientsData from "../../data/patients";
import { NonSensitivePatientEntry } from "../types";

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

export default {
  getEntries,
};
