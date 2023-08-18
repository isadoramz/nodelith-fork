export type NestedRecord<Key extends string | keyof string, Value> = {
  [key in Key]: Value | NestedRecord<Key, Value>
}
