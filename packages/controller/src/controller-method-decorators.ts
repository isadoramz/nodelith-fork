
import { Schema } from 'joi';
import { HttpMethod, HttpStatus } from '@nodelith/http';
import { createBodySchemaRequestHandler, createPrincipalAuthorizationRequestHandler } from './controller-request-handlers';
import { ControllerMethodDescriptor } from './controller-method-descriptor';
import { ControllerMethodMetadata } from './controller-method-metadata'

export function AuthorizePrincipal(principalType: string) {
  return AuthorizePrincipals(principalType)
}

export function AuthorizePrincipals(...principalTypes: Array<string>) {
  return (_: unknown, __: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, {
      authorizationHandler: createPrincipalAuthorizationRequestHandler(...principalTypes)
    })
  };
}

export function BodySchema(bodySchema: Schema) {
  return (_: unknown, __: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { 
      bodyValidationHandler: createBodySchemaRequestHandler(bodySchema)
    });
  };
}

export function SuccessStatus(httpStatus: HttpStatus) {
  return (_: unknown, __: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { httpCode: httpStatus.code });
  };
}

export function Route(httpMethod: HttpMethod, path?: string) {
  return (_: unknown, key: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { httpMethod, path, key });
  };
}

export function RouteName(name: string) {
  return (_: unknown, __: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { name });
  };
}

export function RouteDescription(description: string) {
  return (_: unknown, __: string, descriptor: ControllerMethodDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { description });
  };
}

export function GetRoute(path?: string) {
  return Route('get', path ?? '/');
}

export function DeleteRoute(path?: string) {
  return Route('delete', path ?? '/');
}

export function PatchRoute(path?: string) {
  return Route('patch', path ?? '/');
}

export function PutRoute(path?: string) {
  return Route('patch', path ?? '/');
}

export function PostRoute(path?: string) {
  return Route('post', path ?? '/');
}
