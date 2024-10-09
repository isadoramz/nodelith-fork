import {HttpMethod } from '@nodelith/http';
import { PlainFunction } from '@nodelith/utilities';

export class ControllerMethodMetadata {

  protected static readonly METADATA_KEY = Symbol()

  public readonly key?: string | undefined;

  public readonly path?: string | undefined;
  
  public readonly method?: HttpMethod | undefined;

  public readonly name?: string | undefined;

  public readonly description?: string | undefined;

  public static attach(
    descriptor: TypedPropertyDescriptor<PlainFunction & { [ControllerMethodMetadata.METADATA_KEY]?: ControllerMethodMetadata}>,
    metadata: ControllerMethodMetadata,
  ): PropertyDescriptor {
    if (descriptor.value) {
      const currentMetadata = descriptor.value[ControllerMethodMetadata.METADATA_KEY]
      descriptor.value[ControllerMethodMetadata.METADATA_KEY] = { ...currentMetadata,
        key: metadata.key ?? currentMetadata?.key,
        name: metadata.name ?? currentMetadata?.name,
        path: metadata.path ?? currentMetadata?.path,
        method: metadata.method ?? currentMetadata?.method,
        description: metadata.description ?? currentMetadata?.description,
      }
    }

    return descriptor
  }

  public static extract(
    descriptor: PropertyDescriptor
  ): ControllerMethodMetadata {
    if (descriptor.value && descriptor.value[ControllerMethodMetadata.METADATA_KEY]) {
      return {
        key: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.key,
        name: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.name,
        path: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.path,
        method: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.method,
        description: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.description,
      };
    }

    return {}
  }
}
