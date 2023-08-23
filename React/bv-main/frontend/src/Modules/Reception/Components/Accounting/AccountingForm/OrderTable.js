import React, { useEffect } from 'react';
import {  Table } from 'reactstrap';
import NumberFormat from 'react-number-format';

const OrderTable = (props) => {
  let {items,items1} = props;
  useEffect(() => {
  }, [items1]) 

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
        {items?.map((item, index) => (
         
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.ref_value.name}</td>
            <td><NumberFormat thousandSeparator={true} suffix={' VND'} displayType={'text'} value={Math.ceil(item.origin_price)} /></td>
            <td>
              {item.quantity}
            </td>
            
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default OrderTable;