import * as Express from 'express';
import { HttpOk } from '@nodelith/http'
import { FunctionUtilities } from '@nodelith/utilities';
import { ControllerRequest } from './controller-request';

export function createControllerRequestHandler<C>(instance: C, key: keyof C): Express.RequestHandler | undefined {

  function createRequestHandlerArgumentMapper(requestMethod?: Function): (
    request: ControllerRequest,
    response: Express.Response
  ) => string[] {
    return (request: ControllerRequest, response: Express.Response) => {
      const requestArguments = requestMethod? FunctionUtilities.extractArguments(requestMethod) : []
      return requestArguments.map((argumentIdentifier: string) => {
        return {
          req: request,
          res: request,
          request: request,
          response: response,
          body: request.body,
          query: request.query,
          params: request.params,
          principal: request.principal
        }[argumentIdentifier] ?? request.params[argumentIdentifier]
      })
    }
  }

  const argumentMapper = createRequestHandlerArgumentMapper(instance[key] as Function)

  return function routeHandler(request: ControllerRequest, response: Express.Response, next: Express.NextFunction) {
    const argumentMap = argumentMapper(request, response)
    Promise.resolve((instance[key] as Function)(...argumentMap))
      .then((result) => response.status(HttpOk.code).send(result))
      .catch(next)
  }
}
