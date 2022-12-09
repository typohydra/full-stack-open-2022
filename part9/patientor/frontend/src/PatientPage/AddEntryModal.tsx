import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddHealthCheckEntryForm, {
  HealtchCheckEntryFormValues,
} from "./HealthCheckEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealtchCheckEntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onSubmit, onClose, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new health check entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />{" "}
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
