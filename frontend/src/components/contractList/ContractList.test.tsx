// src/components/ContractList.test.tsx

import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import ContractList from "./ContractList";

const mock = new MockAdapter(axios);

describe("ContractList", () => {
  afterEach(() => {
    mock.reset();
  });

  test("shows loading spinner while fetching contracts", async () => {
    act(() => {
      render(
        <MemoryRouter>
          <ContractList />
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });

  test("shows error message when fetching contracts fails", async () => {
    mock.onGet("http://localhost:3000/contracts").reply(500);
    act(() => {
      render(
        <MemoryRouter>
          <ContractList />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Failed to fetch contracts")).toBeInTheDocument();
    });
  });

  test("shows contracts list when fetching contracts succeeds", async () => {
    const contracts = [
      {
        contractId: 1,
        name: "Contract 1",
        status: "active",
        ownerId: 101,
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      },
      {
        contractId: 2,
        name: "Contract 2",
        status: "inactive",
        ownerId: 102,
        createdAt: "2023-02-01T00:00:00.000Z",
        updatedAt: "2023-02-01T00:00:00.000Z",
      },
    ];
    mock.onGet("http://localhost:3000/contracts").reply(200, contracts);
    render(
      <MemoryRouter>
        <ContractList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Contracts List")).toBeInTheDocument();
    });

    expect(screen.getByText("Contract 1")).toBeInTheDocument();
    expect(screen.getByText("Contract 2")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });

  test("shows no contracts message when there are no contracts", async () => {
    mock.onGet("http://localhost:3000/contracts").reply(200, []);
    render(
      <MemoryRouter>
        <ContractList />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("No contracts found")).toBeInTheDocument();
    });
  });
});
