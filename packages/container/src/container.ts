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
  const dependencies: DependencyMap = new Map()

  return new Proxy({} as any, {
    get(_, dependencyKey, dependencyRecord) {
      if (!dependencies.has(dependencyKey)) {
        const resolver = resolverMap.get(dependencyKey)

        if (!resolver) {
          throw new Error(`No resolver found for ${dependencyKey.toString()}`)
        }

        const dependencyInstance = createDependencyInstanceProxy(resolver, dependencyRecord)

        dependencies.set(dependencyKey, dependencyInstance)
      }

      return dependencies.get(dependencyKey)
    },
    set() {
      throw new Error(`Could not set dependency key. Dependencies cannot be set directly.`)
    },
  })
}

function createDependencyInstanceProxy<V>(resolver: Resolver<V>, dependencyRecord: DependencyRecord): V {
  return new Proxy({} as any, {
    get(dependency, propertyKey) {
      if (!dependency.initialized) {
        dependency.instance = resolver(dependencyRecord);
        dependency.initialized = true;
      }
        
      return dependency.instance[propertyKey];
    }
  });
}

export class Container {
  private readonly resolvers: ResolverMap = new Map()

  private readonly dependencies: Readonly<DependencyRecord> = createDependencyRecordProxy(this.resolvers)

  public registerValue(key: string, value: any) {
    this.register(key, asValue(value))
  }

  public registerFactory(key: string, factory: Types.Function<any, [DependencyRecord]>) {
    this.register(key, asFactory(factory))
  }

  public registerClass(key: string, constructor: Types.Constructor<any, [DependencyRecord]>) {
    this.register(key, asClass(constructor))
  }

  public register<V = any>(dependencyKey: DependencyKey, resolver: Resolver<V, any>): void | never {
    if(this.resolvers.has(dependencyKey)) {
      throw new Error(`Could not complete registration. Registration key "${dependencyKey.toString()}" is already in use.`)
    }

    this.resolvers.set(dependencyKey, resolver)
    console.log(`registered ${dependencyKey.toString()}`)
  }

  public resolve<V = any>(dependencyKey: DependencyKey): V | never {
    if(!this.resolvers.has(dependencyKey)) {
      throw new Error(`Could not resolve registration. Registration of key "${dependencyKey.toString()}" is not mapped.`)
    }
    return this.dependencies[dependencyKey]
  }
}
