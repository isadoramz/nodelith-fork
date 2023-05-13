import { Entity, Filter, EntityPropertiesPartial } from '../domains'

export interface FilterRepository<E extends Entity<any>> {
  /**
   * @description Gets multiple entity instances that matches an entity filter.
   * @param {Filter<E>} filter An entity filter that matches the instances to get.
   * @returns {Promise<E[]>} Returns the matched entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getByFilter(filter: Filter<E>): Promise<E[]>

  /**
   * @description Updates multiple entity instances that matches an entity filter.
   * @param {Filter<E>} filter An entity filter that matches the instances to be updaetd.
   * @param {EntityPropertiesPartial<E>} attributes An object with the attributes and values to be updated.
   * @returns {Promise<E[]>} Returns the updated entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  updateByFilter(filter: Filter<E>, attributes: EntityPropertiesPartial<E>): Promise<E[]>

  /**
   * @description Deletes multiple entity instances that matches an entity filter.
   * @param {Filter} filter An entity filter that matches the instances to be deleted.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  deleteByFilter(filter: Filter<E>): Promise<void>

  /**
   * @description Counts the number of instances on the repository given an optional filter.
   * @param {Filter<E>} filter An entity filter that matches the instances to be counted.
   * @returns {Promise<number>} An integer representing the number of counted entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  countByFilter(filter: Filter<E>): Promise<number>
}
