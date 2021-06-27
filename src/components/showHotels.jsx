import React, { Component, Fragment } from "react";
import service from "../services/apiService";
import { Link } from "react-router-dom";
import getData from "./getData";
import makeRadio from "./common/makeRadioStructure";
import queryString from "query-string";
import ImageSlider from "./common/imageSlider";
import "../cssFile/booking.css";

import logo from "../images/owl.png";

import LeftPannel from "./leftPannel";
class ShowHotel extends Component {
  state = {
    data: [],
    details: {},
    price: getData.getHPrice(),
    rating: getData.getHRating(),
    pmode: getData.getHPmode(),
    currentSort: "",
  };
  async componentDidMount() {
    let details = await service.getDetails();
    let data = await service.getHotels(details.city, "");
    // console.log(details);
    this.setState({ details, data });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      try {
        let search = this.props.location.search;
        let details = await service.getDetails();
        let data = await service.getHotels(details.city, search);
        this.setState({ details, data });
        console.log(data);
      } catch (ex) {}
    }
  }

  handleBook = async (h) => {
    let hotel = await service.getHotelByName(h.name);
    await service.setSelRoom(hotel.rooms[0], hotel);
    window.location = "/hotel-checkout";
  };

  handleShowRoom = (name) => {
    window.location = "/hotels/" + name;
  };

  handleOptionChange = (radio1, radio2, radio3) => {
    let { sort } = queryString.parse(this.props.location.search);

    sort = sort ? sort : "";

    let price = radio1.selected;
    let rating = radio2.selected;
    let pmode = radio3.selected;

    this.callUrl("", price, rating, pmode, sort);
  };

  handleSort = (sort) => {
    let c = this.state.currentSort;
    if (c === sort) {
      sort = "";
    }
    let { price, rating, pmode } = queryString.parse(
      this.props.location.search
    );
    this.setState({ currentSort: sort });

    rating = rating ? rating : "";
    pmode = pmode ? pmode : "";
    price = price ? price : "";
    this.callUrl("", price, rating, pmode, sort);
  };

  callUrl = (params, price, rating, pmode, sort) => {
    let path = this.props.location.pathname;
    params = this.addToParam(params, "price", price);
    params = this.addToParam(params, "rating", rating);
    params = this.addToParam(params, "pmode", pmode);
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

  render() {
    let { price, rating, pmode } = queryString.parse(
      this.props.location.search
    );
    price = price ? price : "";
    rating = rating ? rating : "";
    pmode = pmode ? pmode : "";
    let radio1 = makeRadio.makeRadioStructure(this.state.price, price);
    let radio2 = makeRadio.makeRadioStructure(this.state.rating, rating);
    let radio3 = makeRadio.makeRadioStructure(this.state.pmode, pmode);

    return (
      <React.Fragment>
        <div
          className="row"
          style={{
            color: "white",
            background: "linear-gradient(to right , #b7243a , #132522)",
          }}
        >
          <div
            className="col-1 m-1 ml-1"
            style={{ verticalAlign: "middle", paddingTop: 10 }}
          >
            <Link to="/home" style={{ cursor: "pointer", color: "#fff" }}>
              <i className="fa fa-chevron-left"></i>{" "}
            </Link>
          </div>{" "}
          <div className="col-6 ">
            <div className="row">
              <div className="col-12" style={{ fontWeight: "bold" }}>
                {this.state.details.city}
              </div>
              <div className="col-12">
                <div className="row" style={{ fontSize: 12 }}>
                  <div className="col-12">
                    Rooms: {this.state.details.totalrooms} | Persons:{" "}
                    {this.state.details.travellers}{" "}
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row" style={{ fontSize: 12 }}>
                  <div className="col-12">
                    {this.state.details.Checkin} | {this.state.details.Checkin}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row  mt-2 " style={{ backgroundColor: "lightgray" }}>
          <div className="col-2 ml-2 d-none d-lg-block">
            <LeftPannel
              radio1={radio1}
              radio2={radio2}
              radio3={radio3}
              onChange={this.handleOptionChange}
            />
          </div>
          <div className="col-12 ml-2 col-lg-9">
            <br />
            <div
              className="row  pl-4 pt-1 pb-1 mb-4 "
              id="id1"
              style={{
                backgroundColor: "lightgray",
                borderRadius: 3,
                marginLeft: 7,
              }}
            >
              <div className="col-2 ">
                <strong>Sort By</strong>
              </div>
              <div className="col-1"></div>
              <div
                onClick={() => this.handleSort("name")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "name"
                    ? "col-lg-2 col-2 text-right text-primary"
                    : "col-lg-2 col-2 text-right"
                }
              >
                Name
                {this.state.currentSort === "name" ? (
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
                onClick={() => this.handleSort("rating")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "rating"
                    ? "col-lg-2 col-2 text-right text-primary"
                    : "col-lg-2 col-2 text-right"
                }
              >
                Rating
                {this.state.currentSort === "rating" ? (
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
                onClick={() => this.handleSort("price")}
                id="id1"
                style={{ fontSize: ".78571rem", cursor: "pointer" }}
                className={
                  this.state.currentSort === "price"
                    ? "col-lg-2 col-2 text-right  text-primary"
                    : "col-lg-2 col-2 text-right"
                }
              >
                price
                {this.state.currentSort === "price" ? (
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

            <div className="row ">
              {this.state.data.map((item, index) => (
                <div className="col-12" key={index} id="box3">
                  <div className="row">
                    <div className="col-3">
                      <ImageSlider imgs={item.imgs} ind={index} />
                    </div>
                    <div className="col-lg-6 col-9">
                      <div className="row">
                        <div className="col-12" id="fs11">
                          <strong
                            onClick={() => this.handleShowRoom(item.name)}
                            id="na"
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            {item.name}{" "}
                          </strong>
                        </div>
                        <div className="col-12" id="fs11">
                          <div className="row">
                            <div className="col text-left">
                              <i
                                className="fa fa-star "
                                style={{ color: "red" }}
                              ></i>
                              &nbsp;
                              {item.rating}
                              stars &nbsp;&nbsp;
                              <i className="fa fa-map-marker"></i>
                              &nbsp;
                              {item.city}
                            </div>
                          </div>
                        </div>
                        <div className="col-12 text-muted" id="fs11">
                          <div className="row">
                            <div className="col text-left">
                              <i className="fa fa-wifi "></i>
                              &nbsp;
                              {item.wifi}
                              &nbsp;&nbsp;
                              <i className="fas fa-swimming-pool"></i>
                              &nbsp;
                              {item.pool}
                            </div>
                          </div>
                        </div>
                        <div className="col-12" id="fs11">
                          <div className="row">
                            <div className="col-4"> </div>
                            <div className="col-6 ">
                              <img src={logo} style={{ height: 40 }} alt="" />
                              <span className="text-danger">{item.rating}</span>
                              /5
                            </div>
                          </div>
                        </div>
                        <div className="col-12" id="fs11">
                          <div className="row">
                            <div className="col-lg-4 d-none d-lg-block ">
                              You Save ₹500{" "}
                            </div>
                            <div className="col-lg-6 col-12 ">
                              Price For You {item.price} ₹
                            </div>
                          </div>
                        </div>
                        <div className="col-12 d-none d-lg-block" id="fs11">
                          <div className="row">
                            <div className="col">
                              <span
                                className="text-primary"
                                style={{ cursor: "pointer" }}
                              >
                                Login
                              </span>{" "}
                              & get additional ₹237 off using eCash
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="col-3 d-none d-lg-block">
                      <button
                        onClick={() => this.handleBook(item)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        {" "}
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowHotel;
