import { randomUUID } from 'crypto'
import { Container } from './container'

describe('ContainerUnitTests', () => {

  it('should resolve value registered into the container', () => {
    const testContainer = new Container()

    const someTestValue = randomUUID()

    testContainer.registerValue('testValue', someTestValue)

    const someResolvedValue = testContainer.resolveFunction((testValue) => {
      return testValue
    })

    expect(someResolvedValue).toEqual(someTestValue)
  })

  it('should resolve function registered into the container', () => {
    const testContainer = new Container()

    const someTestValue = randomUUID()

    const someTestFunction = () => someTestValue

    testContainer.registerFunction('testFunction', someTestFunction)

    const someResolvedValue = testContainer.resolveFunction((testFunction) => {
      return testFunction
    })

    expect(someResolvedValue).toEqual(someTestValue)
  })

  it('should resolve class registered into the container', () => {
    const testContainer = new Container()

    const someTestValue = randomUUID()

    class SomeTestClass {
      uuid: string = someTestValue
    }

    testContainer.registerClass('testClass', SomeTestClass)

    const someResolvedValue = testContainer.resolveFunction((testClass) => {
      return testClass.uuid
    })

    expect(someResolvedValue).toEqual(someTestValue)
  })

  it('should resolve with the same instance when lifecicle is not specified on the registration call', () => {
    const testContainer = new Container()

    class TestClass {
      uuid: string = randomUUID()
    }

    testContainer.registerClass('testClass', TestClass)

    const someResolvedValue = testContainer.resolveFunction((testClass: TestClass) => {
      return testClass.uuid
    })

    const anotherResolvedValue = testContainer.resolveFunction((testClass: TestClass) => {
      return testClass.uuid
    })

    expect(someResolvedValue).toEqual(anotherResolvedValue)
  })

  it('should resolve with different instances when lifecicle is specified as transient on the registration call', () => {
    const testContainer = new Container()

    class TestClass {
      uuid: string = randomUUID()
    }

    testContainer.registerClass('testClass', TestClass, 'TRANSIENT')

    const someResolvedValue = testContainer.resolveFunction((testClass: TestClass) => {
      return testClass.uuid
    })

    const anotherResolvedValue = testContainer.resolveFunction((testClass: TestClass) => {
      return testClass.uuid
    })

    expect(someResolvedValue).not.toEqual(anotherResolvedValue)
  })
})