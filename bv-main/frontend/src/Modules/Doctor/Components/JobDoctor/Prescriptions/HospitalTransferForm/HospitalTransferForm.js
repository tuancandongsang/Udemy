import React, { useState, useRef } from "react";
import { Modal, Button, Row, Col, Container, Card, Input } from "reactstrap";
import { ModalHeader, ModalFooter, ModalBody } from "reactstrap";
import "./HospitalTransferForm.scss";
import {convertDate} from '../../../../../../Constances/const.js'
import PrintHostpitalTranfer from "./PrintHostpitalTranfer.js";
import SharedService from "../../../../../../Shared/Services/SharedService.js";
import HeaderPrint from "../../../../../../Shared/Components/HeaderPrint/HeaderPrint";
import Signature from "../../../../../../Shared/Components/Signature/Signature";
import ReactToPrint from "react-to-print";
import logo from "../../../../../../Asset/Img/logoPK.png";
const HospitalTransfer = (props) => {
  let componentRef = useRef(null);
  const { showHospitalTransfer, handleClose, cusInfo, job, checkForm } = props;
  const [openForm, setOpenForm] = useState(false);
  const [patientCondition, setPatientCondition] = useState({
    clinicSign: "",
    testResult: "",
    patientStatus: "",
    method: "",
    diagnose: typeof job.state !== "undefined" ? job.state.textDiagnosis : "",
    reason: "",
    treatmentDirection: "",
    timeTransfer: "",
  });
  const [patientInfo, setPatientInfo] = useState({
    workplace: "",
    end: "",
  });
  const handleChangeInput2 = (e) => {
    setPatientInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeInput = (e) => {
    setPatientCondition((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  let arrResult = [];
  if (job.steps) {
    job.steps
      .filter((step) => step.type == "test" && step.results.length > 0)
      .map((el) => {
        let filter = el.results.map((data) => {
          if (data.conclusion) {
            return {
              nameService: el.order.items[0].ref_value.name,
              resultService: data.conclusion,
            };
          } else {
            return {
              nameService: Object.keys(data)[1],
              resultService: Object.values(data)[1],
            };
          }
        });
        arrResult.push(filter);
      });
  }
  let arrMedical=[]
  if(job.steps) {
    job.steps.filter((step)=> step.type =='buy').map(el=>{
      el.order.items.forEach((item)=>{
        let filter={
          name:item.ref_value.name,
          instruc:item.attrs.instruction
        }
        arrMedical.push(filter)
      })
    })
  }
  function checkObjResult(objResult){
    let str=''
    for(let i in objResult){
      if(typeof objResult[i] === 'string'){
        return str+=`${i}:${objResult[i]}`
      }
    }
    return str
  }
  function checkObjMedical(objMedical){
    return Object.values(objMedical).join(':')
  }
  // console.log(cusInfo.birthday.split('-').map(el=>+el));
  return (
    <>
      <Modal
        isOpen={showHospitalTransfer}
        // onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        backdrop={true}
      >
        <ModalHeader closeButton>
          {checkForm == 1
            ? "FORM CHUYỂN VIỆN"
            : "PHIẾU TÓM TẮT KHÁM, CHỮA BỆNH"}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="12">
              <Card>
                <Col sm="12" className="mb-2">
                  <label className="labelHospitalTransfer">
                    Thông tin bệnh nhân
                  </label>
                </Col>
                <Row>
                  <Col sm="3">
                    <label>Họ tên:</label>
                    {cusInfo && (
                      <Input
                        name="fullName"
                        value={cusInfo.full_name}
                        disabled={true}
                      />
                    )}
                  </Col>
                  <Col sm="3">
                    <label>Ngày sinh:</label>
                    {cusInfo.birthday && (
                      <Input
                        name="birthDay"
                        value={convertDate(cusInfo.birthday,'en-GB')}
                        disabled={true}
                      />
                    )}
                  </Col>
                  <Col sm="3">
                    <label>Dân tộc:</label>
                    <Input name="ethnic" disabled={true} value="Kinh" />
                  </Col>
                  <Col sm="3">
                    <label>Địa chỉ</label>
                    {typeof cusInfo.contacts !== "undefined" && (
                      <Input
                        name="address"
                        value={`${cusInfo.contacts[0].address.street},${cusInfo.contacts[0].address.ward}`}
                        disabled={true}
                      />
                    )}
                    {typeof cusInfo.contacts == "undefined" && (
                      <Input name="address" disabled={true} />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm="3">
                    <label>Quốc tịch:</label>
                    <Input name="nation" value="Việt Nam" disabled={true} />
                  </Col>
                  <Col sm="3">
                    <label>Nơi làm việc:</label>
                    <Input
                      name="workplace"
                      disabled={false}
                      onChange={handleChangeInput2}
                    />
                  </Col>
                  <Col sm="3">
                    <label>Số thẻ:</label>
                    {typeof cusInfo.contacts !== "undefined" && (
                      <Input
                        name="idcard"
                        value={
                          cusInfo.contacts[0].idnum === null
                            ? ""
                            : `${cusInfo.contacts[0].idnum}`
                        }
                        disabled={true}
                      />
                    )}
                    {typeof cusInfo.contacts == "undefined" && (
                      <Input name="idcard" disabled={true} />
                    )}
                  </Col>
                  <Col sm="3">
                    <label>Hạn sử dụng đến:</label>
                    <Input name="expiry" disabled={true} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="mb-2">
                    <label>Đã được khám bệnh/ điều trị tại:</label>
                  </Col>
                  <Col sm="3" style={{ display: "flex" }}>
                    <Col sm="5">
                      <label>Từ ngày:</label>
                    </Col>
                    <Col sm="7">
                     {job.date && (
                      <Input
                        name="start"
                        value={convertDate(job.date,'en-GB')}
                        disabled={true}
                      />
                     )}
                    </Col>
                  </Col>
                  <Col sm="3" style={{ display: "flex" }}>
                    <Col sm="5">
                      <label>Đến ngày:</label>
                    </Col>
                    <Col sm="7">
                      <Input
                        name="end"
                        disabled={false}
                        onChange={handleChangeInput2}
                      />
                    </Col>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <label className="labelHospitalTransfer">Tóm tắt bệnh án</label>
                <Row>
                  <Col sm="6">
                    <label>Dấu hiệu lâm sàng:</label>
                    <Input
                      style={{ height: 150 }}
                      name="clinicSign"
                      type="textarea"
                      onChange={handleChangeInput}
                    />
                  </Col>
                  <Col sm="6">
                    <label>Kết quả xét nghiệm, cận lâm sàng:</label>
                    <Card style={{ height: 150, overflow: "auto" }}>
                      {/* {arrResult.flat().length > 0 &&
                        arrResult.flat().map((el) =>
                          typeof el.resultService === "object" ? (
                            <>
                              <p style={{ marginBottom: 0 }}>
                                {el.nameService}:
                              </p>
                              {Object.values(el.resultService).includes('') ? (
                                <p style={{marginBottom: 0 }}>{checkObjResult(el.resultService)}</p>
                              ):(
                                <p style={{marginBottom: 0 }}>- {Object.entries(el.resultService).map(el=>el.join(':')).join('. ')}</p>
                              )}
                            </>
                          ) : (
                            <>
                              <p style={{ marginBottom: 0 }}>
                                {el.nameService}: {el.resultService}
                              </p>
                            </>
                          )
                        )} */}
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col sm="6">
                    <label>
                      {" "}
                      Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong
                      điều trị:
                    </label>
                    <Card style={{ height: 150, overflow: "auto" }}>
                      {arrMedical.length > 0 && (
                        <p style={{ marginBottom: 0 }}>{arrMedical.map(el=> checkObjMedical(el)).join('. ')}</p>
                      )}
                    </Card>
                  </Col>
                  {checkForm == 1 && (
                    <Col sm="6">
                      <label> Tình trạng người bệnh lúc chuyển tuyến:</label>
                      <Input
                        style={{ height: 150 }}
                        name="patientStatus"
                        type="textarea"
                        onChange={handleChangeInput}
                      />
                    </Col>
                  )}
                  {checkForm == 2 && (
                    <Col sm="6">
                      <label>Chẩn đoán:</label>
                      {job.state && (
                        <Input
                          style={{ height: 150 }}
                          readOnly={true}
                          name="text"
                          type="textarea"
                          value={job.state.textDiagnosis}
                        />
                      )}
                      {!job.state && (
                        <Input
                          style={{ height: 150 }}
                          name="text"
                          type="textarea"
                        />
                      )}
                    </Col>
                  )}
                </Row>
                <Row>
                  {checkForm == 1 && (
                    <>
                      <Col sm="6">
                        <label>Chẩn đoán:</label>
                        {job.state && (
                          <Input
                            style={{ height: 50 }}
                            readOnly={true}
                            name="text"
                            type="textarea"
                            value={job.state.textDiagnosis}
                          />
                        )}
                        {!job.state && (
                          <Input
                            style={{ height: 50 }}
                            name="text"
                            type="textarea"
                          />
                        )}
                      </Col>
                      <Col sm="6">
                        <label> Lý do chuyển viện:</label>
                        <Input
                          style={{ height: 50 }}
                          name="reason"
                          type="textarea"
                          onChange={handleChangeInput}
                        />
                      </Col>
                    </>
                  )}
                </Row>
                {checkForm == 1 && (
                  <Row>
                    <Col sm="6">
                      <label> Hướng điều trị:</label>
                      <Input
                        style={{ height: 50 }}
                        name="treatmentDirection"
                        type="textarea"
                        onChange={handleChangeInput}
                      />
                    </Col>
                    <Col sm="6">
                      <label> Chuyển tuyến hồi:</label>
                      <Input
                        style={{ height: 50 }}
                        name="timeTransfer"
                        type="textarea"
                        onChange={handleChangeInput}
                      />
                    </Col>
                  </Row>
                )}
              </Card>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter style={{ paddingRight: 70 }}>
          <Button
            style={{ backgroundColor: "red" }}
            onClick={() => handleClose()}
          >
            Hủy
          </Button>
          <ReactToPrint
            trigger={() => <Button>In</Button>}
            content={() => componentRef}
            // onAfterPrint={() => AfterPrint()}
          />
        </ModalFooter>
      </Modal>
      <div hidden style={{ height: "100vh" }}>
        <div
          ref={(el) => (componentRef = el)}
          className="form-container"
          id="print-hostpital-transfer"
        >
          <div className="form-header">
            <div className="left-header">
              <p style={{ fontSize: "20px" }}>BỘ Y TẾ</p>
              <p
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  fontSize: "20px",
                }}
              >
                PHÒNG KHÁM ĐK VIỆT ĐOÀN
              </p>
              <p style={{ fontSize: "17px" }}>Số: 00013601/2022/GCT</p>
            </div>
            <div className="center-header">
              <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
              <p style={{ fontWeight: "bold", textDecoration: "underline" }}>
                Độc lập - Tự do - Hạnh phúc
              </p>
            </div>
            <div className="right-header">
              {/* <div className="qr-code"> */}
              <canvas id="cmCode" style={{ height: "13mm" }}></canvas>
              {/* </div> */}
              <div className="idNum">
                <p style={{ fontSize: "17px" }}>Số hồ sơ:</p>
                <p style={{ fontSize: "17px" }}>215223333</p>
              </div>
            </div>
          </div>
          <div className="form-body">
            <div className="form-body-title">
              {checkForm == 1
                ? "GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BẢO HIỂM Y TẾ"
                : "PHIẾU TÓM TẮT KHÁM, CHỮA BỆNH"}
            </div>
            <div className="patient-profile">
              <div>
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    marginTop: "40px",
                  }}
                >
                  Kính gửi:{" "}
                </span>
                <b></b>
              </div>
              <p style={{ marginBottom: "0px" }}>
                Phòng khám đa khoa Việt Đoàn trân trọng giới thiệu:
              </p>
              <div className="patient-info">
                <p className="first-Item">
                  Họ tên bệnh nhân: <b>{cusInfo.full_name}</b>
                </p>
                <p style={{ width: "20%" }}>
                  Giới tính: <b>{cusInfo.gender == "male" ? "Nam" : "Nữ"}</b>
                </p>
                <p style={{ width: "30%" }}>
                  Ngày sinh: {cusInfo.birthday && (<b>{ convertDate(cusInfo.birthday,'en-GB')}</b>)}
                </p>
              </div>
              <div className="patient-info">
                <p>
                  Địa chỉ:{" "}
                  <b>
                    {typeof cusInfo.contacts !== "undefined"
                      ? `${cusInfo.contacts[0].address.street},${cusInfo.contacts[0].address.ward},${cusInfo.contacts[0].address.district},${cusInfo.contacts[0].address.province}`
                      : ""}
                  </b>
                </p>
              </div>
              <div className="patient-info">
                <p style={{ width: "20%" }}>
                  Dân tộc: <b>Kinh</b>
                </p>
                <p style={{ width: "30%" }}>
                  Quốc tịch: <b>Việt Nam</b>
                </p>
                <p style={{ width: "60%" }}>Nghề nghiệp:</p>
              </div>
              <div className="patient-info">
                <p style={{ width: "40%" }}>
                  Nơi làm việc: <b>{patientInfo.workplace}</b>
                </p>
                <p style={{ width: "22%" }}>
                  Số thẻ:{" "}
                  <b>
                    {typeof cusInfo.contacts !== "undefined"
                      ? cusInfo.contacts[0].idnum === null
                        ? ""
                        : `${cusInfo.contacts[0].idnum}`
                      : ""}
                  </b>
                </p>
                <p style={{ width: "30%" }}>Hạn sử dụng đến: </p>
              </div>
              <div className="patient-info">
                <p>
                  Đã được khám bệnh/ điều trị tại:
                  <b> Phòng khám Đa khoa Việt Đoàn</b>
                </p>
              </div>
              <div className="patient-info">
                <p style={{ width: "30%" }}>
                  Từ ngày: {job.date && (<b>{convertDate(job.date,'en-GB')}</b>)}
                </p>
                <p style={{ width: "30%" }}>
                  Đến ngày: <b>{patientInfo.end.includes('-')? patientInfo.end.split('-').join('/'):patientInfo.end}</b>
                </p>
              </div>
            </div>
            <div class="patient-condition">
              <div className="form-body-title">TÓM TẮT BỆNH ÁN</div>
              <Row>
                <Col sm="12">
                  <label className="Label">- Dấu hiệu lâm sàng:</label>
                  <div className="content">{patientCondition.clinicSign}</div>
                </Col>
                <Col sm="12">
                  <label className="Label">
                    - Kết quả xét nghiệm, cận lâm sàng:
                  </label>
                  <div className="content">
                        {/* {arrResult.flat().length > 0 &&
                        arrResult.flat().map((el) =>
                          typeof el.resultService === "object" ? (
                            <>
                              <p style={{ marginBottom: 0 }}>
                                {el.nameService}:
                              </p>
                              {Object.values(el.resultService).includes('') ? (
                                <p style={{marginBottom: 0 }}>{checkObjResult(el.resultService)}</p>
                              ):(
                                <p style={{marginBottom: 0 }}>- {Object.entries(el.resultService).map(el=>el.join(':')).join('. ')}</p>
                              )}
                            </>
                          ) : (
                            <>
                              <p style={{ marginBottom: 0 }}>
                                {el.nameService}: {el.resultService}
                              </p>
                            </>
                          )
                        )} */}
                  </div>
                </Col>
                <Col sm="12">
                  <label style={{ fontSize: "15px" }}>
                    <span className="Label">- Chẩn đoán: </span>
                    {job.state ? job.state.textDiagnosis : ""}
                  </label>
                </Col>
                <Col sm="12">
                  <label className="Label">
                    - Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong
                    điều trị:
                  </label>
                  {arrMedical.length > 0 && (
                        <p style={{ marginBottom: 0 }}>{arrMedical.map(el=> checkObjMedical(el)).join('. ')}</p>
                      )}
                </Col>
                {checkForm == 1 && (
                  <>
                    <Col sm="12">
                      <label className="Label">
                        - Tình trạng người bệnh lúc chuyển tuyến:
                      </label>
                      <div className="content">
                        {patientCondition.patientStatus}
                      </div>
                    </Col>
                    <Col sm="12">
                      <label className="Label">
                        - Lí do chuyển viện: Vượt quá khả năng điều trị
                      </label>
                      <div className="content">{patientCondition.reason}</div>
                    </Col>
                    <Col sm="12" style={{ fontSize: "15px" }}>
                      <label className="Label">- Hướng điều trị: </label>{" "}
                      {patientCondition.treatmentDirection}
                    </Col>
                    <Col sm="12" style={{ fontSize: "15px" }}>
                      <label className="Label">- Chuyển tuyến hồi: </label>{" "}
                      {patientCondition.timeTransfer}
                    </Col>
                  </>
                )}
              </Row>
            </div>
          </div>
          {checkForm == 1 && (
            <div className="form-footer">
              <span className="footer-title">Y, BÁC SĨ ĐIỀU TRỊ</span>
              <span className="footer-subTitle">(Ký và ghi rõ họ tên)</span>
              <br></br>
              <br></br>
              <br></br>
              <span className="Sign">ĐỖ THIỆN HẢI</span>
            </div>
          )}
          {checkForm == 2 && (
            <div className="form-footer">
              <span className="footer-title">Y, BÁC SĨ ĐIỀU TRỊ</span>
              <span className="footer-subTitle">(Ký và ghi rõ họ tên)</span>
              <br></br>
              <br></br>
              <br></br>
              <span className="Sign">ĐỖ THIỆN HẢI</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HospitalTransfer;
