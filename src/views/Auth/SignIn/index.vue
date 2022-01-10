<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignInPage',

  data: () => ({
    email: '',
    password: '',
    keepConnection: false,
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

      try {
        const success = await this.authenticate({
          keepConnection: this.keepConnection,
          password: this.password,
          email: this.email,
        })

        if (success) {
          this.$router.push({ name: 'Home' })
          return
        }

        this.errors = ['Email e senha não conferem']
        this.isLoading = false
        this.password = ''
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
  <form id="sign-in" @submit.prevent="handleSubmit">
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ visibility: errors.length ? 'visible' : 'hidden' }"
    >
      <p class="text-danger" v-for="(error, index) in errors" :key="index">
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

    <label class="mt-2 checkbox">
      <input
        type="checkbox"
        value="remember-me"
        v-model="keepConnection"
      /> Mantenha-me conectado
    </label>

    <button
      type="submit"
      class="mt-3 btn btn-lg btn-hero btn-block"
      :disabled="isLoading"
    >Entrar</button>
    <p class="mt-1 text-center">
      Não é cadastrado?
      <RouterLink :to="{ name: 'SignUp' }" class="text-hero">
        Registre-se aqui
      </RouterLink>
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
