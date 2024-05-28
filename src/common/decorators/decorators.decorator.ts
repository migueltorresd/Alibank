import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para agregar metadatos a un controlador o método
 *
 * @param {...string[]} args Lista de nombres de decoradores
 * @returns {*} {ClassDecorator | MethodDecorator} Decorador que establece metadatos
 */
export const Decorators = (...args: string[]) =>
  SetMetadata('decorators', args);
