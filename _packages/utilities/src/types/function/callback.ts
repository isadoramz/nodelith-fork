import { PlainFunction } from './function'

export type CallbackFunction<Args extends any[] = any[]> = PlainFunction<void, Args>