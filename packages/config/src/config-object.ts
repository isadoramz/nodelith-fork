import { DeepRecord } from '@nodelith/utils';
import { ConfigValue } from 'config-value';

export type ConfigObject = DeepRecord<string, ConfigValue>
