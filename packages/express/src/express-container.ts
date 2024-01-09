import express from 'express'
import { HttpOk } from '@nodelith/http'
import { Container } from '@nodelith/container'
import { Constructor, FunctionUtilities, PlainFunction } from '@nodelith/utilities'
import { ControllerClassMetadata, ControllerMethodMetadata } from '@nodelith/controller'

export class ExpressContainer extends Container {

  public ResolveControllers(...controllerClasses: Constructor[]): express.Router {
    return controllerClasses.reduce((router, controllerClass) => {
      const classMetadata = ControllerClassMetadata.extract(controllerClass)
      if(classMetadata.path) {
        router.use(classMetadata.path, this.resolveController(controllerClass))
      }

      return router
    }, express.Router())
  }

  public resolveController<C>(controllerClass: Constructor<C>):  express.Router {
    const controllerInstance = this.resolveClass(controllerClass)

    const propertyDescriptors = Object.getOwnPropertyDescriptors(controllerClass.prototype)

    return Object.entries(propertyDescriptors).reduce((router, [ propertyKey, propertyDescriptor ]) => {
      const { path, httpMethod } = ControllerMethodMetadata.extract(propertyDescriptor)
      if(httpMethod && path && typeof controllerInstance[propertyKey] === 'function') {
        router[httpMethod](path, this.resolveRequestHandler(controllerInstance, propertyKey));
      }

      return router
    }, express.Router())
  }

  public resolveRequestHandler<C>(controllerInstance: C, key: string): express.RequestHandler {
    const mapRequestArguments = this.createRequestHandlerArgumentMapper(controllerInstance[key] as PlainFunction)
    return function(request: express.Request, response: express.Response, next: express.NextFunction) {
      const mappedRequestArguments = mapRequestArguments(request, response)
      Promise.resolve((controllerInstance[key] as PlainFunction)(...mappedRequestArguments))
        .then((result) => response.status(HttpOk.code).send(result))
        .catch(next)
    }
  }

  private createRequestHandlerArgumentMapper(requestMethod?: PlainFunction) {
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
