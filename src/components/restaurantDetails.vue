<template>
  <div class="container">
        <q-list highlight>
      <template v-for="review in reviews">
        <q-item :key="review._id">
        <q-item-main>
          <q-item-tile label> {{review.title }}</q-item-tile>
          <q-rating
            readonly
            v-model="review.rate"
            :max="5"
          />
          <q-item-tile sublabel>{{ review.text }}</q-item-tile>
        </q-item-main>
      </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
export default {
  computed: {
    reviews: function () {
      return this.$store.state.reviews.reviews
    }
  }
}
</script>

<style lang="stylus">

</style>
