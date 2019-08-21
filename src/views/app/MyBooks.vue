<template>
  <div>
    <h1>Meus livros</h1>
    <button type="button" class="btn btn-sm btn-hero mb-4" @click="addBook">
      Cadastrar Novo Livro
    </button>
    <Bookcase :books="userBooks">
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
      ...mapActions(['fetchUserBooks']),
      addBook() {
        console.log("Adding new book...")
      }
    },
    computed: {
      ...mapGetters(['userId', 'userBooks'])
    },
    created() {
      this.fetchUserBooks(this.userId)
    }
  }
</script>

<style>

</style>
