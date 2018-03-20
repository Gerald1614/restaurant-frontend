<template>
  <div class="row">
    <div class="col">
      <div class="container">
        <q-list highlight v-for="review in reviews" :key="review._id">
          <q-item >
            <q-item-main>
              <q-item-tile label> {{review.title }}</q-item-tile>
              <q-rating
                readonly
                v-model="review.rate"
                :max="5"
              />
              <q-item-tile sublabel>{{ review.text }} --- {{review.username }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="col">
      <detail-map v-if="isSelected"></detail-map>
    </div>
  </div>
</template>

<script>
import DetailMap from './detailMap'

export default {
  components: {DetailMap},
  computed: {
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
