import React, { Fragment } from 'react';
import logo from '../../../Asset/Img/logoPK.png';
import { withRouter } from "react-router-dom";
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Col, Row } from 'reactstrap';
import { AuthService } from '../../';
import { EQUAL_ARRAY, ROLE } from '../../../Constances/const';
import { ReactComponent as IconDoctor } from "../../../Asset/Icon/doctor-icon.svg";
import { ReactComponent as IconAcounting } from "../../../Asset/Icon/accounting.svg";
import { ReactComponent as IconReception } from "../../../Asset/Icon/reception_hospital.svg";
import { ReactComponent as IconExam } from "../../../Asset/Icon/test-exam-svgrepo-com.svg";
import { ReactComponent as IconXRay } from "../../../Asset/Icon/x-ray-svgrepo-com.svg";
import { ReactComponent as IconPharmacy } from "../../../Asset/Icon/first-aid-bag.svg";
import { ReactComponent as IconUtrasound } from "../../../Asset/Icon/ultrasound.svg";
import { ReactComponent as IconEnt } from "../../../Asset/Icon/ent.svg";
import { ReactComponent as IconInventory } from "../../../Asset/Icon/inventory.svg";
import { ReactComponent as IconManagement } from "../../../Asset/Icon/management.svg";
import { ReactComponent as IconUser } from "../../../Asset/Icon/user.svg";
import { ReactComponent as IconMedicalRecords } from "../../../Asset/Icon/icon-medical-records.svg";
import { ReactComponent as IconStatistics } from "../../../Asset/Icon/icon-statistics.svg";
import { ReactComponent as IconTransaction } from "../../../Asset/Icon/icon-transaction.svg";
import Notification  from "../../../Shared/Components/Notification/Notification";

class AppHeader extends React.Component {
    state = {
        dropdownUserOpen: false,
        dropdownMasterDataOpen: false,
        dropdownInventoryOpen: false,
    }

    goTo(url = '') {
        url = window.location.origin + '/' + url
        window.location.replace(url)
    }

    toggleUser = () => {
        this.setState({
            dropdownUserOpen: !this.state.dropdownUserOpen,
        })
    }

    toggleMasterData = () => {
        this.setState({
            dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
        })
    }

    toggleWareHouse = () => {
        this.setState({
            dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
        })
    }

    logout() {
        AuthService.userInfo = null;
        window.sessionStorage.clear();
        window.location.replace('login');
    }

    render() {
        return (
            <Nav pills>
                <Row className="appHeaderContainer" >
                    <Col xs="1">
                        <Row className='divLogo'>
                            <NavItem>
                                <div className="ml-2 logo-header">
                                    <img src={logo} alt="img company" ></img>
                                </div>
                            </NavItem>
                        </Row>
                    </Col>
                    {EQUAL_ARRAY(AuthService.userInfo.roles, [ROLE.ADMIN.value]) === true ?
                    <>
                        <Col sm="10">
                            <Row style={{ margin: '0px' }}>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/transaction/order')}> 
                                        <IconAcounting></IconAcounting>
                                        Thu Ngân
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/reception')}>
                                        <IconReception></IconReception>
                                        Lễ Tân
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/test')}>
                                    <IconExam></IconExam>
                                        Test Covid
                                    </NavLink>
                                </NavItem> */}
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/doctor')}>
                                        <IconDoctor></IconDoctor>
                                        Khám Bệnh
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/exam')}>
                                        <IconExam></IconExam>
                                        Xét Nghiệm
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/xray')}>
                                        <IconXRay></IconXRay>
                                        X-Quang
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/endoscopic')}>
                                        <IconEnt></IconEnt>
                                        Nội soi
                                        </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/ultrasound')}>
                                        <IconUtrasound></IconUtrasound>
                                        Siêu âm
                                        </NavLink>
                                </NavItem>
                                <NavItem className="pointer">
                                    <NavLink className="icon" onClick={() => this.goTo('app/pharmacy')}>
                                        <IconPharmacy></IconPharmacy>
                                        Nhà thuốc
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem className="pointer">
                                    <NavLink onClick={() => this.goTo('app/transaction/transaction')}>Giao dịch</NavLink>
                                </NavItem> */}
                                <Dropdown nav isOpen={this.state.dropdownInventoryOpen} toggle={this.toggleWareHouse}>
                                    <DropdownToggle className="icon" nav caret>
                                        <IconInventory></IconInventory>
                                        Kho
                                        </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/lot')}>Nhập Lô</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/transaction')}>Xuất Kho</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/product')}>Thuốc</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/product/material')}>Vật tư</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/product/part')}>Thành phần</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/inventory/producer')}>Nhà Cung Cấp</DropdownItem>
                                    </DropdownMenu>

                                </Dropdown>
                                <Dropdown nav isOpen={this.state.dropdownMasterDataOpen} toggle={this.toggleMasterData}>
                                    <DropdownToggle className="icon" nav caret>
                                        <IconManagement></IconManagement>
                                        Quản lý
                                        </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => this.goTo('app/user')}>Nhân Viên</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/location')}>Phòng Ban</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/updatecustomer')}>Thông tin bệnh nhân</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/service')}>Dịch Vụ</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/service/price-policy')}>Chương trình khuyến mại</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/transaction/transaction')}>Thống kê Giao dịch</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/transaction/pharmacy')}>Thống kê dược</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/transaction/statistical')}>Thống kê bác sĩ</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/transaction/service')}>Thống kê theo dịch vụ</DropdownItem>
                                        <DropdownItem onClick={() => this.goTo('app/doctor/history')}>Bệnh án điện tử</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Row>
                        </Col>
                        <Col sm="1">
                            <Dropdown className="user-icon" nav isOpen={this.state.dropdownUserOpen} toggle={this.toggleUser}>
                                <DropdownToggle className="icon " nav caret>
                                    <IconUser></IconUser>
                                    {AuthService.userInfo.full_name}
                                </DropdownToggle>
                                <DropdownMenu style={{width: "100%"}}>
                                    {/* <DropdownItem onClick={() => this.goTo('app/user/' + AuthService.userInfo.id)}><span className="material-icons">account_circle</span> Thông tin người dùng</DropdownItem> */}
                                    <DropdownItem onClick={() => this.goTo('app/user/setpassword/' + AuthService.userInfo.id)}><span className="material-icons">lock</span> Đổi mật khẩu</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.logout()}><span className="material-icons">exit_to_app</span> Đăng xuất</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        </>
                        :
                        <Col sm={9}>
                            <Row style={{ margin: '0px' }}>
                                {AuthService.userInfo.roles.map(role => {
                                    if (role === ROLE.ACCOUNTER.value || role === ROLE.RECEPTIONIST.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/transaction/order')}>
                                                        <IconAcounting></IconAcounting>&nbsp;&nbsp;
                                                        Thu Ngân
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/test')}>
                                                    <IconExam></IconExam>
                                                        Test Covid
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/reception')}>
                                                        <IconReception></IconReception>&nbsp;&nbsp;
                                                        Lễ Tân
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/transaction')}>
                                                        <IconTransaction></IconTransaction>&nbsp;&nbsp;
                                                        Giao dịch
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                        // } if (role === ROLE.RECEPTIONIST.value) {
                                        //     return (
                                        //        <NavItem className="pointer">
                                        //             <NavLink onClick={() => this.goTo('app/reception')}>Lễ Tân</NavLink>
                                        //         </NavItem>
                                        //     )
                                    } if (role === ROLE.MANAGER.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/transaction')}>
                                                    <IconAcounting></IconAcounting>&nbsp;&nbsp;
                                                        Thống kê Giao dịch
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/pharmacy')}>
                                                    <IconPharmacy></IconPharmacy>&nbsp;&nbsp;
                                                        Thống kê dược
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/statistical')}>
                                                        <IconDoctor></IconDoctor>&nbsp;&nbsp;
                                                        Thống kê bác sĩ
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/service')}>
                                                    <IconExam></IconExam>&nbsp;&nbsp;
                                                        Thống kê theo dịch vụ
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                    <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } 
                                    if (role === ROLE.DOCTOR.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor')}>
                                                        <IconDoctor></IconDoctor>&nbsp;&nbsp;
                                                        Khám Bệnh
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/test')}>
                                                    <IconExam></IconExam>
                                                        Test Covid
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                        <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/statistical')}>
                                                        <IconStatistics></IconStatistics>&nbsp;&nbsp;
                                                        Thống kê
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer badgeFly">
                                                    <Notification />
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.TEST_OPERATOR.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/exam')}>
                                                        <IconExam></IconExam>&nbsp;&nbsp;
                                                        Xét Nghiệm
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className="iconForEachRole" onClick={() => this.goTo('app/test')}>
                                                    <IconExam></IconExam>
                                                        Test Covid
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                        <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.XRAY.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/xray')}>
                                                        <IconXRay></IconXRay>&nbsp;&nbsp;
                                                        X-Quang
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                        <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.ENT.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/endoscopic')}>
                                                        <IconEnt></IconEnt>&nbsp;&nbsp;
                                                        Nội soi
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                        <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.ULTRASOUND.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/ultrasound')}>
                                                        <IconUtrasound></IconUtrasound>&nbsp;&nbsp;
                                                        Siêu âm
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/doctor/history')}>
                                                        <IconMedicalRecords></IconMedicalRecords>&nbsp;&nbsp;
                                                        Bệnh án điện tử
                                                    </NavLink>
                                                </NavItem>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.PHARMACIST.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/pharmacy')}>
                                                        <IconPharmacy></IconPharmacy>&nbsp;&nbsp;
                                                        Nhà thuốc
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/transaction')}>
                                                        <IconTransaction></IconTransaction>&nbsp;&nbsp;
                                                        Giao dịch
                                                    </NavLink>
                                                </NavItem>
                                                <Dropdown nav isOpen={this.state.dropdownInventoryOpen} toggle={this.toggleWareHouse}>
                                                    <DropdownToggle className='iconForEachRole' nav caret>
                                                        <IconInventory></IconInventory>&nbsp;&nbsp;
                                                        Kho
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/lot')}>Nhập Lô</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/transaction')}>Xuất Kho</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/product')}>Thuốc</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/product/part')}>Thành phần</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/producer')}>Nhà Cung Cấp</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Fragment>
                                        )
                                    } if (role === ROLE.INVENTORY.value) {
                                        return (
                                            <Fragment>
                                                <NavItem className="pointer">
                                                    <NavLink className='iconForEachRole' onClick={() => this.goTo('app/transaction/transaction')}>
                                                        <IconTransaction></IconTransaction>&nbsp;&nbsp;
                                                        Giao dịch
                                                    </NavLink>
                                                </NavItem>
                                                <Dropdown nav isOpen={this.state.dropdownInventoryOpen} toggle={this.toggleWareHouse}>
                                                    <DropdownToggle className='iconForEachRole' nav caret>
                                                        <IconInventory></IconInventory> &nbsp;&nbsp;
                                                        Kho
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/producer')}>Nhà Cung Cấp</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/lot')}>Nhập Lô</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/inventory/transaction')}>Xuất Kho</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/product')}>Thuốc</DropdownItem>
                                                        <DropdownItem onClick={() => this.goTo('app/product/part')}>Thành phần</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </Fragment>
                                        )
                                    }
                                })}
                            </Row>
                        </Col>
                    }
                    {EQUAL_ARRAY(AuthService.userInfo.roles, [ROLE.ADMIN.value]) === false &&
                        
                        <Col sm="2">
                            <Dropdown className="user-icon" nav isOpen={this.state.dropdownUserOpen} toggle={this.toggleUser}>
                                <DropdownToggle className="iconForEachRole" nav caret>
                                    <IconUser></IconUser>
                                    {AuthService.userInfo.full_name}
                                </DropdownToggle>
                                <DropdownMenu style={{width: "100%"}}>
                                    {/* <DropdownItem onClick={() => this.goTo('app/user/' + AuthService.userInfo.id)}><span className="material-icons">account_circle</span> Thông tin người dùng</DropdownItem> */}
                                    <DropdownItem onClick={() => this.goTo('app/user/setpassword/' + AuthService.userInfo.id)}><span className="material-icons">lock</span> Đổi mật khẩu</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => this.logout()}><span className="material-icons">exit_to_app</span> Đăng xuất</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    }
                     
                </Row>
            </Nav>
        );
    }
}

export default withRouter(AppHeader);