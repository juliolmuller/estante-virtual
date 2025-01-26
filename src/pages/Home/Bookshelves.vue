<script setup lang="ts">
import { computed, ref } from 'vue'
import BooksDeck from '~/components/BooksDeck.vue'
import ViewTitle from '~/components/ViewTitle.vue'
import type { Book } from '~/models'
import { useBookStore } from '~/store'

const bookStore = useBookStore()
const filter = ref<'available' | 'borrowed'>('available')
const search = ref('')

const visibleBooks = computed(() => {
  const books = bookStore[`${filter.value}Books`] as Book[]
  const actualSearch = new RegExp(search.value, 'i')

  return !search.value ? books : books.filter(({ name }) => {
    return name.match(actualSearch)
  })
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
        <img src="/img/search-icon.svg" alt="Ícone de busca" />
      </div>

      <div class="filter-container col-12 col-lg-6 order-lg-1 col-xl-5">
        <input type="radio" id="filter-1" class="visually-hidden" value="available" v-model="filter" />
        <input type="radio" id="filter-2" class="visually-hidden" value="borrowed" v-model="filter" />
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
      <img src="/img/loading.svg" alt="Carregando..." />
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
      border: 1px solid var(--bs-hero);
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

      &:hover, &.btn-hero {
        color: #fff;
      }

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
