import * as Types from '@nodelith/types'
import * as Core from '@nodelith/core'
import { Container } from './container'
import { Registration, RegistrationDependencies, RegistrationToken } from './registration'

export class Module implements Core.Initializer {

  static constructorResolver(constructor: Types.Constructor, dependencies: RegistrationDependencies) {
    return new constructor(dependencies)
  }

  static factoryResolver(factory: Types.Factory, dependencies: RegistrationDependencies) {
    return factory(dependencies)
  }

  static valueResolver(value: any, dependencies: RegistrationDependencies) {
    return value
  }

  private readonly initializers: Array<RegistrationToken> = []

  private readonly container = new Container()

  public async initialize(): Promise<void> {
    for await (const token of this.initializers) {
      const initializerInstance = this.resolve<Core.Initializer>(token)
      await initializerInstance.initialize()
    }
  }

  public async terminate(): Promise<void> {
    for await (const token of [...this.initializers].reverse()) {
      const initializerInstance = this.resolve<Core.Initializer>(token)

      if(initializerInstance.terminate) {
        await initializerInstance.terminate()
      }
    }
  }

  public register(token: RegistrationToken, constructor: Types.Constructor) {
    if(this.container.has(token)) {
      throw new Error(`Could not complete registration. Registration token "${token.toString()}" is already in use.`)
    }

    this.container.push(new Registration({
      dependencies: this.container.dependencies,
      resolver: Module.constructorResolver,
      target: constructor,
      token,
    }))

    if(Core.Initializer.isExtendedBy(constructor)) {
      this.initializers.push(token)
    }
  }

  public use(module: Module) {
    this.container.push(...module.registrations)
  }

  public resolve<T = any>(token: RegistrationToken): T | never {
    if(!this.container.has(token)) {
      throw new Error(`Could not resolve registration. Module does not contain a registration for "${token.toString()}" token.`)
    }

    return this.container.dependencies[token]
  }

  public get registrations() {
    return this.container.registrations.filter((registration) => {
      return registration.isPublic
    })
  }

  // public inject(...registrations: Registration[]) {
  //   for (const registration of registrations) {
  //     this.container.registrations.set(registration.token, registration)
  //   }
  // }

  // public use(module: Module) {
  //   if(module !== this) {
  //     module.inject(...this.registrations)
  //     this.inject(...module.registrations)
  //   }
  // }
}

// const authentication = new Module()
// authentication.register(AuthenticationRepository, { access: 'private'} )
// authentication.register(AuthenticationService)

// const authorization = new Module()
// authorization.register(AuthorizationRepository, { access: 'private'} )
// authorization.register(AuthorizationService)



// const identity = new Module()

// identity.register(authentication)
// identity.register(authorization)
