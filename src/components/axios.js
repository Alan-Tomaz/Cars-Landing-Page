import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.api-ninjas.com/v1/cars?limit=20',
    headers: {
        /* API KEY */
        'X-Api-Key': 'mJaTmH0TlaspYnt6ny8V4Q==pveEmfVOJgTGY1xT'
    }
})

export default instance;