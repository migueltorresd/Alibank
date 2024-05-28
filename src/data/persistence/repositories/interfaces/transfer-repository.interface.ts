import { TransferEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de transferencias.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para las transferencias.
 *
 * @export
 * @interface TransferRepositoryInterface
 * @extends {BaseRepositoryInterface<TransferEntity>} Interfaz base de repositorio para transferencias
 */
export interface TransferRepositoryInterface extends BaseRepositoryInterface<TransferEntity> {
  /**
   * Encuentra todas las transferencias.
   *
   * @returns {Promise<TransferEntity[]>} Promesa que resuelve con un arreglo de todas las transferencias
   * @memberof TransferRepositoryInterface
   */
  findAll(): Promise<TransferEntity[]>;

  /**
   * Encuentra una transferencia por su ID.
   *
   * @param {string} id ID de la transferencia a buscar
   * @returns {Promise<TransferEntity>} Promesa que resuelve con la transferencia encontrada
   * @memberof TransferRepositoryInterface
   */
  findOneById(id: string): Promise<TransferEntity>;

  /**
   * Encuentra las transferencias de salida para una cuenta dentro de un rango de fechas.
   *
   * @param {string} accountId ID de la cuenta
   * @param {(Date | number)} dateInit Fecha inicial del rango
   * @param {(Date | number)} dateEnd Fecha final del rango
   * @returns {Promise<TransferEntity[]>} Promesa que resuelve con un arreglo de transferencias de salida dentro del rango de fechas especificado
   * @memberof TransferRepositoryInterface
   */
  findOutcomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<TransferEntity[]>;

  /**
   * Encuentra las transferencias de entrada para una cuenta dentro de un rango de fechas.
   *
   * @param {string} accountId ID de la cuenta
   * @param {(Date | number)} dateInit Fecha inicial del rango
   * @param {(Date | number)} dateEnd Fecha final del rango
   * @returns {Promise<TransferEntity[]>} Promesa que resuelve con un arreglo de transferencias de entrada dentro del rango de fechas especificado
   * @memberof TransferRepositoryInterface
   */
  findIncomeByDataRange(
    accountId: string,
    dateInit: Date | number,
    dateEnd: Date | number,
  ): Promise<TransferEntity[]>;
}
