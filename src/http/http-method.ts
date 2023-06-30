export const Get = 'get'

export const Put = 'put'

export const Delete = 'delete'

export const Post = 'post'

export const Patch = 'patch'

export const HttpMethods = [
  Get,
  Put,
  Delete,
  Post,  
  Patch
] as const

export type HttpMethod = (typeof HttpMethods)[number]
