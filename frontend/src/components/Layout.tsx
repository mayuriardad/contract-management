import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useAuth } from "./contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  console.log("user roleasss isLoggedIn", user, isLoggedIn);
  return (
    <div>
      {isLoggedIn && location.pathname !== "/" && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Contract Management System
            </Typography>
            <Box>
              {user?.role === "superAdmin" && (
                <>
                  <Button color="inherit" component={Link} to="/create-worker">
                    Create Worker
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/create-contract"
                  >
                    Create Contract
                  </Button>
                </>
              )}
              <Button color="inherit" component={Link} to="/workers">
                Worker List
              </Button>
              {user?.role !== "worker" && (
                <Button color="inherit" component={Link} to="/contracts">
                  Contract List
                </Button>
              )}
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
