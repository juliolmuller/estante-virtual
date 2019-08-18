import ApiConsumer from '../ApiConsumer'

export default new class extends ApiConsumer {

  // Instantiate new object to consume Nooks API
  constructor() {
    super('books')
  }
}
