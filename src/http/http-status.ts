
export const HttpOk = {
  message: 'Ok',
  code: 200,
} as const 

export const HttpCreated = {
  message: 'Created',
  code: 201,
} as const 

export const HttpAccepted = {
  message: 'Accepted',
  code: 202,
} as const 

export const HttpNoContent = {
  message: 'No Content',
  code: 204,
} as const 

export const HttpMovedPermanently = {
  message: 'Moved Permanently',
  code: 301,
} as const 

export const HttpFound = {
  message: 'Found',
  code: 302,
} as const 

export const HttpNotModified = {
  message: 'Not Modified',
  code: 304,
} as const 

export const HttpBadRequest = {
  message: 'Bad Request',
  code: 400,
} as const 

export const HttpUnauthorized = {
  message: 'Unauthorized',
  code: 401,
} as const 

export const HttpForbiden = {
  message: 'Forbiden',
  code: '403',
} as const 

export const HttpNotFound = {
  message: 'Not found',
  code: '404',
} as const 

export const HttpTooManyRequests = {
  message: 'Too many requests',
  code: '429',
} as const 

export const HttpInternalServerError = {
  message: 'Internal server error',
  code: '500',
} as const 

export const HttpServiceNotAvailable = {
  message: 'Service not available',
  code: '503',
} as const 

export const HttpStatuses = [
  HttpCreated,
  HttpAccepted,
  HttpNoContent,
  HttpMovedPermanently,
  HttpFound,
  HttpNotModified,
  HttpBadRequest,
  HttpUnauthorized,
  HttpForbiden,
  HttpNotFound,
  HttpTooManyRequests,
  HttpInternalServerError,
  HttpServiceNotAvailable,
 ] as const

export type HttpStatus = (typeof HttpStatuses)[number]
