<template>
  <div class="sidebar">
    <Logo class="text-center" />
    <nav class="mt-5">
      <router-link class="btn btn-lg btn-light active" to="home">Home</router-link>
      <router-link class="btn btn-lg btn-light" to="myBooks">Meus Livros</router-link>
      <router-link class="btn btn-lg btn-light" to="myLoans">Meus Empréstimos</router-link>
      <router-link class="btn btn-lg btn-light" to="myProfile">Meu Perfil</router-link>
    </nav>
  </div>
</template>

<script>
  import Logo from '@/components/Logo.vue'

  export default {
    name: 'SideBar',
    components: {
      Logo
    }
  }
</script>

<style>
  .sidebar {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 15%;
    background-color: rgb(255, 255, 255, 0.9);
    overflow-x: hidden;
    padding-top: 20px;
  }

  .sidebar a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    text-align: left;
    font-size: 25px;
    color: #616161;
    display: block;
  }
  .active, .sidebar a:hover {
    background: #d8621e;
    color: #fff;
  }
</style>
