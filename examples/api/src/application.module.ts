import * as Express from '@nodelith/express'
import * as Pets from './pets'

export const Module = new Express.ServerModule();

Module.useModule(Pets.Module)
Module.useController(Pets.Controller)
