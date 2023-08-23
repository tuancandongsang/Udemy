import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReceptionForm from './Components/ReceptionForm/ReceptionForm'
import ReceiptPrintingPreview from './Components/ReceiptPrintingPreview/ReceiptPrintingPreview'
import MedicalHistory from './Components/MedicalHistory/MedicalHistoryForm'

class Service extends Component {
    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Switch>
                    <Route exact path={`${path}/history`} component={MedicalHistory} />
                   
                    <Route exact path={`${path}`} component={ReceptionForm} />
                    <Route exact path={`${path}/print/:id`} component={ReceiptPrintingPreview} />
                </Switch>
            </div>
        );
    }
}

export default Service