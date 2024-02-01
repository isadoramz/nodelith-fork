
import { ControllerMethodMetadata } from './controller-method-metadata'
import { HttpMethod, HttpStatus } from '@nodelith/http';

export function Route(method: HttpMethod, path?: string) {
  return (_: unknown, key: string, descriptor: PropertyDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { method, path, key });
  };
}

export function RouteName(name: string) {
  return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { name });
  };
}

export function RouteDescription(description: string) {
  return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
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
