import * as Core from '@nodelith/core'
import * as Types from '@nodelith/types'
import * as Injection from './index'

export class Module {

  private readonly mode?: Injection.Mode
  
  private readonly access?: Injection.Access
  
  private readonly lifetime?: Injection.Lifetime

  private readonly initializers: Array<Injection.Token> = []
  
  private readonly container = new Injection.Container()

  public get registrations() {
    return this.container.registrations.filter((registration) => {
      return registration.access === 'public'
    })
  }

  public registerValue(token: Injection.Token, value: any): void {
    if(this.container.has(token)) {
      throw new Error(`Could not complete value registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.ValueRegistration(value, {
      bundle: this.container.bundle,
      token,
    })

    this.container.push(registration)
  }

  public registerFactory(token: Injection.Token, factory: Injection.TargetFactory): void {
    if(this.container.has(token)) {
      throw new Error(`Could not complete factory registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.FactoryRegistration(factory, {
      bundle: this.container.bundle,
      token,
    })

    this.container.push(registration)
  }

  public registerConstructor(token: Injection.Token, constructor: Injection.TargetConstructor): void {
    if(this.container.has(token)) {
      throw new Error(`Could not complete constructor registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.ConstructorRegistration(constructor, {
      bundle: this.container.bundle,
      token,
    })

    this.container.push(registration)
  }

  public resolveToken<I>(token: Injection.Token): I {
    return this.container.bundle[token]
  }

  public resolveFactory<I = any, F extends Types.Factory<I> = Types.Factory<I>>(factory: F): I {
    const { instance } = new Injection.FactoryRegistration<I>(factory, {
      bundle: this.container
    })

    return instance
  }

  public resolveConstructor<I = any, C extends Types.Constructor<I> = Types.Constructor<I>>(constructor: C): I {
    const { instance } = new Injection.ConstructorRegistration<I>(constructor, {
      bundle: this.container
    })

    return instance
  }
}
