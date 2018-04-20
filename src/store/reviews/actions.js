import axios from 'axios'

export const LOAD_REVIEWSBYID = function ({commit}, id) {
  axios.get(process.env.API + `/restaurant/reviews/${id}`).then((response) => {
    console.log(response.data)
    commit('loadReviews', response.data)
  }, (err) => {
    console.log(err)
  })
}
export const ADD_REVIEW = function ({commit}, {id, review}) {
  axios({
    method: 'post',
    url: process.env.API + `/restaurant/reviews/add/${id}`,
    data: JSON.stringify(review),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.token
    }
  }).then((response) => {
    console.log(response.data)
    commit('addReview', response)
  }, (err) => {
    console.log(err)
  })
}
