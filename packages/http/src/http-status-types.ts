import { StatusArray } from './http-status-constants'

export type Status = typeof StatusArray[number]

export type StatusClass = Status['class']

export type Status1xx = Extract<Status, { class: '1xx' }>

export type Status2xx = Extract<Status, { class: '2xx' }>

export type Status3xx = Extract<Status, { class: '3xx' }>

export type Status4xx = Extract<Status, { class: '4xx' }>

export type Status5xx = Extract<Status, { class: '5xx' }>

export type StatusMessage = Status['message']

export type Status1xxMessage = Status1xx['message']

export type Status2xxMessage = Status2xx['message']

export type Status3xxMessage = Status3xx['message']

export type Status4xxMessage = Status4xx['message']

export type Status5xxMessage = Status5xx['message']

export type StatusCode = Status['code']

export type Status1xxCode = Status1xx['code']

export type Status2xxCode = Status2xx['code']

export type Status3xxCode = Status3xx['code']

export type Status4xxCode = Status4xx['code']

export type Status5xxCode = Status5xx['code']