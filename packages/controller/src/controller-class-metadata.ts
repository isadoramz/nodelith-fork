import * as Types from '@nodelith/types';

export class ControllerClassMetadata {

  public readonly path?: string;
  
  public readonly name?: string;
  
  public readonly description?: string;

  private static readonly METADATA_KEY = Symbol()

  public static attach(constructor: Types.Constructor, metadata: ControllerClassMetadata): Types.Constructor {
    const currentMetadata: ControllerClassMetadata = constructor[ControllerClassMetadata.METADATA_KEY] ?? {};

    constructor[ControllerClassMetadata.METADATA_KEY] = {
      path: metadata.path ?? currentMetadata.path,
      name: metadata.name ?? currentMetadata.name,
      description: metadata.description ?? currentMetadata.description,
    };

    return constructor
  }

  public static extract(constructor: Types.Constructor): ControllerClassMetadata {
    return {
      ...constructor[ControllerClassMetadata.METADATA_KEY]
    }
  }
}