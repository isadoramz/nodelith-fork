import { ValidatorFunction } from '@nodelith/utils';
import { ConfigValue } from 'config-value';

export type ConfigValueProfile<V extends ConfigValue = any> = string | [string] | [string, ValidatorFunction<V>]
