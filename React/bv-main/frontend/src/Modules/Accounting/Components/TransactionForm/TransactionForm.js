import React, { Fragment } from 'react';
import { Button, FormGroup, Input, Col, Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import { FormParent, ModalNoti } from '../../../Reception/Shared';
import TransactionService from '../../Shared/TransactionService';
import TransTable from './TransTable';
import CancelTable from './CancelTable';
import Select from 'react-select';
import { Util } from '../../../../Helper/Util';
import AuthService from "../../../../Shared/Services/AuthService";
import { ROLE, SERVICE_TYPE, STEP_TYPE, STATUS, PAY_METHOD, ALL } from "../../Shared";
import TransactionModal from './TransactionModal';
import TransPharmacy from './TransPharmacy';
class TransactionForm extends FormParent {
  constructor(props) {
    super(props);
    let today = new Date().toISOString();
    let date = today.substr(0, 10);
    this.state = {
      customers: [],
      itemsCancel: [],
      itemsTransaction: [],
      textSearch: '',
      listStepCancel: [],
      listUserPharmacy: [],
      isManager: false,
      policyPriceList: [],
      userList: [],
      notiMessage: '',
      selectedUser: null,
      show: false,
      activeTab: '1',
      startTime: '6',
      endTime: '22',
      form: this._getInitFormData({
        user_id: '',
        userFirstName: '',
        userLastName: '',
        userFullName: '',
        start_date: date,
        end_date: date,
        bookId: '',
        amount: '',
        cTime: '',
        transactionId: '',
      }),
    }
    // this.handleChange.bind(this)
  };
  setShow = (show) => {
    this.setState({ show });
  }
  findUserbyId = (id) => {
    return TransactionService.getUserbyId(id)
  }
  findHistoryTransaction = (user_id, start_date, end_date) => {
    return TransactionService.getHistoryTransactionByTimeAndUserID(user_id, start_date, end_date)
  }

  handleSearch = () => {
    let { start_date, end_date, } = this.state.form;

    let { selectedUser, startTime, endTime } = this.state;

    if (selectedUser == undefined) {
      this.setNotiMessage("Có lỗi! Xin vui lòng chọn nhân viên ")
    } else {
      this.findHistoryTransaction(selectedUser.value, start_date.value,
        end_date.value).then((res) => {
          console.log('data', res.data);
          let transactionInfo = res.data;
          let items = []
          let itemsCancel = []
          transactionInfo?.records
            .filter(t => {
              let time = new Date(t.ctime);
              time = time.getHours();
              if (time >= startTime && time < endTime) {
                return t;
              }
            })
            .forEach(t => {
              if (t.job_step?.status === STATUS.CANCEL) {
                itemsCancel.push(t);
              } else {
                items.push(t)
              }
            });
          let arrIdCustomer = [];
          let customers = [];
          items.forEach(i => {
            if (!arrIdCustomer.includes(i.order?.customer?.id)) {
              arrIdCustomer.push(i.order?.customer?.id);
              customers.push({
                id: i.order?.customer?.id,
                code: i.order?.customer?.code,
                name: i.order?.customer?.full_name,
                phone: i.order?.customer?.contacts[0]?.phone,
                address: i.order?.customer?.contacts[0]?.address?.ward + ', ' + i.order?.customer?.contacts[0]?.address?.district + ', ' + i.order?.customer?.contacts[0]?.address?.province,
                birthday: i.order?.customer?.birthday,
                exam: 0,
                test: 0,
                xray: 0,
                ultrasound: 0,
                ent: 0,
                other: 0,
                buy: 0,
              })
            }
          })
          let amountAtm = 0;
          let amountCash = 0;
          items.forEach(i => {
            if (i.type === PAY_METHOD.CASH.code) {
              amountCash += i.amount;
            } else amountAtm += i.amount;
            customers.forEach(a => {
              if (i.order?.customer?.id === a.id) {
                if (i.job_step?.type === STEP_TYPE.EXAM) {
                  a.exam += i.order.total;
                }
                if (i.job_step?.type === STEP_TYPE.BUY) {
                  a.buy += +i.order?.total;
                }
                if (i.job_step?.type === STEP_TYPE.TEST) {
                  if (i.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ULTRASOUND) {
                    a.ultrasound += +i.order.total;
                  }
                  if (i.order?.items[0]?.ref_value?.type === SERVICE_TYPE.TEST) {
                    a.test += +i.order.total
                  }
                  if (i.order?.items[0]?.ref_value?.type === SERVICE_TYPE.XRAY) {
                    a.xray += +i.order.total
                  }
                  if (i.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ENT) {
                    a.ent += +i.order.total
                  }
                  if (i.order?.items[0]?.ref_value?.type === SERVICE_TYPE.OTHER) {
                    a.other += +i.order.total
                  }
                }
              }
            })
          })
          itemsCancel.map(i => {
            TransactionService.getStep(i.job_step.id)
              .then(res => {
                itemsCancel.find(c => {
                  if (c.job_step.id === res.data.id) {
                    c.job_step.results = res.data.results;
                    return c;
                  }
                });
              }).catch(err => console.log(err))
          })
          this.setShow(true)
          this.setState({
            customers,
            itemsCancel,
            itemsTransaction: items,
            amountCash,
            amountAtm,
            amountCancel: transactionInfo?.revuene?.cash,
            amountProduct: transactionInfo?.revuene?.otc_drug,
          })
          if (transactionInfo.count === 0) {
            this.setNotiMessage("Không có giao dịch trong khoảng thời gian này");
          }
        }).catch(err => {
          console.log(err)
          this.setNotiMessage("Không có giao dịch trong khoảng thời gian này");
          this.setSubmitLoading(false);
        })

    }
  }

  getUserList = () => {
    TransactionService.getUserList().then(res => {
      let listUserPharmacy = res.data.filter(u => u.roles[0] === ROLE.PHARMACIST.value || u.roles[0] === ROLE.INVENTORY.value)
      res.data.unshift({ id: ALL.code, full_name: ALL.label })
      this.setUserList(res.data)
      this.setState({ listUserPharmacy })
    })
  }

  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage });
  };
  setSubmitLoading = (submitLoading) => {
    this.setState({ submitLoading });
  };

  setUserList = (userList) => {
    this.setState({ userList: userList })
  }

  handleChangeSelectUser = (selectedUser) => {
    this.setState({ selectedUser })
  }

  handleExportFile = () => {
    let { start_date, end_date, } = this.state.form;
    let { selectedUser } = this.state;
    if (selectedUser == undefined) {
      this.setNotiMessage("Có lỗi! Xin vui lòng chọn nhân viên ");
    } else {
      // const url = TransactionService.exporExcelTransPharmacy()
      const url = TransactionService.exporExcelTransaction(selectedUser.value, start_date.value, end_date.value);
      window.location.assign(url);
    }

  }

  isRole = () => {
    if (AuthService.isRole(ROLE.ADMIN.value)) {
      this.setState({ isManager: true })
    } else {
      let selectedUser = {
        value: AuthService.userInfo.id,
        label: AuthService.userInfo.full_name
      }
      this.setState({ selectedUser })
    }
  }
  searchCustomer = async (e, customerId) => {
    let { listStepCancel, itemsTransaction } = this.state;
    listStepCancel = itemsTransaction.filter(i => i.order?.customer?.id === customerId);
    this.setState({
      listStepCancel,
      openTrans: true,
    })
  }
  closeTrans = () => {
    this.setState({
      openTrans: false,
      textSearch: '',
      listStepCancel: [],
    })
  }
  afterCancelDone = (step) => {
    let { customers, itemsCancel, amountCash, amountAtm, } = this.state;
    if (step.type === PAY_METHOD.CASH.code) {
      amountCash -= step.amount;
    } else amountAtm -= step.amount;
    customers.find(c => {
      if (c.id === step.order.customer_id) {
        let total = step.order.total
        if (step.job_step.type === STEP_TYPE.EXAM) {
          return c.exam = c.exam - total;
        }
        if (step.job_step.type === STEP_TYPE.BUY) {
          return c.buy = c.buy - total;
        }
        if (step.job_step.type === STEP_TYPE.TEST) {
          if (step.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ULTRASOUND) {
            return c.ultrasound = c.ultrasound - total;
          }
          if (step.order?.items[0]?.ref_value?.type === SERVICE_TYPE.TEST) {
            return c.test = c.test - total;
          }
          if (step.order?.items[0]?.ref_value?.type === SERVICE_TYPE.XRAY) {
            return c.xray = c.xray - total;
          }
          if (step.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ENT) {
            return c.ent = c.ent - total;
          }
          if (step.order?.items[0]?.ref_value?.type === SERVICE_TYPE.OTHER) {
            return c.other = c.other - total;
          }
        }
      }
    })
    itemsCancel.push(step)
    this.setState({
      itemsCancel,
      customers,
      amountAtm,
      amountCash
    })
  }

  componentDidMount() {
    document.getElementById('userName').setAttribute("data-index", "3")
    this.getUserList()
    this.isRole();
  }

  render() {
    const { start_date, end_date } = this.state.form
    const { notiMessage, userList, selectedUser, activeTab, textSearch, listStepCancel, openTrans, cancelTotal, customers, itemsCancel, startTime, endTime } = this.state
    let { amountAtm } = this.state;
    let userOptions = userList.map((item) => ({
      value: item.id,
      label: item.full_name,
    })) || [];

    return (
      <div className="Transaction-Form ">
        <ModalNoti
          message={notiMessage}
          done={() => this.setNotiMessage("")}
        ></ModalNoti>
        <TransactionModal afterCancelDone={this.afterCancelDone} closeTrans={this.closeTrans} openTrans={openTrans} listStepCancel={listStepCancel} />

        <FormGroup className="transaction-filter" row hidden={AuthService?.userInfo?.roles[0] === ROLE.PHARMACIST.value || AuthService?.userInfo?.roles[0] === ROLE.INVENTORY.value ? true : false}>
          <Col>
            <p className="title-card upper margin-title">
              Thông tin giao dịch
            </p>
          </Col>
          <Col sm={2} className="username">
            <Col>
              <Select 
                className="w-input"
                isDisabled={!this.state.isManager}
                onKeyDown={(e) => Util.onKeyDown(e)}
                inputId="userName"
                value={selectedUser}
                options={userOptions}
                placeholder="Chọn nhân viên"
                menuPlacement="top"
                openMenuOnFocus
                onChange={(e) => { this.handleChangeSelectUser(e) }}
                style={{ zIndex: 10000 }}
              />
            </Col>
          </Col>
          <Col sm={1} className="end">
            <label htmlFor="start_date">Từ:</label>
          </Col>
          <Col sm={2}>
            <Input
              className="w-input"
              onKeyDown={(e) => Util.onKeyDown(e)}
              data-index="1"
              autoFocus
              type='date'
              value={start_date && start_date.value}
              onChange={(ev) => { this._setValue(ev, 'start_date') }}
              required
            />
          </Col>

          <Col sm={1} className="end">
            <label htmlFor="end_date">Đến:</label>
          </Col>
          <Col sm={2}>
            <Input
              className="w-input"
              onKeyDown={(e) => Util.onKeyDown(e)}
              data-index="2"
              type='date'
              value={end_date && end_date.value}
              onChange={(ev) => { this._setValue(ev, 'end_date') }}
              required
            />
          </Col>
          <Col sm={1} className="end">
            <Button color="primary"
              onKeyDown={(e) => Util.onKeyDown(e)}
              data-index="4"
              onClick={() => { this.handleSearch() }}>Chọn</Button>
          </Col>
          <Col sm={1} className="end">
            <Button color="primary"
              disabled={selectedUser?.value === ALL.code ? true : false}
              onKeyDown={(e) => Util.onKeyDown(e)}
              data-index="5"
              onClick={() => { this.handleExportFile() }}><span className="material-icons">file_download</span>Tải Excel</Button>
          </Col>
        </FormGroup>
        {AuthService?.userInfo?.roles[0] === ROLE.PHARMACIST.value || AuthService?.userInfo?.roles[0] === ROLE.INVENTORY.value ?
          <FormGroup row>
            <TransPharmacy listUserPharmacy={this.state.listUserPharmacy.reverse()} selected={AuthService.userInfo} />
          </FormGroup>
          :
          <Fragment>
            <FormGroup row className='transaction-table mt-70'>
              <Col sm={12}>
                <Nav tabs>
                  <NavItem>
                    <NavLink className={`transaction-nav pointer ${activeTab === '1' ? 'active' : ''}`} onClick={() => this.setState({ activeTab: '1' })}>Giao dịch</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={`transaction-nav pointer ${activeTab === '2' ? 'active' : ''}`} onClick={() => this.setState({ activeTab: '2' })}>Đã hủy</NavLink>
                  </NavItem>
                  <Col sm={3} className="username">
                    <Input type="text" placeholder="Lọc bệnh nhân theo tên, mã, số điện thoại" name="textSearch" value={textSearch} onChange={e => this.setState({ textSearch: e.target.value })} />
                  </Col>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <TransTable searchCustomer={this.searchCustomer} textSearch={textSearch} isManager={this.state.isManager} items={customers} amountAtm={amountAtm} />
                  </TabPane>
                  <TabPane tabId="2">
                    <CancelTable textSearch={textSearch} items={itemsCancel} />
                  </TabPane>
                </TabContent>
              </Col>
            </FormGroup>
          </Fragment>
        }
        <div className="divNull"></div>
      </div>
    );
  }

}



export default TransactionForm;