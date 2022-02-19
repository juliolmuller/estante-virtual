import axios from 'axios'
import { stringifyQuery } from '@/utils'

class ApiConsumer {
  constructor(api) {
    this.http = axios.create({
      baseURL: `${process.env.VUE_APP_API_URL}/${api}`,
    })
  }

  async get(params = {}) {
    const query = {
      _limit: 100,
      ...stringifyQuery(params),
    }
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
