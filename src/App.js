import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";

//import logo from "./logo.svg";
//import "./App.css";
import MainPage from "./components/mainPage";
import ShowAllFlights from "./components/showAllFlights";
import Booking from "./components/booking";
import Payment from "./components/payment";
import ShowHotel from "./components/showHotels";
import ShowHotelDetails from "./components/showHotelDetails";
import ReviewRoom from "./components/common/hotelcheckout";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="">
        <NavBar />
        <Switch>
          <Route path="/yatra/airSearch" component={ShowAllFlights} />
          <Route path="/yatra/hotels" component={ShowHotel} />
          <Route path="/hotels/:name" component={ShowHotelDetails} />
          <Route path="/hotel-checkout" component={ReviewRoom} />
          <Route path="/booking" component={Booking} />
          <Route path="/home" component={MainPage} />
          <Route path="/payment" component={Payment} />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default App;
