<template>
<div class="q-pa-sm" v-touch-swipe.right="goBack">
  <div class="row">
    <div class="col-xs-12 col-sm-6">
      <q-card inline>
        <q-card-media>
          <img :src="selectedResto.picture">
        </q-card-media>
        <q-card-title>
          {{ selectedResto.name}}
          <q-rating 
            readonly
            color="orange"
            slot="subtitle" 
            v-model="selectedResto.avgRating" 
            :max="5" />
            <div slot="right" class="row items-center">
              <q-btn round @click="openURL(`${restaurant.website}`)" color="primary" icon="public">
            <q-tooltip><small>Visit website</small></q-tooltip>
          </q-btn>
            </div>
          </q-card-title>
        <q-card-main>
          <p>{{ selectedResto.foodType}}</p>
          <p class="text-faded">{{ selectedResto.description }}</p>
        </q-card-main>
    </q-card>
    </div>
    <div class="colcol-xs-12 col-sm-6">
      <restaurant-reviews></restaurant-reviews>
    </div>
  </div>
    <detail-map></detail-map>
</div>
</template>

<script>
import DetailMap from './detailMap'
import RestaurantReviews from './restaurantReviews'

export default {
  components: {DetailMap, RestaurantReviews},
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    console.log(this.$route.params)
      this.$store.dispatch('reviews/LOAD_REVIEWSBYID', this.$route.params.id)

  },
  computed: {
    selectedResto: function() {
      return this.$store.state.restaurants.selectedRestaurant
    },
    isSelected: function () {
      return Object.keys(this.$store.state.restaurants.selectedRestaurant).length !== 0
    },
    reviews: function () {
      return this.$store.state.reviews.reviews
    }
  }
}
</script>

<style lang="stylus">

</style>
