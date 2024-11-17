import * as Injection from './index'

export type Resolver<InstanceType = any> = (target: Injection.Target, ...args: any[]) => InstanceType