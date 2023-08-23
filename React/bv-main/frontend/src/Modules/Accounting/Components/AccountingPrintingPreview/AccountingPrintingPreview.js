import React, { useEffect, Fragment,useState } from 'react';
import SharedService from '../../../../Shared/Services/SharedService'
import { moneyToWord, getAge, convertToStrDate } from '../../../Reception/Shared/Util'
import HeaderPrint from '../../../../Shared/Components/HeaderPrint/HeaderPrint';
import logo from '../../../../Asset/Img/logoPK.png';
// import "./AccountingPrintingPreview.scss"
const AccountingPrintingPreview = (props) => {
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    let { data } = props;
    let items = props.items ? props.items : [];
    let { customerAddress, customerPhone } = props;
    const { customerName, customerBirthday, totalPrice, customerGender } = data;
    let customerCode = data ? data.customerCode.value : " ";
    const current = new Date();
    const [signature,setSignature]=useState('')
    const [receptionAcc,setReceptionAcc] = useState('')
    const [heightPaperA5,setHeightPaperA5] = useState('')
    const [signature1,setSignature1]=useState('')
    const [receptionAcc1,setReceptionAcc1] = useState('')
    useEffect(() => {
        if (customerCode) {
            SharedService.createEtccode(customerCode.toString(), "customerCode")
            SharedService.createEtccode(customerCode, "customerCodeSub")
        }
    }, [customerCode])
    let origin_total = 0;
    items.filter(el => el.quantity > 0).map(el => {
        origin_total += el.origin_price
    })
    let discount_price = 0;
    discount_price = parseInt(origin_total) - parseInt(totalPrice.value);
    useEffect(() => {
            if(items.filter(el => el.quantity > 0).length>18){
                setSignature('signatureAcc')
                setReceptionAcc('receptionAcc')
                setHeightPaperA5('heightPaperA5Acc')
                setSignature1('signatureAccTab2')
                setReceptionAcc1('receptionAccTab2')
            }else{
                setSignature('signatureAccAbsolute')
                setReceptionAcc('receptionAccAbsolute')
                setHeightPaperA5('heightPaperAccAbsolute')
                setSignature1('signatureAccTab2Absolute')
                setReceptionAcc1('receptionAccTab2Absolute')
            }
    },[items])
    return (
        <Fragment>
            <div className="d-flex justify-content-center font-print mt-3">
                <div className="border border-secondary AccountingPrintingPreview"
                 style={{ display: "none" }}
                >
                    <div className="p-2 position-relative" id="transactionPrint">
                        <div className={`${heightPaperA5} receiptFromPrint`}>
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="customerCode" style={{ height: "13mm" }}></canvas>
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
                                Họ tên: <b><span className="text-uppercase font-weight-bold" >{customerName.value}</span></b>
                                <span className="ml-5">NS:  {convertToStrDate(customerBirthday.value)} {`(${getAge(convertToStrDate(customerBirthday.value))})`}</span>
                                <span className="ml-5 ">GT: {customerGender.value === "male" ? " Nam" : " Nữ"} </span>
                                <span className="ml-5">SĐT:  {customerPhone}</span>
                                <br />
                                <span>Địa chỉ: {customerAddress}</span>
                            </div>
                            <div className="d-flex justify-content-between f-flex">
                                <div style={{width:'100%'}}>
                                    Dịch vụ :
                                    <b style={{ fontSize: "17px" }}> 
                                    {/* {items.filter(e => e.quantity > 0).map(el => el.ref_value.name).join(",")} */}
                                    {items.filter((e)=>e.quantity>0).map((el)=>(
                                        <div style={{display: "flex", position: "relative"}}>
                                        <p style={{marginBottom:'0',width:'60%'}} >{el.ref_value.name}</p>
                                            <p style={{marginBottom:'0', width:'25%',marginLeft:'15px'}}>Số lượng: {el.quantity}</p>
                                            <input style={{position:'absolute',top:'4px',right:'50px',  transform: 'scale(1.85)'}}type="checkbox"/>
                                        </div>
                                        ))}
                                    </b>
                                    <br></br>
                                    Giá gốc : <b><span className="font-weight-bold">{new Intl.NumberFormat('de-DE').format(origin_total)} VNĐ</span></b><br></br>
                                    <span className="font-weight-bold"> Tổng tiền khuyến mãi: <b>{new Intl.NumberFormat('de-DE').format((Math.floor(discount_price * 0.001) * 1000))} VNĐ</b> </span><br></br>{" "}
                                    <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format((Math.ceil(totalPrice.value * 0.001)) * 1000)} VNĐ</b> </span><br></br>  Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPrice.value || 0)}</b></span>
                                </div>
                            </div>
                            <br></br>
                            <div className={`d-flex justify-content-between px-1`}>
                                <div className={`text-center mr-auto ml-5 nt ${signature}`}>
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </div>
                                <div className={`text-center mr-5 tt ${receptionAcc}`}>
                                    <strong>Người thu tiền</strong><br></br>
                                    <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                    <b className="mt-5">{doctorInfo.full_name}</b>
                                </div>
                            </div>
                        </div>

                        {/* -----------------Ngăn from in------------------------------------------------------------ */}
                        <div className={`${heightPaperA5} receiptFromPrint`}>
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="customerCodeSub" style={{ height: "13mm" }}></canvas>
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
                                <span className="ml-10">NS:  {convertToStrDate(customerBirthday.value)} {`(${getAge(convertToStrDate(customerBirthday.value))})`}</span>
                                <span className="ml-10 ">GT: {customerGender.value === "male" ? " Nam" : " Nữ"} </span>
                                <span className="ml-10">SĐT:  {customerPhone}</span>
                                <br />
                                <span>Địa chỉ: {customerAddress}</span>
                            </div>
                            <div className="d-flex justify-content-between f-flex">
                                <div style={{width:'100%'}}>
                                    Dịch vụ :<b style={{ fontSize: "17px" }}>
                                     {/* {items.filter(e => e.quantity > 0).map(el => el.ref_value.name).join(", ")} */}
                                     {items.filter((e)=>e.quantity>0).map((el)=>(
                                        <div style={{display: "flex", position: "relative"}}>
                                        <p style={{marginBottom:'0',width:'60%'}} >{el.ref_value.name}</p>
                                            <p style={{marginBottom:'0', width:'25%',marginLeft:'15px'}}>Số lượng: {el.quantity}</p>
                                            <input style={{position:'absolute',top:'4px',right:'50px',  transform: 'scale(1.85)'}}type="checkbox"/>
                                        </div>
                                        ))}
                                    </b>
                                    <br></br>
                                    Giá gốc : <b><span className="font-weight-bold">{new Intl.NumberFormat('de-DE').format(origin_total)} VNĐ</span></b>
                                    <br></br>
                                    <span className="font-weight-bold"> Tổng tiền khuyến mãi: <b>{new Intl.NumberFormat('de-DE').format((Math.floor(discount_price * 0.001) * 1000))} VNĐ</b> </span><br></br>{" "}
                                    <span className="font-weight-bold"> Tổng số tiền thanh toán: <b>{new Intl.NumberFormat('de-DE').format((Math.ceil(totalPrice.value * 0.001)) * 1000)} VNĐ</b> </span><br></br>
                                    Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(totalPrice.value || 0)}</b></span>
                                </div>
                            </div>
                            <br></br>
                            <div className="d-flex justify-content-between px-1">
                            <div className={`text-center mr-auto ml-5 nt ${signature1}`}>
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </div>
                                <div className={`text-center mr-5 tt ${receptionAcc1}`}>
                                    <strong>Người thu tiền</strong><br></br>
                                    <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                    <b className="mt-5">{doctorInfo.full_name}</b>
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