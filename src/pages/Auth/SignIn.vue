<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/store'

const auth = useAuth()
const router = useRouter()
const state = reactive({
  email: '',
  password: '',
  rememberMe: false,
})

async function handleSubmit() {
  const isAuthenticated = await auth.signIn(state)

  if (isAuthenticated) {
    router.push({ name: 'Home' })
    return
  }

  state.password = ''
}

watch(() => state.email, (newValue) => {
  state.email = newValue.toLocaleLowerCase().trim()
})
</script>

<template>
  <form id="sign-in" @submit.prevent="handleSubmit">
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ visibility: auth.errors.length ? 'visible' : 'hidden' }"
    >
      <p class="text-danger" v-for="error in auth.errors" :key="error">
        {{ error }}
      </p>
    </div>

    <label for="email" class="sr-only">
      Endereço de email
    </label>
    <input
      id="email"
      type="email"
      class="form-control"
      placeholder="Endereço de email"
      required
      autofocus
      v-model="state.email"
    />

    <label for="password" class="sr-only">
      Senha de acesso
    </label>
    <input
      id="password"
      type="password"
      class="form-control"
      placeholder="Senha de acesso"
      required
      v-model="state.password"
    />

    <label class="mt-2 checkbox">
      <input
        type="checkbox"
        value="remember-me"
        v-model="state.rememberMe"
      /> Mantenha-me conectado
    </label>

    <button
      type="submit"
      class="mt-3 btn btn-lg btn-hero btn-block"
      :disabled="auth.isLoading"
    >
      Entrar
    </button>

    <p class="mt-1 text-center">
      Não é cadastrado?
      <router-link :to="{ name: 'SignUp' }" class="text-hero">
        Registre-se aqui
      </router-link>
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
