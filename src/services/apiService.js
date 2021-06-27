import http from "./httpService";
import { apiUrl } from "../config.json";
const api = "/details";

export async function getDetails() {
  try {
    let url = apiUrl + api;
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function getBasic() {
  try {
    let url = apiUrl + "/basic";
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function getSelRoom() {
  try {
    let url = apiUrl + "/room";
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function setSelRoom(room, hotel) {
  try {
    let url = apiUrl + "/room";
    await http.post(url, {
      room,
      hotel,
    });
  } catch (ex) {}
}

export async function getHotels(city, search) {
  try {
    let url = apiUrl + "/hotels/" + city + search;
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function getHotelByName(city) {
  try {
    let url = apiUrl + "/gethotels/" + city;
    let { data } = await http.get(url);
    return data;
  } catch (ex) {}
}

export async function setDetails(
  from,
  to,
  date,
  returndate,
  tickets,
  classtype
) {
  try {
    let url = apiUrl + api;
    await http.post(url, {
      from,
      to,
      date,
      returndate,
      tickets,
      classtype,
    });
  } catch (ex) {}
}

export async function setHotelDetails(
  city,
  Checkin,
  Checkout,
  travellers,
  totalrooms,
  rooms
) {
  try {
    let url = apiUrl + api;
    await http.post(url, {
      city,
      Checkin,
      Checkout,
      travellers,
      totalrooms,
      rooms,
    });
  } catch (ex) {}
}

export async function setBasic(
  fname,
  lname,
  email,
  mobile,

  total
) {
  try {
    let url = apiUrl + "/basic";
    await http.post(url, {
      fname,
      lname,
      email,
      mobile,

      total,
    });
  } catch (ex) {}
}

export default {
  getDetails,
  setDetails,
  getBasic,
  setBasic,
  setHotelDetails,
  getHotels,
  getHotelByName,
  getSelRoom,
  setSelRoom,
};
