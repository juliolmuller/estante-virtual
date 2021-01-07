<script>
import SideBar from './SideBar'

export default {
  name: 'Home',

  components: {
    SideBar,
  },
}
</script>

<template>
  <div id="home">
    <SideBar />

    <main role="main">
      <KeepAlive include="Bookshelves">
        <RouterView />
      </KeepAlive>

      <footer class="home-footer">
        <p class="text-muted">
          Todos os Direitos Reservados
          &copy; 2019-{{ new Date().getFullYear() }} <strong>LacusSoft</strong>
        </p>
      </footer>
    </main>
  </div>
</template>

<style lang="scss">
#home {
  padding-bottom: 2rem;

  & > main {
    width: calc(100% - 4rem);
    margin: 2rem;
    padding: 2rem 2rem 0;
    background: var(--light);
    opacity: 0.95;
  }

  .home-footer {
    text-align: center;
    line-height: 3rem;
  }

  @media (min-width: 1000px) {
    padding: 2rem;

    #sidebar {
      width: 290px;
    }

    & > main {
      width: calc(100vw - 290px - 5rem);
      margin: 0 0 0 290px;
    }
  }

  @media (min-width: 1500px) {
    & > main {
      max-width: 1100px;
      position: relative;
      left: calc(290px / 2);
      margin: 0 auto;
    }
  }
}
</style>
