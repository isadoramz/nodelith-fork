import { Initializer } from './initializer'

describe('Initializer', () => {
  class NonChildClass {
    public initialize() {
      return {}
    }
  }

  class ChildClass extends Initializer {
    public initialize(): Promise<void> {
      throw new Error('Method not implemented.')
    }
  }

  class GrandchildClass extends ChildClass {
    public initialize(): Promise<void> {
      throw new Error('Method not implemented.')
    }
  }

  describe('isParentClassOf', () => {
    it('should return false for classes that do not implement initializer', () => {
      expect(Initializer.isExtendedBy(NonChildClass)).toEqual(false);
    })
    it('should return true for classes that directly extends initializer', () => {
      expect(Initializer.isExtendedBy(ChildClass)).toEqual(true);
    })
    it('should return true for classes that indirectly extends initializer', () => {
      expect(Initializer.isExtendedBy(GrandchildClass)).toEqual(true);
    })
  })
})