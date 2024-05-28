import { AccountModel } from '.';

/**
 * Interfaz para el modelo de transferencia
 *
 * @export
 * @interface TransferModel
 */
export interface TransferModel {
  id: string;
  outCome: AccountModel;
  inCome: AccountModel;
  amount: number;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
