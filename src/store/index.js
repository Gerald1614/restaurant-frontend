import Vue from 'vue'
import Vuex from 'vuex'

import restaurants from './restaurants'
import reviews from './reviews'
import auth from './auth'
import cities from './cities'
import geolocation from './geolocation'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    restaurants,
    reviews,
    auth,
    cities,
    geolocation
  }
})

// if we want some HMR magic for it, we handle
// the hot update like below. Notice we guard this
// code with "process.env.DEV" -- so this doesn't
// gets into our production build (and it shouldn't).
if (process.env.DEV && module.hot) {
  module.hot.accept(['./restaurants'], () => {
    const newRestaurants = require('./restaurants').default
    store.hotUpdate({ modules: { restaurants: newRestaurants } })
  })
}

export default store
