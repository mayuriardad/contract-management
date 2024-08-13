import { useState } from "react";

export type AlertStateType = {
  show: boolean;
  message: string;
  status: "success" | "error";
};

const alertInitialValue: AlertStateType = {
  show: false,
  message: "",
  status: "success",
};
export const useAlerts = () => {
  const [alertState, setAlertState] =
    useState<AlertStateType>(alertInitialValue);

  const closeAlert = () => {
    setAlertState(alertInitialValue);
  };

  return {
    alertState,
    setAlertState,
    closeAlert,
  };
};
