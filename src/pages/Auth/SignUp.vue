<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '~/store';

const auth = useAuth();
const router = useRouter();
const state = reactive({
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
});

async function handleSubmit() {
  const isAuthenticated = await auth.signUp(state);

  if (isAuthenticated) {
    router.push({ name: 'Home' });
    return;
  }

  state.password = '';
  state.passwordRepeat = '';
}

watch(
  () => state.email,
  (newValue) => {
    state.email = newValue.toLocaleLowerCase().trim();
  },
);
</script>

<template>
  <form id="sign-up" @submit.prevent="handleSubmit">
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ visibility: auth.errors.length ? 'visible' : 'hidden' }"
    >
      <p v-for="error in auth.errors" :key="error" class="text-danger">
        {{ error }}
      </p>
    </div>

    <label for="name" class="visually-hidden">Nome do usuário</label>
    <input
      id="name"
      v-model="state.name"
      type="text"
      class="form-control"
      placeholder="Nome do usuário"
      required
      autofocus
    />

    <label for="email" class="visually-hidden">Endereço de email</label>
    <input
      id="email"
      v-model="state.email"
      type="email"
      class="form-control"
      placeholder="Endereço de email"
      required
    />

    <label for="password" class="visually-hidden">Senha de acesso</label>
    <input
      id="password"
      v-model="state.password"
      type="password"
      class="form-control"
      placeholder="Senha de acesso"
      required
    />

    <label for="password-confirmation" class="visually-hidden">Confirmação da senha</label>
    <input
      id="password-confirmation"
      v-model="state.passwordRepeat"
      type="password"
      class="form-control"
      placeholder="Confirmação da senha"
      required
    />

    <button type="submit" class="btn btn-lg btn-hero text-white" :disabled="auth.isLoading">
      Cadastrar
    </button>
    <p class="mt-1 text-center">
      <router-link :to="{ name: 'SignIn' }"> Já sou cadastrado </router-link>
    </p>
  </form>
</template>
