import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";



class ItemLocationType extends Component {

  onDelete = (id) => {
    this.props.onDelete(id);
  };

  render() {
    let { typeList, index } = this.props;
    return (
      <tbody key={index}>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{typeList.code}</td>
          <td>{typeList.name}</td>
          <td>
            <div className="btnControl">
              <Link to={`./type/${typeList.id}`} className="btn btn-primary btnPrimary">
                Sửa
              </Link>
              <Button color="danger" onClick={() => this.onDelete(typeList.id)}>
                Xóa
              </Button>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default ItemLocationType;
