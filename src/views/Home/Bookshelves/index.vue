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
import BookSearch from '@/components/BookSearch'
import BookFilter from '@/components/BookFilter'
import Bookcase from '@/components/Bookcase'

export default {

  components: {
    BookSearch,
    BookFilter,
    Bookcase,
  },

  computed: {
    ...mapGetters({
      books: 'results',
      allBooks: 'allBooks',
    }),
    booksCount() {
      return this.allBooks.length
    },
  },

  methods: {
    ...mapActions(['fetchBooks']),
  },

  created() {
    this.fetchBooks()
  },
}
</script>
