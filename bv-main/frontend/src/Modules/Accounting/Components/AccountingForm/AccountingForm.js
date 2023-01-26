import React from 'react';
import { Button, Form, FormGroup, Table, Label, Input, Col, Row, InputGroup, InputGroupAddon, Spinner, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { ModalNoti, moneyToWord , FormParent} from '../../Shared';
import OrderTable from './OrderTable'
import TransactionService from "../../../Accounting/Shared/TransactionService";
import CustomerForm from "../../../../Shared/Components/CustomerForm/CustomerForm";
import { Util } from "../../../../Helper/Util";
import NumberFormat from 'react-number-format';
import AccountingPrintingPreview from "../AccountingPrintingPreview/AccountingPrintingPreview";
import printJS from 'print-js';
import { STATUS } from "../../../../Constances/const";
import Clock from '../../../../Shared/Components/DigitalClock/DigitalClock';
class AccountingForm extends FormParent {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      paymentList: [{ name: "Tiền mặt", method: "cash" }, { name: "Thẻ ATM", method: "other" }],
      orderInfoNew: [],
      currentPaymentMethods: 'cash',
      note: '  ',
      isPayment: true,
      notiMessage: '',
      date_pos: " ",
      textCmCode: "",
      canPayment: true,
      form: this._getInitFormData({
        cm_code: '',
        customerCode: '',
        orderCode: '',
        customerName: '',
        customerBirthday: '',
        totalPrice: 0,
        nameService: '',
        priceService: '',
        customerGender: '',
        cTime: '',
        orderStatus: '',
        bookId: '',
      }),
      totalFirst: 0,
      checkItems: [],
      searchOrderCode: "",
      searchCmCode: "",
      isOrderFound: false,
      isShowFound: false,
      isOpen:false,
      // quantity : 1
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
    TransactionService.getBookList(status).then(res => {
      this.setBookList(res.data)
    })
  }

  setIsOrderFound = (isOrderFound) => {
    this.setState({ isOrderFound })
  }
  setIsOpenFound = (isShowFound) => {
    this.setState({ isShowFound })
  }
  setIsPayment = (isPayment) => {
    this.setState({ isPayment })
  }
  setTextCmCode = (textCmCode) => {
    this.setState({ textCmCode })
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
      cm_code: '',
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
    this.setState({
      customerAddress: "",
      items: [],
      orderList: [],
      totalList: 0,
      itemNew: [],
      orderInfoNew: [],
      checkItems: [],
      discount: 0,
    })
    this.setIsOrderFound(false)
  }

  findOrderByCode = (code) => {
    return TransactionService.getOrder(code)
  }
  findOrderByCmCode = (code) => {
    return TransactionService.getListTransaction(code)
  }
  onChangeCmCode = (ev) => {
    this.setState({
      textCmCode: ev.target.value
    })
  }
  handleSearchCmCode = () => {
    this.resetForm();
    let { textCmCode, totalFirst } = this.state;
    let orderList = []
    if (textCmCode.length > 11) {
      this.findOrderByCmCode(textCmCode).then((res) => {
        let orderInfo = res.data
        let orderInfoNew = res.data.filter(e => {
          return e.type != 'buy'
        })
        this.setState({
          orderInfoNew: orderInfoNew,
          textCmCode: "",
          searchCmCode: textCmCode
        })
        let address = orderInfo[0].order.customer.contacts[0].address
        let street = address.street ? `${address.street}` : ''
        let ward = address.ward ? `  -${address.ward}` : ''
        let district = address.district ? `-${address.district}` : ''
        let province = address.province ? `-${address.province}` : ''
        let customerAddress = `${street}${ward}${district}${province}`;
        if (address.province.length > 0 || address.street.length > 0) {
          this.setState({
            customerAddress: customerAddress,
            customerPhone: orderInfo[0].order.customer.contacts[0].phone
          })
        }
        this._fillForm({
          customerCode: orderInfo[0].order.customer.code,
          customerName: orderInfo[0].order.customer.full_name,
          customerBirthday: orderInfo[0].order.customer.birthday,
          totalPrice: '',
          orderId: '',
          customerGender: orderInfo[0].order.customer.gender,
          nameService: '',
          priceService: '',
          cTime: (new Date(orderInfo[0].order.ctime)).toLocaleString(),
          orderStatus: orderInfo[0].order.status,
        })
        let items = [];
        orderInfoNew.map(ev => {
          ev.order.items.map(el => {
            items.push(el);
          })
        })
        items.map(el => {
          totalFirst += el.price
        })
        let discount = orderInfoNew[0].order.items[0].discount * 100;

        if (orderList.length > 0) {
          orderInfoNew.map((step, index) => {
            orderList.map((order, index2) => {
              if (step.order_id !== order.id) {
                orderList.push(step.order)
              }
            })
          })
        } else {
          orderInfoNew.map((step, index) => {
            orderList.push(step.order)
          })

        }
        this.setState({
          discount,
          orderInfo: orderInfo,
          items: items,
          orderList,
          totalFirst
        })
        this.setIsOrderFound(true)
        this.setIsOpenFound(true)
      }).catch(err => {
        console.log(err)
        this.setNotiMessage('Không tìm thấy hóa đơn!')
      })
    }
    else {
      this.setNotiMessage('Vui lòng nhập nhập đủ mã bệnh nhân!')
    }

  }
  handleSearch = (orderCode) => {
    this.findOrderByCode(orderCode).then((res) => {
      let orderInfo = res.data
      let address = orderInfo.view_order.customer.contacts[0].address
      let street = address.street ? `${address.street}` : ''
      let ward = address.ward ? `  -${address.ward}` : ''
      let district = address.district ? `-${address.district}` : ''
      let province = address.province ? `-${address.province}` : ''
      let customerAddress = `${street}${ward}${district}${province}`
      if (address.province.length > 0 || address.street.length > 0) {
        this.setState({
          customerAddress: customerAddress,
          searchOrderCode: orderCode
        })
      }
      this.setState({
        date_pos: res.data.job.date_pos,
        customerPhone: orderInfo.view_order.customer.contacts[0].phone
      })
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

      this.setState({ items: orderInfo.view_order.items })
      this.state.items.every(el => el.quantity == 0) ? this.setState({ canPayment: false }) : this.setState({ canPayment: true })
      this.setIsOrderFound(true)

    }).catch(err => {
      console.log(err)
      this.setNotiMessage('Không tìm thấy hóa đơn!')
    })
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
  handleSubmit = async () => {
    if (!this.state.isOrderFound) {
      this.setNotiMessage("Bạn chưa chọn hóa đơn để thanh toán!")
      return
    }
    const { orderList, searchCmCode, searchOrderCode } = this.state;
    const { orderId, totalPrice, } = this.state.form
    const { bookId, currentPaymentMethods, note } = this.state
    if (searchCmCode.length > 0) {
      if (orderList.length === 1) {
        let transaction = {
          ref: "order",
          ref_id: orderList[0]?.id,
          book_id: bookId,
          amount: orderList[0]?.total,
          type: currentPaymentMethods,
          note: note,
        }
        if (this.state.form.isPayment) {
          this.setNotiMessage("")
        }
        TransactionService.postTransaction(transaction).then(res => {
          this.setNotiMessage("Thanh toán thành công!")
          this.print("transactionPrint")
          this.resetForm()
        }).catch(err => {
          console.log(err)
        })
        this.setState({isOpen: true})
      } else if (orderList.length > 1) {
        let transactions = [];
        orderList.filter(order => order.items.some(item => item.quantity !== 0)).forEach((el, index) => {
          const transaction = {
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
          if (!transactions.some(p => p.ref_id === el.id) ) {
            transactions.push(transaction);
          }
        });
        TransactionService.postManyTransaction(transactions).then(res => {
          this.setNotiMessage("Thanh toán thành công!")
          this.print("transactionPrint")
          this.resetForm()
        }).catch(err => {
          console.log(err)
        })
        this.setState({isOpen: true})
      }
    }

    if (searchOrderCode.length > 0) {
      let transaction = {
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
      TransactionService.postTransaction(transaction).then(res => {
        this.setNotiMessage("Thanh toán thành công!")
        this.print("transactionPrint")
        this.resetForm()
      }).catch(err => {
        console.log(err)
      })
      this.setState({isOpen: true})
    }

  }

  onClickCheckBox = (e, item) => {
    let { checkItems } = this.state;
    if (item.quantity == 0) {
      if (e.target.checked == false) {
        checkItems.splice(checkItems.findIndex(e => e.id == item.id), 1);
        this.setState({
          checkItems,
        })
      } else {
        checkItems.push(item);
        this.setState({
          checkItems,
        })
      }
    }
    else {
      if (e.target.checked == true) {
        checkItems.splice(checkItems.findIndex(e => e.id == item.id), 1);
        this.setState({
          checkItems,
        })
      } else {
        checkItems.push(item);
        this.setState({
          checkItems,
        })
      }
    }
  }
  setSubmmitServiceList = () => {
    let { checkItems, orderList } = this.state;
    let { totalPrice } = this.state.form;
    if (checkItems.length > 0) {
      let itemEdit = []
      checkItems.map(e => {
        if (e.quantity > 0) {
          itemEdit.push({
            id: e.id,
            quantity: 0
          })
        }
        else {
          itemEdit.push({
            id: e.id,
            quantity: 1
          })
        }
      })
      TransactionService.postEditOrder(itemEdit).then(res => {
        res.data.forEach((el, index) => {
          orderList.forEach((ev, indexList) => {
            if (el.id === ev.id) {
              orderList[indexList] = el
            }
          })
        })
        let newItems = [];
        let totalList = 0;
        orderList.map(e => {
          totalList += e.total
          e.items.map(el => {
            newItems.push(el)
          })
        })
        totalPrice.value = totalList;
        newItems.every(el => el.quantity == 0) ? this.setState({ canPayment: false }) : this.setState({ canPayment: true })
        this.setState({
          checkItems: [],
          orderList,
          items: newItems,
          totalPrice
        })

      }).catch(err => {
        console.log(err);
      })
    }
    else {
      let items = this.state.items;
      let itemNew = []
      let total = 0
      itemNew = items.filter(el => {
        return el.quantity == 1
      })
      itemNew.map(ev => {
        if (ev.quantity > 0) {
          total += ev.price
        }
      })
      totalPrice.value = total
      this.setState({
        items: itemNew,
        totalPrice
      })
    }
    this.setIsOpenFound(false)
  }
  doneAlert = () => {
    this.setNotiMessage("");
  }
  componentDidMount() {
    this.getAllBookList();
  }
  print = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: Letter portrait;
        }`,
      header: null,
      footer: null,
    });
    this.setNotiMessage("Thanh toán thành công!")
  }
  render() {
    const { orderCode, customerName, customerCode, customerBirthday, totalPrice, customerGender, cTime, orderStatus, note, cm_code } = this.state.form
    const { notiMessage, customerAddress, date_pos, customerPhone, discount, orderInfoNew, textCmCode, canPayment } = this.state;
    const { resXray, resUltrasound, resTest, resEnt } = this.props
    let items = this.state.items ? this.state.items : [];
    let origin_total = 0;
    items.filter(el => el.quantity > 0).map(el => {
      origin_total += el.origin_price
    })
    let discount_price = 0;
    discount_price = parseInt(origin_total) - parseInt(totalPrice.value);
    return (
      <Col xs={{ size: 10, 'offset': 1 }}>
        <ModalNoti message={notiMessage} done={this.doneAlert} />
        <div className="end">
          <Clock></Clock>
        </div>
        <Col sx={12}>
          <Row className="customCard naV">
            <Col sm={4} className=" pl-0 library-book">
              <Label sm={2} className="title-card p-0" href="/"><span className="material-icons">library_books</span> Sổ thu </Label>
              <Col sm={4}>
                <Input type="select" name="select" onChange={this.handleChange}>
                  {this.state.bookList.map((item) => {
                    return <option key={item.id} value={item.id} >{item.name}</option>
                  })}
                </Input>
              </Col>
            </Col>
            <Col sm={4} className="library-book">
              <Label sm={4} className="title-card order-code"><span className="material-icons">playlist_add_check</span>Mã bệnh nhân</Label>
              <Col sm={3} className="input-code">
                <InputGroup>
                  <Input
                    autoFocus
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="1"
                    name="cm_code"
                    className="inputAcc"
                    value={resEnt || resTest || resUltrasound || resXray || textCmCode}
                    onChange={(ev) => { this.onChangeCmCode(ev) }}
                    type="text"
                    id="cm_code"
                    placeholder="Nhập mã bệnh nhân"
                    required
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      onKeyDown={(e) => Util.onKeyDown(e)}
                      data-index="2"
                      className="SearchReceipt"
                      color="primary" onClick={() => { this.handleSearchCmCode() }}><span className="material-icons">search</span></Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Col>
            <Col sm={4} className="library-book">
              <Label sm={3} className="title-card order-code"><span className="material-icons">playlist_add_check</span>Mã hóa đơn</Label>
              <Col sm={3} className="input-code">
                <InputGroup>
                  <Input
                    onKeyDown={(e) => Util.onKeyDown(e)}
                    data-index="2"
                    name="orderCode"
                    className="inputAcc"
                    onChange={(ev) => { this._setValue(ev, 'orderCode') }}
                    type="text"
                    id="orderCode"
                    placeholder="Nhập mã hóa đơn"
                    required
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      onKeyDown={(e) => Util.onKeyDown(e)}
                      className="SearchReceipt"
                      data-index="3"
                      color="primary" onClick={() => { this.handleSearch(orderCode.value) }}><span className="material-icons">search</span></Button>
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
              <p className="title-card info-1"><span className="material-icons">description</span> Thông tin đơn hàng</p>
              <FormGroup row>
                <Col sm={11} className="table-acc">
                  <OrderTable items={this.state.items}></OrderTable>
                </Col>
              </FormGroup>
              <FormGroup row className="sum-moneyText p-1r">
                <Label for="wordPrice" sm={4}>Gía gốc</Label>
                <Col sm={6} className="dflex-center">
                  <NumberFormat className="inputAc"
                    // value={origin_total}
                    // onChange={(ev) => { this._setValue(ev, 'totalPrice') }}
                    name="totalPrice"
                    thousandSeparator={true} suffix={' VNĐ'} displayType={'text'} value={Math.ceil(origin_total)} />
                </Col>
              </FormGroup>
              <FormGroup row className="sum-moneyText p-1r">
                <Label for="wordPrice" sm={4}>Tổng tiền khuyến mãi</Label>
                <Col sm={6} className="dflex-center">
                  <NumberFormat className="inputAc"
                    // value={discount_price}
                    // onChange={(ev) => { this._setValue(ev, 'totalPrice') }}
                    name="discount_price"
                    thousandSeparator={true} suffix={' VNĐ'} displayType={'text'} value={Math.ceil(discount_price)} />
                </Col>
              </FormGroup>
              <FormGroup row className="sum-moneyNumber p-1r">
                <Label for="totalPrice" sm={4}>Tổng số tiền thanh toán(bằng số)</Label>
                <Col sm={6} className="dflex-center">
                  <NumberFormat className="inputAc"
                    // value={totalPrice.value}
                    onChange={(ev) => { this._setValue(ev, 'totalPrice') }}
                    name="totalPrice"
                    thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(totalPrice.value)} />
                </Col>
              </FormGroup>
              <FormGroup row className="sum-moneyText p-1r">
                <Label for="wordPrice" sm={4}>Tổng số tiền(bằng chữ)</Label>
                <Col sm={6} className="dflex-center">
                  <Input className="inputAcc"
                    readOnly
                    type="text"
                    name="wordPrice"
                    id="wordPrice"
                    value={(totalPrice.value ? moneyToWord(totalPrice.value) : "").toUpperCase()}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="time-create p-1r">
                <Label for="getTime" sm={4}>Thời gian tạo đơn</Label>
                <Col sm={6} className="dflex-center">
                  <Input type="text" name="totalPrice"
                    className="inputAcc"
                    value={cTime.value}
                    onChange={(ev) => { this._setValue(ev, 'getTime') }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="status-acc p-1r">
                <Label for="getStatus" sm={4}>Trạng thái thanh toán</Label>
                <Col sm={6} className="dflex-center">
                  <Input type="text" name="status"
                    className="inputAcc"

                    onChange={(ev) => { this._setValue(ev, 'status') }}
                  />
                </Col>
              </FormGroup>
            </FormGroup>


            <FormGroup row className="customCard money-form ">
              <Label sm={3} className="title-card"><span className="material-icons">monetization_on</span> Thanh toán hóa đơn</Label>
              <Col sm={2}>
                <Input onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="4"
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
                  data-index="5" onChange={this.handleChangeNote}
                  type="text"
                  placeholder="điền thông tin giao dịch" />
              </Col>
              <Col sm={2} className="end pl-0">
                <Button
                  onKeyDown={(e) => Util.onKeyDown(e)}
                  data-index="6"
                  onClick={this.handleSubmit}
                  disabled={orderStatus.value == STATUS.PAID || canPayment === false}
                >
                  <Spinner
                    color="primary"
                    className={this.state.submitLoading ? "d-inline-block" : "d-none"} />
                  Thanh Toán
                </Button>{' '}
              </Col>

            </FormGroup>
          </Form>
        </Col>
        <Modal isOpen={this.state.isShowFound}>
          <ModalHeader>Danh sách dịch vụ thanh toán</ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Tùy chọn</th>
                  <th>Tên dịch vụ</th>
                  <th>Số lượng</th>
                  <th>Giá</th>

                </tr>
              </thead>
              {orderInfoNew.map((el, indexStep) => {
                return (
                  <tbody key={el.id}>
                    <tr>
                      {
                        el.order.items.length > 0 ? <td colSpan={4}>{
                          el.location.name
                        }</td> : null
                      }
                    </tr>
                    {el.order.items.map((ev, indexItem) => {
                      return (
                        <tr key={ev.id}>
                          <td>{indexItem + 1}</td>
                          <td>
                            <Input type="checkbox"
                              defaultChecked={ev.quantity == 1 ? true : false}
                              onClick={e => this.onClickCheckBox(e, ev, indexStep, indexItem)}>
                            </Input>
                          </td>
                          <td>{ev.ref_value.name}</td>
                          <td>{ev.quantity}</td>
                          <td>{ev.ref_value.price}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                )
              })}
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { this.setSubmmitServiceList() }}>Hoàn thành</Button>
            <Button onClick={() => {
              this.setIsOpenFound(false)
              this.resetForm()
            }} color="danger">Đóng</Button>
          </ModalFooter>
        </Modal>
        {/* <Modal isOpen={this.state.isOpen}>
        <Button onClick={() =>{this.setState({isOpen:false})}}>Close</Button> */}
        <AccountingPrintingPreview data={this.state.form} items={this.state.items} customerAddress={customerAddress} customerPhone={customerPhone} date_pos={date_pos}></AccountingPrintingPreview>
        {/* </Modal> */}
      </Col>
    )
  }
}

export default AccountingForm;