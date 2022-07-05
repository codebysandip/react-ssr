import React from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/404">
                404 page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/500">
                500 page
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {}
