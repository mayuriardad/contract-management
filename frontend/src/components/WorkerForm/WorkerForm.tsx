import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useAlerts } from "../hooks/useAlerts";
import { AlertComponent } from "../common/AlertComponent";

const WorkerForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<"owner" | "worker">("worker");
  const [startDate, setStartDate] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<number>(0);
  const { alertState, setAlertState, closeAlert } = useAlerts();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/workers", {
        firstName,
        lastName,
        role,
        startDate,
        employeeNumber,
      });
      setAlertState({
        show: true,
        message: "Worker created successfully!",
        status: "success",
      });
      // Clear the form after successful submission
      setFirstName("");
      setLastName("");
      setRole("worker");
      setStartDate("");
      setEmployeeNumber(0);
    } catch (error: any) {
      console.error("Error creating worker:", error);
      const msg = error.response?.data?.message || "Error creating worker";
      setAlertState({
        show: true,
        message: msg,
        status: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Worker
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              data-testid="worker-form-first-name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              data-testid="worker-form-last-name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as "owner" | "worker")}
                label="Role"
                data-testid="worker-form-role"
                required
              >
                <MenuItem value="worker">Worker</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Start Date"
              data-testid="worker-form-start-date"
              type="date"
              variant="outlined"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Employee Number"
              data-testid="worker-form-employee-number"
              type="number"
              variant="outlined"
              fullWidth
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(Number(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="create-worker-btn"
            >
              Create Worker
            </Button>
          </Grid>
        </Grid>
      </form>
      <AlertComponent {...alertState} closeAlert={closeAlert} />
    </Container>
  );
};

export default WorkerForm;
