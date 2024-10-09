export const HttpGet = 'get'

export const HttpPut = 'put'

export const HttpDelete = 'delete'

export const HttpPost = 'post'

export const HttpPatch = 'patch'

export const HttpMethods = [
  HttpGet,
  HttpPut,
  HttpDelete,
  HttpPost,  
  HttpPatch
] as const

export type HttpMethod = (typeof HttpMethods)[number]
