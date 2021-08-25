import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-ccontent-between">
      <div className="container">
        <h1 className="text-light">
          <Link to="/" className="text-light">
            CRUD React, Redux, REST API & Axios
          </Link>
        </h1>
        <Link
          className="btn btn-danger nuevo-post d-block w-100 d-md-inline-block"
          to="/productos/nuevo"
        >
          Agregar Producto &#43;
        </Link>
      </div>
    </nav>
  );
};

export default Header;
