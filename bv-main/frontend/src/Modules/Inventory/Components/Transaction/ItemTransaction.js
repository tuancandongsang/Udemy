import React, { Component } from "react";
import { ConvertAmountLotRemain } from "../Shared/InventoryCommon";
import { WAREHOUSE_TYPE } from "../../../../Constances/const";
class ItemTransaction extends Component {

  onDelete = (id) => {
    this.props.onDelete(id);
  };

  render() {
    let { listTransaction, index, currentPage, itemsPerPage } = this.props;
    let ctime = new Date(listTransaction.ctime)
    return (
          <tr key={index}>
            <th scope="row">{index + 1 + (currentPage - 1)*itemsPerPage}</th>
            <td className="batchName">{listTransaction?.lot_code}</td> 
            <td>{listTransaction.name}</td>
            <td>{listTransaction?.warehouse_name}</td>
            {
              listTransaction.type_name === WAREHOUSE_TYPE.PRODUCT? 
                <td className="amount">{listTransaction.amount}</td>
              : 
                <td className="amount">{ConvertAmountLotRemain(listTransaction.amount)}</td>
            }
            <td>{ctime.toLocaleString('en-GB')}</td>
            </tr> 
    );
  }
}

export default ItemTransaction;
