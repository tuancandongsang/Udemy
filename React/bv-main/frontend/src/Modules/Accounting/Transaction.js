import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import TransactionForm from "./Components/TransactionForm/TransactionForm"
import AccountingForm from "./Components/AccountingForm/AccountingForm";
import Statistical from "./Components/Statistical/Statistical";
import TransactionFormPharmacy from "./Components/TransactionForm/TransactionFormPharmacy";
import Report from "./Components/ReportByService/Report";
import ReportFormByType from "./Components/ReportByService/ReportFormByType";
class Transaction extends Component {

  render() {
    const { path } = this.props.match;
    return (
      <div className="Transaction">
        <Switch>
          <Route path={`${path}/order`} component={AccountingForm} />
          <Route path={`${path}/transaction`} component={TransactionForm} />
          <Route path={`${path}/statistical`} component={Statistical} />
          <Route path={`${path}/pharmacy`} component={TransactionFormPharmacy} />
          <Route path={`${path}/service/:type`} component={ReportFormByType} />
          <Route path={`${path}/service`} component={Report} />
        </Switch>
      </div>
    );
  }
}

export default Transaction;
