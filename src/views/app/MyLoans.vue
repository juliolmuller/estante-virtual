<template>
  <div>
    <h1 class="mb-4">Meus empréstimos</h1>

    <Bookcase :books="userLoans" :count="booksCount">
      Você ainda não possui empréstimos.
    </Bookcase>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Bookcase from '../../components/Bookcase'

export default {

  components: {
    Bookcase,
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
