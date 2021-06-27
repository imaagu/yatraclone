import React, { Component } from "react";
import service from "../services/apiService";
import { Link } from "react-router-dom";
import "../cssFile/booking.css";
import logo from "../images/owl.png";
import ImgSlider from "./common/imageSlider";
class ShowHotelDetails extends Component {
  state = {
    details: {},
    hotel: {},
    s: [0, 1, 2, 3, 4],
  };
  async componentDidMount() {
    let params = this.props.match.params;
    let details = await service.getDetails();
    let hotel = await service.getHotelByName(params.name);
    console.log(details, hotel);
    this.setState({ details, hotel });
  }

  handleBook = async (room) => {
    let params = this.props.match.params;
    let hotel = await service.getHotelByName(params.name);
    await service.setSelRoom(room, hotel);
    window.location = "/hotel-checkout";
  };

  handleAv = () => {
    alert("Rooms are available");
  };

  render() {
    return (
      <div style={{ backgroundColor: "lightgray" }}>
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
            <Link
              to="/yatra/hotels"
              style={{ cursor: "pointer", color: "#fff" }}
            >
              <i className="fa fa-chevron-left"></i>{" "}
            </Link>
          </div>{" "}
          <div className="col-8 ">
            <div className="row">
              <div className="col-12" style={{ fontWeight: "bold" }}>
                {this.state.hotel.name}
                &nbsp; &nbsp;
                <span>
                  {this.state.s.map((it) => (
                    <React.Fragment key={it}>
                      <i
                        className={
                          it >= this.state.hotel.rating
                            ? "fa fa-star"
                            : "fa fa-star-o"
                        }
                        aria-hidden="true"
                      ></i>
                    </React.Fragment>
                  ))}
                </span>
              </div>
              <div className="col-12">
                <div className="row" style={{ fontSize: 15 }}>
                  <div className="col-12">
                    Candolim Road, Opp. Candolim CafA@ Coffee Day , Next To
                    Ginger Tree.. , {this.state.hotel.city}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <br />

          <div id="box2">
            <div className="row  ">
              <div
                className="col-lg-8 col-12  text-center img-fluid"
                style={{
                  display: "inline-block",
                  width: "100%",
                }}
              >
                {this.state.hotel.imgs ? (
                  <ImgSlider imgs={this.state.hotel.imgs} ind={1} />
                ) : (
                  ""
                )}
              </div>
              <div className="col-lg-4  col-12">
                <div className="row">
                  <span
                    className={
                      this.state.hotel.rating > 3
                        ? "text-primary"
                        : this.state.hotel.rating === 3
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {this.state.hotel.rating > 3
                      ? "Good"
                      : this.state.hotel.rating === 3
                      ? "Average"
                      : "Bad"}
                  </span>
                </div>
                <div className="row">
                  <div
                    className={
                      this.state.hotel.rating > 3
                        ? "text-primary col-lg-9 col-12"
                        : this.state.hotel.rating === 3
                        ? "text-success col-lg-9 col-12"
                        : "text-danger col-lg-9 col-12"
                    }
                  >
                    <span>{this.state.hotel.rating}</span>
                    &nbsp;
                    <img src={logo} style={{ height: 40 }} />
                    &nbsp;
                    {this.state.s.map((it) => (
                      <React.Fragment key={it}>
                        <i
                          className={
                            it < this.state.hotel.rating
                              ? "fa fa-circle"
                              : "fa fa-circle-o"
                          }
                          aria-hidden="true"
                        ></i>{" "}
                      </React.Fragment>
                    ))}
                  </div>
                  <div
                    className="col-3 d-none d-lg-block"
                    style={{ fontSize: 12 }}
                  >
                    <Link className="text-secondary" to="">
                      308 REVIEWS
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col">Based on Overall Traveller Rating</div>
                </div>
                <div className="row">
                  <div className="col-12 d-none d-lg-block">
                    <hr />
                  </div>
                  <div className="col-12 d-none d-lg-block">
                    <div className="row">
                      <div className="col-6">
                        <b>Check In: </b>
                      </div>
                      <div className="col-6">{this.state.details.Checkin}</div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <b>Check Out: </b>
                      </div>
                      <div className="col-6">{this.state.details.Checkout}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row m-2 pl-2">
              <div className="col-5 d-none d-lg-block">
                <div className="row">
                  <div className=" col-12 m-2" id="fs14">
                    &nbsp;HIGHLIGHTS
                  </div>{" "}
                  <div className="col-12 ">
                    <span datatoggle="tooltip" title="wifi">
                      <i className="icon-holder fas fa-wifi"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="Parking">
                      <i className="icon-holder fa  fa-car"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="Room service">
                      <i className="icon-holder fas fa-concierge-bell"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="swimming pool">
                      <i className="icon-holder fas  fa-swimming-pool"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-5 d-none d-lg-block">
                <div className="row">
                  <div className=" col-12 m-2 " id="fs14">
                    &nbsp;AMENITIES
                  </div>{" "}
                  <div className="col-12 ">
                    <span datatoggle="tooltip" title="Hot Bath">
                      <i className="icon-holder  fas fa-shower"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="Beach">
                      <i class=" icon-holder fa fa-umbrella"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="Motel">
                      <i className="icon-holder fa fa-glass"></i>
                    </span>
                    &nbsp;
                    <span datatoggle="tooltip" title="5star Room">
                      <i className="icon-holder fa fa-bed"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row text-muted" style={{ fontWeight: "bold" }}>
              <div className="col">OVERVIEW</div>
            </div>
            <div className="row" style={{ fontSize: 12 }}>
              <div className="col">
                Internet access is provided to its patrons at &nbsp;
                {this.state.hotel.name}, which is a budget accommodation in{" "}
                {this.state.hotel.city}. It is 1 km away from Monteiro Bus Stop
                and 2 km from Candolim Beach.This {this.state.hotel.city}{" "}
                property houses a total of 60 well-kept rooms, spread over 5
                floors. Amenities in-room include air conditioner, make-up
                mirror, reading lamp, premium bedding and attached bathroom with
                hot/cold running water. Goveia Holiday Resorts offers laundry,
                airport transportation and room service to its guests. This
                accommodation also features a garden, swimming pool, restaurant,
                Jacuzzi and parking area within the premises. Some of the local
                tourist spots include Chapora Fort (12 km), Vagator Beach (12
                km) and Calangute Beach (5 km). This resort in{" "}
                {this.state.hotel.city} is reachable via travel hubs such as
                Thivim Railway Station (21 km) and Panjim Bus Stand (11 km).
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row ml-2" id="fs13">
          <div className="col-1 d-none d-lg-block "></div>
          <div className="col-9 col-lg-12" style={{ fontSize: "1rem" }}>
            {" "}
            <b>CHOOSE ROOM</b>
          </div>
        </div>
        <div id="box2">
          <div className="row">
            <div className="col-lg-3 col-5" id="fs13">
              CHECK IN
            </div>
            <div className="col-lg-3 col-5" id="fs13">
              CHECK OUT
            </div>
            <div className="col-3 d-none d-lg-block" id="fs13">
              GUESTS-ROOMS
            </div>
            <div className="col-lg-3 d-none d-lg-block  ">
              <button
                onClick={() => this.handleAv()}
                className="btn btn-sm text-white btn-danger"
              >
                {" "}
                Check Availability
              </button>
            </div>
          </div>
          <div className="row text-muted">
            <div className="col-lg-3 col-5" id="fs13">
              {this.state.details.Checkin}
            </div>
            <div className="col-lg-3 col-5" id="fs13">
              {this.state.details.Checkout}
            </div>
            <div className="col-3 d-none d-lg-block" id="fs13">
              {this.state.details.travellers} Guests -
              {this.state.details.totalrooms} Rooms
            </div>
          </div>
          <hr />
          <br />
          {this.state.hotel.rooms ? (
            <React.Fragment>
              {this.state.hotel.rooms.map((room, index) => (
                <div key={index} id="box2">
                  <div className="row">
                    <div className="col">
                      <strong>{room.name}</strong>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 col-lg-3">
                      <img
                        src={room.img}
                        style={{ display: "inline-block", width: "100%" }}
                      />
                    </div>
                    <div className="col-2 d-none d-lg-block">
                      <div className="row">
                        <div className="col-12">Max Guests </div>
                        <div className="col-12">
                          <i className="fa fa-male" aria-hidden="true"></i>
                          <i className="fa fa-male" aria-hidden="true"></i>
                          <i className="fa fa-male" aria-hidden="true"></i>
                          <i className="fa fa-male" aria-hidden="true"></i>
                          <i className="fa fa-child" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-2 d-none d-lg-block">
                      <div className="row" style={{ fontSize: 15 }}>
                        <div className="col-12">
                          <b>Inclusions</b>
                        </div>
                        <div className="col-12">Room only</div>
                      </div>{" "}
                    </div>
                    <div className="col-3  d-none d-lg-block">
                      <div className="row" style={{ fontSize: 15 }}>
                        <div className="col-12">
                          <b>Highlights</b>
                        </div>
                        <div className="col-12">
                          <i className="fa fa-wifi" aria-hidden="true"></i>
                          &nbsp;
                          {this.state.hotel.wifi} wifi
                        </div>
                        <div className="col-12">
                          <i className="fa fa-bath" aria-hidden="true"></i>
                          &nbsp;
                          {this.state.hotel.pool} pool
                        </div>
                        <div className="col-12">
                          <i className="fa fa-cutlery" aria-hidden="true"></i>
                          &nbsp; Free Food
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-lg-2 col-6">
                      <div className="row">
                        <div
                          className="col-12 text-muted"
                          style={{ fontSize: 12 }}
                        >
                          Price for 2 nights
                        </div>
                        <div className="col-12 " style={{ fontSize: 22 }}>
                          {room.price}₹
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 col-10 text-right">
                      <button
                        onClick={() => this.handleBook(room)}
                        className="btn btn-sm btn-danger"
                      >
                        Book Now
                      </button>
                    </div>
                    <br />
                    <div className="col-12">
                      <hr />
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
        <br />
        <div className="row ml-2" id="fs13">
          <div className="col-1 d-none d-lg-block "></div>
          <div className="col-9 col-lg-12" style={{ fontSize: "1rem" }}>
            {" "}
            <b>HOTEL POLICIES</b>
          </div>
        </div>
        <div id="box2">
          <div className="row" style={{ fontSize: 13, fontWeight: "bold" }}>
            <div className="col-lg-3 col-12 ">
              <i className=" fa fa-clock-o"></i>
              &nbsp; Checkin: 12:00 PM
            </div>{" "}
            <div className="col-lg-3 col-12">
              <i className=" fa fa-clock-o"></i>
              &nbsp; Checkout: 10:00 AM
            </div>{" "}
            <div className="col-lg-3 col-12">
              <i className=" fa fa-building"></i>
              &nbsp; ROOMS: 70
            </div>
            <div className="col-lg-3 col-12">
              <i className="fa fa-tag"></i>
              &nbsp; FLOORS: 3
            </div>
          </div>
          <div className="row text-muted mt-1" style={{ fontSize: 13 }}>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; The primary guest must be
                at least 18 years of age to check into this hotel(s).
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; As per Government
                regulations, It is mandatory for all guests above 18 years of
                age to carry a valid photo identity card & address proof at the
                time of check-in. In case, check-in is denied by the hotel(s)
                due to lack of required documents, you cannot claim for the
                refund & the booking will be considered as NO SHOW.
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; Unless mentioned, the
                tariff does not include charges for optional room services (such
                as telephone calls, room service, mini bar, snacks, laundry
                extra bed etc.). In case, such additional charges are levied by
                the hotel(s), we shall not be held responsible for it.
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; Extra bed can be
                accommodated with a folding cot or a mattress, subject to room
                size & availability. 18% GST would be applicable on extra guest
                charges for all the directly contracted properties and may not
                be applicable for properties sourced from external suppliers.
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; The hotel(s) reserves the
                right to decline accommodation to localites/same city residents
                / Posing Couples. Yatra.com will not be responsible for any
                check-in declined by the hotel(s) or any refunds due to the
                above mentioned reason.
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; The hotelier may charge
                your Card/Account for additional cancellation charges, if any.
              </div>
            </div>
            <div className="col-lg-12 d-none d-lg-block  row">
              <div className="col">
                <i className="fa fa-check"></i>&nbsp; All hotel(s) charge a
                compulsory Gala Dinner Supplement on Christmas and New Year's
                eve. Other special supplements may also be applicable during
                festival periods such as Dusshera, Diwali etc. Any such charge
                would have to be cleared directly at the hotel(s).
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default ShowHotelDetails;
