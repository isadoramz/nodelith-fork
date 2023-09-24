import { join } from 'path';
import * as Express from 'express';
import { Container } from '@core-fusion/container'
import { Constructor, Function } from '@core-fusion/context';
import { ControllerClassMetadata } from './controller-class-metadata'
import { ControllerMethodMetadata } from './controller-method-metadata'
import { createControllerRequestHandler } from './controller-request-handlers';

export class ControllerResolver {

  private static readonly DEFAULT_PATH = '/'

  private readonly requestHandlers: Express.RequestHandler[] = []

  private readonly errorHandlers: Express.ErrorRequestHandler[] = []

  constructor(
    private readonly container: Container
  ) {}

  public useRequestHandler(handlerFactory: Function<Express.RequestHandler>): void {
    const handler = this.container.resolveFunction(handlerFactory)
    this.requestHandlers.push((request, response, next) => {
      Promise.resolve(handler(request, response, next)).catch(next)
    })
  }

  public useErrorHandler(errorHandlerFactory: Function<Express.ErrorRequestHandler>): void {
    const errorHandler = this.container.resolveFunction(errorHandlerFactory)
    this.errorHandlers.push((error, request, response, next) => {
      Promise.resolve(errorHandler(error, request, response, next)).catch(next)
    })
  }

  public resolve(...controllerClass: Constructor[]): Express.Router {
    return controllerClass.reduce((route, controller) => {
      return this.includePathsIntoController(route, controller)
    }, Express.Router())
  }

  private includePathsIntoController<C>(router: Express.Router, controllerClass: Constructor<C>): Express.Router {
    const controllerMetadata = ControllerClassMetadata.extract(controllerClass)

    const controllerInstance = this.container.resolveClass<C>(controllerClass)

    const propertyDescriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype)

    Object.values(propertyDescriptors).forEach(methodDescriptor => {
      const methodMetadata = ControllerMethodMetadata.extract(methodDescriptor)

      const routeMetadata = { ...methodMetadata, path: join(
        controllerMetadata.path ?? ControllerResolver.DEFAULT_PATH,
        methodMetadata.path ?? ControllerResolver.DEFAULT_PATH,
      )}

      const {
        key, 
        path, 
        httpCode,
        httpMethod, 
        bodyValidationHandler,
        authorizationHandler,
      } = routeMetadata

      if ((key && httpMethod && path && typeof controllerInstance[key] === 'function')) {
        const controllerHandler = createControllerRequestHandler(controllerInstance, key as keyof C, httpCode)

        const handlers = [
          ...this.requestHandlers,
          ...(authorizationHandler ? [authorizationHandler] : []),
          ...(bodyValidationHandler ? [bodyValidationHandler] : []),
          ...(controllerHandler ? [controllerHandler] : []),
          ...this.errorHandlers
        ];

        router[httpMethod](path, handlers);
      }
    });

    return router
  }
}
