import { Row, Col, Table, FormGroup, Button, Input, Spinner } from "reactstrap";
import Select from 'react-select';
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERVICE_TYPE_VN, INTERVAL_REPORT, splitRegion } from "../../../../Constances/const";
import { ModalNoti, moneyToWord } from "../../Shared";
import ServiceService from "../../../Service/Shared/ServiceService";
import TransactionService from '../../Shared/TransactionService';
import { Pagination } from "../../../../Shared/Components/Pagination/Pagination";
import { Util } from "../../../../Helper/Util";
import { ExportFile } from "../../../../Shared/Components/ExportFile/ExportFile";
import { convertToStrDate, getAge } from "../../../Reception/Shared/Util";

const TIME_RANGE = {
    MONTH: "month",
    DAY: "day"
}
const TOTAL = "total";
const EMPTY_STRING = "";

const ReportFormByType = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [selectService, setSelectService] = useState({ value: EMPTY_STRING, label: "Chọn dịch vụ" });
    const [selectTime, setSelectTime] = useState({ value: TIME_RANGE.MONTH, label: "Tháng" });
    const [notiMessage, setNotiMessage] = useState(EMPTY_STRING);
    const [reports, setReports] = useState([]);
    const [result, setResult] = useState({
        total: +0,
        count: +0,
        name: EMPTY_STRING
    });
    const [date, setDate] = useState({
        start: new Date().toLocaleDateString("fr-CA"),
        end: new Date().toLocaleDateString("fr-CA")
    });
    const [currentPage, setCurrentPage] = useState(+1);
    const [itemsPerPage, setItemPerPage] = useState(+100);
    const { type } = useParams();
    const [urlByService, setUrlByService] = useState(TransactionService.exportExcelByService(TIME_RANGE.DAY, selectService.value, date.start, date.end));

    const getJSON = (type) => {
        TransactionService.reportByServiceMonthInterval(TIME_RANGE.MONTH, type).then(res => {
            const data = res.data;
            let total = +0; let count = +0
            if (data.length > 0) {
                total = data.reduce((total, obj) => total += obj.total, 0);
                count = data.reduce((total, obj) => total += obj.count, 0);
            }
            setReports(data);
            setResult({ total, count })
            setLoading(false);
        }).catch(err => console.log(err))
    }

    const getJSONByServiceID = (interval, selectService, start_date, end_date) => {
        if (interval === TIME_RANGE.MONTH) {
            TransactionService.reportByServiceID(TIME_RANGE.MONTH, selectService).then(res => {
                const data = res.data;
                let total = + 0;
                let count = + 0;
                let name = EMPTY_STRING;
                if (data.length > 0) {
                    total = data.reduce((total, obj) => total += obj.total, 0);
                    count = data.reduce((total, obj) => total += obj.count, 0);
                    name = data[0].service.name;
                }
                setReports(res.data)
                setResult({ total, count, name })
                setLoading(false)
            }).catch(err => console.log(err))
        }
        if (interval === TIME_RANGE.DAY) {
            TransactionService.reportByServiceID(TIME_RANGE.DAY, selectService, start_date, end_date).then(res => {
                const data = res.data;
                let total = +0;
                if (data.length > 0) {
                    total = data.reduce((total, obj) => total += obj.amount, 0);
                }
                const count = data.length;
                setReports(res.data)
                setResult({ total, count })
                setLoading(false);
            }).catch(err => console.log(err))
        }
    }

    useEffect(() => {
        // set select services list
        ServiceService.getServiceList(type).then(res => {
            const servicesList = res.data;
            const selectServices = servicesList.map(s => {
                return { value: s.id, label: s.name }
            })
            selectServices.unshift({
                value: TOTAL,
                label: `TỔNG HỢP DỊCH VỤ ${SERVICE_TYPE_VN[type].toLocaleUpperCase()}`
            })
            setServices(selectServices);
        }).catch(err => console.log(err))

        //fetch data
        getJSON(type);
    }, [type])

    const done = () => {
        setNotiMessage(EMPTY_STRING)
    }

    const handleChangeTime = (e) => {
        setSelectTime(e);
        setLoading(true);
        if (e.value === TIME_RANGE.MONTH) {
            if (selectService.value === TOTAL) {
                getJSON(type)
            } else {
                getJSONByServiceID(TIME_RANGE.MONTH, selectService.value);
            }
        }
        if (e.value === TIME_RANGE.DAY) {
            getJSONByServiceID(TIME_RANGE.DAY, selectService.value, date.start, date.end);
        }
    }

    const handleChangeStartDate = (e) => {
        const start = new Date(e.target.value).toLocaleDateString("fr-CA")
        setDate({ ...date, start })
    }

    const handleChangeEndDate = (e) => {
        const end = new Date(e.target.value).toLocaleDateString("fr-CA")
        setDate({ ...date, end })
    }

    const handleChangeService = (e) => {
        setSelectService(e);
        if (e.value === TOTAL) {
            setLoading(true);
            getJSON(type);
        }    
        setUrlByService(TransactionService.exportExcelByService(TIME_RANGE.DAY, e.value, date.start, date.end))
    }

    const handleConfirm = () => {
        if (selectService.value === EMPTY_STRING) {
            setNotiMessage("Có lỗi! Xin vui lòng chọn dịch vụ");
        }
        if (selectTime.value === TIME_RANGE.DAY) {
            setLoading(true);
            setUrlByService(TransactionService.exportExcelByService(TIME_RANGE.DAY, selectService.value, date.start, date.end));
            getJSONByServiceID(TIME_RANGE.DAY, selectService.value, date.start, date.end);
        }
        if (selectTime.value === TIME_RANGE.MONTH) {
            setLoading(true);
            getJSONByServiceID(TIME_RANGE.MONTH, selectService.value);
        }
    }

    const callBackPagination = (currentPage, itemsPerPage) => {
        setCurrentPage(currentPage);
        setItemPerPage(itemsPerPage);
    }

    return (
        <div>
            <Row className="leTrungMargin">
                <Link to="/app/transaction/service">
                    <Button className="mr-2" color="danger">Quay lại</Button>
                </Link>
                <h1 className="upper" style={{ textAlign: "center" }}>{`Thống kê dịch vụ ${SERVICE_TYPE_VN[type]}`}</h1>
            </Row>
            <ModalNoti message={notiMessage} done={done}></ModalNoti>
            <Row>
                <FormGroup row>
                    <Col sm={2}>
                        <Col>
                            <Select
                                // isDisabled={!this.state.isManager}
                                //onKeyDown={(e) => Util.onKeyDown(e)}
                                inputId="services"
                                value={selectService}
                                options={services}
                                placeholder="Chọn dịch vụ"
                                menuPlacement="top"
                                // openMenuOnFocus
                                onChange={(e) => { handleChangeService(e) }}
                                style={{ zIndex: 10000 }}
                            />
                        </Col>
                    </Col>
                    {!["", TOTAL].includes(selectService.value) ?
                        <>
                            <Col sm={1}>
                                <Col>
                                    <Select
                                        // isDisabled={!this.state.isManager}
                                        //onKeyDown={(e) => Util.onKeyDown(e)}
                                        inputId="time"
                                        value={selectTime}
                                        options={INTERVAL_REPORT}
                                        placeholder="Thời gian"
                                        menuPlacement="top"
                                        openMenuOnFocus
                                        onChange={(e) => { handleChangeTime(e) }}
                                        style={{ zIndex: 10000 }}
                                    />
                                </Col>
                            </Col>
                        </> : <><Col sm={1}></Col></>
                    }
                    {selectService.value === TOTAL ?
                        null : selectTime.value === TIME_RANGE.DAY ?
                            <>
                                <Col sm={1} className="end">
                                    <label htmlFor="start_date">Từ:</label>
                                </Col>
                                <Col sm={2}>
                                    <Input
                                        // onKeyDown={(e) => Util.onKeyDown(e)}
                                        data-index="1"
                                        autoFocus
                                        type='date'
                                        value={date.start}
                                        onChange={(e) => { handleChangeStartDate(e) }}
                                        required
                                    />
                                </Col>
                                <Col sm={1} className="end">
                                    <label htmlFor="end_date">Đến:</label>
                                </Col>
                                <Col sm={2}>
                                    <Input
                                        // onKeyDown={(e) => Util.onKeyDown(e)}
                                        data-index="2"
                                        type='date'
                                        value={date.end}
                                        onChange={(e) => { handleChangeEndDate(e) }}
                                        required
                                    />
                                </Col>
                                <Col sm={1} className="end">
                                    <Button color="primary"
                                        onClick={() => { handleConfirm() }}>
                                        Chọn
                                    </Button>
                                </Col>
                                {reports.length > 0 ? <ExportFile url={urlByService}/> : null}
                            </> : <>
                                <Col sm={6}></Col>
                                <Col sm={1} className="end">
                                    <Button color="primary"
                                        onClick={() => { handleConfirm() }}>
                                        Chọn
                                    </Button>
                                </Col> 
                                {/* <ExportFile url={url} /> */}
                            </>
                    }
                </FormGroup>
            </Row>
            <Row>
                <Table className="serviceListTable table-head-fixed" hover bordered striped>
                    <thead>
                        {selectTime.value !== "day" ?
                            <tr>
                                <th>Thời gian</th>
                                <th>Tên dịch vụ</th>
                                <th>Loại dịch vụ</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền thu</th>
                            </tr> :
                            <tr>
                                <th>Thời gian</th>
                                <th>Tên Bệnh nhân</th>
                                <th>Mã bệnh nhân</th>
                                <th>Tuổi</th>
                                <th>Điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Tên dịch vụ</th>
                                <th>Tổng tiền thu</th>
                            </tr>
                        }
                    </thead>
                    <tbody>
                        {!loading ? reports.map((r) => {
                            return (
                                selectTime.value !== "day" ?
                                    <>
                                        <tr>
                                            <td>{r.time}</td>
                                            {r.service ? <td>{r.service.name}</td> : <td> - </td>}
                                            {r.service ? <td>{SERVICE_TYPE_VN[r.service.type]}</td> : <td>{SERVICE_TYPE_VN[r.type]}</td>}
                                            <td>{r.count}</td>
                                            <td>{Util.formatPrice(r.total)} VNĐ</td>
                                        </tr>
                                    </> : <>
                                        <tr>
                                            <td>{r.time}</td>
                                            {r.customer ? <td>{r.customer.full_name}</td> : <td> - </td>}
                                            {r.customer ? <td>{r.customer.code}</td> : <td> - </td>}
                                            {r.customer ? <td>{getAge(convertToStrDate(r.customer.birthday))}</td> : <td> - </td>}
                                            {r.customer ? <td>{r.customer?.contacts[0].phone}</td> : <td> - </td>}
                                            {r.customer ? <td>{`${splitRegion(r.customer?.contacts[0].address.ward)}-${splitRegion(r.customer?.contacts[0].address.district)}-${splitRegion(r.customer?.contacts[0].address.province)}`}</td> : <td> - </td>} 
                                            {reports.length > 0 ? <td>{r?.service.name}</td> : <td> - </td>}
                                            {reports.length > 0 ? <td>{Util.formatPrice(r.amount)} VNĐ</td> : <td> - </td>}
                                        </tr>
                                    </>
                            )
                        }) : <>
                            <tr>
                                {[...Array(5)].map((_, index) => +index).map(e => {
                                    return (
                                        <>
                                            <td>
                                                <Spinner animation="border" role="status" >
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </td>
                                        </>
                                    )
                                })}
                            </tr>
                        </>
                        }
                        {!loading ?
                            <>
                                {selectTime.value !== "day" ?
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <th>Tổng : </th>
                                        <th>{result.count}</th>
                                        <th>{Util.formatPrice(result.total)} VNĐ</th>
                                    </tr> :
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <th>Tổng : </th>
                                        <th>{result.count}</th>
                                        <th>{Util.formatPrice(result.total)} VNĐ</th>
                                    </tr>
                                }
                            </> : null
                        }
                    </tbody>
                </Table>
            </Row>
            <Pagination data_lenght={reports.length} callBackPagination={() => callBackPagination(currentPage, itemsPerPage)} />
            <Row>
                <Col xs="3"><h4>Viết bằng chữ: {result.total > 0 ? moneyToWord(result.total) : "0 đồng"}</h4></Col>
            </Row>
        </div>
    )
}

export default ReportFormByType;