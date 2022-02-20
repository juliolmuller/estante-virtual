<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useAuth, useBookStore, useUserStore } from '@/store'

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
/* Define variables to oberwrite/add to Bootstrap theme */
$border-radius: 0.5rem;
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 1000px,
  xl: 1280px
);
$theme-colors: (
  hero: #d8621e
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
