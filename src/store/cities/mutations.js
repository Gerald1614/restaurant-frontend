export const loadCities = (state, {list}) => {
  state.cities = list
}
export const selectedCity = (state, {id}) => {
  state.selectedCity = state.cities.find(city => city._id === id)
}
export const addCity = (state, city) => {
  state.cities.push(city.data)
}
