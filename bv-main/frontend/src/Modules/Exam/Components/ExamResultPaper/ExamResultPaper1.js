import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "reactstrap";
import UA66print from "../ExamResultPaper/Device/UA66print";
import Testprint from "../ExamResultPaper/Device/Testprint";
import Otherprint from "../ExamResultPaper/Device/Otherprint";
import Immuneprint from "../ExamResultPaper/Device/Immuneprint";
import BC2800print from "../ExamResultPaper/Device/BC2800print";
import BS200Eprint from "../ExamResultPaper/Device/BS200Eprint";
import Barcode from "react-barcode";
import logo from '../../../../Asset/Img/logoPK.png';
const ExamResult = (props) => {
    const { style, resultsExam, selectedJobStepRunning, prognostic, textDiagnosis, sampleID,
        nameDeviceObj, devices = [], customer, setDeviceValue, sendReq, userGetSample, sampleIdMtime, sampleIdCtime, time } = props;
    const [display, setDisplay] = useState({})
    const [deviceBC2800, setDeviceBC2800] = useState()
    const [deviceIMMUNE, setDeviceIMMUNE] = useState()
    const [ctime, setCtime] = useState({})
    const [mtime, setMtime] = useState({})
    const [printOtherAndTest, setPrintOtherAndTest] = useState([])
    const [printDevices, setPrintDevices] = useState([])
    useEffect(() => {
        if (resultsExam && resultsExam.length > 0) {
            let findOtherAndTest = resultsExam.filter(e => {
                return e.device === 'Other' || e.device === 'Test'
            })
            setPrintOtherAndTest(findOtherAndTest)
            let resultDevices = resultsExam.filter(e => {
                return e.device === 'BC-2800' || e.device === 'BS-200E' || e.device === 'Immune' || e.device === 'UA-66'
            })
            setPrintDevices(resultDevices)
        }
    }, [resultsExam])
    useEffect(() => {
        devices.forEach(element => {
            if (element.name == 'BC-2800') {
                setDeviceBC2800(element)
            } else if (element.name == 'Immune') {
                setDeviceIMMUNE(element)
            }
        });
    }, [devices])
    useEffect(() => {
        if (Object.entries(selectedJobStepRunning).length > 0) {
            setCtime(new Date(selectedJobStepRunning.ctime).toLocaleString())
            setMtime(new Date(selectedJobStepRunning.mtime).toLocaleString())
        }
        if (style) {
            setDisplay(style)
        }
    }, [selectedJobStepRunning, style])
    const jobStep = selectedJobStepRunning || {};
    const order = jobStep.order || {};
    const current = new Date()
    let date = new Date(customer.birthday);
    let address = customer.contacts ? customer.contacts[0].address : {};
    const ward = address.ward ? `  -${address.ward}` : '';
    const district = address.district ? `-${address.district}` : '';
    const province = address.province ? `-${address.province}` : '';
    let phone = customer.contacts ? customer.contacts[0].phone : "";
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    return (
        <div className="border border-secondary font-print"
            style={{ display: display }}
        >
            <div id="printExam" className='printExamResult position-relative mt-3 printExam'>
                {printDevices && printDevices.length > 0 &&
                    <div className="resultDevice" style={{
                        height: "297mm",
                    }}>
                        {printDevices.map((e, index) => {
                            if (e.device)
                                return (
                                    <div className="absolute" style={{ height: "297mm" }} >
                                        <img className="images" src={logo} ></img>
                                        <Row style={{ marginBot: '0px' }}>
                                            <Col sm="8">
                                                <Row className="text-left m-0">
                                                    <Col sm="4">
                                                        <Row>
                                                            <img className="image" src={logo} height="90px"></img>
                                                        </Row>
                                                    </Col>
                                                    <Col sm="8">
                                                        <Row className="m-0 pkvd" >PHÒNG KHÁM ĐA KHOA VIỆT ĐOÀN</Row>
                                                        <Row className="m-0 pkvd" > Bách Môn,Việt Đoàn, Tiên Du, Bắc Ninh</Row>
                                                        <Row className="m-0 pkvd" >hotline: 0869.968.688</Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col className="end" sm="4">
                                                <Barcode fontSize="15px" value={customer.code} height="35px" />
                                            </Col>
                                        </Row>

                                        <div className="text-center m-0 ,resultDevice  dflex headers" >
                                            <b> KẾT QUẢ XÉT NGHIỆM</b>
                                        </div>
                                        <h5 className="text-center m-0  dflex" >
                                            <b>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()} {current.getHours()} giờ {current.getMinutes()} phút </b>
                                        </h5>
                                        <Row className="cusInfo">
                                            <Col className='asign-left'>
                                                Họ tên: <b><span className="text-uppercase font-weight-bold a">{customer.full_name}</span></b><br />
                                                <span className="a">Ngày sinh: {customer.birthday?.split('-').reverse().join('-')} </span>
                                                <span className="mr-3 ">Giới tính: {customer.gender ? customer.gender === "male" ? "Nam" : "Nữ" : null}</span><br></br>
                                                Số điện thoại: {phone} <br></br>
                                                Địa chỉ : {`${ward}${district}${province}`}<br></br>
                                                Phòng khoa : <b>KHOA XÉT NGHIỆM</b><br></br>
                                            </Col>
                                            <Col className='asign-right'>
                                                Người lấy mẫu : {userGetSample}   <br></br>
                                                Thời gian lấy mẫu: {ctime}  <br></br>
                                                Người nhận mẫu : {doctorInfo.full_name}<br></br>
                                                Chẩn đoán : <b>{(prognostic) ? prognostic.textDiagnosis : textDiagnosis}</b><br></br>
                                                Số CMT/CCCD:{customer.contacts[0]?.idnum}
                                            </Col>
                                        </Row>
                                        <div className="text-left text-center m-0 ,resultDevice">
                                            {e.device == "BS-200E" && <BS200Eprint deviceBC2800={deviceBC2800} device={e.device} result={e} />}
                                            {e.device == "Immune" && e.device == nameDeviceObj.IMMUNE && <Immuneprint
                                                deviceIMMUNE={deviceIMMUNE}
                                                show_form_input={false}
                                                setDeviceValue={setDeviceValue}
                                                device={e.device} result={e} />}
                                            {e.device == "BC-2800" && <BC2800print
                                                xscroll={false}
                                                show_form_input={false}
                                                deviceBC2800={deviceBC2800}
                                                setDeviceValue={setDeviceValue}
                                                device={e.device} result={e} />}
                                            {e.device == "UA-66" && <UA66print device={e.device} result={e} />}
                                        </div>
                                        <div className="d-flex footer mt-1">
                                            <Col sm={6} className="text-center mr-auto ml-5">
                                                <strong>Bác sĩ điều trị</strong><br></br>
                                                <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                                            </Col>
                                            <Col sm={6} className="text-center mr-auto ml-5">
                                                <strong>Phòng Xét Nghiệm</strong><br></br>
                                                <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                                                <b className="mt-5">{doctorInfo.full_name}</b>
                                            </Col>
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                }
                {printOtherAndTest && printOtherAndTest.length > 0 &&
                    <div className="absolute resultDevice background"
                    // style={{
                    //     height: "297mm",
                    //     backgroundImage: `url(${logo})`,
                    //     backgroundRepeat: 'no-repeat',
                    //     backgroundSize: 'cover',
                    //     backgroundPosition: 'center',
                    //     backgroundSize:'auto',
                    // }}
                    >
                        <img className="images" src={logo} ></img>
                        <div  >
                            <Row style={{ marginBot: '0px' }}>
                                <Col sm="8">
                                    <Row className="text-left m-0">
                                        <Col sm="4">
                                            <Row>
                                                <img className="image" src={logo} height="90px"></img>
                                            </Row>
                                        </Col>
                                        <Col sm="8">
                                            <Row className="m-0 pkvd"  >PHÒNG KHÁM ĐA KHOA VIỆT ĐOÀN</Row>
                                            <Row className="m-0 pkvd" > Bách Môn,Việt Đoàn, Tiên Du, Bắc Ninh</Row>
                                            <Row className="m-0 pkvd" >hotline: 0869.968.688</Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="end" sm={4}>
                                    <Barcode fontSize="15px" value={customer.code} height="35px" />
                                </Col>
                            </Row>
                        </div>
                        <div className="text-center m-0 ,resultDevice">
                            <b className="headers"> KẾT QUẢ XÉT NGHIỆM</b>
                        </div>
                        <h5 className="text-center m-0  dflex" >
                            <b>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()} {current.getHours()} giờ {current.getMinutes()} phút </b>
                        </h5>

                        <Row className="cusInfo">
                            <Col className='asign-left'>
                                Họ tên: <b><span className="text-uppercase font-weight-bold">{customer.full_name}</span></b><br />
                                <span >Ngày sinh: {customer.birthday?.split('-').reverse().join('-')} </span>
                                <span className="mr-3 ">Giới tính: {customer.gender ? customer.gender === "male" ? "Nam" : "Nữ" : null}</span><br></br>
                                Số điện thoại: {phone} <br></br>
                                Địa chỉ : {`${ward}${district}${province}`}<br></br>
                                Phòng khoa : <b>KHOA XÉT NGHIỆM</b><br></br>
                            </Col>
                            <Col className='asign-right'>
                                Người lấy mẫu : {userGetSample}   <br></br>
                                Thời gian lấy mẫu: {ctime}  <br></br>
                                Người nhận mẫu : {doctorInfo.full_name}<br></br>
                                Chẩn đoán : <b>{(prognostic) ? prognostic.textDiagnosis : textDiagnosis}</b><br></br>
                                Mã bệnh phẩm : {sampleID} <br></br>
                                Số CMT/CCCD : {customer.contacts[0]?.idnum}
                            </Col>

                        </Row>
                        {/* <div style={{ padding: '10px', fontWeight: '600' }}>KẾT QUẢ XÉT NGHIỆM</div> */}
                        {printOtherAndTest.length > 0 && printOtherAndTest.map((f, index) => {
                            return <div>
                                {
                                    f.device == "Test" && <Testprint
                                        time={time}
                                        resultsExam={resultsExam}
                                        sampleIdMtime={sampleIdMtime}
                                        sampleIdCtime={sampleIdCtime}
                                        setValueService={props.setValueService}
                                        device={f.device} result={f} />
                                }
                                {
                                    f.device == 'Other' && <Otherprint device={f.device} result={f}
                                        resultIndex={index}
                                        examEditSetState={(data) => props.examEditSetState(data)}
                                        data={printOtherAndTest}
                                    />
                                }
                            </div>
                        })}
                        <div className="d-flex footer mt-1">
                            <Col sm={6} className="text-center mr-auto ml-5">
                                <strong>Bác sĩ điều trị</strong><br></br>
                                <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                            </Col>
                            <Col sm={6} className="text-center mr-auto ml-5">
                                <strong>Phòng Xét Nghiệm</strong><br></br>
                                <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                                <b className="mt-5">{doctorInfo.full_name}</b>
                            </Col>
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}
export default ExamResult;