import * as Types from '@nodelith/types'
import * as Injection from './index'

describe('Registration', () => {

  const token = 'token'

  const bundle: Injection.Bundle = {
    dependency: 'someDependency' 
  }

  const target: Injection.Target<{ dependency: string }> = ({ dependency }) => {
    return { dependency }
  }

  const resolver: Injection.Resolver<string, Types.Factory> = (target, dependencies) => {
    return target(dependencies)
  }

  describe('isTransient', () => {
    it('Should return true when registration is intentionally declared transient', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, lifetime: 'transient'})
      expect(registration.isTransient).toBe(true)
    })

    it('Should return false when registration is intentionally declared singleton', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, lifetime: 'singleton'})
      expect(registration.isTransient).toBe(false)
    })

    it('Should return true when registration options do not contain lifecycle property', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token })
      expect(registration.isTransient).toBe(true)
    })
  })

  describe('isSingleton', () => {
    it('Should return true when registration is intentionally declared singleton', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, lifetime: 'singleton'})
      expect(registration.isSingleton).toBe(true)
    })

    it('Should return false when registration is intentionally declared transient', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, lifetime: 'transient'})
      expect(registration.isSingleton).toBe(false)
    })

    it('Should return false when registration options do not contain lifecycle property', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token })
      expect(registration.isSingleton).toBe(false)
    })
  })

  describe('isPublic', () => {
    it('Should return true when registration is intentionally declared public', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, access: 'public'})
      expect(registration.isPublic).toBe(true)
    })

    it('Should return false when registration is intentionally declared private', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, access: 'private'})
      expect(registration.isPublic).toBe(false)
    })

    it('Should return true when registration options do not contain access property', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token })
      expect(registration.isPublic).toBe(true)
    })
  })

  describe('isPrivate', () => {
    it('Should return true when registration is intentionally declared private', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, access: 'private'})
      expect(registration.isPrivate).toBe(true)
    })

    it('Should return false when registration is intentionally declared public', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token, access: 'public'})
      expect(registration.isPrivate).toBe(false)
    })

    it('Should return false when registration options do not contain access property', () => {
      const registration = new Injection.Registration({ target, resolver, bundle, token })
      expect(registration.isPrivate).toBe(false)
    })
  })

  describe('getInstance', () => {
    it('Should resolve registration only when getInstance is called', () => {
      let resolverWasCalled = false
      let targetWasCalled = false

      const target: Injection.Target<string> = () => {
        targetWasCalled = true
        return 'not_undefined'
      }
    
      const resolver: Injection.Resolver<string, Types.Factory> = (target) => {
        resolverWasCalled = true
        return target()
      }

      const registration = new Injection.Registration({
        resolver,
        target,
        bundle,
        token,
      })

      expect(targetWasCalled).toBe(false)
      expect(resolverWasCalled).toBe(false)
  
      registration.getInstance()
    
      expect(targetWasCalled).toBe(true)
      expect(resolverWasCalled).toBe(true)
    })

    it('Should resolve to the same instance the getInstance method is called over singleton registration', () => {
      const registration = new Injection.Registration({
        lifetime: 'singleton',
        resolver,
        target,
        bundle,
        token,
      })
  
      const instance_1 = registration.getInstance()
      const instance_2 = registration.getInstance()
      expect(instance_1).toBe(instance_2)
    })

    it('Should resolve to a different instance when getInstance method is called over transient registration', () => {
      const registration = new Injection.Registration({
        lifetime: 'transient',
        resolver,
        target,
        bundle,
        token,
      })

      const instance_1 = registration.getInstance()
      const instance_2 = registration.getInstance()
      expect(instance_1).not.toBe(instance_2)
    })
  
    it('Should throw error when registration resolver returns undefined', () => {
      const registration = new Injection.Registration({
        token,
        target,
        bundle,
        resolver: () => undefined,
      })
      expect(() => registration.getInstance()).toThrow(
        `Could not resolve dependency "${token}". Resolver returned undefined.`
      )
    })
  })
})