<template>
<div>
  <q-tabs>
  <!-- Tabs - notice slot="title" -->
  <q-tab default count="5" slot="title" name="restoList" icon="list" />
  <q-tab  slot="title" name="restoMap" icon="map" />
  <!-- Targets -->
  <q-tab-pane name="restoList">Liste</q-tab-pane>
  <q-tab-pane name="restoMap">Map</q-tab-pane>
  </q-tabs>
  <restaurant-details></restaurant-details>
</div>
</template>

<script>
import RestaurantDetails from './restaurantDetails'

export default {
  components: {RestaurantDetails}
}
</script>
