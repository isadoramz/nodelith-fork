export interface ConfigLoader {
  load(key: string): Promise<string | undefined>
}
