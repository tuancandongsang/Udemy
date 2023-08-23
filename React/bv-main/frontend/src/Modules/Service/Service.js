import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ServiceList from "./Components/ServiceList/ServiceList";
import ServiceForm from "./Components/ServiceForm/ServiceForm";
import PricePolicy from "./Components/PricePolicy/PricePolicy";
import PricePolicyForm from "./Components/PricePolicyForm/PricePolicyForm";
import EditServiceForm from "./Components/ServiceForm/ServiceForm";

class Service extends Component {
  
  render() {
    const { path } = this.props.match;
    return (
      <div className="Service">
        <Switch>
          <Route
            path={`${path}/price-policy/:id`}
            component={PricePolicyForm}
          />
          <Route path={`${path}/price-policy`} component={PricePolicy} />
          <Route path={`${path}/:id`} component={ServiceForm} />
          <Route path={`${path}`} component={ServiceList} />
        </Switch>
      </div>
    );
  }
}

export default Service;
