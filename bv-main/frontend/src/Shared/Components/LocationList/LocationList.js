import React from "react";
import { Row, Col, Button } from "reactstrap";
import { LOCALSTORAGE } from "../../../Constances/const";
import SharedService from '../../Services/SharedService';
import { withRouter } from 'react-router';

class LocationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listLocation: []
        }
    }
    componentDidMount = () => {
        SharedService.getListLocation().then(res => {
            this.setState({
                listLocation: res.data
            })
        }).catch(err => console.log(err))
    }
    onSelect = async (locInfo) => {
        await sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(locInfo));
        await this.goTo('app/login')
    }
    goTo(url = '') {
         url = window.location.origin + '/' + url;
        //  console.log(url);
        window.location.replace(url)
    }
    render() {
        let { listLocation } = this.state;
        return (
            <div className="locationListContainer customCard">
                <h1 className="header">Chào mừng đến với Phòng khám Đa Khoa Việt Đoàn </h1>
                <Row className="d-flex justify-content-between">
                    {
                        listLocation && listLocation.length ? listLocation.map(el => {
                            return (
                                <Col sm='4' className="item">
                                    <Button outline color="primary"
                                        onClick={() => { this.onSelect(el) }}
                                    ><h2>{el.name}</h2></Button>
                                </Col>
                            )
                        }) : <p>----------------------</p>
                    }
                </Row>

            </div>
        );
    }
}

export default withRouter(LocationList);
