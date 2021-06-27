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
    opt: ["Economy", "Premium Economy", "Business"],
    cities: getData.getCities(),
    adult: 1,
    currentClass: "Economy",
    child: 0,
    infant: 0,
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
    selBtn: 0,
    showbutton: 0,
    to: "",
    from: "",
  };

  componentDidMount() {
    let date = this.state.newDate.getDate();
    let date2 = this.state.newDate2.getDate();
    let month = this.state.newDate.getMonth();
    let year = this.state.newDate2.getFullYear();
    let day = this.state.newDate.getDay();
    let day2 = this.state.newDate2.getDay();

    this.setState({
      date,
      date2,
      month,
      month2: month,
      year,
      year2: year,
      day,
      day2,
    });
  }

  handlebtn = (opt) => {
    console.log(opt);
    let newDate = new Date();
    let newDate2 = new Date();
    let date = newDate.getDate();
    let date2 = newDate2.getDate();
    let month = newDate.getMonth();
    let year = newDate2.getFullYear();
    let day = newDate.getDay();
    let day2 = newDate2.getDay();

    this.setState({
      date,
      newDate,
      newDate2,
      date2,
      month,
      month2: month,
      year,
      year2: year,
      day,
      day2,
      selBtn: opt,
    });
  };

  handleS1 = () => {
    let show1 = this.state.show1;
    if (show1 === 1) show1 = 0;
    else show1 = 1;
    this.setState({ show1: show1 });
  };

  handleTickets = (opt, val) => {
    // console.log(opt);
    let { adult, child, infant } = this.state;
    if (opt === "A") {
      if (adult + val >= 0) {
        adult = adult + val;
        this.setState({ adult });
      }
    }
    if (opt === "C") {
      if (child + val > 0) {
        child = child + val;
        this.setState({ child });
      }
    }
    if (opt === "I") {
      if (infant + val > 0) {
        infant = infant + val;
        this.setState({ infant });
      }
    }

    console.log("from", this.state.from);

    if (
      child + adult + infant > 0 &&
      this.state.to !== this.state.from &&
      this.state.to !== "" &&
      this.state.to !== undefined &&
      this.state.to !== "Select City" &&
      this.state.from !== "" &&
      this.state.from !== undefined &&
      this.state.from !== "Select City"
    ) {
      this.setState({ showbutton: 1 });
    } else {
      this.setState({ showbutton: 0 });
    }
    //
    return 0;
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
    console.log(d, this.state.newDate2);
    if (d <= this.state.newDate2 || this.state.selBtn === 0) {
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

  chekClass = (val) => {
    let c = this.state.currentClass;
    let adult = this.state.adult;
    let child = this.state.child;
    let infant = this.state.infant;
    if (val !== c) {
      this.setState({ adult: 1, child: 0, infant: 0 });
    }
  };

  checkVal = (item) => {
    console.log("check");
    if (item.to === item.from) {
      this.setState({ showbutton: 0 });
    }
  };

  render() {
    let c1 = this.state.show1 === 1 ? "fa fa-chevron-up" : "fa fa-chevron-down";
    let { date, date2, month, month2, year, year2, day2, day } = this.state;

    return (
      <Formik
        initialValues={{
          from: "",
          to: "",
          date: date + " " + this.state.months[month] + " " + year,
          returndate: date2 + " " + this.state.months[month2] + " " + year2,
          tickets: this.state.adult + this.state.child + this.state.infant,
          classtype: "Economy",
        }}
        validate={(values) => {
          values.tickets =
            this.state.adult + this.state.child + this.state.infant;
          values.tickets = +values.tickets;
          this.setState({ to: values.to, from: values.from });
          this.chekClass(values.classtype);

          if (
            values.from &&
            values.from !== "Select City" &&
            values.to &&
            values.to !== "Select City" &&
            values.date &&
            values.returndate &&
            values.tickets > 0 &&
            values.classtype
          )
            this.setState({ showbutton: 1 });
          else {
            this.setState({ showbutton: 0 });
          }

          if (values.from === values.to) {
            values.to = "";
            alert("Destination and Arrival have to be different");
            this.setState({ showbutton: 0 });
          }

          this.setState({ currentClass: values.classtype });
        }}
        onSubmit={async (fields) => {
          this.checkVal(fields);
          let array = fields;
          array.date = date + " " + this.state.months[month] + " " + year;
          array.returndate =
            this.state.selBtn !== 0
              ? date2 + " " + this.state.months[month2] + " " + year2
              : "";
          array.tickets =
            this.state.adult + this.state.child + this.state.infant;
          try {
            await service.setDetails(
              array.from,
              array.to,
              array.date,
              array.returndate,
              array.tickets,
              array.classtype
            );

            this.props.onSearchFlight();
          } catch (ex) {}
          //console.log(this.props);
        }}
        render={({ errors, status, touched }) => (
          <div className="row">
            <div className="col-12 text-center">
              <button
                type="button"
                className={
                  this.state.selBtn === 1
                    ? "btn btn-sm btn-outline-primary m-1"
                    : "btn btn-sm btn-primary m-1"
                }
                onClick={() => this.handlebtn(0)}
              >
                One Way
              </button>
              <button
                type="button"
                className={
                  this.state.selBtn === 0
                    ? "btn btn-sm btn-outline-primary m-1"
                    : "btn btn-sm btn-primary m-1"
                }
                onClick={() => this.handlebtn(1)}
              >
                Return
              </button>
            </div>
            <div className="col-12 text-left m-2 ">
              <Form>
                <div className="row">
                  <div className="form-group col-lg-5 col-md-5 col-sm-5 col-6 text-left">
                    <label htmlFor="from">Depart From</label>
                    <Field
                      name="from"
                      type=""
                      component="select"
                      className={
                        "form-control" +
                        (errors.from && touched.from ? " is-invalid" : "")
                      }
                    >
                      {this.state.cities.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="form-group col-lg-2 col-md-2 d-none d-md-block text-center p-2">
                    <i
                      className="fa fa-arrow-circle-right"
                      style={{ fontSize: 40, color: "#9fdbac" }}
                    ></i>
                  </div>
                  <div className="form-group col-lg-5 col-md-5 col-sm-5 col-6 ">
                    <label htmlFor="to">Going To</label>
                    <Field
                      name="to"
                      type=""
                      component="select"
                      className={
                        "form-control" +
                        (errors.to && touched.to ? " is-invalid" : "")
                      }
                    >
                      {this.state.cities.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <br />
                <div className="border border-top"></div>
                <br />
                <div className=" row">
                  <div className="form-group col-12 col-lg-6 ">
                    {" "}
                    <div className="col-12">
                      {" "}
                      <label htmlFor="date">Depature Date</label>
                      <div
                        style={{
                          cursor: "pointer",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}
                        onClick={() => this.handleDate()}
                      >
                        {date} {this.state.months[month]}, {year}{" "}
                      </div>
                      <div
                        style={{
                          color: "black",
                          cursor: "pointer",
                        }}
                      >
                        {this.state.days[day]}
                      </div>
                    </div>
                    {this.state.show === 1 ? (
                      <div
                        className="col-12  "
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
                  <div className="form-group col-12 col-lg-6">
                    <div className="col-12">
                      {" "}
                      <label htmlFor="returndate">Return Date</label>
                    </div>
                    {this.state.selBtn === 0 ? (
                      <div className="col-12">
                        {" "}
                        <a href="#" className="text-primary">
                          Book round trip to save extra
                        </a>
                      </div>
                    ) : (
                      <React.Fragment>
                        <div
                          onClick={() => this.handleDate2()}
                          className="col-12"
                          style={{
                            cursor: "pointer",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}
                        >
                          {date2} {this.state.months[month2]}, {year2}{" "}
                        </div>
                        <div
                          className="col-12"
                          style={{
                            color: "black",
                            cursor: "pointer",
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
                              value={this.state.newDate2}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
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
                            <label htmlFor="">
                              {" "}
                              {this.state.adult +
                                this.state.child +
                                this.state.infant}
                              {this.state.adult +
                                this.state.child +
                                this.state.infant >
                              2
                                ? "Travellers , Class"
                                : "Traveller , Class"}
                            </label>
                          </div>
                          <div className="col-12">
                            <label htmlFor="">
                              {this.state.adult +
                                this.state.child +
                                this.state.infant}
                              {this.state.adult +
                                this.state.child +
                                this.state.infant >
                              2
                                ? "Travellers"
                                : "Traveller"}
                              , {this.state.currentClass}
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
                            <div className="col-12 row text-center ">
                              <div className="col-4">
                                <label htmlFor="adults">Adults</label>
                                <br />
                                <button
                                  type="button"
                                  onClick={() => this.handleTickets("A", -1)}
                                  className="btn btn-sm "
                                >
                                  {" "}
                                  -
                                </button>
                                <button type="" className="btn btn-sm ">
                                  {this.state.adult}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => this.handleTickets("A", 1)}
                                  className="btn btn-sm "
                                >
                                  +
                                </button>
                              </div>
                              <div className="col-4 ">
                                <label htmlFor="adults">
                                  Child{" "}
                                  <span
                                    className="text-secondary"
                                    style={{ fontSize: 7 }}
                                  >
                                    (2-12yrs)
                                  </span>
                                </label>
                                <br />
                                <button
                                  type="button"
                                  onClick={() => this.handleTickets("C", -1)}
                                  className="btn btn-sm "
                                >
                                  {" "}
                                  -
                                </button>
                                <button type="" className="btn btn-sm ">
                                  {this.state.child}
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm "
                                  onClick={() => this.handleTickets("C", 1)}
                                >
                                  +
                                </button>
                              </div>
                              <div className="col-4">
                                <label htmlFor="adults">
                                  Infant{" "}
                                  <span
                                    className="text-secondary"
                                    style={{ fontSize: 7 }}
                                  >
                                    (&lt; 2yrs)
                                  </span>
                                </label>
                                <br />
                                <button
                                  type="button"
                                  onClick={() => this.handleTickets("I", -1)}
                                  className="btn btn-sm "
                                >
                                  {" "}
                                  -
                                </button>
                                <button type="" className="btn btn-sm ">
                                  {this.state.infant}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => this.handleTickets("I", 1)}
                                  className="btn btn-sm "
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="col-12">
                              <br />
                            </div>
                            <div className="col-12">
                              {this.state.opt.map((n1) => (
                                <div
                                  key={n1}
                                  className="form-check  "
                                  style={{
                                    backgroundColor: "white",
                                    borderRadius: 3,
                                  }}
                                >
                                  <label
                                    className="form-check-label ml-3"
                                    htmlFor={n1}
                                  >
                                    <Field
                                      className="form-check-input ng-valid  ng-untouched ng-pristine "
                                      name="classtype"
                                      type="radio"
                                      id=" classtype"
                                      value={n1}
                                    />{" "}
                                    {n1}{" "}
                                  </label>
                                </div>
                              ))}
                            </div>
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
                      Search Flights &nbsp;
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
