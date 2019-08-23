<template>
  <div>
    <h1>Escolha o seu livro na estante:</h1>
    <div class="row mt-5" v-show="booksCount">
      <div class="col-12 col-md-6">
        <BookSearch />
      </div>
      <div class="col-12 col-md-6 text-center">
        <BookFilter />
      </div>
    </div>
    <Bookcase :books="books" :count="booksCount">
      Não há livros cadastrados.
    </Bookcase>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import BookSearch from '@/components/BookSearch.vue'
  import BookFilter from '@/components/BookFilter.vue'
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'Library',
    components: {
      BookSearch,
      BookFilter,
      Bookcase
    },
    methods: {
      ...mapActions(['fetchBooks'])
    },
    computed: {
      ...mapGetters({
        books: 'results',
        allBooks: 'allBooks'
      }),
      booksCount() {
        return this.allBooks.length
      }
    },
    created() {
      this.fetchBooks()
    }
  }
</script>
