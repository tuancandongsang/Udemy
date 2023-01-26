import React, { Component } from "react";
import Diagnosis from "../Diagnosis/Diagnosis";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
class SiderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        let {isOpen,toggle} = this.props
        return (        
        <div className={classNames("sidebar", { "is-open": isOpen })}>
            <Nav vertical className="list-unstyled pb-3">
                <div className="sidebar-header">
                    <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                        &times;
                    </span>
                </div>
                <NavItem>
                    <NavLink></NavLink>
                </NavItem>
            </Nav>
            <Diagnosis></Diagnosis>
        </div>
    );
    }
}

export default SiderBar;
