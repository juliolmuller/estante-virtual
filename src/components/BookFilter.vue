<template>
  <div class="btn-group w-75" role="group">
    <input
      type="button"
      value="Livros Disponíveis"
      class="btn w-50"
      :class="{
        'btn-outline-hero': !showAvailables,
        'btn-hero': showAvailables
      }"
      @click="toggleAvailable"
    />
    <input
      type="button"
      value="Livros Emprestados"
      class="btn w-50"
      :class="{
        'btn-outline-hero': !showUnavailables,
        'btn-hero': showUnavailables
      }"
      @click="toggleUnavailable"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  props: {
    allBooks: Array,
  },

  data: () => ({
    showAvailables: true,
    showUnavailables: false,
  }),

  computed: {
    ...mapGetters(['filterCriteria']),
  },

  methods: {
    ...mapActions(['setFilter']),
    toggleAvailable() {
      this.showAvailables = this.showUnavailables ? !this.showAvailables : true
      this.setFilter({
        available: this.showAvailables,
        unavailable: this.showUnavailables,
      })
    },
    toggleUnavailable() {
      this.showUnavailables = this.showAvailables ? !this.showUnavailables : true
      this.setFilter({
        available: this.showAvailables,
        unavailable: this.showUnavailables,
      })
    },
  },

  mounted() {
    this.showAvailables = this.filterCriteria.available
    this.showUnavailables = this.filterCriteria.unavailable
  },
}
</script>

<style scoped>
.btn-outline-hero:hover {
  background: #ca997c;
}

.btn-hero:hover {
  background: #bb4907;
}

button:focus, button:active{
  box-shadow: none !important;
  outline: 0px !important;
}
</style>
