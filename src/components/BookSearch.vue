<template>
  <div class="form-group">
    <input
      type="text"
      class="form-control border-hero"
      placeholder="Pesquisar livro..."
      autofocus
      @keyup="search"
    />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BookSearch',
    methods: {
      ...mapActions(['setSearch']),
      search(e) {
        this.setSearch(e.target.value)
      }
    }
  }
</script>
