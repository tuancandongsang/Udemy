import React, { Fragment } from "react";
import { Col, Row, Input } from "reactstrap";
import { Form } from "../../Shared";

class PatientInfo extends Form {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { id, full_name, birthday, gender } = this.props.patient;

    let age;
    if (birthday) {
      age = new Date().getFullYear() - birthday.slice(0, 4);
    }
    return (
      <Fragment>
        <div className="patientInfo">
          <h3>Phiếu kết quả xét nghiệm</h3>
          <h5>{this.props.examName}</h5>
          <p>1. Thông tin cơ bản</p>
          <Row>
            <Col xl="3" lg="3" md="3" sm="1" xs="1">
              <span htmlFor="">Họ tên: {full_name}</span>
            </Col>
            <Col xl="3" lg="3" md="3" sm="1" xs="1">
              <span htmlFor="">Mã BN: {id}</span>
            </Col>
            <Col xl="2" lg="2" md="2" sm="1" xs="1">
              <span htmlFor="">Tuổi: {age}</span>
            </Col>
            <Col xl="2" lg="2" md="2" sm="1" xs="1">
              <span htmlFor="">Giới tính: {gender}</span>
            </Col>
          </Row>
          <p>2. Thông tin bảo hiểm</p>
          <Row>
            <Col xl="2" lg="2" md="2" sm="2" xs="2">
              <label htmlFor="">Đối tượng BH:</label>
            </Col>
            <Col xl="2" lg="2" md="2" sm="2" xs="2">
              <Input></Input>
            </Col>

            <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
              <label htmlFor="">Số thẻ BH:</label>
            </Col>
            <Col xl="3" lg="3" md="3" sm="2" xs="2">
              <Input className="insuranceIndex"></Input>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}

export default PatientInfo;
