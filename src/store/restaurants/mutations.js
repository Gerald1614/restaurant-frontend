
export const loadRestaurants = (state, {list}) => {
  state.restaurants = list
}
export const selectedRestaurant = (state, {id}) => {
  state.selectedRestaurant = state.restaurants.find(restaurant => restaurant._id === id)
}
