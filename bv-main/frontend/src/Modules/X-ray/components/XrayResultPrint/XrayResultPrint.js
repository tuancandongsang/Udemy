import React, { Component } from "react";
import { ShareService } from "../../../../Shared";
import { Row, Col } from "reactstrap";
import logo from '../../../../Asset/Img/logo.png';
import HeaderPrint from "../../../../Shared/Components/HeaderPrint/HeaderPrint";
import { getAge } from '../../../Reception/Shared/Util';
import SharedService from "../../../../Shared/Services/SharedService";
class XrayResultPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.style,
      doctorInfoDone: {}
    };
  }
  componentDidMount = () => {
    SharedService.getUserById(this.props.selectedJobStepRunning?.modified_by).then(res => {
      this.setState({
        doctorInfoDone: res.data
      })
    })
  }
  componentDidUpdate = (prevProps) => {
    const jobStep = this.props.selectedJobStepRunning || {};
    let customer = jobStep ? jobStep.order ? jobStep.order.customer : {} : {}
    if (this.props.style !== prevProps.style) {
      this.setState((state) => ({
        ...state,
        resultStyle: {
          ...state.resultStyle,
          display: this.props.style,
        },
      }));
    }
    if (customer.code) {
      ShareService.createEtccode(customer.code, 'barcode');
    }
  };
  render() {
    const { doctorInfoDone } = this.state;
    const jobStep = this.props.selectedJobStepRunning || {};
    const order = jobStep.order || {};
    const customer = order.customer || {};
    const ctimeRePrint = new Date(this.props.selectedJobStepRunning.mtime);
    const current = new Date();
    let date = new Date(customer.birthday);
    let address = customer.contacts ? customer.contacts[0].address : {};
    const street = address.street ? `${address.street}` : '';
    const ward = address.ward ? `  -${address.ward}` : '';
    const district = address.district ? `-${address.district}` : '';
    const province = address.province ? `-${address.province}` : '';
    let phone = customer.contacts ? customer.contacts[0].phone : "";
    let xrayResult = this.props.xrayResult ? this.props.xrayResult.results ? this.props.xrayResult.results[0] : {} : {};
    let conclusion = xrayResult ? xrayResult.conclusion : "";
    let description = xrayResult ? xrayResult.description : "";
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    return (
      <div className="border border-secondary font-print " 
      style={{ display: this.state.display }} 
      >
        <div className="printXrayResult position-relative mt-3" id="printXray">
          <div className="absolute">
            <br></br>
            <Row className="pt-3">
              <Col sm="8">
                <Row className="text-left m-0">
                  <HeaderPrint></HeaderPrint>
                </Row>
              </Col>
              <Col className="end">
                <canvas id="barcode" style={{ height: "13mm" }}></canvas>
              </Col>
            </Row>
          </div>
          {
            this.props.tab == "2" ? 
              <img className="imageXrayReprint" src={logo} alt="logoPK"/>
              :
              <img className="imageXray" src={logo} alt="logoPK"/>
          }
          <h5 className="text-center m-0 title-card-lg" >
            <b>KẾT QUẢ X-QUANG</b>
          </h5>
          <div className="text-center">
            {
              this.props.tab == "2" ? 
                <i>{ctimeRePrint.getHours()} giờ {ctimeRePrint.getMinutes()} phút,Ngày {ctimeRePrint.getDate()} Tháng {ctimeRePrint.getMonth() + 1} Năm {ctimeRePrint.getFullYear()}</i>
              : 
                <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
            }
          </div>
          <div className="infoCus">
            Họ tên: <b><span className="text-uppercase font-weight-bold">{customer.full_name}</span></b>
            <span className="ml-25">NS: {date.toLocaleString('en-GB').slice(0, 10)} {`(${getAge(date.toLocaleString('en-GB').slice(0, 10))})`}</span>
            <span className="ml-25 ">GT: {customer.gender === "male" ? " Nam" : " Nữ"} </span>
            <span className="ml-25">SĐT:  {phone}</span>
            <br />
            <span>Địa chỉ: {`${street}${ward}${district}${province}`}</span><br></br>
            <span className="d-block"> Chẩn Đoán : <b>{this.props.diagnosis}</b></span>
          </div>
          <h5 align="center" className="mb-3"><b >MÔ TẢ CHI TIẾT CHỤP X-QUANG</b></h5>
          <div className="description" style={{ whiteSpace: 'pre-line' }}>
            {description} <br />
          </div>
          <h5 className="m-2"><b align="left">KẾT LUẬN :
            {conclusion}
          </b></h5>
          <div className="d-flex justify-content-between px-4 mt-1">
            <Col sm={6}>
            </Col>
            <Col sm={6}>
              { this.props.tab == "2" ?
                <>
                  Bắc Ninh, Ngày {ctimeRePrint.getDate()} Tháng {ctimeRePrint.getMonth() + 1} Năm {ctimeRePrint.getFullYear()}<br></br>
                </>
                : 
                <>
                  Bắc Ninh, Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}<br></br>
                </>
              }
             <Row>
             <Col sm={2}>
              </Col>
             <Col sm={8}>
             <strong style={{marginLeft:'30px'}}>BÁC SĨ</strong><br></br>
              <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
              <b className="mt-5">{this.props.tab == "2" ? doctorInfoDone.full_name : doctorInfo.full_name}</b>
             </Col>
             <Col sm={2}>
             </Col>
             </Row>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default XrayResultPrint;
