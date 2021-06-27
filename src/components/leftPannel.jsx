import React, { Component } from "react";

import "../cssFile/dropdown.css";
import "../cssFile/booking.css";

class LeftPannel extends Component {
  state = {
    show1: 1,
    show2: 1,
    show3: 1,
  };

  handleChange = (e) => {
    const { currentTarget: input } = e;
    let {
      radio1,
      radio2,
      radio3,

      onChange,
    } = this.props;
    if (input.name === "price") {
      radio1.selected = input.value;
    }
    if (input.name === "rating") {
      radio2.selected = input.value;
    }
    if (input.name === "pmode") {
      radio3.selected = input.value;
    }

    // console.log(sportsRadio4);
    onChange(radio1, radio2, radio3);
  };

  handleS1 = () => {
    let show1 = this.state.show1;
    if (show1 === 1) show1 = 0;
    else show1 = 1;
    this.setState({ show1: show1 });
  };

  handleS2 = () => {
    let show2 = this.state.show2;
    if (show2 === 1) show2 = 0;
    else show2 = 1;
    this.setState({ show2: show2 });
  };

  handleS3 = () => {
    let show3 = this.state.show3;
    if (show3 === 1) show3 = 0;
    else show3 = 1;
    this.setState({ show3: show3 });
  };

  render() {
    const { radio1, radio2, radio3 } = this.props;
    let c1 = this.state.show1 === 1 ? "fa fa-chevron-up" : "fa fa-chevron-down";
    let c2 = this.state.show2 === 1 ? "fa fa-chevron-up" : "fa fa-chevron-down";
    let c3 = this.state.show3 === 1 ? "fa fa-chevron-up" : "fa fa-chevron-down";

    return (
      <React.Fragment>
        <div className="row  bg-white border-bottom pt-2 pb-2" id="box2">
          <div
            className="col"
            style={{
              fontSize: 18,
              textTransform: "capitalize",
              width: 67,
              fontWeight: "500",
            }}
          >
            Filters
          </div>
        </div>

        <div className="row bg-white border-top">
          <div className="col-10">
            <div
              className="row ml-1 pb-2"
              style={{
                fontSize: 13,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: ".3px",
                display: "inline-block",
              }}
            >
              Price
            </div>
            {c1 === "fa fa-chevron-up" ? (
              <React.Fragment>
                {radio1.value.map((item, index) => (
                  <div key={index} className="row form-check ml-1 pb-1">
                    <div
                      className="checkbox"
                      style={{
                        verticalAlign: "middle",
                        fontSize: 14,
                        paddingLeft: 11,
                        color: "#212121",
                        display: "inline-block",
                        width: "cal(100% - 25px)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1,
                        cursor: "pointer",
                      }}
                    >
                      <label>
                        <input
                          name="price"
                          onChange={this.handleChange}
                          value={item.id}
                          checked={radio1.selected === item.val}
                          id={item.id}
                          type="radio"
                          className="ng-untouched ng-pristine ng-valid"
                        />{" "}
                        &nbsp; Less than {item.id} ₹
                      </label>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
          <div className="col-2 text-right">
            <span>
              <i
                onClick={this.handleS1}
                style={{
                  fontSize: 10,
                  color: "lightgrey",
                  cursor: "pointer",
                }}
                className={c1}
              ></i>
            </span>
          </div>
        </div>

        <div className="row bg-white border-top">
          <div className="col-10">
            <div
              className="row ml-1 pb-2"
              style={{
                fontSize: 13,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: ".3px",
                display: "inline-block",
              }}
            >
              Customer Rating
            </div>
            {c2 === "fa fa-chevron-up" ? (
              <React.Fragment>
                {radio2.value.map((item, index) => (
                  <div key={index} className="row form-check ml-1 pb-1">
                    <div
                      className="checkbox"
                      style={{
                        verticalAlign: "middle",
                        fontSize: 14,
                        paddingLeft: 11,
                        color: "#212121",
                        display: "inline-block",
                        width: "cal(100% - 25px)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1,
                        cursor: "pointer",
                      }}
                    >
                      <label htmlFor={item.id}>
                        <input
                          name="rating"
                          onChange={this.handleChange}
                          value={item.id}
                          checked={radio2.selected === item.val}
                          id={item.id}
                          type="radio"
                          className="ng-untouched ng-pristine ng-valid"
                        />{" "}
                        &nbsp;
                        <i className="fa fa-star" aria-hidden="true"></i>
                        &nbsp; {item.id} stars
                      </label>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
          <div className="col-2 text-right">
            <span>
              <i
                onClick={this.handleS2}
                style={{ fontSize: 10, color: "lightgrey", cursor: "pointer" }}
                className={c2}
              ></i>
            </span>
          </div>
        </div>
        <div className="row bg-white border-top">
          <div className="col-10">
            <div
              className="row ml-1 pb-2"
              style={{
                fontSize: 13,
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: ".3px",
                display: "inline-block",
              }}
            >
              Payment Mode
            </div>
            {c3 === "fa fa-chevron-up" ? (
              <React.Fragment>
                {radio3.value.map((item, index) => (
                  <div key={index} className="row form-check ml-1 pb-1">
                    <div
                      className="checkbox"
                      style={{
                        verticalAlign: "middle",
                        fontSize: 14,
                        paddingLeft: 11,
                        color: "#212121",
                        display: "inline-block",
                        width: "cal(100% - 25px)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1,
                        cursor: "pointer",
                      }}
                    >
                      <label htmlFor={item.id}>
                        <input
                          name="pmode"
                          onChange={this.handleChange}
                          value={item.id}
                          checked={radio3.selected === item.val}
                          id={item.id}
                          type="radio"
                          className="ng-untouched ng-pristine ng-valid"
                        />{" "}
                        &nbsp;
                        {item.id}
                      </label>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
          <div className="col-2 text-right">
            <span>
              <i
                onClick={this.handleS3}
                style={{ fontSize: 10, color: "lightgrey", cursor: "pointer" }}
                className={c3}
              ></i>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LeftPannel;
