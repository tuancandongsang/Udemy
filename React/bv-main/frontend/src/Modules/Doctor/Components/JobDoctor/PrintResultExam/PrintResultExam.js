import React from 'react';
import { Row, Col, Table, } from 'reactstrap';
import { Form, ModalNoti, } from "../../../../../Shared";
import SharedService from '../../../../../Shared/Services/SharedService';
import { convertToStrDate, getAge } from '../../../../Reception/Shared/Util';
import HeaderPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint';
import DoctorServices from "../../../Shared/DoctorService";
import Signature from '../../../../../Shared/Components/Signature/Signature';
import { POLICY_CODE, addressConvert, NAMEDEVICE } from '../../../../../Constances/const';
import BC2800 from "../ResultExam/BC2800";
import UA66 from "../ResultExam/UA66";
import BS200E from "../ResultExam/BS200E";
import Test from "../ResultExam/Test";
import Other from "../ResultExam/Other";
import Immune from "../ResultExam/IMMUNE";
class PrintResultExam extends Form {
    constructor(props) {
        super(props);
        this.state = {
            cusCode: "",
        };
    }
    componentDidUpdate = () => {
        let { cusData, resultsExam } = this.props;
        if (cusData.code) {
            resultsExam?.map((el, index) => {
                SharedService.createOtccode(cusData.code, "cusBarCodeExam" + index)
            })
        }
    }
    render() {
        let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
        const { tab, resultsExam, cusData } = this.props;
        const ctime = this.props.ctime ? this.props.ctime : "";
        let printDiag = this.props.diagnosis ? this.props.diagnosis : this.props.textDiagnosis;
        const current = new Date();
        let cusBirthDay = cusData ? cusData.birthday : "";
        let date = new Date(cusBirthDay)
        let phone = cusData ? cusData.contacts ? cusData.contacts[0].phone : "" : "";
        let customerContact = cusData?.contacts ? cusData.contacts[0] : "";
        return (
            <div className="border border-secondary font-print PrintResultExam receiptContainer">
                <div className="p-3 position-relative " id="print_Result" >
                    {resultsExam?.map((el, index) => {
                        return (
                            <div className="print_Result">
                                <div className="absolute header-from">
                                    <Row className="mb-0">
                                        <Row className="text-left">
                                            <HeaderPrint></HeaderPrint>
                                        </Row>
                                        <div className="absolute end">
                                            <canvas id={"cusBarCodeExam" + index} style={{ height: "13mm" }}></canvas>
                                        </div>
                                    </Row>
                                </div>
                                <div className=" text-center">
                                    <b>PHIẾU YÊU CẦU XÉT NGHIỆM</b>
                                </div>
                                <div className="text-center">
                                    <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                                </div>
                                <Row className="cusInfo">
                                    <Col className='asign-left'>
                                        Họ tên: <b><span className="text-uppercase font-weight-bold">{cusData.full_name}</span></b><br />
                                        <span >NS:{date.toLocaleString('en-GB').slice(0, 10)} {`(${getAge(date.toLocaleString('en-GB').slice(0, 10))})`} </span>
                                        <span className="mr-3 ">Giới tính: {cusData.gender === "male" ? " Nam" : " Nữ"}</span><br></br>
                                        SĐT:  {phone} <br></br>
                                        Địa chỉ: {addressConvert(customerContact.address)}<br></br>
                                        Phòng khoa : <b>KHOA XÉT NGHIỆM</b><br></br>
                                    </Col>
                                    <Col className='asign-right'>
                                        Người lấy mẫu : Tạ Thị Hòa   <br></br>
                                        Thời gian lấy mẫu:{convertToStrDate(ctime)}<br></br>
                                        Người nhận mẫu : {doctorInfo.full_name}<br></br>
                                        Chẩn Đoán : <b>{printDiag}</b><br></br>
                                    </Col>
                                </Row>
                                <span><b>Kết quả xét nghiệm</b></span>
                                <div className="resultDeviceExam">
                                    {el.device == NAMEDEVICE.BC2800 && <BC2800
                                        result={el}
                                        tab={tab}
                                    ></BC2800>}
                                    {el.device == NAMEDEVICE.UA66 && <UA66
                                        result={el}
                                        tab={tab}
                                    ></UA66>}
                                    {el.device == NAMEDEVICE.TEST && <Test
                                        result={el}
                                        tab={tab}
                                    ></Test>}
                                    {el.device == NAMEDEVICE.BS200E && <BS200E
                                        result={el}
                                        tab={tab}
                                    ></BS200E>}
                                    {el.device == NAMEDEVICE.OTHER && <Other
                                        result={el}
                                        tab={tab}
                                    ></Other>}
                                    {el.device == NAMEDEVICE.IMMUNE && <Immune
                                        result={el}
                                        tab={tab}
                                    ></Immune>}
                                </div>
                                {tab == 1 ?
                                    <div className="d-flex justify-content-between footer-print px-4">
                                        <div className="text-center left-footer mr-auto ml-5 ">
                                            <Signature doctorInfo={doctorInfo}></Signature>
                                        </div>
                                        <div className="text-center right-footer">
                                            <div>Bắc Ninh, Ngày {current.getDate()}, Tháng {current.getMonth() + 1}, Năm {current.getFullYear()}</div>
                                            <strong>PHÒNG XÉT NGHIỆM</strong>
                                        </div>
                                    </div>
                                    :
                                    null}

                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }

}
export default PrintResultExam;
