<template>
  <div>
    <h1 class="mb-4">{{ book.name }}</h1>
    <div>
      <div class="float-left">
        <img :src="book.image" alt="Capa do livro">
      </div>
      <form @submit="save">
        <button type="button" class="btn btn-sm btn-hero mb-4">
          Cadastrar Novo Livro
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  import api from '@/services/api/books'

  export default {
    name: 'BookDetails',
    data() {
      return {
        book: {}
      }
    },
    props: {
      id: String
    },
    methods: {
      save(e) {
        e.preventDefault()
        console.log('Saving...')
      }
    },
    created() {
      api.getOne(this.id)
        .then(response => {
          this.book = response.data
        })
    }
  }
</script>

<style>
  div > img {
    height: 16rem;
    margin-right: 3rem;
    text-align: center;
  }
</style>
