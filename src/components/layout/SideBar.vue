<template>
  <div>>
    <div class="sidebar">
      <div class="text-center">
        <Logo />
      </div>
      <nav class="mt-5">
        <router-link :to="{ name: 'home' }" class="btn btn-lg btn-light">Home</router-link>
        <router-link :to="{ name: 'myBooks' }" class="btn btn-lg btn-light">Meus Livros</router-link>
        <router-link :to="{ name: 'myLoans' }" class="btn btn-lg btn-light">Meus Empréstimos</router-link>
        <router-link :to="{ name: 'myProfile' }" class="btn btn-lg btn-light">Meu Perfil</router-link>
      </nav>
    </div>
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
  .navbar {
    background-color: rgb(255, 255, 255, 0.9);
  }
  .sidebar {
    background-color: rgb(255, 255, 255, 0.9);
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 15%;
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
  .sidebar a:hover {
    background: #d8621e;
    color: #fff;
  }
  .router-link-exact-active.router-link-active {
    background: #ca997c;
    color: #fff;
  }
</style>
