import React, { Component, Fragment } from "react";
import { ShareService } from "../../../../Shared";
import { Table, Input, Col, Row, ModalBody, Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { convertToStrDate, } from "../../../Reception/Shared/Util";
import { SERVICE_TYPE, LOCATION_TYPE, addressConvert, STEP_TYPE, PRODUCT_UNIT } from "../../../../Constances/const";
import ResultsExam from "../JobDoctor/ResultExam/ResultsExam";
import EntResultPrint from "../../../Endoscopic/components/EntResultPrint/EntResultPrint";
import XrayResultPrint from "../../../X-ray/components/XrayResultPrint/XrayResultPrint";
import PaperResultUltra from "../../../Ultrasound/Components/PaperResultUltrasound/PaperResultUltrasound";
import DoctorServices from "../../Shared/DoctorService"
import { Form, ModalNoti } from "../../../../Shared";
import { Util } from '../../../../Helper/Util';
import PrintResultExam from "../JobDoctor/PrintResultDoctor/PrintResultExam";
import { PrintPreHis } from "../JobDoctor/PrintResultDoctor/PrintPreHis";
import ReactToPrint from "react-to-print";
import ResultExamShowHis from "./ShowResultHis/ResultExamShowHis";
import DrugShowHis from "./ShowResultHis/DrugShowHis";
class HistoryCmByDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobList: [],
            codeCmSearch: '',
            cmData: {},
            stateCm: {},
            allergyCm: "",
            setShowCm: false,
            setShowResult: false,
            titleRusult: '',
            ctimeResult: "",
            selectedTestResult: {},
            job: {},
            showJob: false,
            doctorInfor: [],
            selectedTestResultCheck: {},
            stateCmCheck: {},
        };
    }
    componentDidMount = () => {
        ShareService.getDoctor().then(res => {
            this.setState({
                doctorInfor: res.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
    componentDidUpdate = (preProps) => {
        const { data } = this.props;
        if (preProps.data !== data) {
            const data = this.props.data;
            ShareService.getJobByCustomerId(data?.id).then(res => {
                this.setState({
                    jobList: res.data
                })
            }).catch(err => {
                console.log(err);
            })
            
        }
    }
    setJobResult = (job, state, allergy) => {
        this.setState({
            job: job,
            showJob: true,
            cmData: this.props.data,
            stateCm: state,
            allergyCm: allergy,
        })
        let stepBuy = job.steps?.find(s => s.type === STEP_TYPE.BUY)
        this.showResult(stepBuy, state)
    }
    showResultExam = (step, state, allergy, ctime) => {
        let resultsExam = [];
        step.results.map(el => {
            if (Object.keys(el).length > 1) {
                resultsExam.push(el)
            }
        })
        let showResult = null;
        let idPrint = "";
        let tabPrint = 1;
        let { titleRusult } = this.state;
        if (step.location) {
            if (step.type == STEP_TYPE.BUY) {
                titleRusult = "Đơn thuốc chỉ định";
                tabPrint = 3;
            }
            if (step.location.type === LOCATION_TYPE.EXAMINATION) {
                titleRusult = "Kết quả khám";
            }
            if (step.location.type === LOCATION_TYPE.TESTING) {
                tabPrint = 2;
                showResult = <ResultsExam
                    resultsExam={resultsExam}
                    tab="1"
                ></ResultsExam>;
                idPrint = "print_Result";
                titleRusult = "Kết quả xét nghiệm";
            }
            if (step.location.type === LOCATION_TYPE.ENT) {
                tabPrint = 2;
                showResult = <EntResultPrint
                    upload={step.upload}
                    selectedJobStepRunning={step}
                    entResult={step}
                    diagnosis={this.state.stateCm.textDiagnosis}
                    tab={"2"}
                ></EntResultPrint>;
                idPrint = "printEnt";
                titleRusult = "Kết quả nội soi";
            }
            if (step.location.type === LOCATION_TYPE.XRAY) {
                tabPrint = 2
                showResult = <XrayResultPrint
                    selectedJobStepRunning={step}
                    xrayResult={step}
                    diagnosis={this.state.stateCm.textDiagnosis}
                    tab={"2"}
                ></XrayResultPrint>
                idPrint = "printXray";
                titleRusult = "Kết quả X-quang";
            }
            if (step.location.type === LOCATION_TYPE.ULTRASOUND) {
                tabPrint = 2
                showResult = <PaperResultUltra
                    tab={"2"}
                    upload={step.upload}
                    selectedJobStepRunning={step}
                    ultraResult={step}
                    diagnosis={this.state.stateCm.textDiagnosis}
                ></PaperResultUltra>
                idPrint = "printUltra";
                titleRusult = "Kết quả siêu âm";
            }
        }
        this.setState({
            selectedTestResult: step,
            showResult,
            idPrint,
            resultsExam,
            tabPrint,
            stateCm: state,
            allergyCm: allergy,
            setShowResult: true,
            titleRusult,
            ctimeResult: ctime,
        })
    }
    showResult = (step, state) => {
        this.setState({
            selectedTestResultCheck: step,
            stateCmCheck: state,
        })
    }
    onChangeCmCode = (e) => {
        const { value } = e.target;
        this.setState({
            codeCmSearch: value
        })
    }
    submitSearchJobListCm = () => {
        const { codeCmSearch } = this.state
        if (codeCmSearch.length == 12) {
            DoctorServices.getCustomerByCode(codeCmSearch).then(res => {
                this.setState({
                    cmData: res.data,
                    setShowCm: true
                })
            }).catch(err => {
                console.log(err);
                this.resetFrom()
                this.setState({
                    message: "Mã bệnh nhân không chính xác",
                    codeCmSearch: ""
                })
            })
        }
        else {
            this.resetFrom()
            this.setState({
                message: "Hãy nhập đủ 12 ký tự"
            })
        }
    }
    closeNotice = () => {
        this.setState((state) => ({
            ...state,
            message: "",
        }));
    };
    searchJoblistCmById = (e) => {
        ShareService.getJobByCustomerId(e).then(res => {
            this.setState({
                jobList: res.data,
                setShowCm: false,
                codeCmSearch: ""
            })
        }).catch(err => {
            this.resetFrom()
            console.log(err);
        })
    }
    printHistory = () => {
        let { idPrint } = this.state;
        ShareService.print(idPrint)
    }
    resetFrom = () => {
        this.setState({
            codeCmSearch: "",
            cmData: {},
            selectedTestResult: {},
        })
    }
    setClose = () => {
        this.setState({
            setShowCm: false,
           
            showJob: false
        })
    }  
    setCloseShowResult=()=>{
        this.setState({
            setShowResult: false,
        })
    }
    
    examResultShow() {
        const { stateCm, allergyCm } = this.state;
        return (
            <div className="showReults">
                <Row className="vital_Signs">
                    <p className="title-card"><span className="material-icons">create</span> Dấu hiệu sống</p>
                    <Col sm="7" className="info">
                        <Row >
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Nhiệt độ:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            value={stateCm?.subclinical?.temp}
                                            disabled
                                            className="temp"
                                        ></Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1"> °C</p></Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Huyết áp:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            className="blood"
                                            value={stateCm?.subclinical?.blood}
                                            disabled
                                        >
                                        </Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">mmHg</p></Col>

                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Cân nặng:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            className="weight"
                                            value={stateCm?.subclinical?.weight}
                                            disabled
                                        ></Input>

                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">KG</p></Col>

                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Chiều cao:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            className="height"
                                            value={stateCm?.subclinical?.height}
                                            disabled
                                        ></Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">CM</p></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col sm="2" className="m-0 p-0">
                                <p className="text-danger"><b>Dị ứng:</b></p>
                            </Col>
                            <Col sm="10" className="m-0 p-0">
                                <textarea
                                    className="allergy"
                                    value={allergyCm}
                                    disabled
                                ></textarea>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p className="title-card"><span className="material-icons">playlist_add_check</span>Triệu chứng</p>
                <Row className="stateCmInfo">
                    <Col>
                        <textarea
                            className="textSymptom"
                            value={stateCm.textSymptom}
                            disabled
                        ></textarea>
                    </Col>
                </Row>
                <p className="title-card"><span className="material-icons">playlist_add_check</span>Chẩn đoán</p>
                <Row className="stateCmInfo">
                    <Col>
                        <textarea
                            className="textSymptom"
                            value={stateCm.textDiagnosis}
                            disabled
                        ></textarea>
                    </Col>
                </Row>

            </div>
        )
    }
    productResultShow = () => {
        const { selectedTestResult, stateCm } = this.state;
        return (
            <div>
                <div hidden>
                    <PrintPreHis
                        ref={(el) => (this.componentRef = el)}
                        cusData={this.state.cmData}
                        jobStep={selectedTestResult}
                        diagnosis={stateCm.textDiagnosis}
                    >
                    </PrintPreHis>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Thuốc</th>
                            <th>Hoạt chất</th>
                            <th>Đơn vị</th>
                            <th>Số lượng</th>
                            <th>Cách dùng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedTestResult?.order?.items?.map((el, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{el.ref_value?.name}</td>
                                    <td>{el.ref_value?.parts.map(e => e.name).splice(0, 2).join(",")}</td>
                                    <td>
                                        {PRODUCT_UNIT.map(u => {
                                            if (u.code === el.ref_value?.unit)
                                                return <span>{u.label}</span>
                                        })}</td>
                                    <td>{el.quantity}</td>
                                    <td>{el.attrs?.instruction}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
    render() {
        let { jobList, showResult, idPrint, tabPrint, ctimeResult,
            codeCmSearch, cmData, setShowCm, setShowResult, titleRusult, stateCm, selectedTestResult, showJob, job } = this.state;
        let customerContact = cmData?.contacts ? cmData.contacts[0] : "";
        let { mode } = this.props;
        return (
            <div className="HistoryCmByDoctor m-3">
                {mode == "doctor" ?
                    <>
                        <div className="min-h-30 df-h-30 table-responsive">
                            <div className="title-card m-13">
                                <span>Lịch sử khám</span>
                            </div>
                            <Table className="mt-24 table_history_mode_doctor table table-head-fixed table-bordered">
                                <thead>
                                    <tr>
                                        <th className="index_his">STT</th>
                                        <th className="date_his">Ngày khám</th>
                                        <th className="name_service">Tên dịch vụ</th>
                                        <th className="option_his">Tùy chọn</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jobList.map((el, index) => {
                                            return (
                                                <tr className="table_body_his">
                                                    <td>{index + 1}</td>
                                                    <td className="text-center">{convertToStrDate(el.date)}</td>
                                                    <td>{el.steps.map(e => e.order.items.map(ev => ev.ref_value?.name).splice(0, 2).join(",")).splice(0, 3).join(",")}...</td>
                                                    <td><Button onClick={() => this.setJobResult(el ,el.state, el.ref_value.allergy)}>Chi tiết</Button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>

                    </>
                    :
                    <>
                        <Row className="customCard">
                            <Col sm="3"><h2 className="title-card-lg">Lịch sử khám</h2></Col>
                            <Col>
                                <Row>
                                    <Col sm="9">
                                        <Input
                                            size="lf"
                                            value={codeCmSearch}
                                            placeholder="Nhập mã bệnh nhân"
                                            onChange={(e) => this.onChangeCmCode(e)}
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="1"

                                        ></Input>
                                    </Col>
                                    <Col sm="3">
                                        <Button
                                            size="lg"
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="2"
                                            onClick={() => this.submitSearchJobListCm()}
                                        >Tìm kiếm</Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>
                        <div className="customCard table_history_div  min-h-60 df-h-83 table-responsive">
                            <Table className="table_history table table-head-fixed table-bordered" bordered >
                                <thead>
                                    <tr className="title_head_his">
                                        <th className="index_his">Stt</th>
                                        <th className="name_cus">Họ và tên</th>
                                        <th className="date_his">Ngày khám</th>
                                        <th className="service_his">Dịch vụ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        jobList.map((el, index) => {
                                            return (
                                                <tr className="table_body_his">
                                                    <td>{index + 1}</td>
                                                    <td className="text-center">{el.ref_value.full_name}</td>
                                                    <td className="text-center">{convertToStrDate(el.date)}</td>
                                                    {el.steps.map((e, indexSub) => {
                                                        return (
                                                            <tr className="result_his">
                                                                <td className="name_result_his">
                                                                    {e.order.items.map(ev => ev.ref_value?.name).join(',')}
                                                                </td>
                                                                <td className="btn_result_his text-center">
                                                                    {
                                                                        e.results.length > 0 || e.type == SERVICE_TYPE.EXAM || e.type == STEP_TYPE.BUY
                                                                            ?
                                                                            <Button onClick={() => this.showResultExam(e, el.state, el.ref_value.allergy, el.date)}>Chi tiết</Button>
                                                                            :
                                                                            "Chua có kết quả"
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>



                    </>
                }
                <Modal isOpen={setShowCm}>
                    <ModalBody>
                        <Row>
                            <Col><h2 className="title-card-lg">Danh sách bệnh nhân</h2></Col>
                            <Col className="end"><Button color="danger" size="sm" onClick={() => this.setClose()}>X</Button></Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Họ tên</th>
                                    <th>Ngày sinh</th>
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={() => this.searchJoblistCmById(cmData.id)}>
                                    <td>{cmData.full_name}</td>
                                    <td>{convertToStrDate(cmData.birthday)}</td>
                                    <td>{cmData.gender == "male" ? "Nam" : "Nữ"}</td>
                                    <td>{customerContact?.phone}</td>
                                    <td>{addressConvert(customerContact.address)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.setClose()}>Đóng</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={setShowResult} className="modalResults" style={{width: "43%"}}>
                    <ModalBody className="pb-0">
                        <Row className="mb-0">
                            <Col><h2 className="title-card-lg">{titleRusult}</h2></Col>
                            <Col className="end"><Button size="sm" color="danger" onClick={() => this.setCloseShowResult()}>X</Button></Col>
                        </Row>
                        {   selectedTestResult.type !== SERVICE_TYPE.TEST ?
                                selectedTestResult.type !== SERVICE_TYPE.EXAM ?
                                    this.productResultShow() :
                                    this.examResultShow() :
                            showResult
                        }
                    </ModalBody>
                    <ModalFooter>
                        {tabPrint !== 2 ? tabPrint !== 2 ?
                         selectedTestResult?.location?.type !== LOCATION_TYPE.EXAMINATION ?    
                            <ReactToPrint
                                trigger={() => <Button  color='primary'>In Lại</Button>}
                                content={() => this.componentRef}
                            /> : null : null : <Button onClick={() => this.printHistory()}>In lại</Button>}    {" "}
                        <Button color="danger" onClick={() => this.setCloseShowResult()}>Đóng</Button>
                    </ModalFooter>
                </Modal>
                <Modal fullscreen="xl" isOpen={showJob} className="modalResults">
                    <ModalBody>
                        <Row>
                            <Col xs="10"><h2 className="title-card-lg text-center">Lịch sử khám ngày {convertToStrDate(job.date)} của bệnh nhân {cmData.full_name}</h2></Col>
                            <Col xs="2" className="end"><Button size="sm" color="danger" onClick={() => this.setClose()}>x</Button></Col>
                        </Row>
                        <Table>
                            <thead>
                                <tr>
                                    <th  width = "33%" >Dấu hiệu sống</th>
                                    <th  width = "33%" >Dịch vụ</th> 
                                    <th  width = "34%">Đơn thuốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><ResultExamShowHis stateCm = {stateCm} allergyCm = {this.state.allergyCm} /></td>
                                    <td>
                                        {   
                                            job?.steps?.filter(e => ![STEP_TYPE.BUY, STEP_TYPE.EXAM ].includes(e.type))
                                                .map((e, indexSub) => {
                                                    return (
                                                        <>
                                                            <Row>
                                                                <Col xs="9">
                                                                    {e.order.items.map(ev => ev.ref_value.name).join(',')}  
                                                                </Col>
                                                                <Col xs="3">
                                                                    {
                                                                        e.results.length > 0 
                                                                        ?
                                                                            <Button onClick={() => this.showResultExam(e, job.state, job.ref_value.allergy, job.date)}>Chi Tiết</Button>
                                                                        :
                                                                            "Chưa có kết quả"
                                                                    } 
                                                                </Col>
                                                            </Row>
                                                        </>
                                                    ) 
                                                })
                                        }
                                    </td>
                                    <td>
                                        {
                                            job?.steps?.filter(e => ![STEP_TYPE.TEST, STEP_TYPE.EXAM ].includes(e.type))
                                                .map((e, indexSub) => {
                                                     
                                                    return job?.steps?.filter(e => ![STEP_TYPE.TEST, STEP_TYPE.EXAM ].includes(e.type)).length == 1 ?
                                                        <>
                                                            <h5>Bác sĩ kê đơn: {
                                                                this.state.doctorInfor.map( el => {
                                                                    if(el.id === e.created_by) {
                                                                        return el.full_name
                                                                    }
                                                                } )
                                                            }</h5>
                                                            <DrugShowHis item={e} />
                                                            <ReactToPrint
                                                                    onBeforeGetContent={()=> this.showResult(e, job.state, job.ref_value.allergy, job.date)}
                                                                    trigger={() => <Button  color='primary'>In Lại</Button>}
                                                                    content={() => this.componentRef}
                                                            />
                                                        </>
                                                        
                                                    :
                                                        <>
                                                            <Row>
                                                                <Col xs="9">
                                                                    { 
                                                                        e.order.items.map(ev => ev.ref_value.name).join(', ')
                                                                    }  
                                                                </Col>
                                                                <Col xs="3">
                                                                    {
                                                                        e.results.length > 0 || e.type == STEP_TYPE.BUY
                                                                        ?
                                                                            <Button onClick={() => this.showResultExam(e, job.state, job.ref_value.allergy, job.date)}>Chi Tiết</Button>
                                                                        :
                                                                            "Chưa có kết quả"
                                                                    } 
                                                                </Col>
                                                            </Row>
                                                        </>
                                                })
                                        }                    
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => this.setClose()}>Đóng</Button>
                    </ModalFooter>
                </Modal>
                <ModalNoti message={this.state.message} done={() => this.closeNotice()}></ModalNoti>
                <div hidden>
                    <PrintResultExam
                        cusData={this.state.cmData}
                        resultsExam={this.state.resultsExam}
                        tab="2"
                        idPrint={idPrint}
                        jobStep={selectedTestResult}
                        diagnosis={stateCm.textDiagnosis}
                        ctime={ctimeResult}
                    ></PrintResultExam>

                </div>
                <div hidden>
                    <PrintPreHis
                        ref={(el) => (this.componentRef = el)}
                        cusData={this.state.cmData} 
                        jobStep={this.state.selectedTestResultCheck}
                        diagnosis={this.state.stateCmCheck.textDiagnosis}
                    >
                    </PrintPreHis>
                </div>


            </div>
        )
    }
}
export default HistoryCmByDoctor;