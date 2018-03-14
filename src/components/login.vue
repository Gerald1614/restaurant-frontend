<template>
  <div class="container q-pa-md">
    <div class="row justify-center">
      <div class="col-3">
        <q-input
          class="q-ma-sm"
          v-model="form.email"
          @blur="$v.form.email.$touch"
          @keyup.enter="submit"
          :error="$v.form.email.$error"
          placeholder="Your email"
        />
        <q-input
          class="q-ma-sm"
          v-model="form.password"
          @blur="$v.form.password.$touch"
          @keyup.enter="submit"
          :error="$v.form.password.$error"
          placeholder="Your Password"
        />
        <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minlength: minLength(6) }
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.email.$error) {
        this.$q.notify('Please review fields again.')
        // return
      } else if (this.$v.form.password.$error) {
        this.$q.notify('Email must be 6 character\'s long')
        // return
      } else {
        console.log('ok')
      }
    }
  }
}
</script>
