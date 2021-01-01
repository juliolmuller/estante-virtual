<script>
import { mapActions } from 'vuex'
import { usersApi } from '@/services/api'

export default {

  data: () => ({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    isLoading: false,
  }),

  watch: {
    email(value) {
      this.email = value.toLowerCase()
    },
  },

  methods: {
    ...mapActions('auth', [
      'authenticate',
    ]),
    async handleSubmit() {
      this.isLoading = true

      const [existingUser] = await usersApi.get({ email: this.email })
      const passwordMatch = this.password === this.passwordConfirmation

      if (existingUser || !passwordMatch) {
        this.passwordConfirmation = ''
        this.password = ''
        this.errors = []
        existingUser && this.errors.push('Email já está cadastrado')
        !passwordMatch && this.errors.push('As senhas não são iguais')
        this.isLoading = false
        return
      }

      try {
        const userData = await usersApi.post({
          password: this.password,
          email: this.email,
          name: this.name,
        })
        await this.authenticate(userData)
        this.$router.push({ name: 'Home' })
      } catch (error) {
        console.error(error) // eslint-disable-line no-console
        this.isLoading = false
        this.errors = [error.message]
      }
    },
  },
}
</script>

<template>
  <form id="sign-up" @submit.prevent="handleSubmit">
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ visibility: errors.length ? 'visible' : 'hidden' }"
    >
      <p class="text-danger" v-for="(error, index) in errors" :key="index">
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
      v-model="name"
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
      v-model="email"
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
      v-model="password"
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
      v-model="passwordConfirmation"
    />

    <button
      type="submit"
      class="btn btn-lg btn-hero"
      :disabled="isLoading"
    >Cadastrar</button>
    <p class="mt-1 text-center">
      <RouterLink :to="{ name: 'SignIn' }" class="text-hero">
        Já sou cadastrado
      </RouterLink>
    </p>
  </form>
</template>
