import { EntityAttributes } from './entity-attributes'
import { Entity} from './entity'

export type EntityAttributesPartial<E extends Entity<any>> = Partial<EntityAttributes<E>>