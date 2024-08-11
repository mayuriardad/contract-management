// src/AuthContext.tsx

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface User {
  employeeNumber: number;
  role: string;
  // Add more fields as needed
}

export interface AuthContextType {
  user: User | null;
  employeeNumber: number | null;
  handleLogin: (employeeNumber: number) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [employeeNumber, setEmployeeNumber] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData, "userdata");
    if (userData) {
      setIsLoggedIn(true);
      const user = JSON.parse(userData);
      setUser(user);
      setEmployeeNumber(user.employeeNumber);
    } else {
      setIsLoggedIn(false);
    }
    // if (!isLoggedIn && location.pathname !== "/") {
    //   navigate("/");
    // }
  }, []);

  useEffect(() => {
    console.log(user, isLoggedIn, "user is it");
    if (isLoggedIn === false && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate, isLoggedIn]);

  const handleLogin = async (employeeNumber: number) => {
    try {
      // Assuming this endpoint returns user details based on employee number
      const response = await axios.post(`http://localhost:3000/workers/login`, {
        employeeNumber: employeeNumber,
      });
      if (response) {
        const response = await axios.get(
          `http://localhost:3000/workers/${employeeNumber}`
        );
        const userData = response.data;
        setIsLoggedIn(true);
        setUser(userData);
        setEmployeeNumber(employeeNumber);
        localStorage.setItem("employeeNumber", employeeNumber.toString());
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Failed to login:", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setEmployeeNumber(null);

    localStorage.removeItem("employeeNumber");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, employeeNumber, handleLogin, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
