import React, { useState, useEffect, Fragment, Select } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, FormGroup, Label, Input, Col, Row } from "reactstrap";
import InventoryService from "../Shared/InventoryService";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti"
import ReactAutocomplete from "react-autocomplete";
import { WAREHOUSE_TYPE } from "../../../../Constances/const";

const FormLot = () => {
  const [Lot, setLot] = useState({
    code: "",
    warehouse_id: "",
    ref: "",
    ref_id: "",
    total: "",
    man_date: "",
    exp_date: "",
  });

  let { id } = useParams();

  const [refresh, setRefresh] = useState(0);
  const [value, setValue] = useState("");

  const [ProductList, setProductList] = useState([]);
  const [consumables, setConsumables] = useState([]);
  //////////////// Sơn_8-4-2021
  const [WarehouseList, setWarehouseList] = useState([]);
  ////////////////
  const [notiMessage, setNotiMessage] = useState("");
  const [type, setType] = useState(WAREHOUSE_TYPE.PRODUCT);

  useEffect(async () => {
    if (id !== '0') {
      fetchWarehouseList();
      let fetchProductList = await InventoryService.listProduct();
      setProductList(fetchProductList.data);
      let lot = await InventoryService.getLot(id);
      await setLot(lot.data);
      const product = fetchProductList.data.find(p => p.id === lot.data.ref_id)
      setValue(product.name)
    } else {
      fetchWarehouseList();
      fetchProductList();
      fetchConsumables();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLot((Lot) => ({ ...Lot, [name]: value }));
  };

  const fetchProductList = async () => {
    let fetchProductList = await InventoryService.listProduct();
    setProductList(fetchProductList.data);
    console.log(ProductList, "ProductList")
  };

  const fetchConsumables = async () => {
    const consumables = await InventoryService.listConsumable();
    setConsumables(consumables.data);
  }

  ////////////////////////////////////////////////
  const fetchWarehouseList = async () => {
    let fetchWarehouseList = await InventoryService.listWareHouse();
    setWarehouseList(fetchWarehouseList.data);
  };
  //////////////////////////////////////////////
  const createLot = () => {
    const payload = Lot;
    return InventoryService.createLot(payload);
  };

  let Warehouse_list = WarehouseList.map((data, i) => {
    return (
      <option value={data.id} key={i}>
        {data.name}
      </option>
    );
  });
  ////////////////////
  const onChangeProduct = (e) => {
    if (id === '0') setValue(e.target.value);
  }
  const onSelectProduct = (value, item) => {
    if (id === '0') {
      setValue(value)
      setLot({ ...Lot, ref: type, ref_id: item.id })
    }
  }
  const handleSubmitForm = () => {
    if (!Lot.warehouse_id) {
      setNotiMessage('Bạn chưa chọn nhà kho!');
      setRefresh(1)
      return 
    } else if (!Lot.code || !Lot.ref_id || !Lot.total || !Lot.man_date || !Lot.exp_date ) {
      setNotiMessage('Bạn chưa nhập đủ thông tin!');
      setRefresh(1)
    } else {
        if(id == '0') {
          createLot()
            .then(() => {
              setNotiMessage('Thêm mới thành công!');
            })
            .catch((err) => {
              console.log(err);
              setNotiMessage('Có lỗi xảy ra, vui lòng thử lại!');
            });
        }else {
          InventoryService.editLot(id, Lot)
          .then(() => {
            setRefresh(2);
            setNotiMessage('Cập nhật thành công!');
          })
          .catch((err) => {
            console.log(err);
            setRefresh(2);
            setNotiMessage('Cập nhật thất bại');
          });
      }
    }
  };

  const handleSelectType = (e) => {
    setType(e.target.value);
  }

  const done = () => {
    if(refresh === 0) {
      setNotiMessage("");
      setLot((Lot) => ({
        ...Lot,
        code: "",
        warehouse_id: "",
        product_id: "",
        total: "",
        man_date: "",
        exp_date: "",
      }));
      setValue("");
      setRefresh(0);
    } else if(refresh === 2) {
      window.location.assign("/app/inventory/lot")
    }
    else if(refresh === 1) {
      setNotiMessage("");
      setRefresh(0);
    }
  };
  return (
    <Fragment>
      <div className="FormLot">
        <Row>
          <ModalNoti message={notiMessage} done={done}></ModalNoti>
          <Col xs="1"></Col>
          <Col xs="10">
            <h1 className="title-card-lg">Thêm Lô Mới</h1>
            <FormGroup name="form_item">
              <Row>
                <Col xs="6">
                  <Row>
                    <Col xs="4">
                      <Label>Tên kho</Label>
                    </Col>
                    <Col>
                      <Input
                        disabled={id !== '0'}
                        type="select"
                        id="warehouse_id"
                        name="warehouse_id"
                        value={Lot.warehouse_id}
                        onChange={(e) => handleChange(e)}
                      >
                        <option>Chọn nhà kho</option>
                        {Warehouse_list}
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <Label>Tên lô</Label>
                    </Col>
                    <Col>
                      <Input
                        type="text"
                        id="code"
                        name="code"
                        value={Lot.code}
                        onChange={(e) => handleChange(e)}
                        placeholder="Nhập tên lô"
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <Label>Phân loại</Label>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Input style={{height: "38px"}} disabled={id !== '0'} type="select" name="type" id="type" onChange={event => { handleSelectType(event) }}>
                            <option value={WAREHOUSE_TYPE.PRODUCT}>Thuốc</option>
                            <option value={WAREHOUSE_TYPE.CONSUMABLE}>Vật tư</option>
                          </Input>
                      </FormGroup>
                    </Col>
                    <Col>
                      <Label>Sản phẩm</Label>
                    </Col>
                    <Col className="auto-form-control">
                      {id === '0' ? 
                        type === WAREHOUSE_TYPE.PRODUCT ? 
                        <ReactAutocomplete
                          items={ProductList}
                          shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => item.name}
                          renderMenu={children => (
                            <div className="menu">
                              {children.slice(0, 9)}
                            </div>
                          )}
                          renderItem={(item) =>
                            <div
                              key={item.id}
                            >
                              {item.name}
                            </div>
                          }
                          value={value}
                          onChange={e => onChangeProduct(e)}
                          onSelect={(value, item) => onSelectProduct(value, item)}
                        /> :
                        <ReactAutocomplete
                          items={consumables}
                          shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
                          getItemValue={item => item.name}
                          renderMenu={children => (
                            <div className="menu">
                              {children.slice(0, 9)}
                            </div>
                          )}
                          renderItem={(item) =>
                            <div
                              key={item.id}
                            >
                              {item.name}
                            </div>
                          }
                          value={value}
                          onChange={e => onChangeProduct(e)}
                          onSelect={(value, item) => onSelectProduct(value, item)}
                        /> :
                        <div>
                          <Input type="text" disabled value={value} />
                        </div>
                      }
                    </Col>
                  </Row>

                </Col>
                <Col xs={6}>
                  <Row>
                    <Col xs="4">
                      <Label>Số lượng</Label>
                    </Col>
                    <Col>
                      <Input
                        disabled={id !== '0'}
                        type="number"
                        id="total"
                        name="total"
                        value={Lot.total}
                        onChange={(e) => handleChange(e)}
                        placeholder="Nhập số lượng"
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <Label>Ngày nhập</Label>
                    </Col>
                    <Col>
                      <Input
                        type="date"
                        name="man_date"
                        id="man_date"
                        value={Lot.man_date}
                        onChange={(e) => handleChange(e)}
                      ></Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="4">
                      <Label>Ngày hết hạn</Label>
                    </Col>
                    <Col>
                      <Input
                        type="date"
                        name="exp_date"
                        id="exp_date"
                        value={Lot.exp_date}
                        onChange={(e) => handleChange(e)}
                      ></Input>

                    </Col>
                    <Col xs={12}>
                      <div className="btnControlLot">
                        <Button
                          outline
                          color="primary"
                          className="btnAddNew"
                          onClick={() => handleSubmitForm()}
                        >
                          {id === '0' ? 'Thêm mới' : 'Cập nhật' }
                        </Button>
                        &nbsp; &nbsp;
                        <Link to="/app/inventory/lot">
                          <Button className="mr-2" color="danger">Quay lại</Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </FormGroup>
          </Col>
          <Col xs="1"></Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default FormLot;
