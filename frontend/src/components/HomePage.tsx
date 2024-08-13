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
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableBody,
} from "@mui/material";
import { useAuth } from "./contexts/AuthContext";
import Home from "./Home";

const HomePage: React.FC = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { employeeNumber, user } = useAuth();

  console.log(user, "user");
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
        user?.role === "worker" ? (
          <Typography>No contract assigned</Typography>
        ) : (
          <Home />
        )
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Your Assigned Contracts
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map(({ contract, createdAt }) => (
                  <TableRow key={contract.id}>
                    <TableCell>{contract.name}</TableCell>
                    <TableCell>{contract.status}</TableCell>
                    <TableCell>
                      {new Date(createdAt).toDateString() || "N/A"}
                    </TableCell>
                    <TableCell>{contract.endDate || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default HomePage;
