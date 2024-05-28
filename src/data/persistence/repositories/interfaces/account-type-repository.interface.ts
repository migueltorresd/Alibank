import { AccountTypeEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de tipos de cuenta.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para los tipos de cuenta.
 *
 * @export
 * @interface AccountTypeRepositoryInterface
 * @extends {BaseRepositoryInterface<AccountTypeEntity>} Interfaz base de repositorio para tipos de cuenta
 */
export interface AccountTypeRepositoryInterface extends BaseRepositoryInterface<AccountTypeEntity> {
  /**
   * Encuentra tipos de cuenta por estado.
   *
   * @param {boolean} state Estado del tipo de cuenta a buscar
   * @returns {Promise<AccountTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de cuenta que coinciden con el estado especificado
   * @memberof AccountTypeRepositoryInterface
   */
  findByState(state: boolean): Promise<AccountTypeEntity[]>;

  /**
   * Encuentra tipos de cuenta por nombre.
   *
   * @param {string} name Nombre del tipo de cuenta
   * @returns {Promise<AccountTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de cuenta que tienen el nombre especificado
   * @memberof AccountTypeRepositoryInterface
   */
  findByName(name: string): Promise<AccountTypeEntity[]>;
}
