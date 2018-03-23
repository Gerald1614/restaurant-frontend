import axios from 'axios'

export const LOAD_REVIEWSBYID = function ({commit}, id) {
  axios.get(`http://localhost:3005/v1/restaurant/reviews/${id}`).then((response) => {
    console.log(response)
    commit('loadReviews', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
export const ADD_REVIEW = function ({commit}, {id, review}) {
  axios({
    method: 'post',
    url: `http://localhost:3005/v1/restaurant/reviews/add/${id}`,
    data: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    console.log(response.data)
    commit('addReview', response.data)
  }, (err) => {
    console.log(err)
  })
}
