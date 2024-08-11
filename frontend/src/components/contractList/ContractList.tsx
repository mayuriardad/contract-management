import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Contract {
  contractId: number;
  name: string;
  status: "draft" | "approved" | "active" | "inactive";
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

const ContractList: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contracts");
        setContracts(response.data);
      } catch (error) {
        setError("Failed to fetch contracts");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <>
      <Typography variant="h4" gutterBottom style={{ padding: "16px" }}>
        Contracts List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No contracts found
                </TableCell>
              </TableRow>
            ) : (
              contracts.map((contract) => (
                <TableRow
                  onClick={() =>
                    navigate(`/contracts/${contract.contractId}/workers`)
                  }
                  key={contract.contractId}
                >
                  <TableCell>{contract.contractId}</TableCell>
                  <TableCell>{contract.name}</TableCell>
                  <TableCell>{contract.status}</TableCell>
                  <TableCell>{contract.ownerId}</TableCell>
                  <TableCell>
                    {new Date(contract.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(contract.updatedAt).toDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ContractList;
