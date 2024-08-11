import React, { useState } from "react";
import { Button, TextField, Grid, Container, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const WorkerForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<"owner" | "worker">("worker");
  const [startDate, setStartDate] = useState<string>("");
  const [employeeNumber, setEmployeeNumber] = useState<number>(0);

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
      alert("Worker created successfully!");
      // Clear the form after successful submission
      setFirstName("");
      setLastName("");
      setRole("worker");
      setStartDate("");
      setEmployeeNumber(0);
    } catch (error) {
      console.error("Error creating worker:", error);
      alert("Failed to create worker.");
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
              type="number"
              variant="outlined"
              fullWidth
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(Number(e.target.value))}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Worker
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default WorkerForm;
