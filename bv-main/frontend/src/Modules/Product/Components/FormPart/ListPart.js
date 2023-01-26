import React, { Component } from 'react';
import { Table, Button, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ProductService from '../Shared/ProductService';
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import classnames from 'classnames';
class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      listPart: [],
      notiConfirm: '',
      activeTab: '1',
      textSearch: ''
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    ProductService.listPart()
    .then(res => {
        this.setState({
            listPart: res.data
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
      ProductService.deletePart(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          window.location.href = './part'
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
    let { listPart, activeTab, textSearch } = this.state;
    const item = listPart.filter(i => i.name?.toUpperCase()?.includes(`${textSearch.toUpperCase()}`))
    .map((item, index) => {
      return <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.descriptions}</td>
                <td>
                    <div className="btnControl middle">
                        <Link to={`./part/${item.id}`} className="btn btn-secondary btn-sm" >Sửa</Link>
                        {/* {"   "}<Button className="btn-sm" color="danger" onClick={() => this.onDelete(item.id)}>Xóa</Button> */}
                    </div>
                </td>
            </tr>
    });
    return (
        <div className="container customCard mt-3 ">        
          <Nav tabs>
            <NavItem>
              <NavLink
                className={'pointer ' + classnames({ active: activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                <h1 className="title-card-lg">Danh sách thành phần</h1>
              </NavLink>
            </NavItem>
          </Nav>
          <Row className="pt-10">
            <Label xs={1}>Tìm kiếm</Label>
            <Col xs={3}>
              <Input placeholder="Nhập tên thành phần" type="search" onChange={e => this.setState({ textSearch: e.target.value})} />
            </Col>
            <Col xs={{ size: '2', offset: '6'}} className="end">
              <Link to={`/app/product/part/0`}>
                <Button className="mb-3 mt-3">
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
                      <th >Tên thành phần</th>
                      <th className="">Mô tả</th>
                      <th>Tùy chỉnh</th>
                    </tr>
                  </thead>
                  <tbody className="bodyTable">{item}</tbody>
                </Table>
              </Row>
            </TabPane>
          </TabContent>
          <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
        </div>
    );
  }
}

export default ListProduct;