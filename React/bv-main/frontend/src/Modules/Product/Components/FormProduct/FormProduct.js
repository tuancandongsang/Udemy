import React from "react";
import { Button, FormGroup, Label, Input, Col, Row }from "reactstrap";
import ProductService from "../Shared/ProductService";
import { FormParent, ModalNoti, ModalConfirm } from "../Shared";
import { Multiselect } from 'multiselect-react-dropdown';
import { ATTR_UNIT, ROUTE, ROLE, PRODUCT_UNIT } from "../../../../Constances/const";
import AuthService from "../../../../Shared/Services/AuthService";
class FormProduct extends FormParent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            producer_id: '',
            form: this._getInitFormData({ 
                unit: '',
                strength: 0,
                // max_dose: 0,
                // instruction: '',
                package_size: 0,
                default_quantity: 0,
                // default_day_supply: 0,
                default_daily_usage: 0,
                max_dose_per_kg: 0,
                route: '',
                description: '',
            }),
            unitProduct: '',
            origin_price: 1,
            price: 1,        
            parts: [],
            arrSelected: [],
            listPart: [],
            listProducer: [],
            isBack: true,
        };
    }

    componentDidMount() {
        let { match } = this.props;
        let id = match.params.id;
        this.setState({ id });
        ProductService.listProducer()
            .then((res) => {
                this.setState({
                    listProducer: res.data
                });
            }).catch((err) => { console.log(err) });
        if (id == 0) {
            ProductService.listPart()
                .then(response => {
                    this.setState({
                        listPart: response.data,
                    });
                }).catch(error => console.log(error));
        } else {
            let promiseArr = [];
            promiseArr.push(ProductService.getProduct(id));
            promiseArr.push(ProductService.listPart());
            Promise.all(promiseArr).then(([product, list_part]) => {
                let data = product.data;
                let listPart = list_part.data;
                let parts = data.parts;
                let result = [];
                parts.forEach(a => {
                    let found = listPart.find(p => {
                        return a.id == p.id;
                    });
                    result.push(found ? found : '');
                    a.name = found? found.name : 'N/A';
                });
                
                //Kiem tra du lieu
                if(!data.attrs.default_daily_usage) data.attrs.default_daily_usage = 0;
                if(!data.attrs.max_dose_per_kg) data.attrs.max_dose_per_kg = 0;
                if(!data.attrs.description) data.attrs.description = 0;
                this._fillForm(data.attrs);

                this.setState({
                    listPart,
                    parts,
                    name: data.name,
                    unitProduct: data.unit,
                    price: data.price,
                    origin_price: data.origin_price,
                    producer_id: data.producer_id,
                    arrSelected: result
                });
            });
        }
        return;
    }

    onSelectPart = (list, item) => {
        let arr = this.state.parts;
        let objP = {};
        objP.id = item.id;
        objP.name = item.name;
        arr.push(objP);
        this.setState({
            parts: arr
        });
    }
    onRemovePart = (list, item) => {
        let arr = this.state.parts;
        let pos = arr.findIndex((el) => {
            return el.id == item.id
        });
        arr.splice(pos, 1);
        this.setState({
            parts: arr
        })  
    }
    onBack = () => {
        window.history.back();
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onChangePQty = (e, i) => {
        let arr = this.state.parts;
        arr[i].quantity = e.target.value;
        this.setState({
            parts: arr,
        });
    }   
    onChangePUnit = (e, i) => {
        let arr = this.state.parts;
        arr[i].unit = e.target.value;
        this.setState({
            parts: arr,
        })
    }
    onSubmit = () => {
        // this._validateForm();
        let { id, name, producer_id, parts, price, form, origin_price, unitProduct } = this.state;
        if(producer_id === "Chọn nhà sản xuất" || !producer_id) {
            this.setState({
                isBack: false,
                notiMessage: 'Bạn chưa chọn nhà sản xuất',
            });
            return
        }
        if(unitProduct === "Chọn đơn vị" || !unitProduct) {
            this.setState({
                isBack: false,
                notiMessage: 'Bạn chưa chọn đơn vị',
            });
            return
        }
        let strength = form.strength.value;
        // let instruction = form.strength.value;
        let unit = form.unit.value;
        let package_size = form.package_size.value;
        // let max_dose = form.max_dose.value;
        // let default_day_supply = form.default_day_supply.value;
        let default_quantity = form.default_quantity.value;
        let default_daily_usage = form.default_daily_usage.value;
        let route = form.route.value;
        let max_dose_per_kg = form.max_dose_per_kg.value;
        let description = form.description.value;
        let attrs = {
            strength,
            // instruction,
            unit,
            package_size,
            // max_dose,
            default_quantity,
            // default_day_supply,
            default_daily_usage,
            route,
            max_dose_per_kg,
            description
        }
        if(id == 0) {
            let data = {
                name,
                producer_id,
                attrs,
                parts,
                unit: unitProduct,
                price: Number(price),
                origin_price: Number(origin_price)
            };
            ProductService.createProduct(data)
                .then(( ) => {
                    this.setState({
                        notiMessage: 'Thêm mới thành công'
                    })
                }).catch((err) => {
                    this.setState({
                        notiMessage: 'Lỗi vui lòng bạn thử lại sau !!'
                    })
                    console.log(err);
                });
        } else {
            let data = {
                id,
                name,
                producer_id,
                attrs,
                parts,
                unit: unitProduct,
                price: Number(price),
                origin_price: Number(origin_price)
            };  
            ProductService.updateProduct(data)
                .then(() => {
                    this.setState({
                        notiMessage: 'Cập nhật thành công'
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
        if (this.state.notiMessage && this.state.isBack) {
            window.history.back();
        } else {
            this.setState({ 
                notiMessage: '',
                isBack: true 
            })
        }
    }

    render() {
        let { listProducer, confirmMessage, answer, parts, id, name, producer_id, listPart, arrSelected, price, origin_price, unitProduct,  } = this.state;
        let { strength, instruction, unit, package_size, default_day_supply, default_quantity, max_dose, route, default_daily_usage, max_dose_per_kg, description } = this.state.form
        let listP = listProducer.map((data, i) => {
            return (
                <option value={data.id} key={i}>
                    { data.name}
                </option>
            );
        });
        let itemPart = parts.map((el, i) => {
            return (
                <Row key={i} className="itemPart">            
                    <Col xs={{ size: '3', offset: '4' }}>
                        <Input index={i} key={i} type="text" readOnly name="part_name" value={el.name} />
                    </Col>
                    <Col>
                        <Input index={i} key={i} type="text" id="part_unit" name="part_unit" placeholder="Nhập số lượng" value={el.quantity} onChange={(e) => this.onChangePQty(e, i)} />
                    </Col>
                    {/* <Col>
                        <Input index={i} key={i} type="text" id="part_qty" name="part_qty" placeholder="Nhập đơn vị" value={el.unit} onChange={(e) => this.onChangePUnit(e, i)} />
                    </Col> */}
                </Row>
            );
        });
        return (
            <div className="MedicineForm">
                <Row>
                    <Col xs={1} className="left"></Col>
                    <Col xs={10} className="content">
                        <ModalConfirm
                            message={confirmMessage}
                            answer={answer}
                        ></ModalConfirm>
                        <ModalNoti message={this.state.notiMessage} done={this.doneAlert}></ModalNoti>
                        <h1 className="title-card-lg">
                            {id == 0 ? "Thêm mới thuốc" : "Chỉnh sửa thuốc"}
                        </h1>
                        <FormGroup name="form_medecine">
                            <Row>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            <Label>Tên thuốc</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="name"
                                                name="name"
                                                id="name"
                                                placeholder="Nhập thuốc"
                                                value={name}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            {" "}
                                            <Label>Nhà sản xuất</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="select"
                                                name="producer_id"
                                                id="producer_id"
                                                value={producer_id}
                                                onChange={this.onChange}
                                                required
                                            >
                                                <option>Chọn nhà sản xuất</option>
                                                {listP}
                                            </Input>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4" >
                                    <Row>
                                        <Col xs="4">
                                            Đơn vị thuốc
                                        </Col>
                                        <Col xs="8" className="warehouse_parts">
                                            <Input
                                                type="select"
                                                name="unitProduct"
                                                id="unitProduct"
                                                onChange={e => this.setState({ unitProduct: e.target.value})}
                                                value={unitProduct}>
                                                    <option>Chọn đơn vị</option>
                                                    {PRODUCT_UNIT.map(u => {
                                                        return  <option value={u.code}>{u.label}</option>
                                                    })}
                                            </Input>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">Đơn vị tính (liều  dùng)</Col>
                                        <Col xs="8">
                                            <Input
                                                type="select"
                                                name="unit"
                                                id="unit"
                                                onChange={(ev) => this._setValue(ev, 'unit')}
                                                value={unit.value}>
                                                    <option>Chọn đơn vị</option>
                                                    <option value={ATTR_UNIT.ML.code}>{ATTR_UNIT.ML.label}</option>
                                                    <option value={ATTR_UNIT.MG.code}>{ATTR_UNIT.MG.label}</option>
                                                    <option value={ATTR_UNIT.TABLET.code}>{ATTR_UNIT.TABLET.label}</option>
                                            </Input>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            {" "}
                                            <Label>Định lượng 1 đơn vị</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="strength"
                                                id="strength"
                                                onChange={(ev) => this._setValue(ev, 'strength')}
                                                value={strength.value}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            {" "}
                                            <Label>Liều dùng mặc định</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="default_quantity"
                                                id="default_quantity"
                                                onChange={(ev) => this._setValue(ev, 'default_quantity')}
                                                value={default_quantity.value}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            {" "}
                                            <Label>Liều lượng/cân nặng (đơn vị)/(kg)</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="max_dose_per_kg"
                                                id="max_dose_per_kg"
                                                onChange={(ev) => this._setValue(ev, 'max_dose_per_kg')}
                                                value={max_dose_per_kg.value}
                                            />
                                        </Col>
                                    </Row>
                                </Col>                               
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">
                                            {" "}
                                            <Label>Lần dùng trong ngày</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="default_daily_usage"
                                                id="default_daily_usage"
                                                onChange={(ev) => this._setValue(ev, 'default_daily_usage')}
                                                value={default_daily_usage.value}
                                            />
                                        </Col>
                                    </Row>
                                </Col> 
                                <Col xs="4">
                                    <Row>
                                        <Col xs="4">Số đợn vị/ 1 bao bì</Col>
                                        <Col xs="8">
                                            <Input
                                                name="package_size"
                                                id="package_size"
                                                onChange={(ev) => this._setValue(ev, 'package_size')}
                                                value={package_size.value}
                                            ></Input>
                                        </Col>
                                    </Row>
                                </Col>
          
                                {AuthService.isRole(ROLE.ADMIN.value) || AuthService.isRole(ROLE.INVENTORY.value) ?
                                
                                <Col xs="4">           
                                    <Row>
                                        <Col xs="4">
                                            Ghi chú
                                        </Col>
                                        <Col xs="8" className="warehouse_parts">
                                            <Input
                                                name="description"
                                                id="description"
                                                onChange={(ev) => this._setValue(ev, 'description')}
                                                value={description.value}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4">Giá nhập vào </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="origin_price"
                                                id="origin_price"
                                                onChange={this.onChange}
                                                value={origin_price}
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="4">
                                                {" "}
                                                <Label>Giá bán ra</Label>
                                        </Col>
                                        <Col xs="8">
                                            <Input
                                                type="text"
                                                name="price"
                                                id="price"
                                                onChange={this.onChange}
                                                value={price}
                                            ></Input>
                                        </Col>
                                    </Row>
                                </Col>
                                :
                                <Col xs="4" >
                                     <Row>
                                        <Col xs="4">
                                            Ghi chú
                                        </Col>
                                        <Col xs="8" className="warehouse_parts">
                                            <Input
                                                name="description"
                                                id="description"
                                                onChange={(ev) => this._setValue(ev, 'description')}
                                                value={description.value}
                                            />
                                        </Col>
                                    </Row>
                                </Col> }
                                <Col xs="8">
                                    <Row>
                                        <Col xs="2">
                                            Đường dùng thuốc
                                        </Col>
                                        <Col xs="10" className="warehouse_parts">
                                            <Input type="select" 
                                                name="route"
                                                id="route"
                                                value={route?route.value : ""}
                                                onChange={(ev) => this._setValue(ev, 'route')}
                                                >
                                                    <option>Chọn đường dùng</option>
                                                   {ROUTE.map(r => {
                                                       return <option value={r.value}>{r.name}</option>
                                                   })}
                                                </Input>
                                        </Col>
                                    </Row>
              
                                    <Row>
                                        <Col xs="2">
                                            Thành Phần Thuốc
                                        </Col>
                                        <Col xs="10" className="warehouse_parts">
                                            {" "}
                                            <Multiselect   
                                                options={listPart}
                                                selectedValues={arrSelected}
                                                value={listPart}
                                                displayValue="name"
                                                onSelect={(list, item) => this.onSelectPart(list, item)}
                                                onRemove={(list, item) => this.onRemovePart(list, item)}
                                                showCheckbox={true}
                                                name="part"
                                                id="part"
                                                placeholder="Chọn thành phần thuốc"
                                                closeIcon="close"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {parts.length > 0 ? (
                            <Row className="title-card">
                                <Col xs={{ size: '3', offset: '4'}}>Thành phần thuốc</Col>
                                <Col>Mô tả</Col>
                                {/* <Col>Đơn vị</Col> */}
                            </Row> ) : ''}
                            {itemPart}
                        </FormGroup>
                        <Row>
                            <Col xs={{ size: 6, offset: 6 }}>
                                <div className="btnControl">
                                    <Col>
                                        <Button className="controlRemove" onClick={this.onBack} >
                                            Hủy Bỏ
                                            </Button>
                                        <Button outline color="primary" onClick={this.onSubmit}>
                                            {id == 0 ? 'Thêm mới' : 'Cập nhật'}
                                        </Button>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={2} className="right"></Col>
                </Row>
            </div>
        );
    }
}
export default FormProduct;
