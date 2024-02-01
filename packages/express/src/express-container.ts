import express from 'express'
import { HttpOk } from '@nodelith/http'
import { Container } from '@nodelith/container'
import { ControllerClassMetadata, ControllerMethodMetadata } from '@nodelith/controller'
import { Constructor, FactoryFunction, FunctionUtilities, PlainFunction } from '@nodelith/utilities'

export class ExpressContainer extends Container {

  private readonly requestHandlers: FactoryFunction<express.RequestHandler>[] = []

  private readonly errorHandlers: FactoryFunction<express.ErrorRequestHandler>[] = []

  public registerRequestHandler(handlerFactory: FactoryFunction<express.RequestHandler>): void {
    this.requestHandlers.push(handlerFactory)
  }

  public registerErrorHandler(handlerFactory: FactoryFunction<express.ErrorRequestHandler>): void {
    this.errorHandlers.push(handlerFactory)
  }

  public resolveExpress(...controllerClasses: Constructor[]): express.Express {
    return express().use(
      this.resolveRequestHandlers(),
      this.resolveControllers(...controllerClasses),
      this.resolveRequestErrorHandlers()
    )
  }

  public resolveRequestHandlers(): express.RequestHandler[] {
    return this.requestHandlers.map(handlerFactory => {
      const handler = this.resolveFunction(handlerFactory)
      return (request, response, next) => {
        Promise.resolve(handler(request, response, next)).catch(next)
      }
    })
  }

  public resolveRequestErrorHandlers(): express.ErrorRequestHandler[] {
    return this.errorHandlers.map(errorHandlerFactory => {
      const errorHandler = this.resolveFunction(errorHandlerFactory)
      return (error, request, response, next) => {
        Promise.resolve(errorHandler(error, request, response, next)).catch(next)
      }
    })
  }

  public resolveControllers(...controllerClasses: Constructor[]): express.Router {
    return controllerClasses.reduce((wrapperRouter, controllerClass) => {
      const classMetadata = ControllerClassMetadata.extract(controllerClass)

      if(classMetadata.path) {
        wrapperRouter.use(classMetadata.path, this.resolveController(controllerClass))
      }

      return wrapperRouter
    }, express.Router())
  }

  public resolveController(controllerClass: Constructor): express.Router {
    const controllerInstance = this.resolveClass(controllerClass)

    const propertyDescriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype)

    const propertyDescriptorEntries = Object.entries(propertyDescriptors)

    return propertyDescriptorEntries.reduce((controllerRouter, [ key, descriptor ]) => {

      const { path, method } = ControllerMethodMetadata.extract(descriptor)

      if(method && path && typeof controllerInstance[key] === 'function') {
        controllerRouter[method](path, this.resolveControllerRoute(controllerInstance, key));
      }

      return controllerRouter
    }, express.Router())
  }

  private resolveControllerRoute<C>(controllerInstance: C, key: string): express.RequestHandler {
    const routeArgumentsMapper = this.createRouteArgumentMapper(controllerInstance[key] as PlainFunction)
    return function(request: express.Request, response: express.Response, next: express.NextFunction) {
      const mappedRequestArguments = routeArgumentsMapper(request, response)
      Promise.resolve((controllerInstance[key] as PlainFunction)(...mappedRequestArguments))
        .then((result) => response.status(HttpOk.code).send(result))
        .catch(next)
    }
  }

  private createRouteArgumentMapper(requestMethod?: PlainFunction) {
    return function (request: express.Request, response: express.Response) {
      const requestArguments = requestMethod ? FunctionUtilities.extractArguments(requestMethod) : []
      return requestArguments.map((argumentIdentifier: string) => {
        return {
          req: request,
          res: request,
          request: request,
          response: response,
          body: request.body,
          query: request.query,
          params: request.params,
          headers: request.headers,
        }[argumentIdentifier] ?? request.params[argumentIdentifier]
      })
    }
  }
}
