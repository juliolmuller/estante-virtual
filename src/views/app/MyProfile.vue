<template>
  <div>
    <h1 :class="{ 'mb-4': isEditing }">Meus empréstimos</h1>
    <button
      type="button"
      class="btn btn-sm btn-hero mb-4"
      v-show="!isEditing"
      @click="edit"
    >
      Editar Dados
    </button>
    <form>
      <div class="form-group">
        <label for="name">Nome Completo:</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          :class="getClasses"
        />
      </div>
      <div class="form-group">
        <label for="email">Email de Contato:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          :class="getClasses"
        />
      </div>
      <div class="card border-hero p-3 bg-white w-50" v-show="isEditing">
        <h4 class="mb-4">Mudar Senha</h4>
        <div class="form-group">
          <label for="oldPassword">Senha atual:</label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Deve ter no mínimo 8 digitos"
            :class="getClasses"
          />
        </div>
        <div class="form-group">
          <label for="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Deve ter no mínimo 8 digitos"
            :class="getClasses"
          />
        </div>
        <div class="form-group">
          <label for="newPasswordConfirmation">Repetir a Nova Senha:</label>
          <input
            type="password"
            id="newPasswordConfirmation"
            placeholder="Deve ser igual a nova senha"
            :class="getClasses"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-hero m-3"
        v-show="isEditing"
        @click="save($event)"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Bookcase from '@/components/Bookcase.vue'

  export default {
    name: 'MyProfile',
    data() {
      return {
        user: {},
        isEditing: false
      }
    },
    methods: {
      ...mapActions(['fetchUserLoans']),
      edit() {
        this.isEditing = true
      },
      save($event) {
        $event.preventDefault()
        console.log('Commiting changes...')
        this.isEditing = false
      }
    },
    computed: {
      ...mapGetters(['userData', 'userLoans']),
      getClasses() {
        return {
          'form-control': this.isEditing,
          'border-hero': this.isEditing,
          'text-hero': !this.isEditing,
          'text-bold': !this.isEditing,
          'form-control-plaintext': !this.isEditing,
          'h4': !this.isEditing,
        }
      }
    },
    created() {
      this.user = {
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email
      }
    }
  }
</script>

<style>

</style>
