import { EntityAttributes } from './entity-attributes'
import { Entity} from './entity'

export type EntityPropertiesPartial<E extends Entity<any>> = Partial<EntityAttributes<E>>