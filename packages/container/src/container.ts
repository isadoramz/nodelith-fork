import * as Core from '@nodelith/core'
import * as Types from '@nodelith/types'

export type DependencyKey = string | symbol

export type DependencyMap = Map<DependencyKey, any>

export type DependencyRecord = Record<DependencyKey, any>

export type Resolver<V = any, DR extends DependencyRecord = DependencyRecord> = (map: DR) => V

export type ResolverMap = Map<DependencyKey, Resolver>

export function asValue<V = any>(value: V): Resolver<V> {
  return (_dependencies: DependencyRecord) => {
    return value
  }
}

export function asFactory<V = any, DR extends DependencyRecord = DependencyRecord>(factory: Types.Function<V, [DR]>): Resolver<V, DR> {
  return (dependencies: DR) => {
    return factory(dependencies)
  }
}

export function asClass<V = any, DR extends DependencyRecord = DependencyRecord>(constructor: Types.Constructor<V, [DR]>): Resolver<V, DR> {
  return (registrations: DR) => {
    return new constructor(registrations)
  }
}

function createDependencyRecordProxy(resolverMap: ResolverMap): DependencyRecord {
  const dependencyMap: DependencyMap = new Map()

  function resolveDependencyInstance(dependencyKey: DependencyKey, dependencyRecord: DependencyRecord) {
    if (!dependencyMap.has(dependencyKey)) {

      if(!resolverMap.has(dependencyKey)) {
        throw new Error(`Could not resolve dependency "${dependencyKey.toString()}". Resolver is missing.`)
      }
      
      const resolver = resolverMap.get(dependencyKey)

      if(!resolver) {
        throw new Error(`Could not resolve dependency "${dependencyKey.toString()}". Resolver is undefined.`)
      }

      const dependencyInstance = createDependencyInstanceProxy(resolver, dependencyRecord)

      dependencyMap.set(dependencyKey, dependencyInstance)
    }

    return dependencyMap.get(dependencyKey)
  }

  function createDependencyInstanceProxy<V>(resolver: Resolver<V>, dependencyRecord: DependencyRecord): V {
    let resolved: boolean = false
    let instance: V | undefined = undefined
  
    function resolveInstance() {
      return resolved ? instance : instance = resolver(dependencyRecord)
    }
  
    return new Proxy({} as any, {
      set(_target, propertyKey) {
        throw new Error(`Could not set dependency property "${propertyKey.toString()}". Dependency properties cannot be set through proxy.`)
      },
      get(_target, propertyKey) {        
        return resolveInstance()![propertyKey];
      },
    })
  }

  return new Proxy({} as any, {
    set(_dependencyRecordTarget, dependencyKey) {
      throw new Error(`Could not set dependency key "${dependencyKey.toString()}". Dependencies cannot be set through proxy.`)
    },
    get(_dependencyRecordTarget, dependencyKey, dependencyRecord) {
      return resolveDependencyInstance(dependencyKey, dependencyRecord)
    },
  })
}

export class Container implements Core.Initializer {
  private readonly resolvers: ResolverMap = new Map()

  private readonly dependencies: Readonly<DependencyRecord> = createDependencyRecordProxy(this.resolvers)

  private readonly initializationStack: Array<string> = []

  public async initialize(): Promise<Record<string, any>> {
    const initializationRecord: Record<string, unknown> = {}

    for await (const initializationKey of this.initializationStack) {
      
      const initializerInstance = this.resolve<Core.Initializer>(initializationKey)

      const initializerRecord = initializerInstance.initialize()

      if(initializerRecord) {
        for (const key of Object.keys(initializerRecord)) {
          this.registerValue(key, initializerRecord[key])
          initializationRecord[key] = initializerRecord[key]
        }
      }
    }

    return initializationRecord
  }

  public async terminate(): Promise<void> {
    for await (const initializationKey of this.initializationStack.reverse()) {
      const initializerInstance = this.resolve<Core.Initializer>(initializationKey)

      if(initializerInstance.terminate) {
        await initializerInstance.terminate()
      }
    }
  }

  public registerValue(key: string, value: any) {
    this.register(key, asValue(value))
  }

  public registerFactory(key: string, factory: Types.Function<any, [DependencyRecord]>): void {
    this.register(key, asFactory(factory))
  }

  public registerClass(key: string, constructor: Types.Constructor<any, [DependencyRecord]>): void {
    this.register(key, asClass(constructor))

    if(Core.Initializer.isExtendedBy(constructor)) {
      this.initializationStack.push(key)
    }
  }

  public register<V = any>(dependencyKey: DependencyKey, resolver: Resolver<V, any>): void | never {
    if(this.resolvers.has(dependencyKey)) {
      throw new Error(`Could not complete registration. Registration key "${dependencyKey.toString()}" is already in use.`)
    }

    this.resolvers.set(dependencyKey, resolver)
  }

  public resolve<V = any>(dependencyKey: DependencyKey): V | never {
    if(!this.resolvers.has(dependencyKey)) {
      throw new Error(`Could not resolve registration. Registration of key "${dependencyKey.toString()}" is not mapped.`)
    }
    return this.dependencies[dependencyKey]
  }
}
