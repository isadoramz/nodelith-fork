import { DeepPartial } from '@nodelith/utils';
import { ConfigObject } from './config-object';

export type ConfigObjectDefaults<Config extends ConfigObject = ConfigObject> = DeepPartial<Config>;
