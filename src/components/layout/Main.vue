<template>
  <div role="main">
    <main class="container">
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
  .container {
    background: rgb(255, 255, 255, 0.9);
  }
</style>
