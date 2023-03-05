import { Entity, Filter, Query, EntityAttributes, EntityAttributesPartial } from '@thomazmz/core-domains'

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


  /**
   * @description Creates a single entity instance. It will assign the instance a unique id and the createdAt/updatedAt timestamps.
   * @param {EntityAttributes<E>} attributes The assignable attributes that will be used to create the entity instancy.
   * @returns {Promise<E>} Returns the created instance.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  createOne(attributes: EntityAttributes<E>): Promise<E>

  /**
   * @description Creates many entity instancess. It will assign for each of the persisted instances a unique id and the createdAt/updatedAt timestamps.
   * @param {EntityAttributes<E>[]} attributes The attributes that will be used to create the entity instances.
   * @returns {Promise<E[]>} Returns an array of created instances.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  createMany(attributes: EntityAttributes<E>[]): Promise<E[]>

  /**
   * @see createOne
   */
  create(attributes: EntityAttributes<E>): Promise<E>

  /**
   * @see createMany
   */
  create(attributes: EntityAttributes<E>[]): Promise<E[]>

  /**
   * @description Updates a single entity instance that matches a given id and a partial entity representation.
   * @param {E['id']} id An id that matches the instance to be updated.
   * @param {EntityAttributesPartial<E>} attributes An object with the attributes and values to be updated.
   * @returns {Promise<E>} Returns the updated entity.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  updateById(id: E['id'], attributes: EntityAttributesPartial<E>): Promise<E>

  /**
   * @description Updates multiple entity instances given an array of ids and a partial entity representation.
   * @param {E['id'][]} ids An array of ids that matches the instances to be updaetd.
   * @param {EntityAttributesPartial<E>} attributes An object with the attributes and values to be updated.
   * @returns {Promise<E[]>} Returns the updated entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  updateByIds(ids: E['id'][], attributes: EntityAttributesPartial<E>): Promise<E[]>

  /**
   * @description Updates multiple entity instances that matches an entity filter.
   * @param {Filter<E>} filter An entity filter that matches the instances to be updaetd.
   * @param {EntityAttributesPartial<E>} attributes An object with the attributes and values to be updated.
   * @returns {Promise<E[]>} Returns the updated entities.
   * @throws {RepositoryError} Throws a RepositoryError in case of failure.
   */
  updateByFilter(filter: Filter<E>, attributes: EntityAttributesPartial<E>): Promise<E[]>

  /**
   * @see updateById
   */
  update(id: E['id'], attributes: EntityAttributesPartial<E>): Promise<E>

  /**
   * @see updateByIds
   */
  update(ids: E['id'][], attributes: EntityAttributesPartial<E>): Promise<E[]>

  /**
   * @see updateByFilter
   */
  update(filter: Filter<E>, attributes: EntityAttributesPartial<E>): Promise<E[]>
}

