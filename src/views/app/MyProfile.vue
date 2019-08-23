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
        <div class="invalid-feedback" v-show="errors.name">
          {{ errors.name }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email de Contato:</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          :class="getClasses"
        />
        <div class="invalid-feedback" v-show="errors.email">
          {{ errors.email }}
        </div>
      </div>
      <div class="card border-hero p-3 bg-white w-50" v-show="isEditing">
        <h4 class="mb-4">Mudar Senha</h4>
        <div class="form-group">
          <label for="oldPassword">Senha atual:</label>
          <input
            type="password"
            id="oldPassword"
            placeholder="Deve ter no mínimo 8 digitos"
            v-model="user.oldPassword"
            :class="getClasses"
          />
          <div class="invalid-feedback" v-show="errors.oldPassword">
            {{ errors.oldPassword }}
          </div>
        </div>
        <div class="form-group">
          <label for="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Deve ter no mínimo 8 digitos"
            v-model="user.newPassword"
            :class="getClasses"
          />
          <div class="invalid-feedback" v-show="errors.newPassword">
            {{ errors.newPassword }}
          </div>
        </div>
        <div class="form-group">
          <label for="newPasswordConfirmation">Repetir a Nova Senha:</label>
          <input
            type="password"
            id="newPasswordConfirmation"
            placeholder="Deve ser igual a nova senha"
            v-model="user.newPasswordConfirmation"
            :class="getClasses"
          />
          <div class="invalid-feedback" v-show="errors.newPassword">
            Repita inteiramente o valor para a nova senha
          </div>
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

  export default {
    name: 'MyProfile',
    data() {
      return {
        user: {},
        isEditing: false,
        errors: {}
      }
    },
    methods: {
      ...mapActions(['fetchUserLoans']),
      edit() {
        this.isEditing = true
      },
      save(e) {
        e.target.disabled = true
        e.preventDefault()
        this.isEditing = false
        e.target.disabled = false
      }
    },
    computed: {
      ...mapGetters(['userData', 'userLoans']),
      getClasses() {
        return {
          'form-control': this.isEditing,
          'border-hero': this.isEditing,
          'text-hero': !this.isEditing,
          'form-control-plaintext': !this.isEditing,
          'h4': !this.isEditing,
          'pt-0': !this.isEditing
        }
      }
    },
    created() {
      this.user = {
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
      }
    }
  }
</script>
