import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row, InputGroup, InputGroupAddon, Spinner,Modal } from 'reactstrap';
import { ModalNoti, moneyToWord } from '../../../../Accounting/Shared';
import { FormParent, } from '../../../Shared';
import OrderTable from './OrderTable'
import ReceptionService from "../../../Shared/ReceptionService";
import CustomerForm from "../../../../../Shared/Components/CustomerForm/CustomerForm";
import { Util } from "../../../../../Helper/Util";
import NumberFormat from 'react-number-format';
import ReceiptPrintingPreview from "../../../Components/ReceiptPrintingPreview/ReceiptPrintingPreview";
import { STATUS } from "../../../../../Constances/const"
import TransactionService from "../../../../Accounting/Shared/TransactionService"
import printJS from 'print-js';
// import AccountingPrintingPreview from '../../../../Accounting/Components/AccountingPrintingPreview/AccountingPrintingPreview';
import AccountingPrintingPreview from '../AccountingPrintingPreview/AccountingPrintingPreview';


class AccountingForm extends FormParent {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      paymentList: [{ name: "Tiền mặt", method: "cash" }, { name: "Thẻ ATM", method: "other" }],
      currentPaymentMethods: 'cash',
      note: '  ',
      isPayment: true,
      notiMessage: '',
      form: this._getInitFormData({
        origin_price: '',
        customerCode: '',
        orderCode: '',
        customerName: '',
        customerBirthday: '',
        totalPrice: "",
        nameService: '',
        priceService: '',
        customerGender: '',
        cTime: '',
        orderStatus: '',
        bookId: ''
      }),
      isOrderFound: false,
      isOpen: false,
    }
  }

  setBookList = (bookList) => {
    this.setState({ bookList: bookList.filter((el) => el.status === "active") })
    this.setState({ bookId: bookList[0].id })
  }
  setPaymentList = (paymentList) => {
    this.setState({ paymentList: paymentList })
  }


  getAllBookList = () => {
    const status = "active";
    ReceptionService.getBookList(status).then(res => {
      this.setBookList(res.data)
    })
  }

  setIsOrderFound = (isOrderFound) => {
    this.setState({ isOrderFound })
  }
  setIsPayment = (isPayment) => {
    this.setState({ isPayment })
  }

  setNotiMessage = (notiMessage) => {
    this.setState({ notiMessage })
  }
  toggleUser = () => {
    this.setState({
      dropdownBook: !this.state.dropdownBook,
    })
  }
  resetForm = () => {
    this._fillForm({
      origin_price: '',
      customerCode: '',
      orderCode: '',
      customerName: '',
      customerBirthday: '',
      totalPrice: '',
      nameService: '',
      priceService: '',
      customerGender: '',
      cTime: '',
      orderStatus: '',
      bookId: '',
    })
    this.setIsOrderFound(false)
  }

  findOrderByCode = (code) => {
    return ReceptionService.getOrder(code)
  }
  handleSearch = (orderCode) => {
    if (this.props.retail) {
      ////// THANH TOÁN ĐƠN THUỐC BÁN LẺ
      ReceptionService.getRetailOrder(orderCode)
        .then(res => {
          let data = res.data;
          this._fillForm({
            totalPrice: data.total,
            orderId: data.id,
            // nameService: orderInfo.view_order.items[0].ref_value.name,
            // priceService: orderInfo.view_order.items[0].ref_value.price,
            cTime: (new Date(data.ctime)).toLocaleString(),
            orderStatus: data.status,
            customerCode: 0,
            orderCode: this.props.billID,
            customerName: '',
            customerBirthday: '',
            customerGender: '',
          })
          this.setState({ items: data.items })
        }).catch(err => console.log(err))
    } else if (this.props.billID) {
      ////// BÌNH THƯỜNG
      this.findOrderByCode(orderCode).then((res) => {
        let orderInfo = res.data
        let sumOriginPrice = 0
        res.data.view_order.items.map(e => {
          return sumOriginPrice += e.ref_value.origin_price
        })
        this.setState({
          origin_price: sumOriginPrice,
        })
        let address = orderInfo.view_order.customer.contacts[0].address
        let street = address.street ? `${address.street}` : ''
        let ward = address.ward ? `  -${address.ward}` : ''
        let district = address.district ? `-${address.district}` : ''
        let province = address.province ? `-${address.province}` : ''
        let customerAddress = `${street}${ward}${district}${province}`
        if (address.province.length > 0) { this.setState({ customerAddress: customerAddress }) }
        if (orderInfo.view_order.items.length == 1) {
          this._fillForm({
            customerCode: orderInfo.view_order.customer.code,
            orderCode: orderInfo.view_order.code,
            customerName: orderInfo.view_order.customer.full_name,
            customerBirthday: orderInfo.view_order.customer.birthday,
            totalPrice: orderInfo.view_order.total,
            orderId: orderInfo.view_order.id,
            customerGender: orderInfo.view_order.customer.gender,
            nameService: orderInfo.view_order.items[0].ref_value.name,
            priceService: orderInfo.view_order.items[0].ref_value.price,
            cTime: (new Date(orderInfo.view_order.ctime)).toLocaleString('en-GB'),
            orderStatus: orderInfo.view_order.status,
          })
        } else {
          this._fillForm({
            customerCode: orderInfo.view_order.customer.code,
            orderCode: orderInfo.view_order.code,
            customerName: orderInfo.view_order.customer.full_name,
            customerBirthday: orderInfo.view_order.customer.birthday,
            totalPrice: orderInfo.view_order.total,
            orderId: orderInfo.view_order.id,
            customerGender: orderInfo.view_order.customer.gender,
            nameService: orderInfo.view_order.items[0].ref_value.name,
            priceService: orderInfo.view_order.items[0].ref_value.price,
            cTime: (new Date(orderInfo.view_order.ctime)).toLocaleString('en-GB'),
            orderStatus: orderInfo.view_order.status,
          })
        }
        this.setState({
          items: orderInfo.view_order.items
        })
        this.setIsOrderFound(true)

      }).catch(err => {
        console.log(err)
        this.setNotiMessage('Không tìm thấy hóa đơn!')
      })
    }
  }
  handleSearchByCustomerCode = () => {
    const { customer_code } = this.props
    let items = []
    let orderList = []
    TransactionService.getListTransaction(customer_code).then(res => {
      let orderInfo = res.data
      let orderInfoExam = res.data.filter(e => e.order.items[0]?.ref_value.type == 'test')
      let lastOrderInfoExam = orderInfoExam[orderInfoExam.length - 1]
      let orderInfoXray = res.data.filter(e => e.order.items[0]?.ref_value.type == 'x-ray')
      let lastOrderInfoXray = orderInfoXray[orderInfoXray.length - 1]
      let orderInfoEnt = res.data.filter(e => e.order.items[0]?.ref_value.type == 'ent')
      let lastOrderInfoEnt = orderInfoEnt[orderInfoEnt.length - 1]
      let orderInfoUltrasound = res.data.filter(e => e.order.items[0]?.ref_value.type == 'ultrasound')
      let lastOrderInfoUltrasound = orderInfoUltrasound[orderInfoUltrasound.length - 1]
      let orderInfoOther = res.data.filter(e => e.order.items[0]?.ref_value.type == 'other')
      let lastOrderInfoOther = orderInfoOther[orderInfoOther.length - 1]
      let lastOrderInfo = []
      if(lastOrderInfoExam) lastOrderInfo.push(lastOrderInfoExam)
      if(lastOrderInfoXray) lastOrderInfo.push(lastOrderInfoXray)
      if(lastOrderInfoEnt) lastOrderInfo.push(lastOrderInfoEnt)
      if(lastOrderInfoUltrasound) lastOrderInfo.push(lastOrderInfoUltrasound)
      if(lastOrderInfoOther) lastOrderInfo.push(lastOrderInfoOther)
      for (let i = 0; i < lastOrderInfo.length; i++) {
          orderList.push(lastOrderInfo[i].order)
      }
      lastOrderInfo.map(e => {
        e.order.items?.map(el => {
          items.push(el)
        })
      })
      let price = 0
      let origin_price = 0
      items.map(x => {
        price += x.price
      })
      items.map(x => {
        origin_price += x.origin_price
      })
      let address = orderInfo[0]?.order.customer.contacts[0].address
      let street = address.street ? `${address.street}` : ''
      let ward = address.ward ? `  -${address.ward}` : ''
      let district = address.district ? `-${address.district}` : ''
      let province = address.province ? `-${address.province}` : ''
      let customerAddress = `${street}${ward}${district}${province}`
      this.setState({
        customerPhone1: orderInfo[0].order.customer.contacts[0].phone,
        orderList: orderList,
        items: items,
        price: price,
        origin_price: origin_price,
        customerAddress: customerAddress
      })
      this._fillForm({
        customerCode: customer_code,
        customerName: orderInfo[0].order.customer.full_name,
        customerBirthday: orderInfo[0].order.customer.birthday,
        totalPrice: this.state.price,
        customerGender: orderInfo[0].order.customer.gender,
        cTime: (new Date(orderInfo[0].order.ctime)).toLocaleString(),
        orderStatus: orderInfo[0].order.status,
      })
      this.setIsOrderFound(true)

    }).catch(err => {
      console.log(err)
      this.setNotiMessage('Không tìm thấy hóa đơn!')
    })

  }
  print = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: Letter landscape;
        }`,
      header: null,
      footer: null,
    });
    this.setNotiMessage("Thanh toán thành công!")
    this.props.handleCloseTest()
  }
  handleChangeNote = (event) => {
    this.setState({ note: event.target.value });
  }
  handleChange = (event) => {

    const books = this.state.bookList.filter((item) => {
      return item.id == event.target.value
    })
    if (books.length == 0) return
    this.setState({ currentBook: books[0] })
  }
  handleChangePaymentMethods = (event) => {
    const index = parseInt(event.target.value)
    this.setState({ currentPaymentMethods: this.state.paymentList[index].method })
  }
  handleSubmitCmCode = () => {
    if (!this.state.isOrderFound) {
      this.setNotiMessage("Bạn chưa chọn hóa đơn để thanh toán!")
      return
    }
    this.setState({isOpen: true})
    const { orderId, totalPrice, } = this.state.form
    const { bookId, currentPaymentMethods, note, items, orderList } = this.state
    const { customer_code, billID } = this.props
    if (customer_code && customer_code.length > 0) {
      let promises = [];
      orderList.forEach((el, index) => {
        let transaction = {
          ref: "order",
          ref_id: el.id,
          book_id: bookId,
          amount: el.total,
          type: currentPaymentMethods,
          note: note,
        }
        if (this.state.form.isPayment) {
          this.setNotiMessage("")
        }
        promises.push(transaction)
        // promises.push(TransactionService.postTransaction(transaction))
      })
      // API payment many order
      TransactionService.postManyTransaction(promises).then(
        res => {
          this.print("transactionPrint")
          this.resetForm()
        }
      ).catch(err => console.log(err))
      // Promise.all(promises).then(res => {
      //   this.print("transactionPrint")
      //   this.resetForm()
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  }
  handleSubmit = () => {
    if (this.props.retail) {
      ////// THANH TOÁN ĐƠN THUỐC BÁN LẺ
      const { orderId, totalPrice, } = this.state.form
      const { bookId, currentPaymentMethods, note } = this.state
      let data = {
        // description: this.props.description,
        ref: "retail",
        ref_id: orderId.value,
        book_id: bookId,
        type: currentPaymentMethods,
        note: note,
        amount: totalPrice.value,
      }
      ReceptionService.postTransaction(data).then(res => {
        this.setNotiMessage("Thanh toán thành công!")

        //FOR PHARMACY
        if (this.props.mode === 'pharmacy') {
          this.props.affterPayment();
        }
        //----------------------
        this.resetForm()

      }).catch(err => {
        console.log(err)
      })
    } else {
      ////// THANH TOÁN BÌNH THƯỜNG
      if (!this.state.isOrderFound) {
        this.setNotiMessage("Bạn chưa chọn hóa đơn để thanh toán!")
        return
      }
      const { orderId, totalPrice, } = this.state.form
      const { bookId, currentPaymentMethods, note, items, orderList } = this.state
      const { customer_code, billID, reason } = this.props
      if (billID && billID.length > 0) {
        let transaction = {
          reason: reason,
          ref: "order",
          ref_id: orderId.value,
          book_id: bookId,
          amount: totalPrice.value,
          type: currentPaymentMethods,
          note: note,
        }
        if (this.state.form.isPayment) {
          this.setNotiMessage("")
        }
        ReceptionService.postTransaction(transaction).then(res => {
          this.setNotiMessage("Thanh toán thành công!")
          //FOR PHARMACY
          if (this.props.mode === 'pharmacy') {
            this.props.affterPayment();
          }
          //----------------------
          this.resetForm()

        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
  doneAlert = () => {
    this.setNotiMessage("");

    // PHARMACY
    if (this.props.mode === "pharmacy") {
      this.props.handleClose();
    }
  }
  componentDidMount() {
    this.getAllBookList();
    if (this.props.billID) {
      this.handleSearch(this.props.billID);
    }
    if (this.props.customer_code) {
      this.handleSearchByCustomerCode(this.props.customer_code)
    }
  }
  render() {
    const { orderCode, customerName, customerCode, customerBirthday, totalPrice, customerGender, cTime, orderStatus, note } = this.state.form
    const { notiMessage, customerAddress, price, orderList } = this.state
    const { billID, mode, comboName, retail, customer_code } = this.props;
    return (
      <Col xs={{ size: 10, 'offset': 1 }}>
        <ModalNoti message={notiMessage} done={this.doneAlert} />
        {mode === "reception" && (
          <Col sx={12}>
            <Row className="customCard mt-10 pb-0 naV">
              <Col sm={6} className="row">
                <Label sm={2} className="title-card p-0" href="/"><span className="material-icons">library_books</span> Sổ thu </Label>
                <Col sm={5}>
                  <Input type="select" name="select" onChange={this.handleChange}>
                    {this.state.bookList.map((item) => {
                      return <option key={item.id} value={item.id} >{item.name}</option>
                    })}
                  </Input>
                </Col>
              </Col>
              <Col sm={6} className="row">
                <Label sm={2} className="title-card order-code"><span className="material-icons">playlist_add_check</span>Mã hóa đơn</Label>
                <Col sm={5}>
                  <InputGroup>
                    <Input
                      autoFocus
                      onKeyDown={(e) => Util.onKeyDown(e)}
                      data-index="14"
                      name="orderCode"
                      className="inputAcc"
                      value={billID}
                      onChange={(ev) => { this._setValue(ev, 'orderCode') }}
                      type="text"
                      id="orderCode"
                      placeholder="Nhập mã hóa đơn"
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={() => { this.handleSearch(orderCode.value) }}><span className="material-icons">search</span></Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Col>
              <Col sm={6} className="row">
                <Label sm={2} className="title-card order-code"><span className="material-icons">playlist_add_check</span>Mã bệnh nhân</Label>
                <Col sm={5}>
                  <InputGroup>
                    <Input
                      placeholder='nhập mã bệnh nhân'
                      name="customerCode"
                      className="inputAcc"
                      value={customerCode.value}
                      onChange={(ev) => { this._setValue(ev, 'customerCode') }}
                      type="text"
                      id="customerCode"
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={() => { this.handleSearchByCustomerCode(customer_code) }}><span className="material-icons">search</span></Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Col>

            </Row>

            <Form className="accounting-form">

              <FormGroup className="customCard min-h-40 customer-form">
                <div className="background">
                  <CustomerForm
                    data={{
                      code: customerCode.value, full_name: customerName.value, birthday: customerBirthday.value,
                      gender: customerGender.value, address: customerAddress
                    }}
                  ></CustomerForm>
                </div>
              </FormGroup>

              <FormGroup className="customCard info-form">
                <p className="title-card"><span className="material-icons">description</span> Thông tin đơn hàng</p>
                <FormGroup row>
                  <Col sm={12}>
                    <OrderTable
                      items={this.state.items}
                    ></OrderTable>
                  </Col>
                </FormGroup>
                <FormGroup row>

                  <Label for="totalPrice" sm={4}>Tổng số tiền giá gốc(bằng số)</Label>
                  <Col sm={6}>
                    <NumberFormat className="inputAc"
                      value={this.state.origin_price}
                      name="totalPrice"
                      thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(this.state.origin_price)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="totalPrice" sm={4}>Tổng số tiền(bằng số)</Label>
                  <Col sm={6}>
                    <NumberFormat className="inputAc"
                      value={totalPrice.value}
                      onChange={(ev) => { this._setValue(ev, 'totalPrice') }}
                      name="totalPrice"
                      thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(totalPrice.value)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="wordPrice" sm={4}>Tổng số tiền(bằng chữ)</Label>
                  <Col sm={6}>
                    <Input className="inputAcc"
                      readOnly
                      type="text"
                      name="wordPrice"
                      id="wordPrice"
                      value={(totalPrice.value ? moneyToWord(totalPrice.value) : 'Miễn Phí').toUpperCase()}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="getTime" sm={4}>Thời gian tạo đơn</Label>
                  <Col sm={6}>
                    <Input type="text" name="totalPrice"
                      className="inputAcc"
                      value={cTime.value}
                      onChange={(ev) => { this._setValue(ev, 'getTime') }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="getStatus" sm={4}>Trạng thái thanh toán</Label>
                  <Col sm={6}>
                    <Input type="text" name="status"
                      className="inputAcc"
                      value={orderStatus.value ? (orderStatus.value === "paid" ? 'đã thanh toán' : 'chưa thanh toán') : ''}
                      onChange={(ev) => { this._setValue(ev, 'status') }}
                    />
                  </Col>
                </FormGroup>
              </FormGroup>


              <FormGroup row className="customCard money-form">
                <Label sm={3} className="title-card"><span className="material-icons">monetization_on</span> Thanh toán hóa đơn</Label>
                <Col sm={2}>
                  <Input onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="15"
                    type="select" name="select" onChange={this.handleChangePaymentMethods}
                  >
                    {this.state.paymentList.map((item, index) => {
                      return <option key={item.method} value={index} >{item.name}</option>
                    })}
                  </Input>
                </Col>
                <Col sm={5}>
                  <Input value={note}
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="16" onChange={this.handleChangeNote}
                    type="text"
                    placeholder="điền thông tin giao dịch" />
                </Col>
                <Col sm={2} className="end pl-0">
                  <Button
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="17"
                    onClick={() => {
                      this.handleSubmit();
                      this.props.submitForm();
                      this.props.handleClose();

                    }}
                    hidden={!this.props.billID}
                    disabled={orderStatus.value == STATUS.PAID}
                  >
                    <Spinner
                      color="primary"
                      className={this.state.submitLoading ? "d-inline-block" : "d-none"} />
                    Thanh Toán
                  </Button>{' '}
                  <Button
                    onClick={() => {
                      this.handleSubmitCmCode()
                      this.props.handleResetForm()
                      // this.props.handleCloseTest()
                    }}
                    disabled={orderStatus.value == STATUS.PAID}
                    hidden={!this.props.customer_code}
                  >
                    <Spinner
                      color="primary"
                      className={this.state.submitLoading ? "d-inline-block" : "d-none"} />
                    Thanh Toán
                  </Button>{' '}
                </Col>
              </FormGroup>
            </Form>
           <Modal isOpen={this.state.isOpen}> <AccountingPrintingPreview data={this.state.form} items={this.state.items} customerAddress={customerAddress} customerPhone={this.state.customerPhone1} /></Modal>

            {/* </AccountingPrintingPreview> */}
          </Col>

        )}
        {mode === "pharmacy" && (
          <Col sx={12}>
            <Row className="customCard mt-3 pb-0">
              <Col sm="6" className="row pl-0">
                <Label sm="2" className="title-card p-0" href="/"><span className="material-icons">library_books</span> Sổ thu </Label>
                <Col sm="8">
                  <Input type="select" name="select" onChange={this.handleChange}>
                    {this.state.bookList.map((item) => {
                      return <option key={item.id} value={item.id} >{item.name}</option>
                    })}
                  </Input>
                </Col>
              </Col>
              <Col sm="6" className="row">
                <Label sm={4} className="title-card"><span className="material-icons">playlist_add_check</span>Mã hóa đơn</Label>
                <Col sm={8}>
                  <InputGroup>
                    <Input
                      autoFocus
                      onKeyDown={(e) => Util.onKeyDown(e)}
                      data-index="14"
                      name="orderCode"
                      className="inputAcc"
                      value={billID}
                      onChange={(ev) => { this._setValue(ev, 'orderCode') }}
                      type="text"
                      id="orderCode"
                      placeholder="Nhập mã hóa đơn"
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={() => { this.handleSearch(orderCode.value) }}><span className="material-icons">search</span></Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Col>
            </Row>

            <Form>

              <FormGroup className="customCard min-h-32">
                <div className="background">
                  <CustomerForm
                    data={{
                      code: customerCode.value, full_name: retail ? this.props.retailCustomerName : customerName.value, birthday: customerBirthday.value,
                      gender: customerGender.value, address: customerAddress
                    }}
                  ></CustomerForm>
                </div>
              </FormGroup>
              <FormGroup className="customCard">
                <p className="title-card"><span className="material-icons">description</span> Thông tin đơn hàng</p>
                <FormGroup row>
                  <Col sm={12}>
                    <OrderTable items={this.state.items}></OrderTable>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="totalPrice" sm={4}>Tổng số tiền(bằng số)</Label>
                  <Col sm={6}>
                    <NumberFormat className="inputAc"
                      value={totalPrice.value}
                      onChange={(ev) => { this._setValue(ev, 'totalPrice') }}
                      name="totalPrice"
                      thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(totalPrice.value)} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="wordPrice" sm={4}>Tổng số tiền(bằng chữ)</Label>
                  <Col sm={6}>
                    <Input className="inputAcc"
                      readOnly
                      type="text"
                      name="wordPrice"
                      id="wordPrice"
                      value={(totalPrice.value ? moneyToWord(totalPrice.value) : "").toUpperCase()}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="getTime" sm={4}>Thời gian tạo đơn</Label>
                  <Col sm={6}>
                    <Input type="text" name="totalPrice"
                      className="inputAcc"
                      value={cTime.value}
                      onChange={(ev) => { this._setValue(ev, 'getTime') }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="getStatus" sm={4}>Trạng thái thanh toán</Label>
                  <Col sm={6}>
                    <Input type="text" name="status"
                      className="inputAcc"
                      value={orderStatus.value ? (orderStatus.value === "paid" ? 'đã thanh toán' : 'chưa thanh toán') : ''}
                      onChange={(ev) => { this._setValue(ev, 'status') }}
                    />
                  </Col>
                </FormGroup>
              </FormGroup>
              <FormGroup row className="customCard">
                <Label sm={3} className="title-card"><span className="material-icons">monetization_on</span> Thanh toán hóa đơn</Label>
                <Col sm={2}>
                  <Input onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="15"
                    type="select" name="select" onChange={this.handleChangePaymentMethods}
                  >
                    {this.state.paymentList.map((item, index) => {
                      return <option key={item.method} value={index} >{item.name}</option>
                    })}
                  </Input>
                </Col>
                <Col sm={5}>
                  <Input value={note}
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="16" onChange={this.handleChangeNote}
                    type="text"
                    placeholder="điền thông tin giao dịch" />
                </Col>
                <Col sm={2} className="end pl-0">
                  <Button
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="17"
                    onClick={() => {
                      this.handleSubmit();
                      if (this.props.submitForm) {
                        this.props.submitForm();
                        this.props.handleClose();
                      }
                    }}

                    disabled={orderStatus.value == STATUS.PAID}
                  >
                    <Spinner
                      color="primary"
                      className={
                        this.state.submitLoading ? "d-inline-block" : "d-none"
                      }
                    />
                    Thanh Toán
                  </Button>{' '}
                </Col>

              </FormGroup>
            </Form>
          </Col>
        )}

      </Col>
    );
  }
}

export default AccountingForm;