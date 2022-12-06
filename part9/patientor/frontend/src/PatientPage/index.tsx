import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, getPatient } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

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
    
    if (id && state.patientDetails[id]) {
      setPatient(state.patientDetails[id]);
    } else {
      void getPatientDetails();
    }
  }, [id]);

  if (!patient) return <div>Patient Details Are Loading</div>;

  return (
    <div>
      <h2>
        {patient.name} - <i>{patient?.gender}</i>
      </h2>
      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientPage;