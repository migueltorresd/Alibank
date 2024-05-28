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
 * Data Transfer Object para representar un cliente.
 *
 * @export
 * @class CustomerDTO
 */
export class CustomerDTO {
  /**
   * Identificador único del tipo de documento.
   * 
   * @type {string}
   * @memberof CustomerDTO
   * @decorator IsUUID
   */
  @IsUUID()
  documentTypeId: string;

  /**
   * Número del documento.
   * 
   * @type {string}
   * @memberof CustomerDTO
   * @decorator IsNumberString
   */
  @IsNumberString()
  document: string;

  /**
   * Nombre completo del cliente.
   * 
   * @type {string}
   * @memberof CustomerDTO
   * @decorator IsString
   * @decorator MaxLength
   */
  @IsString()
  @MaxLength(500)
  fullName: string;

  /**
   * Correo electrónico del cliente.
   * 
   * @type {string}
   * @memberof CustomerDTO
   * @decorator IsEmail
   */
  @IsEmail()
  email: string;

  /**
   * Número de teléfono del cliente.
   * 
   * @type {string}
   * @memberof CustomerDTO
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
   * @memberof CustomerDTO
   * @decorator Matches
   * @decorator MinLength
   */
  @Matches(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
  @MinLength(8)
  password: string;
}
