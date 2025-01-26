<script setup lang="ts">
import SideBar from '~/components/SideBar.vue'
</script>

<template>
  <div id="home">
    <SideBar />

    <main role="main">
      <router-view v-slot="{ Component }">
        <keep-alive include="Bookshelves">
          <component :is="Component" />
        </keep-alive>
      </router-view>

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
    opacity: 0.95;
    width: calc(100% - 4rem);
    margin: 2rem;
    background: var(--bs-light);
    padding: 2rem 2rem 0;
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
      position: relative;
      left: calc(290px / 2);

      max-width: 1100px;
      margin: 0 auto;
    }
  }
}
</style>
