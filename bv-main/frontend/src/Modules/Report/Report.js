import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListReport from "./Components/Report/ListReport";


class Report extends Component {

  render() {
    const { path } = this.props.match;
    return (
      <div className="Report">
        <Switch>
          <Route path={`${path}/`} exact component={ListReport} />
        </Switch>
      </div>
    );
  }
}

export default Report;
