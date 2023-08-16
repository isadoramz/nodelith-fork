import { Function } from './function';

export type Initializer<R extends any = unknown> = Function<Promise<R>>