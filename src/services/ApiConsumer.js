import axios from 'axios'
import querystring from 'querystring'

export default class ApiConsumer {

  // Instantiate new object
  constructor(api) {
    this.baseUrl = `http://localhost:3000/${api}`
    this.http = axios.create()
  }

  // Request the entire collection of data
  get(params) {
    const query = params ? `&${querystring.stringify(params)}` : ''
    return this.http.get(`${this.baseUrl}?_limit=100${query}`)
  }

  // Request one single record from the collection
  getOne(id) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  // Insert new record into collection
  post(data) {
    return this.http.post(this.baseUrl, data)
  }

  // Update record in the collection
  put(data) {
    return this.http.put(`${this.baseUrl}/${data.id}`, data)
  }

  // Delete record from the collection
  delete(id) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
