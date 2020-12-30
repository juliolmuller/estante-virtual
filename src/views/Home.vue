<template>
  <div class="home">
    <SideBar />
    <Main />

    <button
      type="button"
      class="btn btn-hero"
      @click="onClick"
    >Sair</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SideBar from '../components/layout/SideBar'
import Main from '../components/layout/Main'

export default {

  components: {
    SideBar,
    Main,
  },

  methods: {
    ...mapActions(['signOut']),
    onClick() {
      if (confirm('Tem certeza que quer sair dessa aplicação?')) {
        this.signOut()
        this.$router.push({ name: 'auth' })
      }
    },
  },
}
</script>

<style scoped>
button {
  position: fixed;
  z-index: 1;
  top: 2rem;
  right: 2rem;
  width: 75px;
}
</style>
