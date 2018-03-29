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
          <select
          v-model="selectedCity"
          @change="changeCity($event.target.value)"
        >
        <option value="">Choose</option>
        <option v-for="city in cities" :value="city._id" >{{city.name}}</option>
        </select>
        <q-btn flat v-if="!this.$store.getters['auth/isAuthenticated']" dense label="Login" @click="$router.push('/login')"/>
        <q-btn flat  v-if="!this.$store.getters['auth/isAuthenticated']" dense label="SignUp" @click="$router.push('/signup')"/>
        <q-btn flat  v-if="this.$store.getters['auth/isAuthenticated']" dense label="Logout" @click="$router.push('/logout')"/>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header >Restaurant reviews</q-list-header>
        <q-item  to="/restaurants/list">
          <q-item-side icon="restaurant" />
          <q-item-main label="List of restaurants" />
        </q-item>
        <q-item @click.native="addRestaurant">
          <q-item-side icon="add_location" />
          <q-item-main label="Add a restaurant"/>
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
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
 
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDFmZ3XQk8FfWm83i81DOL-sdpm2fuNxWw',
    }
  });

export default {
  name: 'LayoutDefault',
  data () {
    return {
      selectedCity: '',
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
    computed: {
    cities: function () {
      return this.$store.state.cities.cities
    }
  },
  methods: {
    openURL,
    changeCity(value) {
      this.$store.dispatch('cities/SELECTED_CITY', value)
    },
    addRestaurant() {
      if(!this.$store.getters['auth/isAuthenticated']) {
        // If not authenticated, add a path where to redirect after login.
        this.$router.push({ path: '/login', query: { redirect: '/restaurants/addRestaurant' } });
      } else {
          this.$router.push({ path: '/restaurants/addRestaurant'})
      }
    }
  },
  created: function() {
    if ('geolocation' in navigator) {
      var gl = navigator.geolocation
      gl.getCurrentPosition(function(position) {
        let latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
        console.log(latlng)
        this.$store.dispatch('geolocation/SET_GEOLOCATION', latlng)
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latlng}, (results, status) => {
          if (status === 'OK') {
            if (results[6]) {
              console.log(results[6])
              this.selectedCity = results[6].formatted_address
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }.bind(this)) // bind to `this` so it's the current component.

    }
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
