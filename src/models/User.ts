import type { Model } from './Model'

export interface User extends Model {
  name: string
  email: string
  password?: string
}
