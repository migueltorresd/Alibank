import { IsNumberString } from 'class-validator';

/**
 * Data Transfer Object para la paginación.
 *
 * @export
 * @class PaginationDTO
 */
export class PaginationDTO {
  /**
   * Longitud de los elementos en una página.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {number}
   * @memberof PaginationDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  length: number;

  /**
   * Número de página.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {number}
   * @memberof PaginationDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  page: number;
}
