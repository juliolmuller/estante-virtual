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
                  :value="book.loan
                    ? `Emprestado a ${userName} desde ${(new Date('2019-03-30')).toLocaleDateString()}`
                    : 'Disponível'
                  "
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
import { booksApi, usersApi } from '../../services/api'

export default {

  props: {
    bookId: String,
  },

  data: () => ({
    formTitle: '',
    book: {},
    ownerName: '',
    userName: '',
    isEditing: false,
  }),

  computed: {
    ...mapGetters({
      thisUserId: 'userId',
      thisUserName: 'userName',
    }),
    getClasses() {
      return {
        'form-control': this.isEditing,
        'border-hero': this.isEditing,
        'form-control-plaintext': !this.isEditing,
        'h4': !this.isEditing,
        'pt-0': !this.isEditing,
      }
    },
  },

  methods: {
    ...mapActions(['fetchBooks']),
    goBack() {
      this.$router.go(-1)
    },
    async loanBook() {
      this.book = await booksApi.put({
        ...this.book,
        loan: {
          userId: this.thisUserId,
          date: (new Date()).toISOString().substring(0, 10),
        },
      })
      this.userName = 'você'
    },
    async returnBook() {
      this.book.loan = false
      this.bbok = await booksApi.put(this.book)
    },
    edit() {
      this.isEditing = !this.isEditing
      this.ownerName = this.thisUserName
    },
    async save(event) {
      event.preventDefault()
      event.target.disabled = true

      if (this.bookId === 'novo') {
        this.book.loan = false
        this.book = await booksApi.post(this.book)
        event.target.disabled = false
        this.isEditing = false
        this.$router.push({
          name: 'bookDetails',
          params: { bookId: JSON.stringify(this.book.id) },
        })
      } else {
        this.book = await booksApi.put(this.book)
        event.target.disabled = false
        this.isEditing = false
      }
    },
    async drop(event) {
      if (confirm(`Tem certeza de que deseja remover o livro "${this.book.name}" do catálogo?`)) {
        await booksApi.delete(this.book.id)

        event.target.disabled = false
        this.isEditing = false
        this.$router.push({
          name: 'bookDetails',
          params: { bookId: JSON.stringify(this.book.id) },
        })
      }
    },
  },

  async created() {
    if (this.bookId === 'novo') {
      this.isEditing = true
      this.formTitle = 'Novo Livro'
      this.ownerName = this.thisUserName
      this.book.userId = this.thisUserId
    } else {
      this.book = await booksApi.getOne(this.bookId)
      this.formTitle = this.book.name
      this.ownerName = (await usersApi.getOne(this.book.userId)).name

      if (this.book.loan) {
        if (this.book.loan.userId === this.thisUserId) {
          this.userName = 'você'
        } else {
          this.userName = (await usersApi.getOne(this.book.loan.userId)).name
        }
      }
    }
  },
}
</script>
