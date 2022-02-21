import { Model } from './Model'

export interface Book extends Model {
  name: string
  image: string
  userId?: number
  loan: false | {
    date: string
    userId: number
  }
}
