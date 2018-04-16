import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import { Home, Results } from "./components";
import "izitoast/dist/css/iziToast.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./App.css";

class UnconnectedApp extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <Route path="/" component={Home} />
          <Route exact path="/results" component={Results} />
        </div>
      </ConnectedRouter>
    );
  }
}

const App = connect(null, {})(UnconnectedApp);

export default App;
