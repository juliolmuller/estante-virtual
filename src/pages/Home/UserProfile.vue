<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ViewTitle from '@/components/ViewTitle.vue'
import { useAuth, useUserStore } from '@/store'

interface UserFormData {
  id: number
  name: string
  email: string
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

const auth = useAuth()
const userStore = useUserStore()
const user = ref({} as Partial<UserFormData>)
const dataBackup = ref({} as Partial<UserFormData>)
const isEditing = ref(false)
const isLoading = ref(false)

const passwordsMatch = computed(() => {
  return user.value.newPassword === user.value.newPasswordConfirmation
})

const inputStyle = computed(() => ({
  'form-control': isEditing.value,
  'form-control-plaintext': !isEditing.value,
  'font-weight-bold': !isEditing.value,
  'text-hero': !isEditing.value,
}))

watch(user, (newValue) => {
  dataBackup.value = { ...newValue }
})

function toggleEditing() {
  isEditing.value = !isEditing.value
  user.value = { ...dataBackup.value }
}

async function handleSubmit() {
  try {
    isLoading.value = true
    await auth.updateUserData(user.value as UserFormData)
    isEditing.value = false
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await new Promise((resolve) => {
    while (userStore.isLoading) {} // eslint-disable-line no-empty
    resolve(null)
  })

  user.value = {
    ...auth.userData,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  }
})
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
          class="btn btn-hero text-white"
          :disabled="!passwordsMatch || isLoading"
          v-if="isEditing"
        >Concluído</button>
      </div>
    </form>
  </div>
</template>


<style lang="scss">
#user-profile {
  & > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > [type="button"] {
      margin-bottom: 3rem;

      & > img {
        height: 8px;
      }
    }
  }

  & .form-group {
    margin-bottom: 1rem;

    & label {
      margin-bottom: 0;
    }
  }

  & .form-control {
    margin: 0.5rem 0 1.5rem;
    outline: none;
  }

  & .form-control-plaintext {
    outline: none;
    font-size: large;
  }

  .action-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    & .btn {
      margin: 1.5rem 0.5rem;
    }
  }

  .error-feedback {
    margin-top: -1.2rem;
    margin-left: 0.5rem;

    color: #f00;
    font-style: italic;
    font-weight: 600;
  }
}
</style>
