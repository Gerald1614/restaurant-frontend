export const getReviewsByRestoId = (state) => (id) => {
  return state.reviews.filter(review => review.restaurant === id)
}
