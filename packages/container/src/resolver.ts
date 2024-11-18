import * as Injection from './index'

export type Resolver<InstanceType = any, T extends Injection.Target<InstanceType> = any> 
  = (target: T, bundle: Injection.Bundle) => InstanceType