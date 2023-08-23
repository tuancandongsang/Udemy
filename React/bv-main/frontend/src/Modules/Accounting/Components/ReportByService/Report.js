import { Row, Col, Spinner } from "reactstrap";
import { SERVICE_TYPE_VN } from "../../../../Constances/const";
import TransactionService from '../../Shared/TransactionService';
import { ExportFile } from "../../../../Shared/Components/ExportFile/ExportFile";
import { Util } from "../../../../Helper/Util";
import { useEffect, useState } from "react";
import { moneyToWord } from "../../Shared";
import { CreateIcon } from "./CreateIconWithName";

const Report = (props) => {
    const url = TransactionService.exportExcelReportAllService();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const getJSON = (interval = "day") => {
        TransactionService.reportByServiceMonthInterval(interval).then(
            res => {
                setReports(res.data)
                setLoading(false);
            }
        ).catch(err => console.log(err))
    }

    useEffect(() => {
        getJSON("month");
    }, [])

    const goTo = (type = "") => {
        const url = window.location.href + "/" + type
        window.location.replace(url);
    }

    const handleSelectServiceType = (key) => {
        goTo(key)
    }

    return (
        <div>
            <div>
                <Row className="letrungyeucau" >
                    <Col sm={10}></Col>
                    <ExportFile url={url}/>
                </Row>
            </div>

            <div className=" customCard">
                <h1 style={{ textAlign: "center" }}>{`Thống kê theo nhóm dịch vụ năm ${new Date().getFullYear()}`}</h1>
                <Row className="d-flex justify-content-between">
                    {Object.entries(SERVICE_TYPE_VN).map(([key, value]) => {
                        let total = 0; let count = 0;
                        reports.forEach(r => {
                            if (r.type == key) {
                                total += r.total;
                                count += r.count;
                            }
                        })
                        return (
                            <Col sm='6' className="itemTransaction " onClick={() => { handleSelectServiceType(key) }}>
                                {!loading ?
                                    <Row className="mixCen">
                                        <Col className="text-center border-right" sm={2}>
                                            <CreateIcon type={key}/> <br></br>
                                            <h4 className="upper fontsz-20">{value}</h4>
                                        </Col>
                                        <Col className="fontsz-20">
                                            <Row><Col className="widthEqual" sm={3}>Số lượng </Col><Col>: <strong> {count} </strong></Col></Row>
                                            <Row><Col className="widthEqual" sm={3}>Tổng tiền </Col><Col>: <strong>{Util.formatPrice(total)} VNĐ</strong></Col></Row>
                                            <Row><Col className="widthEqual" sm={3}>Bằng chữ </Col><Col>: <strong>{moneyToWord(total)}</strong></Col></Row>
                                        </Col>
                                    </Row>
                                    :
                                    <>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </>
                                }
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}
export default Report;