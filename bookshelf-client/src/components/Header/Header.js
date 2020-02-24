import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex py-8 justify-between">
      <h1 className="text-3xl text-gray-800 flex font-semibold tracking-light">
        <Link to="/">
          <span className="mr-2">
            <span role="img" aria-label="Bookshelf logo">
              📚
            </span>
          </span>
          Bookshelf
        </Link>
      </h1>
      <nav className="flex items-center">
        <Link className="nav-item" to="/admin">
          Admin
        </Link>
        <Link className="nav-item" to="/books">
          Books
        </Link>
      </nav>
    </header>
  );
};

export default Header;
