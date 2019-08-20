<template>
  <div class="container">
    <h1 class="px-3 pt-4 pb-3">Escolha o seu livro na estante:</h1>
    <div class="row px-3">
      <div class="col-12 col-md-6">
        <BookSearch />
      </div>
      <div class="col-12 col-md-6 text-center">
        <BookFilter />
      </div>
    </div>
    <div class="row px-3">
      <BookCard v-for="book in allBooks" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BookSearch from '@/components/BookSearch.vue'
  import BookFilter from '@/components/BookFilter.vue'
  import BookCard from '@/components/BookCard.vue'

  export default {
    name: 'Library',
    components: {
      BookSearch,
      BookFilter,
      BookCard
    },
    methods: {
      ...mapActions(['fetchBooks'])
    },
    computed: mapGetters(['allBooks']),
    created() {
      this.fetchBooks()
    }
  }
</script>

<style scoped>
  .container {
    background: rgb(255, 255, 255, 0.9);
  }
</style>
