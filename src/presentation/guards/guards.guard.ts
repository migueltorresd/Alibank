import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Guard para proteger rutas con autenticación JWT.
 */
@Injectable()
export class GuardsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Método que determina si la solicitud tiene permiso para proceder.
   * @param context El contexto de ejecución que contiene la solicitud.
   * @returns Una promesa que resuelve con un booleano indicando si la solicitud está autorizada.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('access_token ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (err) {
      return false;
    }
  }
}
