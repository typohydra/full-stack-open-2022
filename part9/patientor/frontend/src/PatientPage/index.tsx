import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, getPatient, setDiagnosesList } from "../state";
import { Patient, Entry, Diagnosis } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import EntryDetails from "../components/EntryDetails";

import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
