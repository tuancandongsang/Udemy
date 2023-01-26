import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FormPharmacy from './Components/FormPharmacy/FormPharmacy';



class Pharmacy extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="Pharmacy pl-20 pr-20">
                <Switch>
                    <Route path={`${path}`} exact component={FormPharmacy} />
                </Switch>
            </div>
        );
    }
}

export default Pharmacy