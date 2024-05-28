import { AccountEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de cuentas.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para las cuentas.
 *
 * @export
 * @interface AccountRepositoryInterface
 * @extends {BaseRepositoryInterface<AccountEntity>} Interfaz base de repositorio para cuentas
 */
export interface AccountRepositoryInterface extends BaseRepositoryInterface<AccountEntity> {
  /**
   * Encuentra cuentas por estado.
   *
   * @param {boolean} state Estado de la cuenta a buscar
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas que coinciden con el estado especificado
   * @memberof AccountRepositoryInterface
   */
  findByState(state: boolean): Promise<AccountEntity[]>;

  /**
   * Encuentra cuentas por cliente.
   *
   * @param {string} customerId Identificador del cliente asociado a las cuentas
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas asociadas al cliente especificado
   * @memberof AccountRepositoryInterface
   */
  findByCustomer(customerId: string): Promise<AccountEntity[]>;

  /**
   * Encuentra cuentas por tipo de cuenta.
   *
   * @param {string} accountTypeId Identificador del tipo de cuenta
   * @returns {Promise<AccountEntity[]>} Promesa que resuelve con un arreglo de cuentas que tienen el tipo de cuenta especificado
   * @memberof AccountRepositoryInterface
   */
  findByAccountType(accountTypeId: string): Promise<AccountEntity[]>;
}
