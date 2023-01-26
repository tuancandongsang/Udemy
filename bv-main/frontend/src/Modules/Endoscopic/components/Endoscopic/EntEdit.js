import React, { Component } from "react";
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink, } from "reactstrap";
import PatientList from "../../../../Shared/Components/PatientList/PatientList";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import DoctorServices from "../../../Doctor/Shared/DoctorService"
import SharedService from "../../../../Shared/Services/SharedService";
import { STATUS, SERVICE_TYPE } from "../../../../Constances/const";
import EntService from "../../share/EntService";
import EntResult from "../EntResult/EntResultc";
import EntResultPrint from "../EntResultPrint/EntResultPrint";
import classnames from 'classnames';
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";

class EntEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entResult: {
        id: "",
        results: [{
          conclusion: "",
          description: ""
        }]
      },
      jobStepReady: [],
      jobStepRunning: [],
      diagnosis: "",
      selectedJobStepRunning: {},
      selectecPatientReady: {},
      stepID: "",
      titleWaitForEnt: "Danh sách bệnh nhân chờ Nội Soi:",
      titleWaitForEntDone: "Danh sách bệnh nhân đã hoàn thành:",
      modalConfirm: {
        message: "",
        saveEntResult: false,
      },
      name_files: {
        rightear: "",
        leftear: "",
        nose: "",
        throat: ""
      },
      urlFileImg: {
        rightearImg: "",
        leftearImg: "",
        noseImg: "",
        throatImg: "",
      },
      photos: new FormData(),
      printResult: "none",
      activeTab: '1',
      array_urls: [],
      // codeFromService : "1"
    };
  }

  readyJobListAction = {
    refresh: null,
  }

  runningJobListAction = {
    refresh: null,
  }
  handleReset = () =>{
    this.setState({
      entResult: {
        id: "",
        results: [{
          conclusion: "",
          description: ""
        }]
      },
      jobStepReady: [],
      jobStepRunning: [],
      diagnosis: "",
      selectedJobStepRunning: {},
      selectecPatientReady: {},
      stepID: "",
      modalConfirm: {
        message: "",
        saveEntResult: false,
      },
      name_files: {
        rightear: "",
        leftear: "",
        nose: "",
        throat: ""
      },
      urlFileImg: {
        rightearImg: "",
        leftearImg: "",
        noseImg: "",
        throatImg: "",
      },
      photos: new FormData(),
      printResult: "none",
      activeTab: '1',
      array_urls: [],
      // codeFromService : "1"
    
    })
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
      await DoctorServices.getJobById({ id: p.job_id }).then(res => {
        this.setState({
          diagnosis: res.state.textDiagnosis,
        })
      })
      try {
        this.setState((state) => ({
          ...state,
          selectedJobStepRunning: p,
          entResult: {
            id: p.id,
            results: [{
              conclusion: "",
              description: ""
            }]
          },
          array_urls: [],
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
        entResult: {
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
      this.setState((state) => ({
        ...state,
        modalConfirm: {
          ...state.modalConfirm,
          message: "",
        },
      }));
      this.state.photos.append("ref_id", this.state.stepID);
      EntService.uploadPhoto(this.state.photos).then(
        res => {
          let array_urls = res.data.map(res => res.name)
          this.setState({ array_urls: array_urls })
        }).catch(err => {
          console.log(err)
        })
      await EntService.finishEntResult(this.state.entResult).then((res) => {
        this.refreshJobList()
      }).catch(err => {
        console.log(err)
      })
      await this.setState((state) => ({
        ...state,
        printResult: "block",
      }));
      await this.print("printEnt");
      await this.setState((state) => ({
        ...state,
        printResult: "none",
        entResult: {
          ...state.entResult,
          id: "",
          results: [{
            conclusion: "",
            description: ""
          }],
          name_files: {
            rightear: "",
            leftear: "",
            nose: "",
            throat: ""
          },
          array_urls: [],
          // photos: null
        },
        codeFromService: "1"
      }));

    } else {
      this.setState((state) => ({
        ...state,
        modalConfirm: {
          ...state.modalConfirm,
          message: "",
        },
      }));
    }
    this.handleReset()
  };

  printBarcode = async () => {
    await this.setState((state) => ({
      ...state,
      printResult: "block",
    }));
    await this.setState((state) => ({
      ...state,
      printResult: "none",
    }));
  };

  print = (id) => {
    SharedService.print(id)
  };

  handleChangeResult = (value, files, urlFile) => {
    let itemResults = this.state.entResult ? this.state.entResult : [];
    itemResults.results[0] = value
    this.setState({
      photos: files,
      results: itemResults,
      urlFileImg: urlFile
    })
  };
  selectTypeCustomer = (tab) => {
    let { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }
  render() {
    const location_id = EntService.location.id;
    let { activeTab, name_files ,selectedJobStepRunning} = this.state
    return (
      <div className="EntEdit">
        <Row className="mb-5 title-card">
          <div className="display-flex align-center">
            <div>
              <span>{EntService.location?.name}</span>
            </div>
            <div className="text-right">
              <span className="select-office" onClick={() => {
                  EntService.location = {};
                  window.location.replace('/app/endoscopic')
                }}><b>Chuyển phòng</b>
              </span>
              <Clock></Clock>
            </div>
          </div>
        </Row>
        <Row className="content">
          <Col sm="8" className="content-left">
            <Row className="info-customer customCard">
              <Col>
                <CustomerForm data={this.state.selectecPatientReady} className="CustomerForm" mode="compact" ></CustomerForm>
              </Col>
            </Row>
            <Row className="from-EntResult mt-3">
              <EntResult
                upload={this.state.array_urls}
                activeTab={activeTab}
                selectedJobStepRunning={this.state.selectedJobStepRunning}
                codeFromService={this.state.codeFromService}
                results={this.state.entResult.results}
                name_files={name_files}
                photos={this.state.photos}
                onChangeResult={this.handleChangeResult} />
            </Row>
          </Col>
          <Col sm="4" className="content-right">
            <Row className="CusList customCard"  style={{backgroundColor: '#f4f6f9', padding: 0 }}>
                  <PatientList
                    titleOfList={this.state.titleWaitForEnt}
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
            <Button color="primary"
            hidden={!selectedJobStepRunning.id}
            onClick={() => {
              this.handleConfirm("Bạn chắc chắn muốn cập nhật kết quả?")
            }}>
              Gửi kết quả
            </Button>
          </Col>
        </Row>
        <EntResultPrint
          tab={"1"}
          urlFileImg={this.state.urlFileImg}
          upload={this.state.array_urls}
          style={this.state.printResult}
          diagnosis={this.state.diagnosis}
          selectedJobStepRunning={this.state.selectedJobStepRunning}
          entResult={this.state.entResult}
        />
        <ModalConfirm
          message={this.state.modalConfirm.message}
          answer={this.handleUpdateResult}
        />
      </div>
    )
  }
}

export default EntEdit;