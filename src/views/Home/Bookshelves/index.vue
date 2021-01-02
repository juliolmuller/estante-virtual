<script>
import { mapGetters } from 'vuex'
import Bookcase from '@/components/Bookcase'

export default {

  components: {
    Bookcase,
  },

  data: () => ({
    search: '',
    filter: 'available',
  }),

  computed: {
    ...mapGetters({
      booksLoading: 'books/isFetching',
    }),
    ...mapGetters('books', [
      'borrowedBooks',
      'availableBooks',
    ]),
    visibleBooks() {
      return this[`${this.filter}Books`]
    },
  },
}
</script>

<template>
  <div id="bookshelves">
    <h2 class="h1">
      Escolha o seu livro na estante
    </h2>

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

    <div class="loading" v-if="booksLoading">
      <img src="@/assets/loading.svg" alt="Carregando..." />
    </div>
    <Bookcase :books="visibleBooks" :count="visibleBooks.length" v-else>
      Não há livros cadastrados.
    </Bookcase>
  </div>
</template>

<style lang="scss">
#bookshelves {

  & > h2 {
    margin-bottom: 3rem;
  }

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
    height: 60vh;
    display: flex;

    & > img {
      margin: auto;
    }
  }
}
</style>
