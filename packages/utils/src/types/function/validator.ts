export type ValidatorFunction<V = any, E extends Error = Error> = (value: unknown) =>  [E | undefined, V]