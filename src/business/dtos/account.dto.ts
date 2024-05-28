import {
  IsBoolean,
  IsDateString,
  IsNumberString,
  IsUUID,
} from 'class-validator';

/**
 * Data Transfer Object para representar una cuenta.
 *
 * @export
 * @class AccountDTO
 */
export class AccountDTO {
  /**
   * Identificador único del tipo de cuenta.
   * 
   * @type {string}
   * @memberof AccountDTO
   * @decorator IsUUID
   */
  @IsUUID()
  accountTypeId: string;

  /**
   * Identificador único del cliente.
   * 
   * @type {string}
   * @memberof AccountDTO
   * @decorator IsUUID
   */
  @IsUUID()
  customerId: string;
}
