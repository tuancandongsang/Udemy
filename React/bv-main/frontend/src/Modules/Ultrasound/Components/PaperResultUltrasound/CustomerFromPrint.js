import React from "react";
import ShareService from "../../../../Shared/Services/SharedService";
export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { jobStep } = this.props;
        let order = jobStep ? jobStep.order : {};
        let customer = order ? order.customer : {};
        let date = new Date(order ? order.ctime : 0).toLocaleString('en-GB')
        return (
            <div style={{display:"none"}}>
                <div className="printBarCode" id="barCodeCus">
                    {customer.full_name}<br></br> {customer.birthday}
                    {/* <br></br> */}
                    {/* <b>{customer.code} {date} </b> */}
                    {/* <br></br> */}
                    {/* <br></br> */}
                    <div className="canvas" >
                        <canvas id="canvas_id" style={{height:"13mm",width:"40mm"}}></canvas>
                    </div>
                </div>
            </div>

        );
    }
}