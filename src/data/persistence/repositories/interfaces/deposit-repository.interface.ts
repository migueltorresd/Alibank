import { DepositEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de depósitos.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para los depósitos.
 *
 * @export
 * @interface DepositRepositoryInterface
 * @extends {BaseRepositoryInterface<DepositEntity>} Interfaz base de repositorio para depósitos
 */
export interface DepositRepositoryInterface extends BaseRepositoryInterface<DepositEntity> {
  /**
   * Encuentra depósitos por ID de cuenta.
   *
   * @param {string} accountId ID de la cuenta asociada a los depósitos
   * @returns {Promise<DepositEntity[]>} Promesa que resuelve con un arreglo de depósitos asociados a la cuenta especificada
   * @memberof DepositRepositoryInterface
   */
  findByAccountId(accountId: string): Promise<DepositEntity[]>;

  /**
   * Encuentra depósitos dentro de un rango de fechas.
   *
   * @param {(Date | number)} dateInit Fecha de inicio del rango
   * @param {(Date | number)} dateEnd Fecha de fin del rango
   * @returns {Promise<DepositEntity[]>} Promesa que resuelve con un arreglo de depósitos dentro del rango de fechas especificado
   * @memberof DepositRepositoryInterface
   */
  findByDataRange(
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<DepositEntity[]>;
}
