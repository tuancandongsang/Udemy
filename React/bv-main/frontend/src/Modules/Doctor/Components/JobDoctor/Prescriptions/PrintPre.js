import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import SharedService from '../../../../../Shared/Services/SharedService';
import HeadedPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint';
import { ONE_DAY, PRODUCT_UNIT } from '../../../../../Constances/const';
import Signature from '../../../../../Shared/Components/Signature/Signature';
import logo from '../../../../../Asset/Img/logoPK.png';
import { getAge,convertToStrDate } from '../../../../Reception/Shared/Util';
export class PrintPre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorInfo: {}
    }
  }
  componentDidMount() {
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    this.setState({ doctorInfo })
  }
  componentDidUpdate(preProps) {
    let { etcArr, cusData, otcArr, etcCode, otcCode } = this.props;
    let rowOtcArr = otcArr.filter(el => !el.old)
    if (etcArr.length > 0) {
      SharedService.createEtccode(cusData.code.toString(), "canvasCusEtc")
      preProps.etcCode !== etcCode && SharedService.createEtccode(etcCode, 'canvasOrderEtc')
    }
    if (rowOtcArr.length > 0) {
      preProps.otcCode !== otcCode && SharedService.createEtccode(otcCode, 'canvasOrderOtc')
      SharedService.createEtccode(cusData.code.toString(), "canvasCusOtc")
    }

  }
  render() {
    let { etcArr, etcCode, cusData, otcCode, otcArr, job, reExamDate } = this.props;
    const {doctorInfo} =this.state
    const customerCode = cusData ? cusData.code : null;
    const current = new Date();
    let phone = cusData && cusData.contacts ? cusData.contacts[0].phone : null;
    let address = cusData && cusData.contacts ? cusData.contacts[0].address : {};
    let date = new Date(cusData ? cusData.birthday : null);
    let age = cusData.birthday;
    let weight = job.state?.subclinical?.weight || '';
    let textDiagnosis = job.state?.textDiagnosis;
    let notice = "noticeFix";
    let signature = "signFix"
    let rowEtcArr = etcArr ? etcArr.filter(el => !el.old).map((el, index) => {
      if(etcArr.length >= 11) {
        notice = "notice";
        signature="signature"
      }
      else {
        notice = "noticeFix";
        signature="signFix" ;
      }
      
      return (
        <div className="mb-1 pt-0">
          <Row className="item-product">
            <Col xs={{ size: '7' }}>
              <div className="title-product"><b>{index + 1}</b>/ {el.name} <b className="fontsz-13">({el.parts[0]?.name} {el.parts[0]?.quantity})</b></div>
              
            </Col>
            <Col className="pl-60" xs="1">{el.quantity}</Col>
            <Col className="pl-35" xs={{ size: '1', offset: '1' }}>
              {PRODUCT_UNIT.map(u => {
                if (u.code === el?.unit)
                  return <span>{u.label}</span>
              })}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="pt-0 fontsz-20">
              <i>{el.attrs?.instruction}</i>
            </Col>
          </Row>
        </div>
      )
    }) : null;
    let rowOtcArr = otcArr ? otcArr.filter(el => !el.old).map((el, index) => {
      if(otcArr.length >= 11) {
        notice = "notice";
        signature="signature"
      }
      else {
        notice = "noticeFix";
        signature="signFix" ;
      }
      return (
        <>
          <Row className="item-product">
            <Col xs={{ size: '7' }}>
              <div className="title-product"><b>{index + 1}</b>/ {el?.name} <b className="fontsz-13">({el.parts[0]?.name} {el.parts[0]?.quantity})</b></div>
            </Col>
            <Col className="pl-60" xs="1">{el.quantity}</Col>
            <Col className="pl-35" xs={{ size: '1', offset: '1' }}>
              {PRODUCT_UNIT.map(u => {
                if (u.code === el?.unit)
                  return <span>{u.label}</span>
              })}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <i className="fontsz-20">{el.attrs?.instruction}</i>
            </Col>
          </Row>
        </>
      )
    }) : null;
    return (
      <div className="PrintPre receiptContainer" >
        <div className="print-pharmacy medPrintId position-relative" id="medPrintId" >
          <div className="pl-30 pr-15 pb-20 PrintEtc" id="PrintEtc">
            <Row className="pt-20 header-print">
              <div className="print-w-60 absolute">
                <HeadedPrint />
              </div>
              <div className="background-logo-print-product">
                <img alt="logo" src={logo} style={{ width: 700 , height: 400 }}></img>
              </div>
              <div className="print-w-40">
                <canvas id="canvasOrderEtc" style={{ height: "13mm", marginRight: '20px' }}></canvas>
              </div>
            </Row>
            <div className="text-center print-title">
              ĐƠN THUỐC
            </div>
            <div className="text-center">
              <i> {current.getHours()} Giờ {current.getMinutes()} Phút, Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
            </div>
            <div className="info-cus">
              <div className="text-left  print-w-50">
                <canvas id="canvasCusEtc" style={{ height: "13mm" }}></canvas>
              </div>
            </div>
            <div className="info-cus" >
              <div className="print-mw-30 name-print">
                Họ tên: <b>{cusData.full_name}</b>
              </div>
              <div className="birthday-print">
                {getAge(convertToStrDate(age))}
              </div>
              {cusData && cusData.gender ?
                <div className="gender-print">
                  Giới: {cusData.gender === "male" ? "Nam" : cusData.gender === "female" ? "Nữ" : ""}
                </div> 
                : <div className="gender-print"></div>}
              <div className="pl-10 weight-print">Nặng: {weight}kg</div>
            </div>

            <div className="info-cus pb-5">
            <div className="address-print">
                Địa chỉ : {address?.street} - {address?.ward} - {address?.district}
                 {/* - {address?.province?.indexOf("Thành phố") > -1 ? address?.province?.replace("Thành phố ", "") : address?.province?.replace("Tỉnh ", "")} */}
              </div>
                <div className="pl-10 phone-print">
                  ĐT : {phone}
                </div>
            </div>
            <div className="fontsz-17">Chẩn đoán: <b>{textDiagnosis}</b></div>
            <div className="order-product">
              <Row className="pt-5 title-order fontsz-14">
                <Col xs={{ size: '6', offset:'1'}}><u>Thuốc điều trị</u></Col>
                <Col className="ml-35" xs={2}><u>Số lượng</u></Col>
                <Col xs={2}><u>Đơn vị</u></Col>
              </Row>
              {rowEtcArr}
            </div>
            <div className="d-flex justify-content-between px-4">
              <div className = {`${notice}`}>
                <div className="pb-5 pt-30"><b>Nếu bất thường đến cơ sở y tế gần nhất.</b></div>
                <div className="pb-5"><b>Khám lại sau : {reExamDate ? reExamDate : "....."} Ngày!</b></div>
                <div><b>Khám lại mang theo đơn này.</b></div>
              </div>
              <div className={`text-center ${signature}`}>
                <div className="text-center">
                <Signature doctorInfo={doctorInfo}></Signature>
                  {/* <strong>Bác sĩ điều trị</strong><br></br>
                  <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                  <b className="mt-5">{this.state.doctorInfo?.full_name}</b> */}
                </div>
              </div>
            </div>
          </div>
          {rowOtcArr.length > 0 &&
            <div className="pl-30 pr-15 PrintEtc" id="PrintOtc">
              <Row className="header-print">
                <div className="print-w-60 absolute">
                  <HeadedPrint />
                </div>
                <div className="print-w-40">
                  <canvas id="canvasOrderOtc" style={{ height: "13mm", marginRight: '20px' }}></canvas>
                </div>
              </Row>
              <div className="background-logo-print-product">
                <img alt="logo" src={logo} style={{ width: 700 , height: 400 }}></img>
              </div>
              <div className="text-center print-title">
                ĐƠN THUỐC
              </div>
              <div className="text-center">
                <i> {current.getHours()} Giờ {current.getMinutes()} Phút, Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
              </div>
              <div className="info-cus">
                <div className="text-left  print-w-50">
                  <canvas id="canvasCusOtc" style={{ height: "13mm" }}></canvas>
                </div>
               
              </div>
              <div className="info-cus" >
                <div className="print-mw-30 name-print">
                  Họ tên: <b>{cusData.full_name}</b>
                </div>
                <div className="pl-10 birthday-print">
                {getAge(convertToStrDate(age))}
                </div>
                {cusData && cusData.gender ?
                  <div className="pl-10 gender-print">
                    Giới: {cusData.gender === "male" ? "Nam" : cusData.gender === "female" ? "Nữ" : ""}
                  </div>
                  : <div className="gender-print"></div>}
                <div className="weight-print">Nặng: {weight}kg</div>
              </div>

              <div className="info-cus pb-5">
                <div className="address-print">
                  Địa chỉ : {address?.street}-
                  {address?.ward}-
                  {address?.district}
                  {/* {address?.province?.indexOf("Thành phố") > -1 ? address.province.replace("Thành phố ", "") : address.province.replace("Tỉnh ", "")} */}
                </div>
                <div className="phone-print">
                  ĐT : {phone}
                </div>
              </div>
              <div className="fontsz-20">Chẩn đoán: <b> {textDiagnosis} </b></div>
              <div className="order-product">
                <Row className="pt-5 title-order fontsz-14">
                  <Col xs={{ size: '6', offset:'1'}}><u>Thuốc điều trị</u></Col>
                  <Col className="ml-35" xs={2}><u>Số lượng</u></Col>
                  <Col xs={2}><u>Đơn vị</u></Col>
                </Row>
                {rowOtcArr}
              </div>
              <div className="d-flex justify-content-between px-4">
              <div className = {`${notice}`}>
                <div className="pb-5 pt-30"><b>Nếu bất thường đến cơ sở y tế gần nhất.</b></div>
                <div className="pb-5"><b>Khám lại sau : {reExamDate ? reExamDate : "....."} Ngày!</b></div>
                <div><b>Khám lại mang theo đơn này.</b></div>
              </div>
              <div className={`text-center ${signature}`}>
                <div className="text-center">
                <Signature doctorInfo={doctorInfo}></Signature>
                  {/* <strong>Bác sĩ điều trị</strong><br></br>
                  <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                  <b className="mt-5">{this.state.doctorInfo?.full_name}</b> */}
                </div>
              </div>
            </div>
            </div>}
        </div>

      </div>
    );
  }
}