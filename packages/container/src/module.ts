import * as Core from '@nodelith/core'
import * as Types from '@nodelith/types'
import * as Injection from './index'

export class Module {

  private readonly inputStrategy?: Injection.InputModifier
  
  private readonly accessStrategy?: Injection.AccessModifier
  
  private readonly lifetimeStrategy?: Injection.LifetimeModifier

  private readonly initializers: Array<Injection.Token> = []
  
  private readonly container = new Injection.Container()

  public get registrations() {
    return this.container.registrations.filter((registration) => {
      return registration.isPublic
    })
  }

  public registerValue(token: Injection.Token, value: any): void {
    if(!this.container.has(token)) {
      throw new Error(`Could not complete registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.Registration({
      resolver: Injection.Registration.valueResolver,
      bundle: this.container.bundle,
      target: value,
      token,
    })

    this.container.push(registration)
  }

  public registerFactory(token: Injection.Token, factory: Injection.TargetFactory): void {
    if(!this.container.has(token)) {
      throw new Error(`Could not complete registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.Registration({
      resolver: Module.factoryResolver,
      bundle: this.container.bundle,
      target: factory,
      token,
    })

    this.container.push(registration)
  }

  public registerConstructor(token: Injection.Token, constructor: Injection.TargetConstructor): void {
    if(!this.container.has(token)) {
      throw new Error(`Could not complete registration. Module already contain a registration for "${token.toString()}" token.`)
    }

    const registration = new Injection.Registration({
      resolver: Module.constructorResolver,
      bundle: this.container.bundle,
      target: constructor,
      token,
    })

    this.container.push(registration)
  }

  public resolveFactory<I>(factory: Types.Factory): I {
    throw new Error('Not Implemented')
  }

  public resolveConstructor<I>(constructor: Types.Constructor<I>): I {
    throw new Error('Not Implemented')
  }
}
