import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export function getPrice(coinName: string, datePicked: string) {
  return apiClient.get(`/${coinName}/history?date=${datePicked}`);
}
