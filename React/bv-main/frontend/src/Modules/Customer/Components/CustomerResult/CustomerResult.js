import React, { Component } from 'react';
import { Col, Row, Button } from 'reactstrap';

class CustomerResult extends Component {

    render() {
        const { full_name, idnum } = this.props.search_customer;
        const { showHistory, onHistory, onMatchHistory } = this.props;
        const { time } = this.props.search_history;

        return (
            <div className="customer-result">
                <div className="customer-result-header">
                    <Button className="history-btn" color="success" onClick={() => onHistory()}>Kết quả tìm kiếm: </Button>
                </div>
                { showHistory ?
                    (   
                        <div className="history-table">
                            <p> Thông tin cơ bản: </p>
                            <Row>
                                <Col xl="3" lg="3" md="3" sm="12" xs="12">
                                    <Row>
                                        <Col xl="6" lg="6" md="6" sm="12" xs="12">Họ tên: </Col>
                                        <Col>{full_name}</Col>
                                    </Row>
                                </Col>
                                <Col xl="3" lg="3" md="3" sm="12" xs="12">
                                    <Row>
                                        <Col xl="5" lg="5" md="5" sm="12" xs="12">CMND/CC: </Col>
                                        <Col>{idnum}</Col>
                                    </Row>
                                </Col>
                                <Col xl="6" lg="6" md="6" sm="12" xs="12">
                                    <Row>
                                        <Col xl="5" lg="5" md="5" sm="12" xs="12">Ngày đã khám: </Col>
                                        <Col>{time}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            <div className="customer-result-footer">
                                <Button className="history-btn" color="info"
                                    onClick={() => onMatchHistory()}>Lấy dữ liệu vào bảng</Button>
                            </div>
                        </div>
                    ) : (<span></span>)
                } 
            </div>
        );
    }
}

export default CustomerResult;