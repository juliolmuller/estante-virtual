<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import BookCard from '~/components/BookCard.vue';
import type { Book } from '~/models';

export interface BOoksDeckProps {
  books: Book[];
}

const props = defineProps<BOoksDeckProps>();

const MIN_WIDTH = 250;

const containerRef = ref<HTMLDivElement>();
const spacers = ref<number[]>([]);

function setSpacers() {
  const deckWidth = containerRef.value?.clientWidth as number;
  const colsCount = Math.round(deckWidth / MIN_WIDTH);
  const rowsCOunt = Math.ceil(props.books.length / colsCount);
  const spacersCount = colsCount * rowsCOunt - props.books.length;

  spacers.value = Array(spacersCount || 0)
    .fill(null)
    .map((_, index) => index);
}

watch(props.books, () => setSpacers());

onMounted(() => {
  setSpacers();

  window.onresize = () => {
    if (containerRef.value) {
      setSpacers();
    }
  };
});
</script>

<template>
  <div ref="containerRef" class="books-deck row">
    <BookCard
      v-for="book in props.books"
      :id="book.id"
      :key="book.id"
      class="col"
      :image="book.image"
      :title="book.name"
    />
    <div v-for="i in spacers" :key="i" class="col book-card" />
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
