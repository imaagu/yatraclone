import React, { Component } from "react";
import service from "../../services/apiService";
import "../../cssFile/booking.css";
class ReviewRoom extends Component {
  state = {
    data: { email: "", mobile: "", fname: "", lname: "" },
    errors: {},
    promo: "",
    room: {},
    hotel: {},
    details: {},
    s: [0, 1, 2, 3, 4],
    can: "",
  };

  async componentDidMount() {
    try {
      const data = await service.getSelRoom();
      const details = await service.getDetails();
      this.setState({ room: data.room, hotel: data.hotel, details });
      console.log(data, details);
    } catch (ex) {}
  }

  handleClick = async () => {
    let data = this.state.data;
    let promo = this.state.promo;
    let can = this.state.can;
    promo = promo ? promo : 0;
    //can = can ? can : 0;
    let totalprice = +this.state.room.price + +can - +promo;
    console.log("can", can);
    await service.setBasic(
      data.fname,
      data.lname,
      data.email,
      data.mobile,
      totalprice
    );
    await service.setSelRoom(this.state.room, this.state.hotel);
    window.location = "/payment";
    console.log(totalprice);
  };

  handleChange = (e) => {
    let errString = this.validateInput(e);
    const errors = { ...this.state.errors };
    errors[e.currentTarget.name] = errString;
    let data = { ...this.state.data };
    let promo = this.state.promo;

    let can = this.state.can;
    if (e.currentTarget.name === "promo") {
      promo = e.currentTarget.value;
    }
    if (e.currentTarget.name === "can") {
      if (can === "1000") {
        can = "";
      } else {
        can = e.currentTarget.value;
      }
    }

    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data: data, errors: errors, promo, can });
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
    return (
      <div style={{ background: "lightgrey" }}>
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="row m-2 ">
              <div className="col-1 text-left" style={{ fontSize: 25 }}>
                <i className="fab fa-wpforms"></i>
              </div>
              <div
                className="col-lg-8 col-10 text-left"
                style={{
                  fontWeight: "500",
                  fontSize: "1.429rem",
                  color: "#43264e",
                }}
              >
                Review your Bookings
              </div>
            </div>
            <div className="row bg-white box2 ">
              <div className="col-12">
                <div className="row bg-white" style={{ paddingTop: 12 }}>
                  <div className="col-4">
                    <img src={this.state.room.img} className="img-fluid" />
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                      className="text-center"
                    >
                      {this.state.room.name}
                    </span>
                  </div>
                  <div className="col-8">
                    <div className="row fs13 ">
                      <div className="col-12 col-lg-7 ">
                        <b>{this.state.hotel.name}</b>
                      </div>
                      <div className="col-lg-5 d-none d-lg-block  text-left">
                        {this.state.s.map((it) => (
                          <React.Fragment key={it}>
                            <i
                              className={
                                it <= this.state.hotel.rating
                                  ? "fa fa-star text-danger"
                                  : "fa fa-star text-muted"
                              }
                              aria-hidden="true"
                            ></i>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="row text-muted fs11">
                      <div className="col">
                        Candolim Rd, Opp. Candolim CafA@ Coffee Day, Next To
                        Ginger Tree Beach Resort, Aradi, Candolim, Bardez,{" "}
                        {this.state.hotel.city} , 403516 , India
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row bg-white" style={{ paddingTop: 12 }}>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-5 mr-1  border">
                        <div className="row">
                          <div className="col-12 icon-holder">
                            <span>
                              {this.state.details.Checkin ? (
                                <React.Fragment>
                                  {this.state.details.Checkin.substring(0, 2)}
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                          <div
                            className="col-12 text-center"
                            style={{ fontSize: 10 }}
                          >
                            <span>
                              {this.state.details.Checkin ? (
                                <React.Fragment>
                                  {this.state.details.Checkin.substring(
                                    2,
                                    this.state.details.Checkin.length
                                  )}
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 mr-1  border">
                        <div className="row">
                          <div className="col-12 icon-holder">
                            <span>
                              {this.state.details.Checkout ? (
                                <React.Fragment>
                                  {this.state.details.Checkout.substring(0, 2)}
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                          <div
                            className="col-12 text-center"
                            style={{ fontSize: 10 }}
                          >
                            <span>
                              {this.state.details.Checkout ? (
                                <React.Fragment>
                                  {this.state.details.Checkout.substring(
                                    2,
                                    this.state.details.Checkout.length
                                  )}
                                </React.Fragment>
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row border"></div>
                <div
                  className="row bg-white text-secondary"
                  style={{ paddingTop: 12 }}
                >
                  <div className="col-12 ">
                    {this.state.details.rooms ? (
                      <React.Fragment>
                        {this.state.details.rooms.map((room, index) => (
                          <div key={index}>
                            Room: {index + 1} &nbsp;&nbsp; {room.adult} Adult
                          </div>
                        ))}
                      </React.Fragment>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row border"></div>
                <div
                  className="row bg-white text-secondary"
                  style={{ paddingTop: 12, fontSize: 13 }}
                >
                  <div className="col-12">Inclusion:</div>
                  <div className="col-12">
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <i style={{ color: "green" }} className="fa fa-check"></i>
                    &nbsp;<b>Only Room.</b>
                  </div>
                </div>
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
                      className="form-check-input ng-untouched ng-pristine ng-valid"
                      id="can"
                      name="can"
                      type="checkbox"
                      value="1000"
                      onChange={this.handleChange}
                      id="1000"
                      checked={"1000" === this.state.can}
                    />
                  </div>
                  <div className="col-1">
                    <i className="fa fa-building" style={{ color: "green" }}>
                      {" "}
                    </i>
                  </div>
                </div>
                <div className="row text-success fs10">
                  <div className="col ml-1">Cancellation Policy</div>
                </div>
                <div className="row fs14">
                  <div className="col ml-1">
                    Zero cancellation fee for your room booking when you cancel.
                    Pay additional Rs 1000
                  </div>
                </div>
                <div className="row bg-white">
                  <div
                    className="col-12 text-center fs14 d-none d-lg-block"
                    style={{ backgroundColor: "#FFFCC7" }}
                  >
                    Offer on Hotels: Get additional refund of upto Rs 5,051 in
                    case of cancellation. Terms & Conditions
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
                Enter Traveller Details |{" "}
                <span className="text-primary" style={{ cursor: "pointer" }}>
                  Sign in
                </span>{" "}
                &nbsp;
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
            <div className="row bg-white box2">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-lg-2 col-4  fs14">
                    <b>Contact: </b>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-5 m-1 form-group">
                        <input
                          value={this.state.data.email}
                          onChange={this.handleChange}
                          className="form-control"
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
                      <div className="col-5 m-1 form-group">
                        <input
                          value={this.state.data.mobile}
                          onChange={this.handleChange}
                          className="form-control"
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
                    proof
                  </div>
                </div>
                <form>
                  <div className="row bg-white ng-ununtouched ng-pristine ng-invalid">
                    <div className="col-12">
                      <div className="row ng-untouched ng-pristine ng-invalid">
                        <div className="col-lg-2 col-12 fs14">
                          <label>Rooms: {this.state.details.totalrooms}</label>
                        </div>
                        <div className="col-6 col-lg-5 form-group">
                          <input
                            value={this.state.data.fname}
                            onChange={this.handleChange}
                            className="form-control"
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
                        <div className="col-lg-5 col-6 form-group">
                          <input
                            value={this.state.data.lname}
                            onChange={this.handleChange}
                            className="form-control"
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
                      className="fa fa-university"
                      style={{ fontSize: 35 }}
                    ></i>{" "}
                  </div>
                  <div className="col-10 text-left">
                    <div className="row fs14">
                      <b>Add your GST Details (Optional)</b>
                    </div>{" "}
                    <div className="row fs14">
                      Claim credit of GST charges. Your taxes may get updated
                      post submitting your GST details
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
          </div>
          <div className="col-lg-3 col-12">
            <br />
            <div className="row">
              <div
                className="col "
                style={{ color: "black", fontWeight: "500" }}
              >
                Tariff Details
              </div>{" "}
            </div>

            <div className="row bg-white ml-1 mr-1 mt-1  box3">
              <div className="col-12">
                <div className="row bg-white">
                  <div className="col-8 text-left fs11">Hotal Charges</div>
                  <div className="col-4 text-right fs11">
                    ₹ {+this.state.room.price + 922}
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-8 text-left fs11">
                    Discounts &nbsp;
                    <i className="fa fa-question-circle-o"></i>
                  </div>
                  <div className="col-4 text-right fs11"> ₹ 922</div>
                </div>
                <div className="row bg-white">
                  <div className="col-12 text-center">
                    <hr />
                  </div>
                </div>
                <div className="row bg-white">
                  <div className="col-6 text-left fs12zz">Total Fare</div>
                  <div className="col-6 text-right fs12zz">
                    ₹ {this.state.room.price}
                  </div>
                </div>
                {this.state.can !== "" ? (
                  <div className="row text-muted bg-white">
                    <div className="col-6 text-left fs12zz">
                      Add on(
                      {this.state.can ? "1" : ""})
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row box4 ml-1 mr-1" style={{ fontSize: "1.5rem" }}>
              <div className="col-6 text-left">You Pay</div>
              <div className="col-6 text-right">
                {" "}
                ₹{" "}
                {(+this.state.room.price === "NAN"
                  ? "0"
                  : +this.state.room.price) -
                  +this.state.promo +
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
                          &nbsp;BSTHOTEL
                        </span>
                      </label>
                      <div className="row">
                        <div
                          className="col-10"
                          style={{ fontSize: 12, color: "#999" }}
                        >
                          Pay with PayPal to save upto Rs. 1400 on Indian Hotels
                          (Max. discount Rs. 600 + 50% cashback up to Rs. 800)
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
                          &nbsp;YTAMZXX
                        </span>
                      </label>
                      <div className="row">
                        <div
                          className="col-10"
                          style={{ fontSize: 12, color: "#999" }}
                        >
                          Save up to Rs. 1,000 (Flat 10% (max Rs. 500) instant
                          OFF + Flat 5% (max Rs. 500) cashback).
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
              className="btn btn-danger  text-white"
              style={{ borderRadius: 2 }}
              disabled={this.isformInvalid()}
            >
              continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewRoom;
