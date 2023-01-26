import React, { Component } from "react";
import LocationService from "../Shared/LocationService";
import ModalNoti from '../../../../Shared/Components/ModalNoti/ModalNoti';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";


class ActionLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      code: '',
      nameRoom: '',
      typeRoom: '',
      notiMessage: '',
      dataType: [],
    };
  }

  componentDidMount() {
    LocationService.listTypeLocation()
      .then((response) => {
        this.setState({
          dataType: response.data
        })
      }).catch((error) => { console.log(error) });
    let { match } = this.props;
    let id = match.params.id
    if (id) {
      LocationService.getUpdateLocation(id)
        .then((response) => {
          let dataEdit = response.data;
          this.setState({
            id: dataEdit.id,
            nameRoom: dataEdit.name,
            typeRoom: dataEdit.location_type,
          });
        }).catch((error) => {
          console.log(error)
        });
    }
    return;
  }

  onBack = () => {
    window.history.back();
  }

  // data
  onchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // create and update data
  onSubmit = () => {
    let { id, nameRoom, typeRoom, code } = this.state;

    if (id) {
      // update
      let data = {
        id: id,
        name: nameRoom,
        location_type: typeRoom,
        code: code,
      };
      LocationService.updateLocation(data)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              notiMessage: 'Cập nhật thành công'
            })
          }
        }).catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
          })
          console.log(err);
        });
    } else {
      let data = {
        name: nameRoom,
        location_type: typeRoom,
        code: code,
      };
      LocationService.createLocation(data)
        .then(() => {
          this.setState({
            notiMessage: 'Thêm mới thành công'
          })
        }).catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
          })
          console.log(err);
        });
    }
  };

  doneAlert = () => {
    if (this.state.notiMessage) {
      window.history.back();
    } else {
      this.setState({ notiMessage: '' })
    }
  }

  render() {
    let { id, nameRoom, typeRoom, dataType, code } = this.state;
    let _dataType = dataType.map((data, i) => {
      return <option value={data.id} key={i}>{data.name}</option>
    })
    return (
      <section className="location">
        <Container>
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <div className="titleNameRoom title-card-lg">
                <h4>{id === '' ? 'Thêm mới phòng ban' : 'Cập nhật phòng ban'}</h4>
              </div>
              <Form className="location_form" id="location_form">
                <FormGroup>
                  <Label for="code">Mã phòng</Label>
                  <Input
                    type="text"
                    name="code"
                    value={code}
                    placeholder="Nhập mã phòng"
                    onChange={this.onchange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nameRoom">Tên phòng</Label>
                  <Input
                    type="text"
                    name="nameRoom"
                    value={nameRoom}
                    placeholder="Nhập tên phòng"
                    onChange={this.onchange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="type">Chọn loại phòng</Label>
                  <Input type="select" name="typeRoom" value={typeRoom} onChange={this.onchange}>
                    <option disable="true">Chọn Loại Phòng</option>
                    {_dataType}
                  </Input>
                </FormGroup>
                <div className="editLocation">
                  <Button outline color="primary" onClick={this.onSubmit}>
                    {id === '' ? 'Thêm mới' : 'Cập nhật'}
                  </Button> &nbsp;&nbsp;
                  <Button color="danger btnDanger" onClick={this.onBack} >
                    Hủy Bỏ
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <ModalNoti message={this.state.notiMessage} done={this.doneAlert}></ModalNoti>
      </section>
    );
  }
}
export default ActionLocation;
