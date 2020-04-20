import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import { store } from "react-notifications-component";
import { displayNotification } from "../../views/Team/UserFunctions";
import { SetUserData } from "../../views/Team/TeamData";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_nav";
// routes config
import routes from "../../routes";
import Loader from "../../views/Loader/Loader";
import { fetchTeamDetails } from "../../views/Team/UserFunctions";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  state = {
    firstname: "",
    role: "",
    status: true
  };
  loading = () => (
    // <div className="animated fadeIn pt-1 text-center">Loading...</div>
    <h2 class="d-flex justify-content-md-center align-items-center vh-100">Loading...</h2>
    // <Loader></Loader>
  );

  async componentWillMount() {
    if (localStorage.getItem("token")) {
      const user = await fetchTeamDetails(localStorage.getItem("token"));
      console.log(user);
      if(window.location.pathname.includes("/dashboard"))
      displayNotification("", `Welcome ${user["firstname"]}`);
      SetUserData({ ...user });
      this.setState({ ...user });
    } else {
      console.log("hEYEYYEEYY");
      window.location.pathname = "/login";
    }
  }

  signOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    console.log("KJAEHFKGAF");
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={(e) => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container style={{ padding: "0" }}>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
