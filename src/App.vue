<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
export default {

  beforeCreate() {
    this.$store.dispatch('users/fetchAll')
    this.$store.dispatch('books/fetchAll')
  },
}
</script>

<style lang="scss">
/* Define variables to oberwrite/add to Bootstrap theme */
$border-radius: 0.5rem;
$theme-colors: (
  'hero': #d8621e
);

/* Import Bootstrap framework */
@import 'node_modules/bootstrap/scss/bootstrap';
/* Additional custom styles */
html, body, #app {
  width: 100%;
  height: 100%;
}

body {
  background-image: url('./assets/background.jpg');
  background-position: top center;
  background-attachment: fixed;
  background-size: cover;
  background-color: #000;
}
</style>
