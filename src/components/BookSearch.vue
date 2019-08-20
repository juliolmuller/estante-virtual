<template>
  <div class="form-group">
    <input type="text" class="form-control border-hero" id="search" placeholder="Pesquisar livro..." autofocus v-model="search">
  </div>
</template>

<script>
  export default {
    name: 'BookSearch',
    data() {
      return {
        search: ''
      }
    }
  }
</script>

<style>

</style>
