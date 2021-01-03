<script>
import { mapGetters, mapActions } from 'vuex'
import BooksDeck from '@/components/BooksDeck'

export default {

  components: {
    BooksDeck,
  },

  computed: {
    ...mapGetters(['userId', 'userBooks']),
    booksCount() {
      return this.userBooks.length
    },
  },

  methods: {
    ...mapActions(['fetchUserBooks']),
  },

  created() {
    this.fetchUserBooks(this.userId)
  },
}
</script>

<template>
  <div>
    <h1>Meus livros</h1>

    <router-link :to="{ name: 'bookDetails', params: { bookId: 'novo' }}">
      <button type="button" class="btn btn-sm btn-hero mb-4">Cadastrar Novo Livro</button>
    </router-link>

    <BooksDeck :books="userBooks" />
  </div>
</template>
