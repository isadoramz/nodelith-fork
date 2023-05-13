import { Entity, Query } from '../domains'

export interface QueryRepository<E extends Entity<any>> {
  /**
   * @description Gets multiple entity instances that matches an entity query.
   * @param {Query<E>} query An entity query that matches the instances to get.
   * @returns {Promise<E[]>} Returns the matched entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getByQuery(query: Query<E>): Promise<E[]>
}
