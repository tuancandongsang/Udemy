import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthService } from "../../Shared";
import { ROLE } from "../../Constances/const";
import ExamService from "./Shared/ExamService";
import ExamEdit from "./Components/Exam/ExamEdit";
import SelectRoom from "./Components/SelectRoom/SelectRoom";
import { LOCATION_TYPE } from "../../Constances/const";
import ExamResultPaper1 from '../Exam/Components/ExamResultPaper/ExamResultPaper1'
import ReportFormByType from "../Exam/Components/ReportByService/ReportFormByType";
import Report from "../Exam/Components/ReportByService/Report";
class Exam extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="Exam">
        <Switch>
          <Route exact path={`${path}/`} render={() => {
            if (!AuthService.hasRole(ROLE.TEST_OPERATOR) && !AuthService.hasRole(ROLE.ADMIN)) {
              return (<Redirect to="/app/org/notauthorized" ></Redirect>)
            }
            if (!ExamService.location.id) {
              return (<SelectRoom></SelectRoom>)
            } else {
              if (ExamService.location.type !== LOCATION_TYPE.TESTING) {
                return (<SelectRoom></SelectRoom>)
              }
              else {
                return (<Redirect to={`${path}/room/${ExamService.location.id}`} ></Redirect>)
              }
            }
          }} />
          <Route exact path={`${path}/room/:id`} component={ExamEdit} />
          <Route exact path={`${path}/12345`} component={ExamResultPaper1} />
          <Route path={`${path}/service/:type`} component={ReportFormByType} />
          <Route path={`${path}/service/test`} component={Report} />
        </Switch>
      </div>
    );
  }
}

export default Exam;
