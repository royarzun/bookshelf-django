import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Books from "./pages/Books";
import NotFound from "./pages/NotFound";

import "./tailwind.css";

const App = () => {
  return (
    <main className="bg-gray-200 antialiased text-gray-900 min-h-screen">
      <div>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/books" exact>
              <Books />
            </Route>
            <Route path="/admin">
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
