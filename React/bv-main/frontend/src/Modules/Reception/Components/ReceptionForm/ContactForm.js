import React from 'react';
import { FormGroup, Label, Input, Col, Row } from 'reactstrap';
import Asterisk from './Asterisk'
import { REGEX_TEL } from '../../Shared/index';
import ReceptionService from "../../Shared/ReceptionService";
import Select, { createFilter } from 'react-select';
import { Util } from '../../../../Helper/Util';
import {
    stringToSlug
} from "../../Shared/Util";

export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cityList: [],
            wardList: [],
            districtList: [],
            currentCity: '',
            currentDistrict: '',
            currentWard: '',
        }
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeDistrict = this.handleChangeDistrict.bind(this)
        this.handleChangeWard = this.handleChangeWard.bind(this)
    }
    getCityList = () => {
        const type = "province";
        const parent_id = "VN";
        let cityList = ReceptionService.getLocationAllCity(type, parent_id)
        cityList.then(res => {
            this.setCityList(res.data)
        })
        return cityList
    }

    getDistricts = async (type, parent_id) => {
        let districtList = ReceptionService.getLocationAllDistrict(type, parent_id)
        await districtList.then(res => {
            this.setDistrictList(res.data)
        })
        return districtList
    }
    getWards = async (type, parent_id) => {
        let wardList = ReceptionService.getLocationAllWard(type, parent_id)
        await wardList.then(res => {
            this.setWardList(res.data)
        })
        return wardList
    }

    setWardList = (wardList) => {
        this.setState({ wardList: wardList })
        this.setState({ parent_id: wardList[0].id })
    }
    setCityList = (cityList) => {
        this.setState({ cityList: cityList })
        this.setState({ parent_id: cityList[0].id })
    }
    setDistrictList = (districtList) => {
        this.setState({ districtList: districtList })
        this.setState({ parent_id: districtList[0].id })
    }

    handleChangeCity(value) {
        const cities = this.state.cityList.filter((item) => {
            return item.name == value
        })
        if (cities.length == 0) return
        this.setState({ currentCity: cities[0] })
        this.getDistricts('district', cities[0].id)
    }
    handleChangeDistrict(value) {
        const districts = this.state.districtList.filter((item) => {
            return item.name == value
        })
        if (districts.length == 0) return
        this.setState({ currentDistrict: districts[0] })
        this.getWards('ward', districts[0].id)
    }
    handleChangeWard(value) {
        const wards = this.state.wardList.filter((item) => {
            return item.name == value
        })
        if (wards.length == 0) return
        this.setState({ currentWard: wards[0] })
    }

    componentDidMount() {
        document.getElementById('province').setAttribute("data-index", "7")
        document.getElementById('district').setAttribute("data-index", "8")
        document.getElementById('ward').setAttribute("data-index", "9")
        this.getCityList();
    }
    componentDidUpdate(prevProps) {
        if (this.props.fillAddress !== prevProps.fillAddress) {
            const cities = this.state.cityList.filter((item) => {
                return item.name == this.props.form.contact_city.value
            })
            if (cities.length == 0) return
            this.setState({ currentCity: cities[0] })
            ReceptionService.getLocationAllDistrict('district', cities[0].id)
                .then(res => {
                    this.setDistrictList(res.data);
                    const districts = this.state.districtList.filter((item) => {
                        return item.name == this.props.form.contact_district.value;
                    })
                    if (districts.length == 0) return
                    this.setState({ currentDistrict: districts[0] })
                    ReceptionService.getLocationAllWard('ward', districts[0].id)
                        .then(response => {
                            this.setWardList(response.data);
                        })
                })
        }
    }

    render() {
        let { contact_full_name, health_insuranced, health_insurance, contact_address, dirty, contact_email, contact_city, contact_district, contact_ward , contact_cccd } = this.props.form;
        let { _setValue, officialsExam } = this.props
        let { cityList, districtList, wardList } = this.state
        // console.log(contact_full_name, health_insurance, contact_address, dirty, contact_email, contact_city, contact_district, contact_ward)
        // console.log(cityList.filter(item => item.name === contact_city.value)[0]);
        let cityOptions = cityList.map((item) => ({
            value: item.name,
            label: item.name
        })) || []
        let districtOptions = districtList.map((item) => ({
            value: item.name,
            label: item.name
        })) || []
        let wardOptions = wardList.map((item) => ({
            value: item.name,
            label: item.name
        })) || []
        const filterConfig = {
            ignoreCase: true,
            ignoreAccents: true,
            trim: true,
            matchFrom: 'any',
            stringify: option => `${option.label} ${stringToSlug(option.label).match(/\b\w/g).join('')}`,
        };
        return (
            <>
                <p className="title-card"><span className="material-icons">assignment</span> Thông tin liên lạc</p>
                <FormGroup row className="address-form">
                    <Label for="contact_address" sm={4} >Địa chỉ <Asterisk /></Label>
                    <Col sm={8}>
                        <Input
                            onKeyDown={(e) => Util.onKeyDown(e)}
                            data-index="6"
                            type="text"
                            name="contact_address"
                            id="contact_address"
                            value={contact_address.value}
                            onChange={(ev) => _setValue(ev, 'contact_address')}
                            required
                        />
                    </Col>
                    <Row className="mb-0" >
                        <Col className="cities">
                            <Select
                                inputId="province"
                                onKeyDown={(e) => Util.onKeyDown(e)}
                                value={cityOptions.find(item => item.value === contact_city.value) || null}
                                onChange={ev => {
                                    this.handleChangeCity(ev.value); _setValue({
                                        persist: () => null,
                                        target: { value: ev.value, validity: { valid: !!ev.value } }
                                    }, "contact_city")
                                }}
                                options={cityOptions}
                                placeholder=" Tỉnh"
                                menuPlacement="top"
                                openMenuOnFocus
                                filterOption={createFilter(filterConfig)}
                                required

                            />
                        </Col>
                        <Col className="districts">
                            <Select
                                inputId="district" onKeyDown={(e) => Util.onKeyDown(e)}
                                value={districtOptions.find(item => item.value === contact_district.value) || null}
                                onChange={ev => {
                                    this.handleChangeDistrict(ev.value); _setValue({
                                        persist: () => null,
                                        target: { value: ev.value, validity: { valid: !!ev.value } }
                                    }, "contact_district")
                                }}
                                options={districtOptions}
                                placeholder=" Huyện"
                                menuPlacement="top"
                                openMenuOnFocus
                                filterOption={createFilter(filterConfig)}
                            />
                        </Col>
                        <Col className="wards">
                            <Select
                                inputId="ward" onKeyDown={(e) => Util.onKeyDown(e)}
                                value={wardOptions.find(item => item.value === contact_ward.value) || null}
                                onChange={ev => {
                                    this.handleChangeWard(ev.value); _setValue({
                                        persist: () => null,
                                        target: { value: ev.value, validity: { valid: !!ev.value } }
                                    }, "contact_ward")
                                }}
                                options={wardOptions}
                                placeholder="Phường/xã"
                                menuPlacement="top"
                                openMenuOnFocus
                                filterOption={createFilter(filterConfig)}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup row>
                    <Label for="dealth_insurance" sm={4}>CMT/CCCD</Label>
                    <Col sm={8}>
                        <Input

                            onKeyDown={(e) => Util.onKeyDown(e)}
                            type="text"
                            name="contact_cccd"
                            id="contact_cccd"
                            value={contact_cccd.value}
                            onChange={(ev) => _setValue(ev, 'contact_cccd')}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="dealth_insurance" sm={4}>Nơi đăng kí</Label>
                    <Col sm={8}>
                        <Input
                            onKeyDown={(e) => Util.onKeyDown(e)}
                            name="health_insurance"
                            disabled={officialsExam}
                        // value={health_insuranced ? health_insuranced.value : ''}
                        // onChange={(ev) => _setValue(ev, 'health_insuranced')}
                        />

                    </Col>
                </FormGroup>
                {/* <FormGroup row>
                    <Label for="contact_email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input
                            type="email"
                            name="contact_email"
                            id="contact_email"
                            value={contact_email.value}
                            onChange={(ev) => _setValue(ev, 'contact_email')}
                        />
                        {dirty && <span className="text-danger">{contact_email.err}</span>}
                    </Col>
                </FormGroup> */}

                <FormGroup row>
                    <Label for="contact_full_name" sm={4}>Tên người liên hệ</Label>
                    <Col sm={8}>
                        <Input
                            onKeyDown={(e) => Util.onKeyDown(e)}
                            disabled={officialsExam}
                            type="text"
                            name="contact_full_name"
                            value={contact_full_name.value}
                            id="contact_full_name"
                            onChange={(ev) => _setValue(ev, 'contact_full_name')}
                            className="text-uppercase"
                        />
                        {dirty && <span className="text-danger">{contact_full_name.err}</span>}
                    </Col>
                </FormGroup>
            </>
        )
    }
}