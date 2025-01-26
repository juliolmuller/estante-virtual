<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAuth, useBookStore, useUserStore } from '~/store'

const auth = useAuth()
const bookStore = useBookStore()
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(auth)

auth.recoverFromStorage()

watch(isAuthenticated, (value) => {
  if (value) {
    bookStore.fetchAll()
    userStore.fetchAll()
  }
}, { immediate: true })
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Bootstrap's utilities functions
@import 'bootstrap/scss/_functions';

// Bootstrap's variables to be overridden
$border-radius: 0.5rem;
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 1000px,
  xl: 1280px,
  xxl: 1400px
);

// Bootstrap's utilities
@import 'bootstrap/scss/_variables';
@import 'bootstrap/scss/_mixins';
@import 'bootstrap/scss/_root';

// Colors to merge to Bootstrap's theme
$custom-colors: (
  hero: #d8621e
);
$theme-colors: map-merge($theme-colors, $custom-colors);

// Bootstrap's required styles
@import 'bootstrap/scss/bootstrap';

// Additional global styles
html, body, #app {
  width: 100%;
  height: 100%;
}

body {
  background-image: url('/img/background.jpg');
  background-position: top center;
  background-attachment: fixed;
  background-size: cover;
  background-color: #000;
}
</style>
