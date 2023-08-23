import React from 'react';
import { Button, FormGroup, Input, Col, Nav, NavLink, NavItem, TabContent, TabPane, Table } from 'reactstrap';
import { FormParent, ModalNoti } from '../../../Reception/Shared';
import TransactionService from '../../Shared/TransactionService';
import { Util } from '../../../../Helper/Util';
import AuthService from "../../../../Shared/Services/AuthService";
import { ROLE, SERVICE_TYPE, STEP_TYPE, ALL } from "../../Shared";

class Statistical extends FormParent {
  constructor(props) {
    super(props);
    let today = new Date().toISOString();
    let date = today.substr(0, 10);
    this.state = {
        listStatistical: [],
        isManager: false,
        userList: [],
        notiMessage: '',
        selectedUser: '',
        show: false,
        activeTab: '1',
        form: this._getInitFormData({
            start_date: date,
            end_date: date,
        }),
    }
  };

  handleSearch = () => {
    let { start_date, end_date, } = this.state.form;
    this.getListTransaction(ALL.code, start_date.value, end_date.value)
  }

  getUserList = () => {
    TransactionService.getUserList().then(res => {
        res.data.unshift({id: ALL.code, full_name: ALL.label})
        this.setState({ userList: res.data })
    })
  }

  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage });
  };

  isRole = () => {
    if (AuthService.isRole(ROLE.ADMIN.value)) {
      this.setState({ isManager: true })
    } else {
      let selectedUser =  AuthService.userInfo.id
      this.setState({ selectedUser })
    }
  }

  getListTransaction(userId, start_date, end_date) {
    TransactionService.getHistoryTransactionByTimeAndUserID(userId, start_date, end_date)
    .then(res => {
        let data = res.data.records || [];
        let { userList, isManager } = this.state;
        const roleArr = [ROLE.DOCTOR.value, ROLE.TEST_OPERATOR.value, ROLE.ENT.value, ROLE.ULTRASOUND.value, ROLE.XRAY.value, ROLE.ADMIN.value]
        let userIds = [];
        let listStatistical = [];
        if(!isManager) {
            userIds.push(this.state.selectedUser);
        }else {
            data.map(d => {
                userList.forEach(u => {
                    if(d.job_step?.created_by === u.id || d.job_step?.modified_by === u.id) {
                        let arr = u.roles.filter(r => roleArr.includes(r))
                        if(arr.length > 0 && !userIds.includes(u.id)) userIds.push(u.id);
                    }
                })
            })
        }
        userIds.forEach(u => {
            let obj = {
                userId: u,
                exam: 0,
                test: {
                    perform: 0,
                    suggest: 0,
                    total: 0,
                },
                xray: {
                    perform: 0,
                    suggest: 0,
                    total: 0,
                },
                ent: {
                    perform: 0,
                    suggest: 0,
                    total: 0,
                },
                ultrasound: {
                    perform: 0,
                    suggest: 0,
                    total: 0,
                },
            }
            data.forEach(d => {
                if(d.job_step?.type === STEP_TYPE.EXAM && u === d.job_step?.modified_by) obj.exam ++;
                if(d.job_step?.type === STEP_TYPE.TEST) {
                    if(d.order?.items[0]?.ref_value?.type === SERVICE_TYPE.TEST) {
                        if(u === d.job_step?.created_by) {
                            obj.test.suggest ++;
                            obj.test.total += d.order?.total;
                        }
                        if(u === d.job_step?.modified_by) obj.test.perform ++;
                    }
                    if(d.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ENT) {
                        if(u === d.job_step?.created_by) {
                            obj.ent.suggest ++;
                            obj.ent.total += d.order?.total;
                        }
                        if(u === d.job_step?.modified_by) obj.ent.perform ++;
                    }
                    if(d.order?.items[0]?.ref_value?.type === SERVICE_TYPE.XRAY) {
                        if(u === d.job_step?.created_by) {
                            obj.xray.suggest ++;
                            obj.xray.total += d.order?.total;
                        }
                        if(u === d.job_step?.modified_by) obj.xray.perform ++;
                    }
                    if(d.order?.items[0]?.ref_value?.type === SERVICE_TYPE.ULTRASOUND) {
                        if(u === d.job_step?.created_by) {
                            obj.ultrasound.suggest ++;
                            obj.ultrasound.total += d.order?.total;
                        }
                        if(u === d.job_step?.modified_by) obj.ultrasound.perform ++;
                    }
                }
            })
            listStatistical.push(obj)
        })
        this.setState({ listStatistical })
    }).catch(err => {
        console.log(err);
        this.setNotiMessage("Không tìm thấy các lịch sử giao dịch!")
    })
  }

  componentDidMount() {
    this.isRole();
    this.getListTransaction(ALL.code)
    this.getUserList()
  }

  render() {
    const { start_date, end_date } = this.state.form
    const { notiMessage, userList, activeTab, listStatistical, } = this.state
    let item = listStatistical.map((l, index) => {
        let user = userList.find(u => u.id === l.userId);
        let role = "";
        Object.values(ROLE).map((r, i) => {
            if(r.value === user.roles[0]) role = r.name
        })
        return <tr>
            <td>{index + 1}</td>
            <td>{user.full_name}</td>
            <td>{role}</td>
            <td>{l.exam}</td>
            <td>{l.test.perform}</td>
            <td>{l.test.suggest}</td>
            <td>{Util.formatPrice(l.test.total)}</td>
            <td>{l.ent.perform}</td>
            <td>{l.ent.suggest}</td>
            <td>{Util.formatPrice(l.ent.total)}</td>
            <td>{l.xray.perform}</td>
            <td>{l.xray.suggest}</td>
            <td>{Util.formatPrice(l.xray.total)}</td>
            <td>{l.ultrasound.perform}</td>
            <td>{l.ultrasound.suggest}</td>
            <td>{Util.formatPrice(l.ultrasound.total)}</td>
            <td>{Util.formatPrice(l.test.total + l.xray.total + l.ent.total + l.ultrasound.total)}đ</td>
        </tr>
    })
    return (
      <div className="Transaction-Form ">
        <ModalNoti
          message={notiMessage}
          done={() => this.setNotiMessage("")}
        ></ModalNoti>

        <FormGroup row>
          <Col sm={1} className="end">
            <label htmlFor="start_date">Từ:</label>
          </Col>
          <Col sm={2}>
            <Input
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
        </FormGroup>
        <FormGroup row>
          <Col sm={12}>
            <Nav tabs>
              <NavItem>
                <NavLink className={`transaction-nav pointer ${activeTab === '1' ? 'active' : ''}`} onClick={() => this.setState({ activeTab: '1' })}>Thống kê</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink className={`transaction-nav pointer ${activeTab === '2' ? 'active' : ''}`} onClick={() => this.setState({ activeTab: '2' })}>Đã hủy</NavLink>
              </NavItem> */}
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
              <Table>
                    <thead>
                        <tr>
                            <th rowSpan="2">#</th>
                            <th rowSpan="2">Tên nhân viên</th>
                            <th rowSpan="2">Vai trò</th>
                            <th rowSpan="2">Khám</th>
                            <th colSpan="3">Xét nghiệm</th>
                            <th colSpan="3">Nội soi</th>
                            <th colSpan="3">X quang</th>
                            <th colSpan="3">Siêu âm</th>
                            <th rowSpan="2">Tổng</th>
                        </tr>
                        <tr>
                            {/* <td></td>
                            <td></td>
                            <td></td>
                            <td></td> */}
                            <td>Thực hiện</td>
                            <td>Gợi ý</td>
                            <td>Tổng tiền</td>
                            <td>Thực hiện</td>
                            <td>Gợi ý</td>
                            <td>Tổng tiền</td>
                            <td>Thực hiện</td>
                            <td>Gợi ý</td>
                            <td>Tổng tiền</td>
                            <td>Thực hiện</td>
                            <td>Gợi ý</td>
                            <td>Tổng tiền</td>
                        </tr>
                    </thead>
                    <tbody>
                        {item}
                    </tbody>
                </Table>
              </TabPane>
              <TabPane tabId="2">
                2
              </TabPane>
            </TabContent>
          </Col>
        </FormGroup>
        <div className="divNull"></div>
      </div>
    );
  }
}



export default Statistical;