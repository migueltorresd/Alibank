/**
 * Interfaz que define la estructura de datos para el modelo de paginación.
 * 
 * @remarks
 * Esta interfaz representa los datos necesarios para implementar la paginación en una lista de elementos.
 * 
 * @export
 * @interface PaginationModel
 */
export interface PaginationModel {
  /** Longitud total de la lista de elementos */
  length: number;

  /** Página actual */
  page: number;
}
