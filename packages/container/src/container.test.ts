import * as Types from '@nodelith/types'
import * as Injection from './index'

describe('Container', () => {

  const targetFactoryOne: Injection.Target = ({ targetTwo }) => {
    const call = () => 'targetOne::call'
    const callDependency = () => targetTwo.call()
    return { call, callDependency }
  }

  const targetFactoryTwo: Injection.Target = ({ targetOne }) => {
    const call = () => 'targetTwo::call'
    const callDependency = () => targetOne.call()
    return { call, callDependency }
  }

  const targetFactoryDouble: Injection.Target = () => {
    const call = () => 'targetDouble::call'
    return { call }
  }

  const defaultResolver: Injection.Resolver<string, Types.Factory> = (target, dependencies) => {
    return target(dependencies)
  }

  describe('bundle', () => {

    const container = new Injection.Container()
  
    const registrationOne = new Injection.Registration({
      token: 'targetOne',
      bundle: container.bundle,
      target: targetFactoryOne,
      resolver: defaultResolver,
    })

    container.push(registrationOne)
    
    it('Should throw error on attempt to set dependency through bundle object', () => {
      expect(() => container.bundle['key'] = 'value').toThrow(
        `Could not set registration "key". Registration should not be done through bundle.`
      )
    })
    
    it('Should throw error on attempt to access invalid registration token', () => {
      expect(() => container.bundle['key']).toThrow(
        `Could not resolve dependency "key". Invalid registration token.`
      )
    })
    
    it('Should throw error on attempt to set dependency properties through registration bundle', () => {
      expect(() => container.bundle['targetOne']['key'] = 'value').toThrow(
        `Could not set dependency property "key". Dependency properties cannot be set through registration bundle.`
      )
    })
  })

  describe('resolution', () => {
    it('Should resolve acyclic dependency graph', () => {
      const container = new Injection.Container()
  
      const registrationOne = new Injection.Registration({
        token: 'targetOne',
        bundle: container.bundle,
        target: targetFactoryOne,
        resolver: defaultResolver,
      })
  
      const registrationTwo = new Injection.Registration({
        token: 'targetTwo',
        bundle: container.bundle,
        target: targetFactoryDouble,
        resolver: defaultResolver,
      })
  
      container.push(
        registrationOne,
        registrationTwo,
      )

      const targetOneCallResult = container.bundle.targetOne.call()
      const targetTwoCallResult = container.bundle.targetTwo.call()
  
      expect(targetOneCallResult).toBe('targetOne::call')
      expect(targetTwoCallResult).toBe('targetDouble::call')
  
      const targetOneCallDependencyResult = container.bundle.targetOne.callDependency()
  
      expect(targetOneCallDependencyResult).toBe('targetDouble::call')
    })
  
    it('Should resolve cyclic dependency graph when dependency properties are not accessed during instance initialization', () => {
      const container = new Injection.Container()
  
      const registrationOne = new Injection.Registration({
        token: 'targetOne',
        bundle: container.bundle,
        target: targetFactoryOne,
        resolver: defaultResolver,
      })
  
      const registrationTwo = new Injection.Registration({
        token: 'targetTwo',
        bundle: container.bundle,
        target: targetFactoryTwo,
        resolver: defaultResolver,
      })
  
      container.push(
        registrationOne,
        registrationTwo,
      )
  
      const targetOneCallResult = container.bundle.targetOne.call()
      const targetTwoCallResult = container.bundle.targetTwo.call()
  
      expect(targetOneCallResult).toBe('targetOne::call')
      expect(targetTwoCallResult).toBe('targetTwo::call')
  
      const targetOneCallDependencyResult = container.bundle.targetOne.callDependency()
      const targetTwoCallDependencyResult = container.bundle.targetTwo.callDependency()
      
      expect(targetOneCallDependencyResult).toBe('targetTwo::call')
      expect(targetTwoCallDependencyResult).toBe('targetOne::call')
    })
  
    it('Should resolve cyclic dependency graph when dependency properties are accessed in single direction', () => {
      const container = new Injection.Container()
  
      const registrationOne = new Injection.Registration({
        token: 'targetOne',
        bundle: container.bundle,
        target: targetFactoryOne,
        resolver: defaultResolver,
      })
  
      const registrationTwo = new Injection.Registration({
        token: 'targetTwo',
        bundle: container.bundle,
        target: (dependencies) => {
          const targetOneCallResultDuringResolution = dependencies.targetOne.call()
          expect(targetOneCallResultDuringResolution).toBe('targetOne::call')
          return targetFactoryTwo(dependencies)
        },
        resolver: defaultResolver,
      })
  
      container.push(
        registrationOne,
        registrationTwo,
      )
  
      const targetOneCallResult = container.bundle.targetOne.call()
      const targetTwoCallResult = container.bundle.targetTwo.call()
  
      expect(targetOneCallResult).toBe('targetOne::call')
      expect(targetTwoCallResult).toBe('targetTwo::call')
  
      const targetOneCallDependencyResult = container.bundle.targetOne.callDependency()
      const targetTwoCallDependencyResult = container.bundle.targetTwo.callDependency()
      
      expect(targetOneCallDependencyResult).toBe('targetTwo::call')
      expect(targetTwoCallDependencyResult).toBe('targetOne::call')
    })
  
    it('Should resolve dependency targets only when dependency properties are accessed (lazy initialization)', () => {
      let resolverWasCalled = false;
      let targetFactoryOneWasCalled = false;
      let targetFactoryTwoWasCalled = false;
  
      const container = new Injection.Container()
      
      const registration_1 = new Injection.Registration({
        token: 'targetOne',
        bundle: container.bundle,
        target: (dependencies) => {
          targetFactoryOneWasCalled = true
          return targetFactoryOne(dependencies)
        },          
        resolver: (target, dependencies) => {
          resolverWasCalled = true
          return defaultResolver(target, dependencies)
        },
      })
      
      const registration_2 = new Injection.Registration({
        token: 'targetTwo',
        bundle: container.bundle,
        target: (dependencies) => {
          targetFactoryTwoWasCalled = true
          return targetFactoryTwo(dependencies)
        },
        resolver: (target, dependencies) => {
          resolverWasCalled = true
          return defaultResolver(target, dependencies)
        },
      })
  
      container.push(
        registration_1,
        registration_2,
      )
  
      expect(resolverWasCalled).toBe(false)
      expect(targetFactoryOneWasCalled).toBe(false)
      expect(targetFactoryTwoWasCalled).toBe(false)
  
      container.bundle.targetOne
      container.bundle.targetOne
  
      expect(resolverWasCalled).toBe(false)
      expect(targetFactoryOneWasCalled).toBe(false)
      expect(targetFactoryTwoWasCalled).toBe(false)
  
      container.bundle.targetOne.call
      expect(resolverWasCalled).toBe(true)
      expect(targetFactoryOneWasCalled).toBe(true)
      expect(targetFactoryTwoWasCalled).toBe(false)
      
      container.bundle.targetTwo.call
      expect(resolverWasCalled).toBe(true)
      expect(targetFactoryOneWasCalled).toBe(true)
      expect(targetFactoryTwoWasCalled).toBe(true)
    })
  })
})