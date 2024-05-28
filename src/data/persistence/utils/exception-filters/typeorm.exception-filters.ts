import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

/**
 * Clase que representa un filtro de excepciones para errores de TypeORM.
 */
@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  /**
   * Método para manejar la excepción de TypeORM.
   * @param exception La excepción capturada.
   * @param host El contexto de los argumentos de la solicitud.
   */
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const message = exception.message;
    const code: number = (exception as any).code;
    const aditional = (exception as any).detail;

    // Crear una respuesta personalizada para el error de TypeORM.
    const customResponse = {
      status: 500,
      message: 'Ocurrió un error',
      type: 'Internal Server Error',
      errors: [{ message: message, detail: aditional }],
      errorCode: code,
      timestamp: new Date().toISOString(),
    };

    // Enviar la respuesta personalizada al cliente.
    response.status(customResponse.status).json(customResponse);
  }
}
