<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo'
import { useAuth } from '@/store'

const auth = useAuth()
const router = useRouter()

const activated = ref(false)

function handleSignOut() {
  if (confirm('Tem certeza de que quer sair da aplicação?')) {
    auth.signOut()
    router.push({ name: 'SignIn' })
  }
}
</script>

<template>
  <aside id="side-bar">
    <header class="side-bar-header">
      <router-link :to="{ name: 'Home' }">
        <Logo />
      </router-link>

      <button
        type="button"
        class="btn btn-sm btn-outline-hero btn-menu d-block d-lg-none"
        @click="activated = !activated"
      >
        Manu
      </button>
    </header>


    <nav class="nav-links d-lg-block" :class="{ 'd-none': !activated }">
      <router-link :to="{ name: 'Home' }" exact class="btn btn-light">Home</router-link>
      <router-link :to="{ name: 'UserBooks' }" class="btn btn-light">Meus Livros</router-link>
      <router-link :to="{ name: 'UserLoans' }" class="btn btn-light">Meus Empréstimos</router-link>
      <router-link :to="{ name: 'UserProfile' }" class="btn btn-light">Meu Perfil</router-link>
    </nav>

    <button
      type="button"
      class="btn btn-outline-hero btn-signout d-lg-block"
      :class="{ 'd-none': !activated }"
      @click="handleSignOut"
    >
      Sair
    </button>
  </aside>
</template>

<style lang="scss">
#side-bar {
  position: relative;
  box-shadow: 0 4px 40px 4px;
  opacity: 0.95;

  width: 100%;
  background: var(--light);
  margin-bottom: 2rem;

  .side-bar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 1.5rem;

    a:hover, a:active {
      text-decoration: none;
    }
  }

  .nav-links a {
    display: block;
    padding: 6px 8px 6px 16px;

    color: #616161;
    font-size: 25px;
    text-align: left;
    text-decoration: none;

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

    display: flex;
    flex-direction: column;

    box-shadow: 4px 0 40px 4px;
    width: 290px;
    min-height: 100vh;

    .btn-signout {
      margin: auto 2rem 3rem;
    }
  }
}
</style>
