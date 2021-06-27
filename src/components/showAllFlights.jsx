import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import Filter from "./filter";
import ShowDel from "./showDel";
import makeRadio from "./common/makeRadioStructure";
import makeCheckbox from "./common/makeCheckStructure";
import service from "../services/apiService";
import flightService from "../services/flightService";
import getData from "./getData";
import "../cssFile/yatra.css";
import icci from "../images/icci.png";
class ShowAllFlights extends Component {
  state = {
    item: {},
    data1: [],
    data2: [],
    price: getData.getPrice(),
    time: getData.getTime(),
    airline: getData.getAirLine(),
    aircraft: getData.getAirCraft(),
    sel1: "",
    sel2: "",
    currentTicket: "",
    currentSort: "",
  };
  async componentDidMount() {
    try {
      let item = await service.getDetails();
      let data1 = await flightService.getFlights(item.from, item.to, "");
      let sel1 = data1[0].id;
      let data2 =
        item.returndate !== ""
          ? await flightService.getFlights(item.to, item.from, "")
          : [];
      let sel2 = "";
      if (data2.length !== 0) {
        sel2 = data2[0].id;
      }
      console.log(data1);
      this.setState({ item, data1, data2, sel1, sel2 });
    } catch (ex) {}
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      try {
        let search = this.props.location.search;
        let item = await service.getDetails();
        let data1 = await flightService.getFlights(item.from, item.to, search);
        let data2 =
          item.returndate !== ""
            ? await flightService.getFlights(item.to, item.from, search)
            : [];
        let sel1 = data1[0].id;

        let sel2 = "";
        if (data2.length !== 0) {
          sel2 = data2[0].id;
        }
        this.setState({
          item,
          data1,
          data2,
          sel1,
          sel2,
          currentTicket: "",
        });
      } catch (ex) {}
    }
  }

  handleBook = async (id) => {
    let data1 = this.state.data1;
    let data2 = this.state.data2;
    let data = [];

    if (data2.length !== 0) {
      let item1 = data1.find((n) => n.id === this.state.sel1);
      data.push(item1);
      let item2 = data2.find((n) => n.id === this.state.sel2);
      data.push(item2);
    } else {
      let it = data1.find((n) => n.id === id);
      data.push(it);
    }

    console.log(data);
    await flightService.addBooking(data);
    window.location = "/booking";
  };

  handleSelectTicket = (sel1, sel2) => {
    this.setState({ sel1, sel2, currentTicket: "" });
  };

  handleshow = (show) => {
    if (this.state.currentTicket === show) {
      this.setState({ currentTicket: "" });
    } else this.setState({ currentTicket: show });
  };

  handleSort = (sort) => {
    let c = this.state.currentSort;
    if (c === sort) {
      sort = "";
    }
    let { time, price, flight, airbus } = queryString.parse(
      this.props.location.search
    );
    this.setState({ currentSort: sort, currentTicket: "" });
    time = time ? time : "";
    flight = flight ? flight : "";
    airbus = airbus ? airbus : "";
    price = price ? price : "";
    this.callUrl("", price, time, flight, airbus, sort);
  };

  callUrl = (params, price, time, flight, airbus, sort) => {
    let path = this.props.location.pathname;
    params = this.addToParam(params, "price", price);
    params = this.addToParam(params, "time", time);
    params = this.addToParam(params, "flight", flight);
    params = this.addToParam(params, "airbus", airbus);
    params = this.addToParam(params, "sort", sort);

    this.props.history.push({
      pathname: path,
      search: params,
    });
  };
  addToParam(params, newParamName, newParamValue) {
    if (newParamValue) {
      if (params) params = params + "&";
      else params = params + "?";
      params = params + newParamName + "=" + newParamValue;
    }
    return params;
  }

  handleOptionChange = (radio1, radio2, check1, check2) => {
    let { sort } = queryString.parse(this.props.location.search);
    sort = sort ? sort : "";
    let price = radio1.selected;
    let time = radio2.selected;
    let filterNames1 = check1.filter((n1) => n1.isSelected);
    let arrayNames1 = filterNames1.map((n1) => n1.val);
    let flight = arrayNames1.join(",");
    let filterNames2 = check2.filter((n1) => n1.isSelected);
    let arrayNames2 = filterNames2.map((n1) => n1.val);
    let airbus = arrayNames2.join(",");
    console.log(price, time, flight, airbus);
    this.callUrl("", price, time, flight, airbus, sort);
  };

  render() {
    let { price: Price, time: Time, airline, aircraft } = this.state;
    let { time, flight, airbus, price } = queryString.parse(
      this.props.location.search
    );
    time = time ? time : "";
    flight = flight ? flight : "";
    airbus = airbus ? airbus : "";
    price = price ? price : "";
    let radio1 = makeRadio.makeRadioStructure(Price, price);
    let radio2 = makeRadio.makeRadioStructure(Time, time);
    let check1 = makeCheckbox.makeCbStructure(airline, flight);
    let check2 = makeCheckbox.makeCbStructure(aircraft, airbus);

    return (
      <React.Fragment>
        <br />
        <div
          className="row pt-2 pb-2 text-center"
          style={{
            background: "linear-gradient(to right , #b7243a , #132522)",
            color: "white",
          }}
        >
          <div className="col-1 text-center mt-1 d-none d-lg-block">
            <i
              className="fa fa-fighter-jet"
              style={{
                fontSize: 30,
                verticalAlign: "middle",
                padding: ".5em 0 .5em 0",
              }}
            ></i>
          </div>
          <div className="col-lg-2 textw col-5">
            <div className="row" id="fs10">
              <div className="col">From</div>
            </div>
            <div className="row" id="fs11">
              <div className="col">
                <b>{this.state.item.from}</b>
              </div>
            </div>
          </div>
          <div className="col-1 text-center  mt-1 ">
            <i
              className="fa fa-exchange"
              style={{
                fontSize: 25,
                verticalAlign: "middle",
                padding: ".5em 0 .5em 0",
              }}
            ></i>
          </div>
          <div className="col-lg-2 col-5">
            <div className="row" id="fs10">
              <div className="col">To</div>
            </div>
            <div className="row" id="fs11">
              <div className="col">
                <b>{this.state.item.to}</b>
              </div>
            </div>
          </div>
          <div className="col-2 d-none d-lg-block">
            <div
              className="row"
              style={{ fontSize: ".71429rem", fontFamily: "Rubik-Medium" }}
            >
              Date
            </div>
            <div
              className="row"
              style={{ fontSize: "1.14286rem", fontFamily: "Rubik-Medium" }}
            >
              <b>{this.state.item.data}</b>
            </div>
          </div>
          <div className="col-2 d-none d-lg-block">
            <div
              className="row"
              style={{ fontSize: ".71429rem", fontFamily: "Rubik-Medium" }}
            >
              Traveller(s)
            </div>
            <div
              className="row"
              style={{ fontSize: "1.14286rem", fontFamily: "Rubik-Medium" }}
            >
              <b>
                {this.state.item.tickets}, {this.state.item.classtype}
              </b>
            </div>
          </div>
          <div className="col-1 mt-1 d-none d-lg-block">
            <Link
              to="/home"
              style={{ verticalAlign: "middle", padding: ".5em 0 .5em 0" }}
              className="btn btn-sm btn-danger text-white "
            >
              &nbsp;Search Again&nbsp;
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col d-none d-lg-block">
            <Filter
              radio1={radio1}
              radio2={radio2}
              check1={check1}
              check2={check2}
              time={time}
              flight={flight}
              airbus={airbus}
              price={price}
              onChange={this.handleOptionChange}
            />{" "}
          </div>
        </div>

        <br />
        <div className="row">
          <div className="col-lg-9 col-12">
            <div
              className="row  pl-4 pt-1 pb-1 mb-4"
              id="id1"
              style={{
                backgroundColor: "#E5E7EB",
                borderRadius: 3,
                marginLeft: 7,
              }}
            >
              <div className="col-2">
                <strong>Sort By</strong>
              </div>
              <div className="col-1"></div>
              <div
                onClick={() => this.handleSort("arrival")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "arrival"
                    ? "col-lg-2 col-2  text-right text-primary"
                    : "col-lg-2 col-2   text-right"
                }
              >
                ARRIVE
                {this.state.currentSort === "arrival" ? (
                  <React.Fragment>
                    &nbsp;
                    <i className="fas fa-arrow-up"></i>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="col-1"></div>
              <div
                onClick={() => this.handleSort("departure")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "departure"
                    ? "col-lg-2 col-2  text-right text-primary"
                    : "col-lg-2 col-2   text-right"
                }
              >
                DEPART
                {this.state.currentSort === "departure" ? (
                  <React.Fragment>
                    &nbsp;
                    <i className="fas fa-arrow-up"></i>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="col-1"></div>
              <div
                onClick={() => this.handleSort("duration")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "duration"
                    ? "col-lg-2 col-2   text-right  text-primary"
                    : "col-lg-2 col-2   text-right"
                }
              >
                Duration
                {this.state.currentSort === "duration" ? (
                  <React.Fragment>
                    &nbsp;
                    <i className="fas fa-arrow-up"></i>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="col-1"></div>
            </div>
            <br />
            <div className="row">
              <div
                className={this.state.data2.length !== 0 ? "col-6" : "col-12"}
              >
                {this.state.data2.length !== 0 ? (
                  <React.Fragment>
                    <div
                      className="row pl-4"
                      style={{
                        backgroundColor: "#E5E7E8",
                        borderRadius: 3,
                        marginLeft: 7,
                        fontSize: ".78571rem",
                      }}
                    >
                      <div className="col-12  ">
                        {this.state.item.from}&nbsp;
                        <i className="fa fa-arrow-right"></i>&nbsp;
                        {this.state.item.to}
                      </div>
                    </div>
                    <br />
                  </React.Fragment>
                ) : (
                  ""
                )}

                {this.state.data1.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div>
                      <ShowDel
                        onBook={this.handleBook}
                        d={this.state.item}
                        item={item}
                        name={"data1"}
                        sel1={this.state.sel1}
                        sel2={this.state.sel2}
                        onChange={this.handleSelectTicket}
                        onshow={this.handleshow}
                        ticket={this.state.currentTicket}
                      />
                    </div>
                    <br />
                  </React.Fragment>
                ))}
              </div>
              {this.state.data2.length !== 0 ? (
                <div className="col-6">
                  <div
                    className="row pl-4"
                    style={{
                      backgroundColor: "#E5E7E8",
                      borderRadius: 3,
                      marginLeft: 7,
                      fontSize: ".78571rem",
                    }}
                  >
                    <div className="col-12  ">
                      {this.state.item.to}&nbsp;
                      <i className="fa fa-arrow-right"></i>&nbsp;
                      {this.state.item.from}
                    </div>
                  </div>
                  <br />
                  {this.state.data2.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <div>
                        <ShowDel
                          onBook={this.handleBook}
                          d={this.state.item}
                          item={item}
                          name={"data2"}
                          sel2={this.state.sel2}
                          sel1={this.state.sel1}
                          onChange={this.handleSelectTicket}
                          onshow={this.handleshow}
                          ticket={this.state.currentTicket}
                        />
                      </div>
                      <br />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-2 text-center ml-1  d-none d-lg-block">
            <img src={icci} style={{ width: "auto" }} />
          </div>
        </div>
        {this.state.data2.length !== 0 && this.state.data1.length !== 0 ? (
          <React.Fragment>
            <div
              className="row fixed-bottom pt-4 pb-4"
              style={{ backgroundColor: "#43264E", color: "white" }}
            >
              <div className="col-4 d-none d-lg-block">
                <div className="row">
                  <div className="col-3 text-center">
                    {this.state.data1.length !== 0 ? (
                      <React.Fragment>
                        <img
                          src={
                            this.state.data1[
                              this.state.data1.findIndex(
                                (n) => n.id === this.state.sel1
                              )
                            ].logo
                          }
                          style={{ width: 40, borderRadius: 6 }}
                        />
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className="col-2 d-none d-lg-block"
                    style={{ fontSize: ".85714rem" }}
                  >
                    {
                      this.state.data1[
                        this.state.data1.findIndex(
                          (n) => n.id === this.state.sel1
                        )
                      ].name
                    }
                  </div>
                  <div className="col-2 d-none d-lg-block">
                    {
                      this.state.data1[
                        this.state.data1.findIndex(
                          (n) => n.id === this.state.sel1
                        )
                      ].timeDept
                    }
                  </div>
                  <div className="col-3 d-none d-lg-block">
                    <hr style={{ borderColor: "white" }} />
                  </div>
                  <div className="col-2 d-none d-lg-block">
                    {
                      this.state.data1[
                        this.state.data1.findIndex(
                          (n) => n.id === this.state.sel1
                        )
                      ].timeArr
                    }
                  </div>
                </div>
              </div>
              <div className="col-4 d-none d-lg-block">
                <div className="row">
                  <div className="col-3 text-center">
                    <img
                      src={
                        this.state.data2[
                          this.state.data2.findIndex(
                            (n) => n.id === this.state.sel2
                          )
                        ].logo
                      }
                      style={{ width: 40, borderRadius: 6 }}
                    />
                  </div>
                  <div
                    className="col-2 d-none d-lg-block"
                    style={{ fontSize: ".85714rem" }}
                  >
                    {
                      this.state.data2[
                        this.state.data2.findIndex(
                          (n) => n.id === this.state.sel2
                        )
                      ].name
                    }
                  </div>
                  <div className="col-2 d-none d-lg-block">
                    {
                      this.state.data2[
                        this.state.data2.findIndex(
                          (n) => n.id === this.state.sel2
                        )
                      ].timeDept
                    }
                  </div>
                  <div className="col-3 d-none d-lg-block">
                    <hr style={{ borderColor: "white" }} />
                  </div>
                  <div className="col-2 d-none d-lg-block">
                    {
                      this.state.data2[
                        this.state.data2.findIndex(
                          (n) => n.id === this.state.sel2
                        )
                      ].timeArr
                    }
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-12">
                <div className="row">
                  <div className="col-6 ml-lg-0 ml-1">
                    <div className="row" style={{ fontSize: ".85714rem" }}>
                      <div className="col">Total Fare</div>
                    </div>
                    <div className="row" style={{ fontSize: "1.57143rem" }}>
                      <div className="col">
                        <strong>
                          ₹
                          {this.state.item.tickets *
                            (this.state.data1[
                              this.state.data1.findIndex(
                                (n) => n.id === this.state.sel1
                              )
                            ].Price +
                              this.state.data2[
                                this.state.data2.findIndex(
                                  (n) => n.id === this.state.sel2
                                )
                              ].Price)}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-4 mt-1">
                    <button
                      onClick={() => this.handleBook()}
                      className="btn btn-danger text-white"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default ShowAllFlights;
