import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
} from "@mui/material";
import { useAuth } from "./contexts/AuthContext";

const HomePage: React.FC = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { employeeNumber } = useAuth();

  useEffect(() => {
    if (employeeNumber) {
      const fetchContracts = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/worker-contract-mapping/workers/${employeeNumber}/contracts`
          );
          setContracts(response.data);
        } catch (err) {
          setError("Failed to fetch contracts");
        } finally {
          setLoading(false);
        }
      };

      fetchContracts();
    }
  }, [employeeNumber]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: 4 }}>
      {contracts.length === 0 ? (
        <Typography>No contract assigned</Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Assigned Contracts
          </Typography>
          <List>
            {contracts.map((contract) => (
              <ListItem key={contract.id}>
                <ListItemText
                  primary={contract.name}
                  secondary={`Status: ${contract.status}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default HomePage;
