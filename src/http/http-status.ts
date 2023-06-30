
export const Ok = {
  message: 'Ok',
  code: 200,
} as const 

export const Created = {
  message: 'Created',
  code: 201,
} as const 

export const Accepted = {
  message: 'Accepted',
  code: 202,
} as const 

export const NoContent = {
  message: 'No Content',
  code: 204,
} as const 

export const MovedPermanently = {
  message: 'Moved Permanently',
  code: 301,
} as const 

export const Found = {
  message: 'Found',
  code: 302,
} as const 

export const NotModified = {
  message: 'Not Modified',
  code: 304,
} as const 

export const BadRequest = {
  message: 'Bad Request',
  code: 400,
} as const 

export const Unauthorized = {
  message: 'Unauthorized',
  code: 401,
} as const 

export const Forbiden = {
  message: 'Forbiden',
  code: '403',
} as const 

export const NotFound = {
  message: 'Not found',
  code: '404',
} as const 

export const TooManyRequests = {
  message: 'Too many requests',
  code: '429',
} as const 

export const InternalServerError = {
  message: 'Internal server error',
  code: '500',
} as const 

export const ServiceNotAvailable = {
  message: 'Service not available',
  code: '503',
} as const 

export const HttpStatuses = [
  Created,
  Accepted,
  NoContent,
  MovedPermanently,
  Found,
  NotModified,
  BadRequest,
  Unauthorized,
  Forbiden,
  NotFound,
  TooManyRequests,
  InternalServerError,
  ServiceNotAvailable,
 ] as const

export type HttpStatus = (typeof HttpStatuses)[number]
