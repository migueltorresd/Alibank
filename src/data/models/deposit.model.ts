import { AccountModel } from '.';

/**
 * Interfaz para el modelo de depósito
 *
 * @export
 * @interface DepositModel
 */
export interface DepositModel {
  id: string;
  account: AccountModel;
  amount: number;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
