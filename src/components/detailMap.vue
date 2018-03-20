<template>
    <gmap-map
      :center="center"
      :zoom="14"
      style="height: 300px"
    >
    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      {{infoContent}}
    </gmap-info-window>
    <gmap-marker
      :position="marker.position"
      @click="toggleInfoWindow(marker)"
      ></gmap-marker>
    </gmap-map>
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
  name: 'detail-map',
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
  computed: {
    selectedResto: function() {
      return this.$store.state.restaurants.selectedRestaurant
    },
     myLatlng: function () {
      return {lat: this.selectedResto.geometry.coordinates[0], lng: this.selectedResto.geometry.coordinates[1]}
     },
     center: function () {
      return this.myLatlng
     },
     marker: function () {
      return {position: this.myLatlng, infoText: this.selectedResto.name}
     } 
  },
  methods: {
    toggleInfoWindow: function(marker) {
      this.infoWindowPos = marker.position;
      this.infoContent = marker.infoText;
      //check if its the same marker that was selected if yes toggle
        this.infoWinOpen = !this.infoWinOpen;
    }
   }
}
</script>

<style lang="stylus" scoped>

</style>
