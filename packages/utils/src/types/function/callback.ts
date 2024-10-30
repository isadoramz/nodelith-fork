import { PlainFunction } from './plain'

export type CallbackFunction<Args extends any[] = any[]> = PlainFunction<void, Args>
