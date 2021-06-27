import React from "react";
import d1 from "../images/d1.png";
import d2 from "../images/d2.png";
import d3 from "../images/d3.png";
import banner from "../images/banner.jpg";
const RightSide = (props) => {
  const { flight, holidays } = props;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col text-muted">
          <strong>Flight Discounts for you</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-4 p-2">
          <img
            src={d1}
            alt=""
            style={{ display: "inline-block", width: "100%" }}
          />
        </div>
        <div className="col-4 p-2">
          <img
            src={d2}
            alt=""
            style={{ display: "inline-block", width: "100%" }}
          />
        </div>
        <div className="col-4 p-2">
          <img
            src={d3}
            alt=""
            style={{ display: "inline-block", width: "100%" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col ">
          <img
            src={banner}
            alt=""
            style={{ display: "inline-block", width: "100%" }}
          />
        </div>
      </div>

      <div className="row">
        <div className="col text-muted ">
          <h4> Popular Domestic Flight Routes</h4>
        </div>
      </div>
      <div className="row text-center">
        {flight.map((item, index) => (
          <div key={index} className=" col-lg-3  col-md-3  col-6  row  ">
            <div
              style={{
                display: "inline-block",
                width: "100%",
                backgroundColor: "white",
                padding: 2,
                margin: 4,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.origin}
              </div>
              <div className="text-muted">{item.date}</div>
              <br />
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                {item.dest}
              </div>
              <br />
              <div className="text-muted">Starting from</div>
              <br />
              <div className="text-center">
                <button className="btn btn-sm btn-warning ">
                  Rs. {item.amount}{" "}
                </button>
              </div>
              <br />
            </div>
          </div>
        ))}
      </div>
      <div
        className="col-12 text-secondary m-1"
        style={{ fontSize: 25, display: "inline-block", width: "100%" }}
      >
        Popular holiday Destinations
      </div>
      <div className="row">
        {holidays.map((item, index) => (
          <div key={index} className=" col-lg-6  col-md-6 col-sm-12 col-12 ">
            <div className="p-1 m-1 row" style={{ backgroundColor: "white" }}>
              <div className="col-3">
                <img
                  src={item.img}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    paddingTop: "20%",
                  }}
                />
              </div>
              <div className="col-8 row text-center">
                <div className="col-12">{item.place}</div>
                <div className="col-12">
                  <strong className="text-danger">{item.price}</strong> per
                  person
                </div>
                <div className="col-12">
                  <span className="text-secondary">{item.days}</span>
                </div>
              </div>
              <div
                className="col-1 text-right"
                style={{ verticalAlign: "middle", paddingTop: "10%" }}
              >
                <i className="fa fa-arrow-right"> </i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default RightSide;
