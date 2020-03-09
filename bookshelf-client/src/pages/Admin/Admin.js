import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WithHeader from "../../layouts/WithHeader";
import AdminBookList from "../AdminBookList";
import AdminUsers from "../AdminUsers";
import AdminWhishList from "../AdminWhishList";
import {
  ADMIN_ALL_BOOKS,
  ADMIN_USERS,
  ADMIN_WHISHLIST
} from "../../constants/routes";

const Admin = () => {
  const { pathname } = useLocation();
  return (
    <WithHeader>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, translateY: "100px" },
          visible: { opacity: 1, translateY: 0 }
        }}
        className="flex w-3/4 border border-gray-200 rounded-lg shadow-lg p-8 bg-white mx-auto mt-8"
      >
        <ul className="mr-8 w-32 border-r-2 border-gray-200 p-4">
          <li>
            <Link
              className={`admin-item ${
                pathname.includes(ADMIN_ALL_BOOKS) ? "active" : ""
              }`}
              to={ADMIN_ALL_BOOKS}
            >
              All Books
            </Link>
          </li>
          <li>
            <Link
              className={`admin-item ${
                pathname.includes(ADMIN_USERS) ? "active" : ""
              }`}
              to={ADMIN_USERS}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              className={`admin-item ${
                pathname.includes(ADMIN_WHISHLIST) ? "active" : ""
              }`}
              to={ADMIN_WHISHLIST}
            >
              Whishlist
            </Link>
          </li>
        </ul>
        <div className="px-4 py-8">
          <Switch>
            <Route path={ADMIN_ALL_BOOKS}>
              <AdminBookList />
            </Route>
            <Route path={ADMIN_USERS}>
              <AdminUsers />
            </Route>
            <Route path={ADMIN_WHISHLIST}>
              <AdminWhishList />
            </Route>
          </Switch>
        </div>
      </motion.div>
    </WithHeader>
  );
};

export default Admin;
