// HeaderComponent.tsx
import React from "react";
import { Link } from "react-router-dom";
import { RiUserAddLine, RiLoginCircleLine } from "react-icons/ri";

const Header: React.FC = () => {
  return (
    <header className="bg-brown-orange text-light py-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>
            <Link to="/" className="text-light text-decoration-none">
              Kikuyusphere
            </Link>
          </h1>
          <nav className="fs-5">
            <ul className="list-unstyled d-flex align-items-center">
              <li className="mx-3">
                <Link to="/register" className="text-light">
                  <RiUserAddLine className="me-1" />
                  Register
                </Link>
              </li>
              <li className="mx-3">
                <Link to="/login" className="text-light">
                  <RiLoginCircleLine className="me-1" />
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
