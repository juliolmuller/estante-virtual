<template>
  <div id="auth">
    <div class="auth-container">
      <header class="auth-header">
        <Logo />
      </header>

      <RouterView />

      <footer class="auth-footer text-muted">
        &copy; 2019-{{ new Date().getFullYear() }} <strong>LacusSoft</strong>
      </footer>
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {

  components: {
    Logo,
  },
}
</script>

<style lang="scss">
#auth {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .auth-container {
    width: 100%;
    max-width: 350px;
    background: #dfdfdf;
    opacity: 0.95;
    padding: 1rem;
    border-radius: 0.5rem;
  }

  .auth-header {
    padding: 1rem 0;
    text-align: center;
  }

  .auth-footer {
    text-align: center;
    line-height: 3rem;
  }

  .alert > p {
    margin: 0;
    text-align: center;
    font-weight: bold;
  }

  input.form-control {
    margin-bottom: -1px;
    border-radius: 0;
    padding: 1.2rem 0.6rem;
    line-height: 1.2rem;
    font-size: 1.0rem;
    text-align: center;
    transition: all 0.3s;

    &:focus {
      position: relative;
      box-shadow: none;
      outline: none;
      border: solid 1px var(--hero);
      line-height: 1.0rem;
      font-size: 1.2rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    margin-top: 2rem;
    transition: background-color 0.3s;
  }
}
</style>
