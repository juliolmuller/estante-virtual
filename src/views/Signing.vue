<template>
  <form class="form-signing text-center" :class="{ 'form-signin': registerred, 'form-signup': !registerred }">
    <Logo />
    <label v-if="!registerred" for="signing-name" class="sr-only">Nome do usuário</label>
    <input v-if="!registerred" type="text" id="signing-name" class="form-control" placeholder="Nome do usuário" required autofocus>
    <label for="signing-email" class="sr-only">Endereço de email</label>
    <input type="email" id="signing-email" class="form-control" placeholder="Endereço de email" required autofocus>
    <label for="signing-password" class="sr-only">Senha de acesso</label>
    <input type="password" id="signing-password" class="form-control" placeholder="Senha de acesso" required>
    <label v-if="!registerred" for="signing-password-confirmation" class="sr-only">Confirmação da senha</label>
    <input v-if="!registerred" type="password" id="signing-password-confirmation" class="form-control" placeholder="Confirmação da senha" required>
    <div v-if="registerred" class="mt-2 checkbox">
      <label>
        <input type="checkbox" value="remember-me"> Mantenha-me conectado
      </label>
    </div>
    <div v-if="registerred">>
      <button type="submit" @submit="signIn" class="mt-3 btn btn-lg btn-hero btn-block" >Entrar</button>
      <p class="mt-1">Não é cadastrado? <a href="#" class="text-hero" @click="access">Registre-se aqui</a></p>
    </div>
    <div v-if="!registerred">
      <button type="submit" @submit="signUp" class="mt-3 btn btn-lg btn-hero btn-block" >Cadastrar</button>
      <p class="mt-1"><a href="#" class="text-hero" @click="access">Já sou cadastrado</a></p>
    </div>
    <p class="mt-3 text-muted">&copy; 2019</p>
  </form>
</template>

<script>
  import Logo from '@/components/Logo.vue'

  export default {
    name: 'Signing',
    components: {
      Logo
    },
    data() {
      return {
        registerred: true
      }
    },
    methods: {
      access(e) {
        e.preventDefault()
        this.registerred = !this.registerred
      },
      signIn(e) {
        e.preventDefault()
      },
      signUp(e) {
        e.preventDefault()
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
  .form-signin {
    max-height: 350px;
  }
  .form-signup {
    max-height: 390px;
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
