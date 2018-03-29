export const getCities = (state) => state.cities

export const getCityDetailById = (state) => (id) => {
  return state.cities.find(city => city._id === id)
}
export const getSelectedCity = (state) => state.selectedCity
