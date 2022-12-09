import { NewPatient, Gender, NewEntry } from "./types";

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

const isNewBaseEntry = (entry: any): boolean => {
  if (
    entry.hasOwnProperty("diagnosisCodes") &&
    !entry.diagnosisCodes.every((code: any) => isString(code))
  )
    throw new Error("diagnosisCodes must be string values");

  if (!isDate(entry.date))
    throw new Error("Incorrect or missing date: " + entry.date);

  return isString(entry.description) && isString(entry.specialist);
};

const isHospitalEntry = (entry: any): boolean => {
  return (
    entry.type === "Hospital" &&
    entry.hasOwnProperty("discharge") &&
    entry.discharge.hasOwnProperty("date") &&
    isDate(entry.discharge.date) &&
    entry.discharge.hasOwnProperty("criteria") &&
    isString(entry.discharge.criteria)
  );
};

const isOccupationalHealthcareEntry = (entry: any): boolean => {
  if (entry.hasOwnProperty("sickLeave")) {
    if (
      !entry.sickLeave.hasOwnProperty("startDate") ||
      !isDate(entry.sickLeave.startDate) ||
      !entry.sickLeave.hasOwnProperty("endDate") ||
      !isDate(entry.sickLeave.endDate)
    )
      return false;
  }

  return (
    entry.type === "OccupationalHealthcare" &&
    entry.hasOwnProperty("employerName") &&
    isString(entry.employerName)
  );
};

const isHealthCheckEntry = (entry: any): boolean => {
  return (
    entry.type === "HealthCheck" &&
    entry.hasOwnProperty("healthCheckRating") &&
    [0, 1, 2, 3].includes(entry.healthCheckRating)
  );
};

const parseEntries = (entries: any): any => {
  const isCorrectlyFormatted = entries.every(
    (entry: any) =>
      isHospitalEntry(entry) ||
      isOccupationalHealthcareEntry(entry) ||
      isHealthCheckEntry(entry)
  );

  if (!isCorrectlyFormatted) {
    throw new Error("Incorrect Entry Types");
  }

  return entries;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseData(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseData(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseData(object.occupation),
    entries: object.entries ? parseEntries(object.entries) : [],
  };

  return newPatientEntry;
};

const toNewEntry = (object: any): NewEntry => {
  if (!isNewBaseEntry(object)) {
    throw new Error(`Missing mandatory values, Not a base entry`);
  }

  if (
    isHealthCheckEntry(object) ||
    isHospitalEntry(object) ||
    isOccupationalHealthcareEntry(object)
  )
    return object;

  throw new Error(
    `Entry must be HealthCheckEntry or HospitalEntry or OccupationalHealthcareEntry`
  );
};

export { toNewPatientEntry, toNewEntry };
