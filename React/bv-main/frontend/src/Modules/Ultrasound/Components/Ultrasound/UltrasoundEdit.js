import React, { Component } from "react";
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink, } from "reactstrap";
import PatientList from "../../../../Shared/Components/PatientList/PatientList";
import ResultUltra from "../ResultUltrasound/ResultUltrasound";
import PaperResultUltrasound from "../PaperResultUltrasound/PaperResultUltrasound";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import PrintBarcode from "../PaperResultUltrasound/CustomerFromPrint"
import DoctorServices from "../../../Doctor/Shared/DoctorService"
import UltrasoundService from "../../Shared/UltrasoundService";
import SharedService from "../../../../Shared/Services/SharedService";
import { STATUS, SERVICE_TYPE } from "../../../../Constances/const";
import classnames from 'classnames';
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";

class UltrasoundEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ultraName: "",
      subclinical: "",
      ultraConclusion: "",
      ctime: '',
      ultraResult: {
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
      stepID: "",
      titleWaitForUltra: "Danh sách bệnh nhân chờ siêu âm:",
      titleWaitForUltraDone: "Danh sách bệnh nhân đã hoàn thành:",
      modalConfirm: {
        message: "",
        saveUltraResult: false,
      },
      urlFileImg: {
        fileImg: "",
      },
      photos: new FormData(),
      array_urls: [],
      printResult: "none",
      activeTab: '1',
      diagnosis: "",
      tab:"1",
      file: "",
      // codeFromService: "1"
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
    if(p.order && p.order.customer){
      this.setState((state) => ({
        ...state,
        selectecPatientReady: p.order.customer,
        stepID: p.id,
      }));
      if (p.code) {
        // SharedService.createBarcode(p.code);
      }
      DoctorServices.getJobById({ id: p.job_id }).then(res => {
        this.setState({
          diagnosis: res.state.textDiagnosis
        })
      })
      try {
        if (p.code) {
          // SharedService.createBarcode(p.code);
        }
        this.setState((state) => ({
          ...state,
          selectedJobStepRunning: p,
          ultraResult: {
            id: p.id,
            results: [{
              conclusion: "",
              description: ""
            }]
          },
          array_urls: [],
          file: ''
        }));
      } catch (error) {
        throw error;
      }
    } 
  };
  onSelectJobDone = async (p) => {
    if(p.order && p.order.customer){
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
  
      this.setState((state) => ({
        ...state,
        selectedJobStepRunning: p,
        ultraResult: {
          id: p.id,
          results: p.results
        },
        array_urls: p.upload,
        
      }));
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
        this.state.photos.append("ref_id", this.state.stepID);
        UltrasoundService.uploadPhoto(this.state.photos).then(
          res => {
            console.log("thành công");
          }).catch(err => {
            console.log(err)
          })
        await UltrasoundService.finishUtralResult(this.state.ultraResult).then((res) => {
          this.refreshJobList()
        }).catch(err => {
          console.log(err)
        })
        await this.setState((state) => ({
          ...state,
          printResult: "block",
        }));
        await this.print("printUltra");
        await this.setState((state) => ({
          ...state,
          printResult: "none",
          ultraResult: {
            ...state.ultraResult,
            id: "",
            results: [{
              conclusion: "",
              description: ""
            }]
          },
          array_urls: [],
          codeFromService: "1",
          file: ''
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
    await SharedService.printBarCode("barCodeCus");
    await this.setState((state) => ({
      ...state,
      printResult: "none",
    }));
  };

  print = (id) => {
    UltrasoundService.print(id);
  };

  handleChangeResult = (value, files,urlFile) => {
    let itemResults = this.state.ultraResult ? this.state.ultraResult : [];
    itemResults.results[0] = value
    this.setState({
      results: itemResults,
      photos: files,
      urlFileImg : urlFile
    })
  };
  selectTypeCustomer = (tab) => {
    let { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }
  render() {
    const location_id = UltrasoundService.location.id;
    let { activeTab ,selectedJobStepRunning} = this.state
    return (
      <div className="UltrasoundEdit">
        <Row className="mb-5 title-card">
          <div className="display-flex align-center">
            <div>
              <span>{UltrasoundService.location?.name}</span>
            </div>
            <div className="text-right">
              <span className="select-office" onClick={() => {
                  UltrasoundService.location = {};
                  window.location.replace('/app/ultrasound')
                }}><b>Chuyển phòng</b>
              </span>
              <Clock></Clock>
            </div>
          </div>
        </Row>
        <Row className="content">
          <Col sm="8" className="content-left">
            <Row className="info-customer customCard" style={{marginBottom : "13px"}}>
              <CustomerForm data={this.state.selectecPatientReady} mode="compact" ></CustomerForm>
            </Row>
            <Row className="from-ExamResult mt-3">
              <ResultUltra results={this.state.ultraResult.results}
                jobStep={this.state.selectedJobStepRunning}
                activeTab={activeTab}
                codeFromService={this.state.codeFromService}
                onChangeResult={this.handleChangeResult} 
                upload ={this.state.array_urls}
                file = {this.state.file}
                />               
            </Row>
          </Col>
          <Col sm="4" className="content-right">
            <Row className="CusList customCard">
                  <PatientList
                    titleOfList={this.state.titleWaitForUltra}
                    onSelectJobStep={(jobStep) => this.onSelectJobRunning(jobStep)}
                    onSelectJobDone={(jobStep) => this.onSelectJobDone(jobStep)}
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
            {/* <Button outline color="primary" onClick={() => this.printBarcode()}>
              In mã vạch
            </Button>{" "} */}
            <Button color="primary"
            hidden={!selectedJobStepRunning.id}
            onClick={() => this.handleConfirm("Bạn chắc chắn muốn cập nhật kết quả?")}>
              Gửi kết quả
            </Button>
          </Col>
        </Row>
        <PaperResultUltrasound
          upload={this.state.array_urls}
          tab={this.state.tab}
          urlFileImg={this.state.urlFileImg}
          ultraName={this.state.ultraName}
          style={this.state.printResult}
          selectedJobStepRunning={this.state.selectedJobStepRunning}
          ultraResult={this.state.ultraResult}
          ctime={this.state.ctime}
          diagnosis={this.state.diagnosis}
        />
        <PrintBarcode
          jobStep={this.state.selectedJobStepRunning}
        ></PrintBarcode>
        <ModalConfirm
          message={this.state.modalConfirm.message}
          answer={this.handleUpdateResult}
        />
      </div>
    )
  }
}

export default UltrasoundEdit;