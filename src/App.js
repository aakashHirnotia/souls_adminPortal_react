import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import "./App.scss";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Loader from "./views/Loader/Loader"

const loading = () => (
  // <div className="animated fadeIn pt-3 text-center">Loading...</div>
  <Loader></Loader>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <ReactNotification />
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <DefaultLayout {...props} />}
            />
            <Route
              path="*"
              name="Home"
              render={(props) => <Page404 {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
