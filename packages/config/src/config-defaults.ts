import { DeepPartial } from '@nodelith/utils';
import { ConfigObject } from './config-object';

export type ConfigDefaults<Config extends ConfigObject = ConfigObject> = DeepPartial<Config>;
