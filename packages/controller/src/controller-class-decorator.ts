import * as Utils from '@nodelith/utils';
import * as Controller from './controller-class-metadata';

export function Path(path: string) {
  return (constructor: Utils.ConstructorFunction): Utils.ConstructorFunction => {
    Controller.ControllerClassMetadata.attach(constructor, { path })
    return constructor;
  };
}

// export function Name(name: string) {
//   return (constructor: Utils.ConstructorFunction): Utils.ConstructorFunction => {
//     Controller.ControllerClassMetadata.attach(constructor, { name })
//     return constructor
//   };
// }

// export function Description(description: string) {
//   return (constructor: Utils.ConstructorFunction): Utils.ConstructorFunction => {
//     Controller.ControllerClassMetadata.attach(constructor, { description })
//     return constructor;
//   };
// }
