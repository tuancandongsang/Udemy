import React, { Component } from 'react';
import { Col, Row, Input } from 'reactstrap';

class CustomerContact extends Component {

    render() {
        const { full_name, phone_number, address, email, relation } = this.props.customer_contact;
        const { onChangeName, onChangePhone, onChangeAddress,
                onChangeEmail, onChangeRelation, onSearchPhone } = this.props;
        return (
            <div className="customer-contact">
                <p> 2. Thông tin liên hệ (khách hàng hoặc người thân):</p>
                    <Row>
                        <Col xs="4">Họ tên <span className="customer-contact-important">*</span>: </Col>
                        <Col><Input type="text" placeholder="" value={full_name} 
                                    onChange = {e => onChangeName(e.target.value)}>
                            </Input>
                         </Col>
                    </Row>
                    <Row>
                        <Col xs="4">Số ĐT <span className="customer-contact-important">*</span>: </Col>
                        <Col><Input type="text" placeholder="" value={phone_number}
                                    onChange = {e => onChangePhone(e.target.value)}
                                    onBlur= {() => onSearchPhone(phone_number)}>
                            </Input>
                            </Col>
                    </Row>
                    <Row>
                        <Col xs="4">Địa chỉ: </Col>
                        <Col><Input type="text" placeholder="" value={address}
                                    onChange = {e => onChangeAddress(e.target.value)}>   
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">Email: </Col>
                        <Col><Input type="email" placeholder="" value={email}
                                    onChange = {e => onChangeEmail(e.target.value)}>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="4">Quan hệ: </Col>
                        <Col><Input type="text" placeholder="Bố, mẹ, anh, chị,... (nếu có)" value={relation}
                                    onChange = {e => onChangeRelation(e.target.value)}>   
                            </Input>
                        </Col>          
                    </Row>
            </div>
        );
    }
}

export default CustomerContact;