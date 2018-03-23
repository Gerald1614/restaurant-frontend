
export const loadReviews = (state, {list}) => {
  state.reviews = list
}
export const addReview = (state, review) => {
  console.log(review)
  state.reviews.push(review)
}
