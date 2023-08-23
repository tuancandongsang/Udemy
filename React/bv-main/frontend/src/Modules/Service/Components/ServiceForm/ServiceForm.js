import React, { useState, useEffect, Fragment, useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Card,
  Row,
  Table,
} from "reactstrap";
import { useParams, Link } from "react-router-dom";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti";
import ServiceService from "../../Shared/ServiceService";
import Select from "react-select";
import { SERVICE_TYPE, String } from "../../../../Constances/const";
import { MATERIAL_UNIT } from "../../../../Constances/const.js";
const EditServiceForm = (props) => {
  let { id } = useParams();
  const [serviceList, setServiceList] = useState([]);
  useEffect(() => {
    {
      ServiceService.getServiceList()
        .then((res) => {
          setServiceList(res.data);
        })
        .catch((err) => {
          setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!");
        });
    }
  }, []);
  const [service, setService] = useState({
    code: "",
    name: "",
    origin_price: +0,
    type: "",
    steps: [],
    consumable:[]
  });
  const [step, setStep] = useState({
    service_id: id,
    unit: "",
    name: "",
    value: "",
    device: "",
  });
  const [confirmMessage, setConfirmMessage] = useState("");
  const [indexDeleteStep, setIndexDeleteStep] = useState([]);
  const [notiMessage, setNotiMessage] = useState("");
  const [locationSelected, setLocationSelected] = useState([]);
  const [listLocation, setListLocation] = useState([]);
  const [typeDone, setTypeDone] = useState(-1);
  const [isOpenMaterial, setIsOpenMaterial] = useState(false);
  const [listMaterial, setListMaterial] = useState([]);
  const [objMaterial, setObjectMaterial] = useState({
    name: "",
    idMaterial: "",
    amount: 0,
    unit: "",
  });
  const [arrMaterial, setArrMaterial] = useState([]);
  const [filterArrMaterial, setFilterArrMaterial] = useState([]);
  const createCode = (services) => {
    services.sort((a, b) => a.code.localeCompare(b.code));
    const arrCode = services.map((el) => el.code);
    const codeName = arrCode[arrCode.length - 1].substr(0, 2);
    const codeIndex = arrCode[arrCode.length - 1].substr(2);
    const newCodeIndex = parseInt(codeIndex) + 1;
    return codeName + String(newCodeIndex, "service");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "origin_price") {
      service.origin_price = e.target.value;
    }
    if (e.target.value === SERVICE_TYPE.EXAM) {
      const examService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.EXAM
      );
      service.code = createCode(examService);
      service.type = SERVICE_TYPE.EXAM;
    } else if (e.target.value === SERVICE_TYPE.TEST) {
      const testService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.TEST
      );
      service.code = createCode(testService);
      service.type = SERVICE_TYPE.TEST;
    } else if (e.target.value === SERVICE_TYPE.ENT) {
      const entService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.ENT
      );
      service.code = createCode(entService);
      service.type = SERVICE_TYPE.ENT;
    } else if (e.target.value === SERVICE_TYPE.XRAY) {
      const xrayService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.XRAY
      );
      service.code = createCode(xrayService);
      service.type = SERVICE_TYPE.XRAY;
    } else if (e.target.value === SERVICE_TYPE.ULTRASOUND) {
      const ultraService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.ULTRASOUND
      );
      service.code = createCode(ultraService);
      service.type = SERVICE_TYPE.ULTRASOUND;
    } else if (e.target.value === SERVICE_TYPE.OTHER) {
      const emerService = serviceList.filter(
        (service) => service.type === SERVICE_TYPE.OTHER
      );
      service.code = createCode(emerService);
      service.type = SERVICE_TYPE.OTHER;
    }
    if (service.origin_price) {
      service.origin_price = parseInt(service.origin_price);
      service["price"] = service.origin_price;
    }
    setService((service) => ({ ...service, [name]: value }));
  };
  const filterSelect = (materialArray) => {
    let arr = [];
    if (materialArray.length > 0) {
      arr = materialArray.map((el) => {
        return {
          value: el.name,
          label: el.name,
          unit: el.unit,
          id: el.id,
          isDisabled: false,
        };
      });
    }
    return arr;
  };
  useEffect(() => {
    if (id !== "0") {
      fetchService();
      getListLocationSelected();
    }
    getListLocation();
  }, []);
  useEffect(() => {
    let arrConsume=[...arrMaterial]
      setService(prev=>({
        ...prev,
        consumable:arrConsume.map(el=>{
          el.amount=+el.amount
          return {id:el.idMaterial,amount:el.amount}
        })
      }))
  },[arrMaterial])
  useEffect(async () => {
    let res = await ServiceService.getListMaterial();
    // setListMaterial(res.data);
    setFilterArrMaterial(filterSelect(res.data));
  }, []);

  const onCheckLocation = (locationId) => {
    const index = locationSelected.indexOf(locationId);
    if (index < 0) {
      locationSelected.push(locationId);
      if (id !== "0")
        ServiceService.addLocationService({
          service_id: id,
          location_id: locationId,
        });
    } else {
      locationSelected.splice(index, 1);
      if (id !== "0")
        ServiceService.removeLocationService({
          service_id: id,
          location_id: locationId,
        });
    }
    setLocationSelected([...locationSelected]);
    setIsOpenMaterial(true);
  };
  const fetchService = async () => {
    let fetchedService = await ServiceService.getServiceById(id);
    setService(fetchedService.data);
  };
  const getListLocationSelected = () => {
    ServiceService.getLocationService(id)
      .then((res) => {
        const arr = res.data;
        arr.forEach((a) => {
          a.type = "old";
          locationSelected.push(a.id);
          setLocationSelected([...locationSelected]);
        });
      })
      .catch((err) => console.log(err));
  };
  const getListLocation = () => {
    ServiceService.getListLocation()
      .then((res) => {
        setListLocation(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmitForm = () => {
    if (id === "0") {
      ServiceService.postService(service)
        .then((res) => {
          const obj = {
            service_id: res.data.id,
            steps: service.steps,
          };
          let promiseArr = [];
          if (service.type === SERVICE_TYPE.TEST)
            promiseArr.push(ServiceService.addStepService(obj));
          locationSelected.forEach((l) => {
            const data = {
              location_id: l,
              service_id: res.data.id,
            };
            promiseArr.push(ServiceService.addLocationService(data));
          });
          Promise.all(promiseArr)
            .then((resp) => {
              setNotiMessage("Thêm mới dịch vụ thành công!");
              setTypeDone(0);
              setIsOpenMaterial(false)
            })
            .catch((err) => {
              console.log(err);
              setNotiMessage("Có lỗi khi thêm trường dữ liệu!");
            });
        })
        .catch((err) => {
          console.log(err);
          setNotiMessage("Có lỗi xảy ra, vui lòng thử lại!");
        });
    } else {
      //cap nhat
      service.origin_price = parseInt(service.origin_price);
      ServiceService.editService(service)
        .then((res) => {
          let arrNew = [];
          let promiseArr = [];
          service.steps.forEach((s) => {
            if (s.type === "new") {
              delete s.type;
              arrNew.push(s);
            } else if (s.type === "update") {
              delete s.type;
              let data = {
                id: s.id,
                service_id: id,
                name: s.name,
                unit: s.unit,
                device: s.device,
                value: s.value,
              };
              promiseArr.push(ServiceService.updateStepService(data));
            }
          });
          const objNew = {
            service_id: id,
            steps: arrNew,
          };
          promiseArr.push(ServiceService.addStepService(objNew));
          Promise.all(promiseArr)
            .then((resp) => {
              setNotiMessage("Cập nhật dịch vụ thành công!");
              setTypeDone(1);
            })
            .catch((err) => console.log(err));
        })
        .catch((er) => console.log(er));
    }
  };

  const answer = (answer) => {
    if (answer) {
      ServiceService.deleteStepService({ id: indexDeleteStep[1] })
        .then((res) => {
          service.steps.splice(indexDeleteStep[0], 1);
          setService({ ...service });
          indexDeleteStep.splice(0, 2);
          setIndexDeleteStep(indexDeleteStep);
          setConfirmMessage("");
          setNotiMessage("Xóa thành công!");
        })
        .catch((err) => {
          console.log(err);
          setNotiMessage("Xóa thất bại!");
        });
    } else {
      setConfirmMessage("");
      indexDeleteStep.splice(0, 2);
      setIndexDeleteStep(indexDeleteStep);
    }
  };
  const onDeleteStep = (e, i, id) => {
    indexDeleteStep.push(i, id);
    setIndexDeleteStep(indexDeleteStep);
    setConfirmMessage("Bạn chắc chắn muốn xóa!");
  };
  const done = () => {
    setNotiMessage("");
    if (typeDone === 0) {
      setService({
        code: "",
        name: "",
        origin_price: 0,
        type: "",
        steps: [],
      });
      setStep({
        service_id: id,
        unit: "",
        name: "",
        value: "",
        device: "",
      });
      setLocationSelected([]);
    }
    if (typeDone === 1) {
      window.history.back();
    }
  };
  const onAddStep = () => {
    if (step.name) {
      step.type = "new";
      service.steps.push(step);
      setService({ ...service });
      setStep({
        service_id: id,
        unit: "",
        name: "",
        value: "",
        device: "",
      });
    } else {
      setNotiMessage("Tên trường liệu không được để trống!");
    }
  };
  const onChangeStep = (e) => {
    const { name, value } = e.target;
    setStep((step) => ({ ...step, [name]: value }));
  };
  // const onChangeOldStep = (e,i) => {
  //     const { name , value } = e.target;
  //     console.log(service.steps[i])
  //     service.steps[i].[name] = value;
  //     if(service.steps[i].type !== 'new'){
  //         service.steps[i].type = 'update'
  //     }
  //     setService({...service})
  // }
  const filterUnit = (nameMaterial) => {
    return MATERIAL_UNIT.find((el) => el.code === nameMaterial).label;
  };
  const handleChangeMaterial = (e) => {
    setObjectMaterial((prev) => ({
      ...prev,
      name: e.value,
      idMaterial: e.id,
      unit: filterUnit(e.unit),
    }));
  };
  const handleChangeAmount = (e) => {
    setObjectMaterial((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
  };
  const addObjMaterial = () => {
    if (objMaterial.unit.length == 0) {
      setNotiMessage("Vui lòng chọn vật tư");
    } else if (
      objMaterial.unit.length != 0 &&
      Object.values(objMaterial).includes("")
    ) {
      setNotiMessage("Vui lòng điền số lượng");
    }else if(Number.isNaN(+objMaterial.amount)){
      setNotiMessage("Số lượng phải là dạng số")
    }
     else {
      setArrMaterial((prev) => [...prev, objMaterial]);
      let newArrMaterial =[...filterArrMaterial]
      newArrMaterial.forEach(el=>{
        if(el.id==objMaterial.idMaterial){
          el.isDisabled=true
        }
      })
      setFilterArrMaterial(newArrMaterial)
      
      setObjectMaterial((prev) => ({
        ...prev,
        name: "",
        idMaterial: "",
        amount: "",
        unit: "",
      }));
    }
  };
  const removeMaterial = (index) => {
    let newArr = [...arrMaterial];
    let removeItem=newArr.find(el=>newArr.indexOf(el)==index)
    let newArrMaterial=[...filterArrMaterial]
    newArrMaterial.forEach(el=>{
      if(el.id==removeItem.idMaterial){
        el.isDisabled=false
      }
    })
    setFilterArrMaterial(newArrMaterial);
    newArr.splice(index, 1);
    setArrMaterial(newArr);
  };
  console.log(service)
  return (
    <Fragment>
      <div className="container">
        <div className="service-form">
          <ModalConfirm message={confirmMessage} answer={answer}></ModalConfirm>
          <ModalNoti message={notiMessage} done={done}></ModalNoti>
          <h4 className="title-card-lg middle mb-3">
            {id !== "0" ? "Chỉnh sửa dịch vụ" : "Thêm mới dịch vụ"}
          </h4>
          <Form>
            <FormGroup row>
              <Label for="name" sm={2}>
                Tên dịch vụ
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="name"
                  id="name"
                  placeholder="Nhập tên dịch vụ"
                  value={service.name}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
            </FormGroup>
            {/* <FormGroup row>
                        <Label for="code" sm={2}>Mã dịch vụ</Label>
                        <Col sm={10}>
                            <Input type="text" name="code" id="code" placeholder="Nhập mã dịch vụ" value={service.code} onChange={(e) => handleChange(e)} />
                        </Col>
                    </FormGroup> */}
            <FormGroup row>
              <Label for="price" sm={2}>
                Giá gốc
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="origin_price"
                  id="origin_price"
                  placeholder="Nhập giá dịch vụ"
                  value={service.origin_price}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="type" sm={2}>
                Loại dịch vụ
              </Label>
              <Col sm={10}>
                <Input
                  type="select"
                  name="type"
                  id="type"
                  value={service.type}
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled value="">
                    Chọn loại dịch vụ
                  </option>
                  <option value={SERVICE_TYPE.TEST}>Xét nghiệm</option>
                  <option value={SERVICE_TYPE.EXAM}>Khám bệnh</option>
                  <option value={SERVICE_TYPE.ENT}>Nội soi</option>
                  <option value={SERVICE_TYPE.ULTRASOUND}>Siêu âm</option>
                  <option value={SERVICE_TYPE.XRAY}>X-Quang</option>
                  <option value={SERVICE_TYPE.OTHER}>Cấp cứu</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>Chọn phòng</Label>
              <Col sm={10} className="checkbox-location">
                {listLocation.map((l) => {
                  return (
                    <Button
                      onClick={() => onCheckLocation(l.id)}
                      active={locationSelected.includes(l.id)}
                    >
                      {l.name}
                    </Button>
                  );
                })}
              </Col>
            </FormGroup>

            <div
              className="material_form"
              style={{ display: isOpenMaterial === false ? "none" : "block" }}
            >
              <h4 className="title-card-lg middle mb-3">Vật tư tiêu hao</h4>
              <Form style={{ height: "350px" }}>
                <FormGroup row>
                  <Label for="name" sm={2}>
                    Chọn vật tư
                  </Label>
                  <Col sm={3}>
                    <Select
                      //  style={customStyle}
                      className="basic-single"
                      classNamePrefix="select"
                      name="color"
                      options={filterArrMaterial}
                      onChange={handleChangeMaterial}
                    />
                  </Col>
                  <Col sm={3}>
                    <Input
                      placeholder="Số lượng"
                      onChange={handleChangeAmount}
                      value={
                        objMaterial.amount.length > 0 ? objMaterial.amount : ""
                      }
                    />
                  </Col>
                  <Col sm={3}>
                    <Input
                      placeholder="Đơn vị"
                      value={
                        objMaterial.unit.length > 0 ? objMaterial.unit : ""
                      }
                      disabled
                    />
                  </Col>
                  <Col sm={1}>
                    <Button onClick={() => addObjMaterial()}>+</Button>
                  </Col>
                </FormGroup>

                <div className="material_container">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Tên vật tư</th>
                        <th>Số lượng</th>
                        <th>Xóa vật tư</th>
                      </tr>
                    </thead>
                    <tbody className="table_body">
                      {arrMaterial.length > 0 &&
                        arrMaterial.map((el, index) => (
                          /* <Row>
                          <Col xs={{ size: 3, offset: 2 }}>
                            <Input value={el.name} disabled />
                          </Col>
                          <Col xs={{ size: 3, offset: 2 }}>
                            <Input value={el.amount} disabled />
                          </Col>
                          <Col sm={2} style={{ paddingLeft: "46px" }}>
                            <Button
                              color="danger"
                              onClick={() => removeMaterial(index)}
                            >
                              X
                            </Button>
                          </Col>
                        </Row> */
                          <tr>
                            <td style={{ textAlign: "center" }}>{el.name}</td>
                            <td style={{ textAlign: "center" }}>{`${el.amount} ${el.unit}`}</td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                color="danger"
                                onClick={() => removeMaterial(index)}
                              >
                                X
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Form>
            </div>

            {/* {service.type === SERVICE_TYPE.TEST ?
                    <FormGroup row>
                        <Label sm={2}>Thêm trường dữ liệu</Label>
                        <Col sm={3}>
                            <Input type="text" placeholder="Nhập tên trường" value={step.name} onChange={e => onChangeStep(e)} name="name"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="text" placeholder="Nhập đơn vị" value={step.unit} onChange={e => onChangeStep(e)} name="unit"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="text" placeholder="Nhập chỉ số" value={step.value} onChange={e => onChangeStep(e)} name="value"/>
                        </Col>
                        <Col sm={2}>
                            <Input type="text" placeholder="Nhập máy xét nghiệm" value={step.device} onChange={e => onChangeStep(e)} name="device"/>
                        </Col>
                        <Col>
                            <Button onClick={onAddStep}>Lưu</Button>
                        </Col>
                    </FormGroup> : null} */}
            {/* {service.type === SERVICE_TYPE.TEST ? service.steps.map((s,i) => {
                       return <FormGroup row key={i}>
                                <Label sm={2}></Label>
                                <Col sm={3}>
                                    <Input type="text" placeholder="Nhập tên trường" value={s.name} name="name" onChange={e => onChangeOldStep(e, i)}/>
                                </Col>
                                <Col sm={2}>
                                    <Input type="text" placeholder="Nhập đơn vị" name="unit" value={s.unit} onChange={e => onChangeOldStep(e, i)}/>
                                </Col>
                                <Col sm={2}>
                                    <Input type="text" placeholder="Nhập chỉ số" value={s.value} name="value" onChange={e => onChangeOldStep(e, i)}/>
                                </Col>
                                <Col sm={2}>
                                    <Input type="text" placeholder="Nhập máy xét nghiệm" value={s.device} name="device" onChange={e => onChangeOldStep(e, i)}/>
                                </Col>
                                <Col>
                                    <Button color="danger" onClick={e => onDeleteStep(e, i, s.id)}>Xóa</Button>
                                </Col>
                            </FormGroup>
                    }) : null} */}

            {/* <Row>
                        <Col sm={{ size: 10, offset: 2 }}> */}
            <div className="addControl pb-50 mb-200">
              {" "}
              <Button
                color="primary"
                outline
                onClick={() => handleSubmitForm()}
              >
                {id !== "0" ? "Cập nhật" : "Thêm mới"}
              </Button>{" "}
              &nbsp;&nbsp;
              <Link to="/app/service">
                <Button color="danger" className="mr-2">
                  Quay lại
                </Button>
              </Link>
            </div>
            {/* </Col>
                    </Row> */}
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditServiceForm;
