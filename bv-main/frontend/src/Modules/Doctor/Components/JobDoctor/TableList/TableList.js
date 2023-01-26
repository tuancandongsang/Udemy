import React, { Component } from "react";
import PatientList from "../../../../../Shared/Components/PatientList/PatientList";
import DoctorServices from "../../../Shared/DoctorService"
import { STATUS, SERVICE_TYPE } from "../../../../../Constances/const"
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
      LocationList: [],
      nameLo : "",
    }
  }
  onSelectJobStep = async (jobStep) => {
    DoctorServices.getJobById({ id: jobStep.job_id }).then(res => {
      res.state = res.state || {};
      res.state.subclinical = res.state.subclinical || {};
      res.state.textDiagnosis = res.state.textDiagnosis || '';
      this.setState({
        selectedJobStep: jobStep,
        selectedJob: res,
      });
    }).catch(err => {
      console.log(err);
    })
    let url = '/app/doctor/tablelist/' + jobStep.job_id;
    window.location.assign(url);
  };
  jobListAction = {
    refresh: null,
  }
  componentDidMount (){
    DoctorServices.getListLocation().then(res =>{
      this.setState({
        LocationList: res.data
      })
    }
  ).catch(err =>
      console.log(err)
    )
    
  }
  render() {
    let location_id = DoctorServices.location.id ? DoctorServices.location.id : this.props.match.params.id;
    let LocationList = this.state.LocationList;
    let locationArr = LocationList.filter(el => el.id == location_id);
    let nameLo = locationArr? locationArr[0]? locationArr[0].name : "" : "";
    return (
      <div className="TableList">
        <div className="end">
          <span>{nameLo}</span>
          <span className="select-office" onClick={() => {
            DoctorServices.location = {};
            window.location.replace('/app/doctor')
          }}><b>Chuyển phòng</b></span>
        </div>
        <div className="customCard m-3">
          <PatientList
            titleOfList="Danh sách chờ khám bệnh"
            action={this.jobListAction}
            onSelectJobStep={(jobStep) => this.onSelectJobStep(jobStep)}
            location_id={location_id}
            status={[STATUS.NEW, STATUS.READY, STATUS.RUNNING]}
            type={SERVICE_TYPE.EXAM}
            mode="doctor" />
        </div>
      </div>
    );
  }
}

export default TableList;
