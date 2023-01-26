import React from "react";
import { Form, ModalNoti } from "../../../../../Shared";
import DoctorServices from "../../../Shared/DoctorService";
import PrintDiagnostic from "./PrintDiagnostic";
import Select from 'react-select';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Table,
} from "reactstrap";
import PaperResultUltra from "../../../../Ultrasound/Components/PaperResultUltrasound/PaperResultUltrasound";
import { STEP_TYPE, STATUS, LOCATION_TYPE, POLICY_CODE } from "../../../../../Constances/const";
import SharedService from "../../../../../Shared/Services/SharedService";
import { Microscope } from "../../../../../Shared";
import XrayResultPrint from "../../../../X-ray/components/XrayResultPrint/XrayResultPrint";
import EntResultPrint from "../../../../Endoscopic/components/EntResultPrint/EntResultPrint";
import ResultsExam from "../ResultExam/ResultsExam";
import { Util } from "../../../../../Helper/Util"

class Diagnostic extends Form {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: "",
      results: {},
      locsByService: [],
      listSelectedService: [],
      servicesList: [],
      selectedService: -1,
      assignedServices: [],
      examServiceList: [],
      emergencyList: [],
      entServiceList: [],
      xrayServiceList: [],
      ultraSoundServiceList: [],
      totalPrice: 0,
      totalOrigin: 0,
      testResultList: [],
      selectedTestResult: {},
      orderCode: [],
      message: "",
      show: false,
      stt: "1",
      textDiagnosis: "",
      showPrint: false,
      showComfirm: false,
      policy: {}
    };

  }

  resetFrom = () => {
    this.setState({
      emergencyList: [],
      examServiceList: [],
      entServiceList: [],
      xrayServiceList: [],
      ultraSoundServiceList: [],
    })
  }

  componentDidUpdate = (preProps) => {
    if (preProps.job.id !== this.props.job.id &&
      this.props.job &&
      this.props.job.steps &&
      this.props.job.steps.length
    ) {
      let textDiagnosis = this.props.job.state.textDiagnosis;
      let stepResultList = this.props.job.steps.filter(s => s.type === STEP_TYPE.TEST && s.status !== STEP_TYPE.CANCEL);
      let testResultList = stepResultList.filter(s => s.order.items.length > 0)
      for (let i = 0; i < testResultList.length; i++) {
        let cusList2 = testResultList[i].order.items.filter(eb => {
          return eb.quantity != 0
        })
        if (cusList2.length == 0) {
          testResultList.splice(i, 1)
          i--
        }
      }
      let { job } = this.props;
      let id_policy = job?.args?.service_policy_id;
      if (id_policy) {
        DoctorServices.getServicePolicy(id_policy).then(res => {
          // if (res.data.code === POLICY_CODE.KL3D) { }
          // if ([POLICY_CODE.KL3D, POLICY_CODE.KDV].includes(res.data.code)) { 
          //   console.log(res.data)
          // }
          // else {
          //   this.setState({
          //     policy: res.data.discount
          //   })
          // }
          this.setState({
            policy : res.data.discount
          })
        }).catch(err => {
          console.log(err);
        })
      }
      this.setState({
        testResultList, textDiagnosis, assignedServices: [],
        totalPrice: 0,
        totalOrigin: 0,
      });
      testResultList.map(t => {
        this.props.resultList.forEach(r => {
          if (t.type === STEP_TYPE.TEST && t.status === STATUS.DONE && r.orderId === t.order_id) t.seen = r.seen;
        })
      });
      this.resetFrom()
    }
  }

  onChangeSearch = (e) => {
    this.setState({
      txtSearch: e.target.value,
    });
  };

  filter = (array, value, key) => {
    return array.filter((a) => Object.keys(a).some((k) => a[k] === value));
  };

  onDelete = (diagnostic) => {
    let { assignedServices, policy, totalPrice } = this.state;
    let discount = 0;
    Object.entries(policy).map(el => {
      if (diagnostic.type == el[0]) {
        discount = el[1]
      }
    })
    assignedServices.splice(assignedServices.findIndex((e) => e.value === diagnostic.value), 1);
    this.setState({
      assignedServices,
      totalPrice: (totalPrice - (Math.ceil(diagnostic.price_origin * (1 - discount) * 0.001)) * 1000),
      totalOrigin: assignedServices.reduce((a, b) => a + b.price_origin, 0)
    });
  };

  onSubmitDiagnostic = () => {
    let { assignedServices, examServiceList, entServiceList, xrayServiceList, emergencyList, ultraSoundServiceList } = this.state;
    DoctorServices.updateJobStep({ id: this.props.stepId, status: STATUS.RUNNING }).then(res => {
      this.props.onRefresh();
    }).catch(err => console.log(err))
    assignedServices.map(el => {
      if (el.location.type === LOCATION_TYPE.EMERGENCY) {
        emergencyList.push(el)
        this.setState({
          emergencyList
        })
      }
      if (el.location.type === LOCATION_TYPE.TESTING) {
        examServiceList.push(el)
        this.setState({
          examServiceList
        })
      }
      if (el.location.type === LOCATION_TYPE.XRAY) {
        xrayServiceList.push(el)
        this.setState({
          xrayServiceList
        })
      }
      if (el.location.type === LOCATION_TYPE.ENT) {
        entServiceList.push(el)
        this.setState({
          entServiceList
        })
      }
      if (el.location.type === LOCATION_TYPE.ULTRASOUND) {
        ultraSoundServiceList.push(el)
        this.setState({
          ultraSoundServiceList
        })
      }
    })

    let emergencyLoc = emergencyList.length > 0 ? emergencyList[0].location_id : " ";
    let examLoc = examServiceList.length > 0 ? examServiceList[0].location_id : " ";
    let entLoc = entServiceList.length > 0 ? entServiceList[0].location_id : " ";
    let xrayLoc = xrayServiceList.length > 0 ? xrayServiceList[0].location_id : " ";
    let ultraLoc = ultraSoundServiceList.length > 0 ? ultraSoundServiceList[0].location_id : " ";
    let promises = [];
    let promisesResult = [];
    if (examServiceList.length > 0) {
      let addJobStepExam = DoctorServices.addJobStep({
        job_id: this.props.job.id,
        location_id: examLoc,
        type: STEP_TYPE.TEST,
        items: examServiceList.map(el => ({
          ref: 'service',
          ref_id: el.value,
          quantity: '1'
        }))
      })
      promises.push(addJobStepExam)
      promisesResult.push({ "name": "jobStepExam" })
    }
    if (emergencyList.length > 0) {
      let addJobStepEmer = DoctorServices.addJobStep({
        job_id: this.props.job.id,
        location_id: emergencyLoc,
        type: STEP_TYPE.TEST,
        items: emergencyList.map(el => ({
          ref: 'service',
          ref_id: el.value,
          quantity: '1'
        }))
      })
      promises.push(addJobStepEmer)
      promisesResult.push({ "name": "jobStepEmer" })
    }
    if (entServiceList.length > 0) {
      let addJobStepEnt = DoctorServices.addJobStep({
        job_id: this.props.job.id,
        location_id: entLoc,
        type: STEP_TYPE.TEST,
        items: entServiceList.map(el => ({
          ref: 'service',
          ref_id: el.value,
          quantity: '1'
        }))
      })
      promises.push(addJobStepEnt)
      promisesResult.push({ "name": "jobStepEnt" })
    }
    if (xrayServiceList.length > 0) {
      let addJobStepXray = DoctorServices.addJobStep({
        job_id: this.props.job.id,
        location_id: xrayLoc,
        type: STEP_TYPE.TEST,
        items: xrayServiceList.map(el => ({
          ref: 'service',
          ref_id: el.value,
          quantity: '1'
        }))
      })
      promises.push(addJobStepXray)
      promisesResult.push({ "name": "jobStepXray" })
    }
    if (ultraSoundServiceList.length > 0) {
      let addJobStepUltraSound = DoctorServices.addJobStep({
        job_id: this.props.job.id,
        location_id: ultraLoc,
        type: STEP_TYPE.TEST,
        items: ultraSoundServiceList.map(el => ({
          ref: 'service',
          ref_id: el.value,
          quantity: '1'
        }))
      })
      promises.push(addJobStepUltraSound)
      promisesResult.push({ "name": "jobStepUtralsound" })
    }
    Promise.all(promises).then(arr => {
      this.resetFrom()
      this.setState({
        show: true,
        promisesResult,
        message: "Yêu cầu đã được gửi đi thành công",
      });
    }).catch(err => {
      console.log(err);
      this.setState({
        message: "Có lỗi xảy ra, xin vui lòng thử lại!",
      });
    })
  };

  closeNotice = () => {
    this.setState((state) => ({
      ...state,
      message: "",
    }));
  };

  onSelectSevice = (ev) => {
    let { assignedServices, servicesList, selectedService, policy, totalPrice } = this.state;
    let discount = 0;
    Object.entries(policy).map(el => {
      if (ev.type == el[0]) {
        discount = el[1]
      }
    })
    
    DoctorServices.getLocationsByService(ev.value).then(res => {
      assignedServices.map(el => {
        if (ev.value === el.value) {
          this.setState({
            message: "Đã có dịch vụ"
          })
          this.onDelete(ev)
        }
      })
      if (res.data.length == 1) {
        this.setState({
          locsByService: res.data[0],
        })
        let service = ev;
        console.log("service", ev)
        service.location_id = this.state.locsByService.id;
        service.location = this.state.locsByService;
        assignedServices.push(service);
        servicesList.splice(this.state.selectedService, 1);
        // console.log(assignedServices, "services")
        // console.log(discount, "discount")
        this.setState({
          servicesList,
          assignedServices,
          selectedService,
          totalPrice : assignedServices.reduce((a,b)=> (a + (Math.ceil(b.price_origin * (1 - discount) * 0.001)) * 1000) ,0),
          // totalPrice: totalPrice + (Math.ceil(ev.price_origin * (1 - discount) * 0.001)) * 1000,
          totalOrigin: assignedServices.reduce((a, b) => a + b.price_origin, 0)
        })
      }
      else {
        this.setState({
          locsByService: res.data
        })
      }
      
    }).catch(err => {
      console.log(err);
      this.setState((state) => ({
        message: "Có lỗi, xin vui lòng thử lại sau",
      }));
    })

  }

  onSelectLocService = (locId) => {
    let { selectedService, assignedServices, locsByService } = this.state;
    let servicesList = this.props.servicesList
    let service = servicesList[selectedService];
    service.location_id = locId;
    service.location = locsByService.find(l => l.id == locId);
    assignedServices.push(service);
    servicesList.splice(selectedService, 1);
    this.setState({
      servicesList,
      assignedServices,
      selectedService: -1,
      locsByService: [],
      totalPrice: assignedServices.reduce((a, b) => a + b.price, 0),
      style: "block",
    });
  }

  onExamResultReiview = (testing, index) => {
    let testResultList = this.state.testResultList;
    this.props.resultList.map(r => {
      if (r.orderId === testing.order_id) r.seen = true;
    })
    testResultList[index].seen = true;
    let resultsExam = [];
    testing.results.map(el => {
      if (Object.keys(el).length > 1) {
        resultsExam.push(el)
      }
    })
    let showResult = null;
    let idPrint = "";
    let tabPrint = 1;
    if (testing.location) {
      if (testing.location.type === LOCATION_TYPE.TESTING) {
        tabPrint = 1
        showResult = <ResultsExam
          resultsExam={resultsExam}
          tab="1"
        ></ResultsExam>
      }
      if (testing.location.type === LOCATION_TYPE.ENT) {
        tabPrint = 2
        showResult = <EntResultPrint
          upload={testing.upload}
          selectedJobStepRunning={testing}
          entResult={testing}
          diagnosis={this.state.textDiagnosis}
          tab={"2"}
        ></EntResultPrint>
        idPrint = "printEnt"
      }
      if (testing.location.type === LOCATION_TYPE.XRAY) {
        tabPrint = 2
        showResult = <XrayResultPrint
          selectedJobStepRunning={testing}
          xrayResult={testing}
          diagnosis={this.state.textDiagnosis}
        ></XrayResultPrint>
        idPrint = "printXray"
      }
      if (testing.location.type === LOCATION_TYPE.ULTRASOUND) {
        tabPrint = 2
        showResult = <PaperResultUltra
          tab={"2"}
          upload={testing.upload}
          selectedJobStepRunning={testing}
          ultraResult={testing}
          diagnosis={this.state.textDiagnosis}
        ></PaperResultUltra>
        idPrint = "printUltra"
      }
    }
    this.setState({
      selectedTestResult: testing,
      showResult,
      idPrint,
      testResultList,
      resultsExam,
      tabPrint
    })
  }
  Print = async (id) => {
    await SharedService.print(id);
    await this.setState({
      show: false,
      promisesResult: [],
      xrayServiceList: [],
      examServiceList: [],
      entServiceList: [],
      ultraSoundServiceList: [],
      selectedTestResult: {}
    })
  }

  showFromPrint = () => {
    if (this.state.assignedServices.length > 0) {
      this.setState({
        showPrint: true
      })
    }
    else {
      this.setState({
        message: "Chưa có dịch vụ."
      })
    }

  }
  closeFromPrint = () => {
    this.setState({
      showPrint: false,
      showComfirm: false
    })
  }
  submitPrint = () => {
    this.onSubmitDiagnostic();
    this.Print("print-diag");
    this.setState({
      showPrint: false,
    })
  }
  render() {
    let { servicesList, job } = this.props;
    let { txtSearch, showPrint, showComfirm, showResult,
      idPrint, totalOrigin, selectedService, locsByService,
      promisesResult, assignedServices, totalPrice, testResultList,
      selectedTestResult, stt, show, policy,
      examServiceList, entServiceList, xrayServiceList, ultraSoundServiceList } = this.state;
    if (txtSearch) {
      servicesList = servicesList.filter((service) => {
        return service.name.toLowerCase().indexOf(txtSearch) !== -1;
      });
    }
    let servicesExam = servicesList.map((ev, index) => (
      {
        value: ev.id,
        label: ev.name,
        code: ev.code,
        price: ev.price,
        price_origin: ev.origin_price,
        type: ev.type
      }
    ))
    let addArr = [];
    servicesExam.map((ev, index) => {
      assignedServices.map((el, i) => {
        if(ev.code === el.code){
          addArr.push(el.code)  
        }
      })
    })
    const customStyles = {
      option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#fff' : (addArr.indexOf(state.data.code) > -1 ? "#fff" : ""),
        backgroundColor : (addArr.indexOf(state.data.code) > -1 ? "#3580ee" : ""),
        fontSize: "15px",
        ':hover' : {
          backgroundColor: "#7aa9dc"
        }
      }),
    }
    return (
      <div className="customCard Diagnostic" style={{ 'height': '100%'}} id="Diagnostic">
        <Col className="choice-diag">
          <p className="title-card mb-0"><Microscope xmlns="http://www.w3.org/2000/svg" className="flaticon-icons" fill="#28b76b" /> Loại xét nghiệm</p>
        </Col>
        <Col className="choice-diag mb-2">
          <Select
            styles={customStyles}
            placeholder="Chọn dịch vụ xét nghiệm"
            options={servicesExam}
            onChange={(ev) => this.onSelectSevice(ev)}
            id="service_id"
            inputId = "serviceTest"
            required
          ></Select>
        </Col>
        <Col md={12} className="table-responsive min-h-62 list-diag">
          <p className="title-card"><span className="material-icons">playlist_add</span> Yêu cầu xét nghiệm</p>
          <Table size="sm" className="table table-head-fixed table-bordered">
            <thead>
              <tr>
                <th className="list-diag-index" >#</th>
                <th className="list-diag-name">Tên</th>
                <th className="list-diag-room">Phòng</th>
                <th className="list-diag-quantity">Số lượng</th>
                <th className="list-diag-price">Giá tiền</th>
                <th className="list-diag-delete">Tùy chọn</th>
              </tr>
            </thead>

            {testResultList.length ? (
              testResultList.map((testing, index) => {
                return (
                  <tbody className="body-half-screen">
                    <tr onClick={() => this.onExamResultReiview(testing, index)} className={`pointer ${testing.seen === false ? 'notiResult' : null}`} key={testing.id}>
                      <td className="list-diag-index" >{index + 1}</td>
                      <td className="list-diag-name" >{testing.order.items.filter(e => e.quantity > 0).map(el => el.ref_value.name).splice(0, 3).join(",")}</td>
                      <td className="list-diag-room" >{testing.location.name}</td>
                      <td className="list-diag-quantiy">1</td>
                      <td className="list-diag-price" >{Util.formatPrice(testing.order.total)}</td>
                      <td className="list-diag-delete" ></td>
                    </tr>
                  </tbody>
                )
              })
            ) : null}

            {assignedServices ? (
              assignedServices.map((diagnostic, index) => {
                return (
                  <tbody className="body-half-screen">
                    <tr className="pointer" key={diagnostic.id}>
                      <td className="list-diag-index">{testResultList.length + index + 1}</td>
                      <td className="list-diag-name">{diagnostic.label}</td>
                      <td className="list-diag-room">{diagnostic.location.name}</td>
                      <td className="list-diag-quantiy">1</td>
                      <td className="list-diag-price">{Util.formatPrice(diagnostic.price_origin)}</td>
                      <td onClick={() => this.onDelete(diagnostic)} className="list-diag-delete">Xóa</td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tbody className="body-half-screen">
                <tr>
                  <td className="list-diag-index">---</td>
                  <td className="list-diag-id">---</td>
                  <td className="list-diag-name">---</td>
                  <td className="list-diag-room">---</td>
                  <td className="list-diag-quantiy"></td>
                  <td className="list-diag-delete">---</td>
                </tr>
              </tbody>
            )}

          </Table>
        </Col>
        <Row className="pr-15 pl-15">
          <Col sm={8}>
            <p className="title-card"><span className="material-icons md-18">monetization_on</span>
              Tổng tiền: {new Intl.NumberFormat('de-DE').format((Math.ceil(totalPrice * 0.001)) * 1000)}đ
            </p>
            <p className="title-card"><span className="material-icons md-18">monetization_on</span>
              Giá gốc: {new Intl.NumberFormat('de-DE').format(totalOrigin)}đ
            </p>
          </Col>
          <Col sm={4} className="btn-count-print end">
            <Button
              hidden={!job || !job.id}
              onClick={() => this.showFromPrint()}
            >Lưu</Button>
          </Col>
        </Row>
        <Modal isOpen={selectedService >= 0}>
          <ModalHeader>Thông tin loại xét nghiệm</ModalHeader>
          <ModalBody>
            <div className="info-diagnostic">
              <div> Tên loại xét nghiệm: {servicesList[selectedService]?.name}</div>
              <Row className="selectRoom" >
                {locsByService.length ? locsByService.map(lo => {
                  return (<Col className="item" key={lo.id} sm={6}>
                    <Button onClick={() => this.onSelectLocService(lo.id)}>{lo.name}</Button>
                  </Col>)
                }) : null}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => this.setState({ selectedService: -1 })}>Hủy</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={selectedTestResult && selectedTestResult.id}>
          <ModalBody>
            <Row>
              <Col sm="11"><h1>Kết quả xét nghiệm</h1></Col>
              <Col className="end"> <Button onClick={() => this.setState({ selectedTestResult: {} })} color="danger">X</Button></Col>
            </Row>
            <Row>
              <Col>
                {showResult}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button hidden={this.state.tabPrint == 1} onClick={() => this.Print(idPrint)

            }>In kết quả</Button>
            <Button color="danger" onClick={() => this.setState({ selectedTestResult: {} })}>Đóng</Button>
          </ModalFooter>
        </Modal>
        {/* ==========================================Modal In=============================================== */}
        <Modal isOpen={showPrint}>
          <ModalBody>
            <Row>
              <Col sm="11"></Col>
              <Col className="end"> <Button onClick={() => this.closeFromPrint()} color="danger">X</Button></Col>
            </Row>
            <PrintDiagnostic
              job={this.props.job}
              assignedServices={assignedServices}
              textDiagnosis={this.state.textDiagnosis}
              diagnosis={this.props.textDiagnosis}
              policy={this.state.policy}
              cusData={this.props.cusData}></PrintDiagnostic>
          </ModalBody>
          <ModalFooter >
            <Button color="danger" onClick={() => this.closeFromPrint()}>Hủy</Button>{" "}
            <Button onClick={() => this.submitPrint()}>In</Button>
          </ModalFooter>
        </Modal>
        <ModalNoti message={this.state.message} done={() => this.closeNotice()}></ModalNoti>
      </div>
    );
  }
}

export default Diagnostic;
