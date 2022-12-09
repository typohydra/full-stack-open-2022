import express from "express";
import patientsServices from "../services/patientsServices";
import { toNewPatientEntry, toNewEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsServices.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const patient = patientsServices.getPatient(id);
  res.send(patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientsServices.addEntryToPatient(newEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
