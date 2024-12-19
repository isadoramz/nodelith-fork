import { AwilixContainer, InjectionModeType, LifetimeType, asClass, asFunction, asValue, createContainer } from 'awilix';
import { Constructor, FactoryFunction, PlainFunction } from '@nodelith/utilities'
import { Logger, Initializer } from '@nodelith/context';

export class Container {

  private readonly container: AwilixContainer

  private readonly initializationMetadata: {
    readonly initializer: Constructor<Initializer>
    readonly initializerKey: string
  }[] = []

  constructor(injectionMode: InjectionModeType = 'CLASSIC') {
    this.container = createContainer({ injectionMode })
  }

  public resolve<T>(registrationKey: string): T {
    return this.container.resolve<T>(registrationKey)
  }

  public resolveClass<T>(constructor: Constructor<T>): T {
    return this.container.build<T>(asClass(constructor))
  }

  public resolveFunction<T>(factory: FactoryFunction<T>): T {
    return this.container.build<T>(asFunction(factory))
  }

  public registerValue(registrationKey: string, registration: unknown) {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container value registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, asValue(registration))
  }

  public registerClass(registrationKey: string, registration: Constructor, lifetime: LifetimeType = 'SINGLETON') {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container class registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, asClass(registration, { lifetime }))
  }

  public registerFunction(registrationKey: string, registration: PlainFunction, lifetime: LifetimeType = 'SINGLETON') {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container function registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, asFunction(registration, { lifetime }))
  }

  public registerInitializer(initializerKey: string, initializer: Constructor<Initializer>) {
    if(this.initializationMetadata[initializerKey]) {
      throw Error(`Could not complete container initializer registration. Registration key ${initializerKey} is already in use.`)
    }

    this.initializationMetadata.push({ initializerKey, initializer })
  }

  public async initialize(logger?: Logger): Promise<Record<string, any> > {
    const initializationHash: Record<string, unknown> = {}

    for await (const { initializerKey, initializer } of this.initializationMetadata) {
      logger?.info(`initializing ${initializerKey}`)
      
      const initializedRecord = await this.container.build(asClass(initializer)).initialize()

      for (const recordKey of Object.keys(initializedRecord)) {
        this.registerValue(recordKey, initializedRecord[recordKey])
        initializationHash[recordKey] = initializedRecord[recordKey]
      }
    }

    return initializationHash
  }

  public async terminate(logger?: Logger): Promise<void> {
    for await (const { initializerKey, initializer } of this.initializationMetadata) {
      const initializerInstance = this.container.build(asClass(initializer))

      if(initializerInstance.terminate) {
        logger?.info(`terminating ${initializerKey}`)
        await initializerInstance.terminate()
      }
    }
  }
}
