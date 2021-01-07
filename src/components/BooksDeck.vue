<script>
import BookCard from './BookCard'

const MIN_WIDTH = 250

export default {

  components: {
    BookCard,
  },

  props: {
    books: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    spacers: [],
  }),

  methods: {
    setSpacers() {
      const deckWidth = this.$refs.deck.clientWidth
      const colsCount = parseInt(deckWidth / MIN_WIDTH, 10)
      const rowsCOunt = Math.ceil(this.books.length / colsCount)
      const spacersCount = (colsCount * rowsCOunt) - this.books.length
      console.log(deckWidth, this.books.length, colsCount, rowsCOunt, spacersCount)

      this.spacers = new Array(spacersCount || 0).fill().map((_, index) => index)
    },
  },

  mounted() {
    this.setSpacers()

    window.onresize = () => {
      if (this?.$refs?.deck) {
        this.setSpacers()
      }
    }
  },
}
</script>

<template>
  <div class="books-deck row" ref="deck">
    <BookCard
      class="col"
      v-for="book in books"
      :key="book.id"
      :image="book.image"
      :title="book.name"
      :id="book.id"
    />
    <div
      class="col"
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
