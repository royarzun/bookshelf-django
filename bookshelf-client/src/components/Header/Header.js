import React from "react";
import { Link } from "react-router-dom";
import { ADMIN_ALL_BOOKS, BOOKS, HOME } from "../../constants/routes";

const Header = () => {
  return (
    <header className="bg-teal-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-gray-800 flex font-semibold tracking-light">
          <Link to={HOME}>
            <span className="mr-2">
              <span role="img" aria-label="Bookshelf logo">
                📚
              </span>
            </span>
            <span className="font-medium text-white tracking-wide">
              Bookshelf
            </span>
          </Link>
        </h1>
        <nav className="flex items-center">
          <Link className="nav-item" to={ADMIN_ALL_BOOKS}>
            Admin
          </Link>
          <Link className="nav-item" to={BOOKS}>
            Books
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
