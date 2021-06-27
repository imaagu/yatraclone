import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../cssFile/navbar.css";
import * as Yup from "yup";
import Calendar from "react-calendar";
import getData from "./getData";
import service from "../services/apiService";

class ShowForm extends React.Component {
  state = {
    data: {},
    show1: 0,
    emptyroomStatus: 1,
    otn: [
      { display: "New Delhi", value: "New Delhi" },
      { display: "Mumbai", value: "Mumbai" },
      { display: "Kolkata", value: "Kolkata" },
      { display: "Banglore", value: "Banglore" },
    ],
    rooms: [{ adult: 1, child: 0 }],

    days: getData.getDays(),
    months: getData.getMonths(),
    newDate: new Date(),
    newDate2: new Date(),
    date: 0,
    date2: 0,
    month: 0,
    month2: 0,
    year: 0,
    year2: 0,
    day: 0,
    day2: 0,
    show: 0,
    show2: 0,
    showbutton: 0,
    to: "",
    from: "",
  };

  componentDidMount() {
    let date = this.state.newDate.getDate();
    let date2 = this.state.newDate2.getDate();
    let month = this.state.newDate.getMonth();

    let year = this.state.newDate.getFullYear();
    let year2 = this.state.newDate2.getFullYear();
    let day = this.state.newDate.getDay();
    let day2 = this.state.newDate2.getDay();
    this.setState({
      date: date,
      date2: date2,
      month2: month,
      month: month,
      year: year,
      year2: year2,
      day: day,
      day2: day2,
    });
  }

  handleS1 = () => {
    let show1 = this.state.show1;
    if (show1 === 1) show1 = 0;
    else show1 = 1;
    this.setState({ show1: show1 });
  };

  handleRoom = (opt, index, val) => {
    let { rooms } = this.state;
    if (opt === "A") {
      if (rooms[index].adult + val >= 0) {
        rooms[index].adult += val;
        this.setState({ rooms });
      }
    }
    if (opt === "C") {
      if (rooms[index].child + val >= 0) {
        rooms[index].child += val;
        this.setState({ rooms });
      }
    }
    let totalP = 0;
    let flag = 1;

    for (var i = 0; i < rooms.length; i++) {
      totalP = totalP + rooms[i].adult + rooms[i].child;
      if (rooms[i].adult + rooms[i].child === 0) {
        flag = 0;
        rooms[i].adult = 1;
      }
    }

    if (flag === 0) {
      alert("Can't book room without selecting candidates");

      this.setState({ rooms });
    }
    if (this.state.city !== "") {
      this.setState({ showbutton: 1 });
    } else {
      this.setState({ showbutton: 0 });
    }
  };

  handleDate = () => {
    let show = this.state.show;
    if (show === 1) show = 0;
    else show = 1;
    this.setState({ show, show2: 0 });
  };

  handleDate2 = () => {
    let show2 = this.state.show2;
    if (show2 === 1) show2 = 0;
    else show2 = 1;
    this.setState({ show2, show: 0 });
  };

  handleChangeDate = (d) => {
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let day = d.getDay();

    if (d <= this.state.newDate2) {
      this.setState({
        newDate: d,
        date: date,
        month: month,
        year: year,
        day: day,
        show: 0,
      });
    } else {
      alert("Depature day must be same or before than arrival day");
    }
  };
  handleChangeDate2 = (d) => {
    let date2 = d.getDate();
    let month2 = d.getMonth();
    let year2 = d.getFullYear();
    let day2 = d.getDay();

    if (d < this.state.newDate) {
      alert("Return day must be same to depature day or future date");
    } else {
      this.setState({
        newDate2: d,
        date2: date2,
        month2: month2,
        year2: year2,
        day2: day2,
        show2: 0,
      });
    }
  };

  handleAddRoom = () => {
    let { rooms } = this.state;
    let p = { adult: 1, child: 0 };
    rooms.push(p);
    this.setState({ rooms });
  };

  handleRemoveRoom = (index) => {
    let { rooms } = this.state;
    rooms.splice(index, 1);
    this.setState({ rooms });
  };

  render() {
    let c1 = this.state.show1 === 1 ? "fa fa-chevron-up" : "fa fa-chevron-down";
    let {
      rooms,
      date,
      date2,
      month,
      month2,
      year,
      year2,
      day2,
      day,
    } = this.state;
    let totalP = 0;
    for (var i = 0; i < rooms.length; i++) {
      totalP = totalP + rooms[i].adult + rooms[i].child;
    }

    return (
      <Formik
        initialValues={{
          from: "",
          date: date + " " + this.state.months[month] + " " + year,
          returndate: date2 + 1 + " " + this.state.months[month2] + " " + year2,
          total: totalP,
        }}
        validate={(values) => {
          this.setState({ city: values.city });

          if (values.from && values.date && values.returndate)
            this.setState({ showbutton: 1 });
          else {
            this.setState({ showbutton: 0 });
          }
        }}
        onSubmit={async (fields) => {
          let array = {};

          array.city = fields.from;
          array.Checkin = date + " " + this.state.months[month] + " " + year;
          array.Checkout =
            date2 + " " + this.state.months[month2] + " " + year2;
          array.travellers = totalP;
          array.totalrooms = this.state.rooms.length;
          array.rooms = rooms;
          await service.setHotelDetails(
            array.city,
            array.Checkin,
            array.Checkout,
            array.travellers,
            array.totalrooms,
            array.rooms
          );
          window.location = "/yatra/hotels";
        }}
        render={({ errors, status, touched }) => (
          <div className="row">
            <div className="col-12 text-center"></div>
            <div className="col-12 text-left m-2 ">
              <Form>
                <div className="row">
                  <div className="form-group col-12 text-left">
                    <label htmlFor="from">
                      Select City, Location , Hotel name
                    </label>
                    <Field
                      name="from"
                      type=""
                      component="select"
                      className={
                        "form-control" +
                        (errors.from && touched.from ? " is-invalid" : "")
                      }
                    >
                      {this.state.otn.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.display}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage
                      name="from"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <br />
                <div className="border border-top"></div>
                <br />
                <div className=" row">
                  <div className="form-group col-lg-6 col-12 text-left row">
                    {" "}
                    <div className="col-12">
                      {" "}
                      <label htmlFor="date">Check-in Date</label>
                      <div
                        className="col-12"
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => this.handleDate()}
                      >
                        {date} {this.state.months[month]}, {year}{" "}
                      </div>
                      <div
                        className="col-12"
                        style={{
                          color: "black",
                        }}
                      >
                        {this.state.days[day]}
                      </div>
                    </div>
                    {this.state.show === 1 ? (
                      <div
                        className="col-12  p-2"
                        style={{
                          display: "inline-block",

                          width: "100%",
                        }}
                      >
                        <Calendar
                          onChange={this.handleChangeDate}
                          value={this.state.newDate}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group col-lg-6 col-12">
                    <div className="col-12">
                      {" "}
                      <label htmlFor="returndate">Check-out Date</label>
                    </div>

                    <div
                      onClick={() => this.handleDate2()}
                      className="col-12"
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 20,
                        cursor: "pointer",
                      }}
                    >
                      {date2} {this.state.months[month2]}, {year2}{" "}
                    </div>
                    <div
                      className="col-12"
                      style={{
                        color: "black",
                      }}
                    >
                      {this.state.days[day2]}
                    </div>
                    {this.state.show2 === 1 ? (
                      <div
                        className="col-12  p-2"
                        style={{
                          display: "inline-block",

                          width: "100%",
                        }}
                      >
                        <Calendar
                          onChange={this.handleChangeDate2}
                          value={this.state.newDate}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <br />
                <div className="border border-top" />
                <br />
                <div className="form-group ">
                  <div className="">
                    <div
                      className="row   "
                      style={{ backgroundColor: "white", borderRadius: 3 }}
                    >
                      <div className="col-12 row">
                        <div
                          className="col-10 row "
                          style={{ fontWeight: "bold" }}
                        >
                          <div className="col-12">
                            <label htmlFor=""> Guest and Hotel</label>
                          </div>
                          <div className="col-12">
                            <label htmlFor="">
                              {totalP}
                              {totalP > 2 ? "Guests" : "Guest"},
                              {this.state.rooms.length}
                              {this.state.rooms.length > 2 ? "Rooms" : "Room"}
                            </label>
                          </div>
                        </div>
                        <div className="col-2 text-right">
                          <i onClick={() => this.handleS1()} className={c1}></i>
                        </div>
                      </div>
                      {this.state.show1 === 1 ? (
                        <React.Fragment>
                          <div className="form-group col-12 row">
                            {this.state.rooms.map((room, index) => (
                              <div
                                key={index}
                                className="col-12 row text-center "
                              >
                                <div className="col-4 row">
                                  {" "}
                                  <div className="col-12">
                                    Room {index + 1} :
                                  </div>
                                  <div className="col-12">
                                    <i className="fa fa-user "></i>
                                  </div>
                                  <div className="col-12">
                                    <button
                                      type="button"
                                      onClick={() => this.handleAddRoom()}
                                      className="btn btn-sm m-1 btn-outline-danger"
                                    >
                                      Add Room
                                    </button>
                                    {this.state.rooms.length > 1 ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          this.handleRemoveRoom(index)
                                        }
                                        className="btn btn-sm m-1 btn-outline-danger"
                                      >
                                        Remove Room
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                <div className="col-4">
                                  <label htmlFor="adults">Adults</label>
                                  <br />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      this.handleRoom("A", index, -1)
                                    }
                                    className="btn btn-sm "
                                  >
                                    {" "}
                                    -
                                  </button>
                                  <button type="" className="btn btn-sm ">
                                    {room.adult}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      this.handleRoom("A", index, 1)
                                    }
                                    className="btn btn-sm "
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="col-4">
                                  <label htmlFor="child">
                                    Child{" "}
                                    <span
                                      className="text-secondary"
                                      style={{ fontSize: 7 }}
                                    >
                                      (2-12 yrs)
                                    </span>
                                  </label>
                                  <br />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      this.handleRoom("C", index, -1)
                                    }
                                    className="btn btn-sm "
                                  >
                                    {" "}
                                    -
                                  </button>
                                  <button type="" className="btn btn-sm ">
                                    {room.child}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm "
                                    onClick={() =>
                                      this.handleRoom("C", index, 1)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <br />
                <div className="border border-top" />
                <br />
                <div className="form-group row">
                  <div className="col-12 text-right">
                    <button
                      type="submit"
                      disabled={this.state.showbutton === 0 ? true : false}
                      className="btn btn-danger btn-lg mr-2"
                    >
                      Search Room &nbsp;
                      <i className="fa fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        )}
      />
    );
  }
}

export default ShowForm;
