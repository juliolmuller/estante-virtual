<template>
  <div class="home">
    <SideBar />
    <Main />
  </div>
</template>

<script>
  import SideBar from '@/components/layout/SideBar.vue'
  import Main from '@/components/layout/Main.vue'

  export default {
    name: 'home',
    components: {
      SideBar,
      Main
    }
  }
</script>
