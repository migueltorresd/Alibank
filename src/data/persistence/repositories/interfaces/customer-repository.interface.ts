import { CustomerEntity } from '../../entities';
import { BaseRepositoryInterface } from './base/';

/**
 * Interfaz para el repositorio de clientes.
 *
 * Extiende la interfaz base de repositorio y define métodos adicionales específicos para los clientes.
 *
 * @export
 * @interface CustomerRepositoryInterface
 * @extends {BaseRepositoryInterface<CustomerEntity>} Interfaz base de repositorio para clientes
 */
export interface CustomerRepositoryInterface extends BaseRepositoryInterface<CustomerEntity> {
  /**
   * Encuentra un cliente por email y contraseña.
   *
   * @param {string} email Correo electrónico del cliente
   * @param {string} password Contraseña del cliente
   * @returns {Promise<boolean>} Promesa que resuelve con un valor booleano indicando si se encontró el cliente
   * @memberof CustomerRepositoryInterface
   */
  findOneByEmailAndPassword(email: string, password: string): Promise<boolean>;

  /**
   * Encuentra un cliente por tipo de documento y número de documento.
   *
   * @param {string} documentTypeId ID del tipo de documento del cliente
   * @param {string} document Número de documento del cliente
   * @returns {Promise<CustomerEntity>} Promesa que resuelve con el cliente encontrado
   * @memberof CustomerRepositoryInterface
   */
  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): Promise<CustomerEntity>;

  /**
   * Encuentra un cliente por correo electrónico.
   *
   * @param {string} email Correo electrónico del cliente
   * @returns {Promise<CustomerEntity>} Promesa que resuelve con el cliente encontrado
   * @memberof CustomerRepositoryInterface
   */
  findOneByEmail(email: string): Promise<CustomerEntity>;

  /**
   * Encuentra un cliente por número de teléfono.
   *
   * @param {string} phone Número de teléfono del cliente
   * @returns {Promise<CustomerEntity>} Promesa que resuelve con el cliente encontrado
   * @memberof CustomerRepositoryInterface
   */
  findOneByPhone(phone: string): Promise<CustomerEntity>;

  /**
   * Encuentra clientes por estado.
   *
   * @param {boolean} state Estado del cliente a buscar
   * @returns {Promise<CustomerEntity[]>} Promesa que resuelve con un arreglo de clientes que coinciden con el estado especificado
   * @memberof CustomerRepositoryInterface
   */
  findByState(state: boolean): Promise<CustomerEntity[]>;

  /**
   * Encuentra clientes por nombre completo.
   *
   * @param {string} fullName Nombre completo del cliente
   * @returns {Promise<CustomerEntity[]>} Promesa que resuelve con un arreglo de clientes que tienen el nombre completo especificado
   * @memberof CustomerRepositoryInterface
   */
  findByFullName(fullName: string): Promise<CustomerEntity[]>;
}
