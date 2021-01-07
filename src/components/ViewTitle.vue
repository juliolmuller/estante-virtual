<template>
  <h2 id="view-title" class="h1">
    <slot></slot>
  </h2>
</template>

<script>
export default {
  name: 'ViewTitle',
}
</script>

<style lang="scss">
#view-title {
  margin-bottom: 3rem;
}
</style>
