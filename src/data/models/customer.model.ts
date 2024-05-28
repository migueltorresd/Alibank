import { DocumentTypeModel } from '.';

/**
 * Interfaz para el modelo de cliente
 *
 * @export
 * @interface CustomerModel
 */
export interface CustomerModel {
  id: string;
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  state: boolean;
  deletedAt?: Date | number;
}
