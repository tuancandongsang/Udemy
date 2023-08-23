import { offset } from '@popperjs/core';
import { useState }from 'react';
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Col, Row, Button, Toast, ToastBody } from 'reactstrap';
import { ReactComponent as IconBadge } from "../../../Asset/Icon/icon-bell.svg";
import { ReactComponent as IconNew} from "../../../Asset/Icon/icon-warning.svg";
import { ReactComponent as IconSeen} from "../../../Asset/Icon/icon-check.svg";

export default Notification = (props) => {
    const [toggle, setToggle] = useState(false);

    const toggleNotification = () => {
        setToggle(!toggle)
    }

    const [dropdownFilterOpen, setDropdownFilterOpen] = useState(false);

    const toggleFilter = () => {
        setDropdownFilterOpen(!dropdownFilterOpen)
    }

    return (
        <div className='notification pointer'>
            <Dropdown isOpen={toggle} toggle={toggleNotification}>
                <DropdownToggle nav> 
                    <div class="bell-icon" tabindex="0">
                        <IconBadge />
                        <div class="notification-amount">
                            <span>1</span>
                        </div>
                    </div>
                </DropdownToggle>
                <DropdownMenu end className="dropdownCheck">
                    <Row className='title horizontal-line'>
                        <Col className='fontsz-30'>
                            <p><b>Thông báo</b></p>
                        </Col>
                    </Row>
                    <div className='content'>
                        <Row className='title-noti'>
                            <Col className='fontsz-25'>
                                <p><b>Mới</b></p>
                            </Col>
                        </Row>
                        <Toast className='content-item'>
                            <ToastBody className='content-body'>
                                <Row className='m-0'>
                                    <Col className='icon-noti-new align-center' xs={3}>
                                        <IconNew />
                                    </Col>
                                    <Col className='note' xs={9}>
                                        <p>Thiết bị <spand>PK đa khoa việt đoàn</spand> thông báo phát hiện người lạ</p>
                                        <Col sx={{size: 8, offset: 4}}>
                                            <p className='end time'>12/23/2021,3:36:05 PM</p>
                                        </Col> 
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                        <Toast className='content-item'>
                            <ToastBody className='content-body'>
                                <Row className='m-0'>
                                    <Col className='icon-noti-new align-center' xs={3}>
                                        <IconNew />
                                    </Col>
                                    <Col className='note' xs={9}>
                                        <p>Thiết bị <spand>PK đa khoa việt đoàn</spand> thông báo phát hiện người lạ</p>
                                        <Col sx={{size: 8, offset: 4}}>
                                            <p className='end time'>12/23/2021,3:36:05 PM</p>
                                        </Col> 
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                        <Row className='title'>
                            <Col className='fontsz-25'>
                                <p><b>Trước đó</b></p>
                            </Col>
                        </Row>
                        <div className='seen-list'>
                            <Toast className='content-item'>
                                <ToastBody className='content-body'>
                                    <Row className='m-0'>
                                        <Col className='icon-noti-seen align-center' xs={3}>
                                            <IconSeen />
                                        </Col>
                                        <Col className='note' xs={9}>
                                            <p>Thiết bị <spand>PK đa khoa việt đoàn</spand> thông báo phát hiện người lạ</p>
                                            <Col sx={{size: 8, offset: 4}}>
                                                <p className='end time'>12/23/2021,3:36:05 PM</p>
                                            </Col> 
                                        </Col>
                                    </Row>
                                </ToastBody>
                            </Toast>
                            <Toast className='content-item'>
                                <ToastBody className='content-body'>
                                    <Row className='m-0'>
                                        <Col className='icon-noti-seen align-center' xs={3}>
                                            <IconSeen />
                                        </Col>
                                        <Col className='note' xs={9}>
                                            <p>Thiết bị <spand>PK đa khoa việt đoàn</spand> thông báo phát hiện người lạ</p>
                                            <Col sx={{size: 8, offset: 4}}>
                                                <p className='end time'>12/23/2021,3:36:05 PM</p>
                                            </Col> 
                                        </Col>
                                    </Row>
                                </ToastBody>
                            </Toast>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
