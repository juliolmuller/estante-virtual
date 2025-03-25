import type { Model } from './Model';

export interface User extends Model {
  email: string;
  name: string;
  password?: string;
}
