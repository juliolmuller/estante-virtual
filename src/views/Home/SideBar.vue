<script>
import { mapActions } from 'vuex'
import Logo from '@/components/Logo'

export default {
  name: 'SideBar',

  components: {
    Logo,
  },

  data: () => ({
    menuActivated: false,
  }),

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

<template>
  <aside id="sidebar">
    <header class="sidebar-header">
      <RouterLink :to="{ name: 'Home' }">
        <Logo />
      </RouterLink>

      <button
        type="button"
        class="btn btn-sm btn-outline-hero btn-menu d-block d-lg-none"
        @click="menuActivated = !menuActivated"
      >Manu</button>
    </header>


    <nav class="nav-links d-lg-block" :class="{ 'd-none': !menuActivated }">
      <RouterLink :to="{ name: 'Home' }" exact class="btn btn-light">Home</RouterLink>
      <RouterLink :to="{ name: 'UserBooks' }" class="btn btn-light">Meus Livros</RouterLink>
      <RouterLink :to="{ name: 'UserLoans' }" class="btn btn-light">Meus Empréstimos</RouterLink>
      <RouterLink :to="{ name: 'UserProfile' }" class="btn btn-light">Meu Perfil</RouterLink>
    </nav>

    <button
      type="button"
      class="btn btn-outline-hero btn-signout d-lg-block"
      :class="{ 'd-none': !menuActivated }"
      @click="handleSignOut"
    >Sair</button>
  </aside>
</template>

<style lang="scss">
#sidebar {
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
  background: var(--light);
  opacity: 0.95;
  box-shadow: 0 4px 40px 4px;

  .sidebar-header {
    padding: 2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

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
    text-transform: uppercase;
  }

  .btn-signout {
    width: 80%;
    margin: 3rem 10%;
    border-width: 2px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media (min-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 290px;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0 40px 4px;

    .btn-signout {
      width: 100%;
      margin: auto 2rem 3rem;
    }
  }
}
</style>
