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

const OnboardWorkerForm: React.FC = () => {
  const [employeeNumber, setEmployeeNumber] = useState<number | "">("");
  const [contractId, setContractId] = useState<number | "">("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/worker-contract-mapping/onboard", {
        employeeNumber,
        contractId,
      });
      setMessage("Worker onboarded successfully!");
      setEmployeeNumber("");
      setContractId("");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to onboard worker.");
    }
  };

  const handleClose = () => {
    setMessage(null);
    setError(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Onboard Worker to Contract
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
          Onboard Worker
        </Button>
      </form>
      <Snackbar open={!!message} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OnboardWorkerForm;
