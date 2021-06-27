import React, { PureComponent } from "react";

const ImgSlider = (props) => {
  let { imgs, ind } = props;
  return (
    <div
      id={"slides" + ind}
      data-ride="carousel"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target={"#slides" + ind}
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target={"#slides" + ind} data-slide-to="1"></li>
        <li data-target={"#slides" + ind} data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={imgs[0]} alt="First slide" className="d-block w-100 h-80" />
        </div>
        <div className="carousel-item ">
          <img src={imgs[1]} alt="" className="d-block w-100 h-80" />
        </div>
        <div className="carousel-item">
          <img src={imgs[2]} className="d-block w-100 h-80" />
        </div>
      </div>
      <a
        className="carousel-control-prev"
        data-slide="prev"
        href={"#slides" + ind}
        role="button"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only"> Previous</span>
      </a>
      <a
        className="carousel-control-next"
        data-slide="next"
        href={"#slides" + ind}
        role="button"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default ImgSlider;
