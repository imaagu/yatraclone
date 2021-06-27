import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light text-white">
      <Link className="navbar-brand" to="">
        <img src={logo} style={{ height: 40 }} alt="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
};

export default NavBar;
