import React, { Component } from 'react';
import { Col, Row, Input, Label } from 'reactstrap';

class CustomerBasic extends Component {

    checkMale = gender => {
        if (gender === 'Nam') return true;
        else return false;
    }

    checkFemale = gender  => {
        if (gender === 'Nữ') return true;
        else return false;
    }

    render() {
        const { full_name, idnum, gender, birthday } = this.props.customer;
        const { onChangeName, onChangeBirthday, onChangeGender, onChangeIdent } = this.props;
        return (
            <div className="customer-basic">
                <p>1. Thông tin cơ bản:</p>
                <Row>
                    <Col xs="4">Họ tên <span className="customer-basic-important">*</span>: </Col>
                    <Col><Input type="text" placeholder="" value={full_name} 
                                onChange = {e => onChangeName(e.target.value)}>
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">CMND/Thẻ CC: </Col>
                    <Col><Input type="text" placeholder="" value={idnum}
                                onChange = {e => onChangeIdent(e.target.value)}>
                        </Input>
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">Giới tính <span className="customer-basic-important">*</span>: </Col>
                    <Col className="customer-basic-select">
                        <Label check><Input type="checkbox" 
                            onChange = {e => onChangeGender(e.target.value)}
                            value="Nam" checked={this.checkMale(gender)}/> Nam
                        </Label>
                        <Label check><Input type="checkbox"
                            onChange = {e => onChangeGender(e.target.value)}
                            value="Nữ" checked={this.checkFemale(gender)}/> Nữ
                        </Label>  
                    </Col>
                </Row>
                <Row>
                    <Col xs="4">Ngày sinh <span className="customer-basic-important">*</span>: </Col>
                    <Col><Input type="date" placeholder="" value={birthday}
                                onChange = {e => onChangeBirthday(e.target.value)}>
                        </Input>
                    </Col>
                </Row>
                <p><span className="customer-basic-important">*</span> : Các thông tin bắt buộc. </p>
            </div>
        );
    }
}

export default CustomerBasic;