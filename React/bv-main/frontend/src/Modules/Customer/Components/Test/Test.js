import React, { Component } from 'react';
import CustomerService from '../../Shared/CustomerService';
import ModalNoti from '../../../../Shared/Components/ModalNoti/ModalNoti'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notiMessage: ''
        }
    }

    componentDidMount() {
        CustomerService.getUser().then(res => {
            if (res.status === 201) {
                this.setState({
                    notiMessage: 'Lưu thành công'
                })
                // window.history.back();
            } else {
                this.setState({
                    notiMessage: 'Lưu thất bại'
                })
            }
        })
        CustomerService.getOne(1).then(res=>{

        }).catch(err=> {

        })

    }

    render() {
        return (
            <div>
                <h1>This is test component</h1>
                <p style={{display:'none'}}>djhfgdf</p>
                <button onClick={() => this.setState({ notiMessage: 'Hello world' })}>Show noti</button>
                <ModalNoti message={this.state.notiMessage} done={() => this.setState({ notiMessage: '' })}></ModalNoti>
            </div>
        );
    }
}

export default Test;