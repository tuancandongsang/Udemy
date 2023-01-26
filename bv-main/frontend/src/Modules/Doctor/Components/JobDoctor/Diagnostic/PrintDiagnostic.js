import React from 'react';
import { Row, Col, Table, } from 'reactstrap';
import { Form, ModalNoti, } from "../../../../../Shared";
import SharedService from '../../../../../Shared/Services/SharedService';
import { moneyToWord, getAge, numberWithCommas } from '../../../../Reception/Shared/Util';
import HeaderPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint';
import DoctorServices from "../../../Shared/DoctorService";
import Signature from '../../../../../Shared/Components/Signature/Signature';
import { POLICY_CODE } from '../../../../../Constances/const';
class PrintDiagnostic extends Form {
    constructor(props) {
        super(props);
        this.state = {
            cusCode: "",
        };
    }
    componentDidUpdate = () => {
        let cusData = this.props.cusData;
        if (cusData.code) {
            SharedService.createOtccode(cusData.code, "cusBarCodeExam")
        }
    }
    render() {
        let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
        const { assignedServices, job, policy } = this.props;
        let printDiag = this.props.diagnosis ? this.props.diagnosis : this.props.textDiagnosis
        const cusData = this.props.cusData;
        const current = new Date();
        let nameCus = cusData ? cusData.full_name : "";
        let cusBirthDay = cusData ? cusData.birthday : "";
        let date = new Date(cusBirthDay)
        let phone = cusData ? cusData.contacts ? cusData.contacts[0].phone : "" : "";
        let address = cusData ? cusData.contacts ? cusData.contacts[0].address : {} : {};
        const street = address.street ? `${address.street}` : '';
        const ward = address.ward ? `  -${address.ward}` : '';
        const district = address.district ? `-${address.district}` : '';
        const province = address.province ? `-${address.province}` : '';
        let total = 0;
        let totalOrigin = 0;
        let total_discount = 0;;
        let discount = 0;
        let dia_price = 0;
        let rowExam = assignedServices.map((diagnostic, index) => {
            Object.entries(policy).map(el => {
                if (diagnostic.type == el[0]) {
                    discount += (Math.floor(diagnostic.price_origin * el[1])*0.001)*1000;
                    dia_price = (Math.ceil((diagnostic.price_origin - diagnostic.price_origin * el[1]) * 0.001)) * 1000;
                }
            })
            total_discount += dia_price;
            totalOrigin += diagnostic.price_origin;
            return (
                <tr key={diagnostic.id} >
                    <td className="p-1">{index + 1}</td>
                    <td className="p-1">{diagnostic.label}</td>
                    <td className="p-1">{diagnostic.location.name.slice(5)}</td>
                    <td className="p-1">{numberWithCommas(dia_price)}</td>
                    <td className="p-1">{numberWithCommas(diagnostic.price_origin)}</td>
                </tr>
            )
        })
        
        let discount_price = (Math.floor((totalOrigin - total_discount) * 0.001)) * 1000;
        return (
            <div className="border border-secondary font-print PrintDiagnostic receiptContainer">
                <div className="p-3 position-relative print-diag" id="print-diag" >
                    <div className="examRow">
                        <div className="absolute header-from">
                            <Row className="mb-0">
                                <Row className="text-left">
                                    <HeaderPrint></HeaderPrint>
                                </Row>
                                <div className="absolute end">
                                    <canvas id="cusBarCodeExam" style={{ height: "13mm" }}></canvas>
                                </div>
                            </Row>
                        </div>
                        <div className=" text-center">
                            <b>PHIẾU YÊU CẦU XÉT NGHIỆM</b>
                        </div>
                        <div className="text-center">
                            <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                        </div>
                        <div className="infoCus">
                            Họ tên: <b><span className="text-uppercase font-weight-bold">{cusData.full_name}</span></b>
                            <span className="ml-25">NS:{date.toLocaleString('en-GB').slice(0, 10)} {`(${getAge(date.toLocaleString('en-GB').slice(0, 10))})`} </span>
                            <span className="ml-25 ">Giới: {cusData.gender === "male" ? " Nam" : " Nữ"} </span>
                            <span className="ml-25">SĐT:  {phone}</span>
                            <br />
                            <span>Địa chỉ: {`${street}${ward}${district}${province}`}</span><br></br>
                            <span className="d-block"> Chẩn Đoán : <b>{printDiag}</b></span>
                        </div>
                        <span><b>Danh sách xét nghiệm</b></span>
                        <Table bordered className="tableService">
                            <thead className="title-table headExam">
                                <tr>
                                    <th className="indexExam">#</th>
                                    <th className="examName">Tên xét nghiệm</th>
                                    <th className="examRoom">Phòng</th>
                                    <th className="examTotal">Giá KM</th>
                                    <th className="examPrice-origin">Giá gốc</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowExam}
                            </tbody>
                        </Table>
                        <Row className="mb-1">
                            <Col>Giá gốc: <span className="font-weight-bold"><b>{numberWithCommas(totalOrigin)}VNĐ</b></span></Col>
                        </Row>
                        <Row className="mb-1">
                            <Col>Tổng tiền được khuyến mãi: <span className="font-weight-bold"><b>{numberWithCommas(discount_price)}VNĐ</b></span></Col>
                        </Row>
                        <Row className="mb-1">
                            <Col>Tổng số tiền thanh toán: <span className="font-weight-bold"><b>{numberWithCommas(total_discount)}VNĐ</b></span></Col>
                        </Row>
                        <Row className="mb-1">
                            <Col>Tổng tiền thu bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(total_discount || 0)}</b></span></Col>
                        </Row>
                        <Row className="mb-1">
                            <Col>Ghi chú : ..................................</Col>
                        </Row>

                        <div className="d-flex justify-content-between footer-print px-4">
                            <div className="text-center left-footer mr-auto ml-5 ">
                                <Signature doctorInfo={doctorInfo}></Signature>
                            </div>
                            <div className="text-center right-footer">
                                <div>Bắc Ninh, Ngày {current.getDate()}, Tháng {current.getMonth() + 1}, Năm {current.getFullYear()}</div>
                                <strong>PHÒNG XÉT NGHIỆM</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default PrintDiagnostic;
