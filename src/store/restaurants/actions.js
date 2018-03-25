import axios from 'axios'

export const LOAD_RESTAURANTS = function ({state, commit, rootState}) {
  axios.get('http://localhost:3005/v1/restaurant').then((response) => {
    commit('loadRestaurants', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
export const SELECTED_RESTAURANT = function ({commit}, id) {
  commit('selectedRestaurant', { id: id })
}
export const ADD_RESTAURANT = function ({commit}, {restaurant}) {
  axios({
    method: 'post',
    url: 'http://localhost:3005/v1/restaurant/add',
    data: JSON.stringify(restaurant),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    console.log(response.data)
    commit('addRestaurant', response)
  }, (err) => {
    console.log(err)
  })
}
export const UPDATE_AVGRATING = function ({commit, getters}, {id, rate}) {
  const updatedResto = getters.getRestoDetailById(id)
  updatedResto.avgRating = rate
  axios({
    method: 'put',
    url: `http://localhost:3005/v1/restaurant/${id}`,
    data: JSON.stringify(updatedResto),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    console.log(response.data)
    commit('updateAvgRating', response.data)
  }, (err) => {
    console.log(err)
  })
}
