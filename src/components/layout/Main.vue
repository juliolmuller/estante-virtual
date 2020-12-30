<template>
  <div role="main">
    <main class="container">
      <router-view />
      <div class="text-center">
        <p class="mt-4 text-muted">Todos os Direitos Reservados &copy; 2019</p>
      </div>
    </main>
  </div>
</template>

<script>
export default {}
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
  padding: 2rem 3rem 1rem 3rem;
}
</style>
