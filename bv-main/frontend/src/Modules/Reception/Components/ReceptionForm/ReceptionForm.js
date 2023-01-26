import React from "react";
import { FormParent, ModalNoti } from "../../Shared";
import { ONE_DAY, SERVICE_TYPE } from "../../../../Constances/const"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Col, Row } from "reactstrap";
import AccountingForm from '../Accounting/AccountingForm/AccountingForm'
import PricePolicyService from "../../../Service/Shared/PricePolicyService";
import ReceptionService from "../../Shared/ReceptionService";
import CustomerService from "../../../Customer/Shared/CustomerService";
import ServiceService from "../../../Service/Shared/ServiceService"
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import ContactForm from "./ContactForm";
import { withRouter } from "react-router";
import SearchForm from "./SearchForm";
import { convertToNormDate, convertToStrDate } from "../../Shared/Util";
import ModalFilterCmCode from './ModalFilter/ModalFilterCmCode'
import ModalFilter from './ModalFilter/ModalFilter'
import ServiceForm from './ServiceForm/ServiceForm'
import MedicalHistoryTable from "../MedicalHistory/MedicalHistoryTable";
import Clock from "../../../../Shared/Components/DigitalClock/DigitalClock";

import { DATE } from "../../../../Constances/const"
class ReceptionForm extends FormParent {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      selectedTestService: [],
      selectedOtherService: [],
      selectedXRayService: [],
      totalService: [],
      selectedUltrasoundService: [],
      selectedEntService: [],
      policy: {},
      AllLocation: [],
      billID: '',
      jobId: '',
      policyPriceList: [],
      serviceList: [],
      notiMessage: "",
      form: this._getInitFormData({
        location_id: '',
        service_id: '',
        policy_id: "",
        cm_full_name: "",
        cm_gender: "male",
        cm_birthday: "",
        cm_code: DATE("now"),
        contact_full_name: "",
        contact_phone_number: "",
        contact_address: "",
        contact_cccd: "",
        contact_email: "",
        contact_city: "",
        contact_district: "",
        contact_ward: "",
        orderStatus: '',
      }),
      customerCode: "",
      customerId: "",
      contactId: "",
      jobHistory: [],
      medicalHistory: [],
      reExamination: false,
      officialsExam: false,
      submitLoading: false,
      findLoading: false,
      show: false,
      showTest: false,
      showHistory: false,
      fillAddress: false,
      onPrintShortKey: false,
    };
  }
  setTotalService = (totalService) => {
    this.setState({ totalService })
  }
  setShowHistory = (showHistory) => {
    this.setState({ showHistory })
  }

  setShow = (show) => {
    this.setState({ show });
  }
  setShowTest = (showTest) => {
    this.setState({ showTest })
  }
  setValueForm = (ev) => {
    const form = this.state.form
    let setForm = form;
    setForm.service_id.value = ev.value
    setForm.service_id.err = ''
    this.setState(setForm);
  }
  setLocationId = (location_id) => {
    let form = this.state.form
    form.location_id.value = location_id
    form.location_id.err = ''
    this.setState({ form: form })
  }
  setPolicyId = (policyId) => {
    let form = this.state.form
    form.policy_id.value = policyId
    form.policy_id.err = ''
    this.setState({ form: form });
  }
  setCustomerCode = (customerCode) => {
    let form = this.state.form
    form.cm_code.value = customerCode
    form.cm_code.err = ''
    this.setState({ form: form })
  }

  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage });
  };

  setFindLoading = (findLoading) => {
    this.setState({ findLoading });
  };

  setSubmitLoading = (submitLoading) => {
    this.setState({ submitLoading });
  };
  setOfficialsExam = (officialsExam) => {
    this.setState({ officialsExam })
  }
  setReExamination(reExamination) {
    this.setState({ reExamination });
  }

  setCustomerId = (customerId) => {
    this.setState({ customerId });
  };


  setContactId = (contactId) => {
    this.setState({ contactId });
  };

  setMedicalHistory = (medicalHistory) => {
    this.setState({ medicalHistory })
  }
  setJobHistory = (jobHistory) => {
    this.setState({ jobHistory })
  }
  // lấy list giá, dịch vụ, chế độ
  componentDidMount() {
    ReceptionService.getAllLocation().then((res) => {
      this.setState({ AllLocation: res.data })
    })
    // PricePolicyService.getPricePolicyList().then((res) => {
    //   this.setState({ policyPriceList: res.data });
    // })
    // .catch((err) => { });
    // ReceptionService.getServiceList().then((res) => {
    //   this.setState({ serviceList: res.data })
    // })
  }
  handleChangeReason = (e) => {
    this.setState({ reason: e.target.value });
  }

  handleResetForm = () => {
    this._fillForm({
      reason: '',
      location_id: "",
      service_id: "",
      policy_id: "",
      cm_full_name: "",
      cm_gender: "male",
      cm_birthday: "",
      cm_code: DATE("now"),
      contact_cccd: "",
      contact_full_name: "",
      contact_phone_number: "",
      contact_address: "",
      contact_email: "",
      contact_city: "",
      contact_district: "",
      contact_ward: "",
      orderStatus: "",
    });
    this.setTotalService([])
    this.setCustomerId("");
    this.setContactId("");
    this.setReExamination(false);
    this.setOfficialsExam(false)
    this.setSubmitLoading(false)
  };

  submitContact = (customer_id) => {
    const {
      contact_full_name,
      contact_phone_number,
      contact_address,
      contact_email,
      contact_city,
      contact_district,
      contact_ward,
      contact_cccd
    } = this.state.form;
    let cmContact = {
      full_name: contact_full_name.value.toUpperCase(),
      phone: contact_phone_number.value,
      address:
      {
        province: contact_city.value,
        district: contact_district.value,
        ward: contact_ward.value,
        street: contact_address.value
      },
      email: contact_email.value,
      idnum: contact_cccd.value,
      idtype: 'cccd',
      customer_id: customer_id,
    };
    if (this.state.reExamination && this.state.contactId) {
      cmContact.id = this.state.contactId;
      cmContact.customer_id = this.state.customerId;
      return CustomerService.modifyCmContact(cmContact);
    } else {
      return CustomerService.addCmContact(cmContact);
    }
  };
  goTo(url = '') {
    url = window.location.origin + '/' + url
    window.location.replace(url)
  }
  submitCustomer = () => {
    const { cm_code, cm_full_name, cm_gender, cm_birthday } = this.state.form;
    let customer = {
      full_name: cm_full_name.value.toUpperCase(),
      code: cm_code.value,
      gender: cm_gender.value,
      birthday: convertToNormDate(cm_birthday.value),
    };
    if (this.state.reExamination) {
      customer.id = this.state.customerId;
      return CustomerService.modifyCm(customer);
    } else {
      return CustomerService.addCm(customer);
    }
  };

  updateInforCus = () => {
    this._validateForm();
    if (this._isFormValid()) {
      this.submitCustomer()
      this.submitContact()
      this.setNotiMessage("Cập nhập thông tin bệnh nhân thành công")
    } else {
      this.setNotiMessage("Vui lòng nhập đầy đủ thông tin, để cập nhập!")
    }
  }

  onShowHistory = () => {
    let { customerId } = this.state;
    if (customerId) {
      this.handleShowHistory();
    } else {
      this.setNotiMessage("Bệnh nhân không có lịch sử để hiển thị!")
    }
  }
  onPrintShortKeyCode = () => {
    this.setState({ onPrintShortKey: true })
  }
  findOrderByCode = (code) => {
    return ReceptionService.getOrder(code)
  }
  printJob = () => {
    this.props.history.push(`/app/reception/print/${this.state.jobId}`)
  }
  submitJobTest = (customer_id) => {
    const { location_id, policy_id } = this.state.form;
    const { totalService } = this.state
    let servicesTest = totalService.filter(x => {
      return x.type === SERVICE_TYPE.TEST
    }).map(y => {
      return { id: y.id }
    })
    let job = {
      location_id: '0LRFF29AHW',
      services: servicesTest,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJobTest(job);
  }
  submitJobXray = (customer_id) => {
    const { location_id, policy_id } = this.state.form;
    const { totalService } = this.state
    let servicesXray = totalService.filter(x => {
      return x.type === SERVICE_TYPE.XRAY
    }).map(y => {
      return { id: y.id }
    })
    let job = {
      location_id: '06BX9ZL5WD',
      services: servicesXray,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJobTest(job);
  }
  submitJobUltrasound = (customer_id) => {
    const { location_id, policy_id } = this.state.form;
    const { totalService } = this.state
    let servicesUltrasound = totalService.filter(x => {
      return x.type === SERVICE_TYPE.ULTRASOUND
    }).map(y => {
      return { id: y.id }
    })
    let job = {
      location_id: 'FHBM20MGTH',
      services: servicesUltrasound,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJobTest(job);
  }
  submitJobEnt = (customer_id) => {
    const { location_id, policy_id } = this.state.form;
    const { totalService } = this.state
    let servicesEnt = totalService.filter(x => {
      return x.type === SERVICE_TYPE.ENT
    }).map(y => {
      return { id: y.id }
    })
    let job = {
      location_id: '83JWDQNB5J',
      services: servicesEnt,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJobTest(job);
  }
  submitJobOther = (customer_id) => {
    const { location_id, policy_id } = this.state.form;
    const { totalService } = this.state
    let servicesOther = totalService.filter(x => {
      return x.type === SERVICE_TYPE.OTHER
    }).map(y => {
      return { id: y.id }
    })
    let job = {
      location_id: 'MC78W1GH6H',
      services: servicesOther,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJobTest(job);
  }
  submitJob = (customer_id) => {
    const { location_id, service_id, policy_id } = this.state.form;
    let job = {
      location_id: location_id.value,
      service_id: service_id.value,
      service_policy_id: policy_id.value,
      customer_id,
    };
    return ReceptionService.postJob(job);
  };
  handlePayment = () => {
    let { service_id, policy_id, location_id, cm_code, cm_full_name } = this.state.form
    this._validateForm();
    if (this._isFormValid() && service_id.value && policy_id.value) {
      if(!this.state.customerId){
        this.submitCustomer().then(async (res) => {
          let customer_id = res.id;
          if (this.state.reExamination) customer_id = this.state.customerId;
          this.submitContact(customer_id).then((res) => {
          })
            .catch((err) => {
              console.log(err);
            });
        if (this.state.selectedOtherService.length > 0) {
          this.submitJobOther(customer_id).then((res) => {
            ReceptionService.getJobById(res.data.id).then(res => {
              let receiptData = res.data
              this.setState({ billID: receiptData.steps?.[0].code })
              this.setState({ jobId: receiptData.id })
              this.setState({ show: true })
            })
          })
            .catch((err) => {
              console.log(err);
              this.setNotiMessage("Có lỗi xảy ra3!");
            });
        } else if (this.state.totalService.length > 0) {
          let xray = this.state.totalService.filter(x => x.type === SERVICE_TYPE.XRAY)
          let test = this.state.totalService.filter(x => x.type === SERVICE_TYPE.TEST)
          let ultrasound = this.state.totalService.filter(x => x.type === SERVICE_TYPE.ULTRASOUND)
          let ent = this.state.totalService.filter(x => x.type === SERVICE_TYPE.ENT)
          let other = this.state.totalService.filter(x => x.type === SERVICE_TYPE.OTHER)
          if (xray && xray.length > 0) {
            await this.submitJobXray(customer_id).then((res) => {
              let resXray = res.data.ref_value.code
              this.setState({ resXray: resXray })
            })
          }
          if (ultrasound && ultrasound.length > 0) {
            await this.submitJobUltrasound(customer_id).then((res) => {
              let resUltrasound = res.data.ref_value.code
              this.setState({ resUltrasound: resUltrasound })
            })
          }
          if (test && test.length > 0) {
            await this.submitJobTest(customer_id).then((res) => {
              let resTest = res.data.ref_value.code
              this.setState({ resTest: resTest })
            })
          }
          if (ent && ent.length > 0) {
            await this.submitJobEnt(customer_id).then((res) => {
              let resEnt = res.data.ref_value.code
              this.setState({ resEnt: resEnt })
            })
          }
          if (other && other.length > 0) {
            await this.submitJobOther(customer_id).then((res) => {
              let resOther = res.data.ref_value.code
              this.setState({ resOther: resOther })
            })
          }
          if (this.state.resXray || this.state.resTest || this.state.resEnt || this.state.resUltrasound || this.state.resOther) {
            this.setState({ showTest: true })
          }
        } else {
          this.submitJob(customer_id).then((res) => {
            ReceptionService.getJobById(res.data.id).then(res => {
              let receiptData = res.data
              this.setState({ billID: receiptData.steps?.[0].code })
              this.setState({ jobId: receiptData.id })
              this.setState({ show: true })
            })
          })
            .catch((err) => {
              console.log(err);
              this.setNotiMessage("Có lỗi xảy ra3!");
            });
        }
      })
        .catch((err) => {
          console.log(err);
          this.setNotiMessage("Có lỗi xảy ra4!");
        });
      }else {
        ReceptionService.getCmbyCode(cm_code.value).then(async (res) => {
          let customer_id = res.id;
          if (this.state.reExamination) customer_id = this.state.customerId;
          this.submitContact(customer_id).then((res) => {
          })
            .catch((err) => {
              console.log(err);
            });
        if (this.state.selectedOtherService.length > 0) {
          this.submitJobOther(customer_id).then((res) => {
            ReceptionService.getJobById(res.data.id).then(res => {
              let receiptData = res.data
              this.setState({ billID: receiptData.steps?.[0].code })
              this.setState({ jobId: receiptData.id })
              this.setState({ show: true })
            })
          })
            .catch((err) => {
              console.log(err);
              this.setNotiMessage("Có lỗi xảy ra3!");
            });
        } else if (this.state.totalService.length > 0) {
          let xray = this.state.totalService.filter(x => x.type === SERVICE_TYPE.XRAY)
          let test = this.state.totalService.filter(x => x.type === SERVICE_TYPE.TEST)
          let ultrasound = this.state.totalService.filter(x => x.type === SERVICE_TYPE.ULTRASOUND)
          let ent = this.state.totalService.filter(x => x.type === SERVICE_TYPE.ENT)
          let other = this.state.totalService.filter(x => x.type === SERVICE_TYPE.OTHER)
          if (xray && xray.length > 0) {
            await this.submitJobXray(customer_id).then((res) => {
              let resXray = res.data.ref_value.code
              this.setState({ resXray: resXray })
            })
          }
          if (ultrasound && ultrasound.length > 0) {
            await this.submitJobUltrasound(customer_id).then((res) => {
              let resUltrasound = res.data.ref_value.code
              this.setState({ resUltrasound: resUltrasound })
            })
          }
          if (test && test.length > 0) {
            console.log(customer_id, 'id');
            await this.submitJobTest(customer_id).then((res) => {
              let resTest = res.data.ref_value.code
              this.setState({ resTest: resTest })
            })
          }
          if (ent && ent.length > 0) {
            await this.submitJobEnt(customer_id).then((res) => {
              let resEnt = res.data.ref_value.code
              this.setState({ resEnt: resEnt })
            })
          }
          if (other && other.length > 0) {
            await this.submitJobOther(customer_id).then((res) => {
              let resOther = res.data.ref_value.code
              this.setState({ resOther: resOther })
            })
          }
          if (this.state.resXray || this.state.resTest || this.state.resEnt || this.state.resUltrasound || this.state.resOther) {
            this.setState({ showTest: true })
          }
        } else {
          this.submitJob(customer_id).then((res) => {
            ReceptionService.getJobById(res.data.id).then(res => {
              let receiptData = res.data
              this.setState({ billID: receiptData.steps?.[0].code })
              this.setState({ jobId: receiptData.id })
              this.setState({ show: true })
            })
          })
            .catch((err) => {
              console.log(err);
              this.setNotiMessage("Có lỗi xảy ra3!");
            });
        }
      })
        .catch((err) => {
          console.log(err);
          this.setNotiMessage("Có lỗi xảy ra4!");
        });
      }
       
    } else {
      this.setNotiMessage("Dữ liệu nhập sai hoặc không đầy đủ, vui lòng kiểm tra lại!")
    }
  }
  submitForm = () => {
    console.log('submit');
    let { service_id, policy_id, location_id } = this.state.form
    this._validateForm();
    if (this._isFormValid() && service_id.value && policy_id.value && location_id.value) {
      this.setSubmitLoading(true);
      this.printJob(this.state.jobId)
    } else {
      this.setNotiMessage("Dữ liệu nhập sai hoặc không đầy đủ, vui lòng kiểm tra lại!")
    }
  };
  findCustomerByCode = (code) => {
    return ReceptionService.getCmbyCode(code);
  };
  //từ danh sách lịch sử khám, kiểm tra xem có phải khám lại trong vòng 3 ngày
  isExamWithin3D = async (medicalHistory, service_id) => {
    let wasExamination = medicalHistory.filter((item) => {
      const diffTime = (new Date()).getTime() - item.ctime;
      if (diffTime < 3 * ONE_DAY && item.steps[0].order.items[0].ref_value.id == service_id)
        return diffTime < 3 * ONE_DAY && item.steps[0].order.items[0].ref_value.id ==
          service_id && item.steps[0].order.items[0].ref_value.type == SERVICE_TYPE.EXAM
    })
    return (wasExamination.length > 0 && wasExamination[0].steps[0]?.order.total > 0);
  }
  handleShowHistory = () => { this.setShowHistory(true) }
  handleCloseShowHistory = () => { this.setShowHistory(false) }
  handleShow = () => { this.setShow(true) };
  handleClose = () => { this.setShow(false) }
  handleCloseTest = () => { this.setShowTest(false) }
  handleShowHistoryExam = (e) => {
    this.findCustomerByCode(e).then(async (res) => {
      let customer = res.data;
      let medicalHistory = (await ReceptionService.getExamHistory(customer.id)).data
      this.setMedicalHistory(medicalHistory)
      this.setState({ items: medicalHistory.reverse() })
      this.setCustomerId(customer.id);
      this.setShowHistory(true)
    }).catch((err) => {
      console.log(err);
      this.setNotiMessage("Bệnh nhân chưa từng đến khám");
      this.setFindLoading(false);
    });
  }
  getHistoryExam = () => {

  }
  handleReExam = (code) => {
    this.setFindLoading(true);
    this.findCustomerByCode(code).then(async (res) => {
      let customer = res.data;
      let contact = {};
      if (customer.contacts.length) contact = customer.contacts[0];
      // get and set medical history
      let medicalHistory = (await ReceptionService.getExamHistory(customer.id)).data
      this.setMedicalHistory(medicalHistory)
      this.setState({ items: medicalHistory.slice(0, 11)})
      //khám lại 3 ngày, policy_id sẽ tự động là chính sách khám lại 3 ngày 
      let policy_id = ""
      let addressObj = contact.address
      if (customer.code.startsWith('CB') == false) {
        this._fillForm({
          location_id: "",
          service_id: "",
          policy_id: policy_id,
          policy_code: "",
          cm_full_name: customer.full_name,
          cm_gender: customer.gender,
          cm_birthday: convertToStrDate(customer.birthday),
          cm_code: customer.code,
          contact_full_name: contact.full_name,
          contact_cccd: contact.idnum,
          contact_phone_number: contact.phone,
          contact_address: addressObj.street,
          contact_email: contact.email,
          contact_city: addressObj.province,
          contact_district: addressObj.district,
          contact_ward: addressObj.ward,
        });
        //  this.setShowHistory(true)
        this.setState({ fillAddress: true })
        this.setReExamination(true);
        this.setOfficialsExam(false)
        this.setCustomerId(customer.id);
        this.setContactId(contact.id);
        this.setFindLoading(false);
      } else if (customer.code.startsWith('CB') == true) {
        this._fillForm({
          location_id: "",
          service_id: "",
          policy_id: policy_id,
          policy_code: "",
          cm_full_name: customer.full_name,
          cm_gender: customer.gender,
          cm_birthday: convertToStrDate(customer.birthday),
          cm_code: customer.code,
          contact_full_name: contact.full_name,
          contact_phone_number: contact.phone,
          contact_address: addressObj.street,
          contact_email: contact.email,
          contact_city: addressObj.province,
          contact_district: addressObj.district,
          contact_ward: addressObj.ward,
        });
        //  this.setShowHistory(true)
        this.setState({ fillAddress: true })
        this.setReExamination(true);
        this.setOfficialsExam(true)
        this.setCustomerId(customer.id);
        this.setContactId(contact.id);
        this.setFindLoading(false);
      }
    })
      .catch((err) => {
        console.log(err);
        this.setNotiMessage("Mã bệnh nhân đã tồn tại!");
        this.setFindLoading(false);
      });
  };
  staShortKey = () => {
    this.setState({ onPrintShortKey: false })
  }
  shortKey = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      switch (e.key) {
        case "d":
          this.handleResetForm();
          break;
        case "s":
          this.handlePayment();
          break;
        case "u":
          this.updateInforCus();
          break;
        case "h":
          this.onShowHistory();
          break;
        default:
          break;
      }
    }
  }
  render() {
    let { reExamination, notiMessage, findLoading, officialsExam, show, showTest, showHistory } = this.state;
    let { cm_full_name, cm_birthday, cm_code, cm_phone_number, contact_address } = this.state.form
    return (
      <div sm={12} className="receptionFromContainer" onKeyDown={(e) => this.shortKey(e)} tabIndex="0">
       
        <ModalFilterCmCode
          cm_code={cm_code}
          cm_full_name={cm_full_name}
          cm_birthday={cm_birthday}
          handleReExam={this.handleReExam}
          data={this.state.form}
        />
        <ModalFilter
          contact_address={contact_address}
          cm_phoneNumber={cm_phone_number}
          cm_code={cm_code}
          cm_full_name={cm_full_name}
          cm_birthday={cm_birthday}
          handleReExam={this.handleReExam}
        />
        <div className="end">
          <Clock></Clock>
        </div>
        <div className="customCard mb-2 mt-40 search-form">
          <SearchForm handleReExam={this.handleReExam}></SearchForm>
        </div>
        <Form>
          <Row className="info-Form">
            <Col sm={5} className="customerForm customCard" >
              <CustomerForm
                data={this.state.form}
                officialsExam={officialsExam}
                reExamination={reExamination}
                _setValue={this._setValue}
                findLoading={findLoading}
                printShortKey={this.state.onPrintShortKey}
                staShortKey={this.staShortKey}
                mode="input"
              />
            </Col>
            <Col sm={5} className="contactForm customCard">
              <ContactForm
                officialsExam={officialsExam}
                fillAddress={this.state.fillAddress}
                form={this.state.form}
                _setValue={this._setValue}
              />
            </Col>
          </Row>
          <div className="customCard pb-0 form-service" >
            <ServiceForm
              setNotiMessage={this.setNotiMessage}
              items={this.state.items?.length > 0 && this.state.items}
              handleChangeReason={this.handleChangeReason}
              officialsExam={this.state.officialsExam}
              setValueForm={this.setValueForm}
              setPolicyCode={this.setPolicyCode}
              setLocationId={this.setLocationId}
              AllLocation={this.state.AllLocation}
              setPolicyId={this.setPolicyId}
              isExamWithin3D={this.isExamWithin3D}
              medicalHistory={this.state.medicalHistory}
              selectedTestService={this.state.selectedTestService}
              selectedOtherService={this.state.selectedOtherService}
              totalService={this.state.totalService}
              setTotalService={this.setTotalService}
              selectedXRayService={this.state.selectedXRayService}
              selectedUltrasoundService={this.state.selectedUltrasoundService}
              selectedEntService={this.state.selectedEntService}
              form={this.state.form}
              _setValue={this._setValue}
            />
          </div>
          <div className="  mb-5">
            <Col className="medicalHistoryForm justify-content-end">
              <Button className="ml-5"
                hidden={!this.state.customerId}
                onClick={this.onShowHistory}
              >Lịch sử Khám</Button>
              {/* <Button className="ml-5"
                hidden={!this.state.customerId}
                onClick={() => {
                  this.updateInforCus()
                  this.handleResetForm()
                }}
              >Cập nhật</Button> */}
              <Button className="ml-5 btn-del"
                onClick={() => this.handleResetForm()}
              >Xóa</Button>
              <Button className="ml-5"
                data-index="13"
                onClick={this.handlePayment}
              >Lưu</Button>
            </Col>
            <Modal isOpen={showTest} >
              <ModalHeader>
                Thu Ngân
              </ModalHeader>
              <ModalBody>
                <AccountingForm
                  total={this.state.totalService}
                  customer_code={this.state.resEnt || this.state.resTest || this.state.resUltrasound || this.state.resXray || this.state.resOther}
                  reason={this.state.reason}
                  handleCloseTest={this.handleCloseTest}
                  handleClose={this.handleClose}
                  handleResetForm={this.handleResetForm}
                  mode="reception"
                ></AccountingForm>
              </ModalBody>
              <ModalFooter><Button onClick={() => {
                this.handleCloseTest()
                this.handleResetForm()
              }}>Close</Button></ModalFooter>
            </Modal>
            <Modal isOpen={showHistory} >
              <ModalHeader>
                Lịch sử Khám
                <Button style={{ position: 'relative', left: '1300px' }} color="danger" onClick={this.handleCloseShowHistory}>X</Button>
              </ModalHeader>
              <ModalBody>
                <MedicalHistoryTable
                  items={this.state.items}
                ></MedicalHistoryTable>
              </ModalBody>
              <ModalFooter><Button color="danger" onClick={this.handleCloseShowHistory}>Close</Button></ModalFooter>
            </Modal>
            <Modal isOpen={show} >
              <ModalHeader>
                Thu Ngân
                <Button style={{ position: 'relative', left: '1300px' }} color="danger" onClick={this.handleClose}>X</Button>
              </ModalHeader>
              <ModalBody className="modal-accounting">
                <AccountingForm
                  reason={this.state.reason}
                  submitForm={this.submitForm}
                  handleClose={this.handleClose}
                  billID={this.state.billID}
                  mode="reception"
                ></AccountingForm>
              </ModalBody>
              <ModalFooter><Button color="danger" onClick={this.handleClose}>Close</Button></ModalFooter>
            </Modal>
            <Modal isOpen={showHistory} >
              <ModalHeader>
                Lịch sử Khám
                <Button style={{ position: 'relative', left: '1300px' }} color="danger" onClick={this.handleCloseShowHistory}>X</Button>
              </ModalHeader>
              <ModalBody>
                <MedicalHistoryTable
                  items={this.state.items}
                ></MedicalHistoryTable>
              </ModalBody>
              <ModalFooter><Button color="danger" onClick={this.handleCloseShowHistory}>Close</Button></ModalFooter>
            </Modal>
          </div>
        </Form>
        <ModalNoti
          message={notiMessage}
          done={() => this.setNotiMessage("")}
        />
      </div>
    );
  }
}

export default withRouter(ReceptionForm);