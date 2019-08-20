<template>
  <div>
    <ViewTitle>Meus livros</ViewTitle>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ViewTitle from '@/components/ViewTitle.vue'

  export default {
    name: 'MyBooks',
    components: {
      ViewTitle
    },
    methods: {
      ...mapActions(['isAuthenticated'])
    },
    computed: mapGetters(['userId']),
    created() {
      console.log(this.userId)
    }
  }
</script>

<style>

</style>
