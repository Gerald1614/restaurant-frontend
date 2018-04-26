<template>
  <div class="q-pa-sm">
     <gmap-map 
      :center="center" 
      :zoom="12" 
      style="width: 100%; height: 600px">
      <gmap-info-window 
        :options="infoOptions" 
        :position="infoWindowPos" 
        :opened="infoWinOpen" 
        @closeclick="infoWinOpen=false">
        {{infoContent}}
      </gmap-info-window>

      <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
    </gmap-map>
    </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDFmZ3XQk8FfWm83i81DOL-sdpm2fuNxWw',
    }
  });

export default {
  data () {
    return {
          infoContent: '',
          infoWindowPos: {
            lat: 0,
            lng: 0
          },
          infoWinOpen: false,
          //optional: offset infowindow so it visually sits nicely on top of our marker
          infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          }
    }
  },
  methods: {
    selectResto (key) {
      this.$store.dispatch('restaurants/SELECTED_RESTAURANT', key)
      this.$router.push({ path: `/restaurants/detail/${key}`})
    },
    toggleInfoWindow: function(marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText + " (click again on marker for details)";
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.selectResto(marker.id);
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getMarkers(restaurant) {
      let marker = {position: { lat: restaurant.geometry.coordinates[0], lng: restaurant.geometry.coordinates[1]}, infoText: restaurant.name, id: restaurant._id}
      return marker
    }
  },
   computed: {
    restaurants: function () {
      return this.$store.state.restaurants.restaurants
    },
    center: function() {
      if (this.$store.state.restaurants.restaurants) {
        console.log(this.restaurants)
        return { lat: this.restaurants[0].geometry.coordinates[0], lng: this.restaurants[0].geometry.coordinates[1]}
    
      }
      },
    markers: function () {
      return this.restaurants.map(this.getMarkers)
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
