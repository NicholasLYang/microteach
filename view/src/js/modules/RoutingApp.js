import Provider from "react-redux/lib/components/Provider";
import React, { Component } from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import appHistory from "tools/appHistory";
import MainApp from "./core/components/MainApp";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import BlockPage from "./core/components/BlockPage";
import HomePage from "./core/components/HomePage";
import SignUpPage from "./core/components/SignUpPage";
import SignInPage from "./core/components/SignInPage";
import store from "../store";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import NewProjectPage from './core/components/NewProjectPage'
import SignOutPage from './core/components/SignOutPage'
import ProjectsPage from './core/components/ProjectsPage'

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: new HttpLink({ uri: "http://localhost:3000/graphql" }),
  cache: new InMemoryCache()
});

const RoutingApp = () => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={appHistory}>
            <MainApp>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/blocks/new" component={BlockPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/signout" component={SignOutPage} />
                <Route path="/projects" component={ProjectsPage} />
                <Route path="/projects/new" component={NewProjectPage} />
              </Switch>
            </MainApp>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </MuiThemeProvider>
  );
};

export default RoutingApp;
