import * as Types from '@nodelith/types'
import * as Controller from './controller-class-metadata';

export function Path(path: string) {
  return (constructor: Types.Constructor): Types.Constructor => {
    Controller.ControllerClassMetadata.attach(constructor, { path })
    return constructor;
  };
}

// export function Name(name: string) {
//   return (constructor: Types.Constructor): Types.Constructor => {
//     Controller.ControllerClassMetadata.attach(constructor, { name })
//     return constructor
//   };
// }

// export function Description(description: string) {
//   return (constructor: Types.Constructor): Types.Constructor => {
//     Controller.ControllerClassMetadata.attach(constructor, { description })
//     return constructor;
//   };
// }