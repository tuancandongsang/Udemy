import React, { Component } from "react";
import logo from "../../../Asset/Img/logoPK.png"
class HeaderPrint extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="HeaderPrint">
                <div className="logo">
                    <img alt="" className="image" src={logo}></img>
                    <p>
                        <p className="address upper">Phòng Khám Đa Khoa Việt Đoàn</p>
                        <p className="address">Bách Môn, Việt Đoàn, Tiên Du, Bắc Ninh</p>
                        <p className="address">SĐT: 02222208999 - 0869968688</p> 
                    </p>
                </div>
            </div>
        )
    }
}
export default HeaderPrint;
