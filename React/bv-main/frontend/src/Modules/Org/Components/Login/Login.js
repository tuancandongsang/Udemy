import React, { Fragment } from 'react';
import { Col, Row, Input, Button } from 'reactstrap';
import { LOCALSTORAGE } from '../../../../Constances/const';
import { AuthService, Form, ModalNoti, ROLE, ShareService, LOCATION_TYPE } from '../../Shared';
import background from '../../../../Asset/Img/background-edit.jpg'
class Login extends Form {
    constructor(props) {
        super(props);
        this.state = {
            locationList: [],
            notiMessage: '',
            form: this._getInitFormData({ username: '', password: '' }),
        }
    }
    componentDidMount = () => {
        ShareService.getListLocation()
            .then(res => {
                this.setState({
                    locationList: res.data,
                })
            })
    };
    login() {
        const { username, password } = this.state.form;
        AuthService.login(username.value, password.value).then(res => {
            window.sessionStorage.setItem(LOCALSTORAGE.TOKEN, res.id);
            AuthService.getUserInfo().then(_res => {
                let user = _res.user;
                window.sessionStorage.setItem(LOCALSTORAGE.USER, JSON.stringify(user));
                AuthService.userInfo = user;
                if (user.roles.includes(ROLE.ADMIN.value)) {
                    this.goTo('app/doctor');
                } else if (user.roles.includes(ROLE.RECEPTIONIST.value)) {
                    this.goTo('app/reception');
                } else if (user.roles.includes(ROLE.ACCOUNTER.value)) {
                    this.goTo('app/transaction/order');
                } else if (user.roles.includes(ROLE.DOCTOR.value)) {
                    this.goTo('app/doctor');
                } else if (user.roles.includes(ROLE.TEST_OPERATOR.value)) {
                    this.goTo('app/exam');
                } else if (user.roles.includes(ROLE.PHARMACIST.value)) {
                    let arrPharmacy = this.state.locationList.filter(l => l.type === LOCATION_TYPE.PHARMACY)
                    window.sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(arrPharmacy[0]));
                    this.goTo('app/pharmacy')
                } else if (user.roles.includes(ROLE.INVENTORY.value)) {
                    this.goTo('app/product')
                } else if (user.roles.includes(ROLE.ULTRASOUND.value)) {
                    this.goTo("app/ultrasound")
                } else if (user.roles.includes(ROLE.XRAY.value)) {
                    this.goTo("app/xray")
                } else if (user.roles.includes(ROLE.ENT.value)) {
                    this.goTo("app/endoscopic")
                } else {
                    this.goTo('app/reception');
                }
            }).catch(err => {
                console.log('Err', err);
                this.setState({
                    notiMessage: "Có lỗi xảy ra trong lúc lấy thông tin người dùng, xin thử lại sau!"
                })
            })
        }).catch(err => {
            console.log('Err', err);
            this.setState({
                notiMessage: "Có lỗi xảy ra trong lúc đăng nhập, xin thử lại sau!"
            })
        })
    }
    goTo(url = '') {
        url = window.location.origin + '/' + url
        window.location.replace(url)
    }
    onBackListLocation(url = '') {
        window.sessionStorage.removeItem(LOCALSTORAGE.LOCATION)
        url = window.location.origin + '/' + url
        window.location.replace(url)
    }
    render() {
        const { username, password } = this.state;
        return (
            <Fragment>
                <div style={{ backgroundImage:`url(${background})`, backgroundSize: 'cover' , width: '100%', height: '100vh' }} className="login-background">
                    <Col className="pointer pt-5 pl-30" >
                        <Button onClick={() => { this.onBackListLocation('app/locationlist') }}>
                            <span class="material-icons">arrow_back</span> Quay Lại
                        </Button>
                    </Col>
                    <div className="loginCard fadeInDown">
                        <h2>Đăng Nhập</h2>
                        <Row>
                            <Col xs="4">Tên Đăng Nhập: </Col>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Tên đăng nhập"
                                    value={username}
                                    name="username"
                                    autoComplete="off"
                                    onChange={(ev) => this._setValue(ev, 'username')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="4">Mật Khẩu: </Col>
                            <Col>
                                <Input
                                    type="text"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    name="password"
                                    autoComplete="off"
                                    className="password"
                                    onChange={(ev) => this._setValue(ev, 'password')}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.login()
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="end">
                                <Button outline color="primary" title="Login" onClick={() => this.login()}>Đăng Nhập</Button>
                            </Col>
                        </Row>
                        <ModalNoti message={this.state.notiMessage} done={() => this.setState({ notiMessage: '' })}></ModalNoti>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;