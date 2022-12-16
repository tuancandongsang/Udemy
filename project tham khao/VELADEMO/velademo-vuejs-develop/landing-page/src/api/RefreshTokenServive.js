import axios from "axios";
import { getRefreshToken } from '@/utils/helpers'

const BASE_URL = "http://localhost:8081"

const API_ENDPOINT = {
    REFRESH_TOKEN: "/api/token/refresh",
};

const axiosBaseStores = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    }
})

const RefreshTokenServive = {
    getRefreshToken() {
        return axiosBaseStores.get(API_ENDPOINT.REFRESH_TOKEN
            , {
                headers: {
                    "Authorization": `Bearer ${getRefreshToken()}`
                }
            })
    },

}
export default RefreshTokenServive