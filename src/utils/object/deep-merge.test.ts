import { deepMerge } from './deep-merge'

describe('deepMerge', () => {
  it('should merge different keys', () => {
    const source: any = {
      someKey: 'anotherValue'
    }

    const target: any = {
      anotherKey: 'anotherValue'
    }

    const deepMergeResult = deepMerge(source, target)

    expect(deepMergeResult).toEqual({
      someKey: 'anotherValue',
      anotherKey: 'anotherValue',
    })
  })

  it('should replace target key with source key', () => {
    const source: any = {
      someKey: 'someValue'
    }

    const target: any = {
      someKey: 'anotherValue'
    }

    const deepMergeResult = deepMerge(source, target)

    expect(deepMergeResult).toEqual({
      someKey: 'someValue'
    })
  })

  it('should ignore undefined fields on source', () => {
    const source: any = {
      someUndefined: undefined
    }

    const target: any = {
      someKey: 'someValue'
    }

    const deepMergeResult = deepMerge(source, target)

    expect(deepMergeResult).toEqual({
      someKey: 'someValue'
    })
  })

  it('should ignore undefined fields on source', () => {
    const source: any = {
      someUndefined: undefined
    }

    const target: any = {
      someKey: 'someValue'
    }

    const deepMergeResult = deepMerge(source, target)

    expect(deepMergeResult).toEqual({
      someKey: 'someValue'
    })
  })

  it('should deeply merge nested objects', () => {
    const source: any = {
      someKey: 'someValue',
      someObject: {
        someKey: 'someValue',
        someSourceExtraKey: 'someSourceExtraValue',
        someObject: {
          someKey: 'someValue',
          someSourceExtraKey: 'someSourceExtraValue',
        }
      }
    }

    const target: any = {
      someKey: 'anotherValue',
      someObject: {
        someKey: 'anotherValue',
        someTargetExtraKey: 'someTargetExtraValue',
        someObject: {
          someKey: 'anotherValue',
          someTargetExtraKey: 'someTargetExtraValue',
        }
      }
    }

    const deepMergeResult = deepMerge(source, target)

    expect(deepMergeResult).toEqual({
      someKey: 'someValue',
      someObject: {
        someKey: 'someValue',
        someSourceExtraKey: 'someSourceExtraValue',
        someTargetExtraKey: 'someTargetExtraValue',
        someObject: {
          someKey: 'someValue',
          someSourceExtraKey: 'someSourceExtraValue',
          someTargetExtraKey: 'someTargetExtraValue',
        }
      }
    })
  })
})
