/**
 * Interfaz que define la estructura de datos para el modelo de tipo de documento.
 * 
 * @remarks
 * Esta interfaz representa los atributos de un tipo de documento, como el ID, el nombre y el estado.
 * 
 * @export
 * @interface DocumentTypeModel
 */
export interface DocumentTypeModel {
  /** Identificador único del tipo de documento */
  id: string;

  /** Nombre del tipo de documento */
  name: string;

  /** Estado del tipo de documento (activo o inactivo) */
  state: boolean;
}
