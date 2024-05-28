import { DocumentTypeModel } from '.';

/**
 * Interfaz que define la estructura de datos para el modelo de cliente.
 * 
 * @remarks
 * Esta interfaz representa los campos y tipos de datos asociados con un cliente.
 * 
 * @export
 * @interface CustomerModel
 */
export interface CustomerModel {
  /** Identificador único del cliente */
  id: string;

  /** Tipo de documento del cliente */
  documentType: DocumentTypeModel;

  /** Número de documento del cliente */
  document: string;

  /** Nombre completo del cliente */
  fullName: string;

  /** Correo electrónico del cliente */
  email: string;

  /** Número de teléfono del cliente */
  phone: string;

  /** Contraseña del cliente */
  password: string;

  /** URL del avatar del cliente (opcional) */
  avatarUrl?: string;

  /** Estado del cliente (activo/inactivo) */
  state: boolean;

  /** Fecha y hora en la que el cliente fue eliminado (opcional) */
  deletedAt?: Date | number;
}
