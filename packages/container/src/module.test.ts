import * as Core from '@nodelith/core'
import { Module } from './module'

describe('Module', () => {
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


  describe('register', () => {
    const module = new Module()
    module.register('someClassService', SomeClassService)
    module.register('anotherClassService', AnotherClassService)

    it('should throw error when registration key is already in used', () => {
      expect(() => {
        module.register('someClassService', SomeClassService)
      }).toThrow()
    })  
  })

  describe('resolve', () => {
    const module = new Module()
    module.register('someClassService', SomeClassService)
    module.register('anotherClassService', AnotherClassService)

    it('should throw error when registration key does not exist', () => {
      expect(() => {
        module.resolve('invalidKey')
      }).toThrow()
    })
    
    it('should correctly call resolved instances injected under resolved primary instance', () => {
      const someClassService = module.resolve<GenericInterface>('someClassService')
      expect(someClassService.callSomeClassService()).toEqual('SomeClassService::callSomeClassService')
      expect(someClassService.callAnotherClassService()).toEqual('AnotherClassService::callAnotherClassService')
    })
  
    it('should correctly call resolved instances injected under resolved secondary instance', () => {
      const anotherClassService = module.resolve<GenericInterface>('anotherClassService')
      expect(anotherClassService.callSomeClassService()).toEqual('SomeClassService::callSomeClassService')
      expect(anotherClassService.callAnotherClassService()).toEqual('AnotherClassService::callAnotherClassService')
    })
  })

  describe('initialize', () => {
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

  describe('use', () => {
    class SomeClass {
      private readonly anotherClass: AnotherClass

      public constructor(dependencies: {
        anotherClass: AnotherClass
      }) {
        this.anotherClass = dependencies.anotherClass
      }

      public callSomeClass() {
        return 'SomeClass::callSomeClass'
      }

      public callAnotherClass() {
        return this.anotherClass.callAnotherClass()
      }
    }

    class AnotherClass {
      public callAnotherClass() {
        return 'AnotherClass::callAnotherClass'
      }
    }

    const anotherModule = new Module()
    anotherModule.register('anotherClass', AnotherClass)

    const someModule = new Module()
    someModule.register('someClass', SomeClass)

    someModule.use(anotherModule)

    it('should pass', () => {
      const someClass = someModule.resolve<SomeClass>('someClass')
      expect(someClass.callSomeClass()).toEqual('SomeClass::callSomeClass')      
      expect(someClass.callAnotherClass()).toEqual('AnotherClass::callAnotherClass')      
    })
  })
})
