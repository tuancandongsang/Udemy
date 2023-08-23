import React, { useState, Fragment, useEffect } from 'react';
import { Button, FormGroup, Input, Col, Row } from 'reactstrap';
import ProductService from '../Shared/ProductService';

const FormProducer = () => {
  const [part, setPart] = useState({
    name: "",
    description: ""
  })
  let str = '/app/product/part/';
  let url = window.location.pathname;
  let id = url.slice(str.length)

  useEffect(() => {
    if(id != 0) {
      ProductService.getPart(id)
      .then(res => {
        part.id = res.data?.id;
        part.name = res.data?.name;
        part.description = res.data?.description
        setPart({...part})
      })
    }
  },[id, ])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPart((part) => ({ ...part, [name]: value }));
  }

  const postPart =  () => {
    if(id == 0) {
      ProductService.createPart(part)
      .then(res => {
        window.location.assign('/app/product/part')
      })
    }else {
      ProductService.updatePart(part)
      .then(res => {
        window.location.assign('/app/product/part')
      })
    }

  }


  return (
    <Fragment>
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <FormGroup  name="producer">
            <h1 className="p-t-50">Nhập thông tin thành phần</h1>
            <Row>
              <Col xs="4">Tên thành phần</Col>
              <Col xs="8"> <Input type="input" name="name" id="name" value={part.name} placeholder="nhập tên thành phần" onChange={(e) => handleChange(e)} /></Col>
            </Row>
            <Row>
              <Col xs="4">Thông tin mô tả</Col>
              <Col xs="8"> <Input type="input" name="description" id="description" value={part.description} placeholder="Nhập thông tin mô tả" onChange={(e) => handleChange(e)} /></Col>
            </Row>
          </FormGroup>
          <Row>
            <Button color="success" className="btn_1" onClick={() => postPart()}>Thêm thành phần</Button>
          </Row>
        </Col>
        <Col xs={2}></Col>
      </Row>
    </Fragment>
  );
}

export default FormProducer;