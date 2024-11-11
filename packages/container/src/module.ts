import * as Types from '@nodelith/types'
import * as Core from '@nodelith/core'
import { Container } from './container'
import { Registration, RegistrationAccess, RegistrationDependencies, RegistrationResolver, RegistrationTarget, RegistrationToken } from './registration'

export class Module implements Core.Initializer {

  static constructorResolver(target: Types.Constructor, dependencies: RegistrationDependencies) {
    return new target(dependencies)
  }

  static factoryResolver<I = any>(target: Types.Factory<I>, dependencies: RegistrationDependencies): I {
    return target(dependencies)
  }

  static valueResolver(target: any, _dependencies: RegistrationDependencies) {
    return target
  }

  private readonly initializers: Array<RegistrationToken> = []

  private readonly container = new Container()

  public useModule(module: Module) {
    this.container.push(...module.registrations)
  }

  public async initialize() {
    for await (const token of this.initializers) {
      const initializerInstance = this.resolveToken<Core.Initializer>(token)
      await initializerInstance.initialize()
    }
  }

  public async terminate(): Promise<void> {
    for await (const token of [...this.initializers].reverse()) {
      const initializerInstance = this.resolveToken<Core.Initializer>(token)

      if(initializerInstance.terminate) {
        await initializerInstance.terminate()
      }
    }
  }

  public register(token: RegistrationToken, constructor: Types.Constructor, options?: { access?: RegistrationAccess }) {
    if(this.container.has(token)) {
      throw new Error(`Could not complete registration. Registration token "${token.toString()}" is already in use.`)
    }

    this.container.push(new Registration({ ...options,
      dependencies: this.container.dependencies,
      resolver: Module.constructorResolver,
      target: constructor,
      token,
    }))

    if(Core.Initializer.isExtendedBy(constructor)) {
      this.initializers.push(token)
    }
  }

  public resolveTokens(...tokens: RegistrationToken[]): any[] | never {
    return tokens.map((token) => this.resolveToken(token))
  }

  public resolveToken<T = any>(token: RegistrationToken): T | never {
    if(!this.container.has(token)) {
      throw new Error(`Could not resolve registration. Module does not contain a registration for "${token.toString()}" token.`)
    }

    return this.container.dependencies[token]
  }

  public resolveFactories(...factories: Types.Factory[]): any[] | never {
    return factories.map((factory) => this.resolveFactory(factory))
  }

  public resolveFactory<I = any>(factory: Types.Factory<I>): I {
    return Module.factoryResolver(factory, this.container.dependencies)
  }

  public resolveConstructors(...constructors: Types.Constructor[]): any[] | never {
    return constructors.map((constructor) => this.resolveConstructor(constructor))
  }

  public resolveConstructor<I = any>(constructor: Types.Constructor<I>): I {
    return Module.constructorResolver(constructor, this.container.dependencies)
  }

  public get registrations() {
    return this.container.registrations.filter((registration) => {
      return registration.isPublic
    })
  }
}
