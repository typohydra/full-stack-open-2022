import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseData = (data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error("Incorrect or missing name/ssn/occupation");
  }
  return data;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseData(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseData(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseData(object.occupation),
    entries: object.entries,
  };

  return newEntry;
};

export default toNewPatientEntry;
