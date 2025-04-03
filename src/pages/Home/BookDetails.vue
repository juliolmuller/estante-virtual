<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import ViewTitle from '~/components/ViewTitle.vue';
import type { Book } from '~/models';
import { useAuth, useBookStore, useUserStore } from '~/store';
import { truncateText } from '~/utils';

import fallbackImage from '/img/fallback-image.jpg';

export interface BookDetailsProps {
  bookId: string;
}

const props = defineProps<BookDetailsProps>();

const auth = useAuth();
const bookStore = useBookStore();
const userStore = useUserStore();
const router = useRouter();
const { userData } = storeToRefs(auth);
const book = ref({} as Book);
const dataBackup = ref({} as Book);
const isEditing = ref(false);
const isLoading = ref(false);

const owner = computed(() => {
  const ownerData = userStore.users.find(({ id }) => id === book.value.userId);
  const belongsToUser = book.value.userId === auth.userData?.id;

  return {
    ...ownerData,
    name: belongsToUser ? 'você' : ownerData?.name,
  };
});

const inputStyle = computed(() => ({
  'form-control': isEditing.value,
  'form-control-plaintext': !isEditing.value,
  'font-weight-bold': !isEditing.value,
  'text-hero': !isEditing.value,
}));

const truncatedBookName = computed(() =>
  props.bookId === 'novo' ? 'Novo Livro' : truncateText(book.value.name ?? ''),
);

watch(book, (newValue) => {
  dataBackup.value = { ...newValue };
});

function toggleEditing() {
  isEditing.value = !isEditing.value;
  book.value = { ...dataBackup.value };
}

function handleError({ target }: Event) {
  if (target instanceof HTMLImageElement) {
    target.src = fallbackImage;
  }
}

async function handleSubmit() {
  try {
    isLoading.value = true;

    if (props.bookId === 'novo') {
      book.value = await bookStore.create(book.value);
      isEditing.value = false;
      router.replace({
        name: 'BookDetails',
        params: { bookId: book.value.id },
      });
      return;
    }

    await bookStore.update(book.value);
    isEditing.value = false;
  } finally {
    isLoading.value = false;
  }
}

async function handleBorrow() {
  try {
    isLoading.value = true;
    await bookStore.borrow(book.value);
    const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId);
    book.value = focusedBook ?? ({} as Book);
  } finally {
    isLoading.value = false;
  }
}

async function handleReturn() {
  try {
    isLoading.value = true;
    await bookStore.return(book.value);
    const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId);
    book.value = focusedBook ?? ({} as Book);
  } finally {
    isLoading.value = false;
  }
}

async function handleDelete() {
  if (!confirm(`Tem certeza de que deseja remover o livro "${book.value.name}" do catálogo?`)) {
    return;
  }

  try {
    isLoading.value = true;
    await bookStore.delete(book.value.id);
    router.replace({ name: 'Home' });
  } finally {
    isLoading.value = true;
  }
}

onMounted(async () => {
  await new Promise((resolve) => {
    while (bookStore.isLoading) {} // eslint-disable-line no-empty
    resolve(null);
  });

  if (props.bookId === 'novo') {
    book.value.userId = auth.userData?.id;
    book.value.image = 'https://';
    book.value.loan = false;
    isEditing.value = true;
    return;
  }

  const focusedBook = bookStore.books.find(({ id }) => String(id) === props.bookId);
  if (focusedBook) {
    book.value = focusedBook;
  } else {
    router.replace({ name: 'Home' });
  }
});
</script>

<template>
  <div id="book-details">
    <header>
      <ViewTitle>
        {{ truncatedBookName }}
      </ViewTitle>

      <button v-if="!isEditing" type="button" class="btn btn-sm btn-light" @click="$router.go(-1)">
        <img src="/img/left-arrow.svg" alt="ícone de retornar" />
        Voltar
      </button>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-12 col-md-4">
          <img class="img-fluid" alt="Capa do livro" :src="book.image" @error="handleError" />
        </div>
        <div class="col-12 col-md-8">
          <div v-if="props.bookId !== 'novo'" class="form-group">
            <label for="book-id">Código de Cadastro:</label>
            <input id="book-id" v-model.number="book.id" type="text" :class="inputStyle" readonly />
          </div>
          <div class="form-group">
            <label for="book-name">Título da Obra:</label>
            <input
              id="book-name"
              v-model.trim="book.name"
              type="text"
              :class="inputStyle"
              :readonly="!isEditing"
              required
              autofocus
            />
          </div>
          <div v-if="isEditing" class="form-group">
            <label for="book-image">URL da Capa:</label>
            <input
              id="book-image"
              v-model.trim="book.image"
              type="text"
              :class="inputStyle"
              :readonly="!isEditing"
              required
            />
          </div>
          <div v-if="!isEditing" class="form-group">
            <label for="book-owner">Dono do Livro:</label>
            <input id="book-owner" type="text" :class="inputStyle" :value="owner.name" readonly />
          </div>
          <div v-if="!isEditing" class="form-group">
            <label for="status">Status:</label>
            <input
              id="status"
              type="text"
              :class="{
                ...inputStyle,
                'text-hero': false,
                'text-success': !book.loan,
                'text-danger': !!book.loan,
              }"
              :value="
                book.loan
                  ? `Emprestado desde ${new Date(book.loan.date).toLocaleDateString()}`
                  : 'Disponível'
              "
              readonly
            />
          </div>

          <div class="action-btn">
            <button
              v-if="!isEditing && !book.loan"
              type="button"
              class="btn btn-hero"
              :disabled="isLoading"
              @click="handleBorrow"
            >
              Emprestar Livro
            </button>
            <button
              v-if="!isEditing && book.loan && book.loan.userId === userData?.id"
              type="button"
              class="btn btn-hero"
              :disabled="isLoading"
              @click="handleReturn"
            >
              Devolver Livro
            </button>
            <button
              v-if="isEditing && !book.loan && owner.id === userData?.id && props.bookId !== 'novo'"
              type="button"
              class="btn btn-danger me-auto"
              :disabled="isLoading"
              @click="handleDelete"
            >
              Remover da Estante
            </button>
            <button
              v-if="!book.loan && owner.id === userData?.id && props.bookId !== 'novo'"
              type="button"
              :class="['btn', isEditing ? 'btn-light' : 'btn-secondary']"
              @click="toggleEditing"
            >
              {{ isEditing ? 'Cancelar' : 'Editar Dados' }}
            </button>
            <button v-if="isEditing" type="submit" class="btn btn-hero" :disabled="isLoading">
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

    & > [type='button'] {
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

      &.btn-hero {
        color: #fff;
      }
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
