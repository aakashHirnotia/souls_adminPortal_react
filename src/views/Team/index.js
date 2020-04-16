import React, { Suspense } from "react";
// import Switch from "@coreui/react/lib/Switch";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { UserData } from "./TeamData";

const TeamMember = React.lazy(() => import("./TeamMember"));
const Team = React.lazy(() => import("./Team"));
const TeamEdit = React.lazy(() => import("./TeamEdit"));
const ViewTeam = React.lazy(() => import("./ViewTeam/index"));

class TeamLayout extends React.Component {
  componentWillMount() {
    if (UserData.role !== "Admin") {
      window.location.href = "/dashboard";
    }
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  renderComponent = () => {
    if (window.location.pathname.includes("/team/list")) {
      return <ViewTeam {...this.props} />;
    } else if (window.location.pathname.includes("/team/view-member")) {
      return <TeamMember {...this.props} />;
    } else if (window.location.pathname.includes("/team/add-member")) {
      return <Team {...this.props} />;
    } else if (window.location.pathname.includes("/team/edit-member")) {
      return <TeamEdit {...this.props} />;
    } else return <div>LOL</div>;
  };

  render() {
    return (
      <div>{this.renderComponent()}</div>
      //   <Suspense fallback={this.loading()}>
      //     <Switch>

      //       <Route
      //         exact
      //         path="/team/list"
      //         name="Team List"
      //         render={(props) => <ViewTeam {...props} />}
      //       />
      //       <Route
      //         path="/team/view-member/:id"
      //         exact
      //         name="ViewMember"
      //         render={(props) => <TeamMember {...props} />}
      //       />
      //       <Route
      //         path="/team/add-member"
      //         exact
      //         name="AddMember"
      //         render={(props) => <Team {...props} />}
      //       />
      //       <Route
      //         path="/team/edit-member/:id"
      //         exact
      //         name="Edit Member"
      //         render={(props) => <TeamEdit {...props} />}
      //       />
      //     </Switch>
      //   </Suspense>
    );
  }
}

export default TeamLayout;
