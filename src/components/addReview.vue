<template>
  <div class="q-pa-sm" v-touch-swipe.right="goBack">

    <div class="row justify-center">
      <div class="col-6">
        <q-card>
          <q-card-title>
            add a review for {{ restaurant.name }}
          </q-card-title>
          <q-card-separator />
          <q-card-main>
          <q-input
            class="q-ma-sm"
            float-label="Title"
            v-model="form.title"
            @blur="$v.form.title.$touch"
            @keyup.enter="submit"
            :error="$v.form.title.$error"
          />
          <p>Rating</p>
          <q-rating
            color="orange"
            v-model="form.rate"
            :max="5"
            @blur="$v.form.rate.$touch"
            @keyup.enter="submit"
            :error="$v.form.rate.$error"
          />
          <q-input
            class="q-ma-sm"
            float-label="Description"
            v-model="form.text"
            type="textarea"
            @blur="$v.form.text.$touch"
            @keyup.enter="submit"
            :error="$v.form.text.$error"
          />
          <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
          <q-btn class="q-ma-sm" color="secondary" @click="cancel">Cancel</q-btn>
        </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      restoId: this.$route.params.id,
      form: {
        title: '',
        text: '',
        rate: null
      }
    }
  },
  validations: {
    form: {
      title: { required, minlength: minLength(6) },
      text: { required, minlength: minLength(6) },
      rate: { required }
    }
  },
  computed: {
    restaurant() {
      return this.$store.getters['restaurants/getRestoDetailById'](this.restoId)
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.title.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.text.$error) {
        this.$q.notify('6 characters minimum')
        // return
      }  else if (this.$v.form.rate.$error) {
        this.$q.notify('rating is mandatory')
        // return
      } else {
        console.log(this.form)
        this.$store.dispatch('reviews/ADD_REVIEW', {id: this.restoId, review:this.form}).then(this.updateRating(this.restoId))
      }
    },
    cancel () {
        this.$router.go(-1)
    },
    updateRating (id) {
      let rating = 0
        const totalReviews = this.$store.getters['reviews/getReviewsByRestoId'](id)
        console.log(totalReviews)
        if (totalReviews.length > 0) {
          rating = (totalReviews.reduce((total, rate) => ({
            rate: total.rate + rate.rate
            })))
            rating.rate = (rating.rate + this.form.rate) / (totalReviews.length + 1)
        } else {
          rating = {rate: this.form.rate}
        }

          //
        this.$store.dispatch('restaurants/UPDATE_AVGRATING', {id: this.restoId, rate: rating.rate})
        this.$router.push(`/restaurants/detail/${this.restoId}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-card
  background-color $grey-8
  color white
</style>
