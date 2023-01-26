import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row , Table} from 'reactstrap';
import { Link, useParams } from "react-router-dom"
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm"
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti"
import PricePolicyService from "../../Shared/PricePolicyService"
import { SERVICE_TYPE_VN } from '../../../../Constances/const';

const PricePolicyForm = (props) => {
    let { id } = useParams();
    let discount = {};
    const [pricePolicy, setPricePolicy] = useState({
        code: "",
        name: "",
        discount: discount,
    })
    const [confirmMessage, setConfirmMessage] = useState("")
    const [notiMessage, setNotiMessage] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["name", "code"].includes(e.target.name)) {
            pricePolicy[e.target.name] = e.target.value;
        } else {
            setPricePolicy((pricePolicy) => ({ ...pricePolicy, discount : {...pricePolicy.discount, [name] : +value/100 }}));
        }
    }

    useEffect(() => {
        if (id !== "0") {
            fetchPricePolicy();
        } else {
            for (let i in SERVICE_TYPE_VN) {
                discount[i] = +0;
            }
            setPricePolicy((pricePolicy) => ({...pricePolicy, discount : discount}))
        }
    }, [])

    const fetchPricePolicy = async () => {
        let fetchedPricePolicy = await PricePolicyService.getPricePolicyById(id)
        setPricePolicy(fetchedPricePolicy.data)
    }

    const editPricePolicy = () => {
        const payload = { ...pricePolicy, discount: pricePolicy.discount }
        return PricePolicyService.editPricePolicy(payload)
    }
    const postPricePolicy = () => {
        const payload = { ...pricePolicy, discount: pricePolicy.discount }
        return PricePolicyService.postPricePolicy(payload)
    }

    const handleSubmitForm = () => {
        if (id === "0") {
            postPricePolicy().then(() => {
                setNotiMessage("Thêm mới chính sách giá thành công!")
            }).catch((err) => {
                console.log(err)
                setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
            })

        } else {
            //cap nhat
            setConfirmMessage("Bạn đồng ý cập nhật lại chính sách giá ?")
        }
    }

    const answer = (answer) => {
        if (answer) {
            editPricePolicy().then(() => {
                setConfirmMessage("")
                setNotiMessage("Bạn đã cập nhật thành công!")
            }).catch((err) => {
                setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
            })

        } else {
            setConfirmMessage("")
        }
    }

    const done = () => {
        setNotiMessage("")
    }
    return (
        <Fragment>
            <div className="container">
                <div className="service-form">
                    <ModalConfirm message={confirmMessage} answer={answer}></ModalConfirm>
                    <ModalNoti message={notiMessage} done={done}></ModalNoti>
                    <h2 className="middle mb-3">{id !== "0" ? "Chỉnh sửa chính sách giá" : "Thêm mới chính sách giá"}</h2>
                    <Form>
                        <FormGroup row>
                            <Label for="name" sm={2}>Tên chính sách</Label>
                            <Col sm={10}>
                                <Input type="email" name="name" id="name" placeholder="Nhập tên chính sách" defaultValue={pricePolicy.name} onChange={(e) => handleChange(e)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="code" sm={2}>Mã chính sách</Label>
                            <Col sm={10}>
                                <Input type="text" name="code" id="code" placeholder="Nhập mã chính sách" defaultValue={pricePolicy.code} onChange={(e) => handleChange(e)} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="discount" sm={2}>Phần trăm giảm giá</Label>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Loại dịch vụ</th>
                                        <th>Phần trăm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(pricePolicy.discount).map((array, index) => {
                                        return <tr>
                                            <td>{index + 1}</td>
                                            <td>{SERVICE_TYPE_VN[array[0]].toUpperCase()}</td>
                                            <td>
                                                <Input type="select" name={[array[0]]} id="type" defaultValue={`${array[1]*100}`} 
                                                onChange={(e) => handleChange(e)}>
                                                    <option value="">Chọn mức chiết khấu</option>
                                                    <option value="0"> Giá gốc</option>
                                                    <option value="10"> 10%</option>
                                                    <option value="20"> 20%</option>
                                                    <option value="30"> 30%</option>
                                                    <option value="40"> 40%</option>
                                                    <option value="50"> 50%</option>
                                                    <option value="60"> 60%</option>
                                                    <option value="70"> 70%</option>
                                                    <option value="80"> 80%</option>
                                                    <option value="90"> 90%</option>
                                                    <option value="100"> Miễn Phí</option>
                                                </Input>
                                            </td>
                                        </tr>
                                    })} 
                            </tbody>
                            </Table>
                        </FormGroup>
                        <Row>
                            <Col sm={{ size: 10, offset: 2 }}>
                                <div className="addControl">
                                    <Button color="success" onClick={() => handleSubmitForm()}>{id !== "0" ? "Cập nhật" : "Thêm mới"}</Button>
                                    <Link to="/app/service/price-policy">
                                        <Button className="ml-20 btn-danger">Quay lại</Button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </Fragment>
    );
}

export default PricePolicyForm;

