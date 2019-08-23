<template>
  <div>
    <h1 class="mb-4">{{ book.name }}</h1>
    <form @submit="save">
      <div class="row">
        <div class="col-12 col-md-4">
          <img class="img-fluid" alt="Capa do livro" :src="book.image">
        </div>
        <div class="col-12 col-md-8">
          <div class="form-group">
            <label for="id">ID:</label>
            <input
              type="text"
              id="id"
              disabled
              v-model="book.id"
              :class="{ ...getClasses, 'text-hero': !this.isEditing }"
            />
          </div>
          <div class="form-group">
            <label for="name">Título:</label>
            <input
              type="text"
              id="name"
              autofocus
              v-model="book.name"
              :class="{ ...getClasses, 'text-hero': !this.isEditing }"
            />
          </div>
          <div class="form-group" v-if="isEditing">
            <label for="image">URL da Capa:</label>
            <input
              type="text"
              id="image"
              autofocus
              v-model="book.image"
              :class="{ ...getClasses, 'text-hero': !this.isEditing }"
            />
          </div>
          <div class="form-group">
            <label for="ownerName">Dono do Livro:</label>
            <input
              type="text"
              id="ownerName"
              :disabled="isEditing"
              :value="ownerName"
              :class="{ ...getClasses, 'text-hero': !this.isEditing }"
            />
          </div>
          <div class="form-group">
            <label for="name">Status:</label>
            <input
              type="text"
              id="name"
              :class="getClasses"
              :style="{ 'color': !!book.loan ? 'red' : 'green' }"
              :value="book.loan ? `Emprestado a ${userName} desde ${(new Date('2019-03-30')).toLocaleDateString()}` : 'Disponível'"
            />
          </div>
        </div>
        <div class="row">
          <button
            type="button"
            class="btn btn-hero m-3"
            v-if="!isEditing && !book.loan"
            @click="loanBook"
          >Emprestar Livro</button>
          <button
            type="button"
            class="btn btn-hero m-3"
            v-if="!isEditing && book.loan"
            @click="returnBook"
          >Devolver Livro</button>
          <button
            type="button"
            class="btn btn-info m-3"
            v-if="!isEditing && book.userId == thisUserId"
            @click="edit"
          >Editar Dados</button>
          <button
            type="submit"
            class="btn btn-primary m-3"
            v-if="isEditing"
          >Salvar</button>
          <button
            type="button"
            class="btn btn-danger m-3"
            v-if="isEditing && bookId != 'novo'"
            @click="dropBook"
          >Remover da Estante</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import booksApi from '@/services/api/books'
  import usersApi from '@/services/api/users'

  export default {
    name: 'BookDetails',
    data() {
      return {
        book: {},
        ownerName: '',
        userName: '',
        isEditing: this.bookId == 'novo'
      }
    },
    props: {
      bookId: String
    },
    methods: {
      loanBook() {
        this.book.loan = {
          userId: this.thisUserId,
          date: (new Date()).toISOString().substring(0, 10)
        }
        booksApi.put(this.book)
          .then(response => {
            this.bbok = response.data
            this.userName = 'você'
          })
      },
      returnBook() {
        this.book.loan = false
        booksApi.put(this.book)
          .then(response => {
            this.bbok = response.data
          })
      },
      edit() {
        this.isEditing = !this.isEditing
        this.ownerName = this.thisUserName
      },
      save(e) {
        e.preventDefault()
        console.log('Saving...')
      },
      drop() {
        if (confirm(`Tem certeza de que deseja remover o livro "${this.book.name}" do catálogo?`)) {
          console.log('Droping...')
        }
      }
    },
    computed: {
      ...mapGetters({
        thisUserId: 'userId',
        thisUserName: 'userName'
      }),
      getClasses() {
        return {
          'form-control': this.isEditing,
          'border-hero': this.isEditing,
          'form-control-plaintext': !this.isEditing,
          'h4': !this.isEditing,
          'pt-0': !this.isEditing
        }
      }
    },
    created() {
      booksApi.getOne(this.bookId)
        .then(response => {
          this.book = response.data
          usersApi.getOne(this.book.userId)
            .then(response => {
              this.ownerName = response.data.name
            })
          if (this.book.loan) {
            if (this.book.loan.userId == this.thisUserId) {
              this.userName = 'você'
            } else {
              usersApi.getOne(this.book.loan.userId)
                .then(response => {
                  this.userName = response.data.name
                })
            }
          }
        })
    }
  }
</script>

<style scoped>

</style>
