import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import WorkerForm from "./WorkerForm";

const mockSetAlert = jest.fn();
// Mocking useAlerts
jest.mock("../hooks/useAlerts", () => ({
  useAlerts: () => ({
    alertState: { show: false, message: "", status: "" },
    setAlertState: mockSetAlert,
    closeAlert: jest.fn(),
  }),
}));

const mockAxios = new MockAdapter(axios);

const handleInputChange = (
  firstName: string,
  lastName: string,
  role: string,
  startDate: string,
  employeeNumber: string
) => {
  const workerFirstName: HTMLInputElement = screen
    .getByTestId("worker-form-first-name")
    .querySelector("input") as HTMLInputElement;
  fireEvent.change(workerFirstName, {
    target: { value: firstName },
  });
  fireEvent.change(
    screen
      .getByTestId("worker-form-last-name")
      .querySelector("input") as HTMLElement,
    {
      target: { value: lastName },
    }
  );
  fireEvent.change(
    screen
      .getByTestId("worker-form-role")
      .querySelector("input") as HTMLInputElement,
    {
      target: { value: role },
    }
  );
  fireEvent.change(
    screen
      .getByTestId("worker-form-start-date")
      .querySelector("input") as HTMLInputElement,
    {
      target: { value: startDate },
    }
  );
  fireEvent.change(
    screen
      .getByTestId("worker-form-employee-number")
      .querySelector("input") as HTMLInputElement,
    {
      target: { value: employeeNumber },
    }
  );
};

describe("WorkerForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits the form successfully", async () => {
    mockAxios.onPost("http://localhost:3000/workers").reply(200);

    render(<WorkerForm />);
    handleInputChange("New worker", "name", "owner", "2024-12-12", "22");

    fireEvent.click(screen.getByTestId("create-worker-btn"));

    await waitFor(() => {
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: true,
        message: "Worker created successfully!",
        status: "success",
      });
    });
  });

  test("handles form submission error", async () => {
    mockAxios.onPost("http://localhost:3000/workers").reply(500, {
      message: "Error creating worker",
    });

    render(<WorkerForm />);
    handleInputChange("New worker", "name", "worker", "2024-12-12", "21");

    fireEvent.click(screen.getByTestId("create-worker-btn"));

    await waitFor(() => {
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: true,
        message: "Error creating worker",
        status: "error",
      });
    });
  });
});
