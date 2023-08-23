import React, { useState, useEffect, Fragment } from 'react';
import { Button, FormGroup, Input, Col, Row } from 'reactstrap';
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm"
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti"
import InventoryService from '../Shared/InventoryService';
import { Link, useParams } from "react-router-dom"

const FormProducer = () => {
  let { id } = useParams();
  const [producer, setProducer] = useState({
    name: "",
    description: ""

  })
  const [confirmMessage, setConfirmMessage] = useState("")
  const [notiMessage, setNotiMessage] = useState("")
  useEffect(() => {
    if (id !== "0") {
      fetchProducer();
    }
  }, [])

  const fetchProducer = async () => {
    let fetchProducer = await InventoryService.getProducerbyId(id)
    setProducer(fetchProducer.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducer((producer) => ({ ...producer, [name]: value }));
  }
  const editProducer = () => {
    const payload = producer
    return InventoryService.editProducer(payload)
  }
  const postProducer = () => {
    const payload = producer
    return InventoryService.postProducer(payload)
  }
  const handleSubmitForm = () => {
    if (id === "0") {
      postProducer().then(() => {
            setNotiMessage("Thêm mới !")
        }).catch((err) => {
            console.log(err)
            setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!")
        })

    } else {
        //cap nhat
        setConfirmMessage("Bạn đồng ý cập nhật ?")
    }
}
const answer = (answer) => {
  if (answer) {
    editProducer().then(() => {
          setConfirmMessage("")
          setNotiMessage("Bạn đã cập nhật thành công!")
      }).catch(() => {
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
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
        <ModalConfirm message={confirmMessage} answer={answer}></ModalConfirm>
        <ModalNoti message={notiMessage} done={done}></ModalNoti>
        <h2 className="title-card-lg">{id !== "0" ? "Chỉnh sửa Nhà Sản Xuất" : "Thêm mới Nhà Sản Xuất"}</h2>
          <FormGroup name="producer">
            <Row>
              <Col xs="4">Tên nhà sản xuất</Col>
              <Col xs="8"> <Input type="input" name="name" id="name" value={producer.name} placeholder="nhập tên nhà sx" onChange={(e) => handleChange(e)} /></Col>
            </Row>
            <Row>
              <Col xs="4">Thông tin nhà sản xuất</Col>
              <Col xs="8"> <Input type="input" name="description" id="description" value={producer.description} placeholder="Nhập thông tin nhà sản xuất" onChange={(e) => handleChange(e)} /></Col>
            </Row>
          </FormGroup>
          <div className="producerCreateControl">
            <Button outline color="primary" onClick={() => handleSubmitForm()}>{id !== "0" ? "Cập nhật" : "Thêm mới"}</Button>
            <Link to="/app/inventory/producer">
              {" "}<Button className="mr-2" color="danger">Quay lại</Button>
            </Link>
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Fragment>
  );
}

export default FormProducer;