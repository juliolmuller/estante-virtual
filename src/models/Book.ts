import type { Model } from './Model';

export interface Book extends Model {
  image: string;
  loan:
    | {
        date: string;
        userId: number;
      }
    | false;
  name: string;
  userId?: number;
}
