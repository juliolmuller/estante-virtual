import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'

// Esport instance of validator service
export default (function() {

  // Instantiate and configure password validator
  const password = new PasswordValidator()
  password
    .is().min(8)
    .is().max(32)
    .has().letters()
    .has().digits()
    .has().not().spaces()

  // Associate functionalitis to methods
  return {
    passwordHasErrors(string) {
      return password.validate(string)
        ? null
        : 'A senha deve ter entre 8 e 32 caracteres, possuir pelo menos um número e uma letra, sem espaços'
    },
    emailHasErrors(string) {
      return EmailValidator.validate(string)
        ? null
        : 'Não corresponde a um email válido'
    },
    nameHasErrors(string) {
      return string.length >= 3 && string.length <= 90
        ? null
        : 'O nome deve ter entre 3 e 90 caracteres'
    },
    allErrors({ email, name, password, passwordConfirmation } = {}) {
      const errors = {
        email: email ? this.emailHasErrors(email) : undefined,
        name: name ? this.nameHasErrors(name) : undefined,
        password: password ? this.passwordHasErrors(password) : undefined,
        passwordConfirmation: passwordConfirmation ? (() => {
          return password === passwordConfirmation ? null : 'As senhas não são idênticas'
        })() : undefined
      }
      for (let e in errors) {
        if (!errors[e]) {
          delete errors[e]
        }
      }
      return errors
    }
  }

})()
