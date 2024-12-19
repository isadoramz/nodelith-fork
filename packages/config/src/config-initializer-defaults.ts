import { DeepPartial } from '@nodelith/utilities';
import { ConfigObject } from './config-object';


export type ConfigInitializerDefaults<Config extends ConfigObject = ConfigObject> = DeepPartial<Config>;
