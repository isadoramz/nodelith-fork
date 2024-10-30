export type DeepRecord<Key extends string | keyof string, Value> = {
  [key in Key]: Value | DeepRecord<Key, Value>
}

// export type DeepRecord<Key extends keyof {}, Value = any> = {
//   [k in Key]: Value | DeepRecord<Key, Value>
// }
