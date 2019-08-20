<template>
  <div>
    <viewTitle>Escolha o seu livro na estante:</viewTitle>
    <div class="row">
      <div class="col-12 col-md-6">
        <BookSearch />
      </div>
      <div class="col-12 col-md-6 text-center">
        <BookFilter />
      </div>
    </div>
    <Bookcase :books="allBooks">
      Não há livros cadastrados.
    </Bookcase>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ViewTitle from '@/components/ViewTitle.vue'
  import BookSearch from '@/components/BookSearch.vue'
  import BookFilter from '@/components/BookFilter.vue'
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'Library',
    components: {
      ViewTitle,
      BookSearch,
      BookFilter,
      Bookcase
    },
    methods: {
      ...mapActions(['fetchBooks'])
    },
    computed: {
      ...mapGetters(['allBooks'])
    },
    created() {
      this.fetchBooks()
    }
  }
</script>
