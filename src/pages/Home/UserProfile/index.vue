<script>
import { mapGetters, mapActions } from 'vuex'
import ViewTitle from '@/components/ViewTitle'

export default {
  name: 'UserProfile',

  components: {
    ViewTitle,
  },

  data: () => ({
    isLoading: false,
    isEditing: false,
    dataBackup: {},
    user: {},
  }),

  computed: {
    ...mapGetters({
      appLoading: 'isLoading',
      userById: 'users/userById',
      userData: 'auth/userData',
    }),
    passwordsMatch() {
      return this.user.newPassword === this.user.newPasswordConfirmation
    },
    inputStyle() {
      return {
        'form-control': this.isEditing,
        'form-control-plaintext': !this.isEditing,
        'font-weight-bold': !this.isEditing,
        'text-hero': !this.isEditing,
      }
    },
  },

  watch: {
    user(newValue) {
      this.dataBackup = { ...newValue }
    },
  },

  methods: {
    ...mapActions('auth', {
      updateUserData: 'update',
    }),
    toggleEditing() {
      this.isEditing = !this.isEditing
      this.user = { ...this.dataBackup }
    },
    async handleSubmit() {
      this.isLoading = true

      try {
        await this.updateUserData(this.user)
        this.isEditing = false
      } catch (error) {
        throw error
      } finally {
        this.isLoading = false
      }
    },
  },

  async mounted() {
    await new Promise((resolve) => {
      while (this.appLoading) {} // eslint-disable-line no-empty
      resolve()
    })

    this.user = {
      ...this.userData,
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }
  },
}
</script>

<template>
  <div id="user-profile">
    <header>
      <ViewTitle>
        Perfil do Usuário
      </ViewTitle>

      <button
        type="button"
        class="btn btn-sm btn-light"
        v-if="!isEditing"
        @click="toggleEditing"
      >
        Editar Dados
      </button>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="user-id">Código de Cadastro:</label>
        <input
          type="text"
          id="user-id"
          :class="inputStyle"
          v-model.number="user.id"
          readonly
        />
      </div>
      <div class="form-group">
        <label for="user-name">Nome Completo:</label>
        <input
          type="text"
          id="user-name"
          :class="inputStyle"
          v-model.trim="user.name"
          :readonly="!isEditing"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="user-email">E-mail de Contato:</label>
        <input
          type="email"
          id="user-email"
          :class="inputStyle"
          v-model.trim="user.email"
          :readonly="!isEditing"
          required
        />
      </div>
      <div class="card border-hero" v-if="isEditing">
        <h5 class="card-header">Mudar Senha</h5>
        <div class="card-body">
          <div class="form-group">
            <label for="user-password">Senha Atual:</label>
            <input
              type="password"
              id="user-password"
              :class="inputStyle"
              v-model.trim="user.oldPassword"
              :required="Boolean(user.newPassword || user.newPasswordConfirmation)"
            />
          </div>
          <div class="form-group">
            <label for="user-new-password">Nova Senha:</label>
            <input
              type="password"
              id="user-new-password"
              :class="inputStyle"
              v-model.trim="user.newPassword"
              :required="Boolean(user.oldPassword || user.newPasswordConfirmation)"
            />
          </div>
          <div class="form-group">
            <label for="user-new-password-confirmation">Repetir a Nova Senha:</label>
            <input
              type="password"
              id="user-new-password-confirmation"
              :class="inputStyle"
              v-model.trim="user.newPasswordConfirmation"
              :required="Boolean(user.oldPassword || user.newPassword)"
            />
            <div class="error-feedback" v-if="!passwordsMatch">
              A nova senha e sua confirmação não conferem.
            </div>
          </div>
        </div>
      </div>

      <div class="action-btn">
        <button
          type="button"
          class="btn btn-light"
          v-if="isEditing"
          @click="toggleEditing"
        >Cancelar</button>
        <button
          type="submit"
          class="btn btn-hero"
          :disabled="!passwordsMatch || isLoading"
          v-if="isEditing"
        >Concluído</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" src="../BookDetails/styles.scss"></style>
