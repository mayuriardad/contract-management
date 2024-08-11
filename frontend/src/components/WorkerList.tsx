import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Worker {
  employeeNumber: number;
  firstName: string;
  lastName: string;
  role: "owner" | "worker";
  startDate: string; // Assuming ISO date string
  endDate?: string; // Assuming ISO date string
}

const WorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/workers");
        setWorkers(response.data);
      } catch (err) {
        setError("Failed to load workers.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Worker List
      </Typography>
      {workers.length === 0 ? (
        <Typography variant="h6">No workers added</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Number</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers.map((worker) => (
                <TableRow key={worker.employeeNumber}>
                  <TableCell>{worker.employeeNumber}</TableCell>
                  <TableCell>{worker.firstName}</TableCell>
                  <TableCell>{worker.lastName}</TableCell>
                  <TableCell>{worker.role}</TableCell>
                  <TableCell>{worker.startDate}</TableCell>
                  <TableCell>{worker.endDate || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default WorkerList;
