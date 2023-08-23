import React from 'react';
import { Col, Row, Input } from 'reactstrap';
import DoctorServices from '../../../Shared/DoctorService'
import { Form } from '../../../../../Shared';
import { Util } from '../../../../../Helper/Util';
class PreExamination extends Form {
    constructor(props) {
        super(props);
        this.state = {
            blood: '',
            height: '',
            temp: '',
            weight: '',
            // allergy: ''
        }
    }

    componentDidUpdate = (preProps) => {
        if (preProps.job.id !== this.props.job.id) {
            let blood = this.props.job.state.subclinical.blood || '';
            let height = this.props.job.state.subclinical.height || '';
            let temp = this.props.job.state.subclinical.temp || '';
            let weight = this.props.job.state.subclinical.weight || '';
            this.setState({
                blood,
                height,
                temp,
                weight,

            })
           
        }
    }

    onHandelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onBlurDiagnosis = () => {
        let { job } = this.props;
        
        let subclinical = {
            blood: this.state.blood,
            temp: this.state.temp,
            weight: this.state.weight,
            height: this.state.height
        }
        DoctorServices.postSubclinical({
            id: job.id,
            state: {
                subclinical
            }
        }).then(res => {
            job.state = job.state || {};
            job.state.subclinical = subclinical;
        })
        let allergy = this.state.allergy;

       
    }

    render() {
        let { temp, height, weight, blood } = this.state
        return (
            <div className="PreExamination ">
                <Row>
                    <p className="title-card"><span className="material-icons">create</span> Dấu hiệu sống</p>
                    <Col>
                        <Row className="info">
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Nhiệt độ:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="1"
                                            name="temp"
                                            value={temp}
                                            onChange={e => this.onHandelChange(e)}
                                            onBlur={() => { this.onBlurDiagnosis() }}
                                            disabled={!this.props.job.id}
                                        ></Input>
                                        <p className="m-1"> °C</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Huyết áp:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="2"
                                            name="blood"
                                            value={blood}
                                            onChange={e => this.onHandelChange(e)}
                                            onBlur={() => { this.onBlurDiagnosis() }}
                                            disabled={!this.props.job.id}
                                        >
                                        </Input>
                                        <p className="m-1">mmHg</p>
                                        
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="info">
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Cân nặng:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input name="weight"
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="3"
                                            value={weight}
                                            onChange={e => this.onHandelChange(e)}
                                            onBlur={() => { this.onBlurDiagnosis() }}
                                            disabled={!this.props.job.id}
                                        ></Input>
                                        <p className="m-1">KG</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Row className="mb-0">
                                    <Col sm={4}>
                                        <span>Chiều cao:</span>
                                    </Col>
                                    <Col className="m-0 p-0">
                                        <Input name="height"
                                            onKeyDown={(e) => Util.onKeyDown(e)}
                                            data-index="4"
                                            value={height}
                                            onChange={e => this.onHandelChange(e)}
                                            onBlur={() => { this.onBlurDiagnosis() }}
                                            disabled={!this.props.job.id}
                                        ></Input>
                                        <p className="m-1">CM</p>
                                        
                                    </Col>
                                   
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* <Row>
                    <p className="title-card text-danger"><span className="material-icons">playlist_add_check</span>Dị ứng</p>
                    <textarea
                        className="form-control allergy"
                        name="allergy"
                        value={this.state.allergy}
                        onChange={e => this.onChange(e)}
                        onBlur={this.onBlurDiagnosis}
                        disabled={!this.props.job.id}
                    ></textarea>
                </Row> */}
            </div>
        );
    }
}
export default PreExamination;