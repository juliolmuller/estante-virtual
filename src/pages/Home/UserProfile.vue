<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import ViewTitle from '~/components/ViewTitle.vue';
import { useAuth, useUserStore } from '~/store';

interface UserFormData {
  email: string;
  id: number;
  name: string;
  newPassword: string;
  newPasswordConfirmation: string;
  oldPassword: string;
}

const auth = useAuth();
const userStore = useUserStore();
const user = ref({} as Partial<UserFormData>);
const dataBackup = ref({} as Partial<UserFormData>);
const isEditing = ref(false);
const isLoading = ref(false);

const passwordsMatch = computed(() => {
  return user.value.newPassword === user.value.newPasswordConfirmation;
});

const inputStyle = computed(() => ({
  'form-control': isEditing.value,
  'form-control-plaintext': !isEditing.value,
  'font-weight-bold': !isEditing.value,
  'text-hero': !isEditing.value,
}));

watch(user, (newValue) => {
  dataBackup.value = { ...newValue };
});

function toggleEditing() {
  isEditing.value = !isEditing.value;
  user.value = { ...dataBackup.value };
}

async function handleSubmit() {
  try {
    isLoading.value = true;
    await auth.updateUserData(user.value as UserFormData);
    isEditing.value = false;
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await new Promise((resolve) => {
    while (userStore.isLoading) {} // eslint-disable-line no-empty
    resolve(null);
  });

  user.value = {
    ...auth.userData,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  };
});
</script>

<template>
  <div id="user-profile">
    <header>
      <ViewTitle>Perfil do Usuário</ViewTitle>

      <button v-if="!isEditing" type="button" class="btn btn-sm btn-light" @click="toggleEditing">
        Editar Dados
      </button>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="user-id">Código de Cadastro:</label>
        <input id="user-id" v-model.number="user.id" type="text" :class="inputStyle" readonly />
      </div>
      <div class="form-group">
        <label for="user-name">Nome Completo:</label>
        <input
          id="user-name"
          v-model.trim="user.name"
          type="text"
          :class="inputStyle"
          :readonly="!isEditing"
          required
          autofocus
        />
      </div>
      <div class="form-group">
        <label for="user-email">E-mail de Contato:</label>
        <input
          id="user-email"
          v-model.trim="user.email"
          type="email"
          :class="inputStyle"
          :readonly="!isEditing"
          required
        />
      </div>
      <div v-if="isEditing" class="card border-hero">
        <h5 class="card-header">Mudar Senha</h5>
        <div class="card-body">
          <div class="form-group">
            <label for="user-password">Senha Atual:</label>
            <input
              id="user-password"
              v-model.trim="user.oldPassword"
              type="password"
              :class="inputStyle"
              :required="Boolean(user.newPassword || user.newPasswordConfirmation)"
            />
          </div>
          <div class="form-group">
            <label for="user-new-password">Nova Senha:</label>
            <input
              id="user-new-password"
              v-model.trim="user.newPassword"
              type="password"
              :class="inputStyle"
              :required="Boolean(user.oldPassword || user.newPasswordConfirmation)"
            />
          </div>
          <div class="form-group">
            <label for="user-new-password-confirmation">Repetir a Nova Senha:</label>
            <input
              id="user-new-password-confirmation"
              v-model.trim="user.newPasswordConfirmation"
              type="password"
              :class="inputStyle"
              :required="Boolean(user.oldPassword || user.newPassword)"
            />
            <div v-if="!passwordsMatch" class="error-feedback">
              A nova senha e sua confirmação não conferem.
            </div>
          </div>
        </div>
      </div>

      <div class="action-btn">
        <button v-if="isEditing" type="button" class="btn btn-light" @click="toggleEditing">
          Cancelar
        </button>
        <button
          v-if="isEditing"
          type="submit"
          class="btn btn-hero text-white"
          :disabled="!passwordsMatch || isLoading"
        >
          Concluído
        </button>
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

    & > [type='button'] {
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
