import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { LOCALSTORAGE } from "../../../Constances/const";

class LocationSelecter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    updateStorage = (locInfo) => {
        sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(locInfo));
    }

    render() {
        let { list, onSelect } = this.props;

        return (
            <div className="locationSelecterContainer customCard">
                 <h1 className="header">Chào mừng đến với Phòng khám Đa Khoa Việt Đoàn </h1>
                <Row className="d-flex justify-content-between">
                    {
                        list && list.length ? list.map(el => {
                            return (
                                <Col sm='4' key={el.id} className="item">
                                    <Button outline color="primary" onClick={() => {
                                        onSelect(el.id, el.name);
                                        this.updateStorage(el);
                                    }}><h2>{el.name}</h2></Button>
                                </Col>
                            )
                        }) : <p>----------------------</p>
                    }
                </Row>

            </div>
    );
  }
}

export default LocationSelecter;
