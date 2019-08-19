import ApiConsumer from '../ApiConsumer'

export default new class extends ApiConsumer {

  // Instantiate new object to consume Books API
  constructor() {
    super('books')
  }
}
