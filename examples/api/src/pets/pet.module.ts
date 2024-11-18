import { Module } from '@nodelith/container'

import { PetService } from './pet.service'
import { PetRepository } from './pet.repository'

export const PetModule = new Module()
PetModule.registerConstructor('petService', PetService)
PetModule.registerConstructor('petRepository', PetRepository)
