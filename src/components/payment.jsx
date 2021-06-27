import React, { Component } from "react";
import service from "../services/apiService";
import flightService from "../services/flightService";
import "../cssFile/payment.css";
class Payment extends Component {
  state = {
    basic: {},
    details: {},
    room: {},
    booking: [],
    mode: ["UPI", "Credit Card", "Debit Card", "Net Banking", "PayPal"],
    selectmode: "UPI",
  };

  async componentDidMount() {
    let basic = await service.getBasic();

    const booking = await flightService.getBooking();
    let details = await service.getDetails();
    let room = await service.getSelRoom();
    console.log(basic, details, booking, room);
    this.setState({ basic, details, booking: booking.data, room });
  }

  handleSelmode = (item) => {
    this.setState({ selectmode: item });
  };
  render() {
    return (
      <React.Fragment>
        <div className="row" style={{ background: "lightgrey" }}>
          <div className="col-lg-9 col-12">
            <div className="row mt-2 mb-2">
              <div className="col-9 ml-1" style={{ fontSize: 20 }}>
                <strong>
                  <i className="far fa-credit-card"></i>
                  &nbsp; Payment Method
                </strong>
              </div>
            </div>
            <div className="row bg-white ml-1 box">
              <div className="col-lg-2 col-4 text-center fs12">
                {this.state.mode.map((item) => (
                  <div
                    key={item}
                    className={
                      item === this.state.selectmode
                        ? "border btn-primary"
                        : "border bg-light"
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      onClick={() => this.handleSelmode(item)}
                      className="mt-2 mb-2"
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-8 fs12">
                <br />
                <br />
                <div className="row">
                  <div className="col ml-4">
                    <strong>{this.state.selectmode}</strong>
                  </div>
                </div>
                <br />
                <br />
                <div className="row">
                  <div className="col-lg-4 col-5 ml-4" style={{ fontSize: 25 }}>
                    <strong>₹{this.state.basic.total}</strong>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-danger text-white btn-md">
                      Pay Now
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col text-secondary text-center"
                    style={{ fontSize: 12 }}
                  >
                    By clicking Pay Now, you are agreeing to terms and
                    Conditions and Privacy Policy
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            <div className="row mt-2 mb-2">
              <div className="col-11 ml-1 text-left" style={{ fontSize: 16 }}>
                Payment Details
              </div>{" "}
            </div>
            <div className="row bg-white ml-1 mr-1 box3">
              <div className="col">
                <div className="row">
                  <div className="col-9 text-left" style={{ fontSize: "1rem" }}>
                    {" "}
                    {this.state.details.city
                      ? "Total Price"
                      : "Total Flight Price"}
                  </div>
                  <div
                    className="col-3 text-right"
                    style={{ fontSize: "1rem" }}
                  >
                    {" "}
                    ₹{+this.state.basic.total - 350}
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 text-left" style={{ fontSize: "1rem" }}>
                    Convenience Fees
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "1rem" }}
                  >
                    ₹ 350
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div
                    className="col-8 text-left"
                    style={{ fontSize: "1.5rem" }}
                  >
                    <strong>You Pay</strong>
                  </div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "1.5rem" }}
                  >
                    <strong>₹{this.state.basic.total}</strong>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-8 text-left">Earn eCash</div>
                  <div
                    className="col-4 text-right"
                    style={{ fontSize: "1rem" }}
                  >
                    ₹250
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col ml-1">Booking Summary</div>
            </div>
            {this.state.details.city ? (
              <React.Fragment>
                <div className="row bg-white ml-1 mr-1 box3">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-4">Hotel:</div>
                      <div className="col-8 text-right">
                        {this.state.room.hotel.name}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">City:</div>
                      <div className="col-8 text-right">
                        {this.state.room.hotel.city}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">Room:</div>
                      <div className="col-8 text-right">
                        {this.state.room.room.name}
                      </div>
                    </div>
                    <div className="row border-top"></div>
                    {this.state.details.rooms.map((item, index) => (
                      <div className="row">
                        <div className="col-6">Room: {index + 1}</div>
                        <div className="col-6 text-right">
                          Guest: {item.adult + item.child}
                        </div>
                      </div>
                    ))}
                    <div className="row border-top"></div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="row bg-white ml-1 mr-1 box3">
                  {this.state.booking ? (
                    <React.Fragment>
                      {this.state.booking.map((book, index) => (
                        <div key={index} className="col-12">
                          <div className="row">
                            <div className="col-6">
                              <img
                                src={book.logo}
                                alt=""
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 6,
                                }}
                              />
                            </div>
                            <div className="col-5 mr-1 text-right fs12">
                              {book.code}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-5 pl-1 fs12 ">
                              {book.desDept}
                            </div>
                            <div className="col-2 text-left">
                              <i
                                className="fa fa-fighter-jet"
                                style={{ color: "lightgray" }}
                              ></i>{" "}
                            </div>
                            <div className="col-5  fs12">{book.desArr}</div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            )}

            <div className="row ml-1 mr-1 mt-1 mb-1">
              <div className="col">Contact Details</div>
            </div>
            <div className="row bg-white ml-1 mr-1" id="box2">
              <div className="col">
                <div className="row">
                  <div className="col fs1z">
                    {this.state.basic.fname} &nbsp; {this.state.basic.lname}
                  </div>
                </div>
                <hr />
                <div className="row fs1z">
                  <div className="col-4 text-secondary">Email</div>
                  <div className="col-8 text-secondary">
                    {this.state.basic.email}
                  </div>
                </div>
                <div className="row fs1z">
                  <div className="col-4 text-secondary">Phone</div>
                  <div className="col-8 text-secondary">
                    {this.state.basic.mobile}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Payment;
