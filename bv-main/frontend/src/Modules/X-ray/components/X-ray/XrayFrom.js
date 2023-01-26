import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PatientList from "../../../../Shared/Components/PatientList/PatientList";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import DoctorServices from "../../../Doctor/Shared/DoctorService"
import SharedService from "../../../../Shared/Services/SharedService";
import { SERVICE_TYPE } from "../../../../Constances/const";
import XrayService from "../../share/XrayService";
import XrayResult from "../XrayResult/XrayResult";
import XrayResultPrint from "../XrayResultPrint/XrayResultPrint";
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";
class XrayFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xrayResult: {
        id: "",
        results: [{
          conclusion: "",
          description: ""
        }]
      },
      jobStepReady: [],
      jobStepRunning: [],
      selectedJob: [],
      selectedJobStepRunning: {},
      selectecPatientReady: {},
      // codeFromService: "1",
      stepID: "",
      xrayValue: "",
      titleWaitForXray: "Danh sách bệnh nhân chờ chụp X-quang:",
      modalConfirm: {
        message: "",
        saveXrayResult: false,
      },
      printResult: "none",
      titleWaitForXrayDone: "Danh sách bệnh nhân đã hoàn thành:",
      activeTab: '1',
      diagnosis: "",
    };
  }
  readyJobListAction = {
    refresh: null,
  }

  runningJobListAction = {
    refresh: null,
  }

  refreshJobList = () => {
    this.readyJobListAction.refresh();
    this.runningJobListAction.refresh();
  }



  onSelectJobRunning = async (p) => {
    if (p.order && p.order.customer) {
      this.setState((state) => ({
        ...state,
        selectecPatientReady: p.order.customer,
        stepID: p.id,
      }));
      if (p.code) {
        // SharedService.createBarcode(p.code);
      }
      await DoctorServices.getJobById({ id: p.job_id }).then(res => {
        res.state.subclinical = res.state.subclinical || {};
        this.setState({
          diagnosis: res.state.textDiagnosis,
          selectedJob: res,
        })
      })

      this.setState((state) => ({
        ...state,
        selectedJobStepRunning: p,
        xrayResult: {
          id: p.id,
          results: [{
            conclusion: "",
            description: ""
          }]
        },

      }));
    }
  };
  onSelectJobDone = async (p) => {
    if (p.order && p.order.customer) {
      this.setState((state) => ({
        ...state,
        selectecPatientReady: p.order.customer,
        stepID: p.id,
      }));
      await DoctorServices.getJobById({ id: p.job_id }).then(res => {
        this.setState({
          diagnosis: res.state.textDiagnosis,
        })
      })
      try {
        this.setState((state) => ({
          ...state,
          selectedJobStepRunning: p,
          xrayResult: {
            id: p.id,
            results: p.results
          },
        }));
      } catch (error) {
        throw error;
      }
    }

  };
  // Hiện popup xác nhận
  handleConfirm = (text) => {
    this.setState((state) => ({
      ...state,
      modalConfirm: {
        ...state.modalConfirm,
        message: text,
      },
    }));
  };
  // Hiện popup xác nhận
  handleConfirm = (text) => {
    this.setState((state) => ({
      ...state,
      modalConfirm: {
        ...state.modalConfirm,
        message: text,
      },
    }));
  };



  handleUpdateResult = async (argument) => {
    if (argument) {
      try {
        this.setState((state) => ({
          ...state,
          modalConfirm: {
            ...state.modalConfirm,
            message: "",
          },
        }));
        await XrayService.finishXrayResult(this.state.xrayResult).then((res) => {
          this.refreshJobList()
        }).catch(err => {
          console.log(err)
        })
        await this.setState((state) => ({
          ...state,
          printResult: "block",
        }));
        await this.print("printXray");
        await this.setState((state) => ({
          ...state,
          printResult: "none",
          xrayResult: {
            id: "",
            results: [{
              conclusion: "",
              description: ""
            }]
          },
          codeFromService: "1"
        }));
      } catch (error) {
        throw error;
      }
    } else {
      this.setState((state) => ({
        ...state,
        modalConfirm: {
          ...state.modalConfirm,
          message: "",
        },
      }));
    }
  };

  printBarcode = async () => {
    await this.setState((state) => ({
      ...state,
      printResult: "block",
    }));
    // await this.print("canvas_id");
    await this.setState((state) => ({
      ...state,
      printResult: "none",
    }));
  };

  print = (id) => {
    SharedService.print(id)
  };
  handleChangeResult = (value) => {
    let itemResults = this.state.xrayResult ? this.state.xrayResult : [];
    itemResults.results[0] = value
    this.setState({
      results: itemResults,
    })

  };
  selectTypeCustomer = (tab) => {
    let { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }
  render() {
    const location_id = XrayService.location.id;
    let { activeTab, selectedJobStepRunning } = this.state;
    return (
      <div className="xrayEdit">
        <Row className="mb-5 title-card">
          <div className="display-flex align-center">
            <div>
              <span>{XrayService.location?.name}</span>
            </div>
            <div className="text-right">
              <span className="select-office" onClick={() => {
                  XrayService.location = {};
                  window.location.replace('/app/xray')
                }}><b>Chuyển phòng</b>
              </span>
              <Clock></Clock>
            </div>
          </div>
        </Row>
        <Row className="content">
          <Col sm="8" className="content-left">
            <Row className="info-customer customCard">
              <CustomerForm data={this.state.selectecPatientReady} className="CustomerForm" mode="compact" ></CustomerForm>
            </Row>
            <Row className="from-XrayResult mt-3">
              <XrayResult
                activeTab={activeTab}
                codeFromService={this.state.codeFromService}
                results={this.state.xrayResult.results}
                onChangeResult={this.handleChangeResult} />
            </Row>
          </Col>
          <Col sm="4" className="content-right" >
            <Row className="CusList customCard" style={{backgroundColor: '#f4f6f9' }}>
                  <PatientList
                    titleOfList={this.state.titleWaitForXray}
                    onSelectJobStep={(jobStep) => this.onSelectJobRunning(jobStep)}
                    onSelectJobDone={(jobStep) =>this.onSelectJobDone(jobStep)}
                    location_id={location_id}
                    action={this.readyJobListAction}
                    type={SERVICE_TYPE.TEST}
                    mode="other"
                  />
            </Row>
          </Col>
        </Row>
        <Row className="btn-Comfirm end">
          <Col sm="12">
            <Button color="primary"
              hidden={!selectedJobStepRunning.id}
              onClick={() => this.handleConfirm("Bạn chắc chắn muốn cập nhật kết quả?")}>
              Gửi kết quả
            </Button>
          </Col>
        </Row>
        <XrayResultPrint
          style={this.state.printResult}
          diagnosis={this.state.diagnosis}
          selectedJobStepRunning={this.state.selectedJobStepRunning}
          xrayResult={this.state.xrayResult}
        />
        <ModalConfirm
          message={this.state.modalConfirm.message}
          answer={this.handleUpdateResult}
        />
      </div>
    )
  }
}

export default XrayFrom;