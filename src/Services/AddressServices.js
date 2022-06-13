import axios from 'axios';
import  {backendAPI} from '../Config/apiUrl';

const getAll = () => axios.get(`${backendAPI}/api/addresses`);

const AddressServices = {
    getAll
}

export default AddressServices;