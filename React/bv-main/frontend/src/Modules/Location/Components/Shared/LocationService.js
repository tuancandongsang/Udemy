import { Http } from "../../../../Helper/Http.js";

const API_ENDPOINT = {
  //////// LOCATION
  LISTLOCATION: '/location/list',
  CREATELOCATION: '/location/create',
  EDITLOCATION: '/location/update',
  GETEDITLOCATION: '/location/get?id=',
  DELETELOCATION: '/location/delete',
  GETLISTTYPELOCATION: '/location/type/list',

  //// TYPE

  CREATELOCATION_TYPE: '/location/type/create',
  EDITLOCATION_TYPE: '/location/type/update',
  GETEDITLOCATION_TYPE: '/location/type/get?id=',
  DELETELOCATION_TYPE: '/location/type/delete',

}

class LocationService {
  constructor() {
    if (LocationService._instance) {
      return LocationService._instance;
    }
    LocationService._instance = this;

    // ... Your rest of the constructor code goes after this
  }

  ///////////////// API LOCATION ///////////////////


  // get data
  listLocation() {
    return Http.get(API_ENDPOINT.LISTLOCATION);
  }
  // get Delete
  deleteLocation(data) {
    return Http.post(API_ENDPOINT.DELETELOCATION, data);
  }

  // creat Location
  createLocation(data) {
    return Http.post(API_ENDPOINT.CREATELOCATION, data);
  }

  // update Location
  updateLocation(data) {
    return Http.post(API_ENDPOINT.EDITLOCATION, data)
  }

  // getUpdateLocation 
  getUpdateLocation(id) {
    return Http.get(API_ENDPOINT.GETEDITLOCATION + id)
  }

  listTypeLocation() {
    return Http.get(API_ENDPOINT.GETLISTTYPELOCATION)
  }


  /////////////// API_TYPE /////////////////////////

  // get Delete
  deleteLocationType(data) {
    return Http.post(API_ENDPOINT.DELETELOCATION_TYPE, data);
  }

  // creat Location
  createLocationType(data) {
    return Http.post(API_ENDPOINT.CREATELOCATION_TYPE, data);
  }

  // update Location
  updateLocationType(data) {
    return Http.post(API_ENDPOINT.EDITLOCATION_TYPE, data)
  }

  // get data update
  getUpdateLocationType(id) {
    return Http.get(API_ENDPOINT.GETEDITLOCATION_TYPE + id)
  }

}

const instance = new LocationService();

export default instance;
