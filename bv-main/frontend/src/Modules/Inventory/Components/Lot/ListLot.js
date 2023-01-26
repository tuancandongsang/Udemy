import React, { Component } from "react";
import { Table, Col, Button, Input, Label, Row, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import ItemLot from './ItemLot';
import { Link } from "react-router-dom";
import InventoryService from "../Shared/InventoryService";
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import { WAREHOUSE_TYPE } from "../../../../Constances/const";
import { Pagination } from "../../../../Shared/Components/Pagination/Pagination";
class ListLot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      listWareHouse: [],
      listLot: [],
      listLotProduct: [],
      notiConfirm: '',
      textSearch: '',
      activeTab: "1",
      currentPage: 1,
      itemsPerPage: +100,
    };
  }

  componentDidMount() {
    InventoryService.allLot(WAREHOUSE_TYPE.PRODUCT).then(res => {
      this.setState({
        listLotProduct: res.data,
        listLot: res.data
      });
    })
    .catch((err) => {
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
      InventoryService.deleteLot(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          window.location.href = './inventory/lot'
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
  handleChangeTab = (tab) => {
    let { listLotProduct } = this.state;
    if (tab + "" === "1"){
        this.setState({
          listLot: listLotProduct,
          activeTab: tab
        })
    }
    if(tab + "" === "2") {
      InventoryService.allLot(WAREHOUSE_TYPE.CONSUMABLE).then(res => {
        this.setState({
          listLot: res.data,
          activeTab: tab
        })
      }).catch((err) => {
        this.setState({
          notiMessage: 'Lỗi vui lòng bạn thử lại sau !!(ListLotConsumable)'
        })
        console.log(err);
      });
    }
  }
  callBackPagination = ( currentPage, itemsPerPage ) => {
    this.setState({
      currentPage: currentPage,
      itemsPerPage: itemsPerPage
    })
  }
  render() {
    let { listLot, textSearch, activeTab, currentPage, itemsPerPage  } = this.state;
    let indexOfFirstItems = (+currentPage - 1) * itemsPerPage;
    let indexOfLastItems = + currentPage * itemsPerPage;
    let itemLot = listLot.filter(i => i.code?.toUpperCase()?.includes(`${textSearch.toUpperCase()}`) )
    .slice(indexOfFirstItems, indexOfLastItems)
    .map((itemB, index) => {
      return <ItemLot currentPage={currentPage} itemsPerPage={itemsPerPage}  index={index} listLot={itemB} key={index} onDelete={this.onDelete} />;
    });
    return (
      <Col xs={{ size: '10', offset: '1'}} className="customCard mt-3">
        <div >
          <h1 className="title-card-lg upper text-center">Danh sách lô</h1>
        </div>
        {/* <div className="addNew">
         
        </div> */}
        <Nav tabs>
          <NavItem>
            <NavLink
              className={{active : activeTab === '1'}}
              onClick={() =>  this.handleChangeTab('1')}
            >
              THUỐC
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{active : activeTab === '2'}}
              onClick={() =>  this.handleChangeTab("2")}
            >
              VẬT TƯ
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row className="pt-10">
              <Row>
                <Label xs={3}>Tìm kiếm lô thuốc</Label>
                <Col xs={2}>
                  <Input placeholder="Nhập tên lô" type="search" onChange={e => this.setState({ textSearch: e.target.value})} />
                </Col>
                <Col xs={{ size: '2', offset: '5'}} className="end">
                  <Link to={`./lot/0`}>
                    <Button outline color="primary">Thêm mới</Button>
                  </Link>
                </Col>
              </Row>
              <div className="table-responsive min-h-60 df-h-69">
                <Table className="managerTable table-head-fixed" hover striped bordered>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Số lô</th>
                      <th>Thuốc</th>
                      <th>Kho</th>
                      <th>Số lượng</th>
                      <th>Tồn kho</th>
                      <th>NSX</th>
                      <th>HSD</th>
                      <th>Ngày tạo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bodyTable">
                  {itemLot}
                  </tbody>
                </Table>
              </div>
              <Pagination data_lenght={listLot.length} callBackPagination={this.callBackPagination}/>
            </Row>
          </TabPane>
          <TabPane tabId = "2">
            <Row className="pt-10">
              <Row>
                <Label xs={3}>Tìm kiếm lô vật tư</Label>
                <Col xs={2}>
                  <Input placeholder="Nhập tên lô" type="search" onChange={e => this.setState({ textSearch: e.target.value})} />
                </Col>
                <Col xs={{ size: '2', offset: '5'}} className="end">
                  <Link to={`./lot/0`}>
                    <Button outline color="primary">Thêm mới</Button>
                  </Link>
                </Col>
              </Row>
              <div className="table-responsive min-h-60 df-h-65">
                <Table className="managerTable" hover striped bordered>
                  <thead className="table-head-fixed">
                    <tr>
                      <th >STT</th>
                      <th >Số lô</th>
                      <th>Vạt tư</th>
                      <th>Kho</th>
                      <th>Số lượng</th>
                      <th>Tồn kho</th>
                      <th>NSX</th>
                      <th>HSD</th>
                      <th>Ngày tạo</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bodyTable">
                  {itemLot}
                  </tbody>
                </Table>
              </div>
              <Pagination data_lenght={listLot.length} callBackPagination={this.callBackPagination}/>
            </Row>
          </TabPane>
        </TabContent>
        <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
      </Col>
    );
  }
}

export default ListLot;
