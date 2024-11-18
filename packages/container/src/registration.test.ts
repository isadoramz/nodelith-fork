import * as Types from '@nodelith/types'
import * as Injection from './index'

describe('Registration', () => {

  const token = 'token'

  const bundle: Injection.Bundle = {
    dependency: 'someDependency' 
  }

  describe('FactoryRegistration', () => {
    it('Should resolve registration only when instance is accessed', () => {
      let targetWasCalled = false

      const target: Injection.Target<string> = () => {
        targetWasCalled = true
      }

      const registration = new Injection.FactoryRegistration(target, { token, bundle })
      expect(targetWasCalled).toBe(false)

      registration.instance
      expect(targetWasCalled).toBe(true)
    })

    it('Should resolve to the same instance when registration is singleton', () => {
      const factory: Injection.TargetFactory = () => {
        return { value: 'resolved_value' }
      }
  
      const registration = new Injection.FactoryRegistration(factory, { token, bundle, lifetime: 'singleton' })
      const instance_1 = registration.instance
      const instance_2 = registration.instance

      expect(instance_1).toBe(instance_2)
    })

    it('Should resolve to a different instance when registration is transient', () => {
      const factory: Injection.TargetFactory = () => {
        return { value: 'resolved_value' }
      }
  
      const registration = new Injection.FactoryRegistration(factory, { token, bundle, lifetime: 'transient',})
      const instance_1 = registration.instance
      const instance_2 = registration.instance

      expect(instance_1).not.toBe(instance_2)
    })
  })

  describe('ConstructorRegistration', () => {
    it('Should resolve registration only when instance is accessed', () => {
      let targetWasCalled = false

      class Constructor { constructor() { 
        targetWasCalled = true
      }}

      const registration = new Injection.ConstructorRegistration(Constructor, { token, bundle })
      expect(targetWasCalled).toBe(false)

      registration.instance
      expect(targetWasCalled).toBe(true)
    })

    it('Should resolve to the same instance when registration is singleton', () => {
      class Constructor {}
  
      const registration = new Injection.ConstructorRegistration(Constructor, { token, bundle, lifetime: 'singleton' })
      const instance_1 = registration.instance
      const instance_2 = registration.instance

      expect(instance_1).toBe(instance_2)
    })

    it('Should resolve to a different instance when registration is transient', () => {
      class Constructor {}
  
      const registration = new Injection.ConstructorRegistration(Constructor, { token, bundle, lifetime: 'transient',})
      const instance_1 = registration.instance
      const instance_2 = registration.instance

      expect(instance_1).not.toBe(instance_2)
    })
  })
})
