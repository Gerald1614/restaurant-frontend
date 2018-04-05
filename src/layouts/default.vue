<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Restaurant review app
          <div slot="subtitle">Find the best restaurant</div>
        </q-toolbar-title>
          <q-btn v-if="!checkGeolocation" size="xs" disabled> Checking your geolocation
            <q-spinner-rings :size="20"/>
          </q-btn>
          <q-select
          class="q-mx-sm"
          inverted
            color="blue-9"
            v-model="selectedCity"
            :display-value= "selectText"
            :options="loadSelect"
          >
          </q-select>
          <q-btn flat v-if="!this.$store.getters['auth/isAuthenticated']" dense label="Login" @click="$router.push('/login')"/>
          <q-btn flat  v-if="!this.$store.getters['auth/isAuthenticated']" dense label="SignUp" @click="$router.push('/signup')"/>
          <q-btn flat  v-if="this.$store.getters['auth/isAuthenticated']" dense label="Logout" @click="$router.push('/logout')"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-list-header >Restaurant reviews</q-list-header>
        <q-item  to="/restaurants/list">
          <q-item-side icon="restaurant" />
          <q-item-main label="List of restaurants" />
        </q-item>
        <q-item to="/restaurants/addRestaurant">
          <q-item-side icon="add_location" />
          <q-item-main label="Add a restaurant" sublabel="from your current location"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <transition-group name="slide" mode="out-in">
        <router-view key="main" />    
        <router-view name="subs" key="second"></router-view>
      </transition-group>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import {geolocation} from '../utils/geolocation'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: { 
    selectText: function () {
      if (Object.keys(this.$store.state.cities.selectedCity).length === 0) {
        return ""
      } else {
        return this.$store.state.cities.selectedCity.name
      }
      return "toto"

    },
    selectedCity: {
      get: function() {
       return this.$store.state.cities.getSelectedCity
      },
      set: function(cityId) {
      this.$store.dispatch('cities/SELECTED_CITY', cityId)
      this.$store.dispatch('restaurants/LOAD_RESTAURANTS', cityId)
       if (this.$route.path !== '/restaurants/map') {
        this.$router.push({ path: '/restaurants/list'})
        }
      }
    },
    cities: function () {
      return this.$store.state.cities.cities
    },
    checkGeolocation() {
      if (Object.keys(this.$store.state.cities.selectedCity).length === 0) {
        return false
      } else {
        return true
      }
    },
    loadSelect() {
      var liste = this.$store.getters['cities/getCities']
      return liste.map (city => ({value: city._id, label: city.name}))
    }
  },
  methods: {
    openURL,
    addRestaurant() {
      if(!this.$store.getters['auth/isAuthenticated']) {
        // If not authenticated, add a path where to redirect after login.
        this.$router.push({ path: '/login', query: { redirect: '/restaurants/addRestaurant' } });
      } else {
          this.$router.push({ path: '/restaurants/addRestaurant'})
      }
    }
  },
  mounted: function() {
     geolocation().then ((results) => {
        if (results.geoCity) {
          console.log(results.geoCity)
          let selCity = this.$store.getters['cities/getCityDetailByName'](results.geoCity)
          if (selCity !== undefined) {
            this.selectedCity = selCity._id
          } else {
            window.alert('No restaurant yet rated in this town, be the first to add a review');
          }
        } else {
          window.alert('Your city was not found, please check dropdown menu or add new city from left menu');
        }
     })

  }
}
</script>

<style>

.slide-enter-active {
        animation: slide-in 300ms ease-out forwards;
    }
    .slide-leave-active {
        animation: slide-out 300ms ease-out forwards;
    }
    @keyframes slide-in {
        from {
            transform: translateX(-300px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
       @keyframes slide-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(300px);
            opacity: 0;
        }
    }
</style>
