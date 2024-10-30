"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const container_1 = require("./container");
describe('ContainerUnitTests', () => {
    it('should resolve value registered into the container', () => {
        const testContainer = new container_1.Container();
        const someTestValue = (0, crypto_1.randomUUID)();
        testContainer.registerValue('testValue', someTestValue);
        const someResolvedValue = testContainer.resolveFunction((testValue) => {
            return testValue;
        });
        expect(someResolvedValue).toEqual(someTestValue);
    });
    it('should resolve function registered into the container', () => {
        const testContainer = new container_1.Container();
        const someTestValue = (0, crypto_1.randomUUID)();
        const someTestFunction = () => someTestValue;
        testContainer.registerFunction('testFunction', someTestFunction);
        const someResolvedValue = testContainer.resolveFunction((testFunction) => {
            return testFunction;
        });
        expect(someResolvedValue).toEqual(someTestValue);
    });
    it('should resolve class registered into the container', () => {
        const testContainer = new container_1.Container();
        const someTestValue = (0, crypto_1.randomUUID)();
        class SomeTestClass {
            constructor() {
                this.uuid = someTestValue;
            }
        }
        testContainer.registerClass('testClass', SomeTestClass);
        const someResolvedValue = testContainer.resolveFunction((testClass) => {
            return testClass.uuid;
        });
        expect(someResolvedValue).toEqual(someTestValue);
    });
    it('should resolve with the same instance when lifecicle is not specified on the registration call', () => {
        const testContainer = new container_1.Container();
        class TestClass {
            constructor() {
                this.uuid = (0, crypto_1.randomUUID)();
            }
        }
        testContainer.registerClass('testClass', TestClass);
        const someResolvedValue = testContainer.resolveFunction((testClass) => {
            return testClass.uuid;
        });
        const anotherResolvedValue = testContainer.resolveFunction((testClass) => {
            return testClass.uuid;
        });
        expect(someResolvedValue).toEqual(anotherResolvedValue);
    });
    it('should resolve with different instances when lifecicle is specified as transient on the registration call', () => {
        const testContainer = new container_1.Container();
        class TestClass {
            constructor() {
                this.uuid = (0, crypto_1.randomUUID)();
            }
        }
        testContainer.registerClass('testClass', TestClass, 'TRANSIENT');
        const someResolvedValue = testContainer.resolveFunction((testClass) => {
            return testClass.uuid;
        });
        const anotherResolvedValue = testContainer.resolveFunction((testClass) => {
            return testClass.uuid;
        });
        expect(someResolvedValue).not.toEqual(anotherResolvedValue);
    });
});
//# sourceMappingURL=container.test.js.map