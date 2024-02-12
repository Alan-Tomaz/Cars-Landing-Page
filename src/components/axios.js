import axios from "axios";

const instanceApiCar = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/cars?limit=20',
    headers: {
        /* API KEY */
        'X-Api-Key': ''
    }
})

const instanceApiMotorcycle = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/motorcycles?limit=20',
    headers: {
        /* API KEY */
        'X-Api-Key': ''
    }
})

export { instanceApiCar, instanceApiMotorcycle };