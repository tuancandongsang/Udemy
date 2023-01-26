import React from "react";
import Barcode from "react-barcode"
export default class PrintBarcode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidUpdate = (preProps) => {
        let { TestId, cm_name } = this.props;
        if (preProps.cm_name !== this.props.cm_name) {
            const arr = cm_name.split(' ')
            this.setState({ name: `${arr[arr.length - 1]}` })
        }
    }
    render() {
        let { TestId, cm_name } = this.props;
        let nameDevice = this.props.nameDevice ? this.props.nameDevice : [];
        return (
            <div style={{ display: "none" }}>
                <div id="barcodeCanvas" style={{ fontSize: "20px" }}>
                    {nameDevice.map((el, index) => {
                        let marginTop = index==0?"0px":"20px";
                        return (
                            <div style={{ display: "flex", flexDirection: "row", minHeight: "94px", marginTop:marginTop }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                    <small>{this.state.name} {el}</small>
                                    <Barcode fontSize="15px" value={TestId[index]} height="35px" />

                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                    <small>{this.state.name} {el}</small>
                                    <Barcode fontSize="15px" value={TestId[index]} height="35px" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}