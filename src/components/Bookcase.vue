<template>
  <div class="mt-2">
    <h5 v-show="!books.lenght" class="mt-3">
      <slot></slot>
    </h5>
    <div v-show="books.lenght" class="row">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script>
  import BookCard from '@/components/BookCard.vue'

  export default {
    name: 'Bookcase',
    components: {
      BookCard
    },
    props: {
      books: Array
    }
  }
</script>
