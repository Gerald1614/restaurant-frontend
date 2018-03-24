<template>
  <div class="q-pa-sm" v-touch-swipe.right="goBack">

    <div class="row justify-center">
      <div class="col-6">
        <q-card>
          <q-card-title>
            add a new restaurant
          </q-card-title>
          <q-card-separator />
          <q-card-main>
          <q-input
            class="q-ma-sm"
            v-model="form.name"
            @blur="$v.form.name.$touch"
            @keyup.enter="submit"
            :error="$v.form.name.$error"
            placeholder="name"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.foodType"
            @blur="$v.form.foodType.$touch"
            @keyup.enter="submit"
            :error="$v.form.foodType.$error"
            placeholder="Food Type"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.description"
            @blur="$v.form.description.$touch"
            @keyup.enter="submit"
            :error="$v.form.description.$error"
            placeholder="description"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.avgCost"
            @blur="$v.form.avgCost.$touch"
            @keyup.enter="submit"
            :error="$v.form.avgCost.$error"
            placeholder="average Cost"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.picture"
            @blur="$v.form.picture.$touch"
            @keyup.enter="submit"
            :error="$v.form.picture.$error"
            placeholder="Picture of the restaurant"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.longitude"
            @blur="$v.form.longitude.$touch"
            @keyup.enter="submit"
            :error="$v.form.longitude.$error"
            placeholder="Longitude"
          />
          <q-input
            class="q-ma-sm"
            v-model="form.latitude"
            @blur="$v.form.latitude.$touch"
            @keyup.enter="submit"
            :error="$v.form.latitude.$error"
            placeholder="latitude"
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
        name: '',
        foodType: '',
        description: '',
        avgCost:0,
        picture:'',
        geometry: {
          coordinates: []
        },
        longitude:'',
        latitude:''

      }
    }
  },
  validations: {
    form: {
      name: { required, minlength: minLength(6) },
      description: { required, minlength: minLength(6) },
      foodType: { required, minlength: minLength(6) },
      avgCost: {required, decimal},
      picture: { minlength: minLength(6) },
      longitude: {required},
      latitude: {required}
    }
  },
  
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.name.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.description.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.foodType.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.avgCost.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.picture.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.longitude.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.latitude.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else {
        console.log(this.form)
        this.$store.dispatch('reviews/ADD_REVIEW', {id: this.restoId, review:this.form})
        this.$router.push('/restaurants/list')
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
