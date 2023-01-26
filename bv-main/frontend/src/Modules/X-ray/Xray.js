import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthService } from "../../Shared";
import XrayFrom from "./components/X-ray/XrayFrom";
import XrayService from "./share/XrayService"
import { ROLE, LOCATION_TYPE } from "../../Constances/const";
import SelectRoom from "./components/SelectRoom/SelectRoom"

class Xray extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="Xray">
        <Switch>
          <Route exact path={`${path}/`} render={() => {
            if (!AuthService.hasRole(ROLE.XRAY) && !AuthService.hasRole(ROLE.ADMIN)) {
              return (<Redirect to="/app/org/notauthorized" ></Redirect>)
            }
            if (!XrayService.location.id ) {
              return (<SelectRoom></SelectRoom>)
            } else {
              if( XrayService.location.type !== LOCATION_TYPE.XRAY){
                return (<SelectRoom></SelectRoom>)
              }
              else{
                return (<Redirect to={`${path}/room/${XrayService.location.id}`} ></Redirect>)
              }
              
            }
          }} />
          <Route exact path={`${path}/room/:id`} component={XrayFrom} />
        </Switch>
      </div>
    );
  }
}

export default Xray;