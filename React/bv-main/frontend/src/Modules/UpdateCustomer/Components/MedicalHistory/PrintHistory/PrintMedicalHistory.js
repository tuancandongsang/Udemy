import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Button } from 'reactstrap';
import SharedService from '../../../../../Shared/Services/SharedService';
import { moneyToWord } from '../../../../Reception/Shared/Util';
import HeaderPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint';
import { ReceptionService } from '../../../Shared';
import UserServices from "../../../../Org/Shared/UserService";
import { convertToStrDate, convertToNormDate } from "../../../Shared/Util";
import { STATUS, STEP_TYPE } from '../../../../../Constances/const'
import logo from '../../../../../Asset/Img/logoPK.png';
const PrintMedicalHistory = (props) => {
    const [customer, setCustomer] = useState({});
    const [doctorInfo, setDoctorInfo] = useState({});
    let { item, submidPrint, tab,itemCkecked} = props;
    const step = item ? item.steps ? item.steps : [] : [];
    const infoCm = item ? item.ref_value : {};
    const nameCm = infoCm ? infoCm.full_name : "";
    const birthdayCm = infoCm ? infoCm.birthday : "";
    const genderCm = infoCm ? infoCm.gender : "";
    const customerCode = infoCm ? infoCm.code : "";
    let customerPhone = customer ? customer.contacts ? customer.contacts[0].phone : "" : "";
    let address = customer ? customer.contacts ? customer.contacts[0].address : {} : {};
    const street = address.street ? `${address.street}` : '';
    const ward = address.ward ? `  -${address.ward}` : '';
    const district = address.district ? `-${address.district}` : '';
    const province = address.province ? `-${address.province}` : '';
    useEffect(async () => {
        if (props.itemCkecked[0].created_by) {
            UserServices.getEditUser(props.itemCkecked[0].created_by).then(res => {
                setDoctorInfo(res.data)
            })
        }
        if (customerCode) {
            ReceptionService.getCmbyCode(customerCode).then(res => {
                setCustomer(res.data)
            })

        }
        if (tab == "1") {
            await itemCkecked.map((el, index) => {
                SharedService.createEtccode(customerCode.toString(), "customerCode" + index)
            })
        }
        else {
            SharedService.createEtccode(customerCode, "customerCodeSub")
        }
    }, [customerCode])
    let origin_total_all = 0;
    let totalPriceAll = 0;
    let discount_price_All = 0;
    const serviceList = step.filter(e => e.status !== STATUS.CANCEL && e.type !== STEP_TYPE.BUY).map(el => el.order.items.filter(e => e.quantity > 0).map(el => {
        origin_total_all += el.origin_price
        totalPriceAll += el.price
        discount_price_All = origin_total_all - totalPriceAll;
        return el.ref_value.name
    }
    ).join(",")).join(",")
    const current = new Date(props.itemCkecked[0]?.ctime);
    return (
        <Fragment>
            <div className="d-flex justify-content-center font-print mt-3">
                <div className="border border-secondary historyMedicalPrint">
                    <div className="p-2 position-relative" id="historyMedicalPrint">
                        {
                            tab == "1" ?
                            itemCkecked?.filter(e=> e.status != STATUS.CANCEL && e.type != STEP_TYPE.BUY).map((el, index) => {
                                    let totalPrice = 0;
                                    let origin_total = 0;
                                    el.order.items.filter(e => e.quantity > 0).map(ev => totalPrice += parseInt(ev.price))
                                    el.order.items.filter(e => e.quantity > 0).map(e => origin_total += e.origin_price)
                                    let discount_price = parseInt(origin_total) - parseInt(totalPrice);
                                    return (
                                        <div className="receiptFromPrint">
                                            <div className="absolute">
                                                <div className="text-right">
                                                    <canvas id={"customerCode" + index} style={{ height: "13mm" }}></canvas>
                                                </div>
                                            </div>
                                            <div className='background-logoUp'>
                                                <img alt="logo" src={logo} style={{ width: 700 }, { height: 400 }} ></img>
                                            </div>
                                            <HeaderPrint></HeaderPrint>
                                            <h4 className="text-center font-weight-bold mb-0">
                                                <b>BIÊN LAI THU TIỀN</b>
                                            </h4>
                                            <div className="text-center">
                                                <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                                            </div>
                                            <div className="d-block">
                                                Họ tên: <b><span className="text-uppercase font-weight-bold">{nameCm}</span></b>
                                                <span className="ml-25">NS:  {convertToStrDate(birthdayCm)}</span>
                                                <span className="ml-25 ">Giới: {genderCm === "male" ? " Nam" : " Nữ"} </span>
                                                <span className="ml-25">SĐT:  {customerPhone}</span>
                                                <br />
                                                <span>Địa chỉ: {`${street}${ward}${district}${province}`}</span>
                                            </div>
                                            <div className="d-flex justify-content-between f-flex">
                                                <div>
                                                    Dịch vụ :<b style={{ fontSize: "13px" }}> {el.order.items.filter(e => e.quantity > 0).map(el => el.ref_value.name).join(",")}
                                                    </b>
                                                    <br></br>
                                                    Giá gốc : <span className="font-weight-bold"><b>{new Intl.NumberFormat('de-DE').format(origin_total)} VNĐ</b></span>
                                                    <span className="font-weight-bold ml-20 "> Tổng tiền khuyến mãi:
                                                        <b className="d-inline discount_price">{new Intl.NumberFormat('de-DE').format(discount_price)} VNĐ   </b></span><br></br>
                                                    <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format(totalPrice)} VNĐ </b></span><br></br>
                                                    Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPrice || 0)}</b></span>
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
                                                    <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                                    <b className="mt-5">{doctorInfo.full_name}</b>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className="receiptFromPrint">
                                    <div className="absolute">
                                        <div className="text-right">
                                            <canvas id="customerCodeSub" style={{ height: "13mm" }}></canvas>
                                        </div>
                                    </div>
                                    <HeaderPrint></HeaderPrint>
                                    <h4 className="text-center font-weight-bold mb-0">
                                        <b>BIÊN LAI THU TIỀN</b>
                                    </h4>
                                    <div className='background-logoUp'>
                                            <img alt="logo" src={logo} style={{ width: 700 }, { height: 400 }} ></img>
                                    </div>
                                    <div className="text-center">
                                        <i>{current.getHours()} giờ {current.getMinutes()} phút,Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                                    </div>
                                    <div className="d-block">
                                        Họ tên: <b><span className="text-uppercase font-weight-bold">{nameCm}</span></b>
                                        <span className="ml-25">NS:  {convertToStrDate(birthdayCm)}</span>
                                        <span className="ml-25 ">Giới: {genderCm === "male" ? " Nam" : " Nữ"} </span>
                                        <span className="ml-25">SĐT:  {customerPhone}</span>
                                        <br />
                                        <span>Địa chỉ: {`${street}${ward}${district}${province}`}</span>
                                    </div>
                                    <div className="d-flex justify-content-between f-flex">
                                        <div>
                                            Dịch vụ :<b style={{ fontSize: "13px" }}>
                                                {serviceList}
                                                {/* {step.filter(e=> e.status != STATUS.NEW ||  e.status != STATUS.CANCEL|| e.type != STEP_TYPE.BUY).map(el => el.order.items.filter(e => e.quantity > 0).map(el => el.ref_value.name).join(",")).join(",")} */}
                                            </b>
                                            <br></br>
                                            Giá gốc : <span className="font-weight-bold"><b>{new Intl.NumberFormat('de-DE').format(origin_total_all)} VNĐ</b></span>
                                            <span className="font-weight-bold ml-20 "> Tổng tiền khuyến mãi:
                                                <b className="d-inline discount_price">{new Intl.NumberFormat('de-DE').format(discount_price_All)} VNĐ   </b></span><br></br>
                                            <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format(totalPriceAll)} VNĐ </b></span><br></br>
                                            Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPriceAll || 0)}</b></span>
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
                                            <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                            <b className="mt-5">{doctorInfo.full_name}</b>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default PrintMedicalHistory;