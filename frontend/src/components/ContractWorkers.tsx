import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Worker {
  employeeNumber: number;
  firstName: string;
  lastName: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

const ContractWorkers: React.FC = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<number | "">(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/worker-contract-mapping/contracts/${contractId}/workers`
        );
        setWorkers(response.data);
      } catch (err) {
        setError("Failed to fetch workers");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [contractId]);

  const handleOnboardWorker = async () => {
    if (typeof employeeId === "number" && employeeId > 0) {
      setSubmitting(true);
      try {
        await axios.post(
          `http://localhost:3000/worker-contract-mapping/onboard`,
          {
            contractId,
            employeeNumber: employeeId,
          }
        );
        // Refresh the list of workers
        const response = await axios.get(
          `http://localhost:3000/worker-contract-mapping/contracts/${contractId}/workers`
        );
        setWorkers(response.data);
        setEmployeeId(0);
        setShowForm(false);
        alert("Worker onboarded successfully!");
      } catch (err) {
        setError("Failed to onboard worker");
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Workers for Contract {contractId}
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        {workers.length === 0 ? (
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1">
              No workers onboarded for this contract.
            </Typography>
          </div>
        ) : (
          <List>
            {workers.map((worker) => (
              <React.Fragment key={worker.employeeNumber}>
                <ListItem>
                  <ListItemText
                    primary={`${worker.firstName} ${worker.lastName}`}
                    secondary={worker.role}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
      <Paper elevation={3} style={{ padding: "20px", marginTop: 30 }}>
        {!showForm ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
          >
            Onboard Worker
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TextField
              label="Employee ID"
              type="number"
              value={employeeId === 0 ? "" : employeeId}
              onChange={(e) => setEmployeeId(Number(e.target.value))}
              variant="outlined"
              margin="normal"
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnboardWorker}
                disabled={submitting}
                style={{ marginRight: 12 }}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ContractWorkers;
