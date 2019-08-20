<template>
  <div>
    <viewTitle>Escolha o seu livro na estante:</viewTitle>
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
  import ViewTitle from '@/components/ViewTitle.vue'
  import BookSearch from '@/components/BookSearch.vue'
  import BookFilter from '@/components/BookFilter.vue'
  import BookCard from '@/components/BookCard.vue'

  export default {
    name: 'Library',
    components: {
      ViewTitle,
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

</style>
