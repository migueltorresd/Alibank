/**
 * Interfaz que define la estructura de datos para el modelo de tipo de cuenta.
 * 
 * @remarks
 * Esta interfaz describe las propiedades de un tipo de cuenta, incluyendo su identificador único, nombre y estado.
 * 
 * @export
 * @interface AccountTypeModel
 */
export interface AccountTypeModel {
  /** Identificador único del tipo de cuenta */
  id: string;

  /** Nombre del tipo de cuenta */
  name: string;

  /** Estado del tipo de cuenta */
  state: boolean;
}
