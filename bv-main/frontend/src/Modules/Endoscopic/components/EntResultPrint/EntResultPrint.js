import React, { Component, Fragment } from "react";
import { ShareService } from "../../../../Shared";
import { Row, Col, Table } from "reactstrap";
import HeaderPrint from "../../../../Shared/Components/HeaderPrint/HeaderPrint";
import EntService from "../../share/EntService";
import { moneyToWord, getAge } from '../../../Reception/Shared/Util';
import SharedService from "../../../../Shared/Services/SharedService";
import logo from '../../../../Asset/Img/logo.png'
class EntResultPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.style,
      photos: [],
      doctorInfoDone: {}
    };
  }

  componentDidMount = () => {
     let tab = this.props.tab;
    let promise = [];
    let urls = this.props.upload;
      urls.map(url => {
        promise.push(EntService.downloadPhoto(url.name))
      })
      Promise.all(promise).then(arr => {
        this.setState({
          photos: arr.map(el => el.config.url)
        })
      })
      SharedService.getUserById(this.props.selectedJobStepRunning?.modified_by).then(res => {
        this.setState({
          doctorInfoDone: res.data
        })
      })
  }

  componentDidUpdate = (prevProps) => {
    const jobStep = this.props.selectedJobStepRunning || {};
    let customer = jobStep ? jobStep.order ? jobStep.order.customer : {} : {}
    if(this.props.selectedJobStepRunning.id === prevProps.selectedJobStepRunning.id) return
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
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
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
    let entResult = this.props.entResult ? this.props.entResult.results ? this.props.entResult.results[0] : {} : {};
    let conclusion = entResult ? entResult.conclusion : "";
    let description = entResult ? entResult.description : "";
    let urlFileImg = this.props.urlFileImg || {};
    let tab = this.props.tab;
    return (
      <div className="border border-secondary font-print " 
      style={{ display: this.state.display }} 
      >
        <div className="printEntResult position-relative mt-3" id="printEnt">
          <div className="absolute">
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
              <img className="imageEntReprint" src={logo} alt="logoPK"/>
              :
              <img className="imageEnt" src={logo} alt="logoPK"/>
          }
          <h5 className="text-center m-0 title-card-lg">
            <b>KẾT QUẢ NỘI SOI</b>
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
          <h5 align="center" className="mb-1"> <b>MÔ TẢ CHI TIẾT NỘI SOI</b></h5>
          <div className="conclusion" style={{ whiteSpace: 'pre-line' }}>
            {description} <br />
          </div>
          <Row>
            <div className="d-flex justify-content-between m-0">
              {tab == 2 ? this.state.photos.map(photo => {
                return (
                  <div>
                    <img className="resultFile" src={photo} alt=""/>
                  </div>
                )
              }) :
                <div className="d-flex justify-content-between m-0">
                  <div><img className="resultFile" src={urlFileImg.rightearImg} alt="" /></div>
                  <div><img className="resultFile" src={urlFileImg.leftearImg} alt="" /></div>
                  <div><img className="resultFile" src={urlFileImg.noseImg} alt="" /></div>
                  <div><img className="resultFile" src={urlFileImg.throatImg} alt="" /></div>
                </div>
              }
            </div>
          </Row>
          <h5 className="m-2"><b align="left">KẾT LUẬN :
            {conclusion}
          </b></h5>
          <div className="d-flex justify-content-between px-4 mt-1">
            <div className="text-center mr-auto ml-5">
            </div>
            <div style={{width : "40%"}} className="text-center mr-5">
              { this.props.tab == "2" ?
                <>
                  Bắc Ninh, Ngày {ctimeRePrint.getDate()} Tháng {ctimeRePrint.getMonth() + 1} Năm {ctimeRePrint.getFullYear()}<br></br>
                </>
                : 
                <>
                  Bắc Ninh, Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}<br></br>
                </>
              }
              <strong>BÁC SĨ</strong><br></br>
              <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
              <b className="mt-5">{this.props.tab == "2" ? doctorInfoDone.full_name : doctorInfo.full_name}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EntResultPrint;