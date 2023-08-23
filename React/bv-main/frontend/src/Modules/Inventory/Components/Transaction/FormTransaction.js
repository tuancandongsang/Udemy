import React, { Component } from "react";
import InventoryService from "../Shared/InventoryService";
import ModalNoti from '../../../../Shared/Components/ModalNoti/ModalNoti';
import { Row, Col, Button, Form, FormGroup, Label, Input, Container, } from "reactstrap";
import ReactAutocomplete from "react-autocomplete";

class FormTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      product_id: '',
      productName: "",
      amount: 0,
      warehouse_id: '',
      lot_id: '',
      notiMessage: '',
      listWareHouse: [],
      listProduct: [],
      listLot: [],
      valueP: '',
      valueL: '',
    };
  }

  componentDidMount() {
    InventoryService.listProduct()
    .then((res) => {
      this.setState({
        listProduct: res.data
      })
    }).catch((err) => { 
      this.setState({
        notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
      })
      console.log(err) 
    });
    InventoryService.allLot()
    .then((response) => {
      this.setState({
        listLot: response.data
      })
    }).catch((error) => { 
      this.setState({
        notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
      })
      console.log(error) 
    });
    InventoryService.listWareHouse()
    .then((response) => {
      this.setState({
        listWareHouse: response.data
      })
    }).catch((error) => { 
      this.setState({
        notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
      })
      console.log(error) 
    });
    return;
  }

  onBack = () => {
    window.history.back();
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = () => {
    let { valueL, valueP, product_id, amount, lot_id, listLot } = this.state;
    let count = 0;
    amount = -Number(amount);
    let ref = 'lot';
    let ref_id = lot_id;
    let data = {
      ref,
      ref_id,
      amount,
      lot_id,
    };
    listLot.forEach(l => {
      if(l.id == lot_id && l.ref_id == product_id){
        count = 1;
      }
    });
    if(count == 0){
      this.setState({
        notiMessage: 'Sản phẩm ' + valueP + ' không có trong lô ' + valueL
      })
    }else{
      InventoryService.createTransactionForLot(data)
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
  onChangeProduct = (e) => {
    this.setState({
      valueP : e.target.value
    });
  }
  onSelectProduct = (value, item) => {
    this.setState({
      valueP: value,
      product_id: item.id
    })
  }
  onChangeLot = (e) => {
    this.setState({
      valueL : e.target.value
    })
  }
  onSelectLot = (value, item) => {
    this.setState({
      valueL: value,
      lot_id: item.id
    })
  }
  doneAlert = () => {
    if (this.state.notiMessage) {
      window.history.back();
    } else {
      this.setState({ notiMessage: '' })
    }
  }

  render() {
    let { warehouse_id, amount, listWareHouse, listLot, listProduct, valueP, valueL } = this.state;
    let itemWareHouse = listWareHouse.map((data, i) => {
      return <option value={data.id} key={i}>{data.name}</option>
    })
    
    return (
      <section className="transaction">
        <Container>
          <Row>
            <Col xs={{ size: 6, offset: 3 }}>
              <div>
                <h2 className="title-card-lg">Thêm mới xuất kho</h2>
              </div>
              <Form>
                <FormGroup className="auto-form-control">
                  <Label for="type">Tên sản phẩm</Label>
                  <ReactAutocomplete       
                      items={listProduct}
                      renderMenu={ children => (
                        <div className= "menu">
                           {children.slice(0, 9)}
                        </div>
                      )}
                      shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.name}
                      renderItem={(item) =>
                        <div
                          key={item.id}
                        >
                          {item.name}
                        </div>
                      }
                      value = {valueP}
                      onChange = {this.onChangeProduct}
                      onSelect = { (value, item) => this.onSelectProduct(value, item)}
                    />
                </FormGroup>
                <FormGroup className="auto-form-control">
                  <Label for="type">Tên lô</Label>
                  <ReactAutocomplete       
                      items={listLot}
                      renderMenu={ children => (
                        <div className= "menu">
                           {children.slice(0, 9)}
                        </div>
                      )}
                      shouldItemRender={(item, value) => item.code.toLowerCase().indexOf(value.toLowerCase()) > -1}
                      getItemValue={item => item.code}
                      renderItem={(item) =>
                        <div
                          key={item.id}
                        >
                          {item.code}
                        </div>
                      }
                      value = {valueL}
                      onChange = {this.onChangeLot}
                      onSelect = { (value, item) => this.onSelectLot(value, item)}
                    />
                </FormGroup>
                <FormGroup>
                  <Label for="warehouse_id">Nhà kho</Label>
                  <Input
                    type="select"
                    name="warehouse_id"
                    value={warehouse_id}
                    onChange={this.onChange}
                  >
                    <option> Chọn nhà kho </option>
                    {itemWareHouse}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="amount">Số lượng</Label>
                  <Input
                    type="number"
                    name="amount"
                    value={amount}
                    placeholder="Nhập số lượng"
                    onChange={this.onChange}
                  />
                </FormGroup>
                <div className="btnOptions pt-20">
                  <Button outline color="primary" type="button" onClick={this.onSubmit}>
                    Thêm mới
                    </Button>
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
export default FormTransaction;
