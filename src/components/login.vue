<template>
  <div class="container q-pa-md">
    <div class="row justify-center">
      <div class="col-4-sm">
        <q-alert
          type="negative"
          v-if="error"
          icon="cloud"
          :actions="[{ label: 'Dismiss', handler: () => { visible = false } }]"
        >{{ error }}
        </q-alert>
        <q-input
          class="q-ma-sm"
          v-model="login.email"
          placeholder="Your email"
        />
        <q-input
          class="q-ma-sm"
          v-model="login.password"
          placeholder="Your Password"
        />
        <q-btn class="q-ma-sm" color="primary" @click="submit">Submit</q-btn>
        <p>Not an existing user, please <a href="/signup"> a profile</a></p>
      </div>
    </div>
    
  </div>
</template>

<script>

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
    this.$router.replace(this.$route.query.redirect || '/restaurants/list')
    },

    loginFailed () {
      this.error = 'Login failed!'
      delete localStorage.token
    }
  }
}
</script>
