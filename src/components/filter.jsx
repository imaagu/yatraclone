import React, { Component } from "react";
import "../cssFile/filter.css";
class Filter extends Component {
  state = { show: 0 };

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let {
      radio1,
      radio2,
      check1,
      check2,

      onChange,
    } = this.props;
    if (input.name === "price") {
      radio1.selected = input.value;
    }

    if (input.name === "time") {
      radio2.selected = input.value;
    }

    if (input.type === "checkbox" && input.name === "airline") {
      let cb = check1.find((n1) => n1.val === input.id);

      if (cb) cb.isSelected = input.checked;
    }
    if (input.type === "checkbox" && input.name === "aircraft") {
      let cb = check2.find((n1) => n1.val === input.id);

      if (cb) cb.isSelected = input.checked;
    }
    //  console.log(check2);
    onChange(radio1, radio2, check1, check2);
  };

  handleShow = (val) => {
    this.setState({ show: val });
  };

  handleClearFilter = () => {
    let {
      radio1,
      radio2,
      check1,
      check2,

      onChange,
    } = this.props;
    radio1.selected = "";
    radio2.selected = "";
    for (var i = 0; i < check1.length; i++) {
      check1[i].isSelected = false;
    }
    for (var i = 0; i < check2.length; i++) {
      check2[i].isSelected = false;
    }
    this.setState({ show: 0 });
    onChange(radio1, radio2, check1, check2);
  };

  render() {
    const {
      radio1,
      radio2,
      check1,
      check2,
      time,
      flight,
      airbus,
      price,
    } = this.props;

    return (
      <React.Fragment>
        <div
          className="mainExpand"
          style={{ boxShadow: "0 2px 4px 0 #ffa2a2" }}
        >
          <div className="row pt-2 pb-2" id="id1">
            <div
              className="col-1 text-center d-none d-lg-block"
              style={{ fontSize: 14 }}
            >
              <i className="fa fa-filter"></i>
              &nbsp; Filter
            </div>
            {this.state.show === 0 ? (
              <div
                onClick={() => this.handleShow(1)}
                className="col-lg-2 col-3 text-center"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Price &nbsp;
                <i className="fa fa-angle-down"></i>
              </div>
            ) : (
              ""
            )}

            {this.state.show === 0 ? (
              <div
                onClick={() => this.handleShow(1)}
                className="col-lg-2 col-3 text-center"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Depart &nbsp;
                <i className="fa fa-angle-down"></i>
              </div>
            ) : (
              ""
            )}
            {this.state.show === 0 ? (
              <div
                onClick={() => this.handleShow(1)}
                className="col-lg-2 col-3 text-center"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Airline &nbsp;
                <i className="fa fa-angle-down"></i>
              </div>
            ) : (
              ""
            )}
            {this.state.show === 0 ? (
              <div
                onClick={() => this.handleShow(1)}
                className="col-lg-2 col-3 text-center"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Aircraft &nbsp;
                <i className="fa fa-angle-down"></i>
              </div>
            ) : (
              ""
            )}

            {this.state.show === 1 ? (
              <div className="col-lg-8 col-3 text-right">
                <button
                  onClick={() => this.handleShow(0)}
                  className="btn btn-outline-dark text-secondary"
                >
                  <strong>Cancel</strong>
                </button>
              </div>
            ) : (
              ""
            )}
            {time === "" &&
            price === "" &&
            (flight === "") & (airbus === "") ? (
              ""
            ) : (
              <div className="col-lg-3 col-12">
                <button
                  onClick={() => this.handleClearFilter()}
                  className="btn btn-danger text-white"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          {this.state.show === 1 ? (
            <div className="expand  bg-white pt-2 pb-2">
              <div className="row p-1  ">
                <div className="col-3">
                  <div className="row ml-1" id="id1">
                    <strong>Price</strong>
                  </div>
                  {radio1.value.map((item, index) => (
                    <div key={index} className="form-check" id="id1">
                      <input
                        checked={radio1.selected === item.val}
                        className="form-check-input ng-valid ng-dirty ng-touched"
                        name="price"
                        type="radio"
                        value={item.val}
                        id={item.val}
                        onChange={this.handleChange}
                      />
                      <label className="form-ckeck-label" htmlFor={item.val}>
                        {item.id}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-3">
                  <div className="row ml-1" id="id1">
                    <strong>Time</strong>
                  </div>
                  {radio2.value.map((item, index) => (
                    <div key={index} className="form-check" id="id1">
                      <input
                        checked={radio2.selected === item.val}
                        className="form-check-input ng-valid ng-dirty ng-touched"
                        name="time"
                        type="radio"
                        value={item.val}
                        id={item.val}
                        onChange={this.handleChange}
                      />
                      <label className="form-ckeck-label" htmlFor={item.val}>
                        {item.id}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-3">
                  <div className="row ml-1" id="id1">
                    <strong>AirLine</strong>
                  </div>
                  {check1.map((item, index) => (
                    <div key={index} className="form-check" id="id1">
                      <input
                        checked={radio2.selected === item.val}
                        className="form-check-input ng-valid ng-pristine ng-touched"
                        name="airline"
                        type="checkbox"
                        id={item.val}
                        value={item.isSelected}
                        checked={item.isSelected}
                        onChange={this.handleChange}
                      />
                      <label className="form-ckeck-label" htmlFor={item.val}>
                        {item.id}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="col-3">
                  <div className="row ml-1" id="id1">
                    <strong>AirCraft</strong>
                  </div>
                  {check2.map((item, index) => (
                    <div key={index} className="form-check" id="id1">
                      <input
                        checked={radio2.selected === item.val}
                        className="form-check-input ng-valid ng-pristine ng-touched"
                        name="aircraft"
                        type="checkbox"
                        id={item.val}
                        value={item.isSelected}
                        checked={item.isSelected}
                        onChange={this.handleChange}
                      />
                      <label className="form-ckeck-label" htmlFor={item.val}>
                        {item.id}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
