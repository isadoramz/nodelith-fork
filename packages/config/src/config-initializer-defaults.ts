import { DeepPartial } from '@nodelith/context';
import { ConfigObject } from './config-object';

export type ConfigInitializerDefaults<Config extends ConfigObject = ConfigObject> = DeepPartial<Config>;
