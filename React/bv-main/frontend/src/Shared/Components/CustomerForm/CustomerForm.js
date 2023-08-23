import React from "react";
import { FormGroup, Label, Input, Col, Row, Button } from "reactstrap";
import Asterisk from "../../../Modules/Reception/Components/ReceptionForm/Asterisk";
import { REGEX_DATE } from "../../../Modules/Reception/Shared";
import { Util } from "../../../Helper/Util";
import { REGEX_TEL } from '../../../Constances/const';
import { ShareService } from "../..";
import PrintBarcode from "../../../Modules/Reception/Components/ReceptionForm/PrintBarCode";
import { convertToStrDate, getAge, autoAddSlashDate } from "../../../Modules/Reception/Shared/Util";
import CustomerFromPrint from "./CustomerFromPrint"

export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      items: [],
      printShortKey: false,
    }
  }
  componentDidUpdate = () => {
    if (this.props.printShortKey) {
      this.print();
    }
  }

  CloseHistory = () => {
    this.setState({
      show: false
    })
  }
  setHistory = (customer_id) => {
    ShareService.getJobByCustomerId(customer_id).then(res => {
      let data = res.data.reverse();
      data.splice(6);
      this.setState({
        items: data,
        show: true
      })
    })
  }
  printBarcode = async () => {
    await ShareService.printBarCode("barcodeCanvas");
  }
  print = () => {
    ShareService.printBarCode("printCode");
    this.props.staShortKey();
  };

  render() {

    let data = this.props.data || {};
    let { cm_code, cm_full_name, cm_gender, cm_birthday, dirty, contact_phone_number } = data;
    let { reExamination, officialsExam, _setValue, mode, } = this.props;
    let address = data.contacts ? data.contacts[0].address : {};
    const ward = address.ward ? `  ${address.ward}` : '';
    const district = address.district ? `-${address.district}` : '';
    const province = address.province ? `-${address.province}` : '';
    return (
      <div className="customerForm_container">
        <h5 className="title-card"><span className="material-icons">person</span> Thông tin bệnh nhân</h5>
        {mode === 'pharmacy' && (
          <Row className="infoCustomer ">
            <Col sm={11} className="ml-10">
              <Row className="mb-1">
                <Col xs="2">Mã bệnh nhân:</Col>
                <Col xs="4">{data.code}</Col>
                <Col xs="2">Họ tên:</Col>
                <Col xs="4">{data.full_name}</Col>
              </Row>
            </Col>
            <Col sm={11} className="ml-10">
              <Row className="mb-1">
                <Col xs="2">Giới tính:</Col>
                <Col xs="4">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                <Col xs="2">Ngày sinh:</Col>
                <Col xs="4">{convertToStrDate(data.birthday)}</Col>
              </Row>
            </Col>
            <Col sm={11} className="ml-10">
              <Row className="mb-1">
                <Col xs="2">Địa chỉ:</Col>
                <Col xs="10">{`${ward} ${district} ${province}` || data.address}</Col>
              </Row>
            </Col>
          </Row>
        )}
        {mode === "input" && (
          <div>
            <FormGroup row>
              <Label for="cm_code" sm={5}>Mã bệnh nhân <Asterisk /></Label>
              <Col sm={6}>
                <Input
                  placeholder="nhập 12 số mã bệnh nhân"
                  autoFocus
                  maxLength={12}
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="1"
                  name="cm_code"
                  value={cm_code.value}
                  type="text"
                  id="cm_code"
                  onChange={(ev) => _setValue(ev, "cm_code")}
                  disabled={reExamination}
                />
              </Col>
              <PrintBarcode
                customerCode={cm_code.value}
                customerName={cm_full_name.value}
              ></PrintBarcode>
              <Col sm={1}>
                <Button
                  onClick={() => this.printBarcode()}
                >In</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cm_full_name" sm={5}>Họ tên <Asterisk /></Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  disabled={officialsExam}
                  data-index="2"
                  type="text"
                  name="cm_full_name"
                  value={cm_full_name.value}
                  id="cm_full_name"
                  onChange={(ev) => _setValue(ev, "cm_full_name")}
                  required
                  className="text-uppercase" />
                {dirty && (
                  <span className="text-danger">{cm_full_name.err}</span>
                )}
              </Col>
            </FormGroup>
            <FormGroup row className="customer-birthday">
              <Label for="cm_birthday" sm={5}>
                Ngày sinh <Asterisk />
              </Label>
              <Col sm={5}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  disabled={officialsExam}
                  data-index="3"
                  type="text"
                  name="cm_birthday"
                  id="cm_birthday"
                  value={cm_birthday.value}
                  onChange={(ev) => { ev.target.value = autoAddSlashDate(ev.target.value); _setValue(ev, "cm_birthday") }}
                  pattern={REGEX_DATE}
                  placeholder="dd/mm/yyyy"
                  required
                />
                {dirty && (
                  <span className="text-danger">{cm_birthday.err}</span>
                )}
              </Col>
              {cm_birthday.value && !cm_birthday.err && (
                <Col sm={2}>
                  <div className=" align-items-center get-age">
                    {getAge(cm_birthday.value)}
                  </div>
                </Col>
              )}
            </FormGroup>
            <Row className="gender">
              <Label for="cm_gender" sm={5}>
                Giới tính <Asterisk />
              </Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  disabled={officialsExam}
                  data-index="4"
                  type="select"
                  id="cm_gender"
                  value={cm_gender.value}
                  onChange={(ev) => _setValue(ev, "cm_gender")}
                  required>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </Input>
                {dirty && (
                  <span className="text-danger">{cm_gender.err}</span>
                )}
              </Col>
            </Row>
            <FormGroup row className="customer-phone">
              <Label for="contact_phone_number" sm={5}>Số điện thoại <Asterisk /></Label>
              <Col sm={7}>
                <Input
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  disabled={officialsExam}
                  data-index="5"
                  type="text"
                  name="contact_phone_number"
                  id="contact_phone_number"
                  value={contact_phone_number.value}
                  pattern={REGEX_TEL}
                  onChange={(ev) => _setValue(ev, 'contact_phone_number')}
                  required
                />
                {dirty && <span className="text-danger">{contact_phone_number.err}</span>}
              </Col>
            </FormGroup>
            <div className="print">
              <CustomerFromPrint id={cm_code.value.toString()}></CustomerFromPrint>
            </div>


          </div>
        )}
        {/* && (data.code.startsWith('CB') == true) */}

        {mode !== "input" && mode !== 'pharmacy' && mode !== 'doctor' && mode !== 'exam' && (
          <div>
            <Row className="infoCustomer ">
              <Col sm={5} className="ml-10">
                <Row className="mb-1">
                  <Col xs="5">Mã bệnh nhân:</Col>
                  <Col xs="7">{data.code}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Họ tên:</Col>
                  <Col xs="7">{data.full_name}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Địa chỉ:</Col>
                  <Col xs="7">{`${ward}${district}${province}` || data.address}</Col>
                </Row>
              </Col>
              <Col sm={5}>
                <Row className="mb-1">
                  <Col xs="5">Giới tính:</Col>
                  <Col xs="7">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Ngày sinh:</Col>
                  <Col xs="5">{convertToStrDate(data.birthday)}</Col>
                </Row>
              </Col>

            </Row>

            {mode === "easyInfo" && (
              <>
                <Row className="mb-1">
                  <Col xs="5">Giới tính:</Col>
                  <Col xs="7">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Ngày sinh:</Col>
                  <Col xs="5">{convertToStrDate(data.birthday)}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="5">Địa chỉ:</Col>
                  <Col xs="7">{data ? data.contacts ? data.contacts[0].address.province : "" : ""}</Col>
                </Row>
              </>
            )}

          </div>
        )}
        {mode === "doctor" && (

          <div>
            <Row className="infoCustomer">
              <Col sm={9}>
                <Row className="mb-1">
                  <Col xs="3">Mã bệnh nhân:</Col>
                  <Col xs="9">{data.code}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Họ tên:</Col>
                  <Col xs="9">{data.full_name}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Địa chỉ:</Col>
                  <Col xs="9">{`${ward}${district}${province}` || data.address}</Col>
                </Row>
              </Col>
              <Col sm={3}>
                <Row className="mb-1">
                  <Col xs="3">Giới:</Col>
                  <Col xs="9">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Tuổi:</Col>
                  <Col xs="9">{data.birthday ? getAge(convertToStrDate(data.birthday)) : " "}</Col>
                </Row>
              </Col>
              {/* <Col sm="1">
                <Button
                  //  hidden={!this.props.data.code}
                  size="sm"
                  className="historyCm"
                  onClick={() => this.setHistory(data.id)}>
                  ?
                </Button>
                <Modal isOpen={this.state.show}>
                  <ModalHeader>Lịch sử khám</ModalHeader>
                  <ModalBody>
                    <HistoryCmByDoctor
                      data={data}
                    ></HistoryCmByDoctor>
                  </ModalBody>
                  <ModalFooter>
                    <Col sm="12" className="end">
                      <Button onClick={this.CloseHistory} color="danger">Đóng</Button>
                    </Col>
                  </ModalFooter>
                </Modal>
              </Col> */}
            </Row>
          </div>
        )}
        {mode === "exam" && (

          <div>
            <Row className="infoCustomer">
              <Col sm={7}>
                <Row className="mb-1">
                  <Col xs="3">Mã bệnh nhân:</Col>
                  <Col xs="9">{data.code}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Họ tên:</Col>
                  <Col xs="9">{data.full_name}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Địa chỉ:</Col>
                  <Col xs="9">{`${ward}${district}${province}` || data.address}</Col>
                </Row>
              </Col>
              <Col sm={5}>
                <Row className="mb-1">
                  <Col xs="3">Giới:</Col>
                  <Col xs="9">{data.gender ? data.gender === "male" ? "Nam" : "Nữ" : null}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Tuổi:</Col>
                  <Col xs="9">{data.birthday ? getAge(convertToStrDate(data.birthday)) : " "}</Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="3">Chẩn đoán:</Col>
                  <Col xs="9">{this.props.textDiagnosis ? this.props.textDiagnosis : " "}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}