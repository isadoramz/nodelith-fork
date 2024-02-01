import express from 'express'
import { Validator } from '@nodelith/context';
import { AuthorizationError } from '@nodelith/http';
import { ControllerRequest } from '@nodelith/controller';
import { ExpressControllerMethodMetadata } from './express-controller-method-metadata';

export function AuthorizePrincipal(principalType: string) {
  return AuthorizePrincipals(principalType)
}

export function AuthorizePrincipals(...principalTypes: Array<string>) {
  return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
    return ExpressControllerMethodMetadata.attachRequestHandler(descriptor, () => {
      return (req: ControllerRequest, _: express.Response, next: express.NextFunction) => {
        if(!req.principal?.type || !principalTypes.includes(req.principal?.type)) {
          throw new AuthorizationError('Invalid Authorization Principal.')
        }
        next()
      }
    });
  };
}

export function BodyValidator(validator: Validator) {
  return (_: unknown, __: string, descriptor: PropertyDescriptor) => {
    return ExpressControllerMethodMetadata.attachRequestHandler(descriptor, () => {
      return (req: ControllerRequest, _: Express.Response, next: express.NextFunction) => {
        if(validator.assert(req.body)) {
          return next()
        }
      }
    });
  };
}
