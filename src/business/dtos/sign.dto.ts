import { IsString } from 'class-validator';

/**
 * Data Transfer Object para los datos de inicio de sesión.
 *
 * @export
 * @class SignDTO
 */
export class SignDTO {
  /**
   * Correo electrónico del usuario.
   * 
   * Debe ser una cadena.
   *
   * @type {string}
   * @memberof SignDTO
   * @decorator IsString
   */
  @IsString()
  email: string;

  /**
   * Contraseña del usuario.
   * 
   * Debe ser una cadena.
   *
   * @type {string}
   * @memberof SignDTO
   * @decorator IsString
   */
  @IsString()
  password: string;
}
