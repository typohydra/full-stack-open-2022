import {
  Entry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
} from "../types";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../utils";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} <MedicalServicesIcon />{" "}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by MD House</div>
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <div>
        {entry.date} <WorkIcon />{" "}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <div>diagnose by MD House</div>
    </div>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let heartColor = {};

  switch (entry.healthCheckRating) {
    case 0:
      heartColor = { fill: "green" };
      break;
    case 1:
      heartColor = { fill: "yellow" };
      break;
    case 2:
      heartColor = { fill: "orange" };
      break;
    case 3:
      heartColor = { fill: "red" };
      break;
    default:
      break;
  }

  return (
    <div>
      <div>
        {entry.date} <MedicalServicesIcon />{" "}
      </div>
      <div>
        <i>{entry.description}</i>
      </div>
      <FavoriteIcon style={heartColor} />
      <div>diagnose by MD House</div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
