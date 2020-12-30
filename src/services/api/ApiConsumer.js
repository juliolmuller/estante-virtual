import querystring from 'querystring'
import axios from 'axios'

class ApiConsumer {
  constructor(api) {
    this.http = axios.create({
      baseURL: `http://localhost:3000/${api}`,
    })
  }

  async get(params) {
    const query = params ? querystring.stringify(params) : ''
    const response = await this.http.get(`/?_limit=100&${query}`)

    return response.data
  }

  async getOne(id) {
    const response = await this.http.get(`/${id}`)

    return response.data
  }

  async post(data) {
    const response = await this.http.post('/', data)

    return response.data
  }

  async put(data) {
    const response = await this.http.put(`/${data.id}`, data)

    return response.data
  }

  async delete(id) {
    const response = await this.http.delete(`/${id}`)

    return response.data
  }
}

export default ApiConsumer
