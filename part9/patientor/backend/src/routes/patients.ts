import express from "express";
import patientsServices from "../services/patientsServices";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsServices.getEntries());
});

export default router;
