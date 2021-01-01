<script>
import BookCard from './BookCard'

export default {

  components: {
    BookCard,
  },

  props: {
    books: Array,
    count: Number,
  },
}
</script>

<template>
  <div class="mt-3">
    <h5 v-show="!count" class="mt-3">
      <slot></slot>
    </h5>
    <div v-show="count" class="row">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>
