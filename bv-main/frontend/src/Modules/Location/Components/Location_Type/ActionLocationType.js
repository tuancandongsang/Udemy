import React, { Component } from 'react';
import LocationService from '../Shared/LocationService';
import ModalNoti from '../../../../Shared/Components/ModalNoti/ModalNoti'
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from 'reactstrap';


class ActionLocationType extends Component {
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
    let { match } = this.props;
    let id = match.params.id
    if (id) {
      LocationService.getUpdateLocationType(id)
        .then((response) => {
          let dataEdit = response.data;
          this.setState({
            id: dataEdit.id,
            nameRoom: dataEdit.name,
            code: dataEdit.code,
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
    },
    );
  };
  // create and update data
  onSubmit = () => {
    let { id, code, nameRoom } = this.state;
    if (id) {
      let data = {
        id: id,
        code: code,
        name: nameRoom,
      };
      LocationService.updateLocationType(data)
        .then(() => {
          this.setState({
            notiMessage: 'Cập nhật thành công'
          })
        })
        .catch((err) => {
          this.setState({
            notiMessage: 'Lỗi vui lòng thử lại sau !!'
          })
          console.log(err);
        });
    } else {
      let data = {
        code: code,
        name: nameRoom,
      };
      LocationService.createLocationType(data)
        .then(() => {
          this.setState({
            notiMessage: 'Thêm mới thành công'
          })
        }).catch((err) => {
            this.setState({
              notiMessage: 'Lỗi vui lòng thử lại sau !!'
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
    let { id, code, nameRoom } = this.state;
    return (
      <section className="location">
        <Container>
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <div className="titleNameRoom">
                <h2>{id === '' ? 'Thêm mới loại phòng ban' : 'Cập nhật loại phòng ban'}</h2>
              </div>
              <Form className="location_form" id="location_form">
                <FormGroup>
                  <Label for="code">Mã loại phòng</Label>
                  <Input
                    id="code"
                    type="text"
                    name="code"
                    value={code}
                    placeholder="Nhập mã loại phòng"
                    onChange={this.onchange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="nameRoom">Tên loại phòng</Label>
                  <Input
                    type="text"
                    name="nameRoom"
                    value={nameRoom}
                    placeholder="Nhập tên loại phòng"
                    onChange={this.onchange}
                  />
                </FormGroup>
                <Button color="danger btnDanger" onClick={this.onBack} >
                  Hủy Bỏ
                </Button>
                <Button color="success" onClick={this.onSubmit}>
                  {id === '' ? 'Thêm mới' : 'Cập nhật'}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <ModalNoti message={this.state.notiMessage} done={this.doneAlert}></ModalNoti>
      </section>

    );
  }
}
export default ActionLocationType;
