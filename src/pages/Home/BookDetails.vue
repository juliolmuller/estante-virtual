<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ViewTitle from '@/components/ViewTitle.vue'
import { Book } from '@/models'
import { useAuth, useBookStore, useUserStore } from '@/store'
import { truncateText } from '@/utils'

export interface BookDetailsProps {
  bookId: string
}

const props = defineProps<BookDetailsProps>()

const auth = useAuth()
const bookStore = useBookStore()
const userStore = useUserStore()
const router = useRouter()
const { userData } = storeToRefs(auth)
const book = reactive<Book>({
  id: 0,
  name: '',
  image: 'https://', // this will throw an error and be handled by "handleError"
  loan: false,
  userId: 0,
})
const dataBackup = ref<Book>()
const isEditing = ref(false)
const isLoading = ref(false)

const owner = computed(() => {
  const ownerData = userStore.users.find((user) => user.id === book.userId)
  const belongsToUser = book.userId === auth.userData?.id

  return {
    ...ownerData,
    name: belongsToUser ? 'você' : ownerData?.name,
  }
})

const inputStyle = computed(() => ({
  'form-control': isEditing.value,
  'form-control-plaintext': !isEditing.value,
  'font-weight-bold': !isEditing.value,
  'text-hero': !isEditing.value,
}))

const truncatedBookName = computed(() => (props.bookId === 'novo'
  ? 'Novo Livro'
  : truncateText(book.name)))

watch(book, (newValue) => {
  dataBackup.value = { ...newValue }
})

function toggleEditing() {
  isEditing.value = !isEditing.value
  Object.assign(book, dataBackup.value)
}

function handleError({ target }: Event) {
  if (target instanceof HTMLImageElement) {
    target.src = '../../assets/fallback-image.jpg'
  }
}

async function handleSubmit() {
  try {
    isLoading.value = true

    if (props.bookId === 'novo') {
      const newBook = await bookStore.create(book)
      Object.assign(book, newBook)
      isEditing.value = false
      router.replace({
        name: 'BookDetails',
        params: { bookId: book.id },
      })
      return
    }

    await bookStore.update(book)
    isEditing.value = false
  } finally {
    isLoading.value = false
  }
}

async function handleBorrow() {
  try {
    isLoading.value = true
    await bookStore.borrow(book)
    const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId)
    Object.assign(book, focusedBook)
  } finally {
    isLoading.value = false
  }
}

async function handleReturn() {
  try {
    isLoading.value = true
    await bookStore.return(book)
    const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId)
    Object.assign(book, focusedBook)
  } finally {
    isLoading.value = false
  }
}

async function handleDelete() {
  if (!confirm(`Tem certeza de que deseja remover o livro "${book.name}" do catálogo?`)) {
    return
  }

  try {
    isLoading.value = true
    await bookStore.delete(book.id)
    router.replace({ name: 'Home' })
  } finally {
    isLoading.value = true
  }
}

onMounted(async () => {
  await new Promise((resolve) => {
    while (bookStore.isLoading) {} // eslint-disable-line no-empty
    resolve(null)
  })

  if (props.bookId === 'novo') {
    book.userId = auth.userData?.id
    book.image = 'https://'
    book.loan = false
    isEditing.value = true
    return
  }

  const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId)
  if (focusedBook) {
    Object.assign(book, focusedBook)
  } else {
    router.replace({ name: 'Home' })
  }
})
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
            @error="handleError"
          />
        </div>
        <div class="col-12 col-md-8">
          <div class="form-group" v-if="props.bookId !== 'novo'">
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
            >
              Emprestar Livro
            </button>
            <button
              type="button"
              class="btn btn-hero"
              :disabled="isLoading"
              v-if="!isEditing && book.loan && book.loan.userId === userData?.id"
              @click="handleReturn"
            >
              Devolver Livro
            </button>
            <button
              type="button"
              class="btn btn-danger mr-auto"
              v-if="isEditing && !book.loan && owner.id === userData?.id && props.bookId !== 'novo'"
              :disabled="isLoading"
              @click="handleDelete"
            >
              Remover da Estante
            </button>
            <button
              type="button"
              :class="['btn', isEditing ? 'btn-light' : 'btn-secondary']"
              v-if="!book.loan && owner.id === userData?.id && props.bookId !== 'novo'"
              @click="toggleEditing"
            >
              {{ isEditing ? 'Cancelar' : 'Editar Dados' }}
            </button>
            <button
              type="submit"
              class="btn btn-hero"
              :disabled="isLoading"
              v-if="isEditing"
            >
              Concluído
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
#book-details {
  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > [type="button"] {
      margin-bottom: 3rem;

      & > img {
        height: 8px;
      }
    }
  }

  & .form-group {
    margin-bottom: 1rem;

    & label {
      margin-bottom: 0;
    }
  }

  & .form-control {
    margin: 0.5rem 0 1.5rem;
    outline: none;
  }

  & .form-control-plaintext {
    outline: none;
    font-size: large;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    & .btn {
      margin: 1.5rem 0.5rem;
    }
  }

  .error-feedback {
    margin-top: -1.2rem;
    margin-left: 0.5rem;

    color: #f00;
    font-style: italic;
    font-weight: 600;
  }
}
</style>
