import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from "../../../../Shared/Services/AuthService";
import { ROLE, PRODUCT_UNIT, ROUTE } from "../../../../Constances/const";
import ProductService from "../Shared/ProductService";

class ItemMaterial extends Component {
    

    onDelete = (id) => {
          this.props.onDelete(id);
    };
    check = (index, mat) => {
        console.log("material", mat);
    }

    render() {
        let {listMaterial, index } = this.props;
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td>{listMaterial.name}</td>
                {/* {AuthService.isRole(ROLE.INVENTORY.value) && <td className="origin_price">{listMaterial.origin_price}</td>} */}
                {/* <td className="price">{listMaterial.price}</td> */}
                <td className="unit">
                    {PRODUCT_UNIT.map(u => {
                        if(u.code === listMaterial?.unit)
                        return <span>{u.label}</span>
                    })}
                </td>
                <td className="producer">
                    {listMaterial.producer.name}
                </td>
                <td>{listMaterial?.note}</td>
                {/* <td>
                    <div className="btnControlM">
                            <Link to={`./material/${listMaterial.id}`} >
                                <Button className="action-btnM">
                                    Sửa
                                </Button>
                            </Link>
                        {AuthService.isRole(ROLE.ADMIN.value) || AuthService.isRole(ROLE.INVENTORY.value) ? 
                        <Button className="action-btnM" color="danger" onClick={() => this.onDelete(listMaterial.id)}>
                            Xóa
                        </Button> : null}
                    </div>
                </td> */}
            </tr>
        )
    }
}
export default ItemMaterial;