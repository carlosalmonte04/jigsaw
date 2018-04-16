import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import "izitoast/dist/css/iziToast.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { Home } from "./components";
import "./App.css";

const UnconnectedApp = props => (
  <ConnectedRouter history={props.history}>
    <div>
      <Route path="/" component={Home} />
    </div>
  </ConnectedRouter>
);

const App = connect(null, {})(UnconnectedApp);

export default App;
