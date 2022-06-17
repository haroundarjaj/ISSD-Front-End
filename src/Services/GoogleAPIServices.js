import axios from 'axios';
import { googleApi, googleMapsApiKey } from '../Config/apiUrl';

const googleGeoCoder = (lat, lng) => axios.get(`${googleApi}/api/geocode/json?latlng=` + lat + `,` + lng + `&key=${googleMapsApiKey}`, {})

const GoogleAPIServices = {
    googleGeoCoder,
}

export default GoogleAPIServices;