
import { ControllerMethodMetadata } from './controller-method-metadata'
import * as Http from '@nodelith/http';

export function Route(method: Http.Method, path?: string) {
  return (_: unknown, key: string, descriptor: PropertyDescriptor) => {
    return ControllerMethodMetadata.attach(descriptor, { method, path, key });
  };
}

export function Get(path?: string) {
  return Route('get', path ?? '/');
}

export function Delete(path?: string) {
  return Route('delete', path ?? '/');
}

export function Patch(path?: string) {
  return Route('patch', path ?? '/');
}

export function Put(path?: string) {
  return Route('patch', path ?? '/');
}

export function Post(path?: string) {
  return Route('post', path ?? '/');
}

// export function Name(name: string) {
//   return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
//     return ControllerMethodMetadata.attach(descriptor, { name });
//   };
// }

// export function Description(description: string) {
//   return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
//     return ControllerMethodMetadata.attach(descriptor, { description });
//   };
// }
