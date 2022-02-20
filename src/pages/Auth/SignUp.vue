<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/store'

const auth = useAuth()
const router = useRouter()
const state = reactive({
  name: '',
  email: '',
  password: '',
  passwordRepeat: '',
})

async function handleSubmit() {
  const isAuthenticated = await auth.signUp(state)

  if (isAuthenticated) {
    router.push({ name: 'Home' })
    return
  }

  state.password = ''
  state.passwordRepeat = ''
}

watch(() => state.email, (newValue) => {
  state.email = newValue.toLocaleLowerCase().trim()
})
</script>

<template>
  <form id="sign-up" @submit.prevent="handleSubmit">
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ visibility: auth.errors.length ? 'visible' : 'hidden' }"
    >
      <p class="text-danger" v-for="error in auth.errors" :key="error">
        {{ error }}
      </p>
    </div>

    <label for="name" class="sr-only">
      Nome do usuário
    </label>
    <input
      id="name"
      type="text"
      class="form-control"
      placeholder="Nome do usuário"
      required
      autofocus
      v-model="state.name"
    />

    <label for="email" class="sr-only">
      Endereço de email
    </label>
    <input
      id="email"
      type="email"
      class="form-control"
      placeholder="Endereço de email"
      required
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

    <label for="password-confirmation" class="sr-only">
      Confirmação da senha
    </label>
    <input
      id="password-confirmation"
      type="password"
      class="form-control"
      placeholder="Confirmação da senha"
      required
      v-model="state.passwordRepeat"
    />

    <button
      type="submit"
      class="btn btn-lg btn-hero"
      :disabled="auth.isLoading"
    >
      Cadastrar
    </button>
    <p class="mt-1 text-center">
      <router-link :to="{ name: 'SignIn' }" class="text-hero">
        Já sou cadastrado
      </router-link>
    </p>
  </form>
</template>
