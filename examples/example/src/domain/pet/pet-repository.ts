import { Repository } from '@nodelith/context'
import { Pet } from './pet'

export interface PetRepository extends Repository<Pet> {}