import axios from 'axios';
import { backendAPI } from '../Config/apiUrl';

const searchByQuery = (query) => axios.get(`${backendAPI}/direcciones/_search`, {
    params: {
        source: JSON.stringify(query),
        source_content_type: 'application/json'
    }
});

const getById = (id) => axios.get(`${backendAPI}/api/consulta/` + id)

const getByQuery = (query) => axios.get(`${backendAPI}/api/consulta`, {

})

const getExceptionsByQuery = () => axios.get(`${backendAPI}/api/consulta`, {

})

const actualizeAddress = (id, params) => axios.post(`${backendAPI}/api/actualiza/` + id, null, {
    params
})

const confirmIndeterminate = (id, query) => axios.put(`${backendAPI}/api/indetermina/` + id, {
    query
})


const AddressServices = {
    searchByQuery,
    getById,
    getByQuery,
    actualizeAddress,
    confirmIndeterminate
}

export default AddressServices;