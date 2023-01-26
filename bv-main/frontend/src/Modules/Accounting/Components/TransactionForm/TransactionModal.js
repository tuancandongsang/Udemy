import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { SERVICE_TYPE, ORDER_TYPE, STATUS, ModalNoti, STEP_TYPE  } from '../../Shared';
import TransactionService from '../../Shared/TransactionService';
import CancelModal from './CancelModal';
class TransactionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCancel: false,
            step: {},
            notiMessage: ''
        }
    }
    cancel = (e, step) => {   
        let found  = this.props.listStepCancel.find(l => l.job_step?.job_id === step.job_step?.job_id && l.job_step?.type === STEP_TYPE.TEST)
        if(step.job_step.type === STEP_TYPE.EXAM && found) {
            this.setState({
                notiMessage: 'Không thể hủy dịch vụ khám này vì bệnh nhân đã kê xét nghiệm!'
            })
        }else {
            this.setState({
                step,
                openCancel: true
            })
        }
    }
    answer = (reason) => {
        if(reason) {
            let step = this.state.step;
            const data = {
                id: step.order.ref_id,
                status: STATUS.CANCEL,
                results: [
                    {reason}
                ]
            }
            TransactionService.cancelTransaction(data)
            .then(res => {
                this.setState({
                    openCancel: false,
                    notiMessage: 'Hủy giao dịch thành công!'
                });
                step.job_step.results = [{reason}];
                this.props.afterCancelDone(step)
                this.props.closeTrans();
            }).catch(err => {
                console.log(err);
                this.setState({
                    openCancel: false,
                    notiMessage: 'Hủy giao dịch thất bại!',
                })
                this.props.closeTrans();
            })
        }else {
            this.setState({
                openCancel: false
            })
        }
    }
    render() {
        let { listStepCancel, openTrans } = this.props;
        let { openCancel, notiMessage } = this.state;
        let item = listStepCancel.map((l, index) => {
            let date = new Date(l.order?.ctime);
            let type = l.job_step.type === STEP_TYPE.BUY ? l.order?.type : l.order?.items[0]?.ref_value?.type;
            return  <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{l.order?.customer?.full_name}</td>
                        <td>{l.order?.customer?.contacts[0]?.phone}</td>
                        <td>{l.order?.customer?.contacts[0]?.address?.province}</td>
                        <td>{l.job_step.type === STEP_TYPE.BUY ? type === ORDER_TYPE.ETC.code ?  ORDER_TYPE.ETC.label : type === ORDER_TYPE.OTC.code ?  ORDER_TYPE.OTC.label :  ORDER_TYPE.OTHER.label 
                        : type === SERVICE_TYPE.EXAM ? 'Khám bệnh' : type === SERVICE_TYPE.TEST ? 'Xét nghiệm' : type === SERVICE_TYPE.XRAY ? 'X quang'
                        : type === SERVICE_TYPE.ULTRASOUND ? 'Siêu âm' : type === SERVICE_TYPE.ENT ?  'Nội soi' : 'Khác'}</td>
                        <td>{new Intl.NumberFormat('de-DE').format(l.order?.total)}đ</td>
                        <td>{date.toLocaleString('en-GB')}</td>
                        { l.job_step.type === STEP_TYPE.TEST && l.job_step.status !== STATUS.DONE || l.job_step.type === STEP_TYPE.EXAM ? <td onClick={e => this.cancel(e, l)} className="transaction-btn-cancel middle pointer">Hủy</td> : <td></td>} 
                    </tr>
        })
        return (
            <div className="TransactionModal">
                <CancelModal openCancel={openCancel} answer={this.answer}/>
                <ModalNoti  message={notiMessage} done={() => this.setState({notiMessage: ''})}/>
                <Modal isOpen={openTrans}  >
                    <ModalHeader >Thông tin giao dịch</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên bệnh nhân</th>
                                    <th>Điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Loại dịch vụ</th>
                                    <th>Giá tiền</th>
                                    <th>Thời gian giao dịch</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item}
                            </tbody>
                        </Table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.props.closeTrans}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default TransactionModal;