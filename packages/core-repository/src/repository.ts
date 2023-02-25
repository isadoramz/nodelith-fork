import { Entity, Filter, Query } from '@thomazmz/core-domains'

export interface Repository<E extends Entity<any>> {

  /**
   * @description Gets all entity instance in a repository.
   * @returns {Promise<E>} Returns all the instances in the repository  as an array.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getAll(): Promise<E[]>
  
  /**
   * @description Gets a single entity instance that matches a given id.
   * @param {E['id']} id An id that matches the single instance to get.
   * @returns {Promise<E>} Returns the matched entity or undefined if no matched entity.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getById(id: E['id']): Promise<E | undefined>
  
  /**
   * @description Gets multiple entity instances given an array of ids.
   * @param {E['id'][]} ids An array of entity ids that matches the instances to get.
   * @returns {Promise<E[]>} Returns the matched entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getByIds(ids: E['id'][]): Promise<E[]>

  /**
   * @description Gets multiple entity instances that matches an entity filter.
   * @param {Filter<E>} filter An entity filter that matches the instances to get.
   * @returns {Promise<E[]>} Returns the matched entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getByFilter(filter: Filter<E>): Promise<E[]>

  /**
   * @description Gets multiple entity instances that matches an entity query.
   * @param {Query<E>} query An entity query that matches the instances to get.
   * @returns {Promise<E[]>} Returns the matched entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  getByQuery(query: Query<E>): Promise<E[]>

  /**
   * @see getAll
   */
  get(): Promise<E[]>

  /**
   * @see getById
   */
  get(id: E['id']): Promise<E>

  /**
   * @see getByIds
   */
  get(ids: E['id'][]): Promise<E[]>

  /**
   * @see getByFilter 
   */
  get(filter: Filter<E>): Promise<E[]>

  /**
   * @see getByQuery
   */
  get(query: Query<E>): Promise<E[]>
}

