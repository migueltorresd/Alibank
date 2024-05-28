import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

/**
 * Filtro de excepciones genérico
 *
 * @template T Tipo de la excepción
 * @export
 * @class ExceptionFiltersFilter
 * @implements {ExceptionFilter}
 */
@Catch()
export class ExceptionFiltersFilter<T> implements ExceptionFilter {
  /**
   * Método para manejar excepciones
   *
   * @param {T} exception Excepción capturada
   * @param {ArgumentsHost} host Contexto de los argumentos
   * @memberof ExceptionFiltersFilter
   */
  catch(exception: T, host: ArgumentsHost) {}
}
