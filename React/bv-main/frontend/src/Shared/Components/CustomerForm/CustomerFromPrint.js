import React from "react";
import { ShareService } from "../..";
export default class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount = () => {
        let { id } = this.props
        ShareService.createBarcode(id)
    }

    render() {

        return (
            <div id="printCode" className="m-0">
                <canvas id="canvas_id" style={{ height:"15mm", width:"35mm"}} ></canvas>
            </div>

        );
    }
}