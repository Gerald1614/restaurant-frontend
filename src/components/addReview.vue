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
            v-model="form.title"
            @blur="$v.form.title.$touch"
            @keyup.enter="submit"
            :error="$v.form.title.$error"
            placeholder="Title"
          />
          <q-rating
            color="orange"
            v-model="form.rate"
            :max="5"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.text"
            type="textarea"
            @blur="$v.form.text.$touch"
            @keyup.enter="submit"
            :error="$v.form.text.$error"
            placeholder="details"
          />
          <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
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
        rate: 0
      }
    }
  },
  validations: {
    form: {
      title: { required, minlength: minLength(6) },
      text: { required, minlength: minLength(6) }
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
      } else {
        console.log(this.form)
        this.$store.dispatch('reviews/ADD_REVIEW', {id: this.restoId, review:this.form})
        this.$router.push(`/restaurants/detail/${this.restoId}`)
      }
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
