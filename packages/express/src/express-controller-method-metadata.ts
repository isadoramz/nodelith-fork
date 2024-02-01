import express from 'express'
import { ControllerMethodMetadata } from '@nodelith/controller';
import { FactoryFunction, PlainFunction } from '@nodelith/utilities';

export class ExpressControllerMethodMetadata extends ControllerMethodMetadata {

  public readonly requestHandlers?: FactoryFunction<express.RequestHandler>[] | undefined;

  public readonly errorHandlers?: FactoryFunction<express.ErrorRequestHandler>[] | undefined;

  public static attachRequestHandler(
    descriptor: TypedPropertyDescriptor<PlainFunction & { [ExpressControllerMethodMetadata.METADATA_KEY]?: ExpressControllerMethodMetadata }>,
    requestHandlerFactory: FactoryFunction<express.RequestHandler>,
  ): PropertyDescriptor {
    if (descriptor.value) {
      const currentMetadata = descriptor.value[ControllerMethodMetadata.METADATA_KEY]
      descriptor.value[ControllerMethodMetadata.METADATA_KEY] = { ...currentMetadata,
        requestHandlers: [ ...(currentMetadata?.requestHandlers ?? []), requestHandlerFactory ]
      }
    }

    return descriptor
  }

  public static attatchErrorHandler(
    descriptor: TypedPropertyDescriptor<PlainFunction & { [ExpressControllerMethodMetadata.METADATA_KEY]?: ExpressControllerMethodMetadata }>,
    errorHandlerFactory: FactoryFunction<express.ErrorRequestHandler>,
  ): PropertyDescriptor {
    if (descriptor.value) {
      const currentMetadata = descriptor.value[ControllerMethodMetadata.METADATA_KEY]
      descriptor.value[ControllerMethodMetadata.METADATA_KEY] = { ...currentMetadata,
        errorHandlers: [ ...(currentMetadata?.errorHandlers ?? []), errorHandlerFactory ]
      }
    }

    return descriptor
  }

  public static extract(
    descriptor: PropertyDescriptor
  ): ExpressControllerMethodMetadata {
    if (descriptor.value && descriptor.value[ControllerMethodMetadata.METADATA_KEY]) {
      return { ...super.extract(descriptor),
        requestHandlers: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.requestHandlers,
        errorHandlers: descriptor.value[ControllerMethodMetadata.METADATA_KEY]?.errorHandlers,
      };
    }

    return {}
  }
}
