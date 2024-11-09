import * as Core from '@nodelith/core'
import { Container, asClass } from './container'

describe('Container', () => {
  describe('registration', () => {
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

    describe('register', () => {
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

  describe('initialization', () => {
    const calledInitializers = [] as string[]

    afterEach(() => {
      calledInitializers.length = 0
    })

    class SomeInitializer extends Core.Initializer { 
      public initialize() { 
        calledInitializers.push(SomeInitializer.name)
        return { [SomeInitializer.name]: SomeInitializer.name }
      }
    }

    class AnotherInitializer extends Core.Initializer { 
      public initialize() { 
        calledInitializers.push(AnotherInitializer.name)
        return { [AnotherInitializer.name]: AnotherInitializer.name }
      }
    }

    describe('initialize', () => {
      it('should call all initializer classes on the order they were registered', async () => {
        const container = new Container()

        container.registerClass('someInitializer', SomeInitializer)
        container.registerClass('anotherInitializer', AnotherInitializer)

        await container.initialize()

        expect(calledInitializers.length).toEqual(2)
        expect(calledInitializers).toEqual([
          SomeInitializer.name,
          AnotherInitializer.name,
        ])
      })

      it('should return initialized values', async () => {
        const container = new Container()

        container.registerClass('someInitializer', SomeInitializer)
        container.registerClass('anotherInitializer', AnotherInitializer)

        const initializedValues = await container.initialize()

        expect(initializedValues).toEqual({
          [SomeInitializer.name]: SomeInitializer.name,
          [AnotherInitializer.name]: AnotherInitializer.name,
        })
      })
    })
  })
})
