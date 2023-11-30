import { Constructor } from '@nodelith/context';
import { randomUUID } from 'crypto';

export class ControllerClassMetadata {

  public readonly path?: string;
  
  public readonly name?: string;
  
  public readonly description?: string;

  private static readonly METADATA_KEY = randomUUID();

  public static attach(constructor: Constructor, metadata: ControllerClassMetadata): Constructor {
    const currentMetadata: ControllerClassMetadata = constructor[ControllerClassMetadata.METADATA_KEY] ?? {};

    constructor[ControllerClassMetadata.METADATA_KEY] = {
      path: metadata.path ?? currentMetadata.path,
      name: metadata.name ?? currentMetadata.name,
      description: metadata.description ?? currentMetadata.description,
    };

    return constructor
  }

  public static extract(constructor: Constructor): ControllerClassMetadata {
    return {
      ...constructor[ControllerClassMetadata.METADATA_KEY]
    }
  }
}