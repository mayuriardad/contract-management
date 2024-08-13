import { Alert, Snackbar } from "@mui/material";
import { AlertStateType } from "../hooks/useAlerts";

export const AlertComponent = ({
  show,
  message,
  status,
  closeAlert,
}: {
  show: boolean;
  message: string;
  status: "success" | "error";
  closeAlert: () => void;
}) => {
  return (
    <Snackbar open={show} autoHideDuration={6000} onClose={closeAlert}>
      <Alert onClose={closeAlert} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
