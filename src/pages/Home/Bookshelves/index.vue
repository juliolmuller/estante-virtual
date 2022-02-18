<script setup>
import { computed, ref } from 'vue'
import ViewTitle from '@/components/ViewTitle'
import BooksDeck from '@/components/BooksDeck'
import { useBooks } from '@/store'

const bookStore = useBooks()

const search = ref('')
const filter = ref('available')

const visibleBooks = computed(() => {
  const books = bookStore[`${filter.value}Books`]
  const actualSearch = new RegExp(search.value, 'i')

  return !search.value ? books : books.filter(
    ({ name }) => name.match(actualSearch),
  )
})
</script>

<template>
  <div id="bookshelves">
    <ViewTitle>
      Escolha o seu livro na estante
    </ViewTitle>

    <div class="row">
      <div class="search-container col-12 col-lg-6 order-lg-2 col-xl-4 offset-xl-3">
        <input
          type="search"
          class="form-control"
          placeholder="Pesquisar por título..."
          v-model="search"
        />
        <img src="@/assets/search-icon.svg" alt="Ícone de busca" />
      </div>

      <div class="filter-container col-12 col-lg-6 order-lg-1 col-xl-5">
        <input type="radio" id="filter-1" class="sr-only" value="available" v-model="filter" />
        <input type="radio" id="filter-2" class="sr-only" value="borrowed" v-model="filter" />
        <label
          for="filter-1"
          :class="['btn', filter === 'available' ? 'btn-hero' : 'btn-outline-hero']"
        >Livros Disponíveis</label>
        <label
          for="filter-2"
          :class="['btn', filter === 'borrowed' ? 'btn-hero' : 'btn-outline-hero']"
        >Livros Emprestados</label>
      </div>
    </div>

    <div class="loading" v-if="bookStore.isLoading">
      <img src="@/assets/loading.svg" alt="Carregando..." />
    </div>
    <div class="fallback-msg" v-else-if="bookStore.books.length === 0">
      Não há livros cadastrados
    </div>
    <div class="fallback-msg" v-else-if="visibleBooks.length === 0">
      Nenhum resultado para "{{ search }}" 🙄
    </div>
    <BooksDeck :books="visibleBooks" :count="visibleBooks.length" v-else />
  </div>
</template>

<style lang="scss">
#bookshelves {
  .search-container {
    position: relative;
    margin-bottom: 1rem;

    input {
      border: 1px solid var(--hero);
    }

    img {
      position: absolute;
      right: 1.5rem;
      top: 0.6rem;

      opacity: 0.5;
      transition: opacity 0.7s;
    }

    &:focus-within img {
      opacity: 1;
    }
  }

  .filter-container {
    display: flex;
    margin-bottom: 1rem;

    & > label {
      flex-grow: 1;

      &:first-of-type {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      &:last-of-type {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
  }

  .loading {
    display: flex;
    height: 60vh;

    & > img {
      margin: auto;
    }
  }

  .fallback-msg {
    padding: 3rem;
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
