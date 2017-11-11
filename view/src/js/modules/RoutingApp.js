import Provider from "react-redux/lib/components/Provider";
import React, { Component } from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "../store";
import BlockPage from "./core/components/BlockPage";
import HomePage from "./core/components/HomePage";
import SignUpPage from "./core/components/SignUpPage";

class RoutingApp extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <ConnectedRouter history={appHistory}>
            <MainApp>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/blocks/new" component={BlockPage} />
                <Route path="/users/new" component={SignUpPage} />
              </Switch>
            </MainApp>
          </ConnectedRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default RoutingApp;
