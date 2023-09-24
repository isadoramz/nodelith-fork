import { DeepPartial, ValueObject } from "@core-fusion/context";

export type ConfigInitializerDefaults<Config extends ValueObject = any> = DeepPartial<Config>;