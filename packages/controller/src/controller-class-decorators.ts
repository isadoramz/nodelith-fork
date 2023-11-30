import { Constructor } from '@nodelith/context';
import { ControllerClassMetadata } from './controller-class-metadata';

export function ControllerPath(path: string) {
  return (constructor: Constructor): Constructor => {
    ControllerClassMetadata.attach(constructor, { path })
    return constructor;
  };
}

export function ControllerName(name: string) {
  return (constructor: Constructor): Constructor => {
    ControllerClassMetadata.attach(constructor, { name })
    return constructor
  };
}

export function ControllerDescription(description: string) {
  return (constructor: Constructor): Constructor => {
    ControllerClassMetadata.attach(constructor, { description })
    return constructor;
  };
}