import React from "react";
import { Form } from "../../../../Shared";
import instance from "../../Shared/ExamService";
import LocationSelecter from "../../../../Shared/Components/LocationSelecter/LocationSelecter";
import { withRouter } from "react-router";
import {LOCATION_TYPE,LOCALSTORAGE} from '../../../../Constances/const'

class SelectRoom extends Form {
  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      selectedLocation: -1,
    };
  }
  componentDidMount = async () => {
    window.sessionStorage.removeItem(LOCALSTORAGE.LOCATION)
    const listLoc = await instance.getListLocation();
    const result = listLoc.filter((item) => item.type === LOCATION_TYPE.TESTING);
    
    this.setState({
        locationList: result,
    })
    // this.setState({
    //   locationList: listLoc,
    // });
  };

  onSelect = (id) => {
    this.props.history.push("exam/room/" + id);
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <LocationSelecter list={this.state.locationList} onSelect={this.onSelect}></LocationSelecter>
      </div>
    );
  }
}

export default withRouter(SelectRoom);
