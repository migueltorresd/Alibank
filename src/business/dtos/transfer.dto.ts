import { IsNumberString, IsString, MaxLength } from 'class-validator';

/**
 * Data Transfer Object para representar una transferencia.
 *
 * @export
 * @class TransferDTO
 */
export class TransferDTO {
  /**
   * Identificador de la cuenta de origen.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof TransferDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  outComeId: string;

  /**
   * Identificador de la cuenta de destino.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof TransferDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  inComeId: string;

  /**
   * Monto de la transferencia.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof TransferDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  amount: string;

  /**
   * Razón o motivo de la transferencia.
   * 
   * Debe ser una cadena con un máximo de 500 caracteres.
   *
   * @type {string}
   * @memberof TransferDTO
   * @decorator IsString
   * @decorator MaxLength
   */
  @IsString()
  @MaxLength(500)
  reason: string;
}
