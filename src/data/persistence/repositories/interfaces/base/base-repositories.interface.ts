/**
 * Interfaz base para los repositorios que manejan entidades.
 *
 * Define métodos comunes para realizar operaciones CRUD en la base de datos.
 *
 * @export
 * @interface BaseRepositoryInterface
 * @template E Tipo de la entidad
 */
export interface BaseRepositoryInterface<E> {
  /**
   * Registra una nueva entidad en la base de datos.
   *
   * @param {E} entity Entidad a registrar
   * @returns {Promise<E>} Promesa que resuelve con la entidad registrada
   * @memberof BaseRepositoryInterface
   */
  register(entity: E): Promise<E>;

  /**
   * Actualiza una entidad existente en la base de datos.
   *
   * @param {string} id Identificador de la entidad a actualizar
   * @param {E} entity Datos actualizados de la entidad
   * @returns {Promise<E>} Promesa que resuelve con la entidad actualizada
   * @memberof BaseRepositoryInterface
   */
  update(id: string, entity: E): Promise<E>;

  /**
   * Elimina una entidad de la base de datos.
   *
   * @param {string} id Identificador de la entidad a eliminar
   * @param {boolean} [soft] Indicador de eliminación suave (opcional)
   * @memberof BaseRepositoryInterface
   */
  delete(id: string, soft?: boolean): void;

  /**
   * Obtiene todas las entidades almacenadas en la base de datos.
   *
   * @returns {Promise<E[]>} Promesa que resuelve con un arreglo de todas las entidades
   * @memberof BaseRepositoryInterface
   */
  findAll(): Promise<E[]>;

  /**
   * Busca una entidad por su identificador único en la base de datos.
   *
   * @param {string} id Identificador de la entidad a buscar
   * @returns {Promise<E>} Promesa que resuelve con la entidad encontrada (o null si no se encuentra)
   * @memberof BaseRepositoryInterface
   */
  findOneById(id: string): Promise<E>;
}
