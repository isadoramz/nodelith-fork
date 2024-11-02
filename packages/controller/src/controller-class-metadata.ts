import * as Utils from '@nodelith/utils';

export class ControllerClassMetadata {

  public readonly path?: string;
  
  public readonly name?: string;
  
  public readonly description?: string;

  private static readonly METADATA_KEY = Symbol()

  public static attach(constructor: Utils.ConstructorFunction, metadata: ControllerClassMetadata): Utils.ConstructorFunction {
    const currentMetadata: ControllerClassMetadata = constructor[ControllerClassMetadata.METADATA_KEY] ?? {};

    constructor[ControllerClassMetadata.METADATA_KEY] = {
      path: metadata.path ?? currentMetadata.path,
      name: metadata.name ?? currentMetadata.name,
      description: metadata.description ?? currentMetadata.description,
    };

    return constructor
  }

  public static extract(constructor: Utils.ConstructorFunction): ControllerClassMetadata {
    return {
      ...constructor[ControllerClassMetadata.METADATA_KEY]
    }
  }
}