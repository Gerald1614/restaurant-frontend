<template>
  <div class="container q-pa-md">
    <div class="row justify-center">
      <div class="col-3">
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
      }
    }
  },
  methods: {
    submit () {
      console.log('coucou')
    }
  }
}
</script>
