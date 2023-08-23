
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import DoctorService from "./Shared/DoctorService";
import JobDoctor from "./Components/JobDoctor/JobDoctor";
import Main from './Components/Main/Main';
import PrintDiagnostic from "./Components/JobDoctor/Diagnostic/PrintDiagnostic";
import prescription from "./Components/JobDoctor/Prescriptions/printPrescriptions";
import { LOCATION_TYPE } from "../../Constances/const";
import HistoryCmByDoctor from "./Components/HistoryCmByDoctor/HistoryCmByDoctor"

class Doctor extends Component {
  render() {
    const { path } = this.props.match;
        return (
      <div className="Doctor">
        <Switch>
          <Route exact path={`${path}/`} render={() => {
            if (!DoctorService.location.id) {
              return (<Main></Main>)
            } else {
              if(DoctorService.location.type !== LOCATION_TYPE.EXAMINATION && DoctorService.location.type !== LOCATION_TYPE.EMERGENCY){
                return (<Main></Main>)
              }
              else{
                return (<Redirect to={`${path}/room/${DoctorService.location.id}`} ></Redirect>)
              }
              
            }
          }} />
          <Route exact path={`${path}/room/:id`} component={JobDoctor} />
          <Route exact path={`${path}/history`} component={HistoryCmByDoctor} />
          <Route exact path={`${path}/printDiag`} component={PrintDiagnostic} />
          <Route exact path={`${path}/PrintPre`} component={prescription} />
        </Switch>
      </div>
    );
  }
}

export default Doctor;
