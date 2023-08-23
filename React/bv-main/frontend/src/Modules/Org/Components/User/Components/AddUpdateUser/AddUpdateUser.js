import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { BrowserRouter as Link } from 'react-router-dom';
import ModalConfirm from '../../../../../../Shared/Components/ModalConfirm/ModalConfirm';
import ModalNoti from '../../../../../../Shared/Components/ModalNoti/ModalNoti';
import UserService from '../../../../Shared/UserService';
import { EQUAL_ARRAY, ROLE } from '../../../../../../Constances/const';
import { SwitchButton } from '../../../../../../Shared/Components/Switch Button/SwitchBtn';

export default class AddUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      org_id: '',
      full_name: '',
      roles: [],
      phone: '',
      birthday: '',
      gender: '',

      listOrg: [],
      setRole: [],
      confirmMessage: ''
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    ////////// get user ////////////
    if (id !== 'create') {
      UserService.getEditUser(id)
        .then(response => {
          let { full_name, username, org_id, phone, birthday, roles, gender } = response.data
          const setRole = [...roles];
          this.setState({
            full_name, username, org_id, phone, roles, birthday, gender, roles, setRole
          });
        }).catch(error => {
          console.log(error);
        });
    }
    ////////// get list org ///////////
    UserService.getListOrg()
      .then(response => {
        this.setState({
          listOrg: response.data,
          org_id: response.data[0].id
        })
      }).catch(error => {
        console.log(error);
      })
  }

  onHandleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  onHandleCheckBox = (e) => {
    if (e.status) {
      this.state.setRole.push(e.value);
    } else {
      this.state.setRole.splice(this.state.setRole.indexOf(e.value), 1);
    }
  }

  onSubmit = () => {
    let id = this.props.match.params.id;
    if (id !== 'create') {
      this.setState({
        confirmMessage: 'Bạn muốn cập nhập thông tin này không ?'
      });
    } else {
      this.setState({
        confirmMessage: 'Bạn muốn thêm mới thành viên này không ?'
      });
    }
  }

  onSelectGender = (e) => {
    let gender = e.target.value;
    this.setState({ gender });
  }

  answer = (answer) => {
    let id = this.props.match.params.id;
    let { full_name, username, phone, org_id, birthday, gender, roles, setRole } = this.state;
    let obj = {};
    if (EQUAL_ARRAY(setRole.sort(), roles.sort())) {
      obj = { full_name, username, phone, org_id, birthday, gender }
    } else {
      obj = { full_name, username, phone, org_id, birthday, gender, roles: setRole }
    }
    if (answer) {
      let method = (id !== 'create') ? UserService.postEditUser(id, obj) : UserService.postCreateUser(obj);
      let notiMessage = (id !== 'create') ? 'Cập nhât thành công' : 'Tạo mới thành công'
      method.then(response => {
        if (response.status === 200) {
          this.setState({
            notiMessage
          });
        }
      });
    } else {
      this.setState({
        confirmMessage: ''
      })
    }
  }

  doneAlret = () => {
    if (this.state.notiMessage) {
      window.location.replace('/app/user')
    } else {
      this.setState({ notiMessage: '' })
    }
  }

  onCancel = () => {
    window.location.assign('/app/user')
  }


  render() {
    let { full_name, username, roles, phone, org_id, birthday, listOrg, gender } = this.state
    let id = this.props.match.params.id;
    return (
      <div className="addUpdate ">
        <h4 className="text-center title-card-lg">
          {id !== 'create' ? "Cập nhập thông tin thành viên" : "Tạo mới nhân viên"}
        </h4>
        <Form
          style={{ width: "700px", margin: "40px auto" }}
          onSubmit={this.onHandleSubmit}
        >
          <Row form>
            <Col>
              <FormGroup sm={6}>
                <Label for="first_name">Họ Tên</Label>
                <Input
                  type="text"
                  className="full_name"
                  name="full_name"
                  value={full_name}
                  onChange={(e) => this.onHandleChange(e)}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="username">Tên tài khoản</Label>
            <Input
              readOnly={id !== 'create' ? true : false}
              type="text"
              className="username"
              name="username"
              value={username}
              onChange={(e) => this.onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Số điện thoại</Label>
            <Input
              type="text"
              className="phone"
              name="phone"
              value={phone}
              onChange={(e) => this.onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthday">Ngày sinh</Label>
            <input
              type="date"
              className="birthday form-control"
              min="1890-04-01"
              max="2050-04-20"
              name="birthday"
              value={birthday}
              onChange={(e) => this.onHandleChange(e)}
              required="required"
            ></input>
          </FormGroup>
          <FormGroup>
            <Label for="birthday">Giới tính</Label>
            <Input type="select" name="gender" id="gender" onChange={(e) => this.onSelectGender(e)} >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </Input>
          </FormGroup>
          {this.state.roles.includes(ROLE.ADMIN.value) === false ?
            <FormGroup>
              {/* <Label for="position">Vai trò</Label> */}
              <Row sm={4}>
                {Object.values(ROLE).sort((objA, objB) => {
                  return objA.name.localeCompare(objB.name)
                }).map((k, i) => {
                  if (k.value !== ROLE.ADMIN.value) {
                    return roles.includes(k.value) ? 
                    <Col sm={2}>
                      <Label sm={12} className="mt-1" for="position">{k.name}</Label>
                      <SwitchButton key={i} isOn={true} value={k.value} onHandleCheckBox={this.onHandleCheckBox}/>
                    </Col>
                    : <Col sm={2}>
                      <Label sm={12} className="mt-1" for="position">{k.name}</Label>
                      <SwitchButton key={i} isOn={false} value={k.value} onHandleCheckBox={this.onHandleCheckBox}/>
                    </Col>
                  }
                })}
              </Row>
            </FormGroup>
            : null}
            
            <div className="addControl">
            <Button
              outline
              color="primary"
              onClick={this.onSubmit}
            >
              {id !== 'create' ? "Cập nhập" : "Thêm mới"}
            </Button>{" "}
            <Link to="../user/">
              <Button
                color="danger"
                onClick={this.onCancel}
              >
                Hủy
              </Button>
            </Link>
          </div>
        </Form>
        <ModalConfirm
          message={this.state.confirmMessage}
          answer={this.answer}
        ></ModalConfirm>
        <ModalNoti
          message={this.state.notiMessage}
          done={this.doneAlret}
        ></ModalNoti>
      </div>
    );
  }
}

