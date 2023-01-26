import React, { Component, Fragment } from "react";
import { Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink, Input, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";
import PatientList from "../../../../Shared/Components/PatientList/PatientList";
import ExamResult from "../ExamResult/ExamResult";
import ExamResultPaper1 from "../ExamResultPaper/ExamResultPaper1";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import PrintBarcode from "../ExamResultPaper/CustomerFromPrint"
import DoctorServices from "../../../Doctor/Shared/DoctorService"
import ExamService from "../../Shared/ExamService";
import SharedService from "../../../../Shared/Services/SharedService";
import { STATUS, SERVICE_TYPE, IOS_DATE, WS_URL } from "../../../../Constances/const";
import classnames from 'classnames';
import { ShareService } from "../../../../Shared";
import { FormParent, ModalNoti } from "../../../Reception/Shared";
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
class ExamEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slow: false,
      nameDevice: [],
      sendReq: false,
      otherData: {},
      inWaitingData: true,
      doctor_write: '',
      notiMessage: '',
      customer: {},
      showSendResult: false,
      devices: [
        {
          name: 'Immune',
          attr: [
            {
              name: 'Beta HCG',
              label2: 'Beta HCG',
              label: 'Beta HCG',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'T3',
              label2: 'T3',
              label: 'T3',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'FT3',
              label2: 'FT3',
              label: 'FT3',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },

            {
              name: 'HbA1c',
              label2: 'HbA1c',
              label: 'HbA1c',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'TESTOSTERON',
              label2: 'TESTOSTERON',
              label: 'TESTOSTERON',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'PROGESTERON',
              label2: 'PROGESTERON',
              label: 'PROGESTERON',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'FT4',
              label2: 'FT4',
              label: 'FT4',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'T4',
              label: 'T4',
              label2: 'T4',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'FSH',
              label2: 'FSH',
              label: 'FSH',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'TSH',
              label2: 'TSH',
              label: 'TSH',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'AFP',
              label2: 'AFP',
              label: 'AFP',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'Phosphat AFP',
              label2: 'Phosphat AFP',
              label: 'Phosphat AFP',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'ESTRADIOL',
              label2: 'ESTRADIOL',
              label: 'ESTRADIOL',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'LH',
              label2: 'LH',
              label: 'LH',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'Cortisol',
              label2: 'Cortisol',
              label: 'Cortisol',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
            {
              name: 'CRP',
              label2: 'CRP',
              label: 'CRP',
              value: {
                value: '',
                unit: '',
                range: [0, 0]
              },
              isInput: true
            },
          ]
        },
      ],
      resultsExam: [],
      examName: "",
      subclinical: "",
      ctime: '',
      jobStepReady: [],
      jobStepRunning: [],
      selectedJob: [],
      examResultId: "",
      selectedJobStepRunning: {},
      selectecPatientReady: {},
      stepID: "",
      showBarcode: false,
      order_id: "",
      activeTab: '1',
      activeDevice: '4',
      titleWaitForExam: "Danh sách bệnh nhân chờ xét nghiệm:",
      titleWaitForExamDone: "Danh sách bệnh nhân có kết quả xét nghiệm:",
      titleWaitForResult: "Danh sách bệnh nhân chờ kết quả:",
      modalConfirm: {
        message: "",
        saveExamResult: false,
      },
      printResult: "none",
    };
  }
  //  handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage });
  };
  setShowSendResult = (showSendResult) => {
    this.setState({ showSendResult })
  }
  setShowBarcode = (showBarcode) => {
    this.setState({ showBarcode });
  }

  readyJobListAction = {
    refresh: null,
  }

  // runningJobListAction = {
  //   refresh: null,
  // }

  setValueService = (e, target, machineName) => {
    let { resultsExam } = this.state
    let value = e.target.value
    this.state.resultsExam.forEach((result) => {
      if (result.device == machineName) {
        result[target] = {
          value: e.target.value,
          unit: '',
          range: [null, null]
        }
      }
    })
    this.setState({ resultsExam: resultsExam })
    if(e.target.value.length>0){
      this.setShowSendResult(true)
    } 
  }

  refreshJobList = () => {
    this.readyJobListAction.refresh();
    // this.runningJobListAction.refresh();
  }

  setWaiting = (value) => {
    this.setState({ inWaitingData: value })
  }

  setDeviceValue = (e, device, attr) => {
    if (e && e.target) {
      let resultsExam = this.state.resultsExam
      let devices = this.state.devices
      devices.forEach(d => {
        if (d.name == device.name) {
          d.attr.forEach(a => {
            if (a.name == attr.name) {
              a.value.value = e.target.value
              a.value.unit = a.value.unit
              a.value.range = a.value.range
            }
          })
        }
      })
      this.setState({ devices: devices })
      resultsExam.forEach(el => {
        if (el.device == 'Immune' && device.name == 'Immune') {
          el[attr.label2] = {
            value: e.target.value,
            unit: '',
            range: [null, null]
          }
        }
        else if (el.device == 'Test' && device.name == 'Test') {
          el[attr.label2] = {
            value: e.target.value,
            unit: '',
            range: [null, null]
          }
        }
      })
      this.setState({ resultsExam: resultsExam })
    }
  }
  selectTypeStatusTest = (tab) => {
    this.setState({
      resultsExam: {},
      nameDeviceObj: {},
      TestId: [],
      nameDevice: [],
    });
    let { activeTab } = this.state
    if (activeTab !== tab) this.setState({ activeTab: tab })
  }
  selectTypeStatusDevice = (tab) => {
    this.setState({
      inWaitingData: false
    });
    let { activeDevice } = this.state
    if (activeDevice !== tab) this.setState({ activeDevice: tab })
  }

  myRef = React.createRef();
  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ navActiveListPeople: false });
    }
  }

  handleShowBarcode = () => { this.setShowBarcode(true) };

  handleSwitchStatus = async () => {
    let step = {
      id: this.state.IdUpdate,
      status: STATUS.RUNNING
    }
    await ExamService.takeSample(step)
  }

  handleResultExam = (resultExam) => {
    let TestId = [], nameDevice = [], resultsExam = [], nameDeviceObj = {};
    for (let i = resultExam.length - 1; i >= 0; i--) {
      let re = resultExam[i]
      if (re.sample_id) {
        if (re.device == 'BC-2800' && typeof nameDeviceObj.BC2800 === "undefined") {
          nameDeviceObj.BC2800 = 'BC-2800';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        } else if (re.device == 'BS-200E' && typeof nameDeviceObj.BS200E === "undefined") {
          nameDeviceObj.BS200E = 'BS-200E';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        } else if (re.device == 'UA-66' && typeof nameDeviceObj.UA66 === "undefined") {
          nameDeviceObj.UA66 = 'UA-66';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        } else if (re.device == 'Test' && typeof nameDeviceObj.Test === "undefined") {
          nameDeviceObj.Test = 'Test';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        } else if (re.device == 'Other' && typeof nameDeviceObj.Other === "undefined") {
          nameDeviceObj.Other = 'Other';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        } else if (re.device == 'Immune' && !nameDeviceObj.IMMUNE) {
          nameDeviceObj.IMMUNE = 'Immune';
          TestId.push(re.sample_id);
          nameDevice.push(re.device);
          resultsExam.push(re);
        }
      }
    }
    if (this.state.activeTab === "3") {
      TestId = [];
      nameDevice = [];
    }
    this.setState({
      resultsExam: resultsExam,
      nameDeviceObj: nameDeviceObj,
      TestId: TestId,
      nameDevice: nameDevice,
    });
  }

  checkSample(resultsExam) {
    for (let re of resultsExam) {
      if (re.sample_id) {
        return true;
      }
    }
  }

  handleDataTable = async (examResultId) => {
    // if (this.state.slow) return
    // if (!examResultId) return
    // this.setState({ slow: true, inWaitingData: false })
    let res = await ExamService.getResultsByStepId(examResultId);
    // console.log('handleDataTable', res)
    let TestTotal = res.data;
    let ctime = res.data.ctime
    let mtime = res.data.mtime
    const sampleIdCtime = new Date(ctime).toLocaleDateString('en-gb')
    const sampleIdMtime = new Date(mtime).toLocaleString('en-gb')
    let IdUpdate = res.data.id
    let nameServiceTest = res.data.order.items.map(e => e.ref_value.name);
    this.setState({
      slow: false,
      sampleIdCtime: sampleIdCtime,
      sampleIdMtime: sampleIdMtime,
      nameServiceTest: nameServiceTest,
      TestTotal: TestTotal,
      IdUpdate: IdUpdate,
      inWaitingData: true,
    });
    let resultsExam = res.data.results;
    this.handleResultExam(resultsExam)
    if (!this.checkSample(resultsExam)) {
      await ExamService.createSampleIdByRef(this.state.order_id);
      return this.handleDataTable(examResultId);
    }
    resultsExam.forEach(resultExam => {
      let deviceName = resultExam.device
      this.state.devices.forEach(device => {
        if (device.name == deviceName) {
          Object.entries(resultExam).map((key) => {
            let exist = false;
            device.attr.forEach(e => {
              if (e.label2 == key[0]) {
                exist = true
                e.value = key[1]
              }
            });
            if (!exist) {
              let attr = {
                name: key[0],
                label: key[0],
                label2: key[0],
                value: {
                  value: key[1].value,
                  unit: key[1].unit,
                  range: key[1].range
                },
                isInput: false
              }
              device.attr.unshift(attr);
            }
          });
        }
      });
    });
  }
  updateJobId = async (patient) => {
    if (this.state.slow) return
    if (!patient.job_id) return
    let ctime = new Date().toLocaleString('en-GB');
    let res = await DoctorServices.getJobById({ id: patient.job_id });
    res.state.subclinical = res.state.subclinical || {};
    this.setState({
      selectedJob: res,
      prognostic: res.state,
      ctime: ctime,
      subclinical: res.state.textDiagnosis,
      selectedJobStepRunning: patient,
      order_id: patient.order_id,
      examResultId: patient.id,
      selectecPatientReady: patient.order.customer,
      stepID: patient.id,
      customer: patient.order.customer
    });
  }
  onSelectJobRunning = (patient) => {
    this.setState({
      inWaitingData: false
    });
    if (patient) {
      this.updateJobId(patient).then(res => {
        this.handleDataTable(this.state.examResultId);
        this.setState({
          inWaitingData: true
        })
      }).catch(err => console.log(err))
    }
  }

  handleResetForm = () => {
    this.setShowSendResult(false)
  }

  handleConfirm = (text) => {
    this.setState((state) => ({
      ...state,
      modalConfirm: {
        ...state.modalConfirm,
        message: text,
      },
    }));
  }

  handleUpdateResult = async (argument) => {
    let { resultsExam, devices } = this.state;
    let sampleID = resultsExam[0].sample_id
    let time = new Date().toLocaleString('en-GB')
    this.setState({
      sampleID: sampleID,
      time: time
    })
    ExamService.getUserIDBySampleID(sampleID).then(res => {
      let idUser = res.data.created_by
      ExamService.getUserByUserId(idUser).then(res => {
        this.setState({ userName: res.data.full_name })
      })
    })
    let id = this.state.stepID;
    let data = {
      id: id,
      results: resultsExam
    }
    if (argument) {
      try {
        this.setState((state) => ({
          ...state,
          modalConfirm: {
            ...state.modalConfirm,
            message: "",
          },
        }));
        ExamService.updateExamResult(data).then((res) => {
          this.refreshJobList()
        }).catch(err => {
          console.log(err)
        })
        await this.setState((state) => ({
          ...state,
          printResult: "block",
        }));
        await this.print("printExam");
        await this.setState((state) => ({
          ...state,
          printResult: "none",
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
  }

  handleChangeGetValue = (e) => {
    let doctor_write = e.target.value
    this.setState({ doctor_write: doctor_write })
  }

  printBarcode = async () => {
    this.setState({ inWaitingData: false })
    await ShareService.printBarCode("barcodeCanvas");
    await this.handleSwitchStatus()
    this.setState({
      inWaitingData: true,
      resultsExam: [],
      nameDeviceObj: {},
      TestId: [],
      nameDevice: [],
    })
  }

  print = (id) => {
    ExamService.print(id);
  }

  handleChangeResult = (index, id, value) => {
    const newItems = this.state.examResult.result;
    newItems[index].ref_value.service_step.map(el => {
      if (el.id === id) {
        el.resultValue = value;
        return el
      }
    })
    this.setState({
      result: newItems
    })

  }

  render() {
    const location_id = ExamService.location.id;
    let { activeTab, notiMessage, inWaitingData, nameDevice, startSlow } = this.state;
    return (
      <div className="examEdit">
        <ModalNoti
          message={notiMessage}
          done={() => this.setNotiMessage("")}
        />
        <Row className="mb-5 title-card">
          <div className="display-flex align-center">
            <div>
              <span>{ExamService.location?.name}</span>
            </div>
            <div className="text-right">
              <span className="select-office" onClick={() => {
                ExamService.location = {};
                window.location.replace('/app/exam/service/test')
              }}><b>Thống kê XN </b>
              </span>

              <span className="select-office" onClick={() => {
                ExamService.location = {};
                window.location.replace('/app/exam')
              }}><b>Chuyển phòng</b>
              </span>
              <Clock></Clock>
            </div>
          </div>
        </Row>
        <Row className="content">
          <Col sm="8" className="content-left">
            <Row className="info-customer customCard">
              {inWaitingData ? <CustomerForm data={this.state.selectecPatientReady} mode='exam'
              ></CustomerForm> :
                <CustomerForm
                  mode='exam'
                  textDiagnosis={this.state.prognostic?.textDiagnosis}
                />}
            </Row>
            {
              (inWaitingData)
                ? <ExamResult
                  time={this.state.time}
                  sampleIdCtime={this.state.sampleIdCtime}
                  sampleIdMtime={this.state.sampleIdMtime}
                  nameDeviceObj={this.state.nameDeviceObj}
                  prognostic={this.state.prognostic}
                  setValueService={this.setValueService}
                  devices={this.state.devices}
                  setDeviceValue={this.setDeviceValue}
                  resultsExam={this.state.resultsExam}
                  examEditSetState={(data) => this.setState(data)}
                  examEditState={this.state}
                />
                : <Fragment className='loading'>
                  <Spinner color="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <Spinner color="secondary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <Spinner color="success">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <Spinner color="danger">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Fragment>
            }
          </Col>
          <Col sm="4" className="content-right">
            <div ref={this.myRef}>
              <PatientList
                inWaitingData={inWaitingData}
                examEditState={this.state}
                examEditSetState={(data) => this.setState(data)}
                selectedJob={this.state.selectedJob}
                order_id={this.state.order_id}
                titleOfList={this.state.titleWaitForExam}
                onSelectJobStep={(jobStep) => this.onSelectJobRunning(jobStep)}
                location_id={location_id}
                action={this.readyJobListAction}
                type={SERVICE_TYPE.TEST}
                mode="exam"
                selectTypeStatusTest={this.selectTypeStatusTest}
              />
            </div>
            <Row className="btn-Comfirm end" style={{ marginTop: "10px" }}>
              <Col sm="12">
                {
                  (inWaitingData && nameDevice.length && (activeTab === '3' || activeTab === '1'))
                    ? <Button outline color="primary"
                      onClick={() => {
                        this.printBarcode()
                      }}
                    >
                      Lấy mẫu
                    </Button>
                    : ""
                }
                {" "}
                <Modal isOpen={this.state.showBarcode} >
                  <ModalHeader>
                    Lịch sử Khám
                  </ModalHeader>
                  <ModalBody>
                  </ModalBody>
                  <ModalFooter><Button>Close</Button></ModalFooter>
                </Modal>

                {
                 (inWaitingData && (activeTab === '2' || activeTab === '3'))
                    ? <Button  color="primary" onClick={() => {
                      this.handleUpdateResult()
                      this.handleConfirm("Bạn chắc chắn muốn cập nhật kết quả?")
                      this.handleResetForm()
                    }}
                    >
                      Gửi kết quả
                    </Button>
                    : ""
                }
              </Col>
            </Row>
          </Col>

        </Row>

        <Row>
          <div >
            <ExamResultPaper1
              time={this.state.time}
              sampleID={this.state.sampleID}
              sampleIdMtime={this.state.sampleIdMtime}
              sampleIdCtime={this.state.sampleIdCtime}
              userGetSample={this.state.userName}
              sendReq={this.state.sendReq}
              examEditSetState={(data) => this.setState(data)}
              examEditState={this.state}
              setDeviceValue={this.setDeviceValue}
              devices={this.state.devices}
              nameDeviceObj={this.state.nameDeviceObj}
              prognostic={this.state.prognostic}
              setValueService={this.setValueService}
              style={this.state.printResult}
              selectedJobStepRunning={this.state.selectedJobStepRunning}
              ctime={this.state.ctime}
              subclinical={this.state.subclinical}
              resultsExam={this.state.resultsExam}
              customer={this.state.selectecPatientReady}
            />
          </div>
        </Row>
        <PrintBarcode
          TestId={this.state.TestId}
          nameDevice={this.state.nameDevice}
          cm_name={this.state.selectecPatientReady?.full_name}
        ></PrintBarcode>
        <ModalConfirm
          message={this.state.modalConfirm.message}
          answer={this.handleUpdateResult}
        />
      </div>
    )
  }
}

export default ExamEdit;