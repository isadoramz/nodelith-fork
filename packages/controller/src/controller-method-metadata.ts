import * as Express from 'express';
import { HttpCode, HttpMethod } from '@nodelith/http';
import { ControllerMethodDescriptor } from './controller-method-descriptor';

export class ControllerMethodMetadata {

  public static readonly METADATA_KEY = 'controllerMetadata'

  public readonly key?: string | undefined;

  public readonly path?: string | undefined;

  public readonly httpCode?: HttpCode | undefined;
  
  public readonly httpMethod?: HttpMethod | undefined;

  public readonly name?: string | undefined;

  public readonly description?: string | undefined;

  public readonly bodyValidationHandler?: Express.RequestHandler | undefined;

  public readonly authorizationHandler?: Express.RequestHandler | undefined;

  public static attach(
    descriptor: ControllerMethodDescriptor,
    metadata: ControllerMethodMetadata,
  ): ControllerMethodDescriptor {
    if (descriptor.value) {
      const currentMetatada: ControllerMethodMetadata = descriptor.value?.[ControllerMethodMetadata.METADATA_KEY] ?? {};
  
      descriptor.value[ControllerMethodMetadata.METADATA_KEY] = {
        key: metadata.key ?? currentMetatada.key,
        name: metadata.name ?? currentMetatada.name,
        path: metadata.path ?? currentMetatada.path,
        httpCode: metadata.httpCode ?? currentMetatada.httpCode,
        httpMethod: metadata.httpMethod ?? currentMetatada.httpMethod,
        description: metadata.description ?? currentMetatada.description,
        bodyValidationHandler: metadata.bodyValidationHandler ?? currentMetatada.bodyValidationHandler,
        authorizationHandler: metadata.authorizationHandler ?? currentMetatada.authorizationHandler,
      };
    }

    return descriptor
  }

  public static extract(
    descriptor: ControllerMethodDescriptor
  ): ControllerMethodMetadata {
    if (descriptor.value && descriptor.value[ControllerMethodMetadata.METADATA_KEY]) {
      return {
        key: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.key,
        name: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.name,
        path: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.path,
        httpCode: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.httpCode,
        httpMethod: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.httpMethod,
        description: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.description,
        bodyValidationHandler: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.bodyValidationHandler,
        authorizationHandler: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.authorizationHandler,
      };
    }

    return {}
  }
}
