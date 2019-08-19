<template>
  <div class="container">
    <h1>Ben-vindo à Estante Virtual</h1>
    <div class="row">
      <BookCard v-for="book in allBooks" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BookCard from '@/components/BookCard.vue'

  export default {
    name: 'Library',
    components: {
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
