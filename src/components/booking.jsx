import React, { Component } from "react";
import flightService from "../services/flightService";
import service from "../services/apiService";
import "../cssFile/booking.css";

class Booking extends Component {
  state = {
    booking: [],
    details: {},
    data: { email: "", mobile: "", fname: "", lname: "" },
    errors: {},
    promo: "",
    protection: "",
    can: "",
  };

  async componentDidMount() {
    try {
      const booking = await flightService.getBooking();
      const details = await service.getDetails();
      this.setState({ booking: booking.data, details });
      console.log(booking);
    } catch (ex) {}
  }

  handleChange = (e) => {
    let errString = this.validateInput(e);
    const errors = { ...this.state.errors };
    errors[e.currentTarget.name] = errString;
    let data = { ...this.state.data };
    let promo = this.state.promo;
    let protection = this.state.protection;
    let can = this.state.can;
    if (e.currentTarget.name === "promo") {
      promo = e.currentTarget.value;
    }
    if (e.currentTarget.name === "can") {
      if (can === "747") {
        can = "";
      } else {
        can = e.currentTarget.value;
      }
    }
    if (e.currentTarget.name === "protection") {
      if (protection === "269") {
        protection = "";
      } else {
        protection = e.currentTarget.value;
      }
    }
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data: data, errors: errors, promo, protection, can });
  };

  handleClick = async () => {
    let total = 0;
    let tickets = this.state.details.tickets;
    if (this.state.booking) {
      for (var i = 0; i < this.state.booking.length; i++) {
        total = total + +this.state.booking[i].Price;
      }
      total = total * tickets;
    }
    let data = this.state.data;
    let promo = this.state.promo;
    let protection = this.state.protection;
    let totalprice =
      622 +
      (total === "NAN" ? "0" : +total) -
      +promo +
      +protection +
      +this.state.can;

    await service.setBasic(
      data.fname,
      data.lname,
      data.email,
      data.mobile,

      totalprice
    );
    window.location = "/payment";
  };

  isformInvalid = () => {
    let errs = this.valdate();
    let errCount = Object.keys(errs).length;
    console.log(errCount);
    return errCount > 0;
  };

  valdate = () => {
    let err = [];
    if (!this.state.data.email) err.email = "Email is required";
    var check = 0;
    for (var i = 0; i < this.state.data.email.length; i++)
      if (this.state.data.email.charAt(i) === "@") check = 1;

    if (check === 0) err.email = "Not a valid email";
    if (!this.state.data.mobile) err.mobile = "Mobile is required";
    else if (this.state.data.mobile.length !== 10)
      err.password = "Enter valid mobile number";
    if (!this.state.data.fname) err.fname = "First Name is required";
    if (!this.state.data.lname) err.lname = "Last Name is required";

    return err;
  };

  validateInput = (e) => {
    switch (e.currentTarget.name) {
      case "email": {
        if (!e.currentTarget.value) {
          return "Email is required";
        }
        var check = 0;
        for (var i = 0; i < e.currentTarget.value.length; i++)
          if (
            e.currentTarget.value.charAt(i) === "@" &&
            e.currentTarget.value.charAt(e.currentTarget.value.length - 1) !==
              "@" &&
            e.currentTarget.value.charAt(0) !== "@"
          )
            check = 1;
        if (check === 0) return "Not a valid email";
        break;
      }
      case "mobile": {
        if (!e.currentTarget.value) return "Mobile is required";
        else if (e.currentTarget.value.length !== 10)
          return "Enter valid mobile number";
        break;
      }
      case "fname": {
        if (!e.currentTarget.value) {
          return "First Name is required";
        }
        break;
      }
      case "lname": {
        if (!e.currentTarget.value) {
          return "Last Name is required";
        }
        break;
      }
    }

    return "";
  };

  render() {
    let total = 0;
    let tickets = this.state.details.tickets;
    if (this.state.booking) {
      for (var i = 0; i < this.state.booking.length; i++) {
        total = total + +this.state.booking[i].Price;
      }
      total = total * tickets;
    }

    return (
      <div style={{ background: "lightgrey" }}>
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="row">
              <div className="col-1 text-left" style={{ fontSize: 25 }}>
                <i className="fas fa-search"></i>
              </div>
              <div
                className="col-lg-8 col-10 text-left"
                style={{
                  color: "#43264e",
                  fontWeight: "500",
                  fontSize: "1.429rem",
                }}
              >
                Review your Bookings
              </div>
            </div>
            <div className="row bg-white box2 ">
              <div className="col-12">
                {this.state.booking.map((book, index) => (
                  <React.Fragment key={index}>
                    <div className=" row bg-white" style={{ paddingTop: 12 }}>
                      <div className="col-lg-2 col-12 text-center d-none d-sm-block d-md-none">
                        <div className="row pl-1">
                          <div className="col-4 text-center">
                            <img src={book.logo} style={{ width: 40 }} />
                          </div>
                          <div className="col-4 pt-2 rs1">{book.name}</div>
                          <div className="col-4 pt-2 rs1 ">{book.airBus}</div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-12 text-center d-none d-lg-block">
                        <div className="row pl-1">
                          <div className="col-lg-12 col-12">
                            <img src={book.logo} style={{ width: 40 }} />{" "}
                          </div>
                        </div>
                        <div className="row pl-1">
                          <div className="col-lg-12 col-12">{book.name}</div>
                        </div>
                        <div className="row pl-1 text-secondary">
                          <div className="col-lg-12 col-12">{book.airBus}</div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-4">
                        <div className="row fs12zz">{book.desDept}</div>
                        <div className="row fs13">{book.timeDept}</div>
                        <div className="row text-secondary fs11">{book.T1}</div>
                      </div>
                      <div className="col-lg-6  col-3">
                        <div className="row">
                          <div className="col-lg-4 col-12 text-right fs12zz">
                            {book.total}
                          </div>
                          <div className="col-4 d-none d-lg-block fs12zz">
                            <span className="text-secondary">|</span>&nbsp;
                            <span className="text-secondary">
                              {book.meal} Meal
                            </span>
                            &nbsp;
                            <span className="text-secondary">|</span>
                          </div>
                          <div className="col-4 d-none d-lg-block text-left fs12zz">
                            <span className="text-secondary">
                              {this.state.details.classtype}
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5 d-none d-lg-block">
                            <hr />
                          </div>
                          <div className="col-lg-2 col-12 mt-1 text-center">
                            <i
                              className="fas fa-fighter-jet ic1"
                              aria-hidden="true"
                            ></i>
                          </div>
                          <div className="col-5 d-none d-lg-block">
                            <hr />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-center d-none d-lg-block fs12zz">
                            {book.checkin} &nbsp; | &nbsp;
                            <span className="text-success">
                              Partially Refundable
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-5">
                        <div className="row fs12zz">{book.desArr}</div>
                        <div className="row fs13">{book.timeArr}</div>
                        <div className="row text-secondary fs11">{book.T2}</div>
                      </div>
                    </div>

                    <div className="row bg-white">
                      <div className="col-2 d-none d-lg-black"></div>
                      <div
                        className="col-lg-10 col-12"
                        style={{
                          backgroundColor: "#fffcc7",
                          padding: "8px 15px 7px 15px",
                          borderRadius: 80,
                        }}
                      ></div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <br />
            <div className="row bg-white box2">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-1 text-right"> </div>
                </div>
                <div className="row bg-white">
                  <div className="col-lg-1 col-2 text-right">
                    <input
                      className="form-check-input ng-untouched ng-pristine ng-vald"
                      id="can"
                      name="can"
                      type="checkbox"
                      value="747"
                      onChange={this.handleChange}
                      id="747"
                      checked={"747" === this.state.can}
                    />
                  </div>
                  <div className="col-1">
                    <i
                      className="fas fa-plane-departure"
                      style={{ color: "green" }}
                    >
                      {" "}
                    </i>
                  </div>
                </div>
                <div className="row text-success fs10">
                  <div className="col ml-1">Cancellation Policy</div>
                </div>
                <div className="row fs14">
                  <div className="col ml-1">
                    Zero cancellation fee for your tickets when you cancel. Pay
                    additional Rs. 747
                  </div>
                </div>
                <div className="row bg-white">
                  <div
                    className="col-12 text-center d-none d-lg-block fs14"
                    style={{ backgroundColor: "#FFFCC7" }}
                  >
                    Travel Smart: Get additional refund of Rs 3,051 in case of
                    cancellation. Terms & Conditions
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div
                className="col-1 text-right"
                style={{ fontSize: 25, color: "red" }}
              >
                <i className="fas fa-user-edit"></i>
              </div>
              <div className="col-11 fs10">
                Enter Traveller Details | &nbsp;
                <span
                  className="d-none d-lg-block"
                  style={{
                    fontFamily:
                      "Rubik-Regular , Arial , Helvetica , sans-serif",
                    fontSize: "1rem",
                  }}
                >
                  Sign in to book Faster and use eCash
                </span>
              </div>
            </div>
            <div className="row bg-white box2 ">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-lg-2 col-4 fs14 ">
                    <b>Contact: </b>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-6 form-group">
                        <input
                          value={this.state.data.email}
                          onChange={this.handleChange}
                          className="form-control "
                          id="email"
                          name="email"
                          placeholder="Enter email"
                          type="email"
                        />
                        <div>
                          {this.state.errors.email ? (
                            <div className=" text-danger">
                              {this.state.errors.email}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-6 form-group">
                        <input
                          value={this.state.data.mobile}
                          onChange={this.handleChange}
                          className="form-control "
                          formcontrolname="mobile"
                          id="mobile"
                          name="mobile"
                          placeholder="Enter Mobile"
                          type="text"
                        />
                        <div>
                          {this.state.errors.mobile ? (
                            <div className=" text-danger">
                              {this.state.errors.mobile}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="row bg-white"
                  style={{ color: "#666", fontSize: "1rem" }}
                >
                  <div className="col-2 d-none d-lg-block"> </div>
                  <div className="col-lg-10 col-12 fs14">
                    Your booking details will be sent to this email address and
                    mobile number
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-2 d-none d-lg-block"></div>
                  <div className="col-lg-10 col-12 fs14">
                    Also send my booking details onWhatsApp &nbsp;
                    <i
                      className="fab fa-whatsapp-square"
                      aria-hidden="true"
                      style={{ color: "green", fontSize: 18 }}
                    ></i>
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-2 d-none d-lg-block"></div>
                  <div className="col-lg-10 col-12">
                    <hr />
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-2 d-none d-lg-block"></div>
                  <div className="col-10 fs14">
                    <b>Traveller Information</b>
                  </div>
                </div>
                <div className="row bg-white" style={{ fontSize: "1rem" }}>
                  <div className="col-2 d-none d-lg-block"></div>
                  <div className="col-lg-10 col-12 fs14">
                    <b>Important Note: </b>
                    Please ensure that the names of the passengers on the travel
                    documents is the same as on their government issued identity
                    proof.
                  </div>
                </div>
                <form className="ng-touched ng-invalid ng-dirty">
                  <div className="row bg-white ng-invalid ng-dirty ng-touched">
                    <div className="col-12">
                      <div className="row  ng-dirty ng-invalid ng-touched">
                        <div className="col-lg-2 col-12 fs14">
                          <label>Tickets: {this.state.details.tickets}</label>
                        </div>
                        <div className="col-5">
                          <input
                            value={this.state.data.fname}
                            onChange={this.handleChange}
                            className="form-control "
                            formcontrolname="fname"
                            id="fname"
                            name="fname"
                            placeholder="First Name"
                            type="text"
                          />
                          <div>
                            {this.state.errors.fname ? (
                              <div className=" text-danger">
                                {this.state.errors.fname}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-5">
                          <input
                            value={this.state.data.lname}
                            onChange={this.handleChange}
                            className="form-control "
                            formcontrolname="lname"
                            id="lname"
                            name="lname"
                            placeholder="Last Name"
                            type="text"
                          />
                          <div>
                            {this.state.errors.lname ? (
                              <div className=" text-danger">
                                {this.state.errors.lname}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row bg-white box2">
              <div className="col-12 d-none d-lg-block">
                <div
                  className="row bg-white"
                  style={{ color: "#666", fontSize: "1rem" }}
                >
                  <div className="col-1 text-center mt-1">
                    <i
                      className="fas fa-university"
                      style={{ fontSize: 35 }}
                    ></i>{" "}
                  </div>
                  <div className="col-10 text-left">
                    <div className="row fs14">
                      <b>Add your GST Details (Optional)</b>
                    </div>{" "}
                    <div className="row fs14">
                      Claim credit of GST charges. Your taxes may get updated
                      post submitting your GST details.
                    </div>
                  </div>
                </div>
                <div
                  className="row bg-white"
                  style={{ color: "#666", fontSize: "1rem" }}
                >
                  <div className="col-1 text-center">
                    <i
                      className="fas fa-suitcase-rolling"
                      aria-hidden="true"
                      style={{ fontSize: 35 }}
                    ></i>
                  </div>
                  <div className="col-10 text-left">
                    <div className="row fs14">
                      <b>Travelling for Work</b>{" "}
                    </div>
                    <div className="row fs14">
                      Join Yatra for Business. View Benifits
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-2">
              <div
                className="col-1 text-right"
                style={{ fontSize: 25, color: "red" }}
              >
                <i className="fas fa-umbrella"></i>
              </div>
              <div className="col-11 fs10">
                Travel Protection &nbsp;
                <span className="fs14">(Recommended)</span>
              </div>
            </div>
            <div className="row bg-white box2">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-2 text-center">
                    <input
                      className="form-check-input ng-untouched ng-pristine ng-valid"
                      id="protection"
                      name="protection"
                      type="checkbox"
                      value="269"
                      onChange={this.handleChange}
                      id="269"
                      checked={"269" === this.state.protection}
                    />
                  </div>
                  <div className="col-10 mt-1 fs14">
                    Yes , Add Travel Protection to protect my trip (Rs. 269 per
                    traveller)
                  </div>
                </div>
                <div
                  className="row bg-white"
                  style={{ color: "#DB9A00", fontSize: "1.143rem" }}
                >
                  <div className="col-1 d-none d-lg-block"></div>
                  <div className="col-11 d-none d-lg-block fs14">
                    6000+ travellers on Yatra protect their trip daily. &nbsp;
                    <span className="text-primary">Learn More</span>
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-12 fs14 text-left text-muted d-none d-lg-block">
                    Cover Includes:
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-4 fs14 text-center d-none d-lg-block">
                    <div className="row">
                      <div className="col text-left">
                        <span className="fa-stack fa-2x">
                          <i className="fa - fa-circle fa-stack-2x"></i>
                          <i className="fas fa-plane-departure fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Trip Cancellation
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Claim upto Rs. 25,000
                    </div>
                  </div>
                  <div className="col-4 fs14 text-center d-none d-lg-block">
                    <div className="row mb-1">
                      <div className="col text-left">
                        <span className="fa-stack fa-2x">
                          <i className="fa - fa-circle fa-stack-2x"></i>
                          <i className="fas fa-suitcase-rolling fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Loss of Baggage{" "}
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Claim upto Rs. 10,000
                    </div>
                  </div>
                  <div className="col-4 fs14 text-center d-none d-lg-block">
                    <div className="row mb-1">
                      <div className="col text-left">
                        <span className="fa-stack fa-2x">
                          <i className="fa - fa-circle fa-stack-2x"></i>
                          <i className="fa fa-ambulance fa-stack-1x fa-inverse"></i>
                        </span>
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Medical Emergency{" "}
                    </div>
                    <div className="row" style={{ fontSize: "0.87rem" }}>
                      Claim upto Rs. 20,000
                    </div>
                  </div>
                </div>
                <div className="row bg-white">
                  <div
                    className="col-12 text-center d-none d-lg-block"
                    style={{ fontSize: "0.87rem" }}
                  >
                    Note: Travel Protection is applicable only for Indian
                    citizen below the age of 70 years. &nbsp;
                    <span className="text-primary">Terms & Conditions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="row mt-1">
              <div
                className="col"
                style={{ color: "black", fontWeight: "500" }}
              >
                Fare Details
              </div>{" "}
            </div>
            <div className="row bg-white box3 ml-1 mt-1 mr-1">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-8 text-left fs11">
                    Base Fare({tickets} Traveller)
                  </div>
                  <div className="col-4 text-right fs11">
                    ₹ {total === "NAN" ? "0" : total}
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-8 text-left fs11">Fees & Surcharge</div>
                  <div className="col-4 text-right fs11"> ₹ 622</div>
                </div>
                <div className="row bg-white">
                  <div className="col-12 text-center">
                    <hr />
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-6 text-left fs12zz">Total Fare</div>
                  <div className="col-6 text-right fs12zz">
                    ₹ {622 + (total === "NAN" ? "0" : total)}
                  </div>
                </div>
                {this.state.protection !== "" || this.state.can !== "" ? (
                  <div className="row text-muted bg-white">
                    <div className="col-6 text-left fs12zz">
                      Add on(
                      {this.state.protection && this.state.can ? "2" : "1"})
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row box4 ml-1 mr-1" style={{ fontSize: "1.5rem" }}>
              <div className="col-6 text-left ">You Pay</div>
              <div className="col-6 text-right ">
                {" "}
                ₹{" "}
                {622 +
                  (total === "NAN" ? "0" : total) -
                  +this.state.promo +
                  +this.state.protection +
                  +this.state.can}
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col">Promo</div>
            </div>
            <div className="row bg-white mr-1 ml-1 box3">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">Select A Promo Code </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-check ml-3">
                      <input
                        checked={"1400" === this.state.promo}
                        className="form-check-input ng-valid ng-dirlty ng-touched"
                        name="promo"
                        type="radio"
                        value="1400"
                        onChange={this.handleChange}
                        id="1400"
                      />
                      <label
                        className="form-check-label promobox"
                        htmlFor="promo"
                        id="1400"
                      >
                        <span style={{ fontSize: 12, color: "#02CB66" }}>
                          &nbsp;NEWPAY
                        </span>
                      </label>
                      <div className="row">
                        <div
                          className="col-10"
                          style={{ fontSize: 12, color: "#999" }}
                        >
                          Pay with PayPal to save upto Rs. 1400 on Domestic
                          flights (Max. discount Rs. 600 + 50% cashback up to
                          Rs. 800)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="form-check ml-3">
                      <input
                        checked={"2000" === this.state.promo}
                        className="form-check-input ng-valid ng-dirlty ng-touched"
                        name="promo"
                        type="radio"
                        value="2000"
                        onChange={this.handleChange}
                        id="2000"
                      />
                      <label
                        className="form-check-label promobox"
                        htmlFor="promo"
                        id="2000"
                      >
                        <span style={{ fontSize: 12, color: "#02CB66" }}>
                          &nbsp;YTAMZ19
                        </span>
                      </label>
                      <div className="row">
                        <div
                          className="col-10"
                          style={{ fontSize: 12, color: "#999" }}
                        >
                          Save up to Rs. 2,000 (Flat 6% (max Rs. 1,000) instant
                          OFF + Flat 5% (max Rs. 1,000) cashback).
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ background: "lightgrey" }}>
          <div className="col-12 text-center">
            <button
              onClick={() => this.handleClick()}
              className="btn btn-danger text-white"
              style={{ borderRadius: 2 }}
              disabled={this.isformInvalid()}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Booking;
