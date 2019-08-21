import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'

// Esport instance of validator service
export default new function() {

  // Instantiate and configure password validator
  const password = new PasswordValidator()
  password
    .is().min(8)
    .is().max(32)
    .has().letters()
    .has().lowercase()
    .has().digits()
    .has().not().spaces()

  // Associate functionalitis to methods
  this.isPassword = password.validate
  this.isEmail = EmailValidator.validate
}
