import React from 'react';
import { Row, Col, Table, } from 'reactstrap';
import { Form } from "../../../../../Shared";
import logo from '../../../../../Asset/Img/logo.png';

class PrintServiceFrom extends Form {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { assignedServices,titleService,locPrint } = this.props;
        let totalPrice = 0 ;
        const current = new Date();
        let rowDiagnostic = assignedServices.map((diagnostic, index) => {
             totalPrice += diagnostic.price
            return (
                <tr key={diagnostic.id} >
                    <td>{index + 1}</td>
                    <td>{diagnostic.name}</td>
                    <td>{diagnostic.code}</td>
                    <td>{locPrint}</td>
                </tr>
            )
        })
        return (
            <div className="border border-secondary receiptContainer m-3 " style={{ display: 'none' }}>
                <div className="position-relative printDiag" id="servicePrint" >
                    <div className="absolute header-from">
                    <Row>
                            <Col sm="9">
                                <Row className="text-left">
                                    <Col sm="3">
                                        <Row>
                                            <img className="image" src={logo} ></img>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                        Phòng Khám Đa Khoa Việt Đoàn
                                        </Row>
                                        <Row>
                                            Bách Môn, Việt Đoàn, Tiên Du, Bắc Ninh
                                        </Row>
                                        <Row>
                                            hotline: 0869.968.688
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="end">
                                <canvas id="canvasIdEtc" style={{ height: "13mm" }}></canvas>
                            </Col>
                        </Row>
                    </div>
                    <h5 className="text-center font-weight-bold">
                        <b>{titleService}</b>
                    </h5>
                    <div className="text-center">
                        <i>Ngày {current.getDate()} Tháng {current.getMonth() + 1} Năm {current.getFullYear()}</i>
                    </div>
                    <br></br>
                    <canvas id="cusBarCode" style={{height:"13mm"}}></canvas>                 
                    <div className="justify-content-between">
                        <Table bordered className="tableService">
                            <thead className="title-table">
                                <tr>
                                    <th>#</th>
                                    <th>Tên xét nghiệm</th>
                                    <th>Loại xét nghiệm</th>
                                    <th>Phòng xét nghiệm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowDiagnostic}
                            </tbody>
                        </Table>
                    </div>
                    <Row>
                        <Col sm="6"></Col>
                        <Col sm="6">Tổng tiền:<b>{new Intl.NumberFormat('de-DE').format(totalPrice)}VNĐ</b></Col>
                    </Row>
                    <br></br>
                    <div className="d-flex justify-content-between px-4">
                        <div className="text-center mr-auto ml-5">
                            <strong>BÁC SĨ ĐIỀU TRỊ</strong><br></br>
                            <i>(ký, họ tên)</i>
                        </div>
                        <div className="text-center mr-5">
                            ....Giờ ....Ngày ....Tháng ....Năm<br></br>
                            <strong>KHOA XÉT NGHIỆM</strong><br></br>
                        </div>
                    </div>
                    <Row>
                        <Col></Col>
                    </Row>
                </div>
            </div>
        )
    }

}
export default PrintServiceFrom;
