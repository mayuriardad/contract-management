import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { AlertComponent } from "../common/AlertComponent";
import { useAlerts } from "../hooks/useAlerts";

const CreateContract: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<
    "draft" | "approved" | "active" | "inactive"
  >("draft");
  const [ownerId, setOwnerId] = useState<number>(0);
  const { alertState, setAlertState, closeAlert } = useAlerts();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/contracts", {
        name,
        status,
        ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setAlertState({
        show: true,
        message: "Contract created successfully!",
        status: "success",
      });
      setName("");
      setStatus("draft");
      setOwnerId(0);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create contract.";
      setAlertState({
        show: true,
        message: errorMessage,
        status: "error",
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Create Contract
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Name"
          value={name}
          data-testid="create-contract-name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Select
          label="Status"
          data-testid="create-contract-status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as "draft" | "approved" | "active" | "inactive"
            )
          }
          required
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="approved">Approved</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
        <TextField
          label="Owner ID"
          type="number"
          data-testid="create-contract-ownerId"
          value={ownerId}
          onChange={(e) => setOwnerId(Number(e.target.value))}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          data-testid="create-contract-btn"
        >
          Create Contract
        </Button>
      </Box>
      {/* Snackbar for displaying messages */}
      <AlertComponent {...alertState} closeAlert={closeAlert} />
    </Container>
  );
};

export default CreateContract;
