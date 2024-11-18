import * as Types from '@nodelith/types'


export type TargetFactory<InstanceType = any> = Types.Factory<InstanceType>

export type TargetConstructor<InstanceType = any> = Types.Constructor<InstanceType>

export type Target<InstanceType = any> = 
  | TargetFactory<InstanceType>
  | TargetConstructor<InstanceType>
