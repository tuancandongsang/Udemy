import React from 'react';
import { Form } from '../../../../Shared';
import DoctorServices from '../../Shared/DoctorService';
import LocationSelecter from '../../../../Shared/Components/LocationSelecter/LocationSelecter';
import { withRouter } from 'react-router';
import {LOCATION_TYPE,LOCALSTORAGE} from '../../../../Constances/const'
class Main extends Form {
    constructor(props) {
        super(props);
        this.state = {
            locationList: [],
        }
    }
    componentDidMount() {
        window.sessionStorage.removeItem(LOCALSTORAGE.LOCATION)
        DoctorServices.getListLocation().then(res => {
            const result = res.data.filter((item) => item.type === LOCATION_TYPE.EXAMINATION||item.type===LOCATION_TYPE.EMERGENCY);
            this.setState({
                locationList: result,
            })
        }
        )
        const location_id = localStorage.getItem('location_id');
        this.onLoadLocation(location_id);      
    }
    onLoadLocation = (location_id)=>{
        if(location_id){
            this.props.history.push('doctor/room/' + location_id);
        }
    }

    onSelect = (id, name) => {
        this.props.history.push('doctor/room/' + id);
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <LocationSelecter 
                    list={this.state.locationList} 
                    onSelect={this.onSelect}                    
                ></LocationSelecter>
            </div>
        );
    }
}

export default withRouter(Main)
