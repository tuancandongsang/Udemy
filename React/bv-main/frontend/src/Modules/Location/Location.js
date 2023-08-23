import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListLocation from "./Components/Location/ListLocation";
import ActionLocation from "./Components/Location/ActionLocation";
import ActionLocationType from "./Components/Location_Type/ActionLocationType";
import ListLocationType from "./Components/Location_Type/ListLocationType";

class Location extends Component {

  render() {
    const { path } = this.props.match;
    return (
      <div className="Location">
        <Switch>
          <Route
            path={`${path}/type/create`}
            exact
            component={ActionLocationType}
          />
          <Route
            path={`${path}/type/:id`}
            exact
            component={ActionLocationType}
          />
          <Route path={`${path}/type`} exact component={ListLocationType} />
          <Route path={`${path}/create`} exact component={ActionLocation} />
          <Route path={`${path}/:id`} exact component={ActionLocation} />
          <Route path={`${path}`} exact component={ListLocation} />
        </Switch>
      </div>
    );
  }
}

export default Location;
