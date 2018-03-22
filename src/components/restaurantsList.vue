<template>
<div class="q-pa-sm">
  <q-list highlight v-for="restaurant in restaurants" :key="restaurant._id">
      <q-item>
      <q-item-side>
        <q-item-tile avatar>
          <img :src="restaurant.picture">
        </q-item-tile>
      </q-item-side>
      <q-item-main @click.native="selectResto(restaurant._id)">
        <q-item-tile label> {{ restaurant.name }}
          <q-rating
          readonly
          color="orange"
          v-model="restaurant.avgRating"
          :max="5"
        >
        </q-rating>
        </q-item-tile>
        <q-item-tile label>{{ restaurant.foodType }}</q-item-tile>
        <q-item-tile sublabel>{{ restaurant.description }}</q-item-tile>
      </q-item-main>
        <q-item-side right>
          <q-chip square size="xs" color="primary" class="shadow-2">Price : {{ restaurant.avgCost | currency }}</q-chip>
          <q-btn round size="sm" @click="openURL(`${restaurant.website}`)" color="primary" icon="public">
            <q-tooltip><small>Visit website</small></q-tooltip>
          </q-btn>
        </q-item-side>
      </q-item>
      <q-item-separator/>
    </q-list>
</div>
  
</template>

<script>
import { openURL } from 'quasar'

export default {

  methods: {
    openURL,
    selectResto (key) {
      this.$store.dispatch('restaurants/SELECTED_RESTAURANT', key)
      this.$router.push({ path: `/restaurants/detail/${key}`})
    }
  },
   computed: {
    restaurants: function () {
      return this.$store.state.restaurants.restaurants
    }
  },
  filters: {
    currency: function (value) {
      if (!value) return ''
      return '$ ' + value.toFixed(2)
    }
  }
}
</script>

<style lang="stylus" scoped>
.q-item-main:hover 
  cursor pointer
</style>
