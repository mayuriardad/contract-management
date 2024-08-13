import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";

const Login: React.FC = () => {
  const [employeeNumber, setEmployeeNumber] = useState<number | "">("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleLogin(+employeeNumber);
      navigate("/workers"); // Redirect to home page after successful login
    } catch (error) {
      alert("Failed to login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Employee Login
        </Typography>
        <TextField
          label="Employee Number"
          type="number"
          value={employeeNumber === "" ? "" : employeeNumber}
          onChange={(e) => setEmployeeNumber(Number(e.target.value))}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
