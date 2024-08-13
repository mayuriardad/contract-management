import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAlerts } from "./hooks/useAlerts";
import { AlertComponent } from "./common/AlertComponent";

const OffboardWorkerForm: React.FC = () => {
  const [employeeNumber, setEmployeeNumber] = useState<number | "">("");
  const [contractId, setContractId] = useState<number | "">("");
  const { alertState, setAlertState, closeAlert } = useAlerts();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/worker-contract-mapping/offboard",
        {
          employeeNumber,
          contractId,
        }
      );
      setAlertState({
        show: true,
        message: "Worker offboarded successfully!",
        status: "success",
      });
      setEmployeeNumber("");
      setContractId("");
    } catch (error: any) {
      setAlertState({
        show: true,
        message: error.response?.data?.message || "Failed to offboard worker.",
        status: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Offboard Worker from Contract
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Number"
          type="number"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(Number(e.target.value) || "")}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contract ID"
          type="number"
          value={contractId}
          onChange={(e) => setContractId(Number(e.target.value) || "")}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Offboard Worker
        </Button>
      </form>
      <AlertComponent {...alertState} closeAlert={closeAlert} />
    </Container>
  );
};

export default OffboardWorkerForm;
