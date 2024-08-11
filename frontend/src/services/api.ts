import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getWorkers = async () => {
  return axios.get(`${API_URL}/workers`);
};

export const getContracts = async () => {
  return axios.get(`${API_URL}/contracts`);
};
