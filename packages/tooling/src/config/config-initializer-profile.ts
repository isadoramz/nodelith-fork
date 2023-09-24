import { DeepReplace, Value, ValueObject } from '@core-fusion/context'
import { Schema } from 'joi'

export type ConfigInitializerProfile<C extends ValueObject = any> = DeepReplace<C, [string, Schema, Value?]>
