import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TestCovid from '../TestCovid/TestCovid'
class Test extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div>
                <Switch>
                    <Route exact path={`${path}`} component={TestCovid} />
                    {/* <Route exact path={`${path}/print/:id`} component={ReceiptPrintingPreview}/> */}
                </Switch>
            </div>
        );
    }
}

export default Test