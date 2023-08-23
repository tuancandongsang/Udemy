import React, { Component, Fragment } from 'react';
import { Table, Col, Row } from 'reactstrap';
import { Util } from '../../Shared';
import { getAge, convertToStrDate, moneyToWord } from '../../../Reception/Shared/Util';
import { Pagination } from '../../../../Shared/Components/Pagination/Pagination';
class TransTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: '',
            currentPage: 1,
            itemsPerPage: +100,
        }     
    }
    
    callBackPagination = ( currentPage, itemsPerPage ) => {
        this.setState({
            currentPage: currentPage,
            itemsPerPage: itemsPerPage
        })
    }

    render() {
        const { currentPage, itemsPerPage  } = this.state;
        let { isManager, items, textSearch, amountAtm } = this.props;
        let totalExam = 0;
        let totalTest = 0;
        let totalXray = 0;
        let totalEnt = 0;
        let totalUltrasound = 0;
        let totalOther = 0;
        // let totalBuy = 0; 
        let total = 0;
        const indexOfFirstItems = (+currentPage - 1) * itemsPerPage;
        const indexOfLastItems = + currentPage * itemsPerPage;
        const renderItems = items.filter(i => {
            if(Number.isFinite(+textSearch[0])) {
                if(textSearch[0] == '0' && i.phone?.includes(`${textSearch}`)) {
                    return i;
                }
                if(i.code?.includes(`${textSearch}`)) {
                    return i;
                }
            }
            if(i.name?.includes(`${textSearch.toUpperCase()}`)) {
                return i;
            }
        })
        .slice(indexOfFirstItems, indexOfLastItems)
        .map((i, index) => {
            i.total = i.exam + i.test + i.xray + i.ent + i.ultrasound + i.other ;
            totalExam +=  +i.exam;
            totalTest +=  +i.test;
            totalXray +=  +i.xray;
            totalEnt +=  +i.ent;
            totalUltrasound += +i.ultrasound;
            totalOther += +i.other;
            // totalBuy += +i.buy;
            total =  totalExam + totalTest + totalXray + totalEnt + totalUltrasound + totalOther;
            return  <tr key={index}>
                        <td> {index + 1 + (currentPage - 1)*itemsPerPage} </td>
                        <td> {i.name} </td>
                        <td> {i.code} </td>
                        <td> {getAge(convertToStrDate(i.birthday))}</td>
                        <td> {i.phone} </td>
                        <td> {i.address} </td>
                        <td> {i.exam !== 0 ? Util.formatPrice(i.exam) : ''} </td>
                        <td> {i.test !== 0 ? Util.formatPrice(i.test) : ''} </td>
                        <td> {i.xray !== 0 ? Util.formatPrice(i.xray) : ''} </td>
                        <td> {i.ent !== 0 ? Util.formatPrice(i.ent) : ''} </td>
                        <td> {i.ultrasound !== 0 ? Util.formatPrice(i.ultrasound) : ''} </td>
                        <td> {i.other !== 0 ? Util.formatPrice(i.other) : ''} </td>
                        {/* <td> {i.buy !== 0 ? Util.formatPrice(i.buy) : ''} </td> */}
                        <td> {Util.formatPrice(i.total)}</td>
                        {isManager? <td className="transaction-btn-cancel middle pointer" onClick={e => this.props.searchCustomer(e, i.id)}>Hủy</td> : null} 
                    </tr>
        })

        const totalItems = items.filter(i => i.code?.includes(`${textSearch}`))
        .reduce((total, i) => {
            const itemTotal = i.exam + i.test + i.xray + i.ent + i.ultrasound + i.other;
            return total += itemTotal;
        }, 0)
        return (
            <Fragment>
                <div className="table-responsive min-h-60 df-h-55">
                <Table className="serviceListTable table-head-fixed" hover bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bệnh nhân</th>
                            <th>Mã bệnh nhân</th>
                            <th>Tuổi</th>
                            <th>Điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Khám</th>
                            <th>Xét nghiệm</th>
                            <th>X quang</th>
                            <th>Nội soi</th>
                            <th>Siêu âm</th>
                            <th>Cấp cứu</th>
                            {/* <th>Thuốc</th> */}
                            <th>Tổng</th>
                            {isManager? <th></th> : null} 
                        </tr>
                    </thead>
                    <tbody>
                        {renderItems}
                        {/* {amountRetail > 0 ?
                        <tr> 
                            <td>{items.length}</td>
                            <td>KHÁCH LẺ</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{Util.formatPrice(amountRetail)}</td>
                            <td>{Util.formatPrice(amountRetail)}</td>
                            { isManager ? <td></td> : null }
                        </tr>
                        : null} */}
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Tổng: </th>
                            <th>{Util.formatPrice(totalExam)}đ</th>
                            <th>{Util.formatPrice(totalTest)}đ</th>
                            <th>{Util.formatPrice(totalXray)}đ</th>
                            <th>{Util.formatPrice(totalEnt)}đ</th>
                            <th>{Util.formatPrice(totalUltrasound)}đ</th>
                            <th>{Util.formatPrice(totalOther)}đ</th>
                            {/* <th>{Util.formatPrice(totalBuy + amountRetail)}đ</th> */}
                            <th>{total > 0 ? Util.formatPrice(total) : 0}đ</th>
                            {isManager? <th></th> : null} 
                        </tr>
                    </tbody>
                </Table>
                </div>
                <Row className='text-bold upper position-trans-table'>
                    <Col xs="3"><p>Tổng tiền thu: {totalItems > 0 ? Util.formatPrice(totalItems) : 0}đ </p> </Col>
                    <Col xs="9"><p>Tổng tiền ATM: {amountAtm > 0 ? Util.formatPrice(amountAtm) : 0}đ </p></Col>
                    <Col xs="3"><p>Tổng tiền phải nộp: {totalItems > 0 ? Util.formatPrice(totalItems - amountAtm) : 0}đ </p></Col>
                    <Col xs="9"><p>Viết bằng chữ: {totalItems > 0 ? moneyToWord(totalItems - amountAtm) : 0}</p></Col>
                </Row>
                <Row className="accouting-total title-card">
                    <Col xs={5}>
                    </Col>
                    <Col xs={7}>
                        <Pagination data_lenght={this.props.items.length} callBackPagination={this.callBackPagination}/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default TransTable;