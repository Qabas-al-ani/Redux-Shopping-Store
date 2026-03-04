import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { Provider } from "react-redux";
import store from "./utils/store";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";

// Use Render API when on GitHub Pages; fallback to relative /graphql for local dev
const apiUri =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.origin.includes("github.io")
    ? "https://redux-shopping-store.onrender.com/graphql"
    : "/graphql");

// Basename for React Router: path only (e.g. /Redux-Shopping-Store), no trailing slash
const basename = process.env.PUBLIC_URL
  ? (process.env.PUBLIC_URL.startsWith("http")
      ? new URL(process.env.PUBLIC_URL).pathname
      : process.env.PUBLIC_URL
    ).replace(/\/$/, "") || ""
  : "";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: apiUri,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router basename={basename}>
        <div>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route component={NoMatch} />
            </Switch>
          </Provider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
