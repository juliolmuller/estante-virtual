<template>
  <div class="col-1 col-md-3 d-flex align-items-stretch">
    <div class="card my-2 pt-3 border-hero border-radius-0 text-center">
      <div class="d-flex justify-content-center">
        <img :src="book.image" alt="Capa do livro">
      </div>
      <div class="card-body pb-0">
        <p class="card-title font-weight-bold">{{ book.name }}</p>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-hero" :disabled="!!book.loan">Emprestar</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BookCard',
    props: {
      book: Object
    }
  }
</script>

<style scoped>
  img {
    height: 10rem;
    text-align: center;
    overflow: hidden;
  }
  .card-body {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3rem;
    line-height: 1.5rem;
    max-height: 4.5rem;
  }
  button[disabled] {
    background: #777;
  }
</style>
