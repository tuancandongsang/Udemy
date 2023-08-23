import React, { Component } from 'react';
import { Table, Button, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductService from '../Shared/ProductService';
import ItemMaterial from './ItemMaterial';
import { ROLE } from "../../../../Constances/const";
import AuthService from "../../../../Shared/Services/AuthService";
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import classnames from 'classnames';
class ListMaterial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      listMaterials: [],
      notiConfirm: '',
      activeTab: '1',
      textSearch: '',
      listProducer: []
    }
  }

  componentDidMount() {
    ProductService.listMaterial().then(res => {
      this.setState({
        listMaterials : res.data
      });
    }).catch(err => {
      this.setState({
        notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
      })
      console.log(err);
    });
  }

  onDelete = (id) => {
    this.setState({
      notiConfirm: 'Bạn có chắc chắn muốn xóa !!',
      id: id
    })
  };

  answer = (isYes) => {
    if (isYes) {
      let data = {
        id: this.state.id
      }
      ProductService.deleteMaterial(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          // window.location.href = './product'
        }).catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
          })
          console.log(err);
        });
    } else {
      this.setState({ notiConfirm: '' })
    }
  }
  // toggle = (activeTab) => {
  //   this.setState({ activeTab })
  // }
  render() {
    let { activeTab, textSearch, listProducer, listMaterials } = this.state;
    const itemMaterial = listMaterials
    .filter(i => i.name?.toUpperCase()?.includes(`${textSearch.toUpperCase()}`))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => {
      return <ItemMaterial index={index} listMaterial = {item} listProducer={listProducer} onDelete={this.onDelete}/>
    })
    return (
        <Col xs={{ size: '10', offset: '1'}} className="customCard mt-3 ">        
          <Nav tabs>
            <NavItem>
              <NavLink
                className={'pointer ' + classnames({ active: activeTab === '1' })}
              >
                <h1 className="title-card-lg">Danh sách vật tư</h1>
              </NavLink>
            </NavItem>
          </Nav>
          <Row className="pt-10">
            <Label xs={1}>Tìm kiếm</Label>
            <Col xs={2}>
              <Input placeholder="Nhập tên vật tư ...." type="search" onChange={e => this.setState({ textSearch: e.target.value})} />
            </Col>
            <Col xs={{ size: '2', offset: '7'}} className="end">
              <Link to={`/app/product/material/0`}>
                <Button>
                  <span >Thêm Mới</span>
                </Button>
              </Link>
            </Col>
          </Row>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Table  hover bordered striped>
                  <thead>
                    <tr className="thead">
                      <th>STT</th>
                      <th >Tên vật tư</th>
                      {AuthService.isRole(ROLE.INVENTORY.value) && <th className="price">Giá Nhập</th>}
                      {/* <th className="price">Giá Bán</th> */}
                      <th className="unit">Đơn vị</th>
                      <th className="producer">Nhà sản xuất</th>
                      {/* <th >Thành phần</th> */}
                      <th >Ghi chú</th>
                      {/* <th>Tùy chỉnh</th> */}
                    </tr>
                  </thead>
                  <tbody className="bodyTable">{itemMaterial}</tbody>
                </Table>
              </Row>
            </TabPane>
            {/* <TabPane tabId="2">
              <Row>
                <Table  hover bordered striped>
                  <thead>
                    <tr className="thead">
                      <th>STT</th>
                      <th >Tên vật tư</th>
                      <th className="price">Giá nhập</th>
                      <th className="producer">Nhà sản xuất</th>
                      <th >Ghi chú</th>
                      <th>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody className="bodyTable"></tbody>
                </Table>
              </Row>
            </TabPane> */}
          </TabContent>
          <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
        </Col>
    );
  }
}

export default ListMaterial;