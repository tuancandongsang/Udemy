import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ListProduct from './Components/ListProduct/ListProduct';
import FormProduct from './Components/FormProduct/FormProduct';
import FormProducer from './Components/Producer/FormProducer';
import FormPart from './Components/FormPart/FormPart';
import ListPart from './Components/FormPart/ListPart';
import FormMaterial from './Components/Material/FormMaterial';
import ListMaterial from './Components/Material/ListMaterial';
class Product extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="Product">
                <Switch>
                    <Route path={`${path}/material/:id`} exact component={FormMaterial} />
                    <Route path={`${path}/material`} exact component={ListMaterial} />
                    <Route path={`${path}/part/:id`} exact component={FormPart} />
                    <Route path={`${path}/part`} exact component={ListPart} />
                    <Route path={`${path}/producer/:id`} exact component={FormProducer} />
                    <Route path={`${path}/:id`} exact component={FormProduct} />
                    <Route path={`${path}`} exact component={ListProduct} />
                </Switch>
            </div>
        );
    }
}

export default Product