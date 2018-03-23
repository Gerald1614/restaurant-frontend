
export const loadReviews = (state, list) => {
  state.reviews = list.map((elem) => {
    return elem
  })
}
export const addReview = (state, review) => {
  state.reviews.push(review.data)

}
