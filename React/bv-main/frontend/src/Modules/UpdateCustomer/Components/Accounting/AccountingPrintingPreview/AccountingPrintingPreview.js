import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Button } from 'reactstrap';
import SharedService from '../../../../../Shared/Services/SharedService'
import { moneyToWord, getAge, convertToStrDate } from '../../../../Reception/Shared/Util'
import logo from '../../../../../Asset/Img/logo.png';
import HeaderPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint'

const AccountingPrintingPreview = (props) => {
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    let { data } = props;
    let items = props.items ? props.items : [];
    let { date_pos, customerAddress, customerPhone } = props;
    const { customerName, nameService, customerBirthday, totalPrice, customerGender } = data;
    let customerCode = data ? data.customerCode.value : " ";
    const current = new Date();
    useEffect(() => {
        if (customerCode) {
            SharedService.createEtccode(customerCode, "cmCode")
            SharedService.createOtccode(customerCode, "cmCodeSub")
        }
    }, [customerCode])
    let origin_total = 0;
    items.filter(el => el.quantity > 0).map(el => {
        origin_total += el.origin_price
    })
    let discount_price = 0;
    discount_price = parseInt(origin_total) - parseInt(totalPrice.value);
    return (
        <Fragment>
            <div className="d-flex justify-content-center font-print mt-3">
                <div className="border border-secondary AccountingPrintingPreview" 
                style={{ display: "none" }}
                >
                    <div className="p-2 position-relative" id="transactionPrint">
                        <div className="receiptFromPrint">
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="cmCode" style={{ height: "13mm" }}></canvas>
                                </div>
                            </div>
                            <HeaderPrint></HeaderPrint>
                            <h4 className="text-center font-weight-bold">
                                <b>BIÊN LAI THU TIỀN</b>
                            </h4>
                            <div className="text-center">
                                Liên 1 : Lưu tại quầy
                            </div>
                            <div className="text-center">
                                <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                            </div>
                            <div className="d-block">
                                Họ tên: <b><span className="text-uppercase font-weight-bold">{customerName.value}</span></b>
                                <span className="ml-15">NS:  {convertToStrDate(customerBirthday.value)} {`(${getAge(convertToStrDate(customerBirthday.value))})`}</span>
                                <span className="ml-15 ">GT: {customerGender.value === "male" ? " Nam" : " Nữ"} </span>
                                <span className="ml-15">SĐT:  {customerPhone}</span>
                                <br />
                                <span>Địa chỉ: {customerAddress}</span>
                            </div>
                            <div className="d-flex justify-content-between f-flex">
                                <div>
                                    Dịch vụ :<b style={{ fontSize: "13px" }}> {items.filter(e => e.quantity > 0).length <=3 ? items.map(el => el.ref_value.name).join(", ") :
                                    `${items[0].ref_value.name}, ${items[1].ref_value.name}, ${items[2].ref_value.name}, ..... , ${[...items].pop().ref_value.name}.` 
                                    }
                                    </b>
                                    <br></br>
                                    Giá gốc : <b><span className="font-weight-bold">{new Intl.NumberFormat('de-DE').format(origin_total)} VNĐ</span></b>
                                    <span className="font-weight-bold ml-10"> Tổng tiền khuyến mãi: <b>{new Intl.NumberFormat('de-DE').format(discount_price)} VNĐ</b> </span><br></br>
                                    <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format(totalPrice.value)} VNĐ</b> </span><br></br>
                                    Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPrice.value || 0)}</b></span> <br></br>
                                    <span>Ngày trả kết quả :..giờ...phút, ngày...tháng...năm 2022 <br></br>
                                    (Lưu ý mang theo biên lai khi đi nhận kết quả)</span>
                                </div>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between px-1 ">
                                <div className="text-center mr-auto ml-5 nt">
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </div>
                                <div className="text-center mr-5 tt">
                                    <strong>Người thu tiền</strong><br></br>
                                    <i>(ký, ghi rõ họ tên)</i> <br></br><br></br>
                                    <b>{doctorInfo.full_name}</b>
                                </div>
                            </div>
                        </div>

                        {/* -----------------Ngăn from in------------------------------------------------------------ */}
                        <div className="receiptFromPrint">
                            <br></br>
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="cmCodeSub" style={{ height: "13mm" }}></canvas>
                                </div>
                            </div>
                            <HeaderPrint></HeaderPrint>
                            <h4 className="text-center font-weight-bold">
                                <b>BIÊN LAI THU TIỀN</b>
                            </h4>
                            <div className="text-center">
                                Liên 2 : Giao cho bệnh nhân
                            </div>
                            <div className="text-center">
                                <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                            </div>
                            <div className="d-block">
                                Họ tên: <b><span className="text-uppercase font-weight-bold">{customerName.value}</span></b>
                                <span className="ml-15">NS:  {convertToStrDate(customerBirthday.value)} {`(${getAge(convertToStrDate(customerBirthday.value))})`}</span>
                                <span className="ml-15 ">GT: {customerGender.value === "male" ? " Nam" : " Nữ"} </span>
                                <span className="ml-15">SĐT:  {customerPhone}</span>
                                <br />
                                <span>Địa chỉ: {customerAddress}</span>
                            </div>
                            <div className="d-flex justify-content-between f-flex">
                                <div>
                                    Dịch vụ :<b style={{ fontSize: "13px" }}> {items.filter(e => e.quantity > 0).length <=3 ? items.map(el => el.ref_value.name).join(", ") :
                                    `${items[0].ref_value.name}, ${items[1].ref_value.name}, ${items[2].ref_value.name}, ..... , ${[...items].pop().ref_value.name}.` 
                                    }
                                    </b>
                                    <br></br>
                                    Giá gốc : <b><span className="font-weight-bold">{new Intl.NumberFormat('de-DE').format(origin_total)} VNĐ</span></b>
                                    <span className="font-weight-bold ml-10"> Tổng tiền khuyến mãi: <b>{new Intl.NumberFormat('de-DE').format(discount_price)} VNĐ</b> </span><br></br>{" "}
                                    <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format(totalPrice.value)} VNĐ</b> </span><br></br>
                                    Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPrice.value || 0)}</b></span><br></br>
                                    <span>Ngày trả kết quả :..giờ...phút, ngày...tháng...năm 2022 <br></br>
                                    (Lưu ý mang theo biên lai khi đi nhận kết quả)</span>
                                </div>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between px-1 ">
                                <div className="text-center mr-auto ml-5 nt">
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </div>
                                <div className="text-center mr-5 tt">
                                    <strong>Người thu tiền</strong><br></br>
                                    <i>(ký, ghi rõ họ tên)</i> <br></br><br></br>
                                    <b>{doctorInfo.full_name}</b>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default AccountingPrintingPreview;