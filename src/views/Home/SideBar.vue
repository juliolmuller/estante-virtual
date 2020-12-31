<template>
  <aside id="sidebar">
    <header class="sidebar-header">
      <RouterLink :to="{ name: 'Home' }">
        <Logo />
      </RouterLink>
    </header>

    <nav class="nav-links">
      <RouterLink :to="{ name: 'Home' }" exact class="btn btn-light">Home</RouterLink>
      <RouterLink :to="{ name: 'UserBooks' }" class="btn btn-light">Meus Livros</RouterLink>
      <RouterLink :to="{ name: 'UserLoans' }" class="btn btn-light">Meus Empréstimos</RouterLink>
      <RouterLink :to="{ name: 'UserProfile' }" class="btn btn-light">Meu Perfil</RouterLink>
    </nav>

    <button
      type="button"
      class="btn btn-outline-hero"
      @click="handleSignOut"
    >Sair</button>
  </aside>
</template>

<script>
import { mapActions } from 'vuex'
import Logo from '@/components/Logo'

export default {

  components: {
    Logo,
  },

  methods: {
    ...mapActions('auth', [
      'signOut',
    ]),
    async handleSignOut() {
      if (confirm('Tem certeza de que quer sair da aplicação?')) {
        await this.signOut()
        this.$router.push({ name: 'SignIn' })
      }
    },
  },
}
</script>

<style lang="scss">
#sidebar {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  width: 290px;
  background: var(--light);
  opacity: 0.95;
  overflow: hidden;
  box-shadow: 4px 0 40px 4px;
  display: flex;
  flex-direction: column;

  .sidebar-header {
    padding: 2rem 1.5rem;

    a:hover, a:active {
      text-decoration: none;
    }
  }

  .nav-links a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    text-align: left;
    font-size: 25px;
    color: #616161;
    display: block;

    &.router-link-exact-active {
      background: #d8814f;
      color: #fff;
    }

    &:hover, &.router-link-exact-active:hover {
      background: var(--hero);
      color: #fff;
    }
  }

  button {
    margin: auto 2rem 3rem;
    border-width: 2px;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
