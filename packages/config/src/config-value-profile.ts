import { ValidatorFunction } from '@nodelith/core';
import { ConfigValue } from 'config-value';

export type ConfigValueProfile<V extends ConfigValue = any> = string | [string] | [string, ValidatorFunction<V>]
