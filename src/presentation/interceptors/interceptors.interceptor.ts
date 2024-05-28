import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Interceptor para manejar la lógica previa y posterior a la ejecución de un controlador.
 */
@Injectable()
export class InterceptorsInterceptor implements NestInterceptor {
  /**
   * Intercepta una solicitud y permite ejecutar lógica antes y después del manejo del controlador.
   * @param context El contexto de ejecución que contiene la solicitud.
   * @param next El manejador de la llamada que permite continuar con la ejecución del siguiente interceptor o controlador.
   * @returns Un Observable que contiene la respuesta del controlador.
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
