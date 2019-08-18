import axios from 'axios'

export default class ApiConsumer {

  // Instantiate new object
  constructor(api) {
    this.http = axios.create({
      baseUrl: `http://localhost:3000/${api}`
    })
  }

  // Request the entire collection of data
  async get() {
    return await this.http.get('/')
  }

  // Request one single record from the collection
  async getOne(id) {
    return await this.http.get(`/${id}`)
  }

  // Insert new record into collection
  async post(data) {
    return await this.http.post('/', data)
  }

  // Update record in the collection
  async put(data) {
    return await this.http.put(`/${data.id}`, data)
  }

  // Delete record from the collection
  async delete(id) {
    return await this.http.delete(`/${id}`)
  }
}
