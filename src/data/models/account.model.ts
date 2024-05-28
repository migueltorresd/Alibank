import { CustomerModel } from '.';
import { AccountTypeModel } from '.';

/**
 * Interfaz que define la estructura de datos para el modelo de cuenta.
 * 
 * @remarks
 * Esta interfaz representa los campos y tipos de datos asociados con una cuenta.
 * 
 * @export
 * @interface AccountModel
 */
export interface AccountModel {
  /** Identificador único de la cuenta */
  id: string;

  /** Cliente asociado a la cuenta */
  customer: CustomerModel;

  /** Tipo de cuenta */
  accountType: AccountTypeModel;

  /** Saldo de la cuenta */
  balance: number;

  /** Estado de la cuenta (activo/inactivo) */
  state: boolean;

  /** Fecha y hora en la que la cuenta fue eliminada (opcional) */
  deletedAt?: Date | number;
}
