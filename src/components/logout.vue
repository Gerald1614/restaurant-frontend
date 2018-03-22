<template>
  
</template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token
    this.$store.dispatch('auth/LOGOUT')
    this.$router.push('/restaurants/list')
  }
}
</script>