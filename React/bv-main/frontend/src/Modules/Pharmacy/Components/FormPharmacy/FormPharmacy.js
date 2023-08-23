import React, { Component, Fragment } from "react";
import { Row, Col, Button, Label, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink  } from "reactstrap";
import PharmacyService from '../Shared/PharmacyService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalNoti, ModalConfirm, ONE_DAY, ProductService, ORDER_TYPE, STATUS, Medicine} from "../Shared";
import CustomerForm from '../../../../Shared/Components/CustomerForm/CustomerForm';
import FormSearch from './FormSearch';
import PrintPharmacy from './PrintPharmacy';
import printJS from 'print-js';
import AccountingForm from '../../../Reception/Components/Accounting/AccountingForm/AccountingForm';
import ModalOrder from "./ModalOrder";
import classnames from 'classnames';
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";
class FormPharmacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            notiMessage: '',
            notiConfirm: '',
            orderId: '',
            orderCode: '',
            jobId: '',
            jobStepId: '',
            status: '',
            customer: {},
            doctor: {},
            listProduct: [],
            listLot: [],
            listData: [],
            fakeTable: [{},{},{},{},{}],
            total: 0,
            orderType: '',
            jobCtime: '',
            jobInstruction: '',
            jobSubclinical: '',
            index: -1,
            show: false,
            refresh: true,
            showOrder: false,
            activeTab: '1',
            retailCustomerName: '',
            retailCustomerPhone: '',
            arrUpdateQty: [],
        };
    }
    componentDidMount() {
        this.getDataListLot();
        this.getDataListProduct();
    }
    getDataListProduct() {
        ProductService.listProduct()
            .then(res => {
                this.setState({
                    listProduct: res.data,
                });
            }).catch(err => {
                console.log(err);
                this.setState({
                    notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
                });
            })
    }
    getDataListLot() {
        PharmacyService.listLot()
            .then(res => {
                let listLot = [];
                let data = res.data;
                data.forEach(l => {
                    let result = this.remainDate(l.exp_date);
                    if (result < 31) {
                        l.color = '#e09491';
                    } else if (result < 91) {
                        l.color = '#80d1a6';
                    } else {
                        l.color = 'white';
                    }
                    l.remainDate = result;
                    if(l.remain > 0) {
                        listLot.push(l)
                    }
                });
                this.setState({
                    listLot
                });
            }).catch(err => {
                console.log(err);
                this.setState({
                    notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
                });
            })
    }
    onChangeQ = (e, index, price) => {
        let amount = e.target.value;
        if(!Number(amount)) amount = 0;
        let listData = this.state.listData;
        let total = this.state.total;
        
        let totalItem = listData[index].amount * price * (100 - listData[index].discount) / 100

        total = total - totalItem + amount * price * (100 - listData[index].discount) / 100;

        listData[index].amount = Number(amount);
        if (listData[index].remain < amount) {
            listData[index].err = 'Số lượng không đủ';
        } else {
            delete listData[index].err;
        }
        this.setState({
            listData,
            total
        });
    }

    onChangeB = (e, index) => {
        let listData = this.state.listData;
        let listLot = this.state.listLot;
        let lot_id = e.target.value
        listData[index].lot_id = lot_id;
        listLot.forEach(b => {
            if (b.id === lot_id) {
                listData[index].remain = b.remain;
                listData[index].color = b.color;
                if (b.remain < listData[index].amount) {
                    listData[index].err = 'Số lượng không đủ';
                } else {
                    delete listData[index].err;
                }
            }
        });
        this.setState({
            listData
        });
    }
    onChangeInstruction = (e, index) => {
        let listData = this.state.listData;
        listData[index].attrs.instruction = e.target.value;
        this.setState({ listData });
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onSelect = (item) => {
        let { listData, orderType, total, fakeTable, jobSubclinical } = this.state;
        fakeTable.splice(0,1);
        let obj = {}
        obj.amount = 1;
        obj.name = item.name;
        obj.product_id = item.id;
        obj.price = item.price;
        obj.discount = 0;
        total += obj.price * (100 - obj.discount) / 100;
        obj.color = item.color;
        obj.lot_id = item.oldestLot.id;
        obj.selected = item.oldestLot.index;
        obj.remain = item.oldestLot.remain;
        obj.parts = item.parts;
        obj.attrs = item.attrs;
        obj.attrs.instruction = 'Ngày uống: ' + (obj.attrs.default_daily_usage) + ' lần x '  + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit)  
        
        // jobSubclinical ? jobSubclinical.weight && jobSubclinical.weight < 20 ? 
        // 'Liều theo cân nặng: ' + (obj.attrs.unit === 'tablet' ? (obj.attrs.max_dose_per_kg*jobSubclinical.weight/obj.attrs.strength) + ' viên ' : obj.attrs.max_dose_per_kg*jobSubclinical.weight +obj.attrs.unit) + ' x ' + (obj.attrs.default_quantity/obj.attrs.strength) + ' lần.' 
        // :  jobSubclinical.weight && jobSubclinical.weight > 40  ? obj.attrs ? 'Liều dùng mặc định: ' + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit)
        // + ' x ' + (obj.attrs.default_quantity/obj.attrs.strength) + ' lần.' : null
        // : obj.attrs ? 'Liều dùng mặc định: ' + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit)
        // + ' x ' + (obj.attrs.default_quantity/obj.attrs.strength) + ' lần.' : null +  'Liều theo cân nặng: ' + (obj.attrs.unit === 'tablet' ? (obj.attrs.max_dose_per_kg*jobSubclinical.weight/obj.attrs.strength) + ' viên ' : obj.attrs.max_dose_per_kg*jobSubclinical.weight +obj.attrs.unit) + ' x ' + (obj.attrs.default_quantity/obj.attrs.strength) + ' lần.' 
        // : obj.attrs ? 'Liều dùng mặc định: ' + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit)
        // + ' x ' + (obj.attrs.default_quantity/obj.attrs.strength) + ' lần.' : null;

        let result = this.remainDate(item.oldestLot.exp_date);
        if (result < 31) {
            obj.color = '#e09491';
        } else if (result < 91) {
            obj.color = '#80d1a6';
        } else {
            obj.color = 'white';
        }

        listData.push(obj);
        if (orderType !== ORDER_TYPE.OTHER.code) {
            this.setState({
                fakeTable,
                listData,
                total,
                orderType: ORDER_TYPE.OTHER.code,
            })
        } else {
            this.setState({
                fakeTable,
                listData,
                total
            });
        }
    }
    onDelete = (e, index) => {
        this.setState({
            notiConfirm: 'Bạn chắc chắn muốn xóa ?',
            index
        });
    }

    answer = (isYes) => {
        if (isYes) {
            let { listData, index, total, fakeTable } = this.state;
            if (index < 0) {
                this.setState({
                    id: '',
                    notiConfirm: '',
                    orderId: '',
                    orderCode: '',
                    status: '',
                    customer: {},
                    listData: [],
                    total: 0,
                    orderType: '',
                    index: -1,
                    doctor: {},
                    jobCtime: '',
                    jobInstruction: '',
                    jobSubclinical: '',
                    retailCustomerName: '',
                    retailCustomerPhone: '',
                    fakeTable: [{},{},{},{},{},{}],
                });
            } else {
                let item = listData[index];
                total -= item.amount * item.price * (100 - item.discount) / 100;
                listData.splice(index, 1);
                if(listData.length < 5){
                    fakeTable.push({});
                }
                if (listData.length < 1) {
                    this.setState({
                        listData,
                        index: -1,
                        notiConfirm: '',
                        total,
                        orderType: '',
                        fakeTable
                    });
                } else {
                    this.setState({
                        listData,
                        index: -1,
                        notiConfirm: '',
                        total,
                        fakeTable
                    });
                }
            }
        } else {
            this.setState({
                notiConfirm: '',
                index: -1,
            });
        }
    };

    OnSubmitOrderId = () => {
        let orderCode = this.state.orderCode;
        let fakeTable = this.state.fakeTable;
        PharmacyService.getOrder(orderCode)
            .then(res => {
                let result = res.data.view_order;
                let doctor = res.data.user;
                let jobId = res.data.job.id;
                let jobCtime = res.data.job.ctime;
                let jobInstruction = res.data.job.state.textDiagnosis;
                let jobSubclinical = res.data.job.state.subclinical;
                let listProduct = [];
                let orderId = result.id;
                let orderType = result.type;
                let jobStepId = result.ref_id;
                let listLot = this.state.listLot;
                result.items.forEach((item) => {
                    if (item.ref === 'product') {
                        listProduct.push(item);
                    }
                });
                let listData = [];
                let total = 0;
                listProduct.forEach((p) => {
                    let obj = {};
                    obj.itemId = p.id;
                    obj.amount = p.quantity;
                    obj.name = p.ref_value.name;
                    obj.attrs = p.ref_value.attrs;
                    obj.attrs.instruction = 'Ngày uống: ' + (obj.attrs.default_daily_usage) + ' lần x '  + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit)  
                    obj.product_id = p.ref_id;
                    obj.price = p.origin_price;
                    obj.discount = p.discount;
                    total += p.quantity * p.ref_value.price * (100 - p.discount) / 100;
                    let oldestLot = 10000;
                    listLot.forEach((l, i) => {
                        if (l.ref_id === p.ref_id) {
                            if (oldestLot > l.remainDate) {
                                oldestLot = l.remainDate;
                                obj.color = l.color;
                                obj.lot_id = l.id;
                                obj.selected = i;
                                obj.remain = l.remain;
                                if (l.remain < p.quantity) {
                                    obj.err = 'Số lượng không đủ';
                                }
                            }
                        }
                    });
                    listData.push(obj);
                    if(fakeTable.length > 0) fakeTable.splice(0,1);
                });
                this.setState({
                    status: result.status,
                    customer: result.customer,
                    listData,
                    total,
                    orderId,
                    orderType,
                    jobStepId,
                    doctor,
                    jobId,
                    jobCtime,
                    jobInstruction,
                    jobSubclinical,
                    activeTab: '1',
                });
            });
        PharmacyService.getCustomer(orderCode)
            .then(response => {
                let customer = response.data;
                this.setState({ customer })
                PharmacyService.getOrderByCustomer(customer.id)
                    .then(res => {
                        let data = res.data.reverse();
                        data.splice(10);
                        this.setState({
                            showOrder: true,
                            listOrder: data,
                            activeTab: '1',
                        })
                    })
                    .catch(err => console.log(err));
            });
    }
    onSubmitProduct = () => {
        let { listData, orderType, orderId, jobStepId, jobInstruction, doctor, activeTab } = this.state;
        let obj = {
            order_id: orderId,
            items: []
        }
        listData.forEach(l => {
            console.log('l', l);
            if (l.err) {
                this.setState({
                    notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
                });
            } else {
                obj.items.push({
                    amount: -l.amount,
                    lot_id: l.lot_id
                })
            }
        })
        let data;
        if (orderType === ORDER_TYPE.ETC.code || orderType === ORDER_TYPE.OTC.code) {
            data = {
                id: jobStepId,
                result: {
                    instruction: jobInstruction,
                    doctorName: doctor.first_name ? doctor.last_name + ' ' + doctor.first_name : '',
                }
            }
        } else {
            data = {
                id: jobStepId,
                result: {
                    key: 'value'
                }
            }
        }

        if(activeTab === '2'){
            ///KHACH LE
            PharmacyService.createTransactionRetail(obj)
            .then(() => {
                this.setState({
                    notiMessage: 'Xác nhận thành công!',
                    
                });
                this.getDataListLot();
                this.onPrintPharmacy();
            }).catch(err => {
                this.setState({
                    notiMessage: 'Đã có lỗi xảy ra, vui lòng báo cho nhân viên kỹ thuật !!'
                });
                console.log(err);
            });
        }else{
            PharmacyService.createTransaction(obj)
            .then(() => {
                this.setState({
                    notiMessage: 'Xác nhận thành công!',
                    
                });
                this.getDataListLot();
                this.onPrintPharmacy();
            }).catch(err => {
                this.setState({
                    notiMessage: 'Đã có lỗi xảy ra, vui lòng báo cho nhân viên kỹ thuật !!'
                });
                console.log(err);
            });
        }
    }
    doneAlert = () => {
        if (this.state.refresh) {
            this.setState({
                id: '',
                notiMessage: '',
                orderId: '',
                orderCode: '',
                status: '',
                listData: [],
                total: 0,
                orderType: '',
                index: -1,
                doctor: {},
                jobCtime: '',
                jobInstruction: '',
                refresh: true,
            });
        } else {
            this.setState({
                notiMessage: '',
                refresh: true,
            })
        }

    }
    onSubmitCancel = () => {
        this.setState({
            notiConfirm: 'Bạn muốn tạo đơn khác ?',
        });
    }
    refreshOrder = () => {
        this.setState({
            listData: [],
            doctor: {},
            jobCtime: '',
            jobInstruction: '',
            status: '',
            orderType: ORDER_TYPE.OTHER.code,
            index: -1,
            total: 0,
            orderCode: '',
            orderId: '',
            fakeTable: [{},{},{},{},{}],
        })
    }
    createOrder = () => {
        console.log('create');
        let { listData, jobId, activeTab, retailCustomerName, retailCustomerPhone } = this.state;
        let location = JSON.parse(sessionStorage.getItem('location'));
        if (listData.length > 0) {
            console.log('leng> 1');
            if (activeTab === '1') {
                let arrs = [];
                listData.forEach(d => {
                    let item = {}
                    item.ref = 'product';
                    item.ref_id = d.product_id;
                    item.quantity = d.amount;
                    arrs.push(item);
                })
                let data = {
                    job_id: jobId,
                    location_id: location?.id,
                    type: 'buy',
                    order_type: ORDER_TYPE.OTHER.code,
                    items: arrs
                };
                PharmacyService.createOrder(data)
                    .then(res => {
                        this.setState({
                            status: STATUS.NEW,
                            orderId: res.data.order_id,
                            orderCode: res.data.code,
                            refresh: false,
                            notiMessage: 'Tạo đơn mới thành công!'
                        })
                    }).catch(err => {
                        this.setState({ notiMessage: 'Lỗi !!  Vui lòng kiểm tra lại!!' })
                        console.log(err)
                    });
            } else {
                // KHACH LE
                if(!retailCustomerName){
                    this.setState({
                        refresh: false,
                        notiMessage: 'Tên bệnh nhân không được để trống!'
                    })
                }if(retailCustomerPhone[0] !== '0' || retailCustomerPhone.length !== 10){
                    this.setState({
                        refresh: false,
                        notiMessage: 'Số điện thoại không đúng định dạng!'
                    })
                }else {
                    const retailCustomer = {
                        retailCustomerName,
                        retailCustomerPhone
                    }
                    let arrs = [];
                    listData.forEach(d => {
                        let item = {}
                        item.ref = 'product';
                        item.ref_id = d.product_id;
                        item.quantity = d.amount;
                        arrs.push(item);
                    })
                    const data = {items : arrs};
                    PharmacyService.createRetailOrder(data)
                    .then(res => {
                        this.setState({
                            status: STATUS.NEW,
                            orderId: res.data.id,
                            orderCode: res.data.code,
                            refresh: false,
                            notiMessage: 'Tạo đơn mới thành công!'
                        })
                    }).catch(err => {
                        this.setState({ notiMessage: 'Lỗi !!  Vui lòng kiểm tra lại!!' })
                        console.log(err)
                    });
                }
            }
        }
    }
    remainDate(exp_date) {
        let now = Date.now();
        let time = new Date(exp_date).getTime();
        let result = (time - now) / ONE_DAY;
        return Math.ceil(result);
    }
    handlePayment = () => {
        let { listData, arrUpdateQty } = this.state;
        listData.forEach(l => {
            if (l.err) {
                this.setState({
                    notiMessage: 'Lỗi !!  Vui lòng kiểm tra lại!!'
                });
            } else {
                if (arrUpdateQty.length > 0) {
                    PharmacyService.updateQuantity(arrUpdateQty)
                    .then(res => {
                        this.setState({ show: true })
                    }).catch(e => {
                        console.log(e);
                        this.setState({
                            notiMessage: 'Thay đổi số lượng thuốc thất bại!!'
                        });
                    })
                }
                this.setState({ show: true })
            }
        })
    }
    handleClose = () => { this.setState({ show: false }) }
    onClose = () => { 
        if(this.state.listOrder.length > 0){
            const jobId = this.state.listOrder[0].job_id;
            this.setState({jobId});

        }else{
            PharmacyService.getJob(this.state.customer.id)
            .then(res => {
               const jobId = res.data.reverse()[0].steps[0].job_id;
               this.setState({jobId});
            }).catch(err => {
                this.setState({notiMessage: 'Lỗi !!  Vui lòng kiểm tra lại!!'});
                console.log(err);
            });
        }
        this.setState({ 
            showOrder: false,
        })}
    affterPayment = () => {
        this.setState({ 
            status: STATUS.PAID, 
        });
    }
    onSelectOrder = (index) => {
        let fakeTable = this.state.fakeTable;
        const jobSubclinical = this.state.jobSubclinical;
        const jobId = this.state.listOrder[index].job_id;
        const selectedOrder = this.state.listOrder[index].order;
        const itemOrder = selectedOrder.items;
        let orderId = selectedOrder.id;
        let orderCode = selectedOrder.code;
        let status = selectedOrder.status;
        let orderType = selectedOrder.type;
        let jobStepId = selectedOrder.ref_id;
        let total = 0;
        let listData = [];
        itemOrder.forEach(el => {
            let obj = {}
            obj.itemId = el.id;
            obj.amount = el.quantity;
            obj.name = el.ref_value.name;
            obj.product_id = el.ref_value.id;
            obj.price = el.ref_value.price;
            if (status === STATUS.PAID) {
                obj.discount = el.discount;
            } else {
                obj.discount = 0;
            }
            total += obj.amount * obj.price * (100 - obj.discount) / 100;
            obj.parts = el.ref_value.parts;
            obj.attrs = el.ref_value.attrs;
            obj.attrs.instruction = 'Ngày uống: ' + (obj.attrs.default_daily_usage) + ' lần x '  + (obj.attrs.unit === 'tablet' ? obj.attrs.default_quantity/obj.attrs.strength + ' viên' :  obj.attrs.default_quantity + obj.attrs.unit) 
            let oldestLot = 10000;
            this.state.listLot.forEach((l, i) => {
                if (l.ref_id === el.ref_id && l.remain > 0) {
                    if (oldestLot > l.remainDate) {
                        oldestLot = l.remainDate;
                        obj.color = l.color;
                        obj.lot_id = l.id;
                        obj.selected = i;
                        obj.remain = l.remain;
                    }
                }
            });
            listData.push(obj);
            if(fakeTable.length > 0) fakeTable.splice(0,1)
        });
        if (status === STATUS.DONE) {
            status = '';
            orderType = ORDER_TYPE.OTHER.code;
            orderId = '';
            orderCode = '';
        }
        this.setState({
            jobId,
            orderId,
            orderCode,
            orderType,
            jobStepId,
            status,
            listData,
            showOrder: false,
            total
        });
    }
    selectTypeCustomer = (tab) => {
        let { activeTab } = this.state
        if (activeTab !== tab) this.setState({ activeTab: tab })
    }
    updateOrrder = () => {
        let { listData, status } = this.state;
        if(status !== STATUS.NEW) return;
        let data = [];
        listData.forEach(l => {
            data.push({
                id: l.itemId,
                quantity: l.amount
            });
        })
        PharmacyService.updateQuantity(data)
        .then(res => {
            this.setState({
                refresh: false,
                notiMessage: 'Cập nhật số lượng thành công!'
            });
        }).catch(err => {
            console.log(err);
            this.setState({
                notiMessage: 'Cập nhật số lượng thất bại!'
            });
        })
    }
    onPrintPharmacy = () => {
        printJS({
            printable: 'medPrintId',
            type: 'html',
            css: './PrintPharmacy.scss',
            targetStyles: ['*'],
            style: `@page {
                    size: A4;
                    margin: 0;
                            },
                        @media print {
                            .medPrintId{
                                margin: 0;
                                border: initial;
                                border-radius: initial;
                                width: initial;
                                min-height: initial;
                                box-shadow: initial;
                                background: initial;
                                page-break-after: always;
                            }`,
            header: null,
            footer: null,
        });
    }
    render() {
        let { orderCode, orderId, listProduct, listLot, listData, status, customer, total, orderType, doctor, jobInstruction, jobCtime, show, showOrder, listOrder, activeTab, fakeTable, jobSubclinical, retailCustomerName, retailCustomerPhone } = this.state;
        let order_ctime = new Date(jobCtime);

        let itemPharmacy = listData.map((itemP, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="ma">{itemP.product_id}</td>
                    <td className="name">{itemP.name}</td>
                    <td>{itemP.price? new Intl.NumberFormat('de-DE').format(itemP.price) + 'đ' : ''}</td>
                    <td>
                        <Input style={{ 'backgroundColor': itemP.color }} className="number pointer middle" type="select" name="lot_id" onChange={(e) => this.onChangeB(e, index)}>
                            {listLot.map((data, i) => {
                                if (data.ref_id === itemP.product_id && data.remain > 0) {
                                    return (
                                        <option key={i} className="pointer" selected={i == itemP.selected ? true : false} style={{ 'backgroundColor': data.color }} value={data.id}> {data.code} -- Còn lại: {data.remain}   </option>
                                    );
                                }
                                return null;
                            })}
                        </Input>
                    </td>
                    <td className="quantity">
                        <Input readOnly={status === STATUS.PAID || status === STATUS.DONE || ( orderType === ORDER_TYPE.OTHER.code && status !== '' )} style={{ 'borderColor': itemP.err ? 'red' : '' }} type="text" name="amount" placeholder="Số lượng" value={itemP.amount} onChange={e => this.onChangeQ(e, index, itemP.price)} />
                        <span style={{ 'color': 'red' }}>{itemP.err}</span>
                    </td>
                    <td> {itemP.discount ? itemP.discount + '%' : '0%'} </td>
                    <td>{itemP.amount > 0 ? new Intl.NumberFormat('de-DE').format(itemP.amount * itemP.price) +'đ' : '0đ'} </td>
                    <td className="instruction">
                        {itemP.attrs ?
                            <Input name="instruction" className="instruction-content" type="textarea" onChange={e => this.onChangeInstruction(e, index)}
                                value={itemP.attrs.instruction}
                            /> 
                        : null}
                    </td>
                    <td><Button hidden={status !== ""} className="btnDelete" color="danger" onClick={e => this.onDelete(e, index)}> X </Button></td>
                </tr>
            )
        });

        return (
            <Fragment>
                <ModalNoti message={this.state.notiMessage} done={this.doneAlert}></ModalNoti>
                <ModalConfirm message={this.state.notiConfirm} answer={this.answer} ></ModalConfirm>
                <div>
                    <Col xs={12}>
                        <Row className="searchCode customCard mb-10 align-center">
                            <Label className="title-card" sm={3}><span className="material-icons">playlist_add_check</span> Nhập mã đơn hàng/mã bệnh nhân: </Label>
                            <Col sm={3}>
                                <Input disabled={orderType === ORDER_TYPE.OTHER.code} type="text" name="orderCode" value={orderCode} onChange={this.onChange} />
                            </Col>
                            <Col sm={1}>
                                <Button type="button" onClick={this.OnSubmitOrderId} outline color="primary" ><span className="material-icons">search</span></Button>
                            </Col>
                            <Label sm={{ size: 1, offset: 1 }}>{status === '' ? '' : 'Trạng thái: '}</Label>
                            <Label sm={1}> {status === '' ? '' : status === STATUS.NEW ? 'Chưa thanh toán' : status === STATUS.PAID ? 'Đã thanh toán ' : 'Hoàn tất '}
                                {status === '' ? null : status === STATUS.NEW ? <FontAwesomeIcon color={'red'} icon={'fas', faTimesCircle} /> : <FontAwesomeIcon color={'green'} icon={'fas', faCheckCircle} />}
                            </Label>
                            <Col className="end" sm={2}>
                                <Clock></Clock>
                            </Col>
                        </Row>
                        <Nav tabs>
                            <NavItem className="pointer">
                                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { this.selectTypeCustomer('1'); }}>Theo đơn</NavLink>
                            </NavItem>
                            <NavItem className="pointer">
                                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { this.selectTypeCustomer('2'); }}>Bán lẻ</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} className="mb-10">
                            <TabPane tabId="1" className="customCard">
                                <Row className="customer pt-0">
                                    <Col xs={6} className="no-padding vertical-line">
                                        <CustomerForm data={{ code: customer.code, full_name: customer.full_name, birthday: customer.birthday, gender: customer.gender, contacts: customer?.contacts }} mode="pharmacy"></CustomerForm>
                                        <Row className="pt-5 ml-10">
                                            <Col xs={11} className="ml-10">
                                                <Row className="mb-1">
                                                    <Col xs={2} className="no-padding">Chẩn đoán:</Col>
                                                    <Col xs={10} className="no-padding">{jobInstruction}</Col>
                                                </Row>
                                            </Col>
                                        </Row>                      
                                    </Col>
                                    <Col xs={{ 'size': '6',}} className="doctor_info pl-40">
                                        <h5 className="title-card"><span className="material-icons">person_add</span> Thông tin bác sĩ</h5>
                                        <Row>
                                            <Label xs={2} className="p-0">Bệnh viện:</Label>
                                            <Label xs={5} className="p-0">{doctor.hostpital}</Label>
                                            <Label xs={1} className="p-0">Khoa:</Label>
                                            <Label xs={4} className="p-0">{doctor.class}</Label>
                                        </Row>
                                        <Row className="p0">
                                            <Label xs={2} className="p-0">Họ tên:</Label>
                                            <Label xs={5} className="p-0">{doctor?.full_name}</Label>
                                            <Label xs={1} className="p-0">SDT:</Label>
                                            <Label xs={4} className="p-0">{doctor.phone}</Label>
                                        </Row>
                                        <Row className="p0">
                                            <Label xs={2} className="p-0">Ngày kê đơn:</Label>
                                            <Label xs={10} className="p-0"> {jobInstruction !== '' ? order_ctime.toLocaleString('en-GB').slice(0,10) : null} </Label>
                                        </Row>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row className="customCard customer">
                                    <Col xs={4} className="doctor_info min-h-30">
                                        <h5 className="title-card"><span className="material-icons">person</span> Thông tin khách</h5>
                                        <Row>
                                            <Label xs={3}>Họ tên:</Label>
                                            <Col xs={9}>
                                                <Input type="text" name="retailCustomerName" value={retailCustomerName} onChange={this.onChange} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Label xs={3}>SDT:</Label>
                                            <Col xs={9}>
                                                <Input type="text" name="retailCustomerPhone" value={retailCustomerPhone} onChange={this.onChange} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                        <Row className="search-product customCard mb-10">
                            <Col xs={2} className="title-card pb-10">
                                <span className="material-icons">search</span>Tìm kiếm thuốc
                            </Col>
                            <Col xs={10}>
                                <FormSearch onSelect={this.onSelect} order_id={orderId} list={listProduct} />
                            </Col>
                        </Row>
                        <Row className="info customCard">
                            <Col className="title-card" xs={8}><Medicine xmlns="http://www.w3.org/2000/svg" className="flaticon-icons" fill="#28b76b"/> Thông tin đơn thuốc :
                            </Col>
                            <br></br>
                            <br></br>
                            <div className="pharmacy-table">
                                <Table bordered >
                                    <thead>
                                        <tr>
                                            <th >STT</th>
                                            <th className="ma">Mã thuốc</th>
                                            <th className="name" >Tên thuốc</th>
                                            <th >Đơn giá</th>
                                            <th >Số lô</th>
                                            <th className="quantity">Số lượng</th>
                                            <th >Chiết khấu</th>
                                            <th >Thành tiền</th>
                                            <th>Hướng dẫn</th>
                                            <th ></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bodyTable">
                                        {itemPharmacy}
                                        {fakeTable.map((f, fIndex) => {
                                            return (
                                                <tr key={fIndex} height="60px">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            )              
                                        })}
                                        {/* <tr>
                                            <td></td>
                                            <td className="ma"></td>
                                            <td className="name"><FormSearch onSelect={this.onSelect} order_id={orderId} list={listProduct} /></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td className="instruction"></td>
                                            <td></td>
                                        </tr> */}
                                        {/* ////////////TONG//////////////// */}
                                        <tr>
                                            <td></td>
                                            <td className="ma"></td>
                                            <td className="name"></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>Tổng tiền:</td>
                                            <td>{new Intl.NumberFormat('de-DE').format(total)} đ</td>
                                            <td className="instruction"></td>
                                            <td ></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div className="options-pharmacy">
                                <Button hidden={status === STATUS.NEW &&  orderType !== ORDER_TYPE.OTHER.code ? false : true} onClick={this.updateOrrder}>Cập nhật số lượng</Button>
                                <Button hidden={status === STATUS.NEW ? false : true}
                                    className="ml-10"
                                    data-index="10"
                                    color="primary"
                                    onClick={this.handlePayment}
                                >Thanh toán</Button>
                                <Modal isOpen={show} >
                                    <ModalHeader>
                                        Thu Ngân
                                        </ModalHeader>
                                    <ModalBody>
                                        <AccountingForm handleClose={this.handleClose} mode="pharmacy" retail={activeTab === '2' ? true : false} retailCustomerName={retailCustomerName}  affterPayment={this.affterPayment} billID={orderCode}></AccountingForm>
                                    </ModalBody>
                                    <ModalFooter><Button onClick={this.handleClose}>Close</Button></ModalFooter>
                                </Modal>
                                <Button color='primary' hidden={status === STATUS.DONE ? false : true} onClick={this.onPrintPharmacy}>In Hóa Đơn</Button>{' '}
                                <Button hidden={status === STATUS.PAID ? false : true} color='primary' onClick={this.onSubmitProduct} >Xác nhận lấy thuốc</Button>
                                <Button hidden={status === '' && orderType === ORDER_TYPE.OTHER.code ? false : true} onClick={this.createOrder} color='primary' >Xác nhận tạo đơn mới</Button>
                                <Button hidden={status === STATUS.DONE ? false : true} onClick={this.refreshOrder} color='primary' >Tạo đơn mới</Button>
                                <Button style={{ 'marginLeft': '10px' }} color='danger' onClick={this.onSubmitCancel} >Hủy</Button>
                            </div>
                            <PrintPharmacy etcArr={listData} etcCode={orderCode} cusData={activeTab === '1' ? customer : {full_name: retailCustomerName, contacts: [{phone: retailCustomerPhone, address:{}}]}} total={total}></PrintPharmacy>
                        </Row>
                    </Col>
                </div>
                <Modal className="pharmacy-list-order" isOpen={showOrder} >
                    <ModalHeader>
                        Lịch sử đơn thuốc
                    </ModalHeader>
                    <ModalBody>
                        <ModalOrder onSelectOrder={this.onSelectOrder} listOrder={listOrder} ></ModalOrder>
                    </ModalBody>
                    <ModalFooter><Button onClick={this.onClose}>Close</Button></ModalFooter>
                </Modal>
               
            </Fragment>
        );
    }
}
export default FormPharmacy;