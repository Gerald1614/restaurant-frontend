<template>
  <div class="container q-pa-md">
    <div class="row justify-center">
      <div class="col-6">
        <q-input
          class="q-ma-sm"
          v-model="form.name"
          @blur="$v.form.name.$touch"
          @keyup.enter="submit"
          :error="$v.form.name.$error"
          placeholder="Your username"
        />
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
          type="password"
          @blur="$v.form.password.$touch"
          @keyup.enter="submit"
          :error="$v.form.password.$error"
          placeholder="Your Password"
        />
        <q-input
          class="q-ma-sm"
          v-model="form.passwordCheck"
          type="password"
          @blur="$v.form.passwordCheck.$touch"
          @keyup.enter="submit"
          :error="$v.form.passwordCheck.$error"
          placeholder="Confirm your Password"
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
        email: '',
        password: '',
        passwordCheck: '',
        name: ''
      }
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minlength: minLength(6) },
      passwordCheck: { required, sameAs: sameAs('password') },
      name: { required, minlength: minLength(4) },
    }
  },
  methods: {
    submit () {
      this.$v.form.$touch()
      if (this.$v.form.name.$error) {
        this.$q.notify('Please define a username of 4 characters minimum')
        // return
      } else if (this.$v.form.email.$error) {
        this.$q.notify('Please review the format of the email.')
        // return
      } else if (this.$v.form.password.$error) {
        this.$q.notify('Password must be 6 character\'s long')
        // return
      } else if (this.$v.form.passwordCheck.$error) {
        this.$q.notify('The two passwords do not match')
        // return
      } else {
         this.$axios.post('/account/register', { email: this.form.email, password: this.form.password, name: this.form.name })
          .then((response) => {
             this.$axios.post('/account/login', { email: this.form.email, password: this.form.password })
              .then(request => this.loginSuccessful(request))
              .catch(() => this.loginFailed())
          })
          .catch(() => this.signupFailed())
      }
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      localStorage.token = req.data.token
      localStorage.name = req.data.name
      this.error = false
      this.$store.dispatch('auth/LOGIN', {token: req.data.token, id: req.data.id, name: req.data.name, email: req.data.user })
      this.$router.push('/restaurants/list')
    },

    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('auth/LOGOUT')
    },
    signupFailed () {
      this.error = 'Signup failed!'
            this.$router.push('/signup')
    }
  }
}
</script>
