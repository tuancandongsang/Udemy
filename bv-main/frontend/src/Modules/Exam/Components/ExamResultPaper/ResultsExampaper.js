// import React, { useEffect, useState } from "react";
// import { ShareService } from "../../../../Shared";
// import { Row, Col, Table } from "reactstrap";
// import logo from '../../../../Asset/Img/logo.png'
// import ExamService from "../../Shared/ExamService"
// import UA66print from "../ExamResultPaper/Device/UA66print";
// import Testprint from "../ExamResultPaper/Device/Testprint";
// import Otherprint from "../ExamResultPaper/Device/Otherprint";
// import Immuneprint from "../ExamResultPaper/Device/Immuneprint";
// import BC2800print from "../ExamResultPaper/Device/BC2800print";
// import BS200Eprint from "../ExamResultPaper/Device/BS200Eprint";
// const ExamResult = (props) => {
//     const { style, resultsExam, selectedJobStepRunning, prognostic, textDiagnosis, nameDeviceObj, devices = [], setDeviceValue, sendReq } = props;
//     const [display, setDisplay] = useState({})
//     const [deviceBC2800, setDeviceBC2800] = useState()
//     const [deviceIMMUNE, setDeviceIMMUNE] = useState()
//     const [ctime, setCtime] = useState({})
//     const [mtime, setMtime] = useState({})

//     useEffect(() => {
//         devices.forEach(element => {
//             if (element.name == 'BC-2800') {
//                 setDeviceBC2800(element)
//             } else if (element.name == 'Immune') {
//                 setDeviceIMMUNE(element)
//             }
//         });
//     }, [devices])
//     useEffect(() => {
//         if (Object.entries(selectedJobStepRunning).length > 0) {
//             setCtime(new Date(selectedJobStepRunning.ctime).toLocaleString())
//             setMtime(new Date(selectedJobStepRunning.mtime).toLocaleString())
//         }
//         if (style) {
//             setDisplay(style)
//         }
//     }, [selectedJobStepRunning, style])
//     const jobStep = selectedJobStepRunning || {};
//     const order = jobStep.order || {};
//     const customer = order.customer || {};
//     const current = new Date();
//     let date = new Date(customer.birthday);
//     let address = customer.contacts ? customer.contacts[0].address : {};
//     const ward = address.ward ? `  -${address.ward}` : '';
//     const district = address.district ? `-${address.district}` : '';
//     const province = address.province ? `-${address.province}` : '';
//     let phone = customer.contacts ? customer.contacts[0].phone : "";
//     let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
//     if (resultsExam && resultsExam.length > 0) {
//         return (
//             <div className="border border-secondary font-print" style={{ display: display }} >
//                 <div className="printExamResult position-relative mt-3" id="printExam">
//                     {resultsExam.map((e, index) => {
//                         if (e.device)
//                             return (
//                                 <div className="resultDevice" style={{ height: "1200px" }}>
//                                     <div className="absolute">
//                                         <Row style={{ marginBot: '0px' }}>
//                                             <Col sm="8">
//                                                 <Row className="text-left m-0">
//                                                     <Col sm="4">
//                                                         <Row>
//                                                             <img className="image" src={logo} height="90px"></img>
//                                                         </Row>
//                                                     </Col>
//                                                     <Col sm="8">
//                                                         <Row className="m-0">Phòng Khám Đa Khoa Việt Đoàn</Row>
//                                                         <Row className="m-0"> Bách Môn,Việt Đoàn, Tiên Du, Bắc Ninh</Row>
//                                                         <Row className="m-0">hotline: 0869.968.688</Row>
//                                                     </Col>
//                                                 </Row>
//                                             </Col>
//                                             <Col className="end">
//                                             </Col>
//                                         </Row>
//                                     </div>
//                                     <h5 className="text-center m-0 ,resultDevice">
//                                         <b> KẾT QUẢ XÉT NGHIỆM</b>
//                                     </h5>

//                                     <Row className="cusInfo">
//                                         <Col className='asign-left'>
//                                             Họ tên: <b><span className="text-uppercase font-weight-bold">{customer.full_name}</span></b><br />
//                                             <span >Ngày sinh: {customer.birthday} </span>
//                                             <span className="mr-3 ">Giới tính: {customer.gender ? customer.gender === "male" ? "Nam" : "Nữ" : null}</span><br></br>
//                                             Số điện thoại: {phone} <br></br>
//                                             Địa chỉ : {`${ward}${district}${province}`}<br></br>
//                                             Phòng khoa : <b>KHOA XÉT NGHIỆM</b><br></br>
//                                         </Col>
//                                         <Col className='asign-right'>
//                                             Người lấy mẫu : Tạ Thị Hòa   <br></br>
//                                             Thời gian lấy mẫu: {ctime}  <br></br>
//                                             Người nhận mẫu : {doctorInfo.full_name}<br></br>
//                                             Thời gian nhận mẫu: {mtime}<br></br>
//                                             Chẩn đoán : <b>{(prognostic) ? prognostic.textDiagnosis : textDiagnosis}</b><br></br>
//                                         </Col>
//                                     </Row>
//                                     <div className="text-left text-center m-0 ,resultDevice">
//                                         {e.device == "BS-200E" && <BS200Eprint deviceBC2800={deviceBC2800} device={e.device} result={e} />}

//                                         {e.device == "Immune" && e.device == nameDeviceObj.IMMUNE && <Immuneprint
//                                             deviceIMMUNE={deviceIMMUNE}
//                                             show_form_input={false}
//                                             setDeviceValue={setDeviceValue}
//                                             device={e.device} result={e} />}
//                                         {e.device == "BC-2800" && <BC2800print
//                                             xscroll={false}
//                                             show_form_input={false}
//                                             deviceBC2800={deviceBC2800}
//                                             setDeviceValue={setDeviceValue}
//                                             device={e.device} result={e} />}
//                                         {e.device == "UA-66" && <UA66print device={e.device} result={e} />}
//                                         {e.device == "Test" && <Testprint
//                                             resultsExam={resultsExam}
//                                             setValueService={props.setValueService}
//                                             device={e.device} result={e} />}
//                                         {e.device == 'Other' && <Otherprint device={e.device} result={e}
//                                             resultIndex={index}
//                                             examEditSetState={(data) => props.examEditSetState(data)}
//                                             examEditState={props.examEditState}
//                                         />}
//                                     </div>

//                                     <div className="d-flex footer mt-1">
//                                         <div className="text-center mr-auto ml-5">
//                                             <strong>Bác sĩ điều trị</strong><br></br>
//                                             <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
//                                         </div>
//                                         <div className="text-center mr-auto ml-5">
//                                             <strong>Phòng Xét Nghiệm</strong><br></br>
//                                             <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
//                                             <b className="mt-5">{doctorInfo.full_name}</b>
//                                         </div>
//                                     </div>
//                                 </div>

//                             )
//                     })}

//                 </div>
//             </div>
//         );
//     } else {
//         return (
//             <div className="border border-secondary " style={{ display: display }} >
//                 <div className="printExamResult position-relative" id="printExam">
//                     <div className="absolute">
//                         <Row>
//                             <Col sm="7">
//                                 <Row className="text-left m-0">
//                                     <Col sm="4">
//                                         <Row>
//                                             <img className="image" src={logo} height="90px"></img>
//                                         </Row>
//                                     </Col>
//                                     <Col sm="8">
//                                         <Row className="m-0">Phòng Khám Đa Khoa Việt Đoàn</Row>
//                                         <Row className="m-0"> Bách Môn, Việt Đoàn, Tiên Du, Bắc Ninh</Row>
//                                         <Row className="m-0">hotline: 0869.968.688</Row>
//                                     </Col>
//                                 </Row>
//                             </Col>
//                             <Col className="end">
//                             </Col>
//                         </Row>
//                     </div>
//                     <h5 className="text-center m-0">
//                         <b> KẾT QUẢ XÉT NGHIỆM</b>
//                     </h5>
//                     <div className="text-center">
//                         <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
//                     </div>
//                     <Row className="cusInfo">
//                         <Col className='asign-left'>
//                             Họ tên: <br />
                            
//                             <span >Ngày sinh: {date.toLocaleString('en-GB').slice(0, 10)}</span>
//                             <span className="mr-3 ">Giới tính:  </span><br></br>
//                             Số điện thoại:  {phone}<br></br>
//                             Địa chỉ : {`${ward}${district}${province}`}<br></br>
//                             Phòng khoa : <b>KHOA XÉT NGHIỆM</b><br></br>
//                             Chẩn đoán: <br></br>
//                             Bác sĩ điều trị : <br></br>
//                         </Col>
//                         <Col className='asign-right'>
//                             Thời gian lấy mẫu: {resultsExam && resultsExam.length > 0 && resultsExam.result.ctime}<br></br>
//                             Người nhận mẫu : <br></br>
//                             Thời gian nhận mẫu:{resultsExam && resultsExam.length > 0 && resultsExam.result.ctime}<br></br>
//                         </Col>
//                     </Row>
//                     <b align="right">Kết quả Xét Nghiệm</b>
//                     <div className="justify-content-between ">
//                         <div className="text-left">
//                             <table className="table table-head-fixed table-bordered">
//                                 <thead>
//                                     <tr>
//                                         <th className="dw-3"> STT </th>
//                                         <th className="dw-30"> Tên Xét Nghiệm </th>
//                                         <th className="dw-14"> Kết quả </th>
//                                         <th className="dw-24">Chỉ số bình thường</th>
//                                         <th className="dw-16"> Đơn vị </th>
//                                         <th className="dw-16"> QTXN </th>
//                                         <th className="dw-12">Máy XN</th>
//                                     </tr>
//                                 </thead>
//                             </table>
//                         </div>
//                     </div>
//                     <div className="d-flex justify-content-between px-4 mt-1">
//                         <div className="text-center mr-auto ml-5">
//                             <strong>Trưởng Phòng Xét Nghiệm</strong><br></br>
//                             <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
//                             <b className="mt-5">{doctorInfo.full_name}</b>
//                         </div>
//                         <div className="text-center mr-5">
//                             ....Giờ ....Ngày ....Tháng ....Năm<br></br>
//                             <strong>KHOA XÉT NGHIỆM</strong>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// export default ExamResult;