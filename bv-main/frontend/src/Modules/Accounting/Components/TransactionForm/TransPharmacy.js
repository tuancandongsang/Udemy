import React, { Component, Fragment } from 'react';
import { Table, Col, Input, Label, Button, FormGroup } from 'reactstrap';
import { PRODUCT_UNIT, Util, ROLE, MODE_EXPORT } from '../../Shared';
import TransactionService from '../../Shared/TransactionService';
import AuthService from "../../../../Shared/Services/AuthService";

class TransPharmacy extends Component {
    constructor(props) {
        super(props);
        let today = new Date().toISOString();
        let date = today.substr(0, 10);
        this.state = {
            listProduct: [],
            listProductStaff: [],
            listProductDifference: [],
            start_date: date,
            end_date: date,
            selected: {},
            selectedId: '',
        }
    }

    async componentDidMount() {
        let { start_date, end_date } = this.state;
        let selected = AuthService.userInfo;
        if(selected.roles[0] === ROLE.ADMIN.value) {
            await TransactionService.getUserList().then(res => {
                let listUserPharmacy = res.data.filter(u => u.roles[0] === ROLE.PHARMACIST.value || u.roles[0] === ROLE.INVENTORY.value);
                selected = listUserPharmacy.find(l => l.roles[0] === ROLE.INVENTORY.value);
            });
        }
        this.setState({
            selected,
            selectedId: selected.id
        })
        if (selected.roles[0] === ROLE.INVENTORY.value) {
            this.listTransaction({ start_date, end_date });
        } else {
            this.listTransaction({ start_date, end_date }, AuthService.userInfo.id);
        }
    }
    listTransaction(query, created_by) {
        let { start_date, end_date } = this.state;
        if (created_by === 'PRICE_DIFFERENCE') {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.DIFFERENCE_DOCS,
            }
            TransactionService.reportTransPharmacy(data)
            .then(res => {
                this.setState({ listProductDifference: res.data })
            }).catch(err => console.log(err))
            return;
        }
        if(created_by) {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.STAFF_DOCS,
                user_id: created_by
            }
            TransactionService.reportTransPharmacy(data)
            .then(res => {
                this.setState({ listProductStaff: res.data })
            }).catch(err => console.log(err))
        }else {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.MANAGE_DOCS,
            }
            TransactionService.reportTransPharmacy(data)
            .then(res => {
                this.setState({ listProduct: res.data })
            }).catch(err => console.log(err))
        }
    }
    onSubmit = async () => {
        let { start_date, end_date, selectedId } = this.state;
        console.log('selected', selectedId, this.state.selected);
        if (selectedId === 'PRICE_DIFFERENCE') {
            let selected = {
                id: 'PRICE_DIFFERENCE',
                full_name: 'Chênh lệch giá',
                username: 'chenhlechgia',
                roles: ['PRICE_DIFFERENCE']
            }
            this.setState({ selected });
            await this.listTransaction({ start_date, end_date }, 'PRICE_DIFFERENCE');
            return;
        }
        let selected = this.props.listUserPharmacy.find(l => l.id === selectedId);
        this.setState({ selected })
        if (selected.roles[0] === ROLE.INVENTORY.value) {
            await this.listTransaction({ start_date, end_date })
        } else {
            await this.listTransaction({ start_date, end_date }, selectedId)
        }
        
    }

    handleExportFile = () => {
        let { start_date, end_date, selected } = this.state;
        if (selected?.roles[0] === 'PRICE_DIFFERENCE') {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.DIFFERENCE_EXCEL,
            }
            const url = TransactionService.exporExcelTransPharmacy(data)
            window.location.assign(url);
        }
        if (selected?.roles[0] === ROLE.INVENTORY.value) {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.MANAGE_EXCEL,
            }
            const url = TransactionService.exporExcelTransPharmacy(data)
            window.location.assign(url);
        }
        if (selected?.roles[0] === ROLE.PHARMACIST.value) {
            let data = {
                start_date,
                end_date,
                mode: MODE_EXPORT.STAFF_EXCEL,
                user_id: selected.id
            }
            const url = TransactionService.exporExcelTransPharmacy(data)
            window.location.assign(url);
        }
    }
    render() {
        const headerManage = ['#', 'Tên thuốc', 'Đơn vị', 'Giá', 'Tồn đầu', 'VNĐ', 'Xuất', 'VNĐ', 'Nhập', 'VNĐ', 'Tồn cuối', 'VNĐ'];
        const headerStaff = ['#', 'Tên thuốc', 'Đơn vị', 'Giá', 'Xuất đơn', 'VNĐ', 'Xuất lẻ', 'VNĐ', 'Tổng', 'VNĐ', 'Nhập kho', 'Xuất kho'];
        const headerDifference = ['#', 'Tên thuốc', 'Đơn vị', 'Giá chênh lệch', 'Xuất đơn', 'Xuất lẻ', 'Tổng xuất', 'Thành tiền'];
        let { listProductDifference, listProduct, start_date, end_date, selected, listProductStaff, selectedId } = this.state;
        let itemStaff = listProductStaff.map((l, i) => {
            return (
                <tr key={i} style={{ fontWeight: i === listProductStaff.length -1 ? 'bold' : '' }}>
                    <td>{i !== listProductStaff.length -1 && i + 1}</td>
                    <td>{l.name}</td>
                    <td>{l.price}</td>
                    <td>{PRODUCT_UNIT.map(p => {
                        if(p.code === l.unit) return p.label
                    })}
                    </td>
                    <td>{l.order}</td>
                    <td>{Util.formatPrice(l.orderAmount) + 'đ'}</td>
                    <td>{l.retail}</td>
                    <td>{Util.formatPrice(l.retailAmount) + 'đ'}</td>
                    <td>{l.total}</td>
                    <td>{Util.formatPrice(l.totalAmount)}đ</td>
                    <td>{l.import}</td>
                    <td>{l.export}</td>
                </tr>
            )
        })
        let item = listProduct.map((l, i) => {
            return (
                <tr style={{ fontWeight: i === listProduct.length -1 ? 'bold' : '' }}>
                    <td>{i !== listProduct.length -1 && i + 1}</td>
                    <td>{l.name}</td>
                    <td>{PRODUCT_UNIT.map(p => {
                        if (p.code === l.unit) {
                            return p.label
                        }
                    })}
                    </td>
                    <td>{l.price && Util.formatPrice(l.price) + 'đ'}</td>
                    <td>{l.initial}</td>
                    <td>{Util.formatPrice(l.initialAmount) + 'đ'}</td>
                    <td>{l.export}</td>
                    <td>{Util.formatPrice(l.exportAmount) + 'đ'}</td>
                    <td>{l.import > 0 && l.import}</td>
                    <td>{l.import > 0 && Util.formatPrice(l.importAmount) + 'đ'}</td>
                    <td>{l.final}</td>
                    <td>{Util.formatPrice(l.finalAmount)}đ</td>
                </tr>
            )
        })
        return (
            <Fragment>
                <FormGroup row>
                    <Label className="end" for="getUser" sm={1}>Tên nhân viên</Label>
                    <Col sm={2} className="username">
                        <Input type="select" value={selectedId}
                            disabled={AuthService.userInfo.roles[0] === ROLE.PHARMACIST.value}
                            onChange={e => this.setState({ selectedId: e.target.value })}    >
                            {this.props.listUserPharmacy.map((u, i) => {
                                return <option key={i} value={u.id} >{u.full_name}</option>
                            })}
                            <option value={'PRICE_DIFFERENCE'}>CHÊNH LỆCH GIÁ</option>
                        </Input>
                    </Col>
                    <Col sm={1} className="end">
                        <label htmlFor="start_date">Từ:</label>
                    </Col>
                    <Col sm={2}>
                        <Input autoFocus type='date' value={start_date} onChange={(e) => this.setState({ start_date: e.target.value })} required />
                    </Col>
                    <Col sm={1} className="end">
                        <label htmlFor="end_date">Đến:</label>
                    </Col>
                    <Col sm={2}>
                        <Input type='date' value={end_date} onChange={(e) => this.setState({ end_date: e.target.value })} required />
                    </Col>
                    <Col sm={1} className="end">
                        <Button color="primary" onClick={this.onSubmit}>Chọn</Button>
                    </Col>
                    <Col sm={{ size: 1, offset: 1 }}>
                        <Button color="primary"
                            // disabled={ selectedUser?.value === ALL.code ? true : false }
                            onClick={() => { this.handleExportFile() }}><span className="material-icons">file_download</span>Tải Excel</Button>
                    </Col>
                </FormGroup>
                {selected.roles && selected?.roles[0] === ROLE.INVENTORY.value &&
                    <Table>
                        <thead>
                            <tr>
                                {headerManage.map(h => <th>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {item}
                        </tbody>
                    </Table>
                }
                {selected.roles && selected?.roles[0] === ROLE.PHARMACIST.value &&
                    <Table>
                        <thead>
                            <tr>
                                {headerStaff.map(h => <th>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {itemStaff}
                        </tbody>
                    </Table>
                }
                {selected.roles && selected?.roles[0] === 'PRICE_DIFFERENCE' &&
                    <Table>
                        <thead>
                            <tr>
                                {headerDifference.map(h => <th>{h}</th>)}
                            </tr>
                        </thead>
                        <tbody className="middle">
                            {listProductDifference.map((l, i) => {
                                return  <tr key={i}>
                                            <td>{l.index}</td>
                                            <td>{l.name}</td>
                                            <td>{l.unit}</td>
                                            <td>{l.priceDifference}</td>
                                            <td>{l.order}</td>
                                            <td>{l.retail}</td>
                                            <td style={{ fontWeight: i === listProductDifference.length - 1 ? 'bold' : '' }}>{l.export}</td>
                                            <td style={{ fontWeight: i === listProductDifference.length - 1 ? 'bold' : '' }}>{Util.formatPrice(l.total)}đ</td>
                                        </tr>
                            })}
                        </tbody>
                    </Table>
                }
            </Fragment>
        );
    }
}

export default TransPharmacy;