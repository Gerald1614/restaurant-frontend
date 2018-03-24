<template>
<div>
  <q-tabs align="justify">
  <q-route-tab default exact to="/restaurants/list" :count="count" slot="title" icon="list" />
  <q-route-tab  exact to="/restaurants/map" slot="title" name="restoMap" icon="map" />
  </q-tabs>
</div>
</template>

<script>
import RestaurantDetails from './restaurantDetails'


export default {
  components: {RestaurantDetails},
  computed: {
    count: function () {
      return this.$store.state.restaurants.restaurants.length 
    }
  },
}
</script>

