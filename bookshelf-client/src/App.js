import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";

import "./tailwind.css";

const App = () => {
  return (
    <main className="bg-gray-300 h-screen">
      <div className="container mx-auto">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/books" exact>
              <Books />
            </Route>
            <Route path="/admin" exact>
              <Admin />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </main>
  );
};

export default App;
