import React, { Component } from 'react';
import { Table, Button, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductService from '../Shared/ProductService';
import ItemProduct from './ItemProduct';
import { ROLE } from "../../../../Constances/const";
import AuthService from "../../../../Shared/Services/AuthService";
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import classnames from 'classnames';
class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      listProduct: [],
      notiConfirm: '',
      activeTab: '1',
      textSearch: ''
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    let promiseArr = [];
    promiseArr.push(ProductService.listProduct());
    promiseArr.push(ProductService.listProducer());
    promiseArr.push(ProductService.listPart());

    Promise.all(promiseArr).then(([list_product, list_producer, list_part]) => {
      let listProduct = list_product.data;
      let listProducer = list_producer.data;
      let listPart = list_part.data;
      listProduct.partName = [];
      listProduct.map(pro => {
        let found = listProducer.find(p => {
          return pro.producer_id === p.id;
        });
        pro.producerName = found ? found.name : 'NA';
        let partArr = [];
        pro.parts.map(p => {
          let found = listPart.find(pa => {
            return p.id == pa.id;
          });
          let result = found ? found.name : 'NA';
          partArr.push(result);
        });
        pro.partName = partArr;
        return pro;
      });
      this.setState({
        listProduct,
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
      ProductService.deleteProduct(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          window.location.href = './product'
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
  toggle = (activeTab) => {
    this.setState({ activeTab })
  }
  render() {
    let { listProduct, activeTab, textSearch } = this.state;
    const itemProduct = listProduct.filter(i => i.name?.toUpperCase()?.includes(`${textSearch.toUpperCase()}`))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item, index) => {
      return <ItemProduct key={index} listProduct={item} index={index} onDelete={this.onDelete} onUpdate={this.onUpdate} />;
    });
    return (
        <Col xs={{ size: '10', offset: '1'}} className="customCard mt-3 ">        
          <Nav tabs>
            <NavItem>
              <NavLink
                className={'pointer ' + classnames({ active: activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                <h1 className="title-card-lg">Danh sách thuốc</h1>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                className={'pointer ' + classnames({ active: activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                <h1 className="title-card-lg">Danh vật tư</h1>
              </NavLink>
            </NavItem> */}
          </Nav>
          <Row className="pt-10">
            <Label xs={1}>Tìm kiếm</Label>
            <Col xs={2}>
              <Input placeholder="Nhập tên thuốc" type="search" onChange={e => this.setState({ textSearch: e.target.value})} />
            </Col>
            <Col xs={{ size: '2', offset: '7'}} className="end">
              <Link to={`/app/product/0`}>
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
                      <th >Tên thuốc</th>
                      {AuthService.isRole(ROLE.INVENTORY.value) && <th className="price">Giá Nhập</th>}
                      <th className="price">Giá Bán</th>
                      <th className="unit">Đơn vị</th>
                      <th className="route">Đường dùng</th>
                      <th className="producer">Nhà sản xuất</th>
                      <th >Thành phần dược liệu</th>
                      <th >Ghi chú</th>
                      <th>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody className="bodyTable">{itemProduct}</tbody>
                </Table>
              </Row>
            </TabPane>
            <TabPane tabId="2">
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
            </TabPane>
          </TabContent>
          <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
        </Col>
    );
  }
}

export default ListProduct;