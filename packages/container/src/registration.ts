import * as Types from '@nodelith/types'

export type ContainerSymbol = Symbol

export type RegistrationToken = string | symbol | number

export type RegistrationMap = Map<RegistrationToken, Registration>

export type RegistrationAccess = 'public' | 'private'

export type RegistrationDependencies = Record<RegistrationToken, any>

export type RegistrationTarget<InstanceType = any> = Types.Constructor<InstanceType>

export type RegistrationResolver<InstanceType = any> = (target: RegistrationTarget, dependencies: RegistrationDependencies) => InstanceType

export type RegistrationOptions = {
  dependencies: Record<RegistrationToken, any>
  access?: RegistrationAccess
  token: RegistrationToken
  target?: RegistrationTarget
  resolver?: RegistrationResolver
}

export class Registration<I = any> {

  public readonly dependencies: RegistrationDependencies
  
  public readonly access: RegistrationAccess
  
  public readonly token: RegistrationToken
  
  public readonly target: RegistrationTarget<I> | undefined
  
  public readonly resolver: RegistrationResolver<I> | undefined

  public constructor(options: RegistrationOptions) {
    this.dependencies = options.dependencies
    this.access = options.access ?? 'public'
    this.token = options.token
    this.target = options.target
    this.resolver = options.resolver
  }
  
  private _instance: I | undefined

  public get instance(): I {
    if(this._instance) {
      return this._instance
    }

    return this.resolve()
  }

  public get isPublic() {
    return this.access === 'public'
  }

  public get isPrivate() {
    return this.access === 'private'
  }
  
  private resolve(): I | never {
    if(!this.target) {
      throw new Error(`Could not resolve dependency "${this.token.toString()}". Missing registration target.`)
    }

    if(!this.resolver) {
      throw new Error(`Could not resolve dependency "${this.token.toString()}". Missing registration resolver.`)
    }

    const resolution = this.resolver(this.target, this.dependencies)

    if(!resolution) {
      throw new Error(`Could not resolve dependency "${this.token.toString()}". Resolver returned undefined.`)
    }

    return this._instance = resolution
  }
}
