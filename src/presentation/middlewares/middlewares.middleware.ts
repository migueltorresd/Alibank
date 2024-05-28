import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware que se ejecuta antes de los controladores para manipular las cabeceras de autorización.
 */
@Injectable()
export class MiddlewaresMiddleware implements NestMiddleware {
  /**
   * Método que manipula la cabecera de autorización de la solicitud.
   * @param req La solicitud HTTP.
   * @param res La respuesta HTTP.
   * @param next La función que se llama para pasar el control al siguiente middleware o controlador.
   */
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('access_token ')) {
      const token = authHeader.substring(7);
      req.headers['Authorization'] = `access_token ${token}`;
    }

    next();
  }
}
