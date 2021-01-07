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
$sidebar-width: 290px;
$main-padding: 2rem;

#home {
  padding-bottom: $main-padding;

  & > main {
    width: calc(100% - ($main-padding * 2));
    margin: $main-padding;
    padding: $main-padding $main-padding 0;
    background: var(--light);
    opacity: 0.95;
  }

  .home-footer {
    text-align: center;
    line-height: 3rem;
  }

  @media (min-width: 1000px) {
    padding: $main-padding;

    #sidebar {
      width: $sidebar-width;
    }

    & > main {
      width: calc(100vw - $sidebar-width - ($main-padding * 2));
      margin: 0 0 0 $sidebar-width;
    }
  }

  @media (min-width: 1500px) {
    & > main {
      max-width: 1100px;
      position: relative;
      left: $sidebar-width / 2;
      margin: 0 auto;
    }
  }
}
</style>
