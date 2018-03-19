import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3005/v1',
    withCredentials: true
  })
}
