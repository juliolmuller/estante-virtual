<template>
  <form
    class="form-signing text-center"
    :style="{
      'max-height': registerred
        ? `${errorsCount * 32 + 390}px`
        : `${errorsCount * 32 + 440}px`
    }"
    @submit="onSubmit"
  >
    <Logo />
    <div
      role="alert"
      class="alert alert-danger border-danger"
      :style="{ 'visibility': errorsCount ? 'visible' : 'hidden' }"
    >
      <p
        class="text-danger font-weight-bold m-0"
        v-for="(value, key) in errors"
        :key="key"
      >{{ value }}</p>
    </div>
    <!-- Input for name (required only in signup) -->
    <label
      for="name"
      class="sr-only"
      v-if="!registerred"
    >Nome do usuário</label>
    <input
      type="text"
      id="name"
      class="form-control"
      placeholder="Nome do usuário"
      required autofocus
      v-if="!registerred"
      v-model="credentials.name"
    />
    <!-- End of input for name -->
    <!-- Input for email (required in signin & signup) -->
    <label
      for="email"
      class="sr-only"
    >Endereço de email</label>
    <input
      type="email"
      id="email"
      class="form-control"
      placeholder="Endereço de email"
      required
      v-model="credentials.email"
    />
    <!-- End of input for email -->
    <!-- Input for password (required in signin & signup) -->
    <label
      for="password"
      class="sr-only"
    >Senha de acesso</label>
    <input
      type="password"
      id="password"
      class="form-control"
      placeholder="Senha de acesso"
      required
      v-model="credentials.password"
    />
    <!-- End of input for password -->
    <!-- Input for password confirmation (required only in signup) -->
    <label
       for="passwordConfirmation"
       class="sr-only"
       v-if="!registerred"
      >Confirmação da senha</label>
    <input
      v-if="!registerred"
      type="password"
      id="passwordConfirmation"
      class="form-control"
      placeholder="Confirmação da senha"
      required
      v-model="credentials.passwordConfirmation"
    />
    <!-- End of input for password confirmation -->
    <div v-if="registerred" class="mt-2 checkbox">
      <label>
        <input
          type="checkbox"
          value="remember-me"
          v-model="keepConnection"
        /> Mantenha-me conectado
      </label>
    </div>
    <div v-if="registerred">
      <button
        type="submit"
        class="mt-3 btn btn-lg btn-hero btn-block"
      >Entrar</button>
      <p class="mt-1">
        Não é cadastrado?
        <a
          href="#"
          class="text-hero"
          @click="toggleSigningOption"
        >Registre-se aqui</a></p>
    </div>
    <div v-if="!registerred">
      <button
        type="submit"
        class="mt-3 btn btn-lg btn-hero btn-block"
      >Cadastrar</button>
      <p class="mt-1">
        <a
          href="#"
          class="text-hero"
          @click="toggleSigningOption"
        >Já sou cadastrado</a>
      </p>
    </div>
    <p class="mt-3 text-muted">&copy; 2019</p>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'
  import Logo from '@/components/Logo.vue'
  import api from '@/services/api/users'
  import validator from '@/services/Validator'

  export default {
    name: 'Signing',
    components: {
      Logo
    },
    data() {
      return {
        credentials: {},
        keepConnection: false,
        registerred: true,
        errors: {}
      }
    },
    methods: {
      ...mapActions(['signIn', 'signUp']),
      toggleSigningOption(e) {
        e.preventDefault()
        if (this.registerred) {
          this.credentials.password = ''
        } else {
          this.credentials = {
            name: '',
            password: '',
            passwordConfirmation: ''
          }
        }
        this.registerred = !this.registerred
      },
      onSubmit(e) {
        e.target.disabled = true
        e.preventDefault()
        if (this.registerred) {
          const errors = validator.emailHasErrors(this.credentials.email)
          if (errors) {
            this.errors = errors
          } else {
            api.get({ email: this.credentials.email })
              .then(response => {
                if (!response.data.length || response.data[0].password !== this.credentials.password) {
                  this.errors = { auth: 'Credenciais inválidas' }
                } else {
                  this.signIn(response.data[0])
                  this.$route.push({ name: 'home' })
                }
              })
          }
        } else {
          this.errors = validator.allErrors(this.credentials)
          if (!Object.keys(this.errors).length) {
            api.get({ email: this.credentials.email })
              .then(response => {
                if (response.data.length) {
                  this.errors = { auth: 'Email já cadastrado' }
                } else {
                  this.signUp({
                    name: this.credentials.name,
                    email: this.credentials.email,
                    password: this.credentials.password
                  })
                  this.$route.push({ name: 'home' })
                }
              })
          }
        }
        this.credentials.password = ''
        this.credentials.passwordConfirmation = ''
        e.target.disabled = false
      }
    },
    computed: {
      errorsCount() {
        return Object.keys(this.errors).length
      }
    }
  }
</script>

<style scoped>
  .form-signing {
    background: rgb(255, 255, 255, 0.9);
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 330px;
    margin: auto;
    padding: 15px;
  }
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-control:focus {
    z-index: 2;
  }
  input {
    margin-bottom: -1px;
    border-radius: 0;
  }
  input:last-child {
    margin-bottom: 0;
  }
</style>
