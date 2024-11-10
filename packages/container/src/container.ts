import { RegistrationToken, RegistrationMap, Registration } from './registration'

export class Container {

  public readonly registrations: RegistrationMap = new Map()

  public readonly dependencies: Record<RegistrationToken, any>

  public constructor() {
    this.dependencies = new Proxy(this.registrations as any, {
      set(_map: RegistrationMap, token: RegistrationToken) {
        throw new Error(`Could not set registration "${token.toString()}". Registration should not be done through proxy.`)
      },
      get(map: RegistrationMap, token: RegistrationToken, mapProxy: RegistrationMap) {
        if(!map.has(token)) {
          throw new Error(`Could not resolve dependency "${token.toString()}". Invalid registration token.`)
        }

        const registration = map.get(token)

        if(!registration) {
          throw new Error(`Could not resolve dependency "${token.toString()}". Missing registration object.`)
        }

        return new Proxy({} as any, {
          set: (_target, token) => {
            throw new Error(`Could not set dependency property "${token.toString()}". Dependency properties cannot be set through registration instance.`)
          },
          get: (_target, token) => {
            return registration.resolve(mapProxy)![token];
          },
        })
      },
    })
  }
}