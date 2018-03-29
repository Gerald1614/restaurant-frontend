export const SET_GEOLOCATION = function ({commit}, latlng) {
  commit('setGeoLocation', { latlng: latlng })
}
