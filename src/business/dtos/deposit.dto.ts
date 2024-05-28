import { IsNumberString } from 'class-validator';

/**
 * Data Transfer Object para representar un depósito.
 *
 * @export
 * @class DepositDTO
 */
export class DepositDTO {
  /**
   * Identificador de la cuenta.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof DepositDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  accountId: string;

  /**
   * Monto del depósito.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof DepositDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  amount: string;
}
