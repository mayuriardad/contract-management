// src/index.tsx

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./components/contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
