<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
  this.$axios.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        this.$store.dispatch('auth/LOGOUT')
      // you can also redirect to /login if needed !
      }
      throw err;
    });
  });
}
}
</script>
  
<style>
</style>
