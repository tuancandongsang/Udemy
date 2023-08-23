import React from 'react';
import { FormGroup, Label, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import Asterisk from '../Asterisk'
import { numberWithCommas } from "../../../Shared/Util";
import ReceptionService from "../../../Shared/ReceptionService";
import { LOCATION_TYPE, ONE_DAY, POLICY_CODE, SERVICE_TYPE, STATUS } from "../../../../../Constances/const"
import ServiceService from "../../../../Service/Shared/ServiceService";
import PricePolicyService from "../../../../Service/Shared/PricePolicyService";
import { Util } from "../../../../../Helper/Util";
import Select from 'react-select';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';
import PrintServiceFrom from './PrintServiceFrom';
import SharedService from "../../../../../Shared/Services/SharedService"

export default class ServiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedService: null,
            selectedPolicy: null,
            services: [],
            serviceOther: [],
            serviceTest: [],
            serviceXray: [],
            serviceEnt: [],
            serviceUltrasound: [],
            serviceExam: [],
            serviceList: [],
            policyPriceList: [],
            locationList: [],
            clinic: [],
            showServiceTest: false,
            showServiceXRay: false,
            showServiceEnt: false,
            showServiceUltrasound: false,
            showTable: false,
            arrayServicePrint: [],
            titlePrint: "",
            titleExam: "PHIẾU YÊU CẦU XÉT NGHIỆM",
            titleEnt: "PHIẾU YÊU CẦU NỘI SOI",
            titleUltra: "PHIẾU YÊU CẦU SIÊU ÂM",
            titleXray: "PHIẾU YÊU CẦU XQUANG",
            titleOther: "PHIẾU YÊU CẦU Cấp Cứu",
            locationPrint: "",
            locExam: "PHÒNG XÉT NGHIỆM",
            locOther: "Phòng Cấp Cứu",
            locENT: "PHÒNG NỘI SOI",
            locUtral: "PHÒNG SIÊU ÂM",
            locXray: "PHÒNG XQUANG",

        };
    }
    setSelectedXRayService = (selectedXRayService) => {
        this.setState({ selectedXRayService })
    }
    setSelectedEntService = (selectedEntService) => {
        this.setState({ selectedEntService })
    }
    setSelectedOtherService = (selectedOtherService) => {
        this.setState({ selectedOtherService })
    }
    setSelectedUltrasoundService = (selectedUltrasoundService) => {
        this.setState({ selectedUltrasoundService })
    }
    setSelectedTestService = (selectedTestService) => {
        this.setState({ selectedTestService })
    }
    setShowServiceTest = (showServiceTest) => {
        this.setState({ showServiceTest })
    }
    setShowServiceTest = (showServiceOther) => {
        this.setState({ showServiceOther })
    }
    setShowServiceUltrasound = (showServiceUltrasound) => {
        this.setState({ showServiceUltrasound })
    }
    setShowServiceEnt = (showServiceEnt) => {
        this.setState({ showServiceEnt })
    }
    setServices = (services) => {
        this.setState({ services });
    };
    setServiceOther = (serviceOther) => {
        this.setState({ serviceOther });
    };
    setNotiMessage = (notiMessage) => {
        this.setState({ notiMessage });
    };
    setServiceTest = (serviceTest) => {
        this.setState({ serviceTest });
    };
    setServiceExam = (serviceExam) => {
        this.setState({ serviceExam });
    };
    getLocationByServiceId = (id) => {
        return ReceptionService.getLocationByService(id);
    };
    componentDidMount() {
        let { AllLocation } = this.props
        ReceptionService.getAllLocation().then((res) => {
            this.setState({
                TestLocation: res.data.filter((item) => item.type === LOCATION_TYPE.TESTING),
                XrayLocation: res.data.filter((item) => item.type === LOCATION_TYPE.XRAY),
                UltrasoundLocation: res.data.filter((item) => item.type === LOCATION_TYPE.ULTRASOUND),
                EntLocation: res.data.filter((item) => item.type === LOCATION_TYPE.ENT),
                OtherLocation: res.data.filter((item) => item.type === LOCATION_TYPE.EMERGENCY)
            })
        })
        document.getElementById('selectService').setAttribute("data-index", "10")
        ReceptionService.getServiceList()
            .then((res) => {
                this.setState({ serviceList: res.data });
                let serviceXray = this.state.serviceList.filter(e => e.type == "x-ray")
                this.setState({ serviceXray })
                let serviceEnt = this.state.serviceList.filter(e => e.type == "ent")
                this.setState({ serviceEnt })
                let serviceOther = this.state.serviceList.filter(e => e.type == 'other')
                this.setState({ serviceOther })
                let serviceUltrasound = this.state.serviceList.filter(e => e.type == "ultrasound")
                this.setState({ serviceUltrasound })
                let serviceTest = this.state.serviceList.filter(e => e.type == "test")
                this.setState({ serviceTest })
                let serviceExam = this.state.serviceList.filter(e => e.type == "exam")
                serviceExam.push({
                    code: "XNDV",
                    id: "XNDV",
                    name: "Dịch Vụ",
                    type: "exam",
                    price: 0,
                    value: serviceTest
                })
                // serviceExam.push({
                //     code: "CC",
                //     id: "CC",
                //     name: "Cấp cứu",
                //     type: "other",
                //     price: 0,
                //     value: serviceOther
                // })
                this.setState({ serviceExam })
                let services = serviceExam.concat(serviceTest).concat(serviceEnt).concat(serviceUltrasound)
                this.setState({ services })
            })
            .catch((err) => { });
        PricePolicyService.getPricePolicyList()
            .then((res) => {
                const policyP = res.data
                const policyPriceList = policyP.reverse();
                this.setState({ policyPriceList });
            })
            .catch((err) => { });
    }
    handleChangeSelectServiceTest = (event, selectedService) => {
        this.setState({ selectedService: event })
        if (selectedService) {
            if ({ selectedService: event }.selectedService.value === 'XNDV') {
                this.setState({ showServiceTest: true })
            }
        }
        let total = this.props.totalService;
        let serviceXray = this.state.serviceXray.find((item) => { return item.id == event.value })
        let serviceEnt = this.state.serviceEnt.find((item) => { return item.id == event.value })
        let serviceUltrasound = this.state.serviceUltrasound.find((item) => { return item.id == event.value })
        let service = this.state.serviceTest.find((item) => { return item.id == event.value })
        let serviceOther = this.state.serviceOther.find((item) => { return item.id == event.value })
        if (serviceXray && total.indexOf(serviceXray) < 0) {
            total.push(serviceXray)
        } else if (serviceEnt && total.indexOf(serviceEnt) < 0) {
            total.push(serviceEnt)
        } else if (service && total.indexOf(service) < 0) {
            total.push(service)
        } else if (serviceUltrasound && total.indexOf(serviceUltrasound) < 0) {
            total.push(serviceUltrasound)
        } else if (serviceOther && total.indexOf(serviceOther) < 0) {
            total.push(serviceOther)
        }
        let priceTotal = 0
        if (this.props.totalService) {
            this.props.totalService.map(e => {
                priceTotal += e.price
            })
            this.setState({ priceTotal: priceTotal })
        }
        this.props.setTotalService(total)
          if(this.props.items?.length>0){
            this.props.items[this.props.items?.length-1]?.steps[0].order.items.forEach(e=>{
                if(total[total.length-1].id===e.ref_id){
                 this.props.setNotiMessage(`Dịch vụ "${total[total.length-1].name}" vừa được order gần đây, Có muốn tiếp tục không?`)
                }
            })
          
        }
    }
    handleChangeSelectService = (event, selectedService) => {
        this.setState({ selectedService: event })
        if (selectedService) {
            if ({ selectedService: event }.selectedService.value === 'XNDV') {
                this.setState({ showServiceTest: true })
            } else if ({ selectedService: event }.selectedService.value === 'XRAY') {
                this.setState({ showServiceXRay: true })
            } else if ({ selectedService: event }.selectedService.value === 'CC') {
                this.setState({ showServiceOther: true })
            } else if ({ selectedService: event }.selectedService.value === 'NSDV') {
                this.setState({ showServiceEnt: true })
            } else if ({ selectedService: event }.selectedService.value === 'SADV') {
                this.setState({ showServiceUltrasound: true })
            }
        }
        //CC
        let serviceOther = this.state.serviceOther.find((item) => { return item.id == event.value })
        let e = this.props.selectedOtherService;
        if (serviceOther && e.indexOf(serviceOther) < 0) {
            e.push(serviceOther)
        }
        let priceOther = 0;
        if (this.props.selectedOtherService) {
            this.props.selectedOtherService.map(e => {
                priceOther += e.price
            })
            this.setState({ priceOther: priceOther })
        }
        this.setSelectedOtherService(e)

        this.setState({ showTable: true })
        this.onServiceChange(event)
    }
    getListCustomerByLocationId = (location_id, status, type) => {
        return ReceptionService.getJobStepList(location_id, status, type)
    }
    getServicePrice = () => {
        let policy = this.state.policyPriceList.find(
            (item) => item.id === this.props.form.policy_id.value
        );
        let service = this.state.serviceExam.find(
            (item) => item.id === this.props.form.service_id.value
        );
        // if (policy && policy.code === 'KDV') {
        //     return ({
        //         discountPrice: service ? service.price : 0,
        //         basicPrice: service ? service.origin_price : 0,
        //         PriceUpdate: service ? service.price : 0
        //     })
        // } 
        if (policy) {
            return ({
                discountPrice: Math.round((service ? service.origin_price : 0) * (1 - policy.discount.exam)),
                basicPrice: service ? service.origin_price : 0,
                PriceUpdate: service ? service.price : 0
            })
        }
    }
    //service thay đổi sẽ phải lấy về location tương ứng với service mới
    //nếu chỉ có 1 location thì tự động chọn location đó
    onServiceChangeTest = async (ev) => {
        if (!ev) {
            this.setNotiMessage("Có lỗi! Xin vui lòng chọn dịch vụ ")
        } else {
            let serviceId = ev.value
            this.props.setValueForm(ev)
            this.props.setPolicyId(this.state.policyPriceList.find((item) => item.code === POLICY_CODE.KDV)?.id)
            this.getLocationByServiceId(serviceId)
                .then((res) => {
                    let form = this.props.form;
                    let locationList = res.data;
                    this.setState({ locationList });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    onServiceChange = async (ev) => {
        if (!ev) {
            this.setNotiMessage("Có lỗi! Xin vui lòng chọn dịch vụ ")
        } else {
            let serviceId = ev.value
            this.props.setValueForm(ev)
            if (await this.props.isExamWithin3D(this.props.medicalHistory, serviceId)) {
                this.props.setPolicyId(this.state.policyPriceList.find((item) => item.code === POLICY_CODE.KL3D)?.id)
            } else if (await this.props.officialsExam) {
                this.props.setPolicyId(this.state.policyPriceList.find((item) => item.code === POLICY_CODE.CBNV)?.id)
            }
            else {
                this.props.setPolicyId(this.state.policyPriceList.find((item) => item.code === POLICY_CODE.KDV)?.id)
            }
            this.getLocationByServiceId(serviceId)
                .then((res) => {
                    let form = this.props.form;
                    let locationList = res.data;
                    this.setState({ locationList });
                    if (locationList.length === 1) {
                        this.props.setLocationId(this.state.locationList[0].id)
                    } else {
                        this.setState({
                            form: { ...form, location_id: { value: "", err: "*" } },
                        });
                    }
                    //sau khi có location_id thì hiện ra danh sách bệnh nhân của từng phòng qua location_id
                    let clinic = []
                    let today = new Date();
                    let ctoday = today.getTime()
                    locationList.forEach(async location => {
                        if (location.type == LOCATION_TYPE.EXAMINATION) {
                            let status = `${STATUS.NEW},${STATUS.RUNNING},${STATUS.READY}`
                            let type = SERVICE_TYPE.EXAM
                            this.getListCustomerByLocationId(location.id, status, type).then((res) => {
                                const todayCustomer = res.data.filter(ct => {
                                    return ctoday - ct.ctime < ONE_DAY
                                })
                                let customerWait = todayCustomer.length
                                clinic.push({ name: location.name, customerWait: customerWait, id: location.id })
                                clinic.sort((a, b) => {
                                    return a.customerWait - b.customerWait
                                })
                                this.setState({ clinic: clinic })
                            })
                        } else if (location.type == LOCATION_TYPE.TESTING) {
                            let status = STATUS.READY
                            let type = SERVICE_TYPE.TEST
                            this.getListCustomerByLocationId(location.id, status, type).then((res) => {
                                let customerWait = res.data.length
                                clinic.push({ name: location.name, customerWait: customerWait, id: location.id })
                                this.setState({ clinic: clinic })
                            })
                        } else if (location.type == LOCATION_TYPE.EMERGENCY) {
                            let status = ''
                            if (status != STATUS.DONE && status != STATUS.PAID) {
                                let type = SERVICE_TYPE.OTHER
                                this.getListCustomerByLocationId(location.id, type).then((res) => {
                                    let customerWait = res.data.length
                                    clinic.push({ name: location.name, customerWait: customerWait, id: location.id })
                                    this.setState({ clinic: clinic })
                                })
                            }
                        } else if (location.type == LOCATION_TYPE.ENT) {
                            let status = ''
                            if (status != STATUS.DONE && status != STATUS.PAID) {
                                let type = SERVICE_TYPE.ENT
                                this.getListCustomerByLocationId(location.id, type).then((res) => {
                                    let customerWait = res.data.length
                                    clinic.push({ name: location.name, customerWait: customerWait, id: location.id })
                                    this.setState({ clinic: clinic })
                                })
                            }
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    };
    onClearForm = () => {
        let totalService = this.props.totalService;
        let priceTotal = this.state.priceTotal;
        totalService.splice(0, totalService.length);
        this.setState({ totalService: totalService });
        this.setState({ priceTotal: 0 });
    }

    onClearFormOther = () => {
        let selectedOtherService = this.state.selectedOtherService;
        selectedOtherService.splice(0, selectedOtherService.length);
        this.setState({ selectedOtherService: selectedOtherService });
        this.setState({ showServiceOther: false })
    }
    onCloseForm = () => {
        let serviceExam = this.state.serviceExam
        let form = this.props.form
        this.setState({ showServiceTest: false })

    }
    offForm = () => {
        this.setState({ showServiceTest: false })
    }
    onCloseFormXray = () => {
        this.setState({ showServiceXRay: false })
    }
    onCloseFormOther = () => {
        this.setState({ showServiceOther: false })
    }
    onCloseFormUltrasound = () => {
        this.setState({ showServiceUltrasound: false })
    }
    onCloseFormEnt = () => {
        this.setState({ showServiceEnt: false })
    }
    onCloseFormXray = () => {
        this.setState({ showServiceXRay: false })
    }

    onCloseFormEnt = () => {
        this.setState({ showServiceEnt: false })
    }
    updatePrice = (service) => {
        let price = 0;
        for (let el of service) {
            try {
                price += el.price;
            } catch (error) {
                console.log('updatePrice', error)
            }
        }
        return price;
    }
    deleteRow = (index, type) => {
        switch (type) {
            case "allTestService":
                let totalService = this.props.totalService;
                totalService.splice(index, 1);
                this.props.setTotalService(totalService)
                this.setState({
                    priceTotal: this.updatePrice(totalService)
                });
                break;
        }
    }
    printService = async (ev, title, loc) => {
        await this.setState({
            titlePrint: title,
            arrayServicePrint: ev,
            locationPrint: loc
        })

        await SharedService.print("servicePrint");
    }
    render() {
        let { policyPriceList, selectedService, clinic, serviceExam, serviceTest, serviceXray, serviceUltrasound, serviceEnt, serviceOther,
            TestLocation, EntLocation, XrayLocation, UltrasoundLocation, OtherLocation, showTable, showServiceTest } = this.state
        let { service_id, location_id, policy_id, dirty } = this.props.form;
        let { _setValue, AllLocation } = this.props
        let serviceOptions = serviceExam.map((item) => ({
            value: item.id,
            label: item.name
        })) || []
        let serviceTestOptions = serviceTest.map((item) => ({
            value: item.id,
            label: item.name
        })) || []
        let serviceXRayOptions = serviceXray.map((item) => ({
            value: item.id,
            label: item.name
        })) || []
        let serviceOtherOptions = serviceOther.map((item) => ({
            value: item.id,
            label: item.name
        })) || []
        let serviceUltrasoundOptions = serviceUltrasound.map((item) => ({
            value: item.id,
            label: item.name
        })) || []
        let serviceEntOptions = serviceEnt.map((item) => ({
            value: item.id,
            label: item.name
        })) || []



        return (
            <div className="serviceForm-container">
                <h5 className="title-card title-service"><span className="material-icons">local_hospital</span> Chọn dịch vụ</h5>
                <Row className="mb-0 services-form">
                    <Col sm={4}>
                        <FormGroup>
                            <Label for="service_id" className="title-selectService">
                                Chọn dịch vụ <Asterisk />
                            </Label>
                            <Select
                                className="selectService"
                                onKeyDown={(e) => Util.onKeyDown(e)}
                                inputId="selectService"
                                type="select"
                                id="service_id"
                                onChange={(ev) => this.handleChangeSelectService(ev, "service_id")}
                                required
                                placeholder="Chọn dịch vụ"
                                options={serviceOptions}
                            />
                            {dirty && (
                                <span className="text-danger">{service_id.err}</span>
                            )}
                            <Modal isOpen={showServiceTest} >
                                <ModalHeader style={{ display: 'flex' }}>
                                    <h3 > Chọn  dịch vụ
                                        <Button style={{ position: 'relative', left: '1250px', backgroundColor: '#b55e5e' }}
                                            onClick={() => this.offForm()} >X</Button>
                                    </h3>
                                </ModalHeader>
                                <ModalBody>
                                    <div style={{ display: 'flex' }}>
                                        <Col sm={5}>
                                            <Select
                                                inputId="selectService"
                                                type="select"
                                                id="service_id"
                                                onChange={(ev) => this.handleChangeSelectServiceTest(ev, "service_id")}
                                                required
                                                placeholder="Chọn dịch vụ xét nghiệm"
                                                options={serviceTestOptions}
                                            />
                                        </Col>
                                        <Col sm={2}></Col>
                                        <Col sm={5}>
                                            <Input
                                                className="input-serivce"
                                                type="select"
                                                id="location_id"
                                                value={location_id.value}
                                                required
                                            >

                                                <option value={TestLocation && TestLocation[0].name}>
                                                    {TestLocation && TestLocation[0].name}
                                                </option>
                                            </Input>
                                        </Col>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Col sm={5}>
                                            <Select
                                                inputId="selectService"
                                                type="select"
                                                id="service_id"
                                                onChange={(ev) => this.handleChangeSelectServiceTest(ev, "service_id")}
                                                required
                                                placeholder="Chọn dịch vụ XQuang"
                                                options={serviceXRayOptions}
                                            />
                                        </Col>
                                        <Col sm={2}></Col>
                                        <Col sm={5}>
                                            <Input
                                                className="input-serivce"
                                                type="select"
                                                id="location_id"
                                                value={location_id.value}
                                                required
                                            >

                                                <option value={XrayLocation && XrayLocation[0].name}>
                                                    {XrayLocation && XrayLocation[0].name}
                                                </option>

                                            </Input>
                                        </Col>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Col sm={5}>
                                            <Select
                                                inputId="selectService"
                                                type="select"
                                                id="service_id"
                                                onChange={(ev) => this.handleChangeSelectServiceTest(ev, "service_id")}
                                                required
                                                placeholder="Chọn dịch vụ siêu âm"
                                                options={serviceUltrasoundOptions}
                                            />
                                        </Col>
                                        <Col sm={2}></Col>
                                        <Col sm={5}>
                                            <Input
                                                className="input-serivce"
                                                type="select"
                                                id="location_id"
                                                value={location_id.value}
                                                required
                                            >

                                                <option value={UltrasoundLocation && UltrasoundLocation[0].name}>
                                                    {UltrasoundLocation && UltrasoundLocation[0].name}
                                                </option>

                                            </Input>
                                        </Col>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Col sm={5}>
                                            <Select
                                                inputId="selectService"
                                                type="select"
                                                id="service_id"
                                                onChange={(ev) => this.handleChangeSelectServiceTest(ev, "service_id")}
                                                required
                                                placeholder="Chọn dịch vụ nội soi"
                                                options={serviceEntOptions}
                                            />
                                        </Col>
                                        <Col sm={2}></Col>
                                        <Col sm={5}>
                                            <Input
                                                className="input-serivce"

                                                type="select"
                                                id="location_id"
                                                value={location_id.value}
                                                required
                                            >

                                                <option value={EntLocation && EntLocation[0].name}>
                                                    {EntLocation && EntLocation[0].name}
                                                </option>

                                            </Input>
                                        </Col>

                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Col sm={5}>
                                            <Select
                                                inputId="selectService"
                                                type="select"
                                                id="service_id"
                                                onChange={(ev) => this.handleChangeSelectServiceTest(ev, "service_id")}
                                                required
                                                placeholder="Chọn dịch vụ cấp cứu"
                                                options={serviceOtherOptions}
                                            />
                                        </Col>
                                        <Col sm={2}></Col>
                                        <Col sm={5}>
                                            <Input
                                                className="input-serivce"
                                                type="select"
                                                id="location_id"
                                                value={location_id.value}
                                                required
                                            >
                                                <option value={OtherLocation && OtherLocation[0].name}>
                                                    {OtherLocation && OtherLocation[0].name}
                                                </option>

                                            </Input>
                                        </Col>

                                    </div>
                                    {/* table neu show-table = true => hien thi  */}
                                    {selectedService && <Table isOpen={showTable}>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên dịch vụ</th>
                                                <th>Giá dịch vụ</th>
                                                <th>Xóa dịch vụ</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bodyTable">
                                            {
                                                this.props.totalService && this.props.totalService.map((item, index) => {
                                                    return <tr key={item.id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <NumberFormat thousandSeparator={true} readOnly suffix={' VND'} value={item.price} />
                                                        </td>
                                                        <td>
                                                            <Button className="btn-del" onClick={() => this.deleteRow(index, "allTestService")}>X</Button>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>
                                    </Table>}
                                </ModalBody>
                                <ModalFooter>
                                    <p className="totalAll">Tổng số tiền: <NumberFormat thousandSeparator={true} readOnly suffix={' VND'} value={this.state.priceTotal} /></p>
                                    <Button onClick={() => this.onCloseForm()}>Hoàn thành</Button>
                                    <Button
                                        className="btn-del"
                                        onClick={() => {
                                            this.onClearForm()
                                        }}
                                    >Xóa</Button>
                                    {/* <Button onClick={() => this.printService(this.state.totalService, this.state.titleExam, this.state.locExam)}>In phiếu</Button> */}
                                </ModalFooter>
                            </Modal>
                            <PrintServiceFrom assignedServices={this.state.arrayServicePrint}
                                titleService={this.state.titlePrint} locPrint={this.state.locationPrint}></PrintServiceFrom>
                        </FormGroup>
                    </Col>
                    <Col sm={4}>
                        <FormGroup>
                            <Label for="policy_id" className="title-selectService">
                                Đối tượng dịch vụ <Asterisk />
                            </Label>
                            <Input
                                className="input-serivce"
                                onKeyDown={(e) => Util.onKeyDown(e)}
                                data-index="11"
                                type="select"
                                id="policy_id"
                                value={policy_id.value}
                                onChange={(ev) => _setValue(ev, "policy_id")}
                                required
                            >
                                {policyPriceList.map((item) => (
                                    <option key={item.id} value={item.id} hidden={item.code == POLICY_CODE.KL3D}>
                                        {item.name}
                                    </option>
                                ))}
                            </Input>

                            {dirty && (
                                <span className="text-danger">{policy_id.err}</span>
                            )}
                        </FormGroup>
                    </Col>

                    <Col sm={4}>
                        <FormGroup>
                            <Label for="location_id" className="title-selectService">
                                Phòng khám <Asterisk />
                            </Label>
                            <Input
                                className="input-serivce"
                                onKeyDown={(e) => Util.onKeyDown(e)}
                                data-index="12"
                                type="select"
                                id="location_id"
                                value={location_id.value}
                                onChange={(ev) => _setValue(ev, "location_id")}
                                required
                            >
                                <option value="">
                                    Chọn phòng khám
                                </option>
                                {clinic.map((item) => {
                                    return <option key={item.id} value={item.id}>
                                        {`${item.name} - Số người đang chờ: ${item.customerWait}`}
                                    </option>
                                })}
                            </Input>
                            {dirty && (
                                <span className="text-danger">{location_id.err}</span>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
                <div style={{ paddingLeft: '15px', position: 'relative', bottom: '1em' }}>
                    <Col sm={6}>
                        <Asterisk />
                        <Input
                            type='text'
                            placeholder='nhập lý do '
                            onChange={this.props.handleChangeReason}
                        />
                    </Col>
                </div>
                {service_id.value && service_id.value != 'XNDV' && policy_id.value ? (
                    <div>
                        <span className="mr-3">Giá gốc: {numberWithCommas(this.getServicePrice().basicPrice)}  VNĐ</span><br></br>
                        <span className="mr-3">Giá khuyến mãi phòng khám: {numberWithCommas(this.getServicePrice().PriceUpdate)} VNĐ { }
                            (<b>{((numberWithCommas(this.getServicePrice().basicPrice) - numberWithCommas(this.getServicePrice().PriceUpdate)) / numberWithCommas(this.getServicePrice().basicPrice)) * 100}{`% giảm giá`}</b>)
                            <br></br></span>
                        <span className="mr-3">Giá khuyến mãi đối tượng dịch vụ: {numberWithCommas(this.getServicePrice().discountPrice)} VNĐ { }
                            (<b>{((numberWithCommas(this.getServicePrice().basicPrice) - numberWithCommas(this.getServicePrice().discountPrice)) / numberWithCommas(this.getServicePrice().basicPrice)) * 100}{`% giảm giá`}</b>)
                        </span>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        )
    }
}

