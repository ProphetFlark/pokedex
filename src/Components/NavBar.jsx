import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles.css";
import Filters from "./Filters";
import logo from "../assets/Pokédex_logo.png";

const NavBar = () => {

  return (
    <>
      <div className="containernav">
        <Link to="/">
          <div className="divimg">
            <img src={logo} alt="logo pokédex" />
          </div>
        </Link>
        <Link to="/">
          <div className="inicio">
            <h1>Inicio Pokédex</h1>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NavBar;
