import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useStateValue,
  getPatient,
  setDiagnosesList,
  setPatientEntry,
} from "../state";
import { Patient, Entry, Diagnosis } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { HealtchCheckEntryFormValues } from "./HealthCheckEntryForm";

import EntryDetails from "../components/EntryDetails";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AddEntryModal from "./AddEntryModal";
import { Button } from "@material-ui/core";

const entryStyle = {
  border: "solid 3px",
  padding: 10,
  margin: "0px 0px 10px 0px",
  borderRadius: 5,
};

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [error, setError] = useState<string>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const { data: patientDetails } = await axios.get<Patient>(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientDetails);
        dispatch(getPatient(patientDetails));
      } catch (e) {
        console.error(e);
      }
    };

    const getDiagnosisData = async () => {
      try {
        const { data: diagnosesData } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );

        setDiagnoses(diagnosesData);
        dispatch(setDiagnosesList(diagnosesData));
      } catch (e) {
        console.error(e);
      }
    };

    if (id && state.patientDetails[id]) {
      setPatient(state.patientDetails[id]);

      if (state.diagnoses) {
        const diagnosesArray = Object.keys(state.diagnoses).map(
          (code) => state.diagnoses[code]
        );
        setDiagnoses(diagnosesArray);
      }
    } else {
      void getPatientDetails();
      void getDiagnosisData();
    }
  }, [id]);

  const submitHealthCheckEntryForm = async (
    values: HealtchCheckEntryFormValues
  ) => {
    try {
      const valuesToPost = { ...values, type: "HealthCheck" };
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        valuesToPost
      );
      if (id) dispatch(setPatientEntry({ entry: newEntry, PatientID: id }));
      closeModal();
    } catch (e) {
      console.log(e.response.data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(e.response.data);
    }
  };

  if (!patient || !diagnoses) return <div>Patient Details Are Loading</div>;

  return (
    <div>
      <h2>
        {patient.name}{" "}
        {patient?.gender === "female" ? <FemaleIcon /> : <MaleIcon />}
      </h2>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      <h3>entries</h3>
      {patient.entries.map((entry: Entry) => {
        return (
          <div key={entry.id} style={entryStyle}>
            <EntryDetails entry={entry} />
            <ul>
              {entry.diagnosisCodes?.map((code: Diagnosis["code"]) => (
                <li key={code}>
                  {code}{" "}
                  {
                    diagnoses?.find((diagnosis) => diagnosis.code === code)
                      ?.name
                  }
                </li>
              ))}
            </ul>
            <div>diagnose by MD House</div>
          </div>
        );
      })}
      <AddEntryModal
        onSubmit={submitHealthCheckEntryForm}
        onClose={closeModal}
        modalOpen={modalOpen}
        error={error}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Health Check Entry
      </Button>
    </div>
  );
};

export default PatientPage;
