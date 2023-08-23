import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { Table, Col } from 'reactstrap';
import NumberFormat from 'react-number-format';
import printJS from 'print-js';
import { moneyToWord, numberWithCommas, ReceptionService, convertToStrDate } from '../../Shared';
import { splitRegion } from '../../../../Constances/const';
import { Button } from 'reactstrap';
import SharedService from '../../../../Shared/Services/SharedService'
import { useParams } from 'react-router-dom'
import HeaderPrint from '../../../../Shared/Components/HeaderPrint/HeaderPrint';
import { getAge } from '../../../../Modules/Reception/Shared/Util';
import { ONE_DAY } from '../../../../Constances/const';
import logo from '../../../../Asset/Img/logoPK.png';
const ReceiptPrintingReview = (props) => {
    const [contact, setContact] = useState({})
    const [receiptData, setReceiptData] = useState({})
    const [addressForm, setAddressForm] = useState([])
    const [sumOrigin, setSumOrigin] = useState([])
    const [sum, setSum] = useState(0)
    const [age, setAge] = useState()
    const [datePos, setDatePos] = useState()
    const [location, setLocation] = useState()
    const customer = receiptData.ref_value || {}
    // console.log(receiptData, sum, 'data in neeeeeeeeeeeeeee');
    const customerCode = customer.code
    const locationName = receiptData.steps?.[0].location.name
    const total = (receiptData.steps?.[0].order.total)
    const roundTotal = Math.round(total / 1000) * 1000
    const receiptId = receiptData.steps?.[0].code
    const current = new Date(receiptData.steps?.[0].ctime)
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    const { id } = useParams()
    // const sumOrigin =  receiptData.step?.[0].order.items.map(e=>e.ref_value)
    //fetch data examination form
    useEffect(() => {
        let today = Date.now();
        let cBirthday = new Date(customer.birthday).getTime()
        let age = Math.floor((today - cBirthday) / (365 * ONE_DAY))
        if (age > 1) {
            setAge(age + ' tuổi')
        } else if (age == 0) {
            setAge(Math.floor((today - cBirthday) / (7 * ONE_DAY)) + ' tuần')
        }
    }, [customer])
    useEffect(() => {
        ReceptionService.getJobById(id).then(res => {
            let receiptData = res.data
            setReceiptData(receiptData)
            setDatePos(receiptData.date_pos)
            setLocation(receiptData.steps?.[0].location.name)
            let s = 0
            res.data.steps[0].order.items.forEach(e => {
                s += e.ref_value.origin_price
            })
            setSum(s)
            //fetch contact data
            ReceptionService.getCmbyCode(receiptData.ref_value.code).then(res => {
                let customer = res.data
                let contact = {}
                if (customer.contacts.length) contact = customer.contacts[0]
                setContact(contact)
                let addressForm = `${contact.address.street} - ${splitRegion(contact.address.ward)} - ${splitRegion(contact.address.district)} - ${splitRegion(contact.address.province)}`;
                if (contact.address.province.length > 0) { setAddressForm(addressForm) }
            }).catch(err => {
                console.log(err)
            })
        })
    }, [id])
    useEffect(() => {
        if (receiptId) {
            SharedService.createEtccode(receiptId, "receipId")
            SharedService.createEtccode(receiptId, "receipIdSub")
        }
        if (customerCode) {
            SharedService.createEtccode(customerCode.toString(), "customerCode")
            SharedService.createEtccode(customerCode.toString(), "customerCodeSub")
        }

    }, [receiptId, customerCode])


    return (
        <Fragment>
            
            <div className="d-flex justify-content-center mt-3">
                <div className="p-2 border border-secondary examReceiptContainer">
                    <div className="position-relative" id="receiptPrint">
                        <div className="receiptFromPrint">
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="receipId" style={{ height: "13mm" }}></canvas>
                                </div>
                            </div>
                            <HeaderPrint></HeaderPrint>
                            <div className="text-left-print">
                                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '300px', fontWeight: '700' }}>
                                    BIÊN LAI THU TIỀN
                                </div>
                                Liên 1: Lưu tại quầy
                                <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()} {current.getHours()} giờ {current.getMinutes()} phút </i>
                                <canvas id="customerCode" style={{ height: "13mm", width: '5cm', position: 'relative', bottom: '2cm', right: '240px' }}></canvas>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Col sm={5}>
                                    Tên: <b><span className="text-uppercase font-weight-bold">{customer.full_name}</span></b><br />
                                </Col>
                                <Col sm={3}>
                                    <span >NS: {convertToStrDate(customer.birthday)} ({age})</span>

                                </Col>
                                <Col sm={2} style={{ paddingLeft: '3px' }}>
                                    <span >GT: {customer.gender === "male" ? 'Nam' : 'Nữ'} </span>
                                </Col>
                                <Col sm={2}>
                                    ĐT:  {contact.phone}
                                </Col>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Col sm={12}>
                                    ĐC: {addressForm}
                                </Col>

                            </div>
                            <div>

                                Dịch vụ khám :{receiptData.steps?.[0].order.items.map((item) => {
                                    return item.ref_value.name + ', '
                                })
                                }

                                <div style={{ display: 'flex' }}>
                                    <Col sm={7} >
                                        Giá gốc: <b><span className="font-weight-bold">{numberWithCommas(sum || 0)} đồng</span></b> <br></br>
                                        Số tiền được khuyến mãi <span className="font-weight-bold"><b>{numberWithCommas(sum - roundTotal || 0)} đồng</b></span><br></br>
                                        Tổng số tiền thanh toán : <b><span className="font-weight-bold">{numberWithCommas(roundTotal || 0)} đồng</span></b> <br></br>
                                        Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(roundTotal || 0)}</b></span>
                                    </Col>
                                    <Col sm={5} className='date-pos'>
                                        <div>Số thứ tự :<b>{datePos}</b></div>
                                        <div>{location}</div>
                                    </Col>
                                </div>


                            </div>
                            <div className="d-flex ">
                                <Col sm={1} >
                                </Col>
                                <Col sm={5} >
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </Col>
                                <Col sm={1} >
                                </Col>
                                <Col sm={5}     >
                                    <strong>Người thu tiền</strong><br></br>
                                    <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                    <b className="mt-5">{doctorInfo.full_name}</b>
                                </Col>
                            </div>
                        </div>

                        {/* -----------------Ngăn from in------------------------------------------------------------ */}
                        <div className="receiptFromPrint">
                            <br></br>
                            <div className="absolute">
                                <div className="text-right">
                                    <canvas id="receipIdSub" style={{ height: "13mm" }}></canvas>
                                </div>

                            </div>
                            <HeaderPrint></HeaderPrint>
                            <div className='text-left-print'>
                                <div style={{ display: 'flex', justifyContent: 'center', minWidth: '300px', fontWeight: '700' }}>
                                    BIÊN LAI THU TIỀN
                                    
                                </div>
                                Liên 2 : Giao cho bệnh nhân
                                <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()} {current.getHours()} giờ {current.getMinutes()} phút </i>
                                <canvas id="customerCodeSub" style={{ height: "13mm", width: '5cm', position: 'relative', bottom: '2cm', right: '240px' }}></canvas>
                            </div>
                                <div style={{ display: 'flex' }}>
                                <Col sm={5}>
                                    Tên: <b><span className="text-uppercase font-weight-bold">{customer.full_name}</span></b><br />
                                </Col>
                                <Col sm={3}>
                                    <span >NS: {convertToStrDate(customer.birthday)} ({age})</span>

                                </Col>
                                <Col sm={2} style={{ paddingLeft: '3px' }}>
                                    <span >GT: {customer.gender === "male" ? 'Nam' : 'Nữ'} </span>
                                </Col>
                                <Col sm={2}>
                                    ĐT:  {contact.phone}
                                </Col>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <Col sm={12}>
                                    ĐC: {addressForm}
                                </Col>

                            </div>
                            <div>

                                Dịch vụ khám :{receiptData.steps?.[0].order.items.map((item) => {
                                    return item.ref_value.name + ', '
                                })
                                }

                                <div style={{ display: 'flex' }}>
                                    <Col sm={7} >
                                        Giá gốc: <b><span className="font-weight-bold">{numberWithCommas(sum || 0)} đồng</span></b> <br></br>
                                        Số tiền được khuyến mãi <span className="font-weight-bold"><b>{numberWithCommas(sum - roundTotal || 0)} đồng</b></span><br></br>
                                        Tổng số tiền thanh toán : <b><span className="font-weight-bold">{numberWithCommas(roundTotal || 0)} đồng</span></b> <br></br>
                                        Viết bằng chữ: <span className="font-weight-bold"><b>{moneyToWord(roundTotal || 0)}</b></span>
                                    </Col>
                                    <Col sm={5} className='date-pos'>
                                        <div>Số thứ tự :<b>{datePos}</b></div>
                                        <div>{location}</div>
                                    </Col>
                                </div>


                            </div>
                            <div className="d-flex ">
                                <Col sm={1} >
                                </Col>
                                <Col sm={5} >
                                    <b>Người nộp tiền</b><br></br>
                                    <i>(ký, họ tên)</i>
                                </Col>
                                <Col sm={1} >
                                </Col>
                                <Col sm={5}     >
                                    <strong>Người thu tiền</strong><br></br>
                                    <i className="mb-2">(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br>
                                    <b className="mt-5">{doctorInfo.full_name}</b>
                                </Col>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center ">
                <div className="sizeDiv d-flex justify-content-end mt-3 tt">
                    <Button className="make-bill" color="primary" onClick={() => {
                        printJS({
                            printable: 'receiptPrint',
                            type: 'html',
                            targetStyles: ['*'],
                            style: `@page {
                                size: Letter landscape;
                              }`,
                            header: null,
                            footer: null,
                        });
                        window.history.back()
                    }}>Tạo phiếu in</Button>
                </div>
            </div>
        </Fragment>
    );
}

export default ReceiptPrintingReview;