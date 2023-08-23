import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Col, Row } from 'reactstrap';

class CancelModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: ''
        }
    }
    render() {
        let { openCancel, answer } = this.props;
        return (
            <div className="CancelModal">
                <Modal isOpen={openCancel} >
                    <ModalHeader >Hủy giao dịch</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Label xs="1">Lí do hủy: </Label>
                            <Col xs="11"><Input type="text" value={this.state.reason} onChange={e => this.setState({reason: e.target.value})} /></Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { answer(this.state.reason) }}>Xác nhận</Button>{' '}
                        <Button color="danger" onClick={() => { answer() }}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default CancelModal;