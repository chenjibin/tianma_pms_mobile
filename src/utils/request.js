import axios from 'axios'
import qs from 'qs'
import config from '../../config'

axios.interceptors.request.use(config => {
    return config
}, function(error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response.data
}, function(error) {
    return Promise.reject(error)
})

const baseURL = (process.env.NODE_ENV !== 'production' ? config.dev.httpUrl : config.build.httpUrl)

export default {
    get(url, params) {
        return axios({
            method: 'get',
            url: baseURL + url,
            params,
            timeout: 30000
        })
    },
    post(url, data) {
        return axios({
            method: 'post',
            url: baseURL + url,
            data: qs.stringify(data),
            timeout: 30000,
            headers: {
                'Comtent-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    }
}
