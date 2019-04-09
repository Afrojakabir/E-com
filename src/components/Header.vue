<template>
<div>
  <h2 class="text-center">{{pageTitle}}</h2>
</div>
</template>

<script>
export default {
  name: 'LayoutHeader',
  props: {
    msg: String,
    pageTitle: { type: String, default: 'Akaba'}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
