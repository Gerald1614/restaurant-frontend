<template>
  <div class="q-pa-sm" v-touch-swipe.right="goBack">
    <div class="row justify-center">
      <div class="col-sm-11 col-md-6">
        <q-card>
          <q-card-title class="text-center">
            ADD A NEW RESTAURANT
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
          <q-input
            class="q-ma-sm"
            float-label="Website of the restaurant"
            v-model="form.website"
          />
          <div class="row q-ma-sm">
            <div class="col">
              <q-btn :loading="loading" rounded @click="getLocation" color="secondary" icon="my_location">Update Location
              </q-btn>
              <div>
                <h6>{{geolocation.geoCity}}</h6>
              </div>
            </div>
          <div class="col">
            <p>Latitude: 
              <q-input
                disable
                v-model="geolocation.latlng.lat"
                @blur="$v.currentLocationLat.$touch"
                :error="$v.currentLocationLat.$error"
              />
            </p>
            <p>Longitude: 
              <q-input
                disable
                v-model="geolocation.latlng.lng"
              />
            </p>
          </div>
          </div>
          <q-btn :disabled="this.loading" class=" q-ma-sm full-width" color="primary" @click="submit">Submit</q-btn>
        </q-card-main>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, between, numeric } from 'vuelidate/lib/validators'
import CameraView from './CameraView'
import {geolocation} from '../utils/geolocation'

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
      result:'',
      loading: false
    }
  },
  validations: {
    form: {
      name: { required, minlength: minLength(6) },
      description: { required, minlength: minLength(6) },
      foodType: { required, minlength: minLength(6) },
      avgCost: {required, between: between(2, 150)},
    },
    currentLocationLat: {required},
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  getLocation() {
      this.loading = true
     geolocation().then ((results) => {
      this.loading = false
     })

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
      }  else if (this.$v.currentLocationLat.$error) {
        this.$q.notify('Please click "Get location button"')
        // return
      } else {
          this.form.geometry.coordinates.push(this.geolocation.latlng.lat,  this.geolocation.latlng.lng)
          this.result = this.$store.getters['restaurants/getPictureFile']
          this.form.picture = 'http://localhost:3005/uploads/' +this.result.filename
          console.log(this.form)
          let cityExists = this.$store.getters['cities/getCityDetailByName'](this.geolocation.geoCity)
          if (cityExists === undefined) {
             this.$store.dispatch('cities/ADD_CITY', {name: this.geolocation.geoCity}).then((response) => {
               console.log(response)
             this.$store.dispatch('restaurants/ADD_RESTAURANT', {cityId: response.data._id, restaurant:this.form})
          })
          } else {
            this.$store.dispatch('restaurants/ADD_RESTAURANT', {cityId: cityExists._id, restaurant:this.form})
          }
            this.$router.push('/restaurants/list')
         
      }
    }
  },
  computed: {
    geolocation() {
      return this.$store.getters['geolocation/getGeolocation']
    }
  }, 
 }
</script>

<style lang="stylus" scoped>
@import '~variables'

.q-card
  background-color $grey-2
  color black


</style>
