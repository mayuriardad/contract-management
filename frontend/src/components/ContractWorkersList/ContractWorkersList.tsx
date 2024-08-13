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
import { useAlerts } from "../hooks/useAlerts";
import { AlertComponent } from "../common/AlertComponent";
import OnboardWorkerForm from "../OnboardWorkerForm";

interface Worker {
  employeeNumber: number;
  firstName: string;
  lastName: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

const ContractWorkersList: React.FC = () => {
  const { contractId = "" } = useParams<{ contractId: string }>();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const { alertState, setAlertState, closeAlert } = useAlerts();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/worker-contract-mapping/contracts/${contractId}/workers`
        );
        setWorkers(response.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch workers";
        setAlertState({
          show: true,
          message: errorMessage,
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [contractId]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
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
          <OnboardWorkerForm contractId={contractId} />
        )}
      </Paper>

      {/* Snackbar for displaying messages */}
      <AlertComponent {...alertState} closeAlert={closeAlert} />
    </div>
  );
};

export default ContractWorkersList;
