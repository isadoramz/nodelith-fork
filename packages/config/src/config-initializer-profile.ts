import { DeepReplace } from '@nodelith/context'
import { ConfigObject } from './config-object'
import { Schema } from 'joi'

export type ConfigInitializerProfile<C extends ConfigObject = ConfigObject> = DeepReplace<C, [string, Schema]>