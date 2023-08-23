import React, { Component } from "react";
import { Table, Container, Button } from "reactstrap";
import ItemLocationType from "../Location_Type/ItemLocationType";
import { Link } from "react-router-dom";
import LocationService from "../Shared/LocationService";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";

class ListLocationType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      typeList: [],
      notiConfirm: '',
    };
  }

  componentDidMount() {
    this.getData();
  }
  // list data location
  getData() {
    LocationService.listTypeLocation()
      .then((response) => {
        this.setState({
          typeList: response.data,
        })
      }).catch((err) => {
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
      LocationService.deleteLocationType(data)
        .then(() => {
          this.setState({ notiConfirm: '' })
          this.getData();
          window.location.href = './type'
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
    let { typeList } = this.state;
    let itemList = typeList.map((tasksType, index) => {
      return (
        <ItemLocationType
          index={index}
          typeList={tasksType}
          key={index}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <Container>
        <div className="titleLocation">
          <h1>Quản Lý Loại Phòng Ban</h1>
        </div>
        <div className="addLocation">
          <Link to={`/app/location/type/create`}>
            <Button color="success">
              <span className="titleAddNew">Thêm Mới</span>
            </Button>
          </Link>
        </div>
        <div className="tableManager">
          <Table hover bordered>
            <thead>
              <tr>
                <th width="5%">#</th>
                <th width="15%">Loại Phòng</th>
                <th width="50%">Tên Phòng</th>
                <th width="15%">Thao Tác</th>
              </tr>
            </thead>
            {itemList}
          </Table>
        </div>
        <ModalConfirm message={this.state.notiConfirm} answer={this.answer}></ModalConfirm>
      </Container>
    );
  }
}

export default ListLocationType;
