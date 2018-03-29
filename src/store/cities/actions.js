import axios from 'axios'

export const LOAD_CITIES = function ({state, commit, rootState}) {
  axios.get('http://localhost:3005/v1/city').then((response) => {
    commit('loadCities', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
export const SELECTED_CITY = function ({commit}, id) {
  commit('selectedCity', { id: id })
}
