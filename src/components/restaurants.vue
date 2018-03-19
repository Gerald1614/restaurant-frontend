<template>
<div>
  <q-tabs>
  <!-- Tabs - notice slot="title" -->
  <q-tab default :count="count" slot="title" name="restoList" icon="list" />
  <q-tab  slot="title" name="restoMap" icon="map" />
  <!-- Targets -->
  <q-tab-pane name="restoList">
    <q-list highlight>
      <template v-for="restaurant in restaurants">
        <q-item :key="restaurant._id">
        <q-item-side>
          <q-item-tile avatar>
            <img :src="restaurant.picture">
          </q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile label> {{restaurant.name }}</q-item-tile>
          <q-item-tile sublabel>{{ restaurant.foodType }}</q-item-tile>
        </q-item-main>
      </q-item>
      </template>
    </q-list>
  </q-tab-pane>
  <q-tab-pane name="restoMap">
  </q-tab-pane>
  </q-tabs>
  <restaurant-details></restaurant-details>
</div>
</template>

<script>
import RestaurantDetails from './restaurantDetails'

export default {
  components: {RestaurantDetails},
  computed: {
    restaurants: function () {
      return this.$store.state.restaurants.restaurants
    },
    count: function () {
      return this.$store.state.restaurants.restaurants.length
    }
  },
  created: function () {
    this.$store.dispatch('restaurants/LOAD_RESTAURANTS')
  }
}
</script>
