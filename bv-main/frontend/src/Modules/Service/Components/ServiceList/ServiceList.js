import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Button, Table, FormGroup, Input, Col } from 'reactstrap';
import { Link } from "react-router-dom";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm"
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti"
import ServiceService from "../../Shared/ServiceService"
import { SERVICE_TYPE, SERVICE_TYPE_VN } from "../../../../Constances/const"
import Fuse from "fuse.js";

const OPTION = "option";
const EMPTY_STRING = "";
const ServiceList = (props) => {
    const [serviceList, setServiceList] = useState([]);
    const [delServiceId, setDelServiceId] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [notiMessage, setNotiMessage] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [serviceChoice, setServiceChoice] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [servicesOrg, setServiceOrg] = useState([]);

    useEffect(() => {
        ServiceService.getServiceList().then(res => {
            setServiceList(res.data)
            setServiceOrg(res.data)
        }).catch(err => {
            setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
        })
    }, [isMounted])

    const handleDelService = (service) => {
        setDelServiceId(service.id)
        setConfirmMessage(`Bạn có muốn xóa dịch vụ ${service.name}?`)
    }

    const answer = (answer) => {
        if (answer) {
            ServiceService.delService(delServiceId).then(() => {
                setDelServiceId(null)
                setConfirmMessage(EMPTY_STRING)
                setNotiMessage("Bạn đã cập nhật thành công!")
                setIsMounted(!isMounted);
            }).catch((err) => {
                setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
                console.log(err)
            })

        } else {
            setConfirmMessage(EMPTY_STRING)
        }
    }

    const done = () => {
        setNotiMessage(EMPTY_STRING)
    }

    const handleSelectService = (event) => {
        setServiceType(event.target.value);
        if (event.target.value !== OPTION) {
            const serviceListByType = servicesOrg.filter(s => s.type == event.target.value);
            setServiceList(serviceListByType);
        } else {
            setServiceList(servicesOrg);
        }
        if (event.target.value.trim().length == 0) {
            setServiceList(servicesOrg);    
        }    
    }

    const handleSelectDiscount = (event) => {
        setDiscountPrice(event.target.value);
    }

    const handleConfirmPrice = () => {
        if (serviceType === OPTION) {
            let data = [];
            serviceChoice.forEach(service_id => {
                serviceList.forEach(service => {
                    if (service_id == service.id) {
                        const obj = {
                            id: service.id,
                            price: (Math.ceil(service.origin_price * (1 - discountPrice * 0.01) * 0.001)) * 1000
                        }
                        data.push(obj);
                    }
                })
            })
            const promise_service = data.map(dt => ServiceService.updatePriceService(dt))
            Promise.all(promise_service).then(
                () => {
                    setNotiMessage("Bạn đã cập nhật thành công!");
                    setIsMounted(!isMounted);
                }).catch(err => {
                    console.log(err)
                    setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
                }
                );
        } else {
            const data = {
                type: serviceType,
                discount: parseInt(discountPrice)
            }
            ServiceService.updatePriceDiscount(data).then(
                res => {
                    setNotiMessage("Bạn đã cập nhật thành công!")
                    const serviceListByType = res.data.filter(s => s.type == serviceType);
                    setServiceList(serviceListByType);
                    setIsMounted(!isMounted);
                }).catch(err => {
                    setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
                }
            )
        }
    }

    const handleCheckBox = (e) => {
        if (e.target.checked == true) {
            setServiceChoice(old => [...old, e.target.value]);
        } else {
            let services = [...serviceChoice];
            services.splice(serviceChoice.indexOf(e.target.value), 1);
            setServiceChoice(services);
        }
    }

    const handleSearchService = (e) => {
        const options = {
            includeScore: true,
            keys: ["name", "code"]
        }
        if (e.target.value.trim().length != 0) {
            const fuse = new Fuse(servicesOrg, options)
            const result = fuse.search(e.target.value);
            const services = result.map(el => el.item);
            setServiceList(services);
        } else {
            setServiceList(servicesOrg)
        }
    }

    return (
        <Fragment>
            <div className="container">
                <ModalConfirm message={confirmMessage} answer={answer}></ModalConfirm>
                <ModalNoti message={notiMessage} done={done}></ModalNoti>
                <ServiceTable serviceList={serviceList} handleDelService={handleDelService} handleConfirmPrice={handleConfirmPrice} handleCheckBox={handleCheckBox}
                    handleSelectService={handleSelectService} handleSelectDiscount={handleSelectDiscount}
                    serviceType={serviceType} serviceChoice={serviceChoice} handleSearchService={handleSearchService}>
                </ServiceTable>
            </div>
        </Fragment>
    );
}

const ServiceTable = (props) => {
    let { serviceList, handleDelService, handleSelectService, handleSelectDiscount, handleConfirmPrice, handleCheckBox, serviceType, serviceChoice , handleSearchService} = props;
    
    return (
        <div className="customCard">
            <FormGroup row>
                <Col sm={6}>
                    <h4 className="title-card-lg mb-2">Quản lý dịch vụ</h4>
                    <Link to={`/app/service/0`}>
                        <Button color="primary" outline className="mb-3 paddingBtn">Thêm mới dịch vụ</Button>
                    </Link>
                    <Input
                        placeholder="Tìm theo tên, mã dịch vụ"
                        onChange={event => { handleSearchService(event) }}
                    />
                </Col>
                <Col sm={6}>
                    <FormGroup row className="justify-content-md-end">
                        <Col sm={6}>
                            <h4 className="title-card-lg ">Chiết khấu dịch vụ</h4>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="justify-content-md-end">
                        <Col sm={6}>
                            <Input type="select" name="type" id="type" onChange={event => { handleSelectService(event) }}>
                                {[EMPTY_STRING,...Object.values(SERVICE_TYPE), OPTION].map((s,i, array) => {
                                    if (i === 0) return <option value={s}>Chọn loại dịch vụ</option>
                                    if (i === array.length - 1) return <option value={s}>Tùy chọn DV</option>
                                    return (
                                       <option value={s}>{SERVICE_TYPE_VN[s]}</option>
                                   )
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="justify-content-md-end">
                        <Col sm={6}>
                            <Input type="select" name="type" id="type" onChange={event => { handleSelectDiscount(event) }}>
                                {[EMPTY_STRING, ...[...Array(11)].map((_,i) => i * 10)].map((el, index) => {
                                    if (index === 0) return <option value={el}>Chọn mức chiết khấu</option>
                                    return (
                                        el == "0" ? 
                                        <option value={el}>Giá gốc</option> :
                                        el == "100" ?
                                        <option value={el}>Miễn phí</option> :
                                        <option value={el}>{el}%</option>
                                    )
                                })}
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row className="justify-content-md-end">
                        <Col sm={2}>
                            <Button color="primary" outline className="m-2 paddingBtn" onClick={() => { handleConfirmPrice() }}>Lưu</Button>
                        </Col>
                    </FormGroup>
                </Col>

            </FormGroup>

            <div className="table-responsive min-h-60 df-h-65">
            <Table className="serviceListTable table-head-fixed" hover bordered striped>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Loại dịch vụ</th>
                        <th className="price">Giá khuyến mại</th>
                        <th className="price">Giá gốc</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bodyTable dw-5">
                    {serviceList.map((item, index) => {
                        return item.price == item.origin_price ?
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.code}</td>
                                {serviceType == OPTION
                                    ? <td>
                                        <Input
                                            className="mr-10 p-2"
                                            type="checkbox"
                                            value={item.id}
                                            // defaultChecked={ serviceChoice.find(item => item == item.id ? true : false)}
                                            onClick={(e) => { handleCheckBox(e) }}
                                        />
                                        {item.name}
                                    </td> : <td>{item.name}</td>}
                                <td>
                                    {item.type === SERVICE_TYPE.TEST && "Xét nghiệm"}
                                    {item.type === SERVICE_TYPE.EXAM && "Khám bệnh"}
                                    {item.type === SERVICE_TYPE.ULTRASOUND && "Siêu âm"}
                                    {item.type === SERVICE_TYPE.ENT && "Nội soi"}
                                    {item.type === SERVICE_TYPE.XRAY && "Chụp X-Quang"}
                                    {item.type === SERVICE_TYPE.OTHER && "Cấp cứu"}
                                </td>
                                <td className="price">{item.price}</td>
                                <td className="price">{item.origin_price}</td>
                                <td >
                                    <Link to={`/app/service/${item.id}`}>
                                        <Button color="primary" className="btn-sm">Sửa</Button> {" "}
                                    </Link>
                                    <Button color="danger" className=" btn-sm" onClick={() => { handleDelService(item) }}>Xóa</Button>
                                </td>
                            </tr> : <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.code}</td>
                                {serviceType == OPTION
                                    ? <td>
                                        <Input
                                            className="mr-10 p-2"
                                            type="checkbox"
                                            value={item.id}
                                            defaultChecked={false}
                                            onClick={(e) => { handleCheckBox(e) }}
                                        />
                                        {item.name}
                                    </td> : <td>{item.name}</td>}
                                <td>
                                    {item.type === SERVICE_TYPE.TEST && "Xét nghiệm"}
                                    {item.type === SERVICE_TYPE.EXAM && "Khám bệnh"}
                                    {item.type === SERVICE_TYPE.ULTRASOUND && "Siêu âm"}
                                    {item.type === SERVICE_TYPE.ENT && "Nội soi"}
                                    {item.type === SERVICE_TYPE.XRAY && "Chụp X-Quang"}
                                    {item.type === SERVICE_TYPE.OTHER && "Cấp cứu"}
                                </td>
                                <td className="price">{item.price} *</td>
                                <td className="price" style={{ fontWeight: "bold" }}>{item.origin_price}</td>
                                <td >
                                    <Link to={`/app/service/${item.id}`}>
                                        <Button color="primary" className="btn-sm">Sửa</Button> {" "}
                                    </Link>
                                    <Button color="danger" className=" btn-sm" onClick={() => { handleDelService(item) }}>Xóa</Button>
                                </td>
                            </tr>
                    })}
                </tbody>
            </Table>
            </div>
        </div>
    );
}

export default ServiceList;