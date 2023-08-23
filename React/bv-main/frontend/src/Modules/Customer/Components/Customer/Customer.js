import React, { Component, Fragment } from 'react';
import { Col, Row, Button } from 'reactstrap';
// import { addCm, modifyCm, addCmContact, modifyCmContact, getCmByPhone } from '../Shared/CustomerAPI';
import ModalConFirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import CustomerBasic from '../CustomerBasic/CustomerBasic';
import CustomerContact from '../CustomerContact/CustomerContact';
import CustomerResult from '../CustomerResult/CustomerResult';
import instance from '../../Shared/CustomerService';

const initialState = {
    customer: {
        full_name: '', idnum: '',
        gender: '', birthday: ''
    },
    customer_contact: {
        full_name: '', phone_number: '',
        address: '', email: '', relation: ''
    },
    search_customer: {
        full_name: '', idnum: '',
        gender: '', birthday: '', id: ''
    },
    search_contact: {
        full_name: '', phone_number: '',
        address: '', email: '', relation: ''
    },
    search_history: {
        time: '',
    },
    old_customer: false,
    showHistory: true,
    modalConfirm: { 
        message: '',
        modalMatchDataDisplay: false,
        modalCancelDisplay: false , 
        modalSaveDisplay: false
    }
}

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.doAddOrModifyCustomer = this.doAddOrModifyCustomer.bind(this);
    }


    changeName = full_name => {
        this.setState(state => ({
            ...state,
            customer: {
                ...state.customer,
                full_name
            }
        }));
    }

    changeIdent = idnum => {
        this.setState(state => ({
            ...state,
            customer: {
                ...state.customer,
                idnum
            }
        }));
    }

    changeGender = gender => {
        this.setState(state => ({
            ...state,
            customer: {
                ...state.customer,
                gender
            }
        }));
    }

    changeBirthday = birthday => {
        this.setState(state => ({
            ...state,
            customer: {
                ...state.customer,
                birthday
            }
        }));
    }

    handleCancel = () => {
        this.setState(state => ({
            ...state,
            modalConfirm: {
                ...state.modalConfirm,
                message: 'Chắc chắn huỷ ?',
                modalCancelDisplay: true
            }
        }));  
    }

    doCancel = argument => {
        if (argument) {
            this.setState(initialState);
        } else {
            this.setState(state => ({
                ...state,
                modalConfirm: {
                    ...state.modalConfirm,
                    message: '',
                    modalCancelDisplay: false
                }
            }));
        }
    }

    handleSave = () => {
        this.setState(state => ({
            ...state,
            modalConfirm: {
                ...state.modalConfirm,
                message: 'Chắc chắn lưu ?',
                modalSaveDisplay: true
            }
        })); 
    }

    doAddOrModifyCustomer = async argument => {
        const { id } = this.state.search_customer.id;
        if (argument) {
            try {
                if (!id) {
                    await instance.addCm(this.state.customer);
                    await instance.addCmContact(this.state.customer_contact);
                    
                }
                if (id) {
                    await instance.modifyCm(id, this.state.customer);
                    await instance.modifyCmContact(id, this.state.customer_contact);
                } 
                
                
            } catch (err) {
                throw (err);
            } finally {
                this.setState(initialState);
            }
        } else {
            this.setState(state => ({
                ...state,
                modalConfirm: {
                    ...state.modalConfirm,
                    message: '',
                    modalSaveDisplay: false
                }
            }));
        }
    }

    showOrHideHistory = () => {
        this.setState(state => ({
            ...state,
            showHistory: !state.showHistory
        }));
    }

    handleMatchHistory = () => {
        this.setState(state => ({
            ...state,
            modalConfirm: {
                message: 'Chắc chắn lấy dữ liệu vào bảng ?',
                modalMatchDataDisplay: true,
                modalCancelDisplay: false,
                modalSaveDisplay: false,
            }
        })); 
    }

    matchHistory = argument => {
        if (argument) {
            const { full_name, idnum,
                birthday, gender } = this.state.search_customer;


            this.setState(state => ({
                ...state,
                customer: {
                    full_name, idnum, birthday, gender
                },
                customer_contact: {
                    full_name: this.state.search_contact.full_name,
                    phone_number: this.state.search_contact.phone_number,
                    address: this.state.search_contact.address,
                    email: this.state.search_contact.email,
                    relation: this.state.search_contact.relation,
                },
                modalConfirm: {
                    ...state.modalConfirn,
                    modalMatchDataDisplay: false,
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                modalConfirm: {
                    ...state.modalConfirn,
                    modalMatchDataDisplay: false,
                }
            }));
        }
    } 

    changeContactName = full_name => {
        this.setState(state => ({
            ...state,
            customer_contact: {
                ...state.customer_contact,
                full_name
            }
        }));
    }

    changeContactPhone = phone_number => {
        this.setState(state => ({
            ...state,
            customer_contact: {
                ...state.customer_contact,
                phone_number
            }
        }));
    }
    
    changeContactAddress = address => {
        this.setState(state => ({
            ...state,
            customer_contact: {
                ...state.customer_contact,
                address
            }
        }));
    }

    changeContactEmail = email => {
        this.setState(state => ({
            ...state,
            customer_contact: {
                ...state.customer_contact,
                email
            }
        }));
    }

    changeContactRelation = relation => {
        this.setState(state => ({
            ...state,
            customer_contact: {
                ...state.customer_contact,
                relation
            }
        }));
    }

    match_search_customer = result => {
        if (result !== null) {
            const { full_name, gender, birthday, idnum, id } = result;
            this.setState(state => ({
            ...state,
            search_customer: {
                full_name, gender, birthday, idnum, id
            }}));
        } return
        
    }
    

    match_search_contact = result => {
        if (result !== null) {
            const { full_name, phone_number, address, email, relation } = result;
            this.setState(state => ({
            ...state,
            search_contact: {
                full_name, phone_number, address, email, relation
            }}));
        } else return 
        
    }

    match_search_history = result => {
        if (result !== null) {
            const { time } = result;
            this.setState(state => ({
            ...state,
            search_history: {
                time: new Date(time).toLocaleDateString('en-CA')
            }}));
        } else return
        
    }

    matchResponseToSearch = response => {
        this.match_search_customer(response[0]);
        this.match_search_contact(response[1]);
        this.match_search_history(response[2]);
    }

    handleSearchPhone = async phone => {
        try {
            const response = await instance.getCmByPhone(phone);
            if (response) {
                this.matchResponseToSearch(response);
                this.setState(state => ({
                    ...state,
                    old_customer: true
                }));
            }
            else {
                this.setState(state => ({
                    ...state,
                    old_customer: false
                }));
            }
        } catch (err) {
            throw (err);
        }
    }

    render() {
        const { customer, search_customer, customer_contact, search_contact,
                search_history, old_customer, showHistory } = this.state;
        const { message, modalMatchDataDisplay, 
            modalCancelDisplay, modalSaveDisplay } = this.state.modalConfirm;

        return (
            <Fragment>
                <div className="customer">
                    <h2>Thông tin bệnh nhân</h2>
                    <Row>
                        <Col xl="6" lg="6" md="6" sm="12" xs="12">
                            <CustomerBasic search_customer={search_customer} customer={customer}
                            onChangeName={this.changeName} onChangeGender={this.changeGender}
                            onChangeBirthday={this.changeBirthday} onChangeIdent={this.changeIdent}
                             />
                        </Col>
                        <Col xl="6" lg="6" md="6" sm="12" xs="12">
                            <CustomerContact 
                            customer_contact={customer_contact}
                            search_contact={search_contact}
                            onChangeName={this.changeContactName} 
                            onChangePhone={this.changeContactPhone}
                            onChangeAddress={this.changeContactAddress}
                            onChangeEmail={this.changeContactEmail}
                            onChangeRelation={this.changeContactRelation}
                            onSearchPhone={this.handleSearchPhone}
                             />
                        </Col>
                    </Row>
                    <Row className="row">
                        <Col className="customer-button-area">
                            <Button className="cancel-btn" outline color="primary"
                             title="cancel" onClick = {this.handleCancel}>Huỷ</Button>
                            <Button onClick={this.handleSave}outline color="primary" title="save">Lưu</Button>
                        </Col>
                    </Row>
                    { old_customer ? <CustomerResult onHistory={this.showOrHideHistory}
                                    showHistory={showHistory} search_customer={search_customer}
                                    search_history={search_history} onMatchHistory={this.handleMatchHistory}
                    /> : <span></span> }
                </div>
                {
                    modalMatchDataDisplay ?  <ModalConFirm message={message} answer={this.matchHistory}/> 
                    : <span></span>
                }
                {
                    modalCancelDisplay ?  <ModalConFirm message={message} answer={this.doCancel}/> 
                    : <span></span>
                }
                {
                    modalSaveDisplay ?  <ModalConFirm message={message} answer={this.doAddOrModifyCustomer}/> 
                    : <span></span>
                }
            </Fragment>
        )
    }
}

export default Customer