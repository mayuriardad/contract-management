import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";
import { AlertComponent } from "./common/AlertComponent";
import { useAlerts } from "./hooks/useAlerts";

const OnboardWorkerForm: React.FC<{
  contractId: string;
}> = ({ contractId }) => {
  const [employeeNumber, setEmployeeNumber] = useState<number | "">("");
  const { alertState, setAlertState, closeAlert } = useAlerts();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/worker-contract-mapping/onboard",
        {
          employeeNumber,
          contractId,
        }
      );
      setAlertState({
        show: true,
        message: "Worker onboarded successfully!",
        status: "success",
      });
      setEmployeeNumber("");
    } catch (error: any) {
      setAlertState({
        show: true,
        message: error.response?.data?.message || "Failed to onboard worker.",
        status: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Onboard Worker to this Contract
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
        <Button type="submit" variant="contained" color="primary">
          Onboard Worker
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="inherit"
          style={{ marginLeft: 10 }}
        >
          Cancel
        </Button>
      </form>
      <AlertComponent {...alertState} closeAlert={closeAlert} />
    </Container>
  );
};

export default OnboardWorkerForm;
