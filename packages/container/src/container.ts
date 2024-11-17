import * as Injection from './index'

export class Container<B extends Injection.Bundle = any> {

  public readonly bundle: B
  
  private readonly map: Map<Injection.Token, Injection.Registration> = new Map()

  public get registrations(): Injection.Registration[] {
    return Array.from(this.map.values())
  }

  public push(...registrations: Injection.Registration[]): void {
    for (const registration of registrations) {
      this.map.set(registration.token, registration)
    }
  }

  public has(token: Injection.Token): boolean {
    return this.map.has(token)
  }

  public get(token: Injection.Token): Injection.Registration | undefined {
    return this.map.get(token)
  }

  public constructor() {
    this.bundle = new Proxy(this.map as any, {
      set(_map: Map<Injection.Token, Injection.Registration>, token: Injection.Token) {
        throw new Error(`Could not set registration "${token.toString()}". Registration should not be done through bundle.`)
      },
      get(map: Map<Injection.Token, Injection.Registration>, token: Injection.Token, _mapProxy: Map<Injection.Token, Injection.Registration>) {
        if(!map.has(token)) {
          throw new Error(`Could not resolve dependency "${token.toString()}". Invalid registration token.`)
        }

        const registration = map.get(token)

        if(!registration) {
          throw new Error(`Could not resolve dependency "${token.toString()}". Missing registration object.`)
        }

        return new Proxy({} as any, {
          set: (_target, property) => {
            throw new Error(`Could not set dependency property "${property.toString()}". Dependency properties cannot be set through registration bundle.`)
          },
          get: (_target, property) => {
            return registration.instance[property];
          },
        })
      },
    })
  }
}