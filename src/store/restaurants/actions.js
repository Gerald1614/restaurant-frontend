import axios from 'axios'

export const LOAD_RESTAURANTS = function ({commit}) {
  axios.get('http://localhost:3005/v1/restaurant').then((response) => {
    console.log(response)
    commit('loadRestaurants', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
export const SELECTED_RESTAURANT = function ({commit}, id) {
  commit('selectedRestaurant', { id: id })
}
