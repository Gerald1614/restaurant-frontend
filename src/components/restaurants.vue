<template>
<div>
  <div class="row justify-center" v-if="!cityLoaded" > <p>Checking your GeoLocation <q-spinner-rings color="teal" size="80"/></p>  </div>
  <q-tabs v-else align="justify">
  <q-route-tab default exact to="/restaurants/list" label="list" :count="count" slot="title" icon="list"/>>
  <q-route-tab  exact to="/restaurants/map" label="map" slot="title" name="restoMap" icon="map"/>
  </q-tabs>
</div>
</template>

<script>
import RestaurantDetails from './restaurantDetails'

export default {
  components: {RestaurantDetails},
  computed: {
    count: function () {
      return this.$store.state.restaurants.restaurants.length + ' restaurants'
    },
    cityLoaded () {
      if (Object.keys(this.$store.state.cities.selectedCity).length === 0) {
        return false
      } else {
        return true
      }
      }
  
  }
}
</script>

