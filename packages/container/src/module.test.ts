import * as Core from '@nodelith/core'
import { Module } from './module'

describe('Module', () => {
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

    const module = new Module()
    module.register('someClassService', SomeClassService)
    module.register('anotherClassService', AnotherClassService)

    describe('register', () => {
      it('should throw error when registration key is already in used', () => {
        expect(() => {
          module.register('someClassService', SomeClassService)
        }).toThrow()
      })  
    })

    describe('resolve', () => {
      it('should throw error when registration key does not exist', () => {
        expect(() => {
          module.resolve('invalidKey')
        }).toThrow()
      })
      
      it('should correctly call resolved instances injected under resolved SomeClass instance', () => {
        const someClassService = module.resolve<GenericInterface>('someClassService')
        expect(someClassService.callSomeClassService()).toEqual('SomeClassService::callSomeClassService')
        expect(someClassService.callAnotherClassService()).toEqual('AnotherClassService::callAnotherClassService')
      })
    
      it('should correctly call resolved instances injected under resolved AnotherClass instance', () => {
        const anotherClassService = module.resolve<GenericInterface>('anotherClassService')
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
        const container = new Module()

        container.register('someInitializer', SomeInitializer)
        container.register('anotherInitializer', AnotherInitializer)

        await container.initialize()

        expect(calledInitializers.length).toEqual(2)
        expect(calledInitializers).toEqual([
          SomeInitializer.name,
          AnotherInitializer.name,
        ])
      })

      // it('should return initialized values', async () => {
      //   const container = new Module()

      //   container.register('someInitializer', SomeInitializer)
      //   container.register('anotherInitializer', AnotherInitializer)

      //   const initializedValues = await container.initialize()

      //   expect(initializedValues).toEqual({
      //     [SomeInitializer.name]: SomeInitializer.name,
      //     [AnotherInitializer.name]: AnotherInitializer.name,
      //   })
      // })
    })
  })
})
