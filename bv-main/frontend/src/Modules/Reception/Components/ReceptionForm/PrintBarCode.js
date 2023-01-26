import React from "react";
import Barcode from "react-barcode"
export default class PrintBarcode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate = (preProps) => {
        let { customerCode, customerName } = this.props;
    }
    render() {
        let { customerCode, customerName } = this.props;
        return (
            <div style={{ display: "none" }}>
                <div id="barcodeCanvas" >
                    <div style={{ display: "flex", flexDirection: "row", minHeight: "94px"}}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            <small>{customerName}</small>
                            <Barcode fontSize="15px" value={customerCode} height="35px" />

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            <small>{customerName}</small>
                            <Barcode fontSize="15px" value={customerCode} height="35px" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}