import ApiConsumer from './ApiConsumer'

export default new class extends ApiConsumer {

  // Instantiate new object to consume Users API
  constructor() {
    super('users')
  }
}
