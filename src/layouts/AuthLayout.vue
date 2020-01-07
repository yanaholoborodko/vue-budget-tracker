<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>


<script>
export default {
  computed: {
    //accesses the getter
    //if getter changes, this computed value will update (thanks to the 'watch' below)
    error() {
      return this.$store.getters.error
    }
  },
  //which value should we watch
  watch: {
    error(fbError) {
      this.$error(fbError.message)
    }
  }
}
</script>