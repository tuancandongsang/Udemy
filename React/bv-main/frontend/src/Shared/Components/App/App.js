import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import { AuthService } from "../../";
import { ROLE } from "../../../Constances/const";
import Exam from '../../../Modules/Exam/Exam';
import Customer from '../../../Modules/Customer/Components/Customer/Customer';
import Location from '../../../Modules/Location/Location';
import Org from '../../../Modules/Org/Org';
import Service from '../../../Modules/Service/Service';
import User from '../../../../src/Modules/Org/Components/User/User';
import Product from '../../../Modules/Product/Product';
import Reception from '../../../Modules/Reception/Reception'
import Doctor from '../../../Modules/Doctor/Doctor';
import Inventory from '../../../Modules/Inventory/Inventory';
import Pharmacy from '../../../Modules/Pharmacy/Pharmacy';
import Transaction from '../../../Modules/Accounting/Transaction';
import Xray from "../../../Modules/X-ray/Xray";
import Endoscopic from "../../../Modules/Endoscopic/Endoscopic";
import Ultrasound from "../../../Modules/Ultrasound/Ultrasound";
import UpdateCustomer from '../../../Modules/UpdateCustomer/UpdateCustomer'
import Test from '../../../../src/Modules/TestCovid/Test'
import Report from "../../../Modules/Report/Report"; 

class App extends React.Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="App">
                <AppHeader></AppHeader>
                <Switch>
                    <Route exact path={`${path}`} render={() => {
                        if (AuthService.hasRole(ROLE.RECEPTIONIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/reception" ></Redirect>)
                        }else if  (AuthService.hasRole(ROLE.RECEPTIONIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/transaction/order" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.DOCTOR) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/doctor" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.TEST_OPERATOR) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/exam" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.ACCOUNTER) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/reception" ></Redirect>)
                        } else if (AuthService.hasRole(ROLE.PHARMACIST) || AuthService.hasRole(ROLE.ADMIN)) {
                            return (<Redirect to="/app/pharmacy" ></Redirect>)
                        } else {
                            return (<Redirect to="/app/org/notauthorized" ></Redirect>)
                        }
                    }}></Route>
                    <Route path={`${path}/updatecustomer`} component={UpdateCustomer} />
                    <Route path={`${path}/order`} component={Transaction} />
                    <Route path={`${path}/reception`} component={Reception} />
                    <Route path={`${path}/transaction`} component={Transaction} />
                    <Route path={`${path}/test`} component={Test} />
                    <Route path={`${path}/doctor`} component={Doctor} />
                    <Route path={`${path}/exam`} component={Exam} />
                    <Route path={`${path}/pharmacy`} component={Pharmacy} />
                    <Route path={`${path}/customer`} component={Customer} />
                    <Route path={`${path}/location`} component={Location} />
                    <Route path={`${path}/service`} component={Service} />
                    <Route path={`${path}/product`} component={Product} />
                    <Route path={`${path}/inventory`} component={Inventory} />
                    <Route path={`${path}/org`} component={Org} />
                    <Route path={`${path}/user`} component={User} />
                    <Route path={`${path}/xray`} component={Xray} />
                    <Route path={`${path}/endoscopic`} component={Endoscopic} />
                    <Route path={`${path}/ultrasound`} component={Ultrasound} />
                  
                    <Route path={`${path}/report`} component={Report} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
