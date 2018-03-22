<template>
  <div class="container q-pa-md">
    <div class="row justify-center">
      <div class="col-4-sm">
        <q-input
          class="q-ma-sm"
          v-model="login.email"
          placeholder="Your email"
        />
        <q-input
          class="q-ma-sm"
          type="password"
          v-model="login.password"
          placeholder="Your Password"
        />
        <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
        <p>Not an existing user, please <a href="/signup"> a profile</a></p>
        <transition
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
          appear
        >
          <q-alert
            type="negative"
            class="q-mt-sm"
            v-if="error"
            icon="cloud"
            appear
            :actions="[{ label: 'Dismiss', handler: () => { error = false } }]"
          >{{ error }}
          </q-alert>
        </transition>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      login: {
        email: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    submit () {
    this.$axios.post('/account/login', { email: this.login.email, password: this.login.password })
    .then(request => this.loginSuccessful(request))
    .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      localStorage.token = req.data.token
      this.error = false
      this.$store.dispatch('auth/LOGIN', {token: req.data.token, id: req.data.id, name: req.data.name, email: req.data.user })
      this.$router.replace(this.$route.query.redirect || '/restaurants/list')
    },

    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('auth/LOGOUT')
      delete localStorage.token
    }
  }
}
</script>
