<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  /*
  * Define theme color to be incorporated in Bootstrap styles
  */
  $theme-colors: (
    'hero': #d8621e
  );

  /**
  * Import Bootstrap styles framework
  */
  @import 'node_modules/bootstrap/scss/bootstrap';

  /**
  * Additional custom styles
  */
  body {
    background-image: url('./assets/background.jpg');
    background-position: top center;
    background-attachment: fixed;
    background-size: cover;
    background-color: #000;
    width: 100%;
    overflow: scroll;
  }
</style>
