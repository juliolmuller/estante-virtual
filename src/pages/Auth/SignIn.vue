<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth } from '~/store';

const auth = useAuth();
const router = useRouter();
const state = reactive({
  email: '',
  password: '',
  rememberMe: false,
});

async function handleSubmit() {
  const isAuthenticated = await auth.signIn(state);

  if (isAuthenticated) {
    router.push({ name: 'Home' });
    return;
  }

  state.password = '';
}

watch(
  () => state.email,
  (newValue) => {
    state.email = newValue.toLocaleLowerCase().trim();
  },
);
</script>

<template>
  <form id="sign-in" @submit.prevent="handleSubmit">
    <div
      class="alert alert-danger border-danger"
      role="alert"
      :style="{ visibility: auth.errors.length ? 'visible' : 'hidden' }"
    >
      <p v-for="error in auth.errors" :key="error" class="text-danger">
        {{ error }}
      </p>
    </div>

    <label for="email" class="visually-hidden">Endereço de email</label>
    <input
      id="email"
      v-model="state.email"
      type="email"
      class="form-control"
      placeholder="Endereço de email"
      required
      autofocus
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

    <label class="mt-2 checkbox">
      <input v-model="state.rememberMe" type="checkbox" value="remember-me" /> Mantenha-me conectado
    </label>

    <button
      type="submit"
      class="mt-3 btn btn-lg btn-hero btn-block text-white"
      :disabled="auth.isLoading"
    >
      Entrar
    </button>

    <p class="mt-1 text-center">
      Não é cadastrado?
      <router-link :to="{ name: 'SignUp' }"> Registre-se aqui </router-link>
    </p>
  </form>
</template>

<style lang="scss">
#sign-in {
  .checkbox {
    display: block;
    text-align: center;
    font-weight: 600;
  }
}
</style>
