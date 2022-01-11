<script>
import { mapGetters, mapActions } from 'vuex'
import fallbackImg from '@/assets/fallback-image.jpg'
import ViewTitle from '@/components/ViewTitle'
import { truncateText } from '@/utils'

export default {
  name: 'BookDetails',

  components: {
    ViewTitle,
  },

  props: {
    bookId: {
      type: [Number, String],
      required: true,
    },
  },

  data: () => ({
    isLoading: false,
    isEditing: false,
    dataBackup: {},
    book: {},
  }),

  computed: {
    ...mapGetters({
      appLoading: 'isLoading',
      books: 'books/allBooks',
      users: 'users/allUsers',
      user: 'auth/userData',
    }),
    owner() {
      const owner = this.users.find((user) => user.id === this.book.userId) || {}
      const belongsToUser = this.book.userId === this.user.id

      return {
        ...owner,
        name: belongsToUser ? 'você' : owner.name,
      }
    },
    inputStyle() {
      return {
        'form-control': this.isEditing,
        'form-control-plaintext': !this.isEditing,
        'font-weight-bold': !this.isEditing,
        'text-hero': !this.isEditing,
      }
    },
    truncatedBookName() {
      return this.bookId === 'novo' ? 'Novo Livro' : truncateText(this.book.name)
    },
  },

  watch: {
    book(newValue) {
      this.dataBackup = { ...newValue }
    },
  },

  methods: {
    ...mapActions('books', {
      createBook: 'create',
      updateBook: 'update',
      borrowBook: 'borrow',
      returnBook: 'return',
      deleteBook: 'delete',
    }),
    toggleEditing() {
      this.isEditing = !this.isEditing
      this.book = { ...this.dataBackup }
    },
    fallbackImage(event) {
      event.target.src = fallbackImg
    },
    async handleSubmit() {
      this.isLoading = true

      try {
        if (this.bookId === 'novo') {
          this.book = await this.createBook(this.book)
          this.isEditing = false
          this.$router.replace({
            name: 'BookDetails',
            params: { bookId: this.book.id },
          })
        } else {
          await this.updateBook(this.book)
          this.isEditing = false
        }
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async handleBorrow() {
      this.isLoading = true

      try {
        await this.borrowBook(this.book)
        this.book = this.books.find(({ id }) => this.bookId === id)
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async handleReturn() {
      this.isLoading = true

      try {
        await this.returnBook(this.book)
        this.book = this.books.find(({ id }) => this.bookId === id)
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async handleDelete() {
      if (confirm(`Tem certeza de que deseja remover o livro "${this.book.name}" do catálogo?`)) {
        this.isLoading = true

        try {
          await this.deleteBook(this.book)
          this.$router.replace({ name: 'Home' })
        } catch (error) {
          throw error
        } finally {
          this.isLoading = true
        }
      }
    },
  },

  async mounted() {
    await new Promise((resolve) => {
      while (this.appLoading) {} // eslint-disable-line no-empty
      resolve()
    })

    if (this.bookId === 'novo') {
      this.book.userId = this.user.id
      this.book.image = 'https://'
      this.book.loan = false
      this.isEditing = true
      return
    }

    const book = this.books.find(({ id }) => this.bookId === id)

    if (book) {
      this.book = { ...book }
    } else {
      this.$router.replace({ name: 'Home' })
    }
  },
}
</script>

<template>
  <div id="book-details">
    <header>
      <ViewTitle>
        {{ truncatedBookName }}
      </ViewTitle>

      <button
        type="button"
        class="btn btn-sm btn-light"
        v-if="!isEditing"
        @click="$router.go(-1)"
      >
        <img src="@/assets/left-arrow.svg" alt="ícone de retornar" />
        Voltar
      </button>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12 col-md-4">
          <img
            class="img-fluid"
            alt="Capa do livro"
            :src="book.image"
            @error="fallbackImage"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="form-group" v-if="bookId !== 'novo'">
            <label for="book-id">Código de Cadastro:</label>
            <input
              type="text"
              id="book-id"
              :class="inputStyle"
              v-model.number="book.id"
              readonly
            />
          </div>
          <div class="form-group">
            <label for="book-name">Título da Obra:</label>
            <input
              type="text"
              id="book-name"
              :class="inputStyle"
              v-model.trim="book.name"
              :readonly="!isEditing"
              required
              autofocus
            />
          </div>
          <div class="form-group" v-if="isEditing">
            <label for="book-image">URL da Capa:</label>
            <input
              type="text"
              id="book-image"
              :class="inputStyle"
              v-model.trim="book.image"
              :readonly="!isEditing"
              required
            />
          </div>
          <div class="form-group" v-if="!isEditing">
            <label for="book-owner">Dono do Livro:</label>
            <input
              type="text"
              id="book-owner"
              :class="inputStyle"
              :value="owner.name"
              readonly
            />
          </div>
          <div class="form-group" v-if="!isEditing">
            <label for="status">Status:</label>
            <input
              type="text"
              id="status"
              :class="{
                ...inputStyle,
                'text-hero': false,
                'text-success': !book.loan,
                'text-danger': !!book.loan
              }"
              :value="book.loan
                ? `Emprestado desde ${(new Date(book.loan.date)).toLocaleDateString()}`
                : 'Disponível'"
              readonly
            />
          </div>

          <div class="action-btn">
            <button
              type="button"
              class="btn btn-hero"
              :disabled="isLoading"
              v-if="!isEditing && !book.loan"
              @click="handleBorrow"
            >Emprestar Livro</button>
            <button
              type="button"
              class="btn btn-hero"
              :disabled="isLoading"
              v-if="!isEditing && book.loan && book.loan.userId === user.id"
              @click="handleReturn"
            >Devolver Livro</button>
            <button
              type="button"
              class="btn btn-danger mr-auto"
              v-if="isEditing && !book.loan && owner.id === user.id && bookId !== 'novo'"
              :disabled="isLoading"
              @click="handleDelete"
            >Remover da Estante</button>
            <button
              type="button"
              :class="['btn', isEditing ? 'btn-light' : 'btn-secondary']"
              v-if="!book.loan && owner.id === user.id && bookId !== 'novo'"
              @click="toggleEditing"
            >{{ isEditing ? 'Cancelar' : 'Editar Dados' }}</button>
            <button
              type="submit"
              class="btn btn-hero"
              :disabled="isLoading"
              v-if="isEditing"
            >Concluído</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="./styles.scss"></style>
