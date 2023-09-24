
import { Initializer } from '@core-fusion/context';
import { ConfigLoader } from './config-loader';
import { ConfigObject } from './config-object';
import { ConfigInitializerProfile } from './config-initializer-profile';
import { ConfigInitializerDefaults } from './config-initializer-defaults';

export class ConfigInitializer<Config extends ConfigObject> implements Initializer<Config>{

  constructor(
    private readonly configLoader: ConfigLoader,
    private readonly configProfile: ConfigInitializerProfile<Config>,
    private readonly configDefaults: ConfigInitializerDefaults<Config>,
  ) {}

  public async initialize(
    configLoader: ConfigLoader = this.configLoader,
    configProfile: ConfigInitializerProfile = this.configProfile,
    configDefaults: ConfigInitializerDefaults = this.configDefaults,
  ): Promise<Config> {
    return Object.keys(configProfile).reduce(
      async (configObjectPromise, configProfileKey) => {
        const configObject = await configObjectPromise;
  
        const nestedProfile = (configProfile)[configProfileKey] as ConfigInitializerProfile<Config>;
        const nestedDefaults = (configDefaults)[configProfileKey] as ConfigInitializerDefaults<Config>;
  
        if (!Array.isArray(nestedProfile)) {
          return {
            ...configObject,
            [configProfileKey]: await this.initialize(
              configLoader,
              nestedProfile,
              nestedDefaults,
            ),
          };
        }
  
        const [key, schema] = nestedProfile;

        const unparsedValue = await configLoader?.load(key);

        const nestedDefaultsAreUndefined = nestedDefaults !== undefined && nestedDefaults !== null

        const unparsedValueIsUndefined = nestedDefaults !== undefined && nestedDefaults !== null
  
        if (!nestedDefaultsAreUndefined && unparsedValueIsUndefined) {
          throw new Error(`Could not load the environment variable ${key}.`);
        }
  
        const { value, error } = schema.validate(unparsedValue);
  
        if (!nestedDefaults && error) {
          throw new Error(`Could not parse the environment variable ${key}.`);
        }
  
        return { ...configObject, [configProfileKey]: value ?? nestedDefaults };
      }, {} as Promise<Config>
    )
  }
}
