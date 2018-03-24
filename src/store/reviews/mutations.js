
export const loadReviews = (state, list) => {
  state.reviews = list
}
export const addReview = (state, review) => {
  state.reviews.push(review.data)
}
