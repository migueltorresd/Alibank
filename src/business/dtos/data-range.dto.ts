import { IsDateString, IsNumberString } from 'class-validator';

/**
 * Data Transfer Object para representar un rango de datos.
 *
 * @export
 * @class DataRangeDTO
 */
export class DataRangeDTO {
  /**
   * Fecha de inicio del rango.
   * 
   * Puede ser un número (timestamp) o un objeto Date.
   *
   * @type {number | Date}
   * @memberof DataRangeDTO
   * @decorator IsDateString
   */
  @IsDateString()
  startDate?: number | Date;

  /**
   * Fecha de fin del rango.
   * 
   * Puede ser un número (timestamp) o un objeto Date.
   *
   * @type {number | Date}
   * @memberof DataRangeDTO
   * @decorator IsDateString
   */
  @IsDateString()
  endDate?: number | Date;

  /**
   * Cantidad de inicio del rango.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {number}
   * @memberof DataRangeDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  startAmount?: number;

  /**
   * Cantidad de fin del rango.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {number}
   * @memberof DataRangeDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  endAmount?: number;
}
