import React, { Component } from "react";
import { Table, Container, Button } from "reactstrap";
import ItemProducer from './ItemProducer';
import { Link } from "react-router-dom";
import InventoryService from "../Shared/InventoryService";
import ModalConfirm from '../../../../Shared/Components/ModalConfirm/ModalConfirm';


class ProducerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      notiConfirm: '',
      listProducer :[],

    };
  }

  componentDidMount() {
    this.getData();
  }

  // list data location
  getData() {

    let promiseArr = [];
    promiseArr.push(InventoryService.getProducerList());
    Promise.all(promiseArr).then(([list_producer]) => {
      let listProducer = list_producer.data;
      this.setState({
        listProducer
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
      InventoryService.deleteProducer(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
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

  render() {
    let { listProducer } = this.state;
    let itemProducer = listProducer.map((itemB, index) => {
      return <ItemProducer index={index} listProducer={itemB} key={index} onDelete={this.onDelete} />;
    });
    return (
      <Container className="customCard mt-3">
        <div>
          <h1 className="title-card-lg">Danh sách nhà sản xuất</h1>
        </div>
        <div className="addNew">
          <Link to={`./producer/0`}>
            <Button outline color="primary">Thêm mới</Button>
          </Link>
        </div>
        <div className="tableManager">
          <Table className="managerTable" bordered hover striped>
            <thead>
              <tr>
                <th >STT</th>
                <th className="ID">ID</th>
                <th >Tên </th>
                <th>Thông tin nhà sản xuất</th>
                <th>Thuộc tính</th>
              </tr>
            </thead>
            <tbody className="bodyTable">
              {itemProducer}
            </tbody>
          </Table>
        </div>
        <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
      </Container>
    );
  }
}

export default ProducerList;
