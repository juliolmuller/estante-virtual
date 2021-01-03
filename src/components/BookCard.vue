<script>
import truncate from '@/filters/truncate'

export default {

  filters: {
    truncate,
  },

  props: {
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
  },

  computed: {
    route() {
      return {
        name: 'BookDetails',
        params: {
          bookId: this.id,
        },
      }
    },
  },
}
</script>

<template>
  <div class="book-card">
    <div class="card rounded">
      <img :src="image" class="card-img-top" alt="Capa do livro" />
      <div class="card-body">
        <h5 class="card-title" :title="title">
          {{ title | truncate }}
        </h5>
      </div>
      <div class="card-footer">
        <RouterLink :to="route" class="btn btn-hero">
          Ver Detalhes
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.book-card {
  padding: 0.5rem;

  .card {
    height: 100%;
    border: 1px solid var(--hero);
    text-align: center;
    display: flex;
    flex-direction: column;

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
