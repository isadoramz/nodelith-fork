import { Entity } from './entity';

export type EntityAttributes<E extends Entity<any>> = Omit<E,  keyof Entity>