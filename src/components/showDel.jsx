import React, { Component } from "react";
import "../cssFile/box.css";
import makeRadio from "./common/makeRadioStructure";
class ShowDel extends Component {
  state = {
    show: 0,
  };

  handleShow(show) {
    this.setState({ show });
  }

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let { sel1, sel2, onChange } = this.props;
    if (input.name === "data1") {
      sel1 = input.value;
    }

    if (input.name === "data2") {
      sel2 = input.value;
    }

    //  console.log(check2);

    onChange(sel1, sel2);
  };

  render() {
    let { d, item, sel1, sel2, name, onBook } = this.props;

    return (
      <div className="row mt-1 ml-3 pt-2" id="box1" style={{ borderRadius: 5 }}>
        <div className="col">
          <div className="row">
            <div className="col-lg-2 col-2">
              <img src={item.logo} id="img1" />{" "}
            </div>
            <div className="col-lg-1 col-3 text-right" id="fs9">
              <div className="row">{item.timeDept}</div>
              <div className="row" style={{ fontSize: "x-small" }}>
                {item.name}
              </div>
            </div>
            <div className="col-lg-2  col-2">
              <hr
                style={{
                  border: "solid 1px lightgrey ",
                }}
              />
            </div>
            <div className="col-lg-1 col-3 text-left" id="fs9">
              <div className="row">{item.timeArr}</div>
            </div>
            <div className="col-1 pt-1 d-none d-lg-block">
              <span
                style={{ borderLeft: "3px solid lightgrey", height: 60 }}
              ></span>
            </div>
            <div className="col-lg-2 col-6  text-right" id="fs8">
              <div className="row">
                <div className="col">{item.total}</div>
              </div>
              <div className="row">
                <div className="col">Non-Stop</div>
              </div>
            </div>
            <div className="col-lg-2 col-3 text-left" style={{ fontSize: 14 }}>
              <strong>₹{item.Price}</strong>
            </div>
            {d.returndate !== "" ? (
              <div className="col-1 text-right">
                <input
                  name={name}
                  value={item.id}
                  checked={sel1 === item.id || sel2 === item.id}
                  type="radio"
                  id={item.id}
                  onChange={this.handleChange}
                  className="ng-untouched ng-pristine ng-valid"
                />
              </div>
            ) : (
              ""
            )}

            {d.returndate === "" ? (
              <div className="col-lg-1 col-3 text-right">
                <button
                  onClick={() => onBook(item.id)}
                  id="btn"
                  className="btn  btn-sm btn-outline-danger text-danger"
                >
                  <strong>Book</strong>{" "}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <hr style={{ padding: 0, margin: 0 }} />
          <div className="row pb-1 pt-0">
            <div className="col-7 d-none d-lg-block ">
              <a
                onClick={() => this.props.onshow(item.id)}
                style={{ fontSize: 12, color: "blue", cursor: "pointer" }}
              >
                Flight Details &nbsp;
                <i className="fas fa-angle-down"></i>
              </a>
            </div>
            <div className="col-5 text-right d-none d-lg-block">
              <span id="rect">eCash</span>
              <span id="rect1">&nbsp;₹250</span>{" "}
            </div>
          </div>
          {this.props.ticket === item.id ? (
            <div className="row">
              <div className="col-7 d-none d-lg-block">
                <div
                  className="row"
                  style={{
                    backgroundColor: "#301b41",
                    fontSize: 20,
                    paddingTop: 6,
                    paddingBottom: 6,
                    paddingLeft: 8,
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  Flight Details
                </div>
                <br />
                <div className="row">
                  {" "}
                  <div className="col-3">
                    <img style={{ width: 40 }} src={item.logo} />{" "}
                  </div>
                  <div className="col-6 text-left">
                    <div className="row" style={{ fontSize: 12 }}>
                      {item.name}
                    </div>
                    <div
                      className="row"
                      style={{ fontSize: 10, color: "grey" }}
                    >
                      {item.airBus}
                    </div>
                  </div>
                  <div className="col-2 text-right">
                    <img
                      src="https://i.ibb.co/31BTG9K/icons8-food-100.png"
                      style={{ width: 45 }}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-3 ml-1" style={{ fontSize: 14 }}>
                    <div className="row ml-1">{item.desDept}</div>
                    <div className="row ml-1">
                      <strong>{item.timeDept}</strong>
                    </div>
                    <div className="row ml-1" style={{ fontSize: 12 }}>
                      {item.T1}
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="row" style={{ fontSize: 12 }}>
                      <div className="col-12 text-center">Time Taken</div>
                    </div>
                    <div className="row text-center">
                      <div className="col-2"></div>
                      <div className="col-6">
                        <hr />
                      </div>
                      <div className="col-2 pt-2" style={{ fontSize: 10 }}>
                        <i className="fa fa-plane"></i>
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: 12 }}>
                      <div className="col-12 text-center">{item.total}</div>
                    </div>
                  </div>
                  <div className="col-3" style={{ fontSize: 14 }}>
                    <div className="row">{item.desArr}</div>
                    <div className="row">
                      <strong>{item.timeArr}</strong>
                    </div>
                    <div className="row" style={{ fontSize: 12 }}>
                      {item.T2}
                    </div>
                  </div>
                </div>
                <br />
                <div
                  className="row ml2 mr-2"
                  style={{
                    fontSize: 12,
                    borderRadius: 5,
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <div className="col text-center">
                    Checkin Baggage &nbsp;
                    <i className="fa fa-briefcase" style={{ fontSize: 10 }}></i>
                    &nbsp; {item.checkin} kg
                  </div>
                </div>
              </div>
              <div
                className="col-5 d-none d-lg-block"
                style={{ backgroundColor: "#5a426d", color: "white" }}
              >
                <div className="row pl-1 pt-3 pb-3">
                  <div
                    onClick={() => this.handleShow(0)}
                    className={
                      this.state.show === 0 ? "col-6 border-bottom" : "col-6"
                    }
                  >
                    Fare Summary
                  </div>
                  <div
                    onClick={() => this.handleShow(1)}
                    className={
                      this.state.show === 1 ? "col-6 border-bottom" : "col-6"
                    }
                  >
                    Fare Rules
                  </div>
                </div>
                {this.state.show === 0 ? (
                  <div>
                    <div className="row" style={{ fontSize: 14 }}>
                      <div className="col-4">Fare Summary</div>
                      <div className="col-4">Base and Fare</div>
                      <div className="col-4">Fees and Taxes</div>
                    </div>
                    <div
                      className="row"
                      style={{ fontSize: 12, color: "#fff" }}
                    >
                      <div className="col-4">Tickets: {d.tickets}</div>
                      <div className="col-4">₹ {item.Price * d.tickets}</div>
                      <div className="col-4">₹1000</div>
                    </div>
                    <hr />
                    <div className="row" style={{ fontSize: 16 }}>
                      <div className="col-6"> You Pay: </div>
                      <div className="col-6 text-right">
                        {" "}
                        ₹ {item.Price * d.tickets + 1000}{" "}
                      </div>
                    </div>
                    <hr />
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-12">
                        Note: Total fare displayed above has been rounded off
                        and may show a slight difference from actual fare{" "}
                      </div>
                    </div>
                    {d.returndate === "" ? (
                      <div className="ow pt-2 pb-2">
                        <div className="col-12 text-center">
                          <button
                            onClick={() => onBook(item.id)}
                            className="btn btn-danger text-white btn-block"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="row pt-2 pb-2">
                      <div className="col-12 text-center"></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="row">
                      <div className="col" style={{ fontSize: 16 }}>
                        Airline Cancellation Fee
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: 14 }}>
                      <div className="col-6">Duration</div>
                      <div className="col-6">Per Passenger</div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-6">0 hour to 2 hours</div>
                      <div className="col-6">Non-Refundable</div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-6">2 hours</div>
                      <div className="col-6">₹ 5,250</div>
                    </div>
                    <div
                      className="row pt-2"
                      style={{
                        backgroundColor: "#59406A",
                        fontSize: ".78571rem",
                      }}
                    >
                      <div className="col-12">
                        We would recommend that you reschedule/cancel your
                        tickets atleast 72 hours priop to the flight departure
                      </div>
                    </div>
                    <br />
                    <div className="row" style={{ fontSize: 16 }}>
                      <div className="col-12">Yatra Service Fee (YSF)**</div>
                    </div>
                    <div className="row">
                      <div className="col-12" style={{ fontSize: 12 }}>
                        (charged as per passenger in addition to airline fee as
                        applicable)
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-6">Cancellation Service Fee</div>
                      <div className="col-6">₹ 400</div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-6">
                        Online Rescheduling Service Fee
                      </div>
                      <div className="col-6">₹ 400</div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-6">
                        Offline Rescheduling Service Fee
                      </div>
                      <div className="col-6">₹ 400</div>
                    </div>
                    <br />
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-12">
                        Prior to the date/time of departure
                      </div>
                    </div>
                    <div className="row" style={{ fontSize: ".78571rem" }}>
                      <div className="col-12">
                        **Please note: Yatra service fee is over and above the
                        airline cancellation fee due to which refund type may
                        vary
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default ShowDel;
