import React, { Component, Fragment } from "react";
import { Table, Input, Col, Row, ModalBody, Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { PRODUCT_UNIT } from "../../../../Accounting/Shared";

class DrugShowHis extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let item = this.props.item;
        return(
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Thuốc</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   item.order.items.map( e => {
                                return (
                                    <tr>
                                        <td>{e.ref_value.name}</td>
                                        <td>{e.quantity}</td>
                                        <td>{PRODUCT_UNIT.map(u => {
                                            if (u.code === e?.ref_value.unit)
                                            return <span>{u.label}</span>
                                        })}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default DrugShowHis