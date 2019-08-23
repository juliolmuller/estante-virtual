<template>
  <div>
    <h1>Meus livros</h1>
    <router-link :to="{ name: 'bookDetails', params: { bookId: 'novo' }}">
      <button type="button" class="btn btn-sm btn-hero mb-4">Cadastrar Novo Livro</button>
    </router-link>
    <Bookcase :books="userBooks" :count="booksCount">
      Você ainda não possui livros cadastrados.
    </Bookcase>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'MyBooks',
    components: {
      Bookcase
    },
    methods: {
      ...mapActions(['fetchUserBooks'])
    },
    computed: {
      ...mapGetters(['userId', 'userBooks']),
      booksCount() {
        return this.userBooks.length
      }
    },
    created() {
      this.fetchUserBooks(this.userId)
    }
  }
</script>
