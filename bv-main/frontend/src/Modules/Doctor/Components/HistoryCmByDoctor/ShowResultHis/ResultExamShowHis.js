import React, { Component, Fragment } from "react";
import { Table, Input, Col, Row, ModalBody, Modal, ModalHeader, Button, ModalFooter } from "reactstrap";


class ResultExamShowHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
    const { stateCm, allergyCm } = this.props;
        return (
            <div className="showReults">
                <Row className="vital_Signs">
                    <p className="title-card"><span className="material-icons">create</span> Dấu hiệu sống</p>
                        <Row >
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={5}>
                                        <span>Nhiệt độ:</span>
                                    </Col>
                                    <Col sm={4} className="m-0 p-0">
                                        <Input
                                            value={stateCm?.subclinical?.temp}
                                            disabled
                                            className="temp"
                                        ></Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1"> °C</p></Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={5}>
                                        <span>Huyết áp:</span>
                                    </Col>
                                    <Col sm={4} className="m-0 p-0">
                                        <Input
                                            className="blood"
                                            value={stateCm?.subclinical?.blood}
                                            disabled
                                        >
                                        </Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">mmHg</p></Col>

                                </Row>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={5}>
                                        <span>Cân nặng:</span>
                                    </Col>
                                    <Col sm={4} className="m-0 p-0">
                                        <Input
                                            className="weight"
                                            value={stateCm?.subclinical?.weight}
                                            disabled
                                        ></Input>

                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">KG</p></Col>

                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={5}>
                                        <span>Chiều cao:</span>
                                    </Col>
                                    <Col sm={4} className="m-0 p-0">
                                        <Input
                                            className="height"
                                            value={stateCm?.subclinical?.height}
                                            disabled
                                        ></Input>
                                    </Col>
                                    <Col className="m-0 p-0"><p className="m-1">CM</p></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="2" className="m-0 p-0">
                                <p className="text-danger"><b>Dị ứng:</b></p>
                            </Col>
                            <Col sm="10" className="m-0 p-0">
                                <textarea
                                    className="allergy"
                                    value={allergyCm}
                                    disabled
                                ></textarea>
                            </Col>
                        </Row>
                </Row>
                <p className="title-card"><span className="material-icons">playlist_add_check</span>Triệu chứng</p>
                <Row className="stateCmInfo">
                    <Col>
                        <textarea
                            className="textSymptom"
                            value={stateCm.textSymptom}
                            disabled
                        ></textarea>
                    </Col>
                </Row>
                <p className="title-card"><span className="material-icons">playlist_add_check</span>Chẩn đoán</p>
                <Row className="stateCmInfo">
                    <Col>
                        <textarea
                            className="textSymptom"
                            value={stateCm.textDiagnosis}
                            disabled
                        ></textarea>
                    </Col>
                </Row>

            </div>
        )
    }
}

export default ResultExamShowHis