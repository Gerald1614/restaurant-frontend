<template>
<div>
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
</div>
  
</template>

<script>
export default {

  methods: {
    selectResto (key) {
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

</style>
