import React, { Component, Fragment } from 'react';
import { Table } from 'reactstrap';
import { SERVICE_TYPE, STEP_TYPE, ORDER_TYPE, Util  } from '../../Shared';
class CancelTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }     
    }
    render() {
        let { items, textSearch } = this.props;
        let total = 0;
        let item = items.filter(i => {
            console.log('i', i);
                if(Number.isFinite(+textSearch[0])) {
                    if(textSearch[0] == '0' && i.order?.customer?.contacts[0]?.phone.includes(`${textSearch}`)) {
                        return i;
                    }
                    if(i.order?.customer?.code?.includes(`${textSearch}`)) {
                        return i;
                    }
                }
                if(i.order?.customer?.full_name?.includes(`${textSearch.toUpperCase()}`)) {
                    return i;
                }
            }).map((i, index) => {
            let type = i.job_step.type === 'buy' ? i.order?.type : i.order?.items[0]?.ref_value?.type;
            total += i.order.total;
            return  <tr key={index}>
                        <td> {index+1} </td>
                        <td> {i.order?.customer?.full_name} </td>
                        <td> {i.order?.customer?.code} </td>
                        <td> {i.order?.customer?.contacts[0]?.phone} </td>
                        <td> {i.order?.customer?.contacts[0]?.address?.province} </td>
                        <td> {i.job_step.type === STEP_TYPE.BUY ? type === ORDER_TYPE.ETC.code ? ORDER_TYPE.ETC.label : type === ORDER_TYPE.OTC.code ? ORDER_TYPE.OTC.label : ORDER_TYPE.OTHER.label
                        : type === SERVICE_TYPE.EXAM ? 'Khám bệnh' : type === SERVICE_TYPE.TEST ? 'Xét nghiệm' : type === SERVICE_TYPE.XRAY ? 'X quang'
                        : type === SERVICE_TYPE.ULTRASOUND ? 'Siêu âm' : type === SERVICE_TYPE.ENT ?  'Nội soi' : 'Khác'} </td>
                        <td> {i.job_step?.results?.map(r => r.reason)} </td>
                        <td>{new Date(i.job_step.ctime).toLocaleString('en-GB')}</td>
                        <td>{new Date(i.job_step.mtime).toLocaleString('en-GB')}</td>
                        <td> {Util.formatPrice(i.order.total)} </td>
                    </tr>
        })
        return (
            <Fragment>
                 <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bệnh nhân</th>
                            <th>Mã bệnh nhân</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Giao dịch hủy</th>
                            <th>Lý do</th>
                            <th>Thời gian GD</th>
                            <th>Thời gian hủy</th>
                            <th>Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item}
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Tổng: </th>
                            <th>{Util.formatPrice(total)}đ</th>
                        </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default CancelTable;