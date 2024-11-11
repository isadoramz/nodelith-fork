import { Module } from '@nodelith/container'

import { PetService } from './pet.service'
import { PetRepository } from './pet.repository'

export const PetModule = new Module()

PetModule.register('petService', PetService, { access: 'public'})
PetModule.register('petRepository', PetRepository, { access: 'private'})
