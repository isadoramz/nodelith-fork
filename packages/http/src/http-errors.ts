import * as HttpStatus from './http-status-constants'
import * as Http from './http-status-types'

export abstract class HttpError extends Error {
  constructor(message: string, public readonly httpStatus: Http.Status) {
    super(message)
  }
}

export abstract class HttpServerError extends HttpError {
  public constructor(message?: string, httpStatus: Http.Status5xx = HttpStatus.InternalServerErrorStatus) {
    super(message ?? httpStatus.message, httpStatus);
  }
}

export class HttpInternalServerError extends HttpServerError {
  public constructor(message?: string) {
    super(message, HttpStatus.InternalServerErrorStatus)
  }
}

export class HttpNotImplementedError extends HttpServerError {
  public constructor(message?: string) {
    super(message, HttpStatus.NotImplementedStatus)
  }
}

export abstract class HttpClientError extends HttpError {
  public constructor(message?: string, httpStatus: Http.Status4xx = HttpStatus.BadRequestStatus) {
    super(message ?? httpStatus.message, httpStatus);
  }
}

export class HttpBadRequestError extends HttpClientError {
  public constructor(message?: string) {
    super(message, HttpStatus.BadRequestStatus)
  }
}

export class HttpUnauthorizedError extends HttpClientError {
  constructor(message?: string) {
    super(message, HttpStatus.UnauthorizedStatus)
  }
}

export class HttpForbiddenError extends HttpClientError {
  constructor(message?: string) {
    super(message, HttpStatus.ForbiddenStatus)
  }
}
