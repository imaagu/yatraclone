export function getFlightRoutes() {
  let data = [
    {
      origin: "New Delhi",
      dest: "Bengaluru",
      date: "Wed, 3 Oct",
      amount: 3590,
    },
    { origin: "New Delhi", dest: "Mumbai", date: "Sun, 13 Oct", amount: 2890 },
    {
      origin: "Hyderabad",
      dest: "Bengaluru",
      date: "Mon,30 Sep",
      amount: 2150,
    },
    { origin: "Mumbai", dest: "Pune", date: "Sun,6 Oct", amount: 1850 },
  ];

  return data;
}

export function getHolidays() {
  let data = [
    {
      img: "https://i.ibb.co/SQ7NSZT/hol1.png",
      place: "Australia",
      price: "177,990",
      days: "9 Nights / 10 Days",
    },
    {
      img: "https://i.ibb.co/Wxj50q1/hol2.png",
      place: "Europe",
      price: "119,990",
      days: "6 Nights / 7 Days",
    },
    {
      img: "https://i.ibb.co/VY3XNZr/hol3.png",
      place: "New Zealand",
      price: "199,990",
      days: "6 Nights / 7 Days",
    },
    {
      img: "https://i.ibb.co/j4NNc35/hol4.jpg",
      place: "Sri Lanka",
      price: "18,999",
      days: "4 Nights / 5 Days",
    },
    {
      img: "https://i.ibb.co/ct6076f/hol5.jpg",
      place: "Kerala",
      price: "12,999",
      days: "4 Nights / 5 Days",
    },
    {
      img: "https://i.ibb.co/vB0CpYK/hol6.jpg",
      place: "Char Dham",
      price: "22,999",
      days: "4 Nights / 5 Days",
    },
  ];

  return data;
}

export function getCities() {
  let data = [
    "Select City",
    "New Delhi (DEL)",
    "Mumbai (BOM)",
    "Banglore (BLR)",
    "Kolkata (CCU)",
  ];

  return data;
}

export function getDays() {
  let data = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return data;
}

export function getMonths() {
  let data = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Augest",
    "September",
    "October",
    "November",
    "December",
  ];

  return data;
}

export function getPrice() {
  let data = [
    { id: "0-5000", val: "0-5000" },
    { id: "5000-10000", val: "5000-10000" },
    { id: "10000-15000", val: "10000-15000" },
    { id: "15000-20000", val: "15000-20000" },
  ];

  return data;
}

export function getTime() {
  let data = [
    { id: "0-6", val: "0-6" },
    { id: "6-12", val: "6-12" },
    { id: "12-18", val: "12-18" },
    { id: "18-00", val: "18-00" },
  ];

  return data;
}

export function getAirLine() {
  let data = [
    { id: "Go Air", val: "Go Air" },
    { id: "Indigo", val: "Indigo" },
    { id: "SpiceJet", val: "SpiceJet" },
    { id: "Air India", val: "Air India" },
  ];

  return data;
}

export function getAirCraft() {
  let data = [
    { id: "Airbus A320 Neo", val: "Airbus A320 Neo" },
    { id: "AirbusA320", val: "AirbusA320" },
    { id: "Boeing737", val: "Boeing737" },
    { id: "Airbus A320-100", val: "Airbus A320-100" },
  ];

  return data;
}

export function getHPrice() {
  let data = [
    { id: "5000", val: "5000" },
    { id: "10000", val: "10000" },
    { id: "15000", val: "15000" },
    { id: "20000", val: "20000" },
  ];

  return data;
}

export function getHRating() {
  let data = [
    { id: "1", val: "1" },
    { id: "2", val: "2" },
    { id: "3", val: "3" },
    { id: "4", val: "4" },
    { id: "5", val: "5" },
  ];

  return data;
}

export function getHPmode() {
  let data = [
    { id: "Cash", val: "Cash" },
    { id: "Online", val: "Online" },
  ];

  return data;
}

export default {
  getFlightRoutes,
  getHolidays,
  getCities,
  getDays,
  getMonths,
  getPrice,
  getTime,
  getAirLine,
  getAirCraft,
  getHPrice,
  getHRating,
  getHPmode,
};
