import React from 'react';
import { FormGroup } from 'reactstrap';
import { FormParent } from '../../../Reception/Shared';
import TransactionService from '../../Shared/TransactionService';
import { ROLE, ALL } from "../../Shared";
import TransPharmacy from './TransPharmacy';
class TransactionFormPharmacy extends FormParent {
  constructor(props) {
    super(props);
    this.state = {
      listUserPharmacy: [],
    }
  };

  getUserList = () => {
    TransactionService.getUserList().then(res => {
      let listUserPharmacy = res.data.filter(u => u.roles[0] === ROLE.PHARMACIST.value || u.roles[0] === ROLE.INVENTORY.value)
      res.data.unshift({ id: ALL.code, full_name: ALL.label })
      this.setState({ listUserPharmacy })
    })
  }


  componentDidMount() {
    this.getUserList()
  }

  render() {
    return (
      <div className="Transaction-Form-Pharmacy ">
          <FormGroup row>
            <TransPharmacy listUserPharmacy={this.state.listUserPharmacy.reverse()} />
          </FormGroup>
        <div className="divNull"></div>
      </div>
    );
  }

}



export default TransactionFormPharmacy;