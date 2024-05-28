import { AccountModel } from '.';

/**
 * Interfaz que define la estructura de datos para el modelo de transferencia.
 * 
 * @remarks
 * Esta interfaz representa los campos y tipos de datos asociados con una transferencia de fondos entre cuentas.
 * 
 * @export
 * @interface TransferModel
 */
export interface TransferModel {
  /** Identificador único de la transferencia */
  id: string;

  /** Cuenta de salida de la transferencia */
  outCome: AccountModel;

  /** Cuenta de entrada de la transferencia */
  inCome: AccountModel;

  /** Monto de la transferencia */
  amount: number;

  /** Razón o motivo de la transferencia */
  reason: string;

  /** Fecha y hora de la transferencia */
  dateTime: Date | number;

  /** Fecha y hora en la que la transferencia fue eliminada (opcional) */
  deletedAt?: Date | number;
}
