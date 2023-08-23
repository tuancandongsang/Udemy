import React, { Fragment, useEffect } from 'react';
import { Col, Row, Table } from 'reactstrap';
import SharedService from '../../../../Shared/Services/SharedService';
import logo from '../../../../Asset/Img/logo.png';
import { moneyToWord } from "../../../Reception/Shared/Util";
import HeaderPrint from '../../../../Shared/Components/HeaderPrint/HeaderPrint';

const PrintPharmacy = (props) => {
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    const cusData = props.cusData;
    const customerCode = cusData ? cusData.code : null;
    const current = new Date();
    let phone = cusData && cusData.contacts ? cusData.contacts[0].phone : null;
    let address = cusData && cusData.contacts ? cusData.contacts[0].address : {};
    let date = new Date(cusData ? cusData.birthday : null);
    let { etcArr, etcCode } = props;

    let rowEtcArr = etcArr ? etcArr.filter(el => !el.old).map((el, index) => {
        return (
            <Fragment>
                {el.amount > 0 ? 
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.name}</td>
                    {/* <td style={{ 'minHeight': '280px' }}>{el.attrs ? el.attrs.instruction ? el.attrs.instruction : '' : ''}</td> */}
                    <td className="end">{el.amount}</td>
                    <td className="end">{new Intl.NumberFormat('de-DE').format(el.price)}</td>
                    <td className="end">{new Intl.NumberFormat('de-DE').format(el.price * el.amount)}</td>
                </tr>
                : null}
            </Fragment>
        )
    }) : null;

    useEffect(() => {
        if (etcCode) {
            SharedService.createEtccode(etcCode, 'barCode')
        }
        if (customerCode) {
            SharedService.createCusCode(customerCode.toString())
        }
    }, [etcCode, customerCode])

    return (
        <div className="border border-secondary receiptContainer" style={{ display: 'none' }}>
            <div className="print-pharmacy medPrintId position-relative" id="medPrintId" >
                <br></br>
                <div className="PrintEtc" id="PrintEtc">
                    <Row>
                        <Col xs={8} className="absolute">
                            <Row className="text-left">
                                <HeaderPrint></HeaderPrint>
                            </Row>
                        </Col>
                        <Col xs={4}>
                            <Row>
                                <Col xs={7}>
                                    <div className="end">
                                        <canvas id="barCode" style={{ height: "13mm" }}></canvas>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className="print-pharmacy-title text-center">
                        BIÊN LAI THU TIỀN
                    </div>
                    <Row>
                        <Col xs={2}>
                            <div className="text-left">
                                <canvas id="canvasCustomer" style={{ height: "13mm" }}></canvas>
                            </div>
                        </Col>
                        <Col xs={{ size: '6', offset: '2'}}>
                            <div>
                                <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                            </div>
                        </Col>
                    </Row>
                    <div className="info-Cus">
                        <Row className="pb-5">
                            <Col sm="6">
                                Họ và tên: <b>{cusData ? cusData.full_name : null}</b>
                            </Col>
                            <Col sm="1">
                            </Col>
                            <Col sm="5">
                                Mã phiếu thu: {etcCode}
                            </Col>
                        </Row>
                        {cusData && cusData.gender ?
                            <Row className="pb-5">
                                <Col sm="6">
                                    Ngày Sinh: {date.toLocaleString('en-GB').slice(0, 10)}
                                </Col>
                                <Col sm="1">
                                </Col>
                                <Col sm="5">
                                    Giới tính:{cusData.gender === "male" ? "Nam" : cusData.gender === "female" ? "Nữ" : ""}
                                </Col>
                            </Row>
                            : null}
                        {address.street ?
                            <Row className="pb-5">
                                <Col sm='6'>
                                    Địa chỉ : {address.street ? address.street : '' + ' - ' + address.ward ? address.ward : '' + ' - '
                                        + address.district ? address.district : '' + ' - ' + address.province ? address.province : ''}
                                </Col>
                                <Col sm="1">
                                </Col>
                                <Col sm="5">
                                    Số điện thoại : {phone}
                                </Col>
                            </Row> :
                            <Row className="pb-5">
                                <Col sm="5">
                                    Số điện thoại : {phone}
                                </Col>
                            </Row>
                        }
                    </div>
                    <b align="left"><p className="pl-10">Danh sách đơn thuốc</p></b>
                    <div className="justify-content-between pl-10">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Thuốc</th>
                                    {/* <th>Hướng dẫn</th> */}
                                    <th>Số lượng</th>
                                    <th>Đơn giá</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowEtcArr}
                            </tbody>
                        </Table>
                    </div>
                    <Row>
                        <Col className="end capitalize">Tổng tiền:&ensp;<b>{new Intl.NumberFormat('de-DE').format(props.total)}VNĐ</b></Col>
                    </Row>
                    <Row>
                        <Col className="end capitalize">Viết bằng chữ: <b>{moneyToWord(props.total || 0)}</b></Col>
                    </Row>
                    <Row className="px-4 pt-20">
                        <Col xs={3} className="middle">
                            <p>Bệnh nhân</p>
                            <i>(ký, họ tên)</i>
                        </Col>
                        <Col xs={{ 'size': '3', 'offset': '6' }} className="middle">
                            <p>Người thu tiền</p><br></br>
                            <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                            <b className="mt-5">{doctorInfo.full_name}</b>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default PrintPharmacy;
