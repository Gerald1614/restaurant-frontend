import store from '../store/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDFmZ3XQk8FfWm83i81DOL-sdpm2fuNxWw'
  }
})

function geolocation () {
  return new Promise( (resolve, reject) => {
    if ('geolocation' in navigator) {
      var gl = navigator.geolocation
      gl.getCurrentPosition(function (position) {
        let latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
        var geocoder = new google.maps.Geocoder()
        geocoder.geocode({'location': latlng}, (results, status) => {
          if (status === 'OK') {
            let geoCity = results[0].address_components[3].long_name
            store.dispatch('geolocation/SET_GEOLOCATION', {'geoCity': geoCity, 'latlng': latlng})
            resolve({'geoCity': geoCity, 'latlng': latlng})
          } else {
            reject('Geocoder failed due to: ' + status)
          }
        })
      })
    }
  })
}

export {geolocation}
