
export const getRestaurants = (state) => state.restaurants

export const getRestoDetailById = (state) => (id) => {
  state.restaurants.find(restaurant => restaurant._id === id)
}
