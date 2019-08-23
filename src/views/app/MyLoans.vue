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
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'MyLoans',
    components: {
      Bookcase
    },
    methods: {
      ...mapActions(['fetchUserLoans'])
    },
    computed: {
      ...mapGetters(['userId', 'userLoans']),
      booksCount() {
        return this.userLoans.length
      }
    },
    created() {
      this.fetchUserLoans(this.userId)
    }
  }
</script>

<style>

</style>
