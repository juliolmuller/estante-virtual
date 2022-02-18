<script setup>
import { computed } from 'vue'
import { truncateText } from '@/utils'

// eslint-disable-next-line no-undef
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})

const route = computed(() => {
  return {
    name: 'BookDetails',
    params: {
      bookId: props.id,
    },
  }
})

const truncatedTitle = computed(() => {
  return truncateText(props.title)
})
</script>

<template>
  <div class="book-card">
    <div class="card rounded">
      <img :src="props.image" class="card-img-top" alt="Capa do livro" />
      <div class="card-body">
        <h5 class="card-title" :title="props.title">
          {{ truncatedTitle }}
        </h5>
      </div>
      <div class="card-footer">
        <router-link :to="route" class="btn btn-hero">
          Ver Detalhes
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.book-card {
  padding: 0.5rem;

  .card {
    display: flex;
    flex-direction: column;

    height: 100%;
    border: 1px solid var(--hero);
    text-align: center;

    img {
      width: 100%;
      height: 180px;
      object-fit: contain;
    }

    a {
      width: 80%;
    }
  }
}
</style>
