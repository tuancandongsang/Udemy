import React from 'react';
import { Col, Row, Table } from 'reactstrap';
import SharedService from '../../../../../Shared/Services/SharedService';
import HeadedPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint';
import { ONE_DAY, PRODUCT_UNIT } from '../../../../../Constances/const';
import Signature from '../../../../../Shared/Components/Signature/Signature';
import instance from '../../../Shared/DoctorService';
import {ModalNoti}  from '../../../../../Shared';
export class PrintPreHis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorInfo: [],
        }
    }
    componentDidMount() {
        SharedService.getDoctor().then(res => {
            this.setState({
                doctorInfo: res.data,
            })
        }).catch(err => {
            console.log(err);
        })
    }
    componentDidUpdate(preProps) {
        let { cusData} = this.props;
        if(Object.keys(cusData) === 0) {
            this.setState({
                message:"nqojwieud"
            })
        }
        else {
            if (preProps.cusData !== cusData && cusData.code)  {
                SharedService.createEtccode(cusData.code.toString(), "canvasCusEtc")
            }
        }
    }
    render() {
       
        let { cusData, reExamDate, jobStep,diagnosis } = this.props;
        const { doctorInfo } = this.state
        let phone = cusData && cusData.contacts ? cusData.contacts[0].phone : null;
        let address = cusData && cusData.contacts ? cusData.contacts[0].address : {};
        let date = new Date(cusData ? cusData.birthday : null);
        let dateCreate = new Date((jobStep && jobStep.ctime) ? jobStep.ctime : '').toLocaleString('en-GB')
        let notice = "";
        let signature = "";
        let doctor = doctorInfo.find(el => el.id === jobStep?.created_by)
        let age = Math.floor((Date.now() - date.getTime()) / (365 * ONE_DAY)) || 0;
        let rowEtcArr = jobStep?.order?.items?.map((el, index) => {
            if(jobStep?.order?.items?.length >= 8) {
                notice = "notice";
                signature="signature"
              }
              else {
                notice = "";
                signature="" ;
              }
            return (
                <div className="pt-0 mb-1">
                    <ModalNoti message = {this.state.message}/>
                    <Row className="item-product ">
                        <Col xs={{ size: '7' }}>
                            <div className="title-product"><b>{index + 1}</b>/ {el?.ref_value?.name} 
                            <b className="fontsz-13">({el?.ref_value?.parts[0]?.name} {el?.ref_value?.parts[0]?.quantity})</b>
                            </div>
                        </Col>
                        <Col className="pl-60" xs="1">{el.quantity}</Col>
                        <Col className="pl-25" xs={{ size: '1', offset: '1' }}>
                            {PRODUCT_UNIT.map(u => {
                                if (u.code === el.ref_value?.unit)
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
        });
        return (
            <div className="PrintPreHis receiptContainer" >
                <div className="print-pharmacy PrintPreHis position-relative" id="PrintPreHis" >
                    <div className="pl-30 pr-15 pb-20 PrintEtc" id="PrintEtc">
                        <Row className="pt-20 header-print">
                            <div className="print-w-60 absolute">
                                <HeadedPrint />
                            </div>
                            <div hidden className="print-w-40">
                                <canvas id="canvasCusEtc" style={{ height: "13mm", marginRight: '20px' }}></canvas>
                            </div>
                        </Row>
                        <div className="text-center print-title">
                            ĐƠN THUỐC
                        </div>
                        <div className="text-center">
                            <i>Thời gian tạo: {dateCreate}</i>
                        </div>
                        <div className="info-cus" >
                            <div className="print-mw-30 name-print">
                                Họ tên: <b>{cusData?.full_name}</b>
                            </div>
                            <div className="birthday-print">
                                {age} tuổi
                            </div>
                            {cusData && cusData.gender ?
                                <div className="gender-print">
                                Giới: {cusData.gender === "male" ? "Nam" : cusData.gender === "female" ? "Nữ" : ""}
                                </div> 
                                : <div className="gender-print"></div>}
                        </div>

                        <div className="info-cus pb-5">
                            <div className="address-print">
                                Địa chỉ : {address?.street} - {address?.ward} - {address?.district}
                            </div>
                            <div className="pl-10 phone-print">
                                ĐT : {phone}
                            </div>
                        </div>
                        <div className="fontsz-17">Chẩn đoán: <b>{diagnosis}</b></div>
                        <div className="order-product">
                            <Row className="pt-5 title-order fontsz-14">
                                <Col xs={{ 'size': '6', 'offset': '1' }}><u>Thuốc điều trị</u></Col>
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
                                        <Signature doctorInfo={doctor}></Signature>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}