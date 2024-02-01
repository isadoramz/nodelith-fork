import { HttpBadRequest, HttpInternalServerError, HttpStatus, HttpUnauthorized, HttpNotImplemented } from './http-status';

export abstract class HttpServerError extends Error {
  public readonly httpStatus: HttpStatus
  constructor(message?: string, httpStatus: Extract<HttpStatus, { band: 500 }> = HttpInternalServerError) {
    super(message)
    this.httpStatus = httpStatus
  }
}

export abstract class HttpClientError extends Error {
  public readonly httpStatus: HttpStatus
  constructor(message?: string, httpStatus: Extract<HttpStatus, { band: 400 }> = HttpBadRequest) {
    super(message)
    this.httpStatus = httpStatus
  }
}

export class InternalServerError extends HttpServerError {
  constructor(message: string = HttpInternalServerError.message) {
    super(message, HttpInternalServerError)
    this.name = BadRequestError.name
  }
}

export class NotImplementedError extends HttpServerError {
  constructor(message: string = HttpNotImplemented.message) {
    super(message, HttpNotImplemented)
    this.name = NotImplementedError.name
  }
}

export class NotFoundError extends HttpClientError {
  constructor(message: string = HttpBadRequest.message) {
    super(message, HttpBadRequest)
    this.name = NotFoundError.name
  }
}

export class AuthorizationError extends HttpClientError {
  constructor(message: string = HttpUnauthorized.message) {
    super(message, HttpUnauthorized)
    this.name = AuthorizationError.name
  }
}

export class BadRequestError extends HttpClientError {
  constructor(message: string = HttpBadRequest.message) {
    super(message, HttpBadRequest)
    this.name = BadRequestError.name
  }
}

export class InvalidRequestBodyError extends BadRequestError {
  protected static readonly MESSAGE_HEAD = 'Invalid request body.'
  constructor(messageTail?: string) {
    super(`${InvalidRequestBodyError.MESSAGE_HEAD} ${messageTail ?? ''}`.trim())
  }
}
