import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom"
import { WAREHOUSE_TYPE } from "../../../../Constances/const";
import { Button } from "reactstrap";
class ItemLot extends Component {

  onDelete = (id) => {
    this.props.onDelete(id);
  };
  getDate(timeStamp){
    return new Date(timeStamp)
  }

  
  render() {
    let { listLot, index, currentPage, itemsPerPage } = this.props;
    // let ctime=new Date(listLot.mtime)
      return (
        <Fragment>
          <tr  key={index}>
            <th scope="row">{index + 1 + (currentPage - 1)*itemsPerPage}</th>
            <td>{listLot.code}</td>
            <td>{listLot?.ref_value?.name}</td>
            <td>{listLot.warehouse.name}</td>
            <td>{listLot.total}</td>
            <td>{Math.floor(listLot.remain)}</td>
            <td>{listLot.man_date}</td>
            <td>{listLot.exp_date}</td>
            <td>{new Date(listLot.ctime).toLocaleString("en-gb")}</td>
            <td className="text-center">      
                {
                    listLot.ref === WAREHOUSE_TYPE.CONSUMABLE ? " " :      
                    <Button><Link to={`./lot/${listLot.id}`} className="nounderline">Sửa {" "}</Link></Button>
                }
                {
                listLot.ref === WAREHOUSE_TYPE.CONSUMABLE && listLot.total !== Math.floor(listLot.remain) ? <Button><Link to={`./transaction?lot_id=${listLot.id}`} className="nounderline">Chi tiết</Link></Button> : ""
                }
            </td>
          </tr>
        </Fragment>
      );
    }
}

export default withRouter(ItemLot);
