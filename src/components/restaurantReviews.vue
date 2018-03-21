<template>
       <div class="container">
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
      console.log(this.reviews)
       this.$router.push({ path: `/restaurants/addReview/${this.reviews[0].restaurant}`})
    }
      }
}
</script>

<style lang="stylus" scoped>

</style>
