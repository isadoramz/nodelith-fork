import * as Awilix from 'awilix'
import * as Core from '@nodelith/core'
import * as Types from '@nodelith/types'

export class Container implements Core.Initializer {

  private readonly container: Awilix.AwilixContainer

  private readonly initializationMetadata: {
    readonly initializer: Types.Constructor<Core.Initializer>
    readonly initializerKey: string
  }[] = [];

  constructor(injectionMode: Awilix.InjectionModeType = 'CLASSIC') {
    this.container = Awilix.createContainer({ injectionMode })
  }

  public resolve<T>(registrationKey: string): T {
    return this.container.resolve<T>(registrationKey)
  }

  public resolveClass<T>(constructor: Types.Constructor<T>): T {
    return this.container.build<T>(Awilix.asClass(constructor))
  }

  public resolveFunction<T>(factory: Types.Factory<T>): T {
    return this.container.build<T>(Awilix.asFunction(factory))
  }

  public registerValue(registrationKey: string, registration: unknown) {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container value registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, Awilix.asValue(registration))
  }

  public registerClass(registrationKey: string, registration: Types.Constructor, lifetime: Awilix.LifetimeType = 'SINGLETON') {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container class registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, Awilix.asClass(registration, { lifetime }))
  }

  public registerFunction(registrationKey: string, registration: Types.Function, lifetime: Awilix.LifetimeType = 'SINGLETON') {
    if(this.container.registrations[registrationKey]) {
      throw Error(`Could not complete container function registration. Registration key ${registrationKey} is already in use.`)
    }

    this.container.register(registrationKey, Awilix.asFunction(registration, { lifetime }))
  }

  public registerInitializer(initializerKey: string, initializer: Types.Constructor<Core.Initializer>) {
    if(this.initializationMetadata[initializerKey]) {
      throw Error(`Could not complete container initializer registration. Registration key ${initializerKey} is already in use.`)
    }

    this.initializationMetadata.push({ initializerKey, initializer })
  }

  public async initialize(logger?: Core.Logger): Promise<Record<string, any>> {
    const initializationHash: Record<string, unknown> = {}

    for await (const { initializerKey, initializer } of this.initializationMetadata) {
      logger?.info(`initializing ${initializerKey}`)
      
      const initializedRecord = await this.container.build(Awilix.asClass(initializer)).initialize()

      for (const recordKey of Object.keys(initializedRecord)) {
        this.registerValue(recordKey, initializedRecord[recordKey])
        initializationHash[recordKey] = initializedRecord[recordKey]
      }
    }

    return initializationHash
  }

  public async terminate(logger?: Core.Logger): Promise<void> {
    for await (const { initializerKey, initializer } of this.initializationMetadata) {
      const initializerInstance = this.container.build(Awilix.asClass(initializer))

      if(initializerInstance.terminate) {
        logger?.info(`terminating ${initializerKey}`)
        await initializerInstance.terminate()
      }
    }
  }
}
