import React from 'react';
import DoctorServices from '../../../Shared/DoctorService';
import { Input, Row, Col } from "reactstrap";
import { Util } from '../../../../../Helper/Util'
import { STEP_TYPE } from "../../../../../Constances/const";
import { Form } from '../../../../../Shared';
import Line from "../../../../../Shared/Components/LineDoctor/Line";
class Diagnosis extends Form {
    constructor(props) {
        super(props);
        this.state = {
            textDiagnosis: '',
            textSymptom: '',
            message: '',
            testResultList: [],
            allergy: ''
        }
    }
    componentDidUpdate = (preProps) => {
        if (preProps.job.id !== this.props.job.id) {
            this.setState({
                textDiagnosis: this.props.job.state.textDiagnosis || "",
                textSymptom: this.props.job.state.textSymptom || "",
            })
            let id = this.props.job.ref_id
            DoctorServices.getOneCustomer(id).then(res => {
                let allergy = res.data.allergy || '';
                this.setState({
                    allergy,
                })
            })
        }
        if (preProps.job.id !== this.props.job.id &&
            this.props.job &&
            this.props.job.steps &&
            this.props.job.steps.length
        ) {
            let testResultList = this.props.job.steps.filter(s => s.type === STEP_TYPE.TEST);
            this.setState({ testResultList });
        }
    }
    onBlurDiagnosis = () => {
        let { job } = this.props
        const id = job.id;
        let idCm = job.ref_id
        if (this.state.textDiagnosis !== '' || this.state.textSymptom !== '') {
            DoctorServices.postSubclinical({
                id,
                state: {
                    textSymptom: this.state.textSymptom,
                    textDiagnosis: this.state.textDiagnosis,
                }
            }).then(res => {
                job.state = job.state || {};
                job.state.textDiagnosis = this.state.textDiagnosis;
                job.state.textSymptom = this.state.textSymptom;
            })
            this.props.onChangetextDiagnosis(this.state.textDiagnosis)
        }
        if (this.state.allergy !== '') {
            DoctorServices.postAllergyToCus(idCm, {
                allergy: this.state.allergy
            }).then(res => {
                console.log('Thành Công', res);
            })
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className='Diagnosis'>
                <Row className="allergy">
                    <Col className="title_allergy p-0" sm="1">
                    <p className="title-card text-danger"><span className="material-icons">playlist_add_check</span>Dị ứng</p>
                    </Col>
                    <Col>
                        <Input
                            className="form-control value_allergy"
                            name="allergy"
                            value={this.state.allergy}
                            onChange={this.onChange}
                            onBlur={this.onBlurDiagnosis}
                            disabled={!this.props.job.id}
                        ></Input>
                    </Col>
                </Row>
                <Line></Line>
                <Row>
                    <p className="title-card"><span className="material-icons">playlist_add_check</span>Triệu chứng</p>
                    <textarea
                        className="form-control symptom"
                        value={this.state.textSymptom}
                        name="textSymptom"
                        onChange={this.onChange} onBlur={() => { this.onBlurDiagnosis() }}
                        disabled={!this.props.job.id}></textarea>
                </Row>
                <Row>
                    <Input
                        value={this.state.textDiagnosis}
                        onKeyDown={(e) => Util.onKeyDown(e)}
                        data-index="6"
                        name="textDiagnosis"
                        onChange={this.onChange} onBlur={() => { this.onBlurDiagnosis() }}
                        disabled={!this.props.job.id}
                        placeholder='Chẩn đoán'
                    ></Input>
                </Row>

            </div>
        )
    }
}
export default Diagnosis;