
import {
  IsEmail,
  IsNumberString,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Data Transfer Object para actualizar información del cliente.
 *
 * @export
 * @class CustomerUpdateDTO
 */
export class CustomerUpdateDTO {
  /**
   * Número de documento del cliente.
   * 
   * Debe ser una cadena que representa un número.
   *
   * @type {string}
   * @memberof CustomerUpdateDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  document: string;

  /**
   * Nombre completo del cliente.
   * 
   * Debe ser una cadena con un máximo de 500 caracteres.
   *
   * @type {string}
   * @memberof CustomerUpdateDTO
   * @decorator IsString
   * @decorator MaxLength
   */
  @IsString()
  @MaxLength(500)
  fullName: string;

  /**
   * Número de teléfono del cliente.
   * 
   * Debe ser una cadena que representa un número con un máximo de 30 caracteres.
   *
   * @type {string}
   * @memberof CustomerUpdateDTO
   * @decorator IsNumberString
   * @decorator MaxLength
   */
  @IsNumberString()
  @MaxLength(30)
  phone: string;

  /**
   * Contraseña del cliente.
   * Debe contener al menos una letra mayúscula, una letra minúscula, un número y tener un mínimo de 8 caracteres.
   * 
   * @type {string}
   * @memberof CustomerUpdateDTO
   * @decorator Matches
   * @decorator MinLength
   */
  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  password: string;
}
