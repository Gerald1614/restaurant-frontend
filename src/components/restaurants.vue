<template>
<div>
  <q-tabs>
  <!-- Tabs - notice slot="title" -->
  <q-tab default :count="count" slot="title" name="restoList" icon="list" />
  <q-tab  slot="title" name="restoMap" icon="map" />
  <!-- Targets -->
  <q-tab-pane name="restoList">
    <q-list highlight v-for="restaurant in restaurants" :key="restaurant._id">
        <q-item link @click.native="selectResto(restaurant._id)">
        <q-item-side>
          <q-item-tile avatar>
            <img :src="restaurant.picture">
          </q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile label> {{ restaurant.name }}
            <q-rating
            readonly
            color="orange"
            v-model="restaurant.avgRating"
            :max="5"
          >
          </q-rating>
          </q-item-tile>
          <q-item-tile sublabel>{{ restaurant.foodType }}</q-item-tile>
        </q-item-main>
          <q-item-side right>
            <q-chip square small color="primary" class="shadow-2">Price : {{ restaurant.avgCost | currency }}</q-chip>
          </q-item-side>
      </q-item>
      <q-item-separator/>
    </q-list>
   </q-tab-pane>
  <q-tab-pane name="restoMap">
  </q-tab-pane>
  </q-tabs>
</div>
</template>

<script>
import RestaurantDetails from './restaurantDetails'
import { mapGetters } from 'vuex'

export default {
  components: {RestaurantDetails},
  methods: {
    selectResto (key) {
      this.$router.push({ path: `/restaurants/detail/${key}`})
    }
  },
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
  },
  filters: {
    currency: function (value) {
      if (!value) return ''
      return '$ ' + value.toFixed(2)
    }
  }
}
</script>
