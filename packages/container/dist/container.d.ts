import { InjectionModeType, LifetimeType } from 'awilix';
import { ConstructorFunction, FactoryFunction, PlainFunction } from '@nodelith/utils';
import { Logger, Initializer } from '@nodelith/core';
export declare class Container implements Initializer {
    private readonly container;
    private readonly initializationMetadata;
    constructor(injectionMode?: InjectionModeType);
    resolve<T>(registrationKey: string): T;
    resolveClass<T>(constructor: ConstructorFunction<T>): T;
    resolveFunction<T>(factory: FactoryFunction<T>): T;
    registerValue(registrationKey: string, registration: unknown): void;
    registerClass(registrationKey: string, registration: ConstructorFunction, lifetime?: LifetimeType): void;
    registerFunction(registrationKey: string, registration: PlainFunction, lifetime?: LifetimeType): void;
    registerInitializer(initializerKey: string, initializer: ConstructorFunction<Initializer>): void;
    initialize(logger?: Logger): Promise<Record<string, any>>;
    terminate(logger?: Logger): Promise<void>;
}
//# sourceMappingURL=container.d.ts.map