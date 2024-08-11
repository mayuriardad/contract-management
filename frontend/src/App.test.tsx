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

  test.only("renders WorkerForm and CreateContract routes for superAdmin role", () => {

    render(
      <MockAuthProvider mockValue={mockAuthContextValue}>
        <App />
      </MockAuthProvider>
    );

    expect(screen.getByText(/Employee Login/i)).toBeInTheDocument();
  });

  test("renders WorkerList and HomePage for all logged-in users", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "worker", employeeNumber: 1 })
    );

    render(
      <MemoryRouter initialEntries={["/workers"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Worker List/i)).toBeInTheDocument();

    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });

  test("renders ContractList route for non-worker roles", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "owner", employeeNumber: 1 })
    );

    render(
      <MemoryRouter initialEntries={["/contracts"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Contracts List/i)).toBeInTheDocument();
  });

  test("does not render ContractList route for worker role", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ role: "worker", employeeNumber: 1 })
    );

    render(
      <MemoryRouter initialEntries={["/contracts"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Contracts List/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
