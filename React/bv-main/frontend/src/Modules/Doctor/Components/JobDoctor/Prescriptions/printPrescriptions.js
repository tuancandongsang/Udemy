import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import SharedService from '../../../../../Shared/Services/SharedService'
import HeadedPrint from '../../../../../Shared/Components/HeaderPrint/HeaderPrint'
import { ONE_DAY, PRODUCT_UNIT } from '../../../../../Constances/const';
const PrintDiagnostic = (props) => {
    const CusArr = props.CusArr ? props.CusArr : {};
    const { reExamDate } = props
    const job = props.job;
    let doctorInfo = JSON.parse(window.sessionStorage.getItem('user'));
    const textSymptom = job.state?.textSymptom;
    const textDiagnosis = job.state?.textDiagnosis;
    const cusData = job.steps ? job.steps[0].order.customer : {};
    const current = new Date();
    let phone = cusData.contacts ? cusData.contacts[0].phone : "";
    let address = cusData.contacts ? cusData.contacts[0].address : {};
    const street = address.street ? `${address.street}` : '';
    const ward = address.ward ? `  -${address.ward}` : '';
    const district = address.district ? `-${address.district}` : '';
    const province = address.province ? `-${address.province}` : '';
    let date = new Date(cusData.birthday);
    let age =  Math.floor((Date.now() - date.getTime()) / (365 * ONE_DAY)) || 0
    let { etcArr, otcArr, otcCode, etcCode } = props;
    let etcTotal = 0;
    let otcTotal = 0;
    let rowEtcArr = etcArr.filter(el => !el.old).map((el, index) => {
        etcTotal += el.total;
        return (
            <Row>
                <Col xs={{ size: '7', offset: '1'}}>
                    <div className="pb-5"><b>{index + 1}</b>/ {el.name} <b>({el.parts[0]?.name} {el.parts[0]?.quantity})</b></div>
                    <div className="pb-5"><i>{el.attrs?.instruction}</i></div>
                </Col>
                <Col xs="1">{el.quantity}</Col>
                <Col xs={{ size: '1', offset: '1'}}>
                    {PRODUCT_UNIT.map(u => {
                        if(u.code === el?.unit)
                        return <span>{u.label}</span>
                    })}
                </Col>
            </Row>
        )
    })


    let rowOtcArr = otcArr.filter(el => !el.old).map((el, index) => {
        otcTotal += el.total;
        return (
            <Row>
                <Col xs={{ size: '7', offset: '1'}}>
                    <div className="pb-5"><b>{index + 1}</b>/ {el.name} <b>({el.parts[0]?.name} {el.parts[0]?.quantity})</b></div>
                    <div className="pb-5"><i>{el.attrs.instruction}</i></div>
                </Col>
                <Col xs="1">{el.quantity}</Col>
                <Col xs={{ size: '1', offset: '1'}}>
                    {PRODUCT_UNIT.map(u => {
                        if(u.code === el?.unit)
                        return <span>{u.label}</span>
                    })}
                </Col>
            </Row>
        )
    })
    useEffect(() => {
        if (etcCode) {
            SharedService.createEtccode(etcCode, "canvasIdEtc")
        }
        if (otcCode && otcArr.length > 0) {
            SharedService.createEtccode(otcCode, "canvasIdOtc")
        }
        if (cusData.code) {
            SharedService.createEtccode(cusData.code.toString(), "canvasCusCode")
        }
        if (cusData.code && otcArr.length > 0) {
            SharedService.createEtccode(cusData.code.toString(), "canvasCusCodeOtc")
        }
    }, [etcCode, otcCode, cusData.code, CusArr.code])
    return (

        <div className="border border-secondary font-print printPrescription">
            <div className="medPrintId position-relative" id="medPrintId" >
                <br></br>
                <div className="PrintEtc" id="PrintEtc">
                    <div className="absolute">
                        <Row>
                            <Col sm="7">
                                <Row className="text-left">
                                    <HeadedPrint></HeadedPrint>
                                </Row>
                            </Col>
                            <Col xs="5">
                                <canvas id="canvasIdEtc" style={{ width: "220px", height: "15mm", marginRight: '20px' }}></canvas>
                            </Col>
                        </Row>
                    </div>
                    <h5 className="text-center font-weight-bold">
                        <b>ĐƠN THUỐC</b>
                    </h5>
                    <div className="text-center">
                        <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                    </div>
                    <br></br>
                    <div className="info-Cus">
                        <Row>
                            <Col sm="6">
                                <div className="text-left">
                                    <canvas id="canvasCusCode" style={{ height: "14mm" }}></canvas>
                                </div>
                            </Col>
                            <Col sm="1">
                            </Col>
                            <Col sm="5">
                                Mã phiếu thu: {etcCode}
                            </Col>
                        </Row>
                        <Row  className="pt-10">
                            <Col sm="4">
                                Họ tên:11111 <b>{cusData.full_name}</b>
                            </Col>
                            <Col sm="3">
                                Ngày Sinh: {date.toLocaleString('en-GB').slice(0, 10)}
                            </Col>
                            <Col sm="2">
                                Tuổi: {age}
                            </Col>
                            <Col sm="3">
                                Giới tính: {cusData.gender === "male" ? "Nam" : " Nữ"}
                            </Col>
                        </Row>
                        <Row className="pt-10">
                            <Col sm='9'>
                                Địa chỉ: {`${street}${ward}${district}${province}`}
                            </Col>
                            <Col sm="3">
                                SĐT: {phone}
                            </Col>
                        </Row>
                        <Row className="pt-10  pb-10">
                            <div>Chẩn đoán: <b>{textDiagnosis}</b></div>
                        </Row>
                    </div>
                    {/* <b align="left"><p>Danh sách đơn thuốc</p></b> */}
                    {/* <div className="justify-content-between">
                        <Table border="1" align="center">
                            <thead>
                                <th>#</th>
                                <th>Tên thuốc</th>
                                <th>Số lượng</th>
                                <th>Cách dùng</th>
                            </thead>
                            <tbody>
                                {rowEtcArr}
                            </tbody>
                        </Table>
                    </div> */}
                    <div className="order-product">
                        <Row className="pt-5">
                            <Col className="pl-20" xs={{ 'size': '6', 'offset': '2' }}><u>Thuốc điều trị</u></Col>
                            <Col xs="2"><u>Số lượng</u></Col>
                            <Col xs={2}><u>Đơn vị</u></Col>
                        </Row>
                        {rowEtcArr}
                    </div>
                    <div className="d-flex justify-content-between px-4">
                        <div>
                            <div className="pb-5 pt-30"><b>Nếu bất thường đến cơ sở y tế gần nhất.</b></div>
                            <div className="pb-5"><b>Khám lại sau : {reExamDate ? reExamDate : "....."} Ngày!</b></div>
                            <div><b>Khám lại mang theo đơn này.</b></div>
                        </div>
                        <div className="text-center mr-10">
                            <div className="text-center mr-auto ml-5 ">
                                <strong>Bác sĩ điều trị</strong><br></br>
                                <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                                <b className="mt-5">{doctorInfo.full_name}</b>
                            </div>
                        </div>
                    </div>

                </div>
                {/* <----------------------- Tách From-----------------------------> */}

                {otcArr.length > 0 ?
                    <div className={otcArr.length > 0 ? "show" : "unShow"} >
                        <div className="PrintOtc" id="PrintOtc" >
                            <div className="absolute">
                                <Row>
                                    <Col sm="7">
                                        <Row className="text-left">
                                            <HeadedPrint></HeadedPrint>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <canvas id="canvasIdOtc" style={{ width: "240px", height: "16mm", paddingRight: '20px' }}></canvas>
                                    </Col>
                                </Row>
                            </div>
                            <h5 className="text-center font-weight-bold">
                                <b>ĐƠN THUỐC BỔ SUNG</b>
                            </h5>
                            <div className="info-customer text-center">
                            </div>
                            <div className="text-center">
                                <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                            </div>
                            <br></br>
                            <div className="info-Cus">
                                <div className="text-left">
                                    <canvas id="canvasCusCodeOtc" style={{ height: "13mm" }}></canvas>
                                </div>
                                <Row>
                                    <Col sm="6">
                                        Họ và tên:111111111 <b>{cusData.full_name}</b>
                                    </Col>
                                    <Col sm="1">
                                    </Col>
                                    <Col sm="5">
                                        Mã phiếu thu: {etcCode}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        Ngày Sinh: {date.toLocaleString('en-GB').slice(0, 10)}
                                    </Col>
                                    <Col sm="1">
                                    </Col>
                                    <Col sm="5">
                                        Giới tính:{cusData.gender === "male" ? "Nam" : "Nữ"}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm='6'>
                                        Địa chỉ : {`${street}${ward}${district}${province}`}
                                    </Col>
                                    <Col sm="1">
                                    </Col>
                                    <Col sm="5">
                                        Số điện thoại : {phone}
                                    </Col>
                                </Row>
                            </div>
                            {/* <b align="left"><p>Danh sách đơn thuốc</p></b> */}
                            {/* <div className="justify-content-between">
                                <Table border="1" align="center">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tên thuốc</th>
                                            <th>Số lượng</th>
                                            <th>Cách dùng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowOtcArr}
                                    </tbody>
                                </Table>
                            </div> */}
                            <div className="order-product"> 
                                <Row className="pt-5">
                                    <Col xs={{ 'size': '7', 'offset': '1' }}><u>Thuốc điều trị</u></Col>
                                    <Col xs="4"><u>Số lượng</u></Col>
                                </Row>
                                {rowOtcArr}
                            </div>
                            <div className="d-flex justify-content-between px-4 ">
                                <div>
                                    <div className="pb-5 pt-30"><b>Nếu bất thường đến cơ sở y tế gần nhất.</b></div>
                                    <div className="pb-5"><b>Khám lại sau : {reExamDate ? reExamDate : "....."} Ngày!</b></div>
                                    <div><b>Khám lại mang theo đơn này.</b></div>
                                </div>
                                <div className="text-center mr-10">
                                    <strong>Bác sĩ điều trị</strong><br></br>
                                    <i>(ký, ghi rõ họ tên)</i> <br></br><br></br><br></br><br></br>
                                    <b className="mt-5">{doctorInfo.full_name}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                : null}

            </div>
        </div>
    )
}
export default PrintDiagnostic;
