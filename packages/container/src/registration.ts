import * as Injection from './index'

// export type RegistrationProperties = {
//   bundle: Injection.Bundle
//   target: Injection.Target
//   resolver: Injection.Resolver
// }

// export type RegistrationModifiers = {
//   input?: Injection.InputModifier | undefined
//   access?: Injection.AccessModifier | undefined
//   lifetime?: Injection.LifetimeModifier | undefined
// }

// export type RegistrationParameters = 
//   & RegistrationModifiers
//   & RegistrationProperties

export type RegistrationProperties = {
  token: Injection.Token
  bundle: Injection.Bundle
  target: Injection.Target
  resolver: Injection.Resolver
  input?: Injection.InputModifier | undefined
  access?: Injection.AccessModifier | undefined
  lifetime?: Injection.LifetimeModifier | undefined
}


export class Registration<I = any> {

  private static readonly DEFAULT_LIFETIME_STRATEGY: Injection.LifetimeModifier = 'transient'
  
  private static readonly DEFAULT_ACCESS_STRATEGY: Injection.AccessModifier = 'public'
  
  private static readonly DEFAULT_INPUT_STRATEGY: Injection.InputModifier = 'spread'

  public readonly lifetime: Injection.LifetimeModifier
  
  public readonly access: Injection.AccessModifier
  
  public readonly input: Injection.InputModifier
  
  public readonly bundle: Injection.Bundle

  public readonly token: Injection.Token
  
  public readonly target: Injection.Target<I>
  
  public readonly resolver: Injection.Resolver<I>

  private instance: I | undefined

  public constructor(properties: RegistrationProperties) {
    this.token = properties.token,
    this.bundle = properties.bundle
    this.target = properties.target
    this.resolver = properties.resolver
    this.input = properties.input ?? Registration.DEFAULT_INPUT_STRATEGY
    this.access = properties.access ?? Registration.DEFAULT_ACCESS_STRATEGY
    this.lifetime = properties.lifetime ?? Registration.DEFAULT_LIFETIME_STRATEGY
  }

  public getInstance(): I {
    if(this.instance) {
      return this.instance
    }

    return this.resolve()
  }

  public get isTransient() {
    return this.lifetime === 'transient'
  }

  public get isSingleton() {
    return this.lifetime === 'singleton'
  }

  public get isPublic() {
    return this.access === 'public'
  }

  public get isPrivate() {
    return this.access === 'private'
  }
  
  private resolve(): I | never {
    const resolvedInstance = this.resolver(this.target, this.bundle)

    if(!resolvedInstance) {
      throw new Error(`Could not resolve dependency. Resolver returned undefined.`)
    }

    if(this.isSingleton) {
      return this.instance = resolvedInstance
    }

    return resolvedInstance
  }
}
