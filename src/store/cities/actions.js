import axios from 'axios'

export const LOAD_CITIES = function ({state, commit}) {
  axios.get('https://restaurant-review-api.gegeraptor.com/api/v1/city').then((response) => {
    commit('loadCities', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
export const SELECTED_CITY = function ({commit}, id) {
  commit('selectedCity', { id: id })
}
export const ADD_CITY = function ({commit}, geoCity) {
  return new Promise((resolve, reject) => {
    console.log(geoCity)
    axios({
      method: 'post',
      url: `https://restaurant-review-api.gegeraptor.com/api/v1/city/add`,
      data: JSON.stringify(geoCity),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.token
      }
    }).then((response) => {
      console.log(response.data)
      commit('addCity', response)
      resolve(response)
    }, (err) => {
      console.log(err)
      reject(err)
    })
  })
}
