<template>
  <div>
    <ViewTitle>Meus livros</ViewTitle>
    <Bookcase :books="userBooks">
      Você ainda não possui livros cadastrados.
    </Bookcase>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ViewTitle from '@/components/ViewTitle.vue'
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'MyBooks',
    components: {
      ViewTitle,
      Bookcase
    },
    methods: {
      ...mapActions(['fetchUserBooks'])
    },
    computed: {
      ...mapGetters(['userId', 'userBooks'])
    },
    created() {
      this.fetchUserBooks(this.userId)
    }
  }
</script>

<style>

</style>
