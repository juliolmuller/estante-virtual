<script setup lang="ts">
import { computed } from 'vue'
import ViewTitle from '@/components/ViewTitle.vue'
import { Book } from '@/models'
import { useBookStore } from '@/store'

export interface BooksManagerProps {
  title: string
  type: 'userBooks' | 'userLoans'
}

const props = defineProps<BooksManagerProps>()

const bookStore = useBookStore()
const books = computed<Book[]>(() => bookStore[props.type] ?? [])
</script>

<template>
  <div id="books-manager">
    <header>
      <ViewTitle>
        {{ props.title }}
      </ViewTitle>

      <router-link
        :to="{ name: 'BookDetails', params: { bookId: 'novo' }}"
        class="btn btn-hero"
        v-if="props.type === 'userBooks'"
      >+ Cadastrar Novo Livro</router-link>
    </header>

    <div class="fallback-msg" v-if="!books.length">
      Nenhum livro aqui 🙂
    </div>
    <div class="books-list" v-for="book in books" :key="book.id" v-else>
      <img :src="book.image" alt="capa do livro" />
      <div class="book-title">
        {{ book.name }}
      </div>
      <router-link
        :to="{ name: 'BookDetails', params: { bookId: book.id }}"
        class="btn btn-sm btn-secondary"
      >
        <img src="@/assets/pencil.svg" alt="ícone de edição" />
        <span class="d-none d-lg-block">Ver Detalhes...</span>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
#books-manager {
  padding-bottom: 2rem;

  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > a {
      margin-bottom: 3rem;
    }
  }

  .books-list {
    display: flex;
    align-items: center;

    border-top: 1px dotted #333;
    border-bottom: 1px dotted #333;
    padding: 0.5rem;

    & > img {
      width: 4rem;
      height: 6rem;
      object-fit: cover;
    }

    & > .book-title {
      flex-grow: 1;
      padding: 0 1rem;

      text-align: left;
      font-size: x-large;
    }

    & > a {
      display: flex;
      justify-content: space-between;

      img {
        width: 16px;
        height: 16px;
        background-color: #fff;
      }

      span {
        margin-left: 0.5rem;
        min-width: 90px;
      }
    }
  }

  .fallback-msg {
    padding: 3rem;
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
