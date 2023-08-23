import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import LocationService from "../Shared/LocationService";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import { DataTable } from "../../../../Shared/Components/DataTable/DataTable";
class ListLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      list_location: [],
      notiConfirm: "",
      list_type_location: [],
      headers: ["STT", "Loại Phòng", "Mã Phòng", "Tên Phòng", "Thao Tác"]
    };
  }

  componentDidMount() {
    this.getData();
  }

  // list data location
  getData() {
    let promiseArr = [];
    promiseArr.push(LocationService.listLocation());
    promiseArr.push(LocationService.listTypeLocation());
    Promise.all(promiseArr).then(([listLocation, listType]) => {
      let list_location = listLocation.data;
      let list_type_location = listType.data;
      list_location.map(lo => {
        let found = list_type_location.find(t => {
          return lo.type === t.code;
        })
        lo.location_type_name = found ? found.name : 'NA';
        return lo;
      })
      
      this.setState({
        list_location,
        list_type_location,
      });
    })
      .catch((err) => {
        this.setState({
          notiMessage: "Lỗi vui lòng bạn thử lại sau !!",
        });
        console.log(err);
      });
  }

  onDelete = (id) => {
    this.setState({
      notiConfirm: "Bạn có chắc chắn muốn xóa !!",
      id: id,
    });
  };

  answer = (isYes) => {
    if (isYes) {
      let data = {
        id: this.state.id,
      };
      LocationService.deleteLocation(data)
        .then(() => {
          this.setState({ notiConfirm: "" });
          this.getData();
          window.location.href = "./location";
        })
        .catch((err) => {
          this.setState({
            notiMessage: "Lỗi vui lòng bạn thử lại sau !!",
          });
          console.log(err);
        });
    } else {
      this.setState({ notiConfirm: "" });
    }
  };

  render() {
    const { list_location, headers, list_type_location } = this.state;
    this.state.list_location.sort((a,b) => a.code.localeCompare(b.code));
    const itemList = list_location.map((l, i) => {
      const VN_type = list_type_location.find(t => {
        if (t.code === l.type) {
          return t;
        }
      })
      return {
        id : l.id,
        index : i + 1,
        type : VN_type.name,
        code : l.code,
        name : l.name,
        event : ""
      }
    });
    return (
      <Container className="customCard mr-top-20">
        <div className="titleLocation">
          <h4 className="title-card-lg">Quản Lý Phòng Ban</h4>
        </div>
        <div className="addLocation">
          <Link to={`/app/location/create`}>
            <Button color="primary" outline>
              <span className="titleAddNew">Thêm Mới Phòng Ban</span>
            </Button>
          </Link>
        </div>
        <div className="tableManager">
          <DataTable headers={headers} body={itemList}/>
        </div>
        <ModalConfirm
          message={this.state.notiConfirm}
          answer={this.answer}
        ></ModalConfirm>
      </Container>
    );
  }
}

export default ListLocation;
