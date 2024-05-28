import { Body, Controller, Get, Post } from '@nestjs/common';
import { SecurityService } from '../../../business/services';
import { CustomerDTO, SignDTO } from '../../../business/dtos';

/**
 * Controlador para gestionar las operaciones de seguridad como registro, inicio de sesión y cierre de sesión.
 */
@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  /**
   * Registra un nuevo usuario.
   * @param customer Los datos del nuevo usuario.
   * @returns Una promesa que resuelve con la información del usuario registrado.
   */
  @Post('sign-up')
  signUp(@Body() customer: CustomerDTO) {
    return this.securityService.signUp(customer);
  }

  /**
   * Inicia sesión de un usuario.
   * @param customer Los datos de inicio de sesión del usuario.
   * @returns Una promesa que resuelve con el token JWT si el inicio de sesión es exitoso.
   */
  @Post('sign-in')
  signIn(@Body() customer: SignDTO) {
    return this.securityService.signIn(customer);
  }

  /**
   * Cierra la sesión de un usuario.
   * @param body El cuerpo de la solicitud que contiene el token JWT del usuario.
   * @returns Un booleano que indica si el cierre de sesión fue exitoso.
   */
  @Get('logout')
  logout(@Body() body: { JWT: string }): boolean {
    return this.securityService.signOut(body.JWT);
  }
}
