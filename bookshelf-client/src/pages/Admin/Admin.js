import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import AdminBookList from "../AdminBookList";
import AdminUsers from "../AdminUsers";
import AdminWhishList from "../AdminWhishList";
import {
  ADMIN_ALL_BOOKS,
  ADMIN_USERS,
  ADMIN_WHISHLIST
} from "../../constants/routes";

const Admin = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ADMIN_ALL_BOOKS}>All Books</Link>
        </li>
        <li>
          <Link to={ADMIN_USERS}>Users</Link>
        </li>
        <li>
          <Link to={ADMIN_WHISHLIST}>Whishlist</Link>
        </li>
      </ul>
      <div>
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
    </div>
  );
};

export default Admin;
