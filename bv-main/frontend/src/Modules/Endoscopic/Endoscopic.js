import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthService } from "../../Shared";
import EntService from "./share/EntService"
import { ROLE } from "../../Constances/const";
import SelectRoom from "./components/SelectRoom/SelectRoom";
import EntEdit from "./components/Endoscopic/EntEdit";
import { LOCATION_TYPE } from "../../Constances/const";
class Endoscopic extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="Endoscopic">
        <Switch>
          <Route exact path={`${path}/`} render={() => {
            if (!AuthService.hasRole(ROLE.ENT) && !AuthService.hasRole(ROLE.ADMIN)) {
              return (<Redirect to="/app/org/notauthorized" ></Redirect>)
            }
            if (!EntService.location.id) {
              return (<SelectRoom></SelectRoom>)
            } else {
              if (EntService.location.type !== LOCATION_TYPE.ENT) {
                return (<SelectRoom></SelectRoom>)
              }
              else {
                return (<Redirect to={`${path}/room/${EntService.location.id}`} ></Redirect>)
              }
            }
          }} />
          <Route exact path={`${path}/room/:id`} component={EntEdit} />
        </Switch>
      </div>
    );
  }
}

export default Endoscopic;