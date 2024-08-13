import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import ContractWorkersList from "./ContractWorkersList";

// Mocking useAlerts
jest.mock("../hooks/useAlerts", () => ({
  useAlerts: jest.fn().mockReturnValue({
    alertState: { show: false, message: "", status: "" },
    setAlertState: jest.fn(),
    closeAlert: jest.fn(),
  }),
}));

const mockAxios = new MockAdapter(axios);

const renderComponent = () => {
  return render(
    <Router>
      <ContractWorkersList />
    </Router>
  );
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => {
    return { contractId: "1" };
  },
}));

describe("ContractWorkersList", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  test("renders component", async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/Workers for Contract 1/i)).toBeInTheDocument();
    });
  });

  test("shows loading spinner initially", () => {
    renderComponent();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("fetches and displays workers", async () => {
    mockAxios
      .onGet(
        "http://localhost:3000/worker-contract-mapping/contracts/1/workers"
      )
      .reply(200, [
        {
          employeeNumber: 1,
          firstName: "John",
          lastName: "Doe",
          role: "Developer",
          startDate: "2024-01-01",
          endDate: null,
        },
      ]);

    act(() => {
      renderComponent();
    });

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Developer")).toBeInTheDocument();
    });
  });

  test("handles empty workers list", async () => {
    mockAxios
      .onGet(
        "http://localhost:3000/worker-contract-mapping/contracts/1/workers"
      )
      .reply(200, []);

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
      expect(
        screen.getByText("No workers onboarded for this contract.")
      ).toBeInTheDocument();
    });
  });

  test("shows form on button click", async () => {
    mockAxios
      .onGet(
        "http://localhost:3000/worker-contract-mapping/contracts/1/workers"
      )
      .reply(200, []);

    renderComponent();
    await waitFor(() => {
      fireEvent.click(screen.getByText("Onboard Worker"));
    });

    await waitFor(() => {
      expect(screen.getByText("Onboard Worker")).toBeInTheDocument();
      expect(
        screen.getByText("Onboard Worker to this Contract")
      ).toBeInTheDocument(); // Adjust text as needed for form
    });
  });
});
