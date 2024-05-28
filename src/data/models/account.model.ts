import { CustomerModel } from '.';
import { AccountTypeModel } from '.';

/**
 * Interfaz para el modelo de cuenta
 *
 * @export
 * @interface AccountModel
 */
export interface AccountModel {
  id: string;
  customer: CustomerModel;
  accountType: AccountTypeModel;
  balance: number;
  state: boolean;
  deletedAt?: Date | number;
}
