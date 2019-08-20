<template>
  <div class="btn-group w-75" role="group">
    <button type="button" class="btn w-50" @click="toggleAvailable()" :class="{ 'btn-outline-hero': !showAvailables, 'btn-hero': showAvailables }">Livros Disponíveis</button>
    <button type="button" class="btn w-50" @click="toggleUnavailable()" :class="{ 'btn-outline-hero': !showUnavailables, 'btn-hero': showUnavailables }">Livros Emprestados</button>
  </div>
</template>

<script>
  export default {
    name: 'BookFilter',
    data() {
      return {
        showAvailables: true,
        showUnavailables: false
      }
    },
    methods: {
      toggleAvailable() {
        this.showAvailables = this.showUnavailables ? !this.showAvailables : true
      },
      toggleUnavailable() {
        this.showUnavailables = this.showAvailables ? !this.showUnavailables : true
      }
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
