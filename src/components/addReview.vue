<template>
  <div class="q-pa-sm" v-touch-swipe.right="goBack">
    <div class="row justify-center">
      <div class="col-6">
        <q-input
          class="q-ma-sm"
          v-model="form.title"
          @blur="$v.form.title.$touch"
          @keyup.enter="submit"
          :error="$v.form.title.$error"
          placeholder="Title"
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
        <q-rating
          color="orange"
          v-model="form.rating"
          @blur="$v.form.rating.$touch"
          :error="$v.form.rating.$error"
          :max="5"
        />
        <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        title: '',
        text: '',
        rating: '',
        user: '',
        restaurant:''
      }
    }
  },
  validations: {
    form: {
      title: { required, minlength: minLength(6) },
      text: { required, minlength: minLength(6) },
      rating: { required },
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
        submit () {
      this.$v.form.$touch()
      if (this.$v.form.title.$error) {
        this.$q.notify('Title incorrect')
        // return
      } else if (this.$v.form.text.$error) {
        this.$q.notify('6 characters minimum')
        // return
      } else if (this.$v.form.rating.$error) {
        this.$q.notify('Please select a rating')
        // return
      } else {
        console.log('ok')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
