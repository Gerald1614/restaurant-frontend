<template>
       <div class="q-pa-sm">
        <q-btn
          rounded
          size="sm"
          color="primary"
          @click="addReview"
          class="fixed"
          icon="playlist_add"
          label="add review"
          style="right: 18px; top: 68px"
        />
         <div v-if="reviews.length<=0">No reviews ... yet</div>
        <q-list v-else highlight v-for="review in reviews" :key="review._id">
          <q-item >
            <q-item-main>
              <q-item-tile label> {{review.title }} </q-item-tile>
              <q-rating
                readonly
                color="orange"
                v-model="review.rate"
                :max="5"
              />
              <q-item-tile sublabel>{{ review.text }} --- {{review.username }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
</template>

<script>
export default {
  computed: {
    reviews: function () {
      return this.$store.state.reviews.reviews
    }
  },
  methods: {
    addReview() {
      if(!this.$store.getters['auth/isAuthenticated']) {
    // If not authenticated, add a path where to redirect after login.
    this.$router.push({ path: '/login', query: { redirect: `/restaurants/addReview/${this.$store.state.restaurants.selectedRestaurant._id}` } });
  } else {
      this.$router.push({ path: `/restaurants/addReview/${this.$store.state.restaurants.selectedRestaurant._id}`})
  }
      
    }
      }
}
</script>

<style lang="stylus" scoped>

</style>
