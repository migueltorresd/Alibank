import { AccountModel } from '.';

/**
 * Interfaz que define la estructura de datos para el modelo de depósito.
 * 
 * @remarks
 * Esta interfaz representa los campos y tipos de datos asociados con un depósito en una cuenta.
 * 
 * @export
 * @interface DepositModel
 */
export interface DepositModel {
  /** Identificador único del depósito */
  id: string;

  /** Cuenta en la que se realizó el depósito */
  account: AccountModel;

  /** Monto del depósito */
  amount: number;

  /** Fecha y hora del depósito */
  dateTime: Date | number;

  /** Fecha y hora en la que el depósito fue eliminado (opcional) */
  deletedAt?: Date | number;
}
