import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { ModalConfirm, STATUS, ORDER_TYPE} from "../Shared";

class ModalOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notiConfirm: '',
      index: -1,
    };
  }

  onClickOrder = (ev, index) => {
    this.setState({
      notiConfirm: 'Chắc chắn chọn đơn này?',
      index,
    })
  }
  answer = (isYes) => {
    if (isYes) {
      this.props.onSelectOrder(this.state.index);
      this.setState({
        notiConfirm: '', index: -1,
      })
    } else {
      this.setState({
        notiConfirm: '',
        index: -1,
      })
    }
  }
  render() {
    let { listOrder } = this.props;
    let item = listOrder.map((l, index) => {
      let time = l.order ? new Date(l.order.ctime) : 0;
      return (
        <tr key={index} className="pointer" onClick={(ev) => this.onClickOrder(ev, index)}>
          <td> {index + 1}</td>
          <td>{l.code}</td>
          {/* <td></td> */}
          <td>{l.order ? l.order.type === ORDER_TYPE.ETC.code ? ORDER_TYPE.ETC.label : l.order.type === ORDER_TYPE.OTC.code ? ORDER_TYPE.OTC.label : l.order.type === ORDER_TYPE.OTHER.code? ORDER_TYPE.OTHER.label : '' : null}</td>
          <td>{l.order ? l.order.status === STATUS.DONE? 'Đã xong' : l.order.status === STATUS.PAID ? 'Đã thanh toán' : 'Chưa thanh toán' : null}</td>
          <td>{time !== 0 ? time.toLocaleString('en-GB') : null}</td>
          <td>
            {l.order ? l.order.items.map((p, i) => {
              return <span key={i}>{p.ref_value?.name}, </span>
            }) : null}
          </td>
          <td>{ new Intl.NumberFormat('de-DE').format(l.order ? l.order.total : 0) }đ</td>
          {/* <td>{ l.result? l.result.instruction? l.result.instruction : null : null}</td> */}
        </tr>
      )
    });
    return (
      <Fragment>
        <Table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn</th>
              {/* <th>Bác sĩ</th> */}
              <th>Loại đơn</th>
              <th>Trạng thái</th>
              <th>Ngày tạo </th>
              <th>Thuốc</th>
              <th>Thành tiền</th>
              {/* <th>Chẩn đoán</th> */}
            </tr>
          </thead>
          <tbody className="bodyTable">
            {item}
          </tbody>
        </Table>
        <ModalConfirm message={this.state.notiConfirm} answer={this.answer} ></ModalConfirm>
      </Fragment>

    );
  }
}

export default ModalOrder;
