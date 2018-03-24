
export const getRestaurants = (state) => state.restaurants

export const getRestoDetailById = (state) => (id) => {
  return state.restaurants.find(restaurant => restaurant._id === id)
}
