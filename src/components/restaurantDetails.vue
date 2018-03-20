<template>
<div class="container" v-touch-swipe.horinzotal="goBack">
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
          </q-card-title>
        <q-card-main>
          <p>{{ selectedResto.foodType}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn flat round dense icon="event" />
          <q-btn flat label="5:30PM" />
          <q-btn flat label="7:30PM" />
          <q-btn flat label="9:00PM" />
          <q-btn flat color="primary" label="Reserve" />
      </q-card-actions>
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
      this.$store.dispatch('restaurants/SELECTED_RESTAURANT', this.$route.params.id)
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
.container
  padding 10px
</style>
