import React from "react";
import { Row, Col } from "reactstrap";
import { Form } from "../../../../Shared";
import Diagnostic from "./Diagnostic/Diagnostic";
import PreExamination from "./PreExamination/PreExamination";
import Prescriptions from "./Prescriptions/Prescriptions";
import DoctorServices from "../../Shared/DoctorService";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import PatientList from "../../../../Shared/Components/PatientList/PatientList";
import Diagnosis from "./Diagnosis/Diagnosis";
import { withRouter } from "react-router";
import { SERVICE_TYPE, LOCATION_TYPE } from "../../../../Constances/const";
import HistoryCmByDoctor from "../HistoryCmByDoctor/HistoryCmByDoctor";
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";
import { Notification } from "../../../../Shared/Components/Notification/Notification";

class JobDoctor extends Form {
  constructor(props) {
    super(props);
    this.state = {
      servicesList: [],
      ProductList: [],
      patientList: [],
      selectedJobStep: {},
      selectedJob: {},
      textDiagnosis: "",
      activeTab: '1',
      titleWaitForExam: "Danh Sách Bệnh Nhân Chờ",
      titleWaitForExamDone: 'Danh Sách Bệnh Nhân hoàn thành',
      navActiveListPeople: false,
      navActiveExam: false,
      notiQuantity: 0,
      resultList: []
    };
  }
  componentDidMount() {
    let promises = [
      DoctorServices.getListServices(),
      DoctorServices.getListProduct(),
    ];
    Promise.all(promises).then(([serviceList, medList]) => {
      this.setState({
        servicesList: serviceList.data,
        ProductList: medList.data,
      });
    }).catch(function (error) {
      console.log(error);
    });
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
  };
  selectTypeCustomer = (tab) => {
    let { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }
  jobListAction = {
    refresh: null,
  }
  setNotiQuantity = (num) => {
    this.setState({
      notiQuantity: num
    })
  }
  shortKeyShowListPeople = (e) => {
    if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      this.setState({ navActiveListPeople: true, })
    }
  }

  myRef = React.createRef();
  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ navActiveListPeople: false });
    }
  };
  hiddenPatientList = () => {
    this.setState({ navActiveListPeople: false });
  }
  onChangetextDiagnosis = (ev) => {
    this.setState({
      textDiagnosis: ev
    })
  }
  render() {
    let locationType = DoctorServices.location.type;
    let {
      notiQuantity,
      servicesList,
      ProductList,
      selectedJobStep,
      selectedJob,
      activeTab,
    } = this.state;
    let cusData = selectedJobStep.order ? selectedJobStep.order.customer : {};
    let location_id = selectedJobStep.location ? selectedJobStep.location.id : "";
    return (
      <div className="JobDoctor" onKeyDown={(e) => this.shortKeyShowListPeople(e)} tabIndex="0">
        
        <Row className="title-card">
          <div className="display-flex align-center">
            <div>
              <span>{DoctorServices.location?.name}</span>
            </div>
            <div className="text-right">
              <span className="select-office" onClick={() => {
                      DoctorServices.location = {};
                      window.location.replace('/app/doctor')
                      }}><b>Chuyển phòng</b>
              </span>
              <Clock></Clock>
              {/* <Notification/> */}
            </div>
          </div>
        </Row>
        <hr className="mb-0 mt-0" />
        <Row className="content">
          <Col>
            <Row className="mt-1 mb-15">
              <Col sm="7">
                <div className="customCard content-left">
                  <Row >
                    <Col sm='7' className="infoCustomerCard" ><CustomerForm data={cusData} mode="doctor" /></Col>
                    <Col sm='5' className="p-0"><PreExamination job={selectedJob} /></Col>
                  </Row>
                  {/* <Line></Line> */}
                  <Diagnosis job={selectedJob} onChangetextDiagnosis={this.onChangetextDiagnosis} />
                </div>
              </Col>
              <Col sm="5">
                <Diagnostic
                  textDiagnosis={this.state.textDiagnosis}
                  resultList={this.state.resultList}
                  servicesList={servicesList}
                  cusData={cusData}
                  stepId={selectedJobStep.id}
                  job={selectedJob}
                  onRefresh={this.jobListAction.refresh}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="7" className="customCard p-15">
                <Prescriptions
                  ProductList={ProductList}
                  cusData={cusData}
                  job={selectedJob}
                  stepId={selectedJobStep.id}
                  onRefresh={this.jobListAction.refresh}
                />
              </Col>
              <Col sm="5" className="customCard ">
                <HistoryCmByDoctor mode="doctor"  data={cusData}></HistoryCmByDoctor>
              </Col>
            </Row>
          </Col>
        </Row>
        
        <div className={this.state.navActiveListPeople || this.state.navActiveExam ? "nav-active" : "nav-disable"}>
          <div className="group-btn">
            <p className="btn-circle btn-people mb-2 pointer"
              onClick={() => this.setState({ navActiveListPeople: true })}
            ><span className="material-icons">people</span><sup>{notiQuantity > 0 ? <div>{notiQuantity}</div> : null}</sup></p>
          </div>
          <div className="content">
            <div className={this.state.navActiveListPeople ? "display" : "none-display"}>
              <div ref={this.myRef}>
                {locationType === LOCATION_TYPE.EMERGENCY ?
                  <div>
                        <PatientList
                          hiddenPatientList={this.hiddenPatientList}
                          titleOfList={this.state.titleWaitForExam}
                          action={this.jobListAction}
                          onSelectJobStep={(jobStep) => this.onSelectJobStep(jobStep)}
                          location_id={DoctorServices.location.id}
                          type={SERVICE_TYPE.EXAM}
                          setNotiQuantity={this.setNotiQuantity}
                          resultList={this.state.resultList}
                          hasNoti={true}
                          mode="emergency" />

                  </div>
                  :
                  <div>
                        <PatientList
                          hiddenPatientList={this.hiddenPatientList}
                          titleOfList={this.state.titleWaitForExam}
                          action={this.jobListAction}
                          onSelectJobStep={(jobStep) => this.onSelectJobStep(jobStep)}
                          location_id={DoctorServices.location.id}
                          type={SERVICE_TYPE.EXAM}
                          setNotiQuantity={this.setNotiQuantity}
                          resultList={this.state.resultList}
                          hasNoti={true}
                          mode="doctorDone" />
                  </div>
                }
              </div>
              <div className="doctor-opacity"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(JobDoctor);
