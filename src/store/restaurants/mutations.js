
export const loadRestaurants = (state, {list}) => {
  state.restaurants = list
}
export const selectedRestaurant = (state, {id}) => {
  state.selectedRestaurant = state.restaurants.find(restaurant => restaurant._id === id)
}
export const addRestaurant = (state, restaurant) => {
  state.restaurants.push(restaurant.data)
}
export const updateAvgRating = (state, restaurant) => {
  console.log(restaurant)
  state.selectedRestaurant = restaurant
}
