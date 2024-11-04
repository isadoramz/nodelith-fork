import * as Types from '@nodelith/types'

export type DependencyRecord = Record<string, any>

export type Resolver<V = any, D extends DependencyRecord = DependencyRecord> = (map: D) => V

export function asValue<V = any>(value: V): Resolver<V> {
    return (_dependencies: DependencyRecord) => value
}

export function asFactory<V = any, D extends DependencyRecord = DependencyRecord>(factory: Types.Function<V, [D]>): Resolver<V, D> {
  return (dependencies: D) => factory(dependencies)
}

export function asClass<V = any, D extends DependencyRecord = DependencyRecord>(constructor: Types.Constructor<V, [D]>): Resolver<V, D> {
  return (registrations: D) => new constructor(registrations)
}

export class Container {

  private readonly dependencies: DependencyRecord = {}

  public registerValue(key: string, value: any) {
    this.register(key, asValue(value))
  }

  public registerFactory(key: string, factory: Types.Function<any, [DependencyRecord]>) {
    this.register(key, asFactory(factory))
  }

  public registerClass(key: string, constructor: Types.Constructor<any, [DependencyRecord]>) {
    this.register(key, asClass(constructor))
  }

  public register<V = any>(key: string, resolver: Resolver<V, any>) {
    if(this.dependencies[key]) {
      throw Error(`Could not complete registration. Registration key "${key}" is already in use.`)
    }
    
    this.dependencies[key] = resolver(this.dependencies as DependencyRecord)
  }

  public resolve<V = any>(key: string): V | never {
    if(!this.dependencies[key]) {
      throw new Error(`Could not resolve registration. Registration of key "${key}" is not mapped.`)
    }

    return this.dependencies[key]
  }
}
