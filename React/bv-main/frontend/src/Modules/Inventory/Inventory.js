import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// import { AuthService } from '../../';
// import { ROLE } from '../../../Constances/const';

import ListLot from './Components/Lot/ListLot';
import FormLot from './Components/Lot/FormLot';
import ListProducer from './Components/Producer/Listproducer';
import FormProducer from './Components/Producer/FormProducer'
import ListTransaction from './Components/Transaction/ListTransaction';
import FormTransaction from './Components/Transaction/FormTransaction';

class Inventory extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="Inventory">
                <Switch>
                    <Route exact path={`${path}`} render={() => (<Redirect to="inventory/transaction/create" ></Redirect>)}></Route>
                    <Route path={`${path}/lot/:id`} exact component={FormLot} />
                    <Route path={`${path}/lot`} exact component={ListLot} />
                    <Route path={`${path}/transaction/create`} exact component={FormTransaction} />
                    <Route path={`${path}/transaction`} exact component={ListTransaction} />
                    <Route path={`${path}/producer`} exact component={ListProducer} />
                    <Route path={`${path}/producer/:id`} exact component={FormProducer} />
                </Switch>
            </div>
        );
    }
}

export default Inventory