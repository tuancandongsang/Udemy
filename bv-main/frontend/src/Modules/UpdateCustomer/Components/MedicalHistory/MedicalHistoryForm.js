import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import { ModalNoti } from '../../../Accounting/Shared';
import { FormParent } from '../../Shared';
import ReceptionService from "../../../Reception/Shared/ReceptionService";
import MedicalHistoryTable from './MedicalHistoryTable';
import Select from 'react-select'


class MedicalHistoryForm extends FormParent {
  constructor(props) {
    super(props);
    this.state = {
      selectedType: null,
      isPayment: true,
      notiMessage: '',
      form: this._getInitFormData({
        customerName: '',
        nameService: '',
        customerGender: '',
        time: '',
        service: [{ name: "Khám bệnh", method: "exam" }, { name: "Xét nghiệm", method: "test" }],
      }),
      isCustomerFound: false,
    }
  }
  setIsOrderFound = (isOrderFound) => {
    this.setState({ isOrderFound })
  }
  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage })
  }
  resetForm = () => {
    this._fillForm({
      customerName: '',
      nameService: '',
      customerGender: '',
      time: '',
      service: [{ name: "Khám bệnh", method: "exam" }, { name: "Xét nghiệm", method: "test" }],
    })
    this.setIsCustomerFound(false)
  }
  findMedicalHistory = (customerId,type) => {
    return ReceptionService.getExamHistory(customerId,type)
  }
 
  handleChangeSelectType = (selectedType) => {

    this.setState({ selectedType })
  }
  
  handleSearch = (customerId) => {
    this.findMedicalHistory(customerId).then((res=>{
      let medicalHistory = res.data
      this.setState({items:medicalHistory.reverse()})
          this.setIsOrderFound(true)
          
    })).catch(err => {
      console.log(err)
      this.setNotiMessage('Không tìm thấy hóa đơn!')
    })
    // if(selectedType==null){
    //   this.findMedicalHistory(customerId).then((res)=>{
    //     let medicalHistory = res.data
    //     this.setState({items:medicalHistory.reverse()})
    //     this.setIsOrderFound(true)
    //     .catch(err => {
    //         console.log(err)
    //         this.setNotiMessage('Không tìm thấy hóa đơn!')
    //       })
    //   })
    // }else{
    //   this.findMedicalHistory(customerId,selectedType.value).then((res) => {
    //     let medicalHistory = res.data
        
    //     console.log(res.data);
    //     this.setState({ items: medicalHistory.steps.reverse() })
    //     this.setIsOrderFound(true)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.setNotiMessage('Không tìm thấy hóa đơn!')
    //   })
    // }
   
  }
  componentDidMount() {
  }
  render() {
    const { notiMessage, selectedType } = this.state
    const typeOptions = [
      { value: 'exam', label: 'Khám bệnh' },
      { value: 'test', label: 'Xét nghiệm' }
    ]
     const { customerId} = this.props;
     if (this.props.customerId && customerId.value ==  '') this.handleSearch(this.props.customerId);
    return (
      <div className="container">
        <ModalNoti message={notiMessage} done={() => this.setNotiMessage("")} />
        <Col sm={12}>
          <Form>
            <FormGroup row>
              <Label sm={2}>Mã bệnh nhân</Label>
              <Col sm={6}>
                <InputGroup>
                  <Input name="customerId"
                    className="inputcmId"
                    value={customerId}
                    onChange={(ev) => { this._setValue(ev, 'customerId') }}
                    type="text"
                    id="customerId"
                    placeholder="Nhập mã bệnh nhân"
                    required
                  />
                  <InputGroupAddon addonType="append">
                    
                    <Button color="primary" onClick={() => { this.handleSearch()}}>Tìm</Button>

                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <FormGroup row>
                <Col sm={2}>
                  <Label>Lọc theo :</Label>
                </Col>
                <Col sm={4}>
                  <Select
                    value={selectedType}
                    options={typeOptions}
                    placeholder="chọn dịch vụ"
                    onChange={this.handleChangeSelectType}
                    // onClick={this.handleSearchByType}
                  />
                </Col>
              </FormGroup>
            </FormGroup>
            <Col sm={11}>
              <MedicalHistoryTable items={this.state.items}></MedicalHistoryTable>
            </Col>
          </Form>
        </Col>
      </div>
    );
  }
}


// const Asterisk = () => {
//   return (
//     <>
//       <span className="text-danger">*</span>
//     </>
//   )
// }

export default MedicalHistoryForm;