import React, { Component } from "react";
import RightSide from "./rightSide";
import getData from "./getData";
import Flight from "./flight";
import Hotel from "./hotels";
import "../cssFile/style.css";

class MainPage extends Component {
  state = {
    flight: getData.getFlightRoutes(),
    holidays: getData.getHolidays(),
    s: 0,
  };

  handleText = (s, text) => {
    let ss = this.state.s;
    if (ss === s) {
      s = -1;
      text = "Flight";
    }
    this.setState({ s, text });
  };

  handleFlight = (item) => {
    this.props.history.push({
      pathname: "/yatra/airSearch",
    });
  };

  render() {
    const { flight, holidays } = this.state;
    return (
      <React.Fragment>
        <br />
        <div className="row pl-1">
          <div className="col-lg-5 col-12">
            <div className="row">
              <div className="col-3  ">
                <span
                  className="fa-stack fa-2x "
                  onClick={() => this.handleText(0, "Flight")}
                >
                  <i
                    className={
                      this.state.s === 0
                        ? "fa fa-circle red1 fa-stack-2x"
                        : "fa fa-circle black1 fa-stack-2x"
                    }
                  ></i>
                  <i className={" fa fa-plane  fa-stack-1x fa-inverse"}></i>
                </span>
                <br />
                &nbsp; Flight
              </div>
              <div className="col-3">
                <span
                  className="fa-stack fa-2x p-1"
                  onClick={() => this.handleText(1, "Hotels")}
                >
                  <i
                    className={
                      this.state.s === 1
                        ? "fa fa-circle red1 fa-stack-2x"
                        : "fa fa-circle black1 fa-stack-2x"
                    }
                  ></i>
                  <i className={" fa fa-bed  fa-stack-1x fa-inverse"}></i>
                </span>
                <br />
                &nbsp; Hotels
              </div>
              <div className="col-3 ">
                <span
                  className="fa-stack fa-2x p-1"
                  onClick={() => this.handleText(2, "Bus")}
                >
                  <i
                    className={
                      this.state.s === 2
                        ? "fa fa-circle red1 fa-stack-2x"
                        : "fa fa-circle black1 fa-stack-2x"
                    }
                  ></i>
                  <i className={" fa fa-bus  fa-stack-1x fa-inverse"}></i>
                </span>
                <br /> &nbsp;&nbsp;&nbsp; Bus
              </div>
              <div className="col-3 ">
                <span
                  className="fa-stack fa-2x p-1"
                  onClick={() => this.handleText(3, "Taxi")}
                >
                  <i
                    className={
                      this.state.s === 3
                        ? "fa fa-circle red1 fa-stack-2x"
                        : "fa fa-circle black1 fa-stack-2x"
                    }
                  ></i>
                  <i className={" fa fa-taxi  fa-stack-1x fa-inverse"}></i>
                </span>
                <br /> &nbsp; &nbsp;&nbsp;Taxi
              </div>
              <div className=" text-dark text-center col">
                <h4>{this.state.text}</h4>
              </div>

              <br />
              <div className=" container fluid col-12">
                {this.state.s === 0 ? (
                  <Flight onSearchFlight={this.handleFlight} />
                ) : (
                  <React.Fragment>
                    {" "}
                    {this.state.s === 1 ? (
                      <Hotel />
                    ) : (
                      <Flight onSearchFlight={this.handleFlight} />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-7 bg-light col-12">
            <RightSide flight={flight} holidays={holidays} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;
