
import { Container, asClass, asFactory } from './container'

describe('Container', () => {

  interface GenericInterface {
    callSomeClassService(): string
    callAnotherClassService(): string
  }

  class SomeClassService implements GenericInterface {
    private readonly anotherClassService: GenericInterface
  
    public constructor(dependencies: {
      anotherClassService: GenericInterface,
    }) {
      this.anotherClassService = dependencies.anotherClassService
    }

    public callSomeClassService() {
      return 'SomeClassService::callSomeClassService'
    }
    public callAnotherClassService() {
      return this.anotherClassService.callAnotherClassService()
    }

  }

  class AnotherClassService implements GenericInterface {
    private readonly someClassService: GenericInterface
  
    public constructor(dependencies: {
      someClassService: GenericInterface,
    }) {
      this.someClassService = dependencies.someClassService
    }

    public callSomeClassService() {
      return this.someClassService.callSomeClassService()
    }
    public callAnotherClassService() {
      return 'AnotherClassService::callAnotherClassService'
    }
  }

  const container = new Container()
  container.register('someClassService', asClass(SomeClassService))
  container.register('anotherClassService', asClass(AnotherClassService))
  
  describe('registration', () => {
    it('should throw error when registration key is already in used', () => {
      expect(() => {
        container.register('someClassService', asClass(SomeClassService))
      }).toThrow(`Could not complete registration. Registration key "someClassService" is already in use.`)
    })
  })

  describe('resolve', () => {
    it('should throw error when registration key does not exist', () => {
      expect(() => {
        container.resolve('invalidKey')
      }).toThrow(`Could not resolve registration. Registration of key "invalidKey" is not mapped.`)
    })
    
    it('should correctly call resolved instances injected under resolved SomeClass instance', () => {
      const someClassService = container.resolve<GenericInterface>('someClassService')
      expect(someClassService.callSomeClassService()).toEqual('SomeClassService::callSomeClassService')
      expect(someClassService.callAnotherClassService()).toEqual('AnotherClassService::callAnotherClassService')
    })
  
    it('should correctly call resolved instances injected under resolved AnotherClass instance', () => {
      const anotherClassService = container.resolve<GenericInterface>('anotherClassService')
      expect(anotherClassService.callSomeClassService()).toEqual('SomeClassService::callSomeClassService')
      expect(anotherClassService.callAnotherClassService()).toEqual('AnotherClassService::callAnotherClassService')
    })
  })
})
