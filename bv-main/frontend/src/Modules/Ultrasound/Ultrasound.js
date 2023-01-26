import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthService } from "../../Shared";
import { ROLE } from "../../Constances/const";
import UltrasoundService from "./Shared/UltrasoundService";
import UltrasoundEdit from "./Components/Ultrasound/UltrasoundEdit";
import SelectRoom from "./Components/SelectRoom/SelectRoom";
import { LOCATION_TYPE } from "../../Constances/const";
class Ultrasonic extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="Ultrasonic">
        <Switch>
          <Route exact path={`${path}/`} render={() => {
            if (!AuthService.hasRole(ROLE.ULTRASOUND) && !AuthService.hasRole(ROLE.ADMIN)) {
              return (<Redirect to="/app/org/notauthorized" ></Redirect>)
            }
            if (!UltrasoundService.location.id) {
              return (<SelectRoom></SelectRoom>)
            } else {
              if (UltrasoundService.location.type !== LOCATION_TYPE.ULTRASOUND) {
                return (<SelectRoom></SelectRoom>)
              }
              else {
                return (<Redirect to={`${path}/room/${UltrasoundService.location.id}`} ></Redirect>)
              }

            }
          }} />
          <Route exact path={`${path}/room/:id`} component={UltrasoundEdit} />
        </Switch>
      </div>
    );
  }
}

export default Ultrasonic;
