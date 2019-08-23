<template>
  <div class="btn-group w-75" role="group">
    <button type="button" class="btn w-50" @click="toggleAvailable()" :class="{ 'btn-outline-hero': !showAvailables, 'btn-hero': showAvailables }">Livros Disponíveis</button>
    <button type="button" class="btn w-50" @click="toggleUnavailable()" :class="{ 'btn-outline-hero': !showUnavailables, 'btn-hero': showUnavailables }">Livros Emprestados</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'BookFilter',
    data() {
      return {
        showAvailables: true,
        showUnavailables: false
      }
    },
    props: {
      allBooks: Array
    },
    methods: {
      ...mapActions(['setFilter']),
      toggleAvailable() {
        this.showAvailables = this.showUnavailables ? !this.showAvailables : true
        this.setFilter({
          available: this.showAvailables,
          unavailable: this.showUnavailables
        })
      },
      toggleUnavailable() {
        this.showUnavailables = this.showAvailables ? !this.showUnavailables : true
        this.setFilter({
          available: this.showAvailables,
          unavailable: this.showUnavailables
        })
      }
    },
    computed: {
      ...mapGetters(['filterCriteria'])
    },
    mounted() {
      this.showAvailables = this.filterCriteria.available
      this.showUnavailables = this.filterCriteria.unavailable
    }
  }
</script>

<style scoped>
  .btn-outline-hero:hover {
    background: #ca997c;
  }
  .btn-hero:hover {
    background: #bb4907;
  }
  button:focus, button:active{
    box-shadow: none !important;
    outline: 0px !important;
  }
</style>
