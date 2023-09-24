import { DeepPartial } from '@core-fusion/context';
import { ConfigObject } from './config-object';

export type ConfigInitializerDefaults<Config extends ConfigObject = ConfigObject> = DeepPartial<Config>;
