export const HttpOk = {
  message: 'Ok',
  band: 200,
  code: 200,
} as const

export const HttpCreated = {
  message: 'Created',
  band: 200,
  code: 201,
} as const

export const HttpAccepted = {
  message: 'Accepted',
  band: 200,
  code: 202,
} as const

export const HttpNoContent = {
  message: 'No Content',
  band: 200,
  code: 204,
} as const

export const HttpMovedPermanently = {
  message: 'Moved Permanently',
  band: 300,
  code: 301,
} as const

export const HttpFound = {
  message: 'Found',
  band: 300,
  code: 302,
} as const

export const HttpNotModified = {
  message: 'Not Modified',
  band: 300,
  code: 304,
} as const

export const HttpBadRequest = {
  message: 'Bad Request',
  band: 400,
  code: 400,
} as const

export const HttpUnauthorized = {
  message: 'Unauthorized',
  band: 400,
  code: 401,
} as const

export const HttpForbiden = {
  message: 'Forbiden',
  band: 400,
  code: 403,
} as const

export const HttpNotFound = {
  message: 'Not found',
  band: 400,
  code: 404,
} as const

export const HttpTooManyRequests = {
  message: 'Too many requests',
  band: 400,
  code: 429,
} as const

export const HttpInternalServerError = {
  message: 'Internal server error',
  band: 500,
  code: 500,
} as const

export const HttpNotImplemented = {
  message: 'Not Implemented',
  band: 500,
  code: 501,
} as const

export const HttpServiceNotAvailable = {
  message: 'Service not available',
  band: 500,
  code: 503,
} as const

export const HttpStatus = [
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
  HttpNotImplemented,
  HttpServiceNotAvailable,
 ] as const

export type HttpStatus = (typeof HttpStatus)[number]
