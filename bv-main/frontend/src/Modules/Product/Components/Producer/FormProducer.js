import React, { useState, Fragment } from 'react';
import { Button, FormGroup, Input, Col, Row } from 'reactstrap';
import ProductService from '../Shared/ProductService';

export const FormProducer = () => {
  const [producer, setProducer] = useState({
    name: "",
    description: ""

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducer((producer) => ({ ...producer, [name]: value }));
  }
  const postProducer = () => {
    const payload = producer
    return ProductService.postProducer(payload)
  }


  return (
      // <Row>
      //   <Col xs={2}></Col>
      //   <Col xs={8}>
      //     <FormGroup  name="producer">
      //       <h1 className="p-t-50">Nhập thông tin nhà sản xuất</h1>
      //       <Row>
      //         <Col xs="4">Tên nhà sản xuất</Col>
      //         <Col xs="8"> <Input type="input" name="name" id="name" placeholder="nhập tên nhà sx" onChange={(e) => handleChange(e)} /></Col>
      //       </Row>
      //       <Row>
      //         <Col xs="4">Thông tin nhà sản xuất</Col>
      //         <Col xs="8"> <Input type="input" name="description" id="description" placeholder="Nhập thông tin nhà sản xuất" onChange={(e) => handleChange(e)} /></Col>
      //       </Row>
      //     </FormGroup>
      //     <Row>
      //       <Button color="success" className="btn_1" onClick={() => postProducer()}>Thêm nhà sản xuất </Button>
      //     </Row>
      //   </Col>
      //   <Col xs={2}></Col>
      // </Row>

    <Col xs="4">
      <Row>
        <Col xs="4">Tên nhà sản xuất *</Col>
        <Col xs="8"> 
          <Input type="input" name="name" id="name" placeholder="nhập tên nhà sản xuất" onChange={(e) => handleChange(e)} />
        </Col>
      </Row>
      <Row>
        <Col xs="4">Thông tin nhà sản xuất *</Col>
        <Col xs="8"> <Input type="input" name="description" id="description" placeholder="Nhập thông tin nhà sản xuất" onChange={(e) => handleChange(e)} /></Col>
      </Row>
        <Col xs={{size : 6, offset: 6}} className='end'><Button color="success" className="btn_1 mr-6" onClick={() => postProducer()}>Thêm nhà sản xuất </Button></Col>
    </Col>
  );
}

export default FormProducer;