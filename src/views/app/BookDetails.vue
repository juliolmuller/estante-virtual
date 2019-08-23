<template>
  <div>
    <button
      type="button"
      class="btn btn-sm btn-light float-right"
      v-if="!isEditing"
      @click="goBack"
    >Voltar</button>
    <h1 class="mb-4 text-truncate">{{ formTitle }}</h1>
    <form @submit="save">
      <div class="row">
        <div class="col-12 col-md-4" :style="{ visibility: book.image ? 'visible' : 'hidden' }">
          <img class="img-fluid" alt="Capa do livro" :src="book.image">
        </div>
        <div class="col-12 col-md-8">
          <div class="row">
            <div class="col-12">
              <div class="form-group" v-if="isEditing && bookId != 'novo'">
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
                  required autofocus
                  v-model="book.name"
                  :class="{ ...getClasses, 'text-hero': !this.isEditing }"
                />
              </div>
              <div class="form-group" v-if="isEditing">
                <label for="image">URL da Capa:</label>
                <input
                  type="text"
                  id="image"
                  required
                  v-model="book.image"
                  :class="{ ...getClasses, 'text-hero': !this.isEditing }"
                />
              </div>
              <input type="hidden" name="userId" v-model="book.userId" />
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
              <div class="form-group" v-if="!isEditing">
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
            <div class="rcol-12">
              <button
                type="button"
                class="btn btn-hero m-3"
                v-if="!isEditing && !book.loan"
                @click="loanBook"
              >Emprestar Livro</button>
              <button
                type="button"
                class="btn btn-hero m-3"
                v-if="!isEditing && book.loan && book.userId == thisUserId"
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
                :disabled="book.loan"
                @click="drop"
              >Remover da Estante</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import booksApi from '@/services/api/books'
  import usersApi from '@/services/api/users'

  export default {
    name: 'BookDetails',
    data() {
      return {
        formTitle: '',
        book: {},
        ownerName: '',
        userName: '',
        isEditing: false
      }
    },
    props: {
      bookId: String
    },
    methods: {
      ...mapActions(['fetchBooks']),
      goBack() {
        this.$router.go(-1)
      },
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
        e.target.disabled = true
        e.preventDefault()
        if (this.bookId == 'novo') {
          this.book.loan = false
          booksApi.post(this.book)
            .then(response => {
              this.isEditing = false
              e.target.disabled = false
              this.$router.push({ name: 'bookDetails', params: { bookId: JSON.stringify(response.data.id) }})
            })
        } else {
          booksApi.put(this.book)
            .then(response => {
              this.isEditing = false
              e.target.disabled = false
            })
        }
      },
      drop() {
        if (confirm(`Tem certeza de que deseja remover o livro "${this.book.name}" do catálogo?`)) {
          booksApi.delete(this.book.id)
            .then(response => {
              this.isEditing = false
              e.target.disabled = false
              this.$router.push({ name: 'bookDetails', params: { bookId: JSON.stringify(response.data.id) }})
            })
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
      if (this.bookId == 'novo') {
        this.isEditing = true
        this.formTitle = 'Novo Livro'
        this.ownerName = this.thisUserName
        this.book.userId = this.thisUserId
      } else {
        booksApi.getOne(this.bookId)
          .then(response => {
            this.book = response.data
            this.formTitle = response.data.name
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
  }
</script>

<style scoped>

</style>
