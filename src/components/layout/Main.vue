<template>
  <div role="main">
    <main class="conteiner">
      <router-view />
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style scoped>
  div[role="main"] {
    margin: 10px 0;
    padding-top: 2rem;
  }
  @media (min-width: 1400px) {
    div[role="main"] {
      margin-left: 15%;
    }
  }
</style>
