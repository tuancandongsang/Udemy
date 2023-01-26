import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import NumberFormat from 'react-number-format';

const OrderTable = (props) => {
  let { items, orderInfo } = props;
  // const [orderList, setOrderList] = useState([])

  useEffect(() => {
  }, [items, orderInfo])
  if (orderInfo && orderInfo.length > 0){
    return (
      <Table hover bordered>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên dịch vụ</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {orderInfo?.filter(e=> e.quantity >0).map((item, index) => (

            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.order.items[0].ref_value.name}</td>
              <td><NumberFormat thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(item.order.total)} /></td>
              <td>
                {item.order.items[0].quantity}
              </td>


            </tr>
          ))}
        </tbody>
      </Table>
    );
  }else{
    return (
      <Table hover bordered>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên dịch vụ</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          {items?.filter(e=> e.quantity >0).map((item, index) => (

            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.ref_value.name}</td>
              <td><NumberFormat thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(item.price)} /></td>
              <td>
                {item.quantity}
              </td>


            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
    
}

export default OrderTable;