<template>
  
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$store.dispatch('auth/LOGOUT')
    this.$router.push('/restaurants/list')
  }
}
</script>