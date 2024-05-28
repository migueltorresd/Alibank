import { DocumentTypeEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de tipos de documento.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para los tipos de documento.
 *
 * @export
 * @interface DocumentTypeRepositoryInterface
 * @extends {BaseRepositoryInterface<DocumentTypeEntity>} Interfaz base de repositorio para tipos de documento
 */
export interface DocumentTypeRepositoryInterface extends BaseRepositoryInterface<DocumentTypeEntity> {
  /**
   * Encuentra tipos de documento por estado.
   *
   * @param {boolean} state Estado del tipo de documento
   * @returns {Promise<DocumentTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de documento con el estado especificado
   * @memberof DocumentTypeRepositoryInterface
   */
  findByState(state: boolean): Promise<DocumentTypeEntity[]>;

  /**
   * Encuentra tipos de documento por nombre.
   *
   * @param {string} name Nombre del tipo de documento
   * @returns {Promise<DocumentTypeEntity[]>} Promesa que resuelve con un arreglo de tipos de documento con el nombre especificado
   * @memberof DocumentTypeRepositoryInterface
   */
  findByName(name: string): Promise<DocumentTypeEntity[]>;
}
