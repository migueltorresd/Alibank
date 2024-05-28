import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

/**
 * Pipe de transformación de datos en NestJS.
 */
@Injectable()
export class PipesPipe implements PipeTransform {
  /**
   * Método de transformación de datos.
   * @param value El valor que se va a transformar.
   * @param metadata La metadata del argumento que incluye detalles como el tipo de argumento.
   * @returns El valor transformado.
   */
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
