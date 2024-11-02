
export const Ok = 200

export const OkStatus = Object.freeze({
  message: 'Ok',
  slug: 'Ok',
  class: '2xx',
  code: Ok,
})

export const Created = 201

export const CreatedStatus = Object.freeze({
  message: 'Created',
  slug: 'Created',
  class: '2xx',
  code: Created,
})

export const BadRequest = 400

export const BadRequestStatus = Object.freeze({
  message: 'Bad Request', 
  slug: 'BadRequest', 
  class: '4xx',
  code: BadRequest,
})

export const Unauthorized = 401

export const UnauthorizedStatus = Object.freeze({
  message: 'Unauthorized', 
  slug: 'Unauthorized', 
  class: '4xx',
  code: Unauthorized,
})

export const Forbidden = 403

export const ForbiddenStatus = Object.freeze({
  message: 'Forbidden', 
  slug: 'Forbidden', 
  class: '4xx',
  code: Forbidden,
})

export const NotFound = 404

export const NotFoundStatus = Object.freeze({
  message: 'Not Found', 
  slug: 'NotFound', 
  class: '4xx',
  code: NotFound,
})

export const InternalServerError = 500

export const InternalServerErrorStatus = Object.freeze({
  message: 'Internal Server Error', 
  slug: 'InternalServerError', 
  class: '5xx',
  code: InternalServerError,
})

export const NotImplemented = 501

export const NotImplementedStatus = Object.freeze({
  message: 'Not Implemented', 
  slug: 'NotImplemented', 
  class: '5xx',
  code: NotImplemented,
})

export const StatusArray = Object.freeze([
  OkStatus,
  CreatedStatus,
  BadRequestStatus,
  UnauthorizedStatus,
  ForbiddenStatus,
  NotFoundStatus,
  InternalServerErrorStatus,
  NotImplementedStatus,
])