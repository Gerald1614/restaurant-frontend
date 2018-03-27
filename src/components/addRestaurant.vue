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
            float-label="Name of the restaurant"
            v-model="form.name"
            @blur="$v.form.name.$touch"
            @keyup.enter="submit"
            :error="$v.form.name.$error"
          />
          <q-input
            class="q-ma-sm"
            float-label="Food type"
            v-model="form.foodType"
            @blur="$v.form.foodType.$touch"
            @keyup.enter="submit"
            :error="$v.form.foodType.$error"
          />
          <q-input
            class="q-ma-sm"
            float-label="Description"
            v-model="form.description"
            @blur="$v.form.description.$touch"
            @keyup.enter="submit"
            :error="$v.form.description.$error"
          />
          <q-input
            class="q-ma-sm"
            float-label="Average cost"
            v-model="form.avgCost"
            :before="[
                {
                  icon: 'monetization_on',
                }
              ]"
            @blur="$v.form.avgCost.$touch"
            @keyup.enter="submit"
            :error="$v.form.avgCost.$error"
          />
        <camera-view></camera-view>
          <!-- <q-input
            class="q-ma-sm"
            float-label="url of picture of the restaurant"
            v-model="form.picture"
            @blur="$v.form.picture.$touch"
            @keyup.enter="submit"
            :error="$v.form.picture.$error"
          /> -->
          <q-input
            class="q-ma-sm"
            float-label="Website of the restaurant"
            v-model="form.website"
          />
           <!-- <q-btn rounded @click="capture" color="secondary" icon="my_location">Get Location</q-btn> -->
          
          <q-input
            class="q-ma-sm"
            float-label="longitude"
            v-model="longitude"
            @blur="$v.longitude.$touch"
            @keyup.enter="submit"
            :error="$v.longitude.$error"
          />
          <q-input
            class="q-ma-sm"
            float-label="latitude"
            v-model="latitude"
            @blur="$v.latitude.$touch"
            @keyup.enter="submit"
            :error="$v.latitude.$error"
          />
          <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
        </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, numeric } from 'vuelidate/lib/validators'
import CameraView from './CameraView'

export default {
  components:{CameraView},
  data () {
    return {
      form: {
        name: '',
        foodType: '',
        description: '',
        avgCost: '',
        picture:'',
        website:'',
        geometry: {
          coordinates: []
        }
      },
      longitude: '',
      latitude: '',
      result:''
    }
  },
  validations: {
    form: {
      name: { required, minlength: minLength(6) },
      description: { required, minlength: minLength(6) },
      foodType: { required, minlength: minLength(6) },
      avgCost: {required, between: between(2, 150)},
    },
     longitude: {required, numeric},
    latitude: {required, numeric}
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
        this.$q.notify('cost between $2 and $150')
        // return
      } else if (this.$v.longitude.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.latitude.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else {
        this.form.geometry.coordinates.push(this.longitude, this.latitude)
        this.result = this.$store.getters['restaurants/getPictureFile']
          console.log(this.result)
          this.form.picture = 'http://localhost:3005/uploads/' +this.result.filename
            console.log(this.form)
             this.$store.dispatch('restaurants/ADD_RESTAURANT', {restaurant:this.form})
             this.$router.push('/restaurants/list')
      }
    }
  }
 }
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-card
  background-color $grey-2
  color black


</style>
