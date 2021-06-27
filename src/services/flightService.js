import http from "./httpService";
import { apiUrl2 } from "../config.json";
const api = "/flights";

export async function getFlights(dept, dest, search) {
  try {
    let url = apiUrl2 + api + "/" + dept + "/" + dest + search;
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function addBooking(data) {
  try {
    let url = apiUrl2 + "/booking";
    let { data: d } = await http.post(url, { data });
    return d;
  } catch (ex) {}
}

export async function getBooking(data) {
  try {
    let url = apiUrl2 + "/booking";
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export default {
  getFlights,
  addBooking,
  getBooking,
};
