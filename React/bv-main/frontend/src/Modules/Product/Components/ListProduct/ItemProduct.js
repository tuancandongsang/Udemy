import React, { Component } from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AuthService from "../../../../Shared/Services/AuthService";
import { ROLE, PRODUCT_UNIT, ROUTE } from "../../../../Constances/const";

class ItemProduct extends Component {

    onDelete = (id) => {
          this.props.onDelete(id);
    };

    render() {
        let { listProduct, index} = this.props;
        let listProperties  = this.props.listProduct.partName;
        let itemProperties = listProperties.map((item, index) => {
            return <span href={'/warehouse/'+item } key={index} index={index} > {item} </span>;
        }); 
        return (
            <tr>
                <th scope="row">{index+1}</th>
                <td>{listProduct.name}</td>
                {AuthService.isRole(ROLE.INVENTORY.value) && <td className="price">{listProduct.origin_price}</td>}
                <td className="price">{listProduct.price}</td>
                <td className="unit">
                    {PRODUCT_UNIT.map(u => {
                        if(u.code === listProduct?.unit)
                        return <span>{u.label}</span>
                    })}
                </td>
                <td className="route">
                    {ROUTE.map(r => {
                        if (listProduct?.attrs?.route === r.value)
                            return <span>{r.name}</span>
                    })}
                </td>
                <td className="producer">{listProduct.producerName}</td>
                <td>
                    {itemProperties}
                </td>
                <td>{listProduct.attrs?.description}</td>
                <td>
                    <div className="btnControl">
                        <Link to={`./product/${listProduct.id}`} className="btn btn-secondary btn-sm" >Sửa</Link>
                        {AuthService.isRole(ROLE.ADMIN.value) || AuthService.isRole(ROLE.INVENTORY.value) ? <Button className="btn-sm" color="danger" onClick={() => this.onDelete(listProduct.id)}>Xóa</Button> : null}
                    </div>
                </td>
            </tr>
        )
    }
}
export default ItemProduct;