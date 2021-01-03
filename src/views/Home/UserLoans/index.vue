<script>
import { mapGetters, mapActions } from 'vuex'
import BooksDeck from '@/components/BooksDeck'

export default {

  components: {
    BooksDeck,
  },

  computed: {
    ...mapGetters(['userId', 'userLoans']),
    booksCount() {
      return this.userLoans.length
    },
  },

  methods: {
    ...mapActions(['fetchUserLoans']),
  },

  created() {
    this.fetchUserLoans(this.userId)
  },
}
</script>

<template>
  <div>
    <h1 class="mb-4">Meus empréstimos</h1>

    <BooksDeck :books="userLoans" :count="booksCount" />
  </div>
</template>
