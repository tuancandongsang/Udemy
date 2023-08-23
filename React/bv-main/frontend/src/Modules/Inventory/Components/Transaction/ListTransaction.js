import React, { Component } from "react";
import { Table, Container, Button, Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import ItemTransaction from './ItemTransaction';
import { Link } from "react-router-dom";
import InventoryService from "../Shared/InventoryService";
import ProductService from '../../../Product/Components/Shared/ProductService';
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';
import { WAREHOUSE_TYPE } from "../../../../Constances/const";
import { Pagination } from "../../../../Shared/Components/Pagination/Pagination";
import { FormParent } from "../../../Reception/Shared";
import { Util } from '../../../../Helper/Util';

class ListTransaction extends FormParent {
  constructor(props) {
    super(props);
    let date = new Date().toLocaleDateString("en-ZA");
    this.state = {
      id: '',
      listTransaction: [],
      listTransactionProduct: [],
      notiConfirm: '',
      activeTab: "1",
      currentPage: 1,
      itemsPerPage: +100,
      isLotExist: false,
      form: this._getInitFormData({
        start_date: date,
        end_date: date,
      }),
    };
  }

  componentDidMount() {
    InventoryService.listTransaction().then(res => {
      this.setState({
        listTransaction: res.data,
        listTransactionProduct: res.data,
        isLotExist: false
      });
      this.getData()
    })
      .catch((err) => {
        this.setState({
          notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
        })
        console.log(err);
      });
  }

  handleSearch = () => {
    const { start_date, end_date } = this.state.form;
    if (this.state.activeTab == "2") {
      InventoryService.listTransactionConsumableById(WAREHOUSE_TYPE.CONSUMABLE, "", start_date.value, end_date.value).then(res => {
        this.setState({
          listTransaction: res.data,
          isLotExist: false
        });
        this.getData()
      }).catch((err) => {
        this.setState({
          notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
        })
        console.log(err);
      });
    } else {
      InventoryService.listTransactionConsumableById(WAREHOUSE_TYPE.PRODUCT, "", start_date.value, end_date.value).then(res => {
        this.setState({
          listTransaction: res.data,
          isLotExist: false
        });
        this.getData()
      }).catch((err) => {
        this.setState({
          notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
        })
        console.log(err);
      });
    }
  }

  // list data location
  getData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.lot_id) {
      this.setState({
        activeTab: "2",
      })
      InventoryService.listTransactionConsumableById(WAREHOUSE_TYPE.CONSUMABLE, params.lot_id)
        .then(res => {
          this.setState({
            listTransaction: res.data,
            isLotExist: true
          });
        })
        .catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng bạn thử lại sau !! (listTransactionConsumable)'
          })
          console.log(err);
        });
    }
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
      InventoryService.deleteTransaction(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          window.location.href = './transaction'
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
    let { listTransactionProduct } = this.state;
    if (tab + "" === "1") {
      this.setState({
        activeTab: tab,
        listTransaction: listTransactionProduct
      })
    }
    if (tab + "" === "2") {
      InventoryService.listTransactionConsumable(WAREHOUSE_TYPE.CONSUMABLE).then(res => {
        this.setState({
          activeTab: tab,
          listTransaction: res.data
        });
      })
        .catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng bạn thử lại sau !! (listTransactionConsumable)'
          })
          console.log(err);
        });
    }
  }
  callBackPagination = (currentPage, itemsPerPage) => {
    this.setState({
      currentPage: currentPage,
      itemsPerPage: itemsPerPage
    })
  }

  render() {
    const { start_date, end_date } = this.state.form
    let { listTransaction, activeTab, currentPage, itemsPerPage, isLotExist } = this.state;
    let indexOfFirstItems = (+currentPage - 1) * itemsPerPage;
    let indexOfLastItems = + currentPage * itemsPerPage;
    let itemTransaction = listTransaction.sort((a, b) => b.ctime - a.ctime).slice(indexOfFirstItems, indexOfLastItems)
      .map((itemT, index) => {
        return <ItemTransaction currentPage={currentPage} itemsPerPage={itemsPerPage} index={index} listTransaction={itemT} key={index} onDelete={this.onDelete} />;
      });
    return (
      <Container className="transaction customCard mt-3">
        <div>
          <h1 className="title-card-lg upper text-center">Danh sách xuất kho</h1>
        </div>
        <div className="display-flex align-center">
          <Row>
            <Col>
              <Link to={`./transaction/create`}>
                <Button className="btnAdd" outline color="primary">
                  <span>XUẤT KHO</span>
                </Button>
              </Link>
              {
                isLotExist ?
                  <div className="end">
                    <Link to={`./lot`}>
                      <Button className="btnAdd end" color="danger">
                        <span>Quay lại</span>
                      </Button>
                    </Link>
                  </div>
                  :
                  null
              }
            </Col>
            <Col sm={1} className="end">
              <label htmlFor="start_date">Từ:</label>
            </Col>
            <Col sm={2}>
              <Input
                onKeyDown={(e) => Util.onKeyDown(e)}
                data-index="1"
                autoFocus
                type='date'
                value={start_date && start_date.value}
                onChange={(ev) => { this._setValue(ev, 'start_date') }}
                required
              />
            </Col>
            <Col sm={1} className="end">
              <label htmlFor="end_date">Đến:</label>
            </Col>
            <Col sm={2}>
              <Input
                onKeyDown={(e) => Util.onKeyDown(e)}
                data-index="2"
                type='date'
                value={end_date && end_date.value}
                onChange={(ev) => { this._setValue(ev, 'end_date') }}
                required
              />
            </Col>
            <Col sm={1} className="end">
              <Button color="primary"
                //onKeyDown={(e) => Util.onKeyDown(e)}
                data-index="4"
                onClick={() => { this.handleSearch() }}>Chọn</Button>
            </Col>
          </Row>
        </div>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={{ active: activeTab === '1' }}
              onClick={() => this.handleChangeTab('1')}
            >
              THUỐC
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={{ active: activeTab === '2' }}
              onClick={() => this.handleChangeTab("2")}
            >
              VẬT TƯ
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="table-responsive min-h-60 df-h-67">
              <Table className="transactionTable table-head-fixed" hover bordered striped>
                <thead>
                  <tr>
                    <th >STT</th>
                    <th className="batchName" >Số lô</th>
                    <th>sản phẩm</th>
                    <th>Kho</th>
                    <th className="amount">Số lượng</th>
                    <th>Ngày tạo  </th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {itemTransaction}
                </tbody>
              </Table>
            </div>
            <Pagination data_lenght={listTransaction.length} callBackPagination={this.callBackPagination} />
          </TabPane>
        </TabContent>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="2">
            <div className="table-responsive min-h-60 df-h-67">
              <Table className="transactionTable table-head-fixed" hover bordered striped>
                <thead>
                  <tr>
                    <th >STT</th>
                    <th className="batchName" >Số lô</th>
                    <th>sản phẩm</th>
                    <th>Kho</th>
                    <th className="amount">Số lượng</th>
                    <th>Ngày tạo  </th>
                  </tr>
                </thead>
                <tbody className="bodyTable">
                  {itemTransaction}
                </tbody>
              </Table>
            </div>
            <Pagination data_lenght={listTransaction.length} callBackPagination={this.callBackPagination} />
          </TabPane>
        </TabContent>
        <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
      </Container>
    );
  }
}

export default ListTransaction;
