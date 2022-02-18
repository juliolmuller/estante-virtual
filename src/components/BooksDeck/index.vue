<script setup>
import { onMounted, ref, watch } from 'vue'
import BookCard from '@/components/BookCard'

const MIN_WIDTH = 250

// eslint-disable-next-line no-undef
const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
})

const containerRef = ref(null)
const spacers = ref([])

function setSpacers() {
  const deckWidth = containerRef.value.clientWidth
  const colsCount = parseInt(deckWidth / MIN_WIDTH, 10)
  const rowsCOunt = Math.ceil(props.books.length / colsCount)
  const spacersCount = (colsCount * rowsCOunt) - props.books.length

  spacers.value = Array(spacersCount || 0).fill().map((_, index) => index)
}

watch(props.books, () => setSpacers())

onMounted(() => {
  setSpacers()

  window.onresize = () => {
    if (containerRef.value) {
      setSpacers()
    }
  }
})
</script>

<template>
  <div class="books-deck row" ref="containerRef">
    <BookCard
      class="col"
      v-for="book in props.books"
      :key="book.id"
      :image="book.image"
      :title="book.name"
      :id="book.id"
    />
    <div
      class="col book-card"
      v-for="i in spacers"
      :key="i"
    ></div>
  </div>
</template>

<style lang="scss">
.books-deck {
  & > .book-card {
    min-width: 250px;
    flex: 1;
  }
}
</style>
