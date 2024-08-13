import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WorkerForm from "./components/WorkerForm/WorkerForm";
import WorkerList from "./components/WorkerList";
import ContractList from "./components/ContractList/ContractList";
import CreateContract from "./components/CreateContract/CreateContract";
import Layout from "./components/Layout";
import Login from "./components/LoginForm";
import HomePage from "./components/HomePage";
import { useAuth } from "./components/contexts/AuthContext";
import ContractWorkers from "./components/ContractWorkersList/ContractWorkersList";
import { setupAxiosInterceptors } from "./axiosSetup";

const App: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        {user && (
          <>
            {user.role === "superAdmin" && (
              <>
                <Route path="/create-worker" element={<WorkerForm />} />
                <Route path="/create-contract" element={<CreateContract />} />
              </>
            )}
            <Route path="/workers" element={<WorkerList />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/contracts/:contractId/workers"
              element={<ContractWorkers />}
            />

            {user.role !== "worker" && (
              <Route path="/contracts" element={<ContractList />} />
            )}
          </>
        )}
      </Routes>
    </Layout>
  );
};

export default App;
