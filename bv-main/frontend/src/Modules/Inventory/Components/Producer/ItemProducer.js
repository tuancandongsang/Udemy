import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom"
import { Button } from "reactstrap";

class ItemProducer extends Component {

    onDelete = (id) => {
        this.props.onDelete(id);
    };

    render() {
        let { listProducer, index } = this.props;
        return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td  className="ID">{listProducer.id}</td>
                    <td className="name">{listProducer.name}</td>
                    <td>{listProducer.description}</td>
                    <td >
                        <div>            
                            <Link to={`./producer/${listProducer.id}`} className="btn btn-primary btn-sm" >Sửa {" "}</Link>
                            {" "}<Button className="btn-sm" color="danger" onClick={() => this.onDelete(listProducer.id)}>Xóa</Button>
                        </div>
                    </td>
                </tr>
        );
    }
}

export default withRouter(ItemProducer);
