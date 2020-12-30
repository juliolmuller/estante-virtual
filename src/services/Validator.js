/* eslint-disable newline-per-chained-call */
import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'

export const passwordHasErrors = (password) => {
  const passwordValidator = new PasswordValidator()
  const MIN_LENGTH = 8
  const MAX_LENGTH = 32

  passwordValidator
    .is().min(MIN_LENGTH)
    .is().max(MAX_LENGTH)
    .has().letters()
    .has().digits()
    .has().not().spaces()

  return !passwordValidator.validate(password)
    ? 'A senha deve ter entre 8 e 32 caracteres, possuir pelo menos um número e uma letra, sem espaços'
    : null
}

export const emailHasErrors = (email) => {
  return !EmailValidator.validate(email)
    ? 'Não corresponde a um email válido'
    : null
}

export const nameHasErrors = (name) => {
  const MIN_LENGTH = 3
  const MAX_LENGTH = 90

  return name.length < MIN_LENGTH && name.length > MAX_LENGTH
    ? 'O nome deve ter entre 3 e 90 caracteres'
    : null
}

export const allErrors = ({ name, email, password, passwordConfirmation }) => {
  const errors = {
    name: name ? nameHasErrors(name) : undefined,
    email: email ? emailHasErrors(email) : undefined,
    password: password ? passwordHasErrors(password) : undefined,
    // eslint-disable-next-line no-nested-ternary
    passwordConfirmation: passwordConfirmation
      ? (password === passwordConfirmation ? null : 'As senhas não são idênticas')
      : undefined,
  }

  return Object.fromEntries(
    Object.keys(errors)
      .filter((key) => Boolean(errors[key]))
      .map((key) => [key, errors[key]]),
  )
}
