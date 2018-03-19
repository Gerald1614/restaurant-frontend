import axios from 'axios'

export const LOAD_REVIEWSBYID = function ({commit}, id) {
  axios.get(`http://localhost:3005/v1/restaurant/reviews/${id}`).then((response) => {
    console.log(response)
    commit('loadReviews', { list: response.data })
  }, (err) => {
    console.log(err)
  })
}
