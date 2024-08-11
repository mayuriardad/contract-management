// src/axiosSetup.ts

import axios from "axios";

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const userData = localStorage.getItem("user");
      const user = userData && JSON.parse(userData);

      if (user && user.employeeNumber) {
        config.headers["X-Employee-ID"] = user.employeeNumber.toString();
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
