import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CreateContract from "./CreateContract";

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

const handleInputChange = (name: string, status: string, ownerId: string) => {
  const contractName: HTMLInputElement = screen
    .getByTestId("create-contract-name")
    .querySelector("input") as HTMLInputElement;
  fireEvent.change(contractName, {
    target: { value: name },
  });
  fireEvent.change(
    screen
      .getByTestId("create-contract-status")
      .querySelector("input") as HTMLElement,
    {
      target: { value: status },
    }
  );
  fireEvent.change(
    screen
      .getByTestId("create-contract-ownerId")
      .querySelector("input") as HTMLInputElement,
    {
      target: { value: ownerId },
    }
  );
};

describe("CreateContract", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("submits the form successfully", async () => {
    mockAxios.onPost("http://localhost:3000/contracts").reply(200);

    render(<CreateContract />);
    handleInputChange("New Contract", "active", "123");

    fireEvent.click(screen.getByTestId("create-contract-btn"));

    await waitFor(() => {
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: true,
        message: "Contract created successfully!",
        status: "success",
      });
    });
  });

  test("handles form submission error", async () => {
    mockAxios.onPost("http://localhost:3000/contracts").reply(500, {
      message: "Error creating contract",
    });

    render(<CreateContract />);
    handleInputChange("New Contract", "inactive", "456");

    fireEvent.click(screen.getByTestId("create-contract-btn"));

    await waitFor(() => {
      expect(mockSetAlert).toHaveBeenCalledWith({
        show: true,
        message: "Error creating contract",
        status: "error",
      });
    });
  });
});
