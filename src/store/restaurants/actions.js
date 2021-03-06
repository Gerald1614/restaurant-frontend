import axios from 'axios'

export const LOAD_RESTAURANTS = function ({state, commit}, id) {
  console.log(id)
  axios.get(process.env.API + `/restaurant/city/${id}`)
    .then((response) => {
      console.log(response)
      commit('loadRestaurants', { list: response.data })
    })
    .catch((err) => {
      console.log(err)
      commit('loadRestaurants', { list: [] })
    })
}
export const SELECTED_RESTAURANT = function ({commit}, id) {
  commit('selectedRestaurant', { id: id })
}

export const ADD_PICTURE = function ({commit}, {picture}) {
  let fileN = new Date().toISOString() + '.png'
  var postData = new FormData()
  postData.append('file', picture, fileN)
  axios({
    method: 'post',
    url: process.env.API + '/restaurant/uploads',
    data: postData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    console.log(response.data)
    commit('addPicture', response.data)
  }, (err) => {
    console.log(err)
  })
}

export const ADD_RESTAURANT = function ({commit}, {cityId, restaurant}) {
  axios({
    method: 'post',
    url: process.env.API + `/restaurant/add/${cityId}`,
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
    url: process.env.API + `/restaurant/${id}`,
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
