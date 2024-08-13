import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import MockAuthProvider from "./__mocks__/MockAuthProvider";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App Component", () => {
  const mockUser = {
    employeeNumber: 123,
    role: "superAdmin",
  };

  const mockAuthContextValue = {
    user: mockUser,
    employeeNumber: 123,
    handleLogin: jest.fn(),
    logout: jest.fn(),
    isLoggedIn: true,
  };

  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  test("renders WorkerList and HomePage for all logged-in users", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "worker", employeeNumber: 1 })
    );

    render(
      <MockAuthProvider mockValue={mockAuthContextValue}>
        <MemoryRouter initialEntries={["/workers"]}>
          <App />
        </MemoryRouter>
      </MockAuthProvider>
    );

    expect(screen.getByText(/Worker List/i)).toBeInTheDocument();
  });

  test("renders ContractList route for non-worker roles", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "owner", employeeNumber: 1 })
    );
    const mockAuth = {
      user: { role: "owner", employeeNumber: 1 },
      employeeNumber: 123,
      handleLogin: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: true,
    };

    render(
      <MockAuthProvider mockValue={mockAuth}>
        <MemoryRouter initialEntries={["/contracts"]}>
          <App />
        </MemoryRouter>
      </MockAuthProvider>
    );

    expect(screen.getByText(/Contract List/i)).toBeInTheDocument();
  });

  test("does not render ContractList route for worker role", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "worker", employeeNumber: 1 })
    );
    const mockAuth = {
      user: { role: "worker", employeeNumber: 1 },
      employeeNumber: 123,
      handleLogin: jest.fn(),
      logout: jest.fn(),
      isLoggedIn: true,
    };

    render(
      <MockAuthProvider mockValue={mockAuth}>
        <MemoryRouter initialEntries={["/contracts"]}>
          <App />
        </MemoryRouter>
      </MockAuthProvider>
    );

    expect(screen.queryByText(/Contract List/i)).not.toBeInTheDocument();
  });
});
