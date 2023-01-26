import React from 'react';
import { Col, Row, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, } from 'reactstrap';
import { withRouter } from "react-router";
import { Form, ModalNoti, ShareService } from '../../Shared';
import { DATE, ROUTE } from "../../Constances/const";
import PrintCovid from './PrintCovid';
import ReactToPrint from "react-to-print";
class TestCovid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            name: '',
            birthday: '',
            gender: '',
            phoneNumber: '',
            address: '',
            work: '',
            request: '',
            takenBy: '',
            sampleType: '',
            technicians: '',
            cmt: '',
        }
    }
    onChangeDate = (e) => {
        this.setState({ date: e.target.value.split('-').reverse().join('-') })
    }
    onChangeNameCustomer = (e) => {
        this.setState({ name: e.target.value });
    }
    onChangeBirthday = (e) => {
        this.setState({ birthday: e.target.value.split('-').reverse().join('-') })
    }
    onChangeGender = (e) => {
        this.setState({ gender: e.target.value })
    }
    onChangePhone = (e) => {
        this.setState({ phoneNumber: e.target.value })
    }
    onChangeAddress = (e) => {
        this.setState({ address: e.target.value })
    }
    onChangeWork = (e) => {
        this.setState({ work: e.target.value })
    }
    onChangeRes = (e) => {
        this.setState({ request: e.target.value })
    }
    onChangeTakenBy = (e) => {
        this.setState({ takenBy: e.target.value })
    }
    onChangeID = (e) => {
        this.setState({ ID: e.target.value })
    }
    onChangeSampleType = (e) => {
        this.setState({ sampleType: e.target.value })
    }
    onChangeChecked = (e) => {
        this.setState({ checked: e.target.value })
    }
    onChangeTechnicians = (e) => {
        this.setState({ technicians: e.target.value })
    }
    onChangeCmt = (e) => {
        this.setState({ cmt: e.target.value })
    }
    resetForm = () =>{
        this.setState({
            name:'',
            name: '',
            birthday: '',
            gender: '',
            phoneNumber: '',
            address: '',
            work: '',
            cmt:''
        })
    }
    render() {
        return (
            <div>
                <div className='text-center' style={{ marginBottom: '50px' }}>
                    <b style={{ fontSize: '150%', }} >Thông tin bệnh nhân </b>
                </div>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={3} className='text-center'>Họ tên(Name)</Col>
                            <Col sm={5}>
                                <Input
                                    autoFocus
                                    placeholder='Nhập tên bệnh nhân'
                                    onChange={this.onChangeNameCustomer}
                                    value={this.state.name}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Năm sinh(Birth)</Col>
                            <Col sm={5}>
                                <Input
                                    type='date'
                                    placeholder='Nhập năm sinh'
                                    onChange={this.onChangeBirthday}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Giới tính(Sex)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập giới tính'
                                    onChange={this.onChangeGender}
                                    value={this.state.gender}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Điện thoại(Tell)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập số điện thoại'
                                    onChange={this.onChangePhone}
                                    value={this.state.phoneNumber}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Địa chỉ(Add)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập Địa chỉ'
                                    onChange={this.onChangeAddress}
                                    value={this.state.address}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Đơn vị(Work)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập đơn vị '
                                    onChange={this.onChangeWork}
                                    value={this.state.work}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>CMT/CCCD(ID)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập cmt/cccd '
                                    onChange={this.onChangeCmt}
                                    value={this.state.cmt}
                                >
                                </Input>
                            </Col>
                        </Row>


                    </Col>
                    <Col sm={6}>
                        <Row>
                            <Col sm={3} className='text-center'>Ngày trả kết quả</Col>
                            <Col sm={5}>
                                <Input
                                    type='date'
                                    placeholder='Nhập ngày'
                                    onChange={this.onChangeDate}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Người lấy mẫu(Taken by)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập tên người lấy mẫu'
                                    onChange={this.onChangeTakenBy}
                                    value={this.state.takenBy}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={3} className='text-center'>Người thực hiện(Technicians)</Col>
                            <Col sm={5}>
                                <Input
                                    placeholder='Nhập tên người thực hiện'
                                    onChange={this.onChangeTechnicians}
                                    value={this.state.technicians}
                                >
                                </Input>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <ReactToPrint
                        trigger={() => <Button color='primary' >In kết quả xét nghiệm</Button>}
                        content={() => this.componentRef}
                        onAfterPrint ={() => {
                            this.resetForm()
                          }}
                    />
                </div>
                <div
                    hidden
                >
                    <PrintCovid
                        ref={(el) => (this.componentRef = el)}
                        stateCovid={this.state}
                    />
                </div>
            </div>

        )
    }
}
export default withRouter(TestCovid);